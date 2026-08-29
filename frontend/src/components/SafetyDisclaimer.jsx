import React from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SafetyDisclaimer({ className = '' }) {
  const { language } = useLanguage();

  return (
    <div
      className={`p-4 rounded-2xl bg-surface-100 border border-surface-200 text-xs sm:text-sm text-surface-600 leading-relaxed flex items-start gap-3 ${className}`}
    >
      <ShieldAlert className="w-5 h-5 text-emergency-600 shrink-0 mt-0.5" />
      <div>
        <div className="font-bold text-surface-800 mb-0.5">
          {language === 'hi' ? 'चिकित्सा अस्वीकरण (Medical Disclaimer)' : 'Important Safety Notice'}
        </div>
        <p>
          {language === 'hi'
            ? 'यह जानकारी केवल आपातकालीन प्राथमिक चिकित्सा सहायता के लिए है। यह डॉक्टर या आपातकालीन चिकित्सा सेवा का विकल्प नहीं है। गंभीर स्थिति में तुरंत 112 डायल करें।'
            : 'This platform provides emergency first-aid guidance only and does not replace a doctor or medical professional. Always call emergency services (112) for critical situations.'}
        </p>
      </div>
    </div>
  );
}
