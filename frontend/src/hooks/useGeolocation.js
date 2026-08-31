import { useState, useCallback } from 'react';
import { getCurrentCoordinates } from '../services/locationService';

/*
  Reports the device's real position, or an honest failure.

  This hook used to swallow every error and hand back hard-coded Bhopal
  coordinates. That silently showed people hospitals hundreds of kilometres
  away as though they were nearby, which in an emergency is worse than
  showing nothing. It now surfaces why the lookup failed so the page can
  ask for permission, or tell the user to dial 112.
*/
function describe(err) {
  switch (err?.code) {
    case 1: return { code: 'DENIED', message: 'Location permission was refused' };
    case 2: return { code: 'UNAVAILABLE', message: 'Position could not be determined' };
    case 3: return { code: 'TIMEOUT', message: 'Location lookup timed out' };
    default: return { code: 'UNSUPPORTED', message: err?.message || 'Location is not available' };
  }
}

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const requestLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const coords = await getCurrentCoordinates();
      setLocation(coords);
      return coords;
    } catch (err) {
      const detail = describe(err);
      setError(detail);
      setLocation(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { location, loading, error, requestLocation };
}
