import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SeverityBadge from '../components/SeverityBadge';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import { Phone, ArrowRight, BookOpen, Navigation } from 'lucide-react';
import '../styles/AssessmentPage.css';

export default function AssessmentPage() {
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const hi = language === 'hi';

  const assessmentData = location.state?.result;
  const userInput = location.state?.userInput || '';

  if (!assessmentData) {
    return (
      <div className="assess__empty">
        <h2>{hi ? 'कोई जानकारी नहीं मिली' : 'Nothing to show yet'}</h2>
        <p>{hi ? 'पहले बताएँ कि क्या हुआ है।' : 'Tell us what happened first.'}</p>
        <Link to="/emergency-input" className="btn btn--alert">
          {hi ? 'शुरू करें' : 'Start here'}
        </Link>
      </div>
    );
  }

  const { assessment } = assessmentData;
  const { category, severity } = assessment;
  const isCritical = severity.level === 'critical';

  const catName = hi && category.nameHi ? category.nameHi : category.name;
  const severityMsg = hi && severity.messageHi ? severity.messageHi : severity.message;

  return (
    <div className="page page--narrow stack">
      {isCritical && (
        <a href="tel:112" className="assess__call is-pulsing">
          <Phone size={36} />
          <span className="action__body">
            <span className="assess__call-label">{hi ? 'अभी 112 पर कॉल करें' : 'Call 112 now'}</span>
            <span className="assess__call-note">
              {hi ? 'दबाते ही फ़ोन लग जाएगा' : 'Tap to dial immediately'}
            </span>
          </span>
        </a>
      )}

      <div className="card">
        <div className="assess__head">
          <div className="assess__ident">
            <span className="assess__icon" aria-hidden="true">{category.icon || '🚨'}</span>
            <div>
              <div className="assess__kicker">{hi ? 'यह लग रहा है' : 'This looks like'}</div>
              <h1 className="assess__name">{catName}</h1>
            </div>
          </div>
          <SeverityBadge severity={severity} />
        </div>

        <p className={`notice ${isCritical ? 'notice--alert' : 'notice--warn'}`}>
          {severityMsg}
        </p>

        {userInput && (
          <p className="assess__echo">
            <strong>{hi ? 'आपने बताया: ' : 'You said: '}</strong>
            {userInput}
          </p>
        )}
      </div>

      <div className="assess__actions">
        <button
          type="button"
          className="btn btn--solid btn--lg"
          onClick={() => navigate(`/first-aid/${category.id}`, { state: { assessmentData } })}
        >
          <BookOpen size={20} />
          {hi ? 'क्या करना है, देखें' : 'Show me what to do'}
          <ArrowRight size={20} />
        </button>

        <Link to="/finder" className="btn btn--outline">
          <Navigation size={20} />
          {t('assessment.findHospital')}
        </Link>
      </div>

      <SafetyDisclaimer />
    </div>
  );
}
