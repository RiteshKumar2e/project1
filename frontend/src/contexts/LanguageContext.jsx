import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import en from '../data/translations/en.json';
import hi from '../data/translations/hi.json';

const translations = { en, hi };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('emergency_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('emergency_lang', language);
      document.documentElement.lang = language;
    } catch { /* localStorage unavailable */ }
  }, [language]);

  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    if (value === undefined) {
      // Fallback to English
      value = translations.en;
      for (const k of keys) {
        value = value?.[k];
      }
    }
    return value || key;
  }, [language]);

  const switchLanguage = useCallback((lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: switchLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
