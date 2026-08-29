import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getOfflineCategory } from '../data/offlineFirstAid';
import { fetchCategoryDetails } from '../services/api';
import StepCard from '../components/StepCard';
import VideoCard from '../components/VideoCard';
import SeverityBadge from '../components/SeverityBadge';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowLeft, ArrowRight, RotateCcw, Phone, Navigation, AlertTriangle, ShieldCheck, Video } from 'lucide-react';

export default function FirstAidGuidePage() {
  const { categoryId } = useParams();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check if assessment data was passed via router state
    if (location.state?.assessmentData) {
      const data = location.state.assessmentData;
      setCategoryData({
        ...data.assessment.category,
        severity: data.assessment.severity?.level || 'urgent',
        severityInfo: data.assessment.severity,
        firstAidSteps: data.firstAid?.steps || [],
        warnings: data.firstAid?.warnings || [],
        warningsHi: data.firstAid?.warningsHi || [],
        doNots: data.firstAid?.doNots || [],
        videos: data.videos || []
      });
      setLoading(false);
      return;
    }

    // 2. Otherwise load category details from API or local offline knowledge base
    async function loadData() {
      try {
        const res = await fetchCategoryDetails(categoryId);
        if (res?.success && res.category) {
          setCategoryData(res.category);
        } else {
          const fallback = getOfflineCategory(categoryId);
          setCategoryData(fallback);
        }
      } catch {
        const fallback = getOfflineCategory(categoryId);
        setCategoryData(fallback);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [categoryId, location.state]);

  if (loading || !categoryData) {
    return <LoadingSpinner message={language === 'hi' ? 'प्राथमिक चिकित्सा लोड हो रही है...' : 'Loading first aid instructions...'} fullScreen />;
  }

  const steps = categoryData.firstAidSteps || [];
  const warnings = language === 'hi' && categoryData.warningsHi ? categoryData.warningsHi : categoryData.warnings || [];
  const doNots = categoryData.doNots || [];
  const videos = categoryData.videos || [];

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const isCritical = categoryData.severity === 'critical';

  const catName = language === 'hi' && categoryData.nameHi ? categoryData.nameHi : categoryData.name;

  const handleNextStep = () => {
    setCompletedSteps(prev => new Set([...prev, currentStepIndex]));
    if (!isLastStep) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setCompletedSteps(new Set());
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fade-in">
      {/* Top Bar with Navigation & Call */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-surface-600 hover:text-surface-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('app.back')}</span>
        </button>

        <a
          href="tel:112"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emergency-600 text-white text-xs font-bold shadow-xs hover:bg-emergency-700"
        >
          <Phone className="w-3.5 h-3.5 fill-white" />
          <span>{language === 'hi' ? '112 कॉल करें' : 'Call 112'}</span>
        </a>
      </div>

      {/* Guide Header Card */}
      <div className="bg-white border border-surface-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <span className="text-4xl">{categoryData.icon || '🩹'}</span>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-surface-500">
                {t('firstAid.title')}
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-surface-900">
                {catName}
              </h1>
            </div>
          </div>
          <SeverityBadge severity={categoryData.severity} />
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-bold text-surface-600 mb-1.5">
            <span>
              {language === 'hi' ? `चरण ${currentStepIndex + 1} / ${steps.length}` : `Step ${currentStepIndex + 1} of ${steps.length}`}
            </span>
            <span>
              {Math.round(((currentStepIndex + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-surface-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emergency-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Step Display */}
      {currentStep && (
        <div className="space-y-4">
          <StepCard
            stepNumber={currentStep.step || currentStepIndex + 1}
            totalSteps={steps.length}
            instruction={currentStep.instruction}
            instructionHi={currentStep.instructionHi}
            icon={currentStep.icon}
            isCompleted={completedSteps.has(currentStepIndex)}
          />

          {/* Step Navigation Controls */}
          <div className="flex items-center gap-3">
            {!isFirstStep && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="flex-1 py-4 px-4 rounded-2xl bg-white border border-surface-300 hover:bg-surface-50 text-surface-800 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:scale-98 shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t('firstAid.prevStep')}</span>
              </button>
            )}

            {!isLastStep ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex-[2] py-4 sm:py-5 px-6 rounded-2xl bg-emergency-600 hover:bg-emergency-700 text-white font-extrabold text-base sm:text-lg flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <span>{t('firstAid.nextStep')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="flex-[2] py-4 sm:py-5 px-6 rounded-2xl bg-safe-600 hover:bg-safe-700 text-white font-extrabold text-base sm:text-lg flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
                <span>{language === 'hi' ? 'चरण दोबारा देखें (Restart)' : 'Restart Steps'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Warnings & Safety Box */}
      {warnings.length > 0 && (
        <div className="p-5 sm:p-6 rounded-2xl bg-emergency-50 border border-emergency-200">
          <h3 className="text-sm sm:text-base font-extrabold text-emergency-900 flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-emergency-600 shrink-0" />
            <span>{t('firstAid.warnings')}</span>
          </h3>
          <ul className="space-y-1.5 text-xs sm:text-sm text-emergency-800 font-medium">
            {warnings.map((w, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emergency-600 font-bold">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Do NOT Box */}
      {doNots.length > 0 && (
        <div className="p-5 sm:p-6 rounded-2xl bg-surface-100 border border-surface-200">
          <h3 className="text-sm sm:text-base font-extrabold text-surface-900 flex items-center gap-2 mb-2">
            <span className="text-lg">🚫</span>
            <span>{t('firstAid.doNots')}</span>
          </h3>
          <ul className="space-y-1.5 text-xs sm:text-sm text-surface-700 font-medium">
            {doNots.map((d, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-surface-400 font-bold">•</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Instructional Videos Section */}
      {videos.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-emergency-600" />
            <h2 className="text-base sm:text-lg font-extrabold text-surface-900">
              {t('firstAid.videos')}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {videos.map((vid) => (
              <VideoCard key={vid.id} video={vid} />
            ))}
          </div>
        </div>
      )}

      {/* Bottom Actions: Find Nearest Hospital */}
      <div className="pt-4 border-t border-surface-200">
        <Link
          to="/finder"
          className="w-full flex items-center justify-between p-5 rounded-2xl bg-surface-900 hover:bg-surface-800 text-white font-extrabold text-base shadow-md transition-all active:scale-98"
        >
          <div className="flex items-center gap-3">
            <Navigation className="w-6 h-6 text-primary-light" />
            <div className="text-left">
              <div>{t('facilities.title')}</div>
              <div className="text-xs font-normal text-surface-300">{language === 'hi' ? 'नजदीकी अस्पताल व प्राथमिक स्वास्थ्य केंद्र' : 'Locate nearest hospital, CHC, or PHC'}</div>
            </div>
          </div>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <SafetyDisclaimer />
    </div>
  );
}
