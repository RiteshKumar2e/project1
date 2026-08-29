import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { demoScenarios } from '../data/demoScenarios';

export default function DemoModeBanner({ onSelectScenario, activeScenarioId }) {
  const { language } = useLanguage();
  const hi = language === 'hi';

  return (
    <div className="demo">
      <div className="demo__head">
        <span className="demo__badge">{hi ? 'नमूना' : 'Sample'}</span>
        <span className="demo__note">
          {hi ? 'असली आपातकाल नहीं — सिर्फ़ दिखाने के लिए' : 'Not a real emergency — for trying it out'}
        </span>
      </div>

      <div className="demo__body">
        <p className="demo__lead">{hi ? 'कोई एक स्थिति चुनें:' : 'Pick a situation to try:'}</p>

        <div className="demo__list">
          {demoScenarios.map((scenario) => {
            const desc = hi && scenario.descriptionHi ? scenario.descriptionHi : scenario.description;
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => onSelectScenario(scenario)}
                className={`demo__item${activeScenarioId === scenario.id ? ' is-active' : ''}`}
              >
                <span className="demo__icon" aria-hidden="true">{scenario.icon}</span>
                <span>{desc}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
