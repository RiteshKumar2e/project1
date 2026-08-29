import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Phone, BookOpen, Activity, Info, Siren, Building2 } from 'lucide-react';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const hi = language === 'hi';

  const navItems = [
    { to: '/library', icon: BookOpen, label: hi ? 'प्राथमिक चिकित्सा' : 'First Aid' },
    { to: '/emergency-services', icon: Siren, label: hi ? 'हेल्पलाइन' : 'Helplines' },
    { to: '/finder', icon: Building2, label: hi ? 'अस्पताल' : 'Hospitals' },
    { to: '/dashboard', icon: Activity, label: t('dashboard.title') },
    { to: '/about', icon: Info, label: t('about.title') }
  ];

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <Link to="/" className="site-header__brand">
          {/* A plain red cross reads at 32px, prints, and needs no emoji font */}
          <span className="site-header__mark" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7z" /></svg>
          </span>
          <span className="site-header__words">
            <span className="site-header__name">
              {hi ? 'आपातकालीन सहायता' : 'Emergency Help'}
            </span>
            <span className="site-header__tag">
              {hi ? 'गाँव व दूरदराज के लिए' : 'For villages & remote areas'}
            </span>
          </span>
        </Link>

        <a href="tel:112" className="site-header__call">
          <Phone size={20} />
          <span>{hi ? '112 पर कॉल' : 'Call 112'}</span>
        </a>

        <div className="lang-switch">
          <button onClick={() => setLanguage('en')} aria-pressed={language === 'en'}>EN</button>
          <button onClick={() => setLanguage('hi')} aria-pressed={language === 'hi'}>हिं</button>
        </div>
      </div>

      <nav className="site-nav no-print">
        <div className="site-nav__inner">
          {navItems.map(({ to, icon: Icon, label }) => (
            <Link key={to} to={to} aria-current={location.pathname === to ? 'page' : undefined}>
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
