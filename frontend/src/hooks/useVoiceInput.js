import { useState, useEffect, useRef, useCallback } from 'react';
import { isSpeechSupported, createSpeechRecognizer } from '../services/speechService';
import { useLanguage } from '../contexts/LanguageContext';

export function useVoiceInput(onResult) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  const { language } = useLanguage();

  const supported = isSpeechSupported();

  useEffect(() => {
    if (!supported) return;

    const langCode = language === 'hi' ? 'hi-IN' : 'en-IN';
    const recognition = createSpeechRecognizer({
      lang: langCode,
      continuous: false,
      interimResults: true
    });

    if (!recognition) return;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
      if (onResult) {
        onResult(currentTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.warn('[Voice Input Error]', event.error);
      if (event.error !== 'no-speech') {
        setError(event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.abort();
      } catch { /* cleanup */ }
    };
  }, [supported, language, onResult]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      setTranscript('');
      setError(null);
      recognitionRef.current.start();
    } catch (err) {
      console.warn('[Voice start error]', err);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
    } catch { /* ignore */ }
  }, []);

  return {
    isListening,
    transcript,
    error,
    isSupported: supported,
    startListening,
    stopListening
  };
}
