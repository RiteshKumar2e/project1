import React from 'react';
import { Phone, Navigation } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function FacilityCard({ facility }) {
  const { language } = useLanguage();
  if (!facility) return null;

  const hi = language === 'hi';
  const name = hi && facility.nameHi ? facility.nameHi : facility.name;
  const travelTime = hi ? facility.estimatedTime?.textHi : facility.estimatedTime?.text;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${facility.latitude},${facility.longitude}`;

  return (
    <div className="facility">
      <div className="facility__body">
        <div className="facility__top">
          <h3 className="facility__name">{name}</h3>

          {/* Distance is the fact that decides where you go, so it gets the size */}
          <div className="facility__distance">
            <span className="facility__km">{facility.distance}</span>
            <span className="facility__unit">km</span>
          </div>
        </div>

        <p className="facility__meta">
          {facility.address}
          {travelTime && ` · ${travelTime}`}
        </p>

        {facility.emergency && (
          <span className="facility__tag">
            {hi ? '24 घंटे आपातकाल' : '24/7 Emergency'}
          </span>
        )}
      </div>

      <div className="facility__actions">
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
          <Navigation size={16} />
          {hi ? 'रास्ता' : 'Directions'}
        </a>

        <a href={`tel:${facility.phone || '112'}`}>
          <Phone size={16} fill="currentColor" />
          {facility.phone ? (hi ? 'कॉल' : 'Call') : '112'}
        </a>
      </div>
    </div>
  );
}
