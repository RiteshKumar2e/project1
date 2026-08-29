/**
 * Speech Recognition Service
 * Wraps browser Web Speech API (SpeechRecognition / webkitSpeechRecognition)
 */

export function isSpeechSupported() {
  return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
}

export function createSpeechRecognizer(options = {}) {
  if (!isSpeechSupported()) {
    return null;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = options.continuous || false;
  recognition.interimResults = options.interimResults || true;
  recognition.lang = options.lang || 'en-IN'; // Default to Indian English / Hindi

  return recognition;
}
