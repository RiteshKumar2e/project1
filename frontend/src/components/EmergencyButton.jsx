import React from 'react';
import { Phone, AlertTriangle, ArrowRight } from 'lucide-react';

export default function EmergencyButton({
  label,
  sublabel,
  icon: Icon = AlertTriangle,
  variant = 'emergency',
  onClick,
  href,
  className = '',
  size = 'large'
}) {
  const isEmergency = variant === 'emergency';
  const isCall = variant === 'call';
  const isPrimary = variant === 'primary';

  const baseStyles = 'relative group w-full rounded-2xl font-bold flex items-center justify-between transition-all duration-200 active:scale-98 shadow-md hover:shadow-lg focus:outline-none';

  let colorStyles = '';
  if (isEmergency) {
    colorStyles = 'bg-emergency-600 hover:bg-emergency-700 text-white animate-emergency-pulse border-2 border-emergency-500';
  } else if (isCall) {
    colorStyles = 'bg-emergency-700 hover:bg-emergency-800 text-white border-2 border-emergency-600';
  } else if (isPrimary) {
    colorStyles = 'bg-surface-900 hover:bg-surface-800 text-white';
  } else {
    colorStyles = 'bg-white hover:bg-surface-50 text-surface-900 border border-surface-300';
  }

  const sizeStyles = size === 'large' ? 'p-5 sm:p-6 text-lg' : 'p-4 text-base';

  const content = (
    <>
      <div className="flex items-center gap-4 text-left">
        <div className={`p-3 rounded-xl ${isEmergency || isCall ? 'bg-white/20' : 'bg-surface-100 text-surface-900'}`}>
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" />
        </div>
        <div>
          <div className="text-lg sm:text-xl font-extrabold tracking-tight leading-tight">{label}</div>
          {sublabel && <div className="text-xs sm:text-sm font-medium opacity-90 mt-0.5">{sublabel}</div>}
        </div>
      </div>
      <ArrowRight className="w-6 h-6 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${colorStyles} ${sizeStyles} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} type="button" className={`${baseStyles} ${colorStyles} ${sizeStyles} ${className}`}>
      {content}
    </button>
  );
}
