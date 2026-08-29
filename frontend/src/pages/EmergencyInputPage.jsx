import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useVoiceInput } from '../hooks/useVoiceInput';
import { analyzeSymptoms } from '../services/api';
import VoiceInput from '../components/VoiceInput';
import LoadingSpinner from '../components/LoadingSpinner';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import { getAllOfflineCategories } from '../data/offlineFirstAid';
import { Send, ArrowLeft, AlertCircle, Sparkles, Mic } from 'lucide-react';

export default function EmergencyInputPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [inputDescription, setInputDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Check if passed from demo mode
  useEffect(() => {
    if (location.state?.demoText) {
      setInputDescription(location.state.demoText);
    }
  }, [location.state]);

  const { isListening, isSupported, startListening, stopListening, error: voiceError } = useVoiceInput(
    (transcriptText) => {
      setInputDescription(transcriptText);
    }
  );

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!inputDescription.trim()) {
      setErrorMessage(language === 'hi' ? 'कृपया स्थिति का वर्णन करें।' : 'Please describe the emergency.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const isDemo = Boolean(location.state?.isDemo);
      const result = await analyzeSymptoms(inputDescription, isDemo);

      if (result && result.success) {
        navigate('/assessment', { state: { result, userInput: inputDescription } });
      } else {
        throw new Error('Analysis could not complete');
      }
    } catch (err) {
      console.error('[Input Submit Error]', err);
      // Even on failure, redirect to general emergency guidance
      navigate('/first-aid/other_emergency', {
        state: { note: 'Offline fallback used due to network issue' }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDirectCategory = (catId) => {
    navigate(`/first-aid/${catId}`);
  };

  const categories = getAllOfflineCategories();

  if (loading) {
    return <LoadingSpinner message={language === 'hi' ? 'आपातकाल का विश्लेषण हो रहा है...' : 'Analyzing symptoms & determining emergency safety rules...'} fullScreen />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-surface-600 hover:text-surface-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t('app.back')}</span>
      </button>

      {/* Main Form Box */}
      <div className="bg-white border border-surface-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emergency-50 text-emergency-700 text-xs font-bold uppercase tracking-wider mb-2">
            <AlertCircle className="w-3.5 h-3.5" />
            {t('input.title')}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-surface-900 tracking-tight">
            {language === 'hi' ? 'आपातकालीन स्थिति क्या है?' : 'What is happening right now?'}
          </h1>
          <p className="text-xs sm:text-sm text-surface-500 mt-1">
            {language === 'hi'
              ? 'साधारण भाषा में बताएं। बोलें या नीचे लिखें — हम तुरंत सही सुरक्षा कदम दिखाएंगे।'
              : 'Describe what you see in simple words. Speak or type below to receive immediate first-aid instructions.'}
          </p>
        </div>

        {/* Voice Input Button */}
        <div className="bg-surface-50 p-4 rounded-2xl border border-surface-200 flex flex-col items-center justify-center">
          <VoiceInput
            isListening={isListening}
            isSupported={isSupported}
            onStart={startListening}
            onStop={stopListening}
            error={voiceError}
          />
        </div>

        {/* Text Area Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="symptom-input" className="block text-xs font-bold uppercase tracking-wider text-surface-600 mb-1.5">
              {language === 'hi' ? 'लक्षण लिखें (Type Symptoms):' : 'Describe in text:'}
            </label>
            <textarea
              id="symptom-input"
              rows={4}
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
              placeholder={t('input.placeholder')}
              className="w-full p-4 rounded-2xl border-2 border-surface-200 focus:border-emergency-500 focus:ring-0 text-base sm:text-lg text-surface-900 placeholder:text-surface-400 resize-none font-medium transition-all"
            />
          </div>

          {errorMessage && (
            <p className="text-xs font-bold text-emergency-600">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={!inputDescription.trim()}
            className={`w-full p-4 sm:p-5 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-3 transition-all shadow-md active:scale-98 ${
              inputDescription.trim()
                ? 'bg-emergency-600 hover:bg-emergency-700 text-white cursor-pointer'
                : 'bg-surface-200 text-surface-400 cursor-not-allowed'
            }`}
          >
            <span>{t('input.submit')}</span>
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Or Select Category Directly */}
      <div className="bg-white border border-surface-200 rounded-3xl p-6 shadow-xs space-y-4">
        <h2 className="text-sm sm:text-base font-extrabold text-surface-800">
          {t('input.orSelect')}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {categories.map((cat) => {
            const name = language === 'hi' && cat.nameHi ? cat.nameHi : cat.name;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectDirectCategory(cat.id)}
                className="text-left p-3 rounded-xl bg-surface-50 hover:bg-emergency-50 hover:text-emergency-800 border border-surface-200 text-xs sm:text-sm font-bold text-surface-800 transition-all flex items-center gap-2"
              >
                <span className="text-xl">{cat.icon}</span>
                <span className="line-clamp-1">{name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <SafetyDisclaimer />
    </div>
  );
}
