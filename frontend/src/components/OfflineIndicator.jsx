import React from 'react';
import { WifiOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function OfflineIndicator({ isOnline }) {
  const { language } = useLanguage();

  if (isOnline) return null;

  return (
    <div className="bg-urgent-600 text-white px-4 py-2 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm animate-fade-in sticky top-14 z-30">
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>
        {language === 'hi'
          ? '⚠️ आप ऑफ़लाइन हैं — ऑफ़लाइन प्राथमिक चिकित्सा मार्गदर्शिका सक्रिय है। इंटरनेट आने पर AI और लाइव मैप उपलब्ध होंगे।'
          : '⚠️ You are currently offline — local first-aid guides are fully active. Live AI & maps will resume when connected.'}
      </span>
    </div>
  );
}
