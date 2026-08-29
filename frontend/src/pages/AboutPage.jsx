import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import { ShieldCheck, Lock, Heart, BookOpen, AlertTriangle } from 'lucide-react';

export default function AboutPage() {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white border border-surface-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emergency-50 text-emergency-700 text-xs font-extrabold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          {t('about.title')}
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-surface-900 tracking-tight leading-tight">
          {language === 'hi'
            ? 'सुरक्षा, गोपनीयता एवं प्लेटफॉर्म के बारे में'
            : 'Safety, Privacy & Platform Mission'}
        </h1>
        <p className="text-xs sm:text-sm text-surface-500 mt-2 max-w-2xl font-medium">
          {language === 'hi'
            ? 'दूरदराज और ग्रामीण क्षेत्रों में आपातकालीन समय में त्वरित और सुरक्षित प्राथमिक चिकित्सा सहायता प्रदान करने का संकल्प।'
            : 'Bridging the critical golden hour for remote and rural communities with safe, verified first-aid guidance.'}
        </p>
      </div>

      {/* How it Works Step-by-Step */}
      <div className="bg-white border border-surface-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg sm:text-xl font-extrabold text-surface-900">
          {t('about.howItWorks')}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {[
            { num: '1', title: t('about.step1'), icon: '🎙️' },
            { num: '2', title: t('about.step2'), icon: '🤖' },
            { num: '3', title: t('about.step3'), icon: '🛡️' },
            { num: '4', title: t('about.step4'), icon: '📋' },
            { num: '5', title: t('about.step5'), icon: '🏥' }
          ].map((item) => (
            <div key={item.num} className="p-4 rounded-2xl bg-surface-50 border border-surface-200 text-center space-y-2">
              <span className="text-2xl">{item.icon}</span>
              <div className="text-xs font-extrabold text-surface-900">
                {language === 'hi' ? `चरण ${item.num}` : `Step ${item.num}`}
              </div>
              <p className="text-xs text-surface-600 leading-snug">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Safety Protocols & Disclaimers */}
      <div className="p-6 sm:p-8 rounded-3xl bg-emergency-50 border border-emergency-200 space-y-3">
        <h2 className="text-base sm:text-lg font-extrabold text-emergency-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-emergency-600" />
          {t('about.disclaimer')}
        </h2>
        <p className="text-xs sm:text-sm text-emergency-800 leading-relaxed font-medium">
          {t('about.disclaimerText')}
        </p>
      </div>

      {/* Privacy Policy Box */}
      <div className="bg-white border border-surface-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <h2 className="text-base sm:text-lg font-extrabold text-surface-900 flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          {t('about.privacy')}
        </h2>
        <p className="text-xs sm:text-sm text-surface-600 leading-relaxed">
          {t('about.privacyText')}
        </p>
      </div>

      {/* References & Medical Protocol Credits */}
      <div className="bg-white border border-surface-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <h2 className="text-base sm:text-lg font-extrabold text-surface-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-safe-600" />
          {t('about.credits')}
        </h2>
        <p className="text-xs sm:text-sm text-surface-600 leading-relaxed">
          {t('about.creditsText')}
        </p>
        <div className="flex items-center gap-4 pt-2 flex-wrap text-xs text-surface-500 font-semibold">
          <span>• World Health Organization (WHO)</span>
          <span>• International Federation of Red Cross</span>
          <span>• St John Ambulance First Aid Manuals</span>
          <span>• National Health Mission (India)</span>
        </div>
      </div>

      <SafetyDisclaimer />
    </div>
  );
}
