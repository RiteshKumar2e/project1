import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Check, AlertTriangle } from 'lucide-react';

export default function StepCard({ stepNumber, totalSteps, instruction, instructionHi, icon, isCompleted }) {
  const { language } = useLanguage();
  const text = language === 'hi' && instructionHi ? instructionHi : instruction;

  return (
    <div className={`p-5 sm:p-7 rounded-2xl border-2 transition-all ${
      isCompleted
        ? 'bg-safe-50/60 border-safe-300 opacity-80'
        : 'bg-white border-surface-200 shadow-lg'
    }`}>
      <div className="flex items-start gap-4">
        {/* Step Badge / Icon */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-xl font-bold shadow-xs ${
          isCompleted
            ? 'bg-safe-500 text-white'
            : 'bg-surface-900 text-white'
        }`}>
          {isCompleted ? <Check className="w-6 h-6" /> : (icon || stepNumber)}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-surface-500">
              {language === 'hi' ? `चरण ${stepNumber} / ${totalSteps}` : `Step ${stepNumber} of ${totalSteps}`}
            </span>
            {isCompleted && (
              <span className="text-xs font-bold text-safe-600 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                {language === 'hi' ? 'पूर्ण' : 'Done'}
              </span>
            )}
          </div>

          <p className="text-lg sm:text-2xl font-bold text-surface-900 leading-snug">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
