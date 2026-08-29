import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SafetyDisclaimer({ className = '' }) {
  const { language } = useLanguage();

  return (
    <div className={`notice ${className}`}>
      <strong className="notice__title">
        {language === 'hi' ? 'ध्यान दें' : 'Please note'}
      </strong>
      {language === 'hi'
        ? 'यह सलाह डॉक्टर की जगह नहीं ले सकती। हालत गंभीर लगे तो पहले 112 पर कॉल करें, फिर ये कदम अपनाएँ।'
        : 'This guidance does not replace a doctor. If the situation looks serious, call 112 first, then follow these steps.'}
    </div>
  );
}
