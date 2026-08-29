import React from 'react';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LoadingSpinner({ message, fullScreen = false }) {
  const { language } = useLanguage();
  const text = message || (language === 'hi' ? 'विश्लेषण हो रहा है...' : 'Processing emergency data...');

  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="w-14 h-14 rounded-2xl bg-emergency-50 flex items-center justify-center text-emergency-600 mb-4 shadow-inner">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
      <p className="text-base sm:text-lg font-bold text-surface-800">{text}</p>
      <p className="text-xs text-surface-500 mt-1">
        {language === 'hi' ? 'सुरक्षा नियमों और मार्गदर्शन की तैयारी...' : 'Consulting safety rules & verified guidance...'}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}
