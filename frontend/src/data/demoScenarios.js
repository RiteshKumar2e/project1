/**
 * Demo scenarios for platform demonstration
 */
export const demoScenarios = [
  {
    id: 'demo_1',
    description: 'Person has severe chest pain and difficulty breathing.',
    descriptionHi: 'व्यक्ति को गंभीर सीने में दर्द और सांस लेने में कठिनाई है।',
    icon: '❤️‍🩹',
    expectedCategory: 'chest_pain'
  },
  {
    id: 'demo_2',
    description: 'Person has heavy bleeding after an injury.',
    descriptionHi: 'चोट के बाद व्यक्ति को भारी रक्तस्राव हो रहा है।',
    icon: '🩸',
    expectedCategory: 'severe_bleeding'
  },
  {
    id: 'demo_3',
    description: 'Person is unconscious and not responding.',
    descriptionHi: 'व्यक्ति बेहोश है और प्रतिक्रिया नहीं दे रहा।',
    icon: '😵',
    expectedCategory: 'unconsciousness'
  },
  {
    id: 'demo_4',
    description: 'Person is choking and cannot breathe.',
    descriptionHi: 'व्यक्ति का दम घुट रहा है और सांस नहीं ले पा रहा।',
    icon: '😰',
    expectedCategory: 'choking'
  },
  {
    id: 'demo_5',
    description: 'Person suffered a minor burn on their hand.',
    descriptionHi: 'व्यक्ति के हाथ पर मामूली जलन हो गई है।',
    icon: '🔥',
    expectedCategory: 'burns'
  }
];
