import React from 'react';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LoadingSpinner({ message, fullScreen = false }) {
  const { language } = useLanguage();
  const hi = language === 'hi';

  return (
    <div className={`loading${fullScreen ? ' loading--full' : ''}`} role="status">
      <Loader2 className="loading__spinner" />
      <p className="loading__title">{message || (hi ? 'जाँच हो रही है...' : 'Checking...')}</p>
      <p className="loading__note">{hi ? 'कुछ ही पल में' : 'This takes a moment'}</p>
    </div>
  );
}
