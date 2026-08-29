import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

/*
  One signal, not three. The original showed a coloured dot, an icon and a
  word for the same fact; colour alone also fails for colour-blind users,
  so this keeps icon plus word and drops the decorative dot.
*/
const LEVELS = {
  critical: { cls: 'severity--critical', Icon: AlertCircle, en: 'Critical', hi: 'गंभीर' },
  urgent: { cls: 'severity--urgent', Icon: AlertTriangle, en: 'Urgent', hi: 'ज़रूरी' },
  less_urgent: { cls: 'severity--mild', Icon: Info, en: 'Less Urgent', hi: 'कम गंभीर' }
};

export default function SeverityBadge({ severity, className = '' }) {
  const { language } = useLanguage();
  const level = typeof severity === 'string' ? severity : severity?.level || 'urgent';
  const { cls, Icon, en, hi } = LEVELS[level] || LEVELS.urgent;

  return (
    <span className={`severity ${cls} ${className}`}>
      <Icon size={16} />
      {language === 'hi' ? hi : en}
    </span>
  );
}
