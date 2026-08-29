import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import { Phone, ArrowRight } from 'lucide-react';
import '../styles/EmergencyServicesPage.css';

const SERVICES = [
  {
    id: 'all_emergency',
    name: 'National Emergency Number',
    nameHi: 'राष्ट्रीय आपातकालीन नंबर',
    number: '112',
    icon: '🚨',
    description: 'Police, ambulance, fire and disaster response, anywhere in India',
    descriptionHi: 'पुलिस, एम्बुलेंस, दमकल और आपदा — पूरे भारत में',
    isPrimary: true
  },
  {
    id: 'ambulance',
    name: 'Ambulance',
    nameHi: 'एम्बुलेंस',
    number: '102',
    icon: '🚑',
    description: 'Patient transport and maternity ambulance',
    descriptionHi: 'मरीज़ को ले जाने और प्रसूति एम्बुलेंस'
  },
  {
    id: 'police',
    name: 'Police',
    nameHi: 'पुलिस',
    number: '100',
    icon: '👮',
    description: 'Police control room',
    descriptionHi: 'पुलिस नियंत्रण कक्ष'
  },
  {
    id: 'fire',
    name: 'Fire Services',
    nameHi: 'अग्निशमन सेवा',
    number: '101',
    icon: '🚒',
    description: 'Fire brigade and rescue',
    descriptionHi: 'दमकल और बचाव'
  },
  {
    id: 'women',
    name: 'Women Helpline',
    nameHi: 'महिला हेल्पलाइन',
    number: '181',
    icon: '👩',
    description: 'Round-the-clock helpline for women in distress',
    descriptionHi: 'संकट में महिलाओं के लिए 24 घंटे हेल्पलाइन'
  },
  {
    id: 'child',
    name: 'Child Helpline',
    nameHi: 'चाइल्ड हेल्पलाइन',
    number: '1098',
    icon: '👶',
    description: 'National helpline for children in need of help',
    descriptionHi: 'मदद की ज़रूरत वाले बच्चों के लिए राष्ट्रीय हेल्पलाइन'
  },
  {
    id: 'poison',
    name: 'Poison Information Centre (AIIMS)',
    nameHi: 'विष सूचना केंद्र (AIIMS)',
    number: '1800-11-6117',
    icon: '☠️',
    description: 'Advice on poisoning and snake bite treatment',
    descriptionHi: 'ज़हर और साँप के काटने पर सलाह'
  }
];

export default function EmergencyServicesPage() {
  const { language } = useLanguage();
  const hi = language === 'hi';

  return (
    <div className="page stack">
      <div className="helplines__intro">
        <h1>{hi ? 'आपातकालीन नंबर' : 'Emergency numbers'}</h1>
        <p>
          {hi
            ? 'भारत के सरकारी 24 घंटे चलने वाले नंबर। किसी भी बटन को दबाते ही फ़ोन लग जाएगा।'
            : "India's official 24-hour helplines. Tap any button to dial straight away."}
        </p>
      </div>

      <div className="helplines__list">
        {SERVICES.map((service) => (
          <div key={service.id} className={`helpline${service.isPrimary ? ' is-primary' : ''}`}>
            <div className="helpline__ident">
              <span className="helpline__icon" aria-hidden="true">{service.icon}</span>
              <div>
                <h2 className="helpline__name">{hi ? service.nameHi : service.name}</h2>
                <p className="helpline__desc">{hi ? service.descriptionHi : service.description}</p>
              </div>
            </div>

            <a href={`tel:${service.number.replace(/[^0-9]/g, '')}`} className="helpline__call">
              <Phone size={20} />
              <span className="helpline__number">{service.number}</span>
            </a>
          </div>
        ))}
      </div>

      <div className="card helplines__finder">
        <div className="helplines__finder-text">
          <h3>{hi ? 'नज़दीकी अस्पताल' : 'Nearby hospitals'}</h3>
          <p>
            {hi
              ? 'अपने आस-पास के सरकारी अस्पताल, CHC और PHC देखें।'
              : 'Find government hospitals, CHCs and PHCs around you.'}
          </p>
        </div>

        <Link to="/finder" className="btn btn--solid">
          {hi ? 'खोलें' : 'Open'}
          <ArrowRight size={18} />
        </Link>
      </div>

      <SafetyDisclaimer />
    </div>
  );
}
