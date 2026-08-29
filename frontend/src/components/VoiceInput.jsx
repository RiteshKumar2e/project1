import React from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function VoiceInput({ isListening, isSupported, onStart, onStop, error }) {
  const { t, language } = useLanguage();

  if (!isSupported) {
    return (
      <div className="flex items-center gap-2 p-3 bg-surface-100 border border-surface-200 rounded-xl text-xs text-surface-600">
        <AlertCircle className="w-4 h-4 text-surface-500 shrink-0" />
        <span>{t('input.voiceUnavailable')}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={isListening ? onStop : onStart}
        className={`relative flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all shadow-md active:scale-95 ${
          isListening
            ? 'bg-emergency-600 text-white animate-emergency-pulse'
            : 'bg-surface-900 hover:bg-surface-800 text-white'
        }`}
        aria-label={isListening ? 'Stop voice recording' : 'Start voice input'}
      >
        {isListening ? (
          <>
            <MicOff className="w-6 h-6 animate-spin" />
            <span className="text-base">{t('input.voiceListening')} ({language === 'hi' ? 'रोकने के लिए दबाएं' : 'Tap to Stop'})</span>
          </>
        ) : (
          <>
            <Mic className="w-6 h-6 text-emergency-400" />
            <span className="text-base">{language === 'hi' ? '🎙️ बोलकर बताएं (Voice Input)' : '🎙️ Speak Symptoms (Voice)'}</span>
          </>
        )}
      </button>

      {error && (
        <p className="text-xs text-emergency-600 mt-2 font-medium">
          {language === 'hi' ? 'आवाज़ पहचानी नहीं गई। कृपया दोबारा बोलें या नीचे टाइप करें।' : `Microphone error: ${error}. Try typing below.`}
        </p>
      )}
    </div>
  );
}
