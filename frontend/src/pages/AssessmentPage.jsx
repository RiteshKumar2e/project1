import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SeverityBadge from '../components/SeverityBadge';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import { AlertCircle, Phone, ArrowRight, BookOpen, Navigation, ShieldCheck, HeartPulse } from 'lucide-react';

export default function AssessmentPage() {
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const assessmentData = location.state?.result;
  const userInput = location.state?.userInput || '';

  // If page accessed directly with no data, redirect to home
  if (!assessmentData) {
    return (
      <div className="max-w-md mx-auto my-12 text-center p-8 bg-white rounded-3xl border border-surface-200 shadow-sm">
        <h2 className="text-xl font-bold text-surface-900 mb-2">No Active Assessment</h2>
        <p className="text-sm text-surface-500 mb-6">Please describe your symptoms on the emergency input screen.</p>
        <Link
          to="/emergency-input"
          className="inline-block py-3 px-6 bg-emergency-600 text-white font-bold rounded-xl text-sm"
        >
          Go to Emergency Input
        </Link>
      </div>
    );
  }

  const { assessment, firstAid, videos, safety, meta } = assessmentData;
  const category = assessment.category;
  const severity = assessment.severity;
  const isCritical = severity.level === 'critical';

  const catName = language === 'hi' && category.nameHi ? category.nameHi : category.name;
  const catDesc = language === 'hi' && category.descriptionHi ? category.descriptionHi : category.description;
  const severityMsg = language === 'hi' && severity.messageHi ? severity.messageHi : severity.message;

  const handleProceedToFirstAid = () => {
    navigate(`/first-aid/${category.id}`, { state: { assessmentData } });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fade-in">
      {/* Top Header Card */}
      <div className={`p-6 sm:p-8 rounded-3xl border-2 shadow-sm ${
        isCritical
          ? 'bg-emergency-50/70 border-emergency-400 animate-emergency-pulse'
          : 'bg-white border-surface-200'
      }`}>
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-4xl">{category.icon || '🚨'}</span>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-surface-500">
                {t('assessment.category')}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900 leading-tight">
                {catName}
              </h1>
            </div>
          </div>
          <SeverityBadge severity={severity} />
        </div>

        {/* Severity Banner Message */}
        <div className={`p-4 rounded-2xl mb-6 font-bold text-sm sm:text-base flex items-center gap-3 ${
          isCritical
            ? 'bg-emergency-600 text-white shadow-md'
            : 'bg-urgent-100 text-urgent-900'
        }`}>
          <AlertCircle className="w-6 h-6 shrink-0" />
          <div>
            <div className="text-xs uppercase tracking-wider opacity-90">
              {isCritical ? (language === 'hi' ? '🚨 तत्काल कार्रवाई आवश्यक' : '🚨 CRITICAL EMERGENCY') : (language === 'hi' ? '⚠️ चिकित्सा ध्यान आवश्यक' : '⚠️ URGENT MEDICAL ATTENTION')}
            </div>
            <div className="text-base sm:text-lg font-extrabold">{severityMsg}</div>
          </div>
        </div>

        {/* If Critical, show large CALL 112 CTA NOW */}
        {isCritical && (
          <div className="mb-6">
            <a
              href="tel:112"
              className="w-full flex items-center justify-between p-5 rounded-2xl bg-emergency-700 hover:bg-emergency-800 text-white font-extrabold text-lg sm:text-xl shadow-lg transition-all hover:scale-[1.01] active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Phone className="w-7 h-7 fill-white" />
                </div>
                <div className="text-left">
                  <div>{t('assessment.callNow')}</div>
                  <div className="text-xs font-medium text-emergency-100">{language === 'hi' ? 'दबाते ही 112 डायल होगा' : 'Direct emergency response line (112)'}</div>
                </div>
              </div>
              <span className="text-2xl">📞</span>
            </a>
          </div>
        )}

        {/* User symptom recap */}
        {userInput && (
          <div className="bg-surface-50 p-4 rounded-2xl border border-surface-200 text-xs sm:text-sm text-surface-700 mb-6">
            <span className="font-bold text-surface-900 block mb-1">
              {language === 'hi' ? 'आपके द्वारा बताए गए लक्षण:' : 'Reported Symptoms:'}
            </span>
            <p className="italic">"{userInput}"</p>
          </div>
        )}

        {/* Main Action Buttons: View Step-by-Step Guide & Find Hospital */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={handleProceedToFirstAid}
            className="flex items-center justify-center gap-3 p-4 sm:p-5 rounded-2xl bg-surface-900 hover:bg-surface-800 text-white font-extrabold text-base sm:text-lg shadow-md transition-all active:scale-98 cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-emergency-400 shrink-0" />
            <span>{t('assessment.viewFirstAid')}</span>
            <ArrowRight className="w-5 h-5 ml-auto" />
          </button>

          <Link
            to="/finder"
            className="flex items-center justify-center gap-3 p-4 sm:p-5 rounded-2xl bg-white hover:bg-surface-50 text-surface-900 border-2 border-surface-300 font-extrabold text-base sm:text-lg shadow-sm transition-all active:scale-98"
          >
            <Navigation className="w-5 h-5 text-primary shrink-0" />
            <span>{t('assessment.findHospital')}</span>
            <ArrowRight className="w-5 h-5 ml-auto opacity-60" />
          </Link>
        </div>
      </div>

      {/* Safety System Notice */}
      <SafetyDisclaimer />
    </div>
  );
}
