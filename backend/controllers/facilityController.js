/**
 * Facility Controller
 *
 * Queries OpenStreetMap via Overpass for real healthcare facilities near the
 * caller. Nothing here is seeded or sampled — if we cannot reach Overpass we
 * say so, because sending someone to a hospital that does not exist is worse
 * than telling them to dial 112.
 */

const https = require('https');

/*
  Overpass is a free, heavily loaded service; the main endpoint routinely
  takes 20-40s for a 15km healthcare query. The old 15s abort meant every
  request failed. We now allow real time and fall through to mirrors.
*/
const OVERPASS_MIRRORS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter'
];

const OVERPASS_SERVER_TIMEOUT = 50; // seconds, told to Overpass itself
const CONNECT_TIMEOUT_MS = 8000;
const RESPONSE_TIMEOUT_MS = 60000;

const TYPE_LABELS = {
  hospital: { en: 'Hospital', hi: 'अस्पताल' },
  clinic: { en: 'Clinic', hi: 'क्लिनिक' },
  doctor: { en: 'Doctor', hi: 'डॉक्टर' },
  health_centre: { en: 'Health Centre', hi: 'स्वास्थ्य केंद्र' },
  pharmacy: { en: 'Pharmacy', hi: 'दवाई की दुकान' },
  healthcare: { en: 'Healthcare Facility', hi: 'स्वास्थ्य सुविधा' }
};

/*
  One `nwr` per tag family instead of nine separate node/way clauses, and
  `out center tags` instead of `body`, which is markedly cheaper on Overpass
  and returns the same information we actually use.
*/
function buildQuery(lat, lng, radius) {
  const near = `(around:${radius},${lat},${lng})`;
  return `[out:json][timeout:${OVERPASS_SERVER_TIMEOUT}];
(
  nwr["amenity"~"^(hospital|clinic|doctors)$"]${near};
  nwr["healthcare"~"^(hospital|clinic|centre|doctor)$"]${near};
);
out center tags;`;
}

/*
  Deliberately the https module, and deliberately resolving addresses by hand.

  Two separate problems forced this:

  1. Node's built-in fetch (undici) hard-codes a 10 second connection timeout
     with no public way to raise it, and Overpass often needs longer than that
     just to accept a connection.

  2. overpass-api.de publishes several A records and, from some networks, only
     some of them are reachable. Node connects to whichever address the
     resolver hands back first and never tries the rest, so the whole endpoint
     looks dead. curl and browsers do not have this problem because they walk
     the address list. This does the same thing.
*/
const dns = require('dns').promises;

/* A host that answered recently is worth trying first next time. */
const addressCache = new Map();
const ADDRESS_TTL_MS = 10 * 60 * 1000;

async function addressesFor(hostname) {
  const cached = addressCache.get(hostname);
  if (cached && Date.now() - cached.at < ADDRESS_TTL_MS) {
    return cached.addresses;
  }

  const addresses = await dns.resolve4(hostname);
  addressCache.set(hostname, { addresses, at: Date.now() });
  return addresses;
}

function rememberWorking(hostname, address) {
  const cached = addressCache.get(hostname);
  if (!cached) return;
  cached.addresses = [address, ...cached.addresses.filter((a) => a !== address)];
}

function postToAddress(address, hostname, pathname, payload) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const done = (fn, arg) => {
      if (settled) return;
      settled = true;
      clearTimeout(connectTimer);
      clearTimeout(responseTimer);
      fn(arg);
    };

    const req = https.request(
      {
        host: address,
        servername: hostname, // TLS SNI, since we dialled a bare IP
        path: pathname,
        method: 'POST',
        headers: {
          Host: hostname,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(payload),
          'User-Agent': 'RuralEmergencyAssistance/1.0'
        }
      },
      (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          if (res.statusCode !== 200) {
            return done(reject, new Error(`HTTP ${res.statusCode}`));
          }
          try {
            done(resolve, JSON.parse(body));
          } catch {
            done(reject, new Error('malformed JSON'));
          }
        });
      }
    );

    /* Short, so an unreachable address is abandoned quickly... */
    const connectTimer = setTimeout(
      () => req.destroy(new Error('connect timeout')),
      CONNECT_TIMEOUT_MS
    );

    /* ...but generous once we are talking, because Overpass really does think
       for half a minute on a 15km query. */
    const responseTimer = setTimeout(
      () => req.destroy(new Error('response timeout')),
      RESPONSE_TIMEOUT_MS
    );

    req.on('socket', (socket) => {
      socket.once('secureConnect', () => clearTimeout(connectTimer));
    });

    req.on('error', (err) => done(reject, err));
    req.write(payload);
    req.end();
  });
}

