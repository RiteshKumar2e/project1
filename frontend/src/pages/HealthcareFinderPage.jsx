import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { fetchNearbyFacilities } from '../services/api';
import FacilityCard from '../components/FacilityCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import { Phone, RefreshCw, MapPin, AlertTriangle } from 'lucide-react';
import '../styles/HealthcareFinderPage.css';

const RADII = [5000, 15000, 30000, 50000];

/*
  Every facility on this screen comes from OpenStreetMap, positioned against
  the device's real location. There is deliberately no sample list: sending
  someone to a hospital that does not exist, or that is 300km away, is worse
  than telling them plainly that we could not look it up.
*/
export default function HealthcareFinderPage() {
  const { language } = useLanguage();
  const { requestLocation } = useGeolocation();
  const hi = language === 'hi';

  const [facilities, setFacilities] = useState([]);
  const [radius, setRadius] = useState(15000);
  const [status, setStatus] = useState('locating');
  const [problem, setProblem] = useState(null);

  const search = useCallback(async (searchRadius) => {
    setStatus('locating');
    setProblem(null);

    const coords = await requestLocation();
    if (!coords) {
      setProblem({
        title: hi ? 'आपकी जगह नहीं मिल पाई' : 'Could not find your location',
        body: hi
          ? 'ब्राउज़र में लोकेशन की अनुमति दें, फिर दोबारा कोशिश करें। तब तक 112 पर एम्बुलेंस बुला सकते हैं।'
          : 'Allow location access in your browser, then try again. You can call 112 for an ambulance meanwhile.'
      });
      setStatus('error');
      return;
    }

    setStatus('searching');
    try {
      const res = await fetchNearbyFacilities(coords.latitude, coords.longitude, searchRadius);
      const found = res?.facilities || [];
      setFacilities(found);
      setStatus(found.length ? 'ready' : 'empty');
    } catch (err) {
      setProblem({
        title: hi ? 'अस्पताल खोजे नहीं जा सके' : 'Could not search for hospitals',
        body: err.code === 'TIMEOUT'
          ? (hi
              ? 'नक्शा सेवा बहुत धीमी है। दोबारा कोशिश करें, या सीधे 112 पर कॉल करें।'
              : 'The map service is being slow. Try again, or call 112 directly.')
          : (hi
              ? 'नक्शा सेवा से संपर्क नहीं हो पाया। एम्बुलेंस के लिए 112 पर कॉल करें।'
              : 'Could not reach the map service. Call 112 for an ambulance.')
      });
      setStatus('error');
    }
  }, [requestLocation, hi]);

  useEffect(() => { search(radius); }, []);

  const changeRadius = (r) => {
    setRadius(r);
    search(r);
  };

  const busy = status === 'locating' || status === 'searching';

  return (
    <div className="page page--wide stack">
      <div className="card">
        <div className="finder__head">
          <div>
            <h1>{hi ? 'नज़दीकी अस्पताल' : 'Nearby hospitals'}</h1>
            <p className="finder__sub">
              {hi
                ? 'आपकी मौजूदा जगह के हिसाब से सरकारी अस्पताल, सामुदायिक स्वास्थ्य केंद्र (CHC) और प्राथमिक स्वास्थ्य केंद्र (PHC)।'
                : 'Government hospitals, Community Health Centres (CHC) and Primary Health Centres (PHC), from your current location.'}
            </p>
          </div>

          <button className="finder__refresh" onClick={() => search(radius)} disabled={busy}>
            <RefreshCw size={18} className={busy ? 'is-spinning' : ''} />
            {hi ? 'फिर से खोजें' : 'Search again'}
          </button>
        </div>

        {/* In a village the nearest real hospital can be 40km away */}
        <div className="finder__radius">
          <span className="finder__radius-label">{hi ? 'कितनी दूर तक:' : 'Search within:'}</span>
          {RADII.map((r) => (
            <button
              key={r}
              className="finder__chip"
              aria-pressed={radius === r}
              disabled={busy}
              onClick={() => changeRadius(r)}
            >
              {r / 1000} km
            </button>
          ))}
        </div>
      </div>

      {status === 'locating' && (
        <LoadingSpinner message={hi ? 'आपकी जगह पता कर रहे हैं...' : 'Finding your location...'} />
      )}

      {status === 'searching' && (
        <LoadingSpinner
          message={hi ? 'आस-पास के अस्पताल खोज रहे हैं...' : 'Searching for hospitals near you...'}
        />
      )}

      {status === 'ready' && (
        <section>
          <div className="finder__count">
            <h2>
              {hi
                ? `${facilities.length} जगह मिलीं — ${radius / 1000} किमी के अंदर`
                : `${facilities.length} found within ${radius / 1000} km`}
            </h2>
            <span className="finder__count-note">
              {hi ? 'आपातकालीन अस्पताल सबसे ऊपर' : 'Emergency hospitals listed first'}
            </span>
          </div>

          <div className="finder__grid">
            {facilities.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>
        </section>
      )}

      {status === 'empty' && (
        <div className="finder__blank">
          <MapPin size={28} />
          <h2>{hi ? `${radius / 1000} किमी में कुछ नहीं मिला` : `Nothing found within ${radius / 1000} km`}</h2>
          <p>
            {hi
              ? 'दायरा बढ़ाकर देखें। गाँव में सबसे नज़दीकी अस्पताल 40 किमी दूर भी हो सकता है।'
              : 'Try a wider radius. In rural areas the nearest hospital can be 40km away.'}
          </p>
        </div>
      )}

      {status === 'error' && problem && (
        <div className="finder__blank finder__blank--error">
          <AlertTriangle size={28} />
          <h2>{problem.title}</h2>
          <p>{problem.body}</p>
          <button className="btn btn--outline finder__retry" onClick={() => search(radius)}>
            {hi ? 'दोबारा कोशिश करें' : 'Try again'}
          </button>
        </div>
      )}

      {/* Always reachable, whatever the search did */}
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
