import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import EmergencyButton from '../components/EmergencyButton';
import DemoModeBanner from '../components/DemoModeBanner';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import { getAllOfflineCategories } from '../data/offlineFirstAid';
import { AlertCircle, Phone, Navigation, BookOpen, Activity, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function HomePage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const [showDemo, setShowDemo] = useState(false);

  const categories = getAllOfflineCategories();
  const commonCategories = categories.slice(0, 6);

  const handleStartEmergency = () => {
    navigate('/emergency-input');
  };

  const handleDemoScenario = (scenario) => {
    navigate('/emergency-input', { state: { demoText: scenario.description, isDemo: true } });
  };

  const handleQuickCategory = (catId) => {
    navigate(`/first-aid/${catId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">
      {/* Demo Mode Toggle Header */}
      <div className="flex items-center justify-between bg-surface-100 p-2.5 sm:p-3 rounded-2xl border border-surface-200">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-safe-500 animate-ping" />
          <span className="text-xs sm:text-sm font-bold text-surface-800">
            {language === 'hi' ? 'ग्रामीण आपातकालीन सहायता प्रणाली' : 'Rural Emergency Assistance System'}
          </span>
        </div>
        <button
          onClick={() => setShowDemo(!showDemo)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            showDemo
              ? 'bg-surface-900 text-white shadow-xs'
              : 'bg-white text-surface-700 border border-surface-300 hover:bg-surface-50'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{showDemo ? (language === 'hi' ? 'डेमो बंद करें' : 'Hide Demo') : (language === 'hi' ? 'डेमो परिदृश्य देखें' : 'Try Demo Mode')}</span>
        </button>
      </div>

      {/* Demo Banner */}
      {showDemo && (
        <DemoModeBanner onSelectScenario={handleDemoScenario} />
      )}

      {/* Hero / Emergency Core Section */}
      <div className="bg-gradient-to-b from-white to-surface-50 border border-surface-200 rounded-3xl p-6 sm:p-8 shadow-sm text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emergency-100 text-emergency-800 text-xs sm:text-sm font-extrabold uppercase tracking-wide mb-4">
          <AlertCircle className="w-4 h-4 text-emergency-600 animate-bounce" />
          {t('home.emergency')}
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-surface-900 tracking-tight max-w-2xl mx-auto leading-tight mb-3">
          {language === 'hi'
            ? 'चिकित्सा आपातकाल में तुरंत सुरक्षित प्राथमिक चिकित्सा सहायता'
            : 'Immediate, Step-by-Step Medical Emergency Guidance'}
        </h1>

        <p className="text-sm sm:text-base text-surface-600 max-w-xl mx-auto mb-6 sm:mb-8 font-medium">
          {t('home.tagline')}
        </p>

        {/* Primary Action: START EMERGENCY HELP */}
        <div className="max-w-lg mx-auto mb-4">
          <EmergencyButton
            label={t('home.startHelp')}
            sublabel={language === 'hi' ? 'लक्षण बताएं या बोलें • तुरंत मार्गदर्शन प्राप्त करें' : 'Type or speak symptoms • Get instant safety steps'}
            variant="emergency"
            onClick={handleStartEmergency}
            size="large"
          />
        </div>

        {/* Secondary Dual Buttons: Call 112 & Find Nearest Hospital */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
          <a
            href="tel:112"
            className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-emergency-700 hover:bg-emergency-800 text-white font-bold text-base shadow-sm transition-all active:scale-98"
          >
            <Phone className="w-5 h-5 fill-white shrink-0" />
            <span>{t('home.callEmergency')} (112)</span>
          </a>

          <Link
            to="/finder"
            className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-surface-900 hover:bg-surface-800 text-white font-bold text-base shadow-sm transition-all active:scale-98"
          >
            <Navigation className="w-5 h-5 text-primary-light shrink-0" />
            <span>{t('home.findHospital')}</span>
          </Link>
        </div>
      </div>

      {/* Quick Common Emergencies Card Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-surface-900">
            {t('home.commonEmergencies')}
          </h2>
          <Link
            to="/library"
            className="text-xs sm:text-sm font-bold text-emergency-600 hover:text-emergency-700 flex items-center gap-1"
          >
            <span>{language === 'hi' ? 'सभी 14 श्रेणियां देखें' : 'View all 14 categories'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {commonCategories.map((cat) => {
            const name = language === 'hi' && cat.nameHi ? cat.nameHi : cat.name;
            const isCritical = cat.severity === 'critical';

            return (
              <button
                key={cat.id}
                onClick={() => handleQuickCategory(cat.id)}
                className="text-left p-4 rounded-2xl bg-white border border-surface-200 hover:border-surface-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group active:scale-98"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <span className="text-base">{isCritical ? '🔴' : '🟠'}</span>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-surface-900 group-hover:text-emergency-600 transition-colors">
                    {name}
                  </h3>
                  <p className="text-[11px] text-surface-500 font-medium mt-0.5">
                    {cat.firstAidSteps.length} {language === 'hi' ? 'चरण' : 'steps'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Safety & Offline Info Banner */}
      <SafetyDisclaimer />
    </div>
  );
}
