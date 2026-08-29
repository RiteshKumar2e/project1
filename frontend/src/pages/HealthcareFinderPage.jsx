import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { fetchNearbyFacilities } from '../services/api';
import FacilityCard from '../components/FacilityCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import { Phone, RefreshCw } from 'lucide-react';
import '../styles/HealthcareFinderPage.css';

/*
  Shown when location is unavailable or the API is down. These are clearly
  labelled as examples so nobody drives to an address that does not exist.
*/
const SAMPLE_FACILITIES = [
  {
    id: 'fb_1',
    name: 'District Government Hospital',
    nameHi: 'जिला सरकारी अस्पताल',
    latitude: 23.265, longitude: 77.415,
    address: 'Civil Lines, District HQ',
    phone: '0755-2540108',
    emergency: true,
    distance: 3.4,
    estimatedTime: { text: '10-15 min', textHi: '10-15 मिनट' }
  },
  {
    id: 'fb_2',
    name: 'Community Health Centre (CHC)',
    nameHi: 'सामुदायिक स्वास्थ्य केंद्र (CHC)',
    latitude: 23.25, longitude: 77.4,
    address: 'Main Road, Block Area',
    phone: '0755-2550100',
    emergency: true,
    distance: 6.8,
    estimatedTime: { text: '15-25 min', textHi: '15-25 मिनट' }
  },
  {
    id: 'fb_3',
    name: 'Primary Health Centre (PHC)',
    nameHi: 'प्राथमिक स्वास्थ्य केंद्र (PHC)',
    latitude: 23.27, longitude: 77.42,
    address: 'Village Sector 4',
    phone: '0755-2560200',
    emergency: false,
    distance: 9.2,
    estimatedTime: { text: '20-30 min', textHi: '20-30 मिनट' }
  },
  {
    id: 'fb_4',
    name: 'Red Cross First Aid Clinic',
    nameHi: 'रेड क्रॉस प्राथमिक चिकित्सा क्लिनिक',
    latitude: 23.28, longitude: 77.43,
    address: 'Station Road',
    phone: '0755-2570300',
    emergency: false,
    distance: 14.5,
    estimatedTime: { text: '30-45 min', textHi: '30-45 मिनट' }
  }
];

export default function HealthcareFinderPage() {
  const { language } = useLanguage();
  const { requestLocation } = useGeolocation();
  const hi = language === 'hi';

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usingSamples, setUsingSamples] = useState(false);
  const [selectedRadius, setSelectedRadius] = useState(15000);

  const handleFindFacilities = async (radius = selectedRadius) => {
    setLoading(true);
    try {
      const coords = await requestLocation();
      if (coords) {
        const res = await fetchNearbyFacilities(coords.latitude, coords.longitude, radius);
        if (res?.success && res.facilities?.length > 0) {
          setFacilities(res.facilities);
          setUsingSamples(false);
          return;
        }
      }
      setFacilities(SAMPLE_FACILITIES);
      setUsingSamples(true);
    } catch {
      setFacilities(SAMPLE_FACILITIES);
      setUsingSamples(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { handleFindFacilities(); }, []);

  return (
    <div className="page page--wide stack">
      <div className="card">
        <div className="finder__head">
          <div>
            <h1>{hi ? 'नज़दीकी अस्पताल' : 'Nearby hospitals'}</h1>
            <p className="finder__sub">
              {hi
                ? 'सरकारी अस्पताल, सामुदायिक स्वास्थ्य केंद्र (CHC) और प्राथमिक स्वास्थ्य केंद्र (PHC)'
                : 'Government hospitals, Community Health Centres (CHC) and Primary Health Centres (PHC)'}
            </p>
          </div>

          <button className="finder__refresh" onClick={() => handleFindFacilities()} disabled={loading}>
            <RefreshCw size={18} className={loading ? 'is-spinning' : ''} />
            {hi ? 'फिर से खोजें' : 'Search again'}
          </button>
        </div>

        {/* In a village the nearest real hospital can be 40km away */}
        <div className="finder__radius">
          <span className="finder__radius-label">{hi ? 'कितनी दूर तक:' : 'Search within:'}</span>
          {[5000, 15000, 30000, 50000].map((r) => (
            <button
              key={r}
              className="finder__chip"
              aria-pressed={selectedRadius === r}
              onClick={() => { setSelectedRadius(r); handleFindFacilities(r); }}
            >
              {r / 1000} km
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message={hi ? 'आस-पास देख रहे हैं...' : 'Looking around you...'} />
      ) : (
        <section>
          <div className="finder__count">
            <h2>{hi ? `${facilities.length} जगह मिलीं` : `${facilities.length} places found`}</h2>
            {usingSamples && (
              <span className="finder__count-note">
                {hi ? 'नमूना सूची — लोकेशन नहीं मिली' : 'Sample list — location unavailable'}
              </span>
            )}
          </div>

          <div className="finder__grid">
            {facilities.map((fac) => <FacilityCard key={fac.id} facility={fac} />)}
          </div>
        </section>
      )}

      {/* For when the nearest facility is simply too far to reach in time */}
      <div className="finder__ambulance">
        <div>
          <h3>{hi ? 'अस्पताल दूर है?' : 'Hospital too far?'}</h3>
          <p>{hi ? '112 या 102 पर एम्बुलेंस बुलाएँ।' : 'Call 112 or 102 for an ambulance.'}</p>
        </div>

        <a href="tel:112" className="finder__ambulance-call">
          <Phone size={20} />
          {hi ? '112 कॉल करें' : 'Call 112'}
        </a>
      </div>

      <SafetyDisclaimer />
    </div>
  );
}