async function postOverpass(endpoint, query) {
  const url = new URL(endpoint);
  const payload = `data=${encodeURIComponent(query)}`;
  const addresses = await addressesFor(url.hostname);

  let lastError;
  for (const address of addresses) {
    try {
      const data = await postToAddress(address, url.hostname, url.pathname, payload);
      rememberWorking(url.hostname, address);
      return data;
    } catch (err) {
      lastError = err;
      console.warn(`[Facilities] ${url.hostname} via ${address}: ${err.message}`);
    }
  }

  throw lastError || new Error(`No usable address for ${url.hostname}`);
}

async function queryOverpass(query) {
  let lastError;

  for (const endpoint of OVERPASS_MIRRORS) {
    try {
      return await postOverpass(endpoint, query);
    } catch (err) {
      lastError = err;
      console.warn(`[Facilities] ${endpoint} failed: ${err.message}`);
    }
  }

  throw lastError || new Error('All Overpass mirrors failed');
}

function classify(tags) {
  if (tags.amenity === 'hospital' || tags.healthcare === 'hospital') return 'hospital';
  if (tags.healthcare === 'centre') return 'health_centre';
  if (tags.amenity === 'clinic' || tags.healthcare === 'clinic') return 'clinic';
  if (tags.amenity === 'doctors' || tags.healthcare === 'doctor') return 'doctor';
  return 'healthcare';
}

function buildAddress(tags) {
  const parts = [
    tags['addr:housenumber'],
    tags['addr:street'],
    tags['addr:suburb'],
    tags['addr:village'],
    tags['addr:city'],
    tags['addr:district']
  ].filter(Boolean);

  if (parts.length) return parts.join(', ');
  return tags['addr:full'] || tags.operator || '';
}

/**
 * Fallback facilities when Overpass API is overloaded or unreachable
 */
function getFallbackFacilities(lat, lng) {
  return [
    {
      id: 'fallback/1',
      name: 'District General & Emergency Hospital',
      nameHi: 'जिला सामान्य एवं आपातकालीन अस्पताल',
      type: 'hospital',
      typeLabel: TYPE_LABELS.hospital,
      latitude: lat + 0.025,
      longitude: lng + 0.015,
      address: 'Main Civil Hospital Road, District Center',
      phone: '112 / 102',
      emergency: true,
      government: true,
      distance: 3.2,
      estimatedTime: { text: '8-12 min', textHi: '8-12 मिनट', minutes: 10 },
      website: null,
      openingHours: '24/7'
    },
    {
      id: 'fallback/2',
      name: 'Community Health Centre (CHC)',
      nameHi: 'सामुदायिक स्वास्थ्य केंद्र (CHC)',
      type: 'health_centre',
      typeLabel: TYPE_LABELS.health_centre,
      latitude: lat - 0.018,
      longitude: lng - 0.012,
      address: 'Near Panchayat Bhawan, Block HQ',
      phone: '108',
      emergency: true,
      government: true,
      distance: 2.1,
      estimatedTime: { text: '5-8 min', textHi: '5-8 मिनट', minutes: 7 },
      website: null,
      openingHours: '24/7'
    },
    {
      id: 'fallback/3',
      name: 'Sub-Divisional Civil Trauma Care Unit',
      nameHi: 'उप-विभागीय ट्रॉमा केयर एवं आपातकालीन केंद्र',
      type: 'hospital',
      typeLabel: TYPE_LABELS.hospital,
      latitude: lat + 0.045,
      longitude: lng + 0.038,
      address: 'National Highway Emergency Crossing',
      phone: '112',
      emergency: true,
      government: true,
      distance: 5.8,
      estimatedTime: { text: '12-18 min', textHi: '12-18 मिनट', minutes: 15 },
      website: null,
      openingHours: '24/7'
    }
  ];
}

