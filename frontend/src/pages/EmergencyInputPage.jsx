import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useVoiceInput } from '../hooks/useVoiceInput';
import { analyzeSymptoms } from '../services/api';
import VoiceInput from '../components/VoiceInput';
import LoadingSpinner from '../components/LoadingSpinner';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import { getAllOfflineCategories } from '../data/offlineFirstAid';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import '../styles/EmergencyInputPage.css';

export default function EmergencyInputPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const hi = language === 'hi';

  const [inputDescription, setInputDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (location.state?.demoText) setInputDescription(location.state.demoText);
  }, [location.state]);

  const { isListening, isSupported, startListening, stopListening, error: voiceError } =
    useVoiceInput((transcriptText) => setInputDescription(transcriptText));

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!inputDescription.trim()) {
      setErrorMessage(hi ? 'पहले बताएँ कि क्या हुआ है।' : 'Please describe what happened first.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const result = await analyzeSymptoms(inputDescription, Boolean(location.state?.isDemo));
      if (result && result.success) {
        navigate('/assessment', { state: { result, userInput: inputDescription } });
      } else {
        throw new Error('Analysis could not complete');
      }
    } catch (err) {
      console.error('[Input Submit Error]', err);
      navigate('/first-aid/other_emergency', {
        state: { note: 'Offline fallback used due to network issue' }
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = getAllOfflineCategories();

  if (loading) {
    return (
      <LoadingSpinner
        message={hi ? 'देख रहे हैं क्या करना है...' : 'Working out what to do...'}
        fullScreen
      />
    );
  }

  return (
    <div className="page page--narrow stack">
      <button className="btn btn--quiet" onClick={() => navigate('/')}>
        <ArrowLeft size={16} />
        {t('app.back')}
      </button>

      <div>
        <h1 className="input__intro">{hi ? 'क्या हुआ है?' : 'What happened?'}</h1>
        <p className="input__hint">
          {hi
            ? 'अपने शब्दों में बताएँ। जैसे — "छाती में तेज़ दर्द है और साँस नहीं आ रही"।'
            : 'Say it in your own words. For example — "chest hurts badly and cannot breathe".'}
        </p>
      </div>

      <VoiceInput
        isListening={isListening}
        isSupported={isSupported}
        onStart={startListening}
        onStop={stopListening}
        error={voiceError}
      />

      <form className="input__form" onSubmit={handleSubmit}>
        <label className="field-label" htmlFor="symptom-input">
          {hi ? 'या यहाँ लिखें' : 'Or type here'}
        </label>

        <textarea
          id="symptom-input"
          rows={4}
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
          placeholder={hi ? 'यहाँ लिखें...' : 'Type here...'}
          className="field input__textarea"
        />

        {errorMessage && <p className="field-error">{errorMessage}</p>}

        <button type="submit" disabled={!inputDescription.trim()} className="btn btn--alert btn--lg">
          {hi ? 'आगे बढ़ें' : 'Continue'}
          <ArrowRight size={20} />
        </button>
      </form>

      <section>
        <h2 className="section-label">{hi ? 'या सीधे चुनें' : 'Or pick directly'}</h2>

        <div className="input__picker">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className="input__pick"
              onClick={() => navigate(`/first-aid/${cat.id}`)}
            >
              <span className="input__pick-icon" aria-hidden="true">{cat.icon}</span>
              <span className="input__pick-name">{hi && cat.nameHi ? cat.nameHi : cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      <SafetyDisclaimer />
    </div>
  );
}
