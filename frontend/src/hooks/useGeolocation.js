import { useState, useCallback } from 'react';
import { getCurrentCoordinates } from '../services/locationService';

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
      setLoading(false);
      return coords;
    } catch (err) {
      setError(err.message || 'Unable to retrieve location');
      setLoading(false);
      // Provide default fallback coords (Central India, e.g., Bhopal / Nagpur region or Delhi)
      const fallback = { latitude: 23.2599, longitude: 77.4126, isFallback: true };
      setLocation(fallback);
      return fallback;
    }
  }, []);

  return { location, loading, error, requestLocation };
}
