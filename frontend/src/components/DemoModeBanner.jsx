import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { demoScenarios } from '../data/demoScenarios';

export default function DemoModeBanner({ onSelectScenario, activeScenarioId }) {
  const { language } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-surface-900 to-surface-800 text-white rounded-3xl p-5 sm:p-6 shadow-md mb-6 border border-surface-700">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-emergency-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          {language === 'hi' ? 'डेमो मोड' : 'DEMO MODE'}
        </span>
        <span className="text-xs text-surface-300 font-medium flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          {language === 'hi' ? 'सिम्युलेटेड आपातकालीन परिदृश्य' : 'Simulated emergency scenarios'}
        </span>
      </div>

      <h3 className="text-base sm:text-lg font-bold mb-1">
        {language === 'hi' ? 'एक नमूना आपातकाल चुनें और सिस्टम का परीक्षण करें:' : 'Select a sample scenario to test the platform:'}
      </h3>
      <p className="text-xs text-surface-400 mb-4">
        {language === 'hi'
          ? 'यह देखने के लिए क्लिक करें कि सिस्टम AI वर्गीकरण, सुरक्षा नियम और प्राथमिक चिकित्सा चरणों को कैसे संभालता है।'
          : 'Click any scenario below to see how AI categorizes symptoms and displays step-by-step guidance.'}
      </p>

      {/* Scenario chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {demoScenarios.map((scenario) => {
          const desc = language === 'hi' && scenario.descriptionHi ? scenario.descriptionHi : scenario.description;
          const isActive = activeScenarioId === scenario.id;

          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => onSelectScenario(scenario)}
              className={`text-left p-3 rounded-xl text-xs font-semibold transition-all flex items-start gap-2.5 border ${
                isActive
                  ? 'bg-emergency-600/30 border-emergency-500 text-white'
                  : 'bg-surface-800 hover:bg-surface-700 border-surface-600 text-surface-200'
              }`}
            >
              <span className="text-lg shrink-0">{scenario.icon}</span>
              <span className="line-clamp-2 flex-1">{desc}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60 shrink-0 mt-0.5" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
