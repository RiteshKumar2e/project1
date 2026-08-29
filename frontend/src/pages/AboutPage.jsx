import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Lock, BookOpen, AlertTriangle } from 'lucide-react';
import '../styles/AboutPage.css';

const SOURCES = [
  'World Health Organization (WHO)',
  'International Federation of Red Cross and Red Crescent Societies',
  'St John Ambulance first aid manuals',
  'National Health Mission, India'
];

export default function AboutPage() {
  const { t, language } = useLanguage();
  const hi = language === 'hi';

  const stages = [t('about.step1'), t('about.step2'), t('about.step3'), t('about.step4'), t('about.step5')];

  return (
    <div className="page stack">
      <div>
        <h1>{hi ? 'इस ऐप के बारे में' : 'About this app'}</h1>
        <p className="about__lead">
          {hi
            ? 'गाँव और दूरदराज के इलाकों में एम्बुलेंस आने तक क्या करना है — यही बताने के लिए यह ऐप बना है।'
            : 'What to do while help is on its way, for villages and remote areas where the ambulance takes time.'}
        </p>
      </div>

      <section className="about__section">
        <h2>{t('about.howItWorks')}</h2>
        <div className="about__flow">
          {stages.map((stage, idx) => (
            <div key={idx} className="about__stage">
              <p>{stage}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="notice notice--alert">
        <h2 className="about__panel-title">
          <AlertTriangle size={20} />
          {t('about.disclaimer')}
        </h2>
        <p>{t('about.disclaimerText')}</p>
      </div>

      <section className="card about__section">
        <h2>
          <Lock size={20} />
          {t('about.privacy')}
        </h2>
        <p>{t('about.privacyText')}</p>
      </section>

      <section className="card about__section">
        <h2>
          <BookOpen size={20} />
          {t('about.credits')}
        </h2>
        <p>{t('about.creditsText')}</p>
        <ul className="about__sources">
          {SOURCES.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </section>
    </div>
  );
}