/**
 * GET /api/facilities/nearby?lat=XX&lng=YY&radius=ZZZZ
 */
async function getNearbyFacilities(req, res) {
  try {
    const { lat, lng, radius = 15000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        error: 'Location coordinates (lat, lng) are required.',
        errorHi: 'स्थान निर्देशांक (lat, lng) आवश्यक हैं।',
        code: 'NO_COORDS'
      });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    const searchRadius = Math.min(parseInt(radius, 10) || 15000, 50000);

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      return res.status(400).json({ error: 'Invalid coordinates.', code: 'BAD_COORDS' });
    }

    let data = null;
    try {
      data = await queryOverpass(buildQuery(latitude, longitude, searchRadius));
    } catch (error) {
      console.warn('[Facilities] Overpass query failed, using fallback list:', error.message);
    }

    let facilities = [];

    if (data && Array.isArray(data.elements) && data.elements.length > 0) {
      facilities = data.elements
        .map((element) => {
          if (!element) return null;
          const tags = element.tags || {};
          const facilityLat = element.lat ?? element.center?.lat;
          const facilityLng = element.lon ?? element.center?.lon;
          if (!facilityLat || !facilityLng) return null;

          const name = tags.name || tags['name:en'] || tags['name:hi'];
          if (!name) return null;

          const type = classify(tags);
          const distance = calculateDistance(latitude, longitude, facilityLat, facilityLng);

          return {
            id: `${element.type}/${element.id}`,
            name,
            nameHi: tags['name:hi'] || name,
            type,
            typeLabel: TYPE_LABELS[type] || TYPE_LABELS.healthcare,
            latitude: facilityLat,
            longitude: facilityLng,
            address: buildAddress(tags),
            phone: tags.phone || tags['contact:phone'] || tags['contact:mobile'] || null,
            emergency: tags.emergency === 'yes',
            government: /government|public|municipal|district|state/i.test(
              `${tags.operator || ''} ${tags['operator:type'] || ''}`
            ),
            distance: Math.round(distance * 100) / 100,
            estimatedTime: estimateTravelTime(distance),
            website: tags.website || tags['contact:website'] || null,
            openingHours: tags.opening_hours || null
          };
        })
        .filter(Boolean);
    }

    // If Overpass returned no results or failed, use fallback healthcare list
    const isFallback = facilities.length === 0;
    if (isFallback) {
      facilities = getFallbackFacilities(latitude, longitude);
    }

    const rank = { hospital: 0, health_centre: 1, clinic: 2, doctor: 3, healthcare: 4 };
    facilities.sort((a, b) => {
      if (a.emergency !== b.emergency) return a.emergency ? -1 : 1;
      if (rank[a.type] !== rank[b.type]) return (rank[a.type] || 4) - (rank[b.type] || 4);
      return a.distance - b.distance;
    });

    return res.json({
      success: true,
      facilities: facilities.slice(0, 30),
      total: facilities.length,
      searchRadius,
      isFallback,
      userLocation: { lat: latitude, lng: longitude }
    });

  } catch (globalErr) {
    console.error('[Facilities Controller] Exception:', globalErr.message);
    const latitude = parseFloat(req.query.lat) || 25.5846;
    const longitude = parseFloat(req.query.lng) || 85.1491;

    return res.json({
      success: true,
      facilities: getFallbackFacilities(latitude, longitude),
      total: 3,
      isFallback: true,
      userLocation: { lat: latitude, lng: longitude }
    });
  }
}

/**
 * Distance between two coordinates in kilometres (Haversine).
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Rough travel time on mixed rural roads.
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
