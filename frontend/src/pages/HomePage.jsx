import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import EmergencyButton from '../components/EmergencyButton';
import DemoModeBanner from '../components/DemoModeBanner';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import { getAllOfflineCategories } from '../data/offlineFirstAid';
import { Phone, Navigation, Stethoscope, Palette } from 'lucide-react';
import '../styles/HomePage.css';

export default function HomePage() {
  const { language } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);

  const hi = language === 'hi';
  const commonCategories = getAllOfflineCategories().slice(0, 6);

  return (
    <div className="page stack">
      {/* Two looks for the same app; the choice is remembered per device. */}
      <div className="home__themebar no-print">
        <button className="home__theme" onClick={toggleTheme}>
          <Palette size={18} />
          <span>
            {theme === 'brutal'
              ? (hi ? 'सादा रूप' : 'Plain look')
              : (hi ? 'चटख रूप' : 'Bold look')}
          </span>
          <span className="home__theme-swatch" aria-hidden="true" />
        </button>
      </div>

      <section>
        <h1 className="home__ask">{hi ? 'किसी को मदद चाहिए?' : 'Someone needs help?'}</h1>

        <EmergencyButton
          icon={Stethoscope}
          label={hi ? 'क्या हुआ है, बताएँ' : 'Tell us what happened'}
          sublabel={hi ? 'बोलकर या लिखकर — तुरंत कदम मिलेंगे' : 'Speak or type — get steps right away'}
          variant="emergency"
          pulse
          onClick={() => navigate('/emergency-input')}
        />

        <div className="home__shortcuts">
          <a href="tel:112" className="btn btn--alert">
            <Phone size={22} fill="currentColor" />
            {hi ? '112 पर कॉल करें' : 'Call 112'}
          </a>

          <Link to="/finder" className="btn btn--solid">
            <Navigation size={22} />
            {hi ? 'नज़दीकी अस्पताल' : 'Nearest hospital'}
          </Link>
        </div>
      </section>

      <section>
        <h2 className="section-label">{hi ? 'आम आपात स्थितियाँ' : 'Common emergencies'}</h2>

        <div className="home__grid">
          {commonCategories.map((cat) => (
            <button
              key={cat.id}
              className="home__tile"
              onClick={() => navigate(`/first-aid/${cat.id}`)}
            >
              <span className="home__tile-icon" aria-hidden="true">{cat.icon}</span>
              <span className="home__tile-name">{hi && cat.nameHi ? cat.nameHi : cat.name}</span>
              <span className="home__tile-steps">
                {cat.firstAidSteps.length} {hi ? 'कदम' : 'steps'}
              </span>
            </button>
          ))}
        </div>

        <Link to="/library" className="home__all">
          {hi ? 'सभी स्थितियाँ देखें' : 'See all emergencies'}
        </Link>
      </section>

      <SafetyDisclaimer />

      <section className="no-print">
        <button className="home__demo-toggle" onClick={() => setShowDemo(!showDemo)}>
          {showDemo
            ? (hi ? 'नमूने छिपाएँ' : 'Hide samples')
            : (hi ? 'बिना असली आपातकाल के आज़माएँ' : 'Try it without a real emergency')}
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
      </section>
    </div>
  );
}
