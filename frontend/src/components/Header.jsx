import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { Phone, Shield, BookOpen, Activity, Info, Globe, Wifi, WifiOff } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const isOnline = useOnlineStatus();
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-surface-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-2.5 text-surface-900 group">
          <div className="w-10 h-10 rounded-xl bg-emergency-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <span className="text-2xl">🚑</span>
          </div>
          <div>
            <div className="font-bold text-lg leading-tight tracking-tight text-surface-900 group-hover:text-emergency-600 transition-colors">
              {language === 'hi' ? 'आपातकालीन सहायता' : 'Emergency Aid'}
            </div>
            <div className="text-xs text-surface-500 font-medium hidden sm:block">
              {language === 'hi' ? 'ग्रामीण व दूरदराज क्षेत्रों के लिए' : 'Rural Emergency Assistant'}
            </div>
          </div>
        </Link>

        {/* Right Actions: Navigation, Language, Connectivity */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/library"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                location.pathname === '/library' ? 'bg-surface-100 text-surface-900' : 'text-surface-600 hover:text-surface-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              {t('home.firstAidLibrary')}
            </Link>
            <Link
              to="/emergency-services"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                location.pathname === '/emergency-services' ? 'bg-emergency-50 text-emergency-700' : 'text-surface-600 hover:text-emergency-700'
              }`}
            >
              <Phone className="w-4 h-4 text-emergency-600" />
              112
            </Link>
            <Link
              to="/dashboard"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                location.pathname === '/dashboard' ? 'bg-surface-100 text-surface-900' : 'text-surface-600 hover:text-surface-900'
              }`}
            >
              <Activity className="w-4 h-4" />
              {t('dashboard.title')}
            </Link>
            <Link
              to="/about"
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                location.pathname === '/about' ? 'bg-surface-100 text-surface-900' : 'text-surface-600 hover:text-surface-900'
              }`}
            >
              <Info className="w-4 h-4" />
              {t('about.title')}
            </Link>
          </nav>

          {/* Online/Offline Badge */}
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
              isOnline
                ? 'bg-safe-50 text-safe-700 border-safe-200'
                : 'bg-urgent-50 text-urgent-700 border-urgent-200 animate-gentle-pulse'
            }`}
            title={isOnline ? 'Internet connected' : 'Offline mode - local first-aid guides active'}
          >
            {isOnline ? <Wifi className="w-3.5 h-3.5 text-safe-600" /> : <WifiOff className="w-3.5 h-3.5 text-urgent-600" />}
            <span className="hidden sm:inline">{isOnline ? 'Online' : 'Offline'}</span>
          </div>

          {/* Language Switcher Button */}
          <div className="flex items-center bg-surface-100 p-0.5 rounded-lg border border-surface-200">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                language === 'en'
                  ? 'bg-white text-surface-900 shadow-xs'
                  : 'text-surface-500 hover:text-surface-800'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                language === 'hi'
                  ? 'bg-white text-surface-900 shadow-xs'
                  : 'text-surface-500 hover:text-surface-800'
              }`}
            >
              हिन्दी
            </button>
          </div>

          {/* Direct 112 Call Button */}
          <a
            href="tel:112"
            className="flex items-center gap-1.5 bg-emergency-600 hover:bg-emergency-700 text-white font-bold px-3 py-1.5 rounded-lg text-sm shadow-sm transition-all hover:scale-105"
            aria-label="Call Emergency Services 112"
          >
            <Phone className="w-4 h-4 fill-white" />
            <span className="hidden xs:inline">112</span>
          </a>
        </div>
      </div>
    </header>
  );
}
