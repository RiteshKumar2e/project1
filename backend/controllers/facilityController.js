/**
 * Facility Controller
 * 
 * Queries OpenStreetMap Overpass API for nearby healthcare facilities.
 */

const OVERPASS_API = 'https://overpass-api.de/api/interpreter';

/**
 * GET /api/facilities/nearby?lat=XX&lng=YY&radius=ZZZZ
 * Find nearby healthcare facilities using OSM data
 */
async function getNearbyFacilities(req, res) {
  try {
    const { lat, lng, radius = 10000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        error: 'Location coordinates (lat, lng) are required.',
        errorHi: 'स्थान निर्देशांक (lat, lng) आवश्यक हैं।'
      });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const searchRadius = Math.min(parseInt(radius), 50000); // Max 50km

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: 'Invalid coordinates.' });
    }

    // Overpass QL query for healthcare facilities
    const query = `
      [out:json][timeout:15];
      (
        node["amenity"="hospital"](around:${searchRadius},${latitude},${longitude});
        way["amenity"="hospital"](around:${searchRadius},${latitude},${longitude});
        node["amenity"="clinic"](around:${searchRadius},${latitude},${longitude});
        way["amenity"="clinic"](around:${searchRadius},${latitude},${longitude});
        node["amenity"="doctors"](around:${searchRadius},${latitude},${longitude});
        node["healthcare"="centre"](around:${searchRadius},${latitude},${longitude});
        way["healthcare"="centre"](around:${searchRadius},${latitude},${longitude});
        node["healthcare"="hospital"](around:${searchRadius},${latitude},${longitude});
        way["healthcare"="hospital"](around:${searchRadius},${latitude},${longitude});
      );
      out center body;
    `;

    const response = await fetch(OVERPASS_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `data=${encodeURIComponent(query)}`,
      signal: AbortSignal.timeout(15000)
    });

    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.status}`);
    }

    const data = await response.json();

    // Process and format facilities
    const facilities = data.elements
      .map(element => {
        const tags = element.tags || {};
        const facilityLat = element.lat || element.center?.lat;
        const facilityLng = element.lon || element.center?.lon;

        if (!facilityLat || !facilityLng) return null;

        // Calculate distance
        const distance = calculateDistance(latitude, longitude, facilityLat, facilityLng);

        // Determine facility type
        let type = 'healthcare';
        if (tags.amenity === 'hospital' || tags.healthcare === 'hospital') type = 'hospital';
        else if (tags.amenity === 'clinic') type = 'clinic';
        else if (tags.amenity === 'doctors') type = 'doctor';
        else if (tags.healthcare === 'centre') type = 'health_centre';

        // Determine type label
        const typeLabels = {
          hospital: { en: 'Hospital', hi: 'अस्पताल' },
          clinic: { en: 'Clinic', hi: 'क्लिनिक' },
          doctor: { en: 'Doctor', hi: 'डॉक्टर' },
          health_centre: { en: 'Health Centre', hi: 'स्वास्थ्य केंद्र' },
          healthcare: { en: 'Healthcare Facility', hi: 'स्वास्थ्य सुविधा' }
        };

        return {
          id: element.id,
          name: tags.name || tags['name:en'] || typeLabels[type]?.en || 'Healthcare Facility',
          nameHi: tags['name:hi'] || tags.name || typeLabels[type]?.hi || 'स्वास्थ्य सुविधा',
          type,
          typeLabel: typeLabels[type] || typeLabels.healthcare,
          latitude: facilityLat,
          longitude: facilityLng,
          address: tags['addr:full'] || tags['addr:street'] || '',
          phone: tags.phone || tags['contact:phone'] || null,
          emergency: tags.emergency === 'yes' || tags['emergency'] === 'yes',
          operatorType: tags['operator:type'] || tags.operator || '',
          distance: Math.round(distance * 100) / 100,
          estimatedTime: estimateTravelTime(distance),
          website: tags.website || null,
          openingHours: tags.opening_hours || null
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 20); // Return top 20

    // Prioritize: emergency hospitals > government hospitals > PHCs > clinics
    const prioritized = facilities.sort((a, b) => {
      const priority = { hospital: 0, health_centre: 1, clinic: 2, doctor: 3, healthcare: 4 };
      const aEmergency = a.emergency ? -1 : 0;
      const bEmergency = b.emergency ? -1 : 0;

      // First by emergency capability, then by type, then by distance
      if (aEmergency !== bEmergency) return aEmergency - bEmergency;
      if (priority[a.type] !== priority[b.type]) return priority[a.type] - priority[b.type];
      return a.distance - b.distance;
    });

    res.json({
      success: true,
      facilities: prioritized,
      total: prioritized.length,
      searchRadius: searchRadius,
      userLocation: { lat: latitude, lng: longitude }
    });

  } catch (error) {
    console.error('[Facility Controller] Error:', error.message);
    res.status(503).json({
      error: 'Unable to fetch nearby facilities. Please try again or call emergency services directly.',
      errorHi: 'आसपास की सुविधाएं लाने में असमर्थ। कृपया पुनः प्रयास करें या सीधे आपातकालीन सेवाओं को कॉल करें।',
      emergencyNumber: '112'
    });
  }
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 * Returns distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Estimate travel time based on distance
 * Assumes mixed rural road conditions
 */
function estimateTravelTime(distanceKm) {
  if (distanceKm < 1) return { text: '< 5 min', textHi: '< 5 मिनट', minutes: 5 };
  if (distanceKm < 5) return { text: '10-15 min', textHi: '10-15 मिनट', minutes: 15 };
  if (distanceKm < 10) return { text: '15-25 min', textHi: '15-25 मिनट', minutes: 25 };
  if (distanceKm < 20) return { text: '25-40 min', textHi: '25-40 मिनट', minutes: 40 };
  if (distanceKm < 50) return { text: '40-90 min', textHi: '40-90 मिनट', minutes: 90 };
  return { text: '> 90 min', textHi: '> 90 मिनट', minutes: 120 };
}

module.exports = { getNearbyFacilities };
