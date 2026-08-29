import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SeverityBadge({ severity, className = '' }) {
  const { language } = useLanguage();
  const level = typeof severity === 'string' ? severity : severity?.level || 'urgent';

  const isCritical = level === 'critical';
  const isUrgent = level === 'urgent';
  const isLessUrgent = level === 'less_urgent';

  let config = {
    bg: 'bg-urgent-50',
    border: 'border-urgent-200',
    text: 'text-urgent-800',
    iconColor: 'text-urgent-600',
    icon: AlertTriangle,
    label: language === 'hi' ? 'अत्यावश्यक (Urgent)' : 'Urgent',
    dot: '🟠'
  };

  if (isCritical) {
    config = {
      bg: 'bg-emergency-50',
      border: 'border-emergency-300',
      text: 'text-emergency-800',
      iconColor: 'text-emergency-600',
      icon: AlertCircle,
      label: language === 'hi' ? 'गंभीर (Critical)' : 'Critical',
      dot: '🔴'
    };
  } else if (isLessUrgent) {
    config = {
      bg: 'bg-safe-50',
      border: 'border-safe-300',
      text: 'text-safe-800',
      iconColor: 'text-safe-600',
      icon: CheckCircle2,
      label: language === 'hi' ? 'कम अत्यावश्यक (Less Urgent)' : 'Less Urgent',
      dot: '🟢'
    };
  }

  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs sm:text-sm font-bold shadow-xs ${config.bg} ${config.border} ${config.text} ${className}`}
    >
      <span className="text-base leading-none">{config.dot}</span>
      <Icon className={`w-4 h-4 ${config.iconColor}`} />
      <span>{config.label}</span>
    </div>
  );
}
