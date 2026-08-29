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
 * GET /api/facilities/nearby?lat=XX&lng=YY&radius=ZZZZ
 */
async function getNearbyFacilities(req, res) {
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

  let data;
  try {
    data = await queryOverpass(buildQuery(latitude, longitude, searchRadius));
  } catch (error) {
    console.error('[Facilities] Overpass unreachable:', error.message);
    return res.status(503).json({
      error: 'Could not reach the map service. Call 112 for an ambulance.',
      errorHi: 'नक्शा सेवा से संपर्क नहीं हो पाया। एम्बुलेंस के लिए 112 पर कॉल करें।',
      code: 'UPSTREAM_UNAVAILABLE',
      emergencyNumber: '112'
    });
  }

  const facilities = (data.elements || [])
    .map((element) => {
      const tags = element.tags || {};
      const facilityLat = element.lat ?? element.center?.lat;
      const facilityLng = element.lon ?? element.center?.lon;
      if (!facilityLat || !facilityLng) return null;

      /*
        OSM entries without a name are usually incomplete stubs. A card
        reading "Healthcare Facility" helps nobody navigate, so they go.
      */
      const name = tags.name || tags['name:en'] || tags['name:hi'];
      if (!name) return null;

      const type = classify(tags);
      const distance = calculateDistance(latitude, longitude, facilityLat, facilityLng);

      return {
        id: `${element.type}/${element.id}`,
        name,
        nameHi: tags['name:hi'] || name,
        type,
        typeLabel: TYPE_LABELS[type],
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

  /*
    Ordering matters more than completeness here: a 24/7 emergency hospital
    12km away beats a clinic 2km away that is shut and cannot admit anyone.
  */
  const rank = { hospital: 0, health_centre: 1, clinic: 2, doctor: 3, healthcare: 4 };
  facilities.sort((a, b) => {
    if (a.emergency !== b.emergency) return a.emergency ? -1 : 1;
    if (rank[a.type] !== rank[b.type]) return rank[a.type] - rank[b.type];
    return a.distance - b.distance;
  });

  res.json({
    success: true,
    facilities: facilities.slice(0, 30),
    total: facilities.length,
    searchRadius,
    userLocation: { lat: latitude, lng: longitude }
  });
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
