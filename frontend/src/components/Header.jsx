import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Phone, BookOpen, Activity, Info, Siren, Building2, HeartPulse } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const hi = language === 'hi';

  const navItems = [
    { to: '/library', icon: BookOpen, label: hi ? 'प्राथमिक चिकित्सा' : 'First Aid' },
    { to: '/emergency-services', icon: Siren, label: hi ? 'हेल्पलाइन' : 'Helplines' },
    { to: '/finder', icon: Building2, label: hi ? 'अस्पताल खोजें' : 'Hospitals' },
    { to: '/dashboard', icon: Activity, label: t('dashboard.title') },
    { to: '/about', icon: Info, label: t('about.title') }
  ];

  return (
    <header className="site-header">
      <div className="site-header__bar">
        {/* Top-Left: Logo & Title */}
        <Link to="/" className="site-header__brand">
          <span className="site-header__mark" aria-hidden="true">
            <HeartPulse size={24} color="#ffffff" strokeWidth={2.5} />
          </span>
          <span className="site-header__words">
            <span className="site-header__name">
              {hi ? 'स्वास्थ्‍यसेतु' : 'SwasthyaSetu'}
            </span>
            <span className="site-header__tag">
              {hi ? 'ग्रामीण आपातकालीन स्वास्थ्य सेतु' : 'Rural Emergency & Health Bridge'}
            </span>
          </span>
        </Link>

        {/* Top-Right: Emergency Call & Language Switcher */}
        <div className="site-header__right">
          <a href="tel:112" className="site-header__call is-pulsing">
            <Phone size={18} fill="currentColor" />
            <span>{hi ? '112 पर कॉल' : 'Call 112'}</span>
          </a>

          <div className="lang-switch" role="group" aria-label="Language Selector">
            <button 
              type="button"
              onClick={() => setLanguage('en')} 
              aria-pressed={language === 'en'}
              title="English"
            >
              EN
            </button>
            <button 
              type="button"
              onClick={() => setLanguage('hi')} 
              aria-pressed={language === 'hi'}
              title="हिन्दी"
            >
              हिं
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Bar */}
      <nav className="site-nav no-print">
        <div className="site-nav__inner">
          {navItems.map(({ to, icon: Icon, label }) => (
            <Link 
              key={to} 
              to={to} 
              aria-current={location.pathname === to ? 'page' : undefined}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
