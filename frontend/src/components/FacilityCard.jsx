import React from 'react';
import { Phone, Navigation, Clock, ShieldAlert, Building2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function FacilityCard({ facility }) {
  const { language } = useLanguage();

  if (!facility) return null;

  const name = language === 'hi' && facility.nameHi ? facility.nameHi : facility.name;
  const travelTimeText = language === 'hi' ? facility.estimatedTime?.textHi : facility.estimatedTime?.text;

  // Directions URL via Google Maps or OpenStreetMap
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${facility.latitude},${facility.longitude}`;

  return (
    <div className="bg-white border border-surface-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-surface-100 text-surface-800 shrink-0">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-base sm:text-lg font-bold text-surface-900 leading-tight">
                {name}
              </h4>
              {facility.emergency && (
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emergency-100 text-emergency-700">
                  <ShieldAlert className="w-3 h-3" />
                  24/7 ER
                </span>
              )}
            </div>
            {facility.address && (
              <p className="text-xs text-surface-500 mt-1 line-clamp-1">{facility.address}</p>
            )}
          </div>
        </div>

        {/* Distance Badge */}
        <div className="text-right shrink-0">
          <div className="text-sm sm:text-base font-extrabold text-surface-900">
            {facility.distance} km
          </div>
          <div className="text-xs text-surface-500 flex items-center gap-1 justify-end mt-0.5">
            <Clock className="w-3 h-3" />
            <span>{travelTimeText || 'Nearby'}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons: Directions & Call */}
      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-surface-100">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-surface-100 hover:bg-surface-200 text-surface-900 text-xs sm:text-sm font-bold transition-colors"
        >
          <Navigation className="w-4 h-4 text-primary" />
          <span>{language === 'hi' ? 'रास्ता देखें' : 'Get Directions'}</span>
        </a>

        {facility.phone ? (
          <a
            href={`tel:${facility.phone}`}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emergency-600 hover:bg-emergency-700 text-white text-xs sm:text-sm font-bold transition-colors"
          >
            <Phone className="w-4 h-4 fill-white" />
            <span>{language === 'hi' ? 'कॉल करें' : 'Call Facility'}</span>
          </a>
        ) : (
          <a
            href="tel:112"
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emergency-50 hover:bg-emergency-100 text-emergency-700 text-xs sm:text-sm font-bold transition-colors"
          >
            <Phone className="w-4 h-4 text-emergency-600" />
            <span>{language === 'hi' ? '112 कॉल करें' : 'Call 112'}</span>
          </a>
        )}
      </div>
    </div>
  );
}
