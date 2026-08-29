/**
 * Curated Emergency Instructional Video References
 * 
 * Videos from trusted medical/public-health organizations only:
 * - Red Cross / Red Crescent
 * - St John Ambulance
 * - British Heart Foundation
 * - NHS
 * - WHO
 */

const emergencyVideos = {
  chest_pain_emergency: [
    {
      id: 'v_cp_1',
      title: 'What to Do When Someone Has Chest Pain',
      titleHi: 'जब किसी को सीने में दर्द हो तो क्या करें',
      description: 'Learn how to help someone experiencing chest pain and recognize warning signs.',
      descriptionHi: 'सीने में दर्द का अनुभव करने वाले व्यक्ति की मदद करना और चेतावनी संकेतों को पहचानना सीखें।',
      source: 'British Red Cross',
      url: 'https://www.youtube.com/watch?v=gDwt7dD3awc',
      thumbnail: '❤️‍🩹',
      duration: '3:45'
    },
    {
      id: 'v_cp_2',
      title: 'Heart Attack Warning Signs',
      titleHi: 'दिल के दौरे के चेतावनी संकेत',
      description: 'Recognize the signs of a heart attack and learn what action to take.',
      descriptionHi: 'दिल के दौरे के संकेतों को पहचानें और जानें कि क्या कार्रवाई करनी चाहिए।',
      source: 'British Heart Foundation',
      url: 'https://www.youtube.com/watch?v=MIJlMp8ZSFE',
      thumbnail: '❤️',
      duration: '2:30'
    }
  ],

  breathing_emergency: [
    {
      id: 'v_br_1',
      title: 'How to Help Someone with Breathing Difficulty',
      titleHi: 'सांस लेने में कठिनाई वाले व्यक्ति की मदद कैसे करें',
      description: 'First aid steps for helping someone who is struggling to breathe.',
      descriptionHi: 'सांस लेने में कठिनाई वाले व्यक्ति की मदद करने के लिए प्राथमिक चिकित्सा कदम।',
      source: 'St John Ambulance',
      url: 'https://www.youtube.com/watch?v=Ek6VUpbBaoE',
      thumbnail: '🫁',
      duration: '4:00'
    }
  ],

  bleeding_emergency: [
    {
      id: 'v_bl_1',
      title: 'How to Treat Severe Bleeding',
      titleHi: 'गंभीर रक्तस्राव का इलाज कैसे करें',
      description: 'Learn how to control severe bleeding with direct pressure.',
      descriptionHi: 'सीधे दबाव से गंभीर रक्तस्राव को नियंत्रित करना सीखें।',
      source: 'British Red Cross',
      url: 'https://www.youtube.com/watch?v=NxO5LvgqZe0',
      thumbnail: '🩸',
      duration: '3:15'
    }
  ],

  burns_emergency: [
    {
      id: 'v_bu_1',
      title: 'First Aid for Burns',
      titleHi: 'जलने की प्राथमिक चिकित्सा',
      description: 'How to treat burns with cool running water and when to seek help.',
      descriptionHi: 'ठंडे बहते पानी से जलने का इलाज कैसे करें और कब मदद लें।',
      source: 'St John Ambulance',
      url: 'https://www.youtube.com/watch?v=EaJmzB8YgS0',
      thumbnail: '🔥',
      duration: '3:30'
    }
  ],

  fracture_emergency: [
    {
      id: 'v_fr_1',
      title: 'First Aid for Broken Bones',
      titleHi: 'टूटी हुई हड्डियों की प्राथमिक चिकित्सा',
      description: 'How to help someone with a suspected fracture and when to call for help.',
      descriptionHi: 'संदिग्ध फ्रैक्चर वाले व्यक्ति की मदद कैसे करें और कब मदद के लिए कॉल करें।',
      source: 'British Red Cross',
      url: 'https://www.youtube.com/watch?v=2v8vlXgGXwE',
      thumbnail: '🦴',
      duration: '4:15'
    }
  ],

  unconsciousness_emergency: [
    {
      id: 'v_un_1',
      title: 'Recovery Position and CPR Basics',
      titleHi: 'रिकवरी पोजीशन और CPR की मूल बातें',
      description: 'How to place someone in the recovery position and basic CPR.',
      descriptionHi: 'किसी को रिकवरी पोजीशन में कैसे रखें और बुनियादी CPR।',
      source: 'St John Ambulance',
      url: 'https://www.youtube.com/watch?v=GmqXqwSV3bo',
      thumbnail: '😵',
      duration: '5:00'
    }
  ],

  seizure_emergency: [
    {
      id: 'v_sz_1',
      title: 'How to Help Someone Having a Seizure',
      titleHi: 'दौरे पड़ने वाले व्यक्ति की मदद कैसे करें',
      description: 'What to do and what not to do when someone has a seizure.',
      descriptionHi: 'जब किसी को दौरा पड़े तो क्या करें और क्या न करें।',
      source: 'Epilepsy Society',
      url: 'https://www.youtube.com/watch?v=L0YRnOSNXw4',
      thumbnail: '⚡',
      duration: '3:00'
    }
  ],

  poisoning_emergency: [
    {
      id: 'v_po_1',
      title: 'First Aid for Poisoning',
      titleHi: 'विषाक्तता की प्राथमिक चिकित्सा',
      description: 'What to do if someone has swallowed a potentially harmful substance.',
      descriptionHi: 'अगर किसी ने संभावित हानिकारक पदार्थ निगल लिया हो तो क्या करें।',
      source: 'British Red Cross',
      url: 'https://www.youtube.com/watch?v=h0mOTkFaBTI',
      thumbnail: '☠️',
      duration: '3:20'
    }
  ],

  stroke_emergency: [
    {
      id: 'v_st_1',
      title: 'FAST - Stroke Recognition',
      titleHi: 'FAST - स्ट्रोक पहचान',
      description: 'Learn the FAST method to recognize stroke symptoms quickly.',
      descriptionHi: 'स्ट्रोक के लक्षणों को जल्दी पहचानने के लिए FAST विधि सीखें।',
      source: 'NHS',
      url: 'https://www.youtube.com/watch?v=mkpMdOcYxQs',
      thumbnail: '🧠',
      duration: '2:45'
    }
  ],

  allergic_reaction_emergency: [
    {
      id: 'v_ar_1',
      title: 'First Aid for Allergic Reactions',
      titleHi: 'एलर्जी प्रतिक्रिया की प्राथमिक चिकित्सा',
      description: 'How to help someone with a severe allergic reaction.',
      descriptionHi: 'गंभीर एलर्जी प्रतिक्रिया वाले व्यक्ति की मदद कैसे करें।',
      source: 'St John Ambulance',
      url: 'https://www.youtube.com/watch?v=CkSOhzA4GEg',
      thumbnail: '🤧',
      duration: '3:10'
    }
  ],

  choking_emergency: [
    {
      id: 'v_ch_1',
      title: 'How to Help a Choking Adult',
      titleHi: 'दम घुटने वाले वयस्क की मदद कैसे करें',
      description: 'Step-by-step guide to helping a choking adult with back blows and abdominal thrusts.',
      descriptionHi: 'पीठ पर वार और पेट के धक्कों से दम घुटने वाले वयस्क की मदद करने की चरण-दर-चरण मार्गदर्शिका।',
      source: 'British Red Cross',
      url: 'https://www.youtube.com/watch?v=PA9hpOnvtCk',
      thumbnail: '😰',
      duration: '2:50'
    }
  ],

  fever_management: [
    {
      id: 'v_fe_1',
      title: 'Managing High Fever at Home',
      titleHi: 'घर पर तेज बुखार का प्रबंधन',
      description: 'How to safely manage a high fever while waiting for medical help.',
      descriptionHi: 'चिकित्सा सहायता की प्रतीक्षा करते हुए तेज बुखार को सुरक्षित रूप से कैसे प्रबंधित करें।',
      source: 'NHS',
      url: 'https://www.youtube.com/watch?v=T5cCOGKMWBU',
      thumbnail: '🌡️',
      duration: '3:00'
    }
  ],

  snakebite_emergency: [
    {
      id: 'v_sb_1',
      title: 'First Aid for Snake Bites',
      titleHi: 'सांप के काटने की प्राथमिक चिकित्सा',
      description: 'What to do immediately after a snake bite — myths vs. facts.',
      descriptionHi: 'सांप काटने के तुरंत बाद क्या करें — मिथक बनाम तथ्य।',
      source: 'WHO',
      url: 'https://www.youtube.com/watch?v=b0DKJk3h4Nk',
      thumbnail: '🐍',
      duration: '4:30'
    }
  ],

  general_emergency: [
    {
      id: 'v_ge_1',
      title: 'Basic First Aid Everyone Should Know',
      titleHi: 'बुनियादी प्राथमिक चिकित्सा जो सभी को पता होनी चाहिए',
      description: 'Essential first aid skills for common emergencies.',
      descriptionHi: 'सामान्य आपात स्थितियों के लिए आवश्यक प्राथमिक चिकित्सा कौशल।',
      source: 'British Red Cross',
      url: 'https://www.youtube.com/watch?v=ea1RJUOiNfQ',
      thumbnail: '🆘',
      duration: '5:00'
    }
  ]
};

function getVideosByCategory(category) {
  return emergencyVideos[category] || emergencyVideos.general_emergency;
}

module.exports = { emergencyVideos, getVideosByCategory };
