import React from 'react';
import { Mic, Square, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function VoiceInput({ isListening, isSupported, onStart, onStop, error }) {
  const { t, language } = useLanguage();
  const hi = language === 'hi';

  if (!isSupported) {
    return (
      <div className="notice">
        <AlertCircle size={16} style={{ display: 'inline', verticalAlign: '-3px', marginRight: 6 }} />
        {t('input.voiceUnavailable')}
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={isListening ? onStop : onStart}
        className={`voice-btn${isListening ? ' is-listening is-pulsing' : ''}`}
      >
        {/* A square is the universal stop mark; a spinning mic-off icon was not */}
        {isListening ? <Square size={24} fill="currentColor" /> : <Mic size={24} />}
        <span>
          {isListening
            ? (hi ? 'सुन रहे हैं — रोकने के लिए दबाएँ' : 'Listening — tap to stop')
            : (hi ? 'बोलकर बताएँ' : 'Speak instead of typing')}
        </span>
      </button>

      {error && (
        <p className="voice-btn__error">
          {hi
            ? 'आवाज़ समझ नहीं आई। दोबारा बोलें या नीचे लिखें।'
            : 'Could not hear that. Try again, or type below.'}
        </p>
      )}
    </div>
  );
}
