import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import EmergencyButton from '../components/EmergencyButton';
import DemoModeBanner from '../components/DemoModeBanner';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import { getAllOfflineCategories } from '../data/offlineFirstAid';
import { Phone, Navigation, Stethoscope, Palette, ShieldAlert, ArrowRight } from 'lucide-react';
import '../styles/HomePage.css';

export default function HomePage() {
  const { language } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);

  const hi = language === 'hi';
  const commonCategories = getAllOfflineCategories().slice(0, 6);

  return (
    <div className="page stack home-container">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero__badge">
          <ShieldAlert size={16} color="#dc2626" />
          <span>{hi ? '24/7 आपातकालीन स्वास्थ्य व प्राथमिक चिकित्सा' : '24/7 RURAL EMERGENCY & HEALTHCARE'}</span>
        </div>

        <h1 className="home__ask">
          {hi ? (
            <>
              <span className="brand-accent">स्वास्थ्‍यसेतु</span>: आपातकाल में तुरंत मदद पाएँ
            </>
          ) : (
            <>
              <span className="brand-accent">SwasthyaSetu</span>: Immediate First-Aid Assistance
            </>
          )}
        </h1>

        <p className="home-hero__sub">
          {hi
            ? 'अपनी समस्या बोलकर या लिखकर बताएँ — सेकंडों में जीवन रक्षक कदम पाएँ।'
            : 'Speak or type what happened — get verified step-by-step first-aid protocols instantly.'}
        </p>

        {/* Primary CTA Box */}
        <div className="home-cta-wrapper">
          <EmergencyButton
            icon={Stethoscope}
            label={hi ? 'क्या हुआ है? यहाँ बताएँ' : 'Tell us what happened'}
            sublabel={hi ? 'बोलकर या लिखकर — तुरंत प्राथमिक कदम मिलेंगे' : 'Speak or type symptoms — get steps right away'}
            variant="emergency"
            pulse
            onClick={() => navigate('/emergency-input')}
          />
        </div>

        {/* Emergency Call & Hospital Finder Shortcuts */}
        <div className="home__shortcuts">
          <a href="tel:112" className="btn btn--alert btn--hero">
            <Phone size={22} fill="currentColor" />
            <span>{hi ? '112 पर कॉल करें (Emergency)' : 'Call 112 Emergency'}</span>
          </a>

          <Link to="/finder" className="btn btn--solid btn--hero">
            <Navigation size={22} />
            <span>{hi ? 'निकटतम अस्पताल खोजें' : 'Nearest Hospitals & Clinics'}</span>
          </Link>
        </div>
      </section>

      {/* Common Emergencies Grid */}
      <section className="home-categories">
        <div className="section-header-bar">
          <h2 className="section-label">{hi ? 'आम आपातकालीन स्थितियाँ' : 'Common Emergencies'}</h2>
        </div>

        <div className="home__grid">
          {commonCategories.map((cat) => (
            <button
              key={cat.id}
              className={`home__tile home__tile--${cat.id}`}
              onClick={() => navigate(`/first-aid/${cat.id}`)}
            >
              <span className="home__tile-icon" aria-hidden="true">{cat.icon}</span>
              <span className="home__tile-name">{hi && cat.nameHi ? cat.nameHi : cat.name}</span>
              <span className="home__tile-steps">
                {cat.firstAidSteps.length} {hi ? 'प्राथमिक कदम' : 'first-aid steps'}
              </span>
            </button>
          ))}
        </div>

        <Link to="/library" className="home__all">
          <span>{hi ? 'सभी 14+ आपातकालीन मार्गदर्शिकाएँ देखें' : 'See all 14+ Emergency First-Aid Guides'}</span>
          <ArrowRight size={18} />
        </Link>
      </section>

      <SafetyDisclaimer />

      {/* Utilities & Demo bar */}
      <section className="home-footer-controls no-print">
        <div className="home__themebar">
          <button className="home__theme" onClick={toggleTheme}>
            <Palette size={16} />
            <span>
              {theme === 'brutal'
                ? (hi ? 'सादा रूप (Classic Mode)' : 'Plain look')
                : (hi ? 'चटख रूप (Contrast Mode)' : 'Bold look')}
            </span>
            <span className="home__theme-swatch" aria-hidden="true" />
          </button>
        </div>

        <div className="home-demo-wrapper">
          <button className="home__demo-toggle" onClick={() => setShowDemo(!showDemo)}>
            {showDemo
              ? (hi ? 'नमूने छिपाएँ' : 'Hide sample scenarios')
              : (hi ? 'बिना असली आपातकाल के आज़माएँ (Demo Mode)' : 'Try sample emergency scenario (Demo Mode)')}
          </button>

          {showDemo && (
            <div className="home__demo-panel">
              <DemoModeBanner
                onSelectScenario={(s) =>
                  navigate('/emergency-input', { state: { demoText: s.description, isDemo: true } })
                }
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

