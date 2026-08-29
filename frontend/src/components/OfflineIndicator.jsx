import React from 'react';
import { WifiOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function OfflineIndicator({ isOnline }) {
  const { language } = useLanguage();

  if (isOnline) return null;

  return (
    <div className="offline-bar" role="status">
      <WifiOff size={16} />
      <span>
        {language === 'hi'
          ? 'इंटरनेट नहीं है — प्राथमिक चिकित्सा के सभी कदम फिर भी काम करेंगे।'
          : 'No internet — all first-aid steps still work.'}
      </span>
    </div>
  );
}
