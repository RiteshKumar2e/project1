import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { emergencyNumbers } from '../data/emergencyNumbers';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import { Phone, ShieldAlert, HeartHandshake, Baby, Flame, Siren, ArrowRight, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmergencyServicesPage() {
  const { t, language } = useLanguage();

  const servicesList = [
    {
      id: 'all_emergency',
      name: 'National Emergency Number',
      nameHi: 'राष्ट्रीय आपातकालीन नंबर (सभी आपातकाल)',
      number: '112',
      badge: '24x7 All-in-One',
      icon: '🚨',
      description: 'Police, Ambulance, Fire, Disaster Management across India',
      descriptionHi: 'पुलिस, एम्बुलेंस, दमकल और आपदा प्रबंधन (अखिल भारतीय)',
      isPrimary: true
    },
    {
      id: 'ambulance',
      name: 'Ambulance Services',
      nameHi: 'एम्बुलेंस सेवा',
      number: '102',
      badge: 'Medical Transport',
      icon: '🚑',
      description: 'Emergency patient transport & maternity ambulance',
      descriptionHi: 'आपातकालीन रोगी परिवहन एवं प्रसूति एम्बुलेंस',
      isPrimary: false
    },
    {
      id: 'police',
      name: 'Police Emergency',
      nameHi: 'पुलिस सहायता',
      number: '100',
      badge: 'Law & Order',
      icon: '👮',
      description: 'Police emergency control room',
      descriptionHi: 'पुलिस नियंत्रण कक्ष आपातकाल',
      isPrimary: false
    },
    {
      id: 'fire',
      name: 'Fire Services',
      nameHi: 'अग्निशमन सेवा',
      number: '101',
      badge: 'Fire & Rescue',
      icon: '🚒',
      description: 'Fire brigade & emergency rescue',
      descriptionHi: 'दमकल और आपातकालीन बचाव',
      isPrimary: false
    },
    {
      id: 'women',
      name: 'Women Helpline',
      nameHi: 'महिला हेल्पलाइन',
      number: '181',
      badge: 'Women Safety',
      icon: '👩',
      description: '24-hour emergency helpline for women in distress',
      descriptionHi: 'संकटग्रस्त महिलाओं के लिए 24 घंटे आपातकालीन हेल्पलाइन',
      isPrimary: false
    },
    {
      id: 'child',
      name: 'Child Helpline',
      nameHi: 'चाइल्ड हेल्पलाइन',
      number: '1098',
      badge: 'Child Care',
      icon: '👶',
      description: 'National 24-hour helpline for children in need',
      descriptionHi: 'बच्चों की सुरक्षा और मदद के लिए राष्ट्रीय हेल्पलाइन',
      isPrimary: false
    },
    {
      id: 'poison',
      name: 'Poison Information Centre (AIIMS)',
      nameHi: 'राष्ट्रीय विष सूचना केंद्र (AIIMS)',
      number: '1800-11-6117',
      badge: 'Toxicology',
      icon: '☠️',
      description: 'National toxicology & poison response assistance',
      descriptionHi: 'विषाक्तता व ज़हर उपचार सलाह',
      isPrimary: false
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6 sm:space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emergency-700 to-emergency-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold uppercase tracking-wider mb-3">
          <ShieldAlert className="w-4 h-4" />
          {t('emergencyServices.title')}
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 leading-tight">
          {language === 'hi' ? 'आपातकालीन हेल्पलाइन नंबर' : 'Official Emergency Helplines'}
        </h1>
        <p className="text-xs sm:text-sm text-emergency-100 max-w-xl font-medium">
          {language === 'hi'
            ? 'भारत के आधिकारिक 24x7 आपातकालीन नंबर। सीधे कॉल करने के लिए किसी भी नंबर पर टैप करें।'
            : "Direct one-tap access to India's official 24x7 public emergency and medical assistance helplines."}
        </p>
      </div>

      {/* Services Grid */}
      <div className="space-y-3">
        {servicesList.map((service) => {
          const name = language === 'hi' && service.nameHi ? service.nameHi : service.name;
          const desc = language === 'hi' && service.descriptionHi ? service.descriptionHi : service.description;

          return (
            <div
              key={service.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap ${
                service.isPrimary
                  ? 'bg-emergency-50 border-2 border-emergency-500 shadow-sm animate-emergency-pulse'
                  : 'bg-white border-surface-200 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl sm:text-4xl p-2 rounded-2xl bg-white border border-surface-200 shrink-0">
                  {service.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base sm:text-lg font-extrabold text-surface-900">
                      {name}
                    </h2>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-surface-100 text-surface-700">
                      {service.badge}
                    </span>
                  </div>
                  <p className="text-xs text-surface-600 mt-0.5">{desc}</p>
                </div>
              </div>

              {/* Call CTA Button */}
              <a
                href={`tel:${service.number.replace(/[^0-9]/g, '')}`}
                className={`w-full sm:w-auto shrink-0 flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl font-extrabold text-base shadow-sm transition-all hover:scale-105 active:scale-95 ${
                  service.isPrimary
                    ? 'bg-emergency-600 hover:bg-emergency-700 text-white'
                    : 'bg-surface-900 hover:bg-surface-800 text-white'
                }`}
              >
                <Phone className="w-5 h-5 fill-white" />
                <span>{language === 'hi' ? 'कॉल करें' : 'Call'} {service.number}</span>
              </a>
            </div>
          );
        })}
      </div>

      {/* Hospital Finder Link Banner */}
      <div className="bg-white border border-surface-200 rounded-3xl p-6 shadow-sm flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-surface-100 rounded-2xl text-primary">
            <Navigation className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-surface-900">
              {t('facilities.title')}
            </h3>
            <p className="text-xs text-surface-500">
              {language === 'hi' ? 'अपने वर्तमान स्थान के पास अस्पताल और स्वास्थ्य केंद्र खोजें।' : 'Find government hospitals, PHCs, and CHCs near you.'}
            </p>
          </div>
        </div>

        <Link
          to="/finder"
          className="py-3 px-5 rounded-xl bg-surface-900 hover:bg-surface-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0"
        >
          <span>{language === 'hi' ? 'अस्पताल खोजें' : 'Open Hospital Finder'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <SafetyDisclaimer />
    </div>
  );
}
