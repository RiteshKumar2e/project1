import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Check } from 'lucide-react';

export default function StepCard({ stepNumber, totalSteps, instruction, instructionHi, isCompleted }) {
  const { language } = useLanguage();
  const hi = language === 'hi';
  const text = hi && instructionHi ? instructionHi : instruction;

  return (
    <div className={`step${isCompleted ? ' is-done' : ''}`}>
      <div className="step__head">
        <span>{hi ? `कदम ${stepNumber} / ${totalSteps}` : `Step ${stepNumber} of ${totalSteps}`}</span>
        {isCompleted && (
          <span className="step__done">
            <Check size={16} />
            {hi ? 'हो गया' : 'Done'}
          </span>
        )}
      </div>

      <p className="step__text">{text}</p>
    </div>
  );
}
