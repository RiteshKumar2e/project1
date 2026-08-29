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
import { ArrowLeft, ArrowRight, RotateCcw, Phone, Navigation, AlertTriangle, Ban, Video } from 'lucide-react';
import '../styles/FirstAidGuidePage.css';

export default function FirstAidGuidePage() {
  const { categoryId } = useParams();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const hi = language === 'hi';

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.assessmentData) {
      const data = location.state.assessmentData;
      setCategoryData({
        ...data.assessment.category,
        severity: data.assessment.severity?.level || 'urgent',
        firstAidSteps: data.firstAid?.steps || [],
        warnings: data.firstAid?.warnings || [],
        warningsHi: data.firstAid?.warningsHi || [],
        doNots: data.firstAid?.doNots || [],
        videos: data.videos || []
      });
      setLoading(false);
      return;
    }

    async function loadData() {
      try {
        const res = await fetchCategoryDetails(categoryId);
        setCategoryData(res?.success && res.category ? res.category : getOfflineCategory(categoryId));
      } catch {
        setCategoryData(getOfflineCategory(categoryId));
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [categoryId, location.state]);

  if (loading || !categoryData) {
    return (
      <LoadingSpinner
        message={hi ? 'कदम लोड हो रहे हैं...' : 'Loading the steps...'}
        fullScreen
      />
    );
  }

  const steps = categoryData.firstAidSteps || [];
  const warnings = (hi && categoryData.warningsHi?.length ? categoryData.warningsHi : categoryData.warnings) || [];
  const doNots = categoryData.doNots || [];
  const videos = categoryData.videos || [];

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const catName = hi && categoryData.nameHi ? categoryData.nameHi : categoryData.name;
  const progress = steps.length ? ((currentStepIndex + 1) / steps.length) * 100 : 0;

  const handleNextStep = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStepIndex]));
    if (!isLastStep) setCurrentStepIndex((prev) => prev + 1);
  };

  return (
    <div className="page page--narrow stack">
      <div className="guide__topbar">
        <button className="btn btn--quiet" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} />
          {t('app.back')}
        </button>

        <a href="tel:112" className="guide__call">
          <Phone size={16} />
          {hi ? '112 कॉल' : 'Call 112'}
        </a>
      </div>

      <div className="card">
        <div className="guide__head">
          <div className="guide__ident">
            <span className="guide__icon" aria-hidden="true">{categoryData.icon || '🩹'}</span>
            <div>
              <div className="guide__kicker">{hi ? 'क्या करना है' : 'What to do'}</div>
              <h1 className="guide__name">{catName}</h1>
            </div>
          </div>
          <SeverityBadge severity={categoryData.severity} />
        </div>

        <div className="guide__progress-row">
          <span>
            {hi ? `कदम ${currentStepIndex + 1} / ${steps.length}` : `Step ${currentStepIndex + 1} of ${steps.length}`}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="guide__track">
          <div className="guide__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* One step on screen at a time, so nobody loses their place */}
      {currentStep && (
        <div>
          <StepCard
            stepNumber={currentStep.step || currentStepIndex + 1}
            totalSteps={steps.length}
            instruction={currentStep.instruction}
            instructionHi={currentStep.instructionHi}
            isCompleted={completedSteps.has(currentStepIndex)}
          />

          <div className="guide__nav">
            {!isFirstStep && (
              <button
                type="button"
                className="btn btn--outline"
                onClick={() => setCurrentStepIndex((prev) => prev - 1)}
              >
                <ArrowLeft size={18} />
                {t('firstAid.prevStep')}
              </button>
            )}

            {!isLastStep ? (
              <button type="button" className="btn btn--alert btn--next btn--lg" onClick={handleNextStep}>
                {t('firstAid.nextStep')}
                <ArrowRight size={20} />
              </button>
            ) : (
              <button
                type="button"
                className="btn btn--next btn--lg guide__done"
                onClick={() => { setCurrentStepIndex(0); setCompletedSteps(new Set()); }}
              >
                <RotateCcw size={20} />
                {hi ? 'फिर से शुरू करें' : 'Start again'}
              </button>
            )}
          </div>
        </div>
      )}

      {warnings.length > 0 && (
        <div className="notice notice--alert">
          <h2 className="guide__panel-title">
            <AlertTriangle size={20} />
            {t('firstAid.warnings')}
          </h2>
          <ul className="guide__list">
            {warnings.map((w, idx) => <li key={idx}>{w}</li>)}
          </ul>
        </div>
      )}

      {doNots.length > 0 && (
        <div className="notice">
          <h2 className="guide__panel-title">
            <Ban size={20} />
            {t('firstAid.doNots')}
          </h2>
          <ul className="guide__list">
            {doNots.map((d, idx) => <li key={idx}>{d}</li>)}
          </ul>
        </div>
      )}

      {videos.length > 0 && (
        <section>
          <h2 className="section-label">
            <Video size={16} />
            {t('firstAid.videos')}
          </h2>
          <div className="guide__videos">
            {videos.map((vid) => <VideoCard key={vid.id} video={vid} />)}
          </div>
        </section>
      )}

      <Link to="/finder" className="btn btn--solid btn--lg">
        <Navigation size={20} />
        {hi ? 'नज़दीकी अस्पताल खोजें' : 'Find the nearest hospital'}
        <ArrowRight size={20} />
      </Link>

      <SafetyDisclaimer />
    </div>
  );
}
