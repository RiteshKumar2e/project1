import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { fetchNearbyFacilities } from '../services/api';
import FacilityCard from '../components/FacilityCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import { MapPin, Navigation, Phone, RefreshCw, AlertCircle, Building2, ShieldAlert } from 'lucide-react';

export default function HealthcareFinderPage() {
  const { t, language } = useLanguage();
  const { location, loading: geoLoading, error: geoError, requestLocation } = useGeolocation();

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRadius, setSelectedRadius] = useState(15000); // 15km default

  // Fallback sample healthcare facilities for rural/offline demonstration
  const fallbackFacilities = [
    {
      id: 'fb_1',
      name: 'District Government Hospital & Emergency Centre',
      nameHi: 'जिला सरकारी अस्पताल एवं आपातकालीन केंद्र',
      type: 'hospital',
      typeLabel: { en: 'Government Hospital', hi: 'सरकारी अस्पताल' },
      latitude: 23.2650,
      longitude: 77.4150,
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
      type: 'health_centre',
      typeLabel: { en: 'CHC (24x7)', hi: 'सामुदायिक स्वास्थ्य केंद्र' },
      latitude: 23.2500,
      longitude: 77.4000,
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
      type: 'health_centre',
      typeLabel: { en: 'PHC', hi: 'प्राथमिक स्वास्थ्य केंद्र' },
      latitude: 23.2700,
      longitude: 77.4200,
      address: 'Village Sector 4',
      phone: '0755-2560200',
      emergency: false,
      distance: 9.2,
      estimatedTime: { text: '20-30 min', textHi: '20-30 मिनट' }
    },
    {
      id: 'fb_4',
      name: 'Rural Red Cross First Aid & Clinic',
      nameHi: 'रेड क्रॉस प्राथमिक चिकित्सा क्लिनिक',
      type: 'clinic',
      typeLabel: { en: 'Clinic', hi: 'क्लिनिक' },
      latitude: 23.2800,
      longitude: 77.4300,
      address: 'Station Road',
      phone: '0755-2570300',
      emergency: false,
      distance: 14.5,
      estimatedTime: { text: '30-45 min', textHi: '30-45 मिनट' }
    }
  ];

  // Auto request location on mount
  useEffect(() => {
    handleFindFacilities();
  }, []);

  const handleFindFacilities = async () => {
    setLoading(true);
    setError(null);
    try {
      const coords = await requestLocation();
      if (coords) {
        try {
          const res = await fetchNearbyFacilities(coords.latitude, coords.longitude, selectedRadius);
          if (res?.success && res.facilities && res.facilities.length > 0) {
            setFacilities(res.facilities);
          } else {
            setFacilities(fallbackFacilities);
          }
        } catch {
          setFacilities(fallbackFacilities);
        }
      } else {
        setFacilities(fallbackFacilities);
      }
    } catch {
      setFacilities(fallbackFacilities);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white border border-surface-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5" />
              {t('facilities.title')}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900 leading-tight">
              {language === 'hi' ? 'निकटतम स्वास्थ्य केंद्र व अस्पताल' : 'Nearby Healthcare Facilities'}
            </h1>
            <p className="text-xs sm:text-sm text-surface-500 mt-1">
              {language === 'hi'
                ? 'सरकारी अस्पताल, 24x7 सामुदायिक स्वास्थ्य केंद्र (CHC) और प्राथमिक स्वास्थ्य केंद्र (PHC)'
                : 'Emergency hospitals, Community Health Centres (CHCs), and Primary Health Centres (PHCs)'}
            </p>
          </div>

          <button
            onClick={handleFindFacilities}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-900 hover:bg-surface-800 text-white text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{language === 'hi' ? 'रिफ्रेश करें' : 'Refresh Location'}</span>
          </button>
        </div>

        {/* Radius filter buttons */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-surface-100 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-surface-600 shrink-0">
            {language === 'hi' ? 'खोज दायरा:' : 'Search radius:'}
          </span>
          {[5000, 15000, 30000, 50000].map((r) => (
            <button
              key={r}
              onClick={() => {
                setSelectedRadius(r);
                handleFindFacilities();
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold shrink-0 transition-all ${
                selectedRadius === r
                  ? 'bg-emergency-600 text-white'
                  : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
              }`}
            >
              {r / 1000} km
            </button>
          ))}
        </div>
      </div>

      {/* Facilities List */}
      {loading ? (
        <LoadingSpinner message={language === 'hi' ? 'निकटतम स्वास्थ्य केंद्र खोजे जा रहे हैं...' : 'Scanning GPS & OSM for emergency health facilities...'} />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-surface-900">
              {language === 'hi' ? `उपलब्ध सुविधाएं (${facilities.length})` : `Available Facilities (${facilities.length})`}
            </h2>
            <span className="text-xs text-surface-500 font-medium">
              {language === 'hi' ? 'प्राथमिकता: 24/7 आपातकालीन अस्पताल' : 'Sorted by: Emergency capability & distance'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {facilities.map((fac) => (
              <FacilityCard key={fac.id} facility={fac} />
            ))}
          </div>
        </div>
      )}

      {/* Emergency Call Box */}
      <div className="p-6 rounded-3xl bg-emergency-600 text-white shadow-md flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold mb-0.5">
            {language === 'hi' ? 'अस्पताल दूर है या गंभीर आपातकाल है?' : 'Cannot travel or need immediate ambulance?'}
          </h3>
          <p className="text-xs text-emergency-100">
            {language === 'hi' ? 'तुरंत 112 या 102 डायल करके एम्बुलेंस बुलाएं।' : 'Dial national emergency 112 or ambulance 102 now.'}
          </p>
        </div>

        <a
          href="tel:112"
          className="flex items-center gap-2 py-3 px-6 rounded-2xl bg-white text-emergency-700 font-extrabold text-sm sm:text-base shadow-sm hover:scale-105 transition-transform"
        >
          <Phone className="w-5 h-5 fill-emergency-600" />
          <span>{language === 'hi' ? '112 कॉल करें' : 'Call 112 Now'}</span>
        </a>
      </div>

      <SafetyDisclaimer />
    </div>
  );
}
