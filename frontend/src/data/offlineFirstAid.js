/**
 * Complete Offline First-Aid Knowledge Base (Client-side)
 * Bundled in frontend so that in complete offline / rural environments with zero connectivity,
 * all 14 emergency categories and step-by-step guides are 100% accessible.
 */

export const offlineFirstAidData = {
  chest_pain: {
    id: 'chest_pain',
    name: 'Chest Pain',
    nameHi: 'सीने में दर्द',
    icon: '❤️‍🩹',
    description: 'Pain, pressure, or discomfort in the chest area',
    descriptionHi: 'छाती के क्षेत्र में दर्द, दबाव या बेचैनी',
    severity: 'critical',
    immediateAction: true,
    firstAidSteps: [
      { step: 1, instruction: 'Call emergency services (112) immediately or ask someone nearby to call.', instructionHi: 'तुरंत आपातकालीन सेवाओं (112) को कॉल करें या पास किसी को कॉल करने के लिए कहें।', icon: '📞' },
      { step: 2, instruction: 'Help the person sit down in a comfortable position. A half-sitting position is usually best.', instructionHi: 'व्यक्ति को आरामदायक स्थिति में बैठने में मदद करें। आधी बैठी हुई स्थिति आमतौर पर सबसे अच्छी होती है।', icon: '🪑' },
      { step: 3, instruction: 'Loosen any tight clothing around the neck, chest, and waist.', instructionHi: 'गर्दन, छाती और कमर के आसपास किसी भी तंग कपड़े को ढीला करें।', icon: '👕' },
      { step: 4, instruction: 'Keep the person calm and reassure them. Do not let them walk or exert themselves.', instructionHi: 'व्यक्ति को शांत रखें और आश्वस्त करें। उन्हें चलने या मेहनत न करने दें।', icon: '🧘' },
      { step: 5, instruction: 'If the person becomes unconscious and stops breathing, begin CPR if you are trained.', instructionHi: 'यदि व्यक्ति बेहोश हो जाता है और सांस लेना बंद कर देता है, तो यदि आप प्रशिक्षित हैं तो CPR शुरू करें।', icon: '🫁' },
      { step: 6, instruction: 'Stay with the person until emergency help arrives.', instructionHi: 'आपातकालीन मदद आने तक व्यक्ति के साथ रहें।', icon: '🤝' }
    ],
    warnings: [
      'These symptoms may indicate a serious cardiac emergency.',
      'Do NOT give the person anything to eat or drink unless advised by emergency services.',
      'Do NOT leave the person alone.',
      'Time is critical — every minute matters.'
    ],
    warningsHi: [
      'ये लक्षण एक गंभीर हृदय आपातकाल का संकेत हो सकते हैं।',
      'आपातकालीन सेवाओं की सलाह के बिना व्यक्ति को कुछ भी खाने या पीने को न दें।',
      'व्यक्ति को अकेला न छोड़ें।',
      'समय महत्वपूर्ण है — हर मिनट मायने रखता है।'
    ],
    doNots: [
      'Do NOT try to diagnose the cause yourself.',
      'Do NOT delay calling emergency services.',
      'Do NOT give medications unless the person has been prescribed them and can take them safely.'
    ]
  },

  breathing_difficulty: {
    id: 'breathing_difficulty',
    name: 'Breathing Difficulty',
    nameHi: 'सांस लेने में कठिनाई',
    icon: '🫁',
    description: 'Difficulty breathing, shortness of breath, or respiratory distress',
    descriptionHi: 'सांस लेने में कठिनाई, सांस की कमी, या श्वसन संकट',
    severity: 'critical',
    immediateAction: true,
    firstAidSteps: [
      { step: 1, instruction: 'Call emergency services (112) immediately.', instructionHi: 'तुरंत आपातकालीन सेवाओं (112) को कॉल करें।', icon: '📞' },
      { step: 2, instruction: 'Help the person sit upright. Leaning slightly forward may help breathing.', instructionHi: 'व्यक्ति को सीधे बैठने में मदद करें। थोड़ा आगे झुकने से सांस लेने में मदद मिल सकती है।', icon: '🪑' },
      { step: 3, instruction: 'Ensure fresh air — open windows or move to an open area if possible.', instructionHi: 'ताजी हवा सुनिश्चित करें — खिड़कियां खोलें या यदि संभव हो तो खुले क्षेत्र में जाएं।', icon: '🪟' },
      { step: 4, instruction: 'Loosen any tight clothing around the neck and chest.', instructionHi: 'गर्दन और छाती के आसपास किसी भी तंग कपड़े को ढीला करें।', icon: '👕' },
      { step: 5, instruction: 'If the person has a prescribed inhaler, help them use it.', instructionHi: 'यदि व्यक्ति के पास निर्धारित इनहेलर है, तो उसे उपयोग करने में मदद करें।', icon: '💨' },
      { step: 6, instruction: 'Keep the person calm. Encourage slow, steady breathing.', instructionHi: 'व्यक्ति को शांत रखें। धीमी, स्थिर श्वास को प्रोत्साहित करें।', icon: '🧘' },
      { step: 7, instruction: 'Monitor their breathing until help arrives.', instructionHi: 'मदद आने तक उनकी सांस पर नज़र रखें।', icon: '👀' }
    ],
    warnings: [
      'Breathing difficulty can be life-threatening.',
      'If the person turns blue (lips, fingers), this is a critical emergency.',
      'Do NOT give food or water if the person is struggling to breathe.'
    ],
    warningsHi: [
      'सांस लेने में कठिनाई जानलेवा हो सकती है।',
      'यदि व्यक्ति नीला पड़ जाता है (होंठ, उंगलियां), तो यह एक गंभीर आपातकाल है।',
      'यदि व्यक्ति को सांस लेने में कठिनाई हो रही है तो खाना या पानी न दें।'
    ],
    doNots: [
      'Do NOT lay the person flat — keep them upright.',
      'Do NOT leave them alone.',
      'Do NOT block their airway.'
    ]
  },

  severe_bleeding: {
    id: 'severe_bleeding',
    name: 'Severe Bleeding',
    nameHi: 'गंभीर रक्तस्राव',
    icon: '🩸',
    description: 'Heavy or uncontrollable bleeding from a wound or injury',
    descriptionHi: 'घाव या चोट से भारी या अनियंत्रित रक्तस्राव',
    severity: 'critical',
    immediateAction: true,
    firstAidSteps: [
      { step: 1, instruction: 'Call emergency services (112) or ask someone nearby to call immediately.', instructionHi: 'आपातकालीन सेवाओं (112) को कॉल करें या तुरंत पास किसी को कॉल करने के लिए कहें।', icon: '📞' },
      { step: 2, instruction: 'Apply firm, direct pressure to the wound using a clean cloth, towel, or clothing.', instructionHi: 'साफ कपड़े, तौलिए या कपड़े का उपयोग करके घाव पर मजबूत, सीधा दबाव लगाएं।', icon: '🤲' },
      { step: 3, instruction: 'Keep continuous pressure on the wound. Do NOT remove the cloth — add more on top if needed.', instructionHi: 'घाव पर लगातार दबाव बनाए रखें। कपड़ा न हटाएं — यदि आवश्यक हो तो ऊपर और कपड़ा लगाएं।', icon: '✋' },
      { step: 4, instruction: 'If possible, raise the injured area above the level of the heart.', instructionHi: 'यदि संभव हो, तो घायल क्षेत्र को हृदय के स्तर से ऊपर उठाएं।', icon: '⬆️' },
      { step: 5, instruction: 'Help the person lie down. Keep them warm with a blanket or coat.', instructionHi: 'व्यक्ति को लेटने में मदद करें। उन्हें कंबल या कोट से गर्म रखें।', icon: '🛏️' },
      { step: 6, instruction: 'Stay with the person and keep them calm until help arrives.', instructionHi: 'व्यक्ति के साथ रहें और मदद आने तक उन्हें शांत रखें।', icon: '🤝' }
    ],
    warnings: [
      'Severe blood loss can be life-threatening within minutes.',
      'Signs of shock: pale skin, fast breathing, confusion, feeling cold.',
      'If blood soaks through, add more cloth on top — do NOT remove the first layer.'
    ],
    warningsHi: [
      'गंभीर रक्त हानि मिनटों में जानलेवा हो सकती है।',
      'शॉक के संकेत: पीली त्वचा, तेज सांस, भ्रम, ठंड लगना।',
      'यदि खून कपड़े से रिसता है, तो ऊपर और कपड़ा लगाएं — पहली परत न हटाएं।'
    ],
    doNots: [
      'Do NOT remove objects embedded in the wound.',
      'Do NOT apply a tourniquet unless you are trained.',
      'Do NOT wash severe wounds with water — focus on pressure.'
    ]
  },

  burns: {
    id: 'burns',
    name: 'Burns',
    nameHi: 'जलना',
    icon: '🔥',
    description: 'Burns from heat, chemicals, or electrical sources',
    descriptionHi: 'गर्मी, रसायन, या बिजली के स्रोतों से जलना',
    severity: 'urgent',
    immediateAction: false,
    firstAidSteps: [
      { step: 1, instruction: 'Move the person away from the source of the burn. Ensure your own safety first.', instructionHi: 'व्यक्ति को जलने के स्रोत से दूर ले जाएं। पहले अपनी सुरक्षा सुनिश्चित करें।', icon: '🚶' },
      { step: 2, instruction: 'Cool the burn under cool (not cold) running water for at least 20 minutes.', instructionHi: 'जले हुए हिस्से को कम से कम 20 मिनट तक ठंडे (बर्फीले नहीं) बहते पानी के नीचे ठंडा करें।', icon: '🚿' },
      { step: 3, instruction: 'Remove any clothing or jewelry near the burn ONLY if it is not stuck to the skin.', instructionHi: 'जले के पास किसी भी कपड़े या गहने को हटाएं केवल तब जब वह त्वचा से चिपका न हो।', icon: '👕' },
      { step: 4, instruction: 'Cover the burn loosely with a clean, non-fluffy cloth or cling film.', instructionHi: 'जले को साफ, गैर-रोएंदार कपड़े या क्लिंग फिल्म से ढीले ढंग से ढकें।', icon: '🩹' },
      { step: 5, instruction: 'For large or deep burns, call emergency services (112).', instructionHi: 'बड़े या गहरे जलने के लिए, आपातकालीन सेवाओं (112) को कॉल करें।', icon: '📞' },
      { step: 6, instruction: 'Keep the person warm and monitor for signs of shock.', instructionHi: 'व्यक्ति को गर्म रखें और शॉक के संकेतों की निगरानी करें।', icon: '🌡️' }
    ],
    warnings: [
      'Large burns, burns on the face/hands/joints, and chemical or electrical burns need emergency medical care.',
      'Burns can cause shock — watch for pale skin, rapid breathing, confusion.'
    ],
    warningsHi: [
      'बड़े जलने, चेहरे/हाथों/जोड़ों पर जलने, और रासायनिक या बिजली के जलने के लिए आपातकालीन चिकित्सा देखभाल की आवश्यकता होती है।',
      'जलने से शॉक हो सकता है — पीली त्वचा, तेज सांस, भ्रम पर ध्यान दें।'
    ],
    doNots: [
      'Do NOT use ice, butter, toothpaste, or creams on burns.',
      'Do NOT burst blisters.',
      'Do NOT remove clothing stuck to the burn.'
    ]
  },

  fracture: {
    id: 'fracture',
    name: 'Fracture / Bone Injury',
    nameHi: 'हड्डी टूटना / चोट',
    icon: '🦴',
    description: 'Suspected broken bone or serious musculoskeletal injury',
    descriptionHi: 'संदिग्ध टूटी हुई हड्डी या गंभीर मस्कुलोस्केलेटल चोट',
    severity: 'urgent',
    immediateAction: false,
    firstAidSteps: [
      { step: 1, instruction: 'Do NOT move the injured area. Keep the person still.', instructionHi: 'घायल क्षेत्र को हिलाएं नहीं। व्यक्ति को स्थिर रखें।', icon: '🚫' },
      { step: 2, instruction: 'Call emergency services (112) if the injury is severe or the person cannot move.', instructionHi: 'यदि चोट गंभीर है या व्यक्ति हिल नहीं सकता तो आपातकालीन सेवाओं (112) को कॉल करें।', icon: '📞' },
      { step: 3, instruction: 'Support the injured area in the position you found it. Use soft padding if available.', instructionHi: 'घायल क्षेत्र को उसी स्थिति में सहारा दें जिसमें आपने पाया। यदि उपलब्ध हो तो नरम पैडिंग का उपयोग करें।', icon: '🛡️' },
      { step: 4, instruction: 'Apply a cold pack wrapped in cloth to reduce swelling (20 minutes on, 20 minutes off).', instructionHi: 'सूजन कम करने के लिए कपड़े में लपेटा हुआ ठंडा पैक लगाएं (20 मिनट लगाएं, 20 मिनट हटाएं)।', icon: '🧊' },
      { step: 5, instruction: 'If there is bleeding, apply gentle pressure with a clean cloth.', instructionHi: 'यदि रक्तस्राव हो, तो साफ कपड़े से हल्का दबाव लगाएं।', icon: '🩹' },
      { step: 6, instruction: 'Keep the person comfortable and wait for medical help.', instructionHi: 'व्यक्ति को आरामदायक रखें और चिकित्सा सहायता की प्रतीक्षा करें।', icon: '🤝' }
    ],
    warnings: [
      'Moving a broken bone can cause further injury.',
      'Spinal injuries require the person to remain completely still.'
    ],
    warningsHi: [
      'टूटी हड्डी को हिलाने से और चोट लग सकती है।',
      'रीढ़ की हड्डी की चोटों में व्यक्ति को पूरी तरह स्थिर रहना चाहिए।'
    ],
    doNots: [
      'Do NOT try to realign or push a bone back.',
      'Do NOT move the person if you suspect a spinal injury.'
    ]
  },

  unconsciousness: {
    id: 'unconsciousness',
    name: 'Unconsciousness',
    nameHi: 'बेहोशी',
    icon: '😵',
    description: 'Person is unconscious, unresponsive, or has fainted',
    descriptionHi: 'व्यक्ति बेहोश है, अनुत्तरदायी है, या बेहोश हो गया है',
    severity: 'critical',
    immediateAction: true,
    firstAidSteps: [
      { step: 1, instruction: 'Call emergency services (112) immediately.', instructionHi: 'तुरंत आपातकालीन सेवाओं (112) को कॉल करें।', icon: '📞' },
      { step: 2, instruction: 'Check if the person is breathing by looking at their chest and feeling for breath.', instructionHi: 'व्यक्ति की छाती देखकर और सांस महसूस करके जांचें कि क्या व्यक्ति सांस ले रहा है।', icon: '👀' },
      { step: 3, instruction: 'If breathing: Gently place them on their side (recovery position) to keep the airway clear.', instructionHi: 'यदि सांस ले रहे हैं: वायुमार्ग साफ रखने के लिए उन्हें धीरे से करवट पर लिटाएं (रिकवरी पोजीशन)।', icon: '🔄' },
      { step: 4, instruction: 'If NOT breathing: Begin CPR if you are trained — 30 chest compressions, then 2 breaths.', instructionHi: 'यदि सांस नहीं ले रहे: यदि आप प्रशिक्षित हैं तो CPR शुरू करें — 30 छाती के संपीड़न, फिर 2 सांस।', icon: '🫁' },
      { step: 5, instruction: 'Do NOT put anything in the person\'s mouth.', instructionHi: 'व्यक्ति के मुंह में कुछ भी न डालें।', icon: '🚫' },
      { step: 6, instruction: 'Stay with the person until emergency help arrives.', instructionHi: 'आपातकालीन मदद आने तक व्यक्ति के साथ रहें।', icon: '🤝' }
    ],
    warnings: [
      'Unconsciousness can be life-threatening.',
      'If the person is not breathing, every second counts.'
    ],
    warningsHi: [
      'बेहोशी जानलेवा हो सकती है।',
      'यदि व्यक्ति सांस नहीं ले रहा है, तो हर सेकंड महत्वपूर्ण है।'
    ],
    doNots: [
      'Do NOT leave an unconscious person alone.',
      'Do NOT try to give them food or water.'
    ]
  },

  seizure: {
    id: 'seizure',
    name: 'Seizure',
    nameHi: 'दौरा/मिर्गी',
    icon: '⚡',
    description: 'Person is having a seizure or convulsions',
    descriptionHi: 'व्यक्ति को दौरा या ऐंठन हो रही है',
    severity: 'critical',
    immediateAction: true,
    firstAidSteps: [
      { step: 1, instruction: 'Clear the area around the person. Move away furniture or hard objects.', instructionHi: 'व्यक्ति के आसपास का क्षेत्र साफ करें। फर्नीचर या कठोर वस्तुओं को हटाएं।', icon: '🧹' },
      { step: 2, instruction: 'Do NOT hold the person down or try to stop the movements.', instructionHi: 'व्यक्ति को पकड़कर न रखें या हिलने-डुलने से रोकने की कोशिश न करें।', icon: '🚫' },
      { step: 3, instruction: 'Place something soft (like a folded cloth) under their head if possible.', instructionHi: 'यदि संभव हो तो उनके सिर के नीचे कुछ नरम (जैसे मुड़ा हुआ कपड़ा) रखें।', icon: '🧸' },
      { step: 4, instruction: 'Note the time when the seizure started.', instructionHi: 'दौरा शुरू होने का समय नोट करें।', icon: '⏱️' },
      { step: 5, instruction: 'After the seizure stops, gently place them on their side (recovery position).', instructionHi: 'दौरा रुकने के बाद, उन्हें धीरे से करवट पर लिटाएं (रिकवरी पोजीशन)।', icon: '🔄' },
      { step: 6, instruction: 'Call emergency services (112) if the seizure lasts more than 5 minutes.', instructionHi: 'यदि दौरा 5 मिनट से अधिक चलता है, तो आपातकालीन सेवाओं (112) को कॉल करें।', icon: '📞' }
    ],
    warnings: ['A seizure lasting more than 5 minutes is a medical emergency.'],
    warningsHi: ['5 मिनट से अधिक चलने वाला दौरा एक चिकित्सा आपातकाल है।'],
    doNots: ['Do NOT put anything in the person\'s mouth.', 'Do NOT try to hold them down.']
  },

  poisoning: {
    id: 'poisoning',
    name: 'Poisoning',
    nameHi: 'विषाक्तता',
    icon: '☠️',
    description: 'Suspected ingestion of poison, toxic substance, or overdose',
    descriptionHi: 'ज़हर, विषाक्त पदार्थ, या ओवरडोज़ का संदिग्ध सेवन',
    severity: 'critical',
    immediateAction: true,
    firstAidSteps: [
      { step: 1, instruction: 'Call emergency services (112) immediately.', instructionHi: 'तुरंत आपातकालीन सेवाओं (112) को कॉल करें।', icon: '📞' },
      { step: 2, instruction: 'Do NOT make the person vomit unless instructed by medical staff.', instructionHi: 'चिकित्सा कर्मचारियों द्वारा कहे जाने तक व्यक्ति को उल्टी न कराएं।', icon: '🚫' },
      { step: 3, instruction: 'Keep containers, labels, or substance samples to show medical personnel.', instructionHi: 'चिकित्सा कर्मियों को दिखाने के लिए कंटेनर, लेबल या नमूने रखें।', icon: '🏷️' },
      { step: 4, instruction: 'If the person is unconscious but breathing, place them in recovery position.', instructionHi: 'यदि व्यक्ति बेहोश है लेकिन सांस ले रहा है, तो उन्हें रिकवरी स्थिति में रखें।', icon: '🔄' },
      { step: 5, instruction: 'Monitor breathing until help arrives.', instructionHi: 'मदद आने तक सांस पर नज़र रखें।', icon: '👀' }
    ],
    warnings: ['Poisoning can be life-threatening. Always call emergency services.'],
    warningsHi: ['विषाक्तता जानलेवा हो सकती है। हमेशा आपातकालीन सेवाओं को कॉल करें।'],
    doNots: ['Do NOT induce vomiting without instructions.', 'Do NOT give milk or water unless advised.']
  },

  stroke: {
    id: 'stroke',
    name: 'Stroke Warning Signs',
    nameHi: 'स्ट्रोक के चेतावनी संकेत',
    icon: '🧠',
    description: 'Sudden weakness, speech problems, or facial drooping',
    descriptionHi: 'अचानक कमजोरी, बोलने में समस्या, या चेहरे का लटकना',
    severity: 'critical',
    immediateAction: true,
    firstAidSteps: [
      { step: 1, instruction: 'Call emergency services (112) IMMEDIATELY.', instructionHi: 'तुरंत आपातकालीन सेवाओं (112) को कॉल करें।', icon: '📞' },
      { step: 2, instruction: 'Use FAST check: Face drooping? Arm weakness? Speech difficulty? Time to call 112.', instructionHi: 'FAST जांच: चेहरा लटका? बांह कमजोरी? बोलने में कठिनाई? 112 कॉल करें।', icon: '🔍' },
      { step: 3, instruction: 'Note exact time symptoms started.', instructionHi: 'लक्षण शुरू होने का सही समय नोट करें।', icon: '⏱️' },
      { step: 4, instruction: 'Help person lie down with head slightly elevated.', instructionHi: 'सिर थोड़ा ऊपर करके व्यक्ति को लेटने में मदद करें।', icon: '🛏️' },
      { step: 5, instruction: 'Stay with them and keep them calm.', instructionHi: 'उनके साथ रहें और उन्हें शांत रखें।', icon: '🤝' }
    ],
    warnings: ['Every minute matters in a stroke. Brain cells die rapidly without blood flow.'],
    warningsHi: ['स्ट्रोक में हर मिनट महत्वपूर्ण है।'],
    doNots: ['Do NOT give food or drink.', 'Do NOT wait to see if symptoms improve.']
  },

  allergic_reaction: {
    id: 'allergic_reaction',
    name: 'Allergic Reaction',
    nameHi: 'एलर्जी प्रतिक्रिया',
    icon: '🤧',
    description: 'Severe allergic reaction or anaphylaxis',
    descriptionHi: 'गंभीर एलर्जी प्रतिक्रिया या एनाफिलेक्सिस',
    severity: 'critical',
    immediateAction: true,
    firstAidSteps: [
      { step: 1, instruction: 'Call emergency services (112) if breathing or swallowing is difficult.', instructionHi: 'यदि सांस लेने या निगलने में कठिनाई हो तो 112 पर कॉल करें।', icon: '📞' },
      { step: 2, instruction: 'Help use prescribed epinephrine auto-injector (EpiPen) if available.', instructionHi: 'उपलब्ध होने पर एपिनेफ्रीन ऑटो-इंजेक्टर का उपयोग करने में मदद करें।', icon: '💉' },
      { step: 3, instruction: 'Help the person sit upright to breathe easier.', instructionHi: 'सांस लेने में आसानी के लिए व्यक्ति को सीधे बैठने में मदद करें।', icon: '🪑' },
      { step: 4, instruction: 'Stay with person and monitor breathing continuously.', instructionHi: 'व्यक्ति के साथ रहें और सांस की निगरानी करें।', icon: '👀' }
    ],
    warnings: ['Severe allergic reactions (anaphylaxis) can be fatal within minutes.'],
    warningsHi: ['गंभीर एलर्जी प्रतिक्रिया जानलेवा हो सकती है।'],
    doNots: ['Do NOT leave them alone.', 'Do NOT delay calling help.']
  },

  choking: {
    id: 'choking',
    name: 'Choking',
    nameHi: 'गला घुटना',
    icon: '😰',
    description: 'Person is choking and unable to breathe or speak',
    descriptionHi: 'व्यक्ति का गला घुट रहा है और सांस लेने या बोलने में असमर्थ है',
    severity: 'critical',
    immediateAction: true,
    firstAidSteps: [
      { step: 1, instruction: 'Ask: "Are you choking?" If they cannot speak or cough, act immediately.', instructionHi: 'पूछें: "क्या गला घुट रहा है?" यदि वे बोल नहीं सकते, तुरंत कार्रवाई करें।', icon: '❓' },
      { step: 2, instruction: 'Give up to 5 firm back blows between the shoulder blades.', instructionHi: 'कंधे की हड्डियों के बीच 5 तक मजबूत पीठ पर वार करें।', icon: '✋' },
      { step: 3, instruction: 'If not cleared: Give up to 5 abdominal thrusts (Heimlich maneuver).', instructionHi: 'यदि ठीक न हो: 5 पेट के धक्के (हाइम्लिच) दें।', icon: '👊' },
      { step: 4, instruction: 'Alternate between 5 back blows and 5 abdominal thrusts.', instructionHi: '5 पीठ के वार और 5 पेट के धक्कों के बीच बदलते रहें।', icon: '🔄' },
      { step: 5, instruction: 'If person becomes unconscious, call 112 and begin CPR if trained.', instructionHi: 'यदि व्यक्ति बेहोश हो जाए, तो 112 कॉल करें और CPR शुरू करें।', icon: '📞' }
    ],
    warnings: ['Act quickly — lack of oxygen causes damage within minutes.'],
    warningsHi: ['जल्दी कार्रवाई करें — ऑक्सीजन की कमी तेजी से नुकसान पहुंचाती है।'],
    doNots: ['Do NOT blind-sweep mouth with fingers.', 'Do NOT do abdominal thrusts on infants/pregnant women.']
  },

  high_fever: {
    id: 'high_fever',
    name: 'High Fever',
    nameHi: 'तेज बुखार',
    icon: '🌡️',
    description: 'Very high body temperature or fever with concerning symptoms',
    descriptionHi: 'बहुत अधिक शरीर का तापमान या बुखार',
    severity: 'urgent',
    immediateAction: false,
    firstAidSteps: [
      { step: 1, instruction: 'Rest in a cool, ventilated room with light clothing.', instructionHi: 'हल्के कपड़ों के साथ ठंडे, हवादार कमरे में आराम करें।', icon: '🛏️' },
      { step: 2, instruction: 'Give plenty of clean fluids/ORS to prevent dehydration.', instructionHi: 'निर्जलीकरण रोकने के लिए भरपूर तरल पदार्थ / ओआरएस दें।', icon: '💧' },
      { step: 3, instruction: 'Use a damp lukewarm cloth on forehead and neck.', instructionHi: 'माथे और गर्दन पर गुनगुने पानी का नम कपड़ा रखें।', icon: '🧊' },
      { step: 4, instruction: 'Seek medical care if fever is above 103°F (39.4°C) or lasts over 48h.', instructionHi: 'यदि बुखार 103°F से अधिक है या 48 घंटे से अधिक रहता है तो डॉक्टर को दिखाएं।', icon: '🏥' }
    ],
    warnings: ['High fever in infants/elderly needs prompt medical evaluation.'],
    warningsHi: ['शिशुओं/बुजुर्गों में तेज बुखार का तुरंत इलाज कराएं।'],
    doNots: ['Do NOT use ice baths.', 'Do NOT give aspirin to children.']
  },

  snake_bite: {
    id: 'snake_bite',
    name: 'Snake / Insect Bite',
    nameHi: 'सांप / कीट का काटना',
    icon: '🐍',
    description: 'Bite from a snake, scorpion, or venomous creature',
    descriptionHi: 'सांप, बिच्छू, या विषैले जीव का काटना',
    severity: 'critical',
    immediateAction: true,
    firstAidSteps: [
      { step: 1, instruction: 'Call emergency services (112) immediately. Keep person calm and STILL.', instructionHi: 'तुरंत आपातकालीन सेवाओं (112) को कॉल करें। व्यक्ति को शांत और स्थिर रखें।', icon: '📞' },
      { step: 2, instruction: 'Keep the bitten limb immobilized and at or below heart level.', instructionHi: 'काटे गए अंग को स्थिर और हृदय स्तर पर या नीचे रखें।', icon: '⬇️' },
      { step: 3, instruction: 'Remove rings, watches, or tight clothes before swelling occurs.', instructionHi: 'सूजन आने से पहले अंगूठियां, घड़ियां या तंग कपड़े उतार दें।', icon: '💍' },
      { step: 4, instruction: 'Transport immediately to a hospital with anti-snake venom capability.', instructionHi: 'तुरंत एंटी-स्नेक वेनम की सुविधा वाले अस्पताल ले जाएं।', icon: '🏥' }
    ],
    warnings: ['Snake bites can be fatal. Treat every bite as medical emergency.'],
    warningsHi: ['सांप का काटना जानलेवा हो सकता है।'],
    doNots: ['Do NOT cut wound.', 'Do NOT suck venom.', 'Do NOT apply tight tourniquet.']
  },

  other_emergency: {
    id: 'other_emergency',
    name: 'Other Emergency',
    nameHi: 'अन्य आपातकाल',
    icon: '🆘',
    description: 'General emergency or unknown medical distress',
    descriptionHi: 'सामान्य आपातकाल या अज्ञात चिकित्सा संकट',
    severity: 'urgent',
    immediateAction: false,
    firstAidSteps: [
      { step: 1, instruction: 'If life-threatening or severe, call emergency services (112).', instructionHi: 'यदि जानलेवा या गंभीर है, तो आपातकालीन सेवाओं (112) को कॉल करें।', icon: '📞' },
      { step: 2, instruction: 'Keep person calm and comfortable. Monitor airway and breathing.', instructionHi: 'व्यक्ति को शांत रखें और सांस पर नज़र रखें।', icon: '🧘' },
      { step: 3, instruction: 'Do not move the person if spinal or neck injury is suspected.', instructionHi: 'रीढ़ या गर्दन की चोट का संदेह होने पर व्यक्ति को न हिलाएं।', icon: '🚫' },
      { step: 4, instruction: 'Seek immediate guidance at the nearest healthcare facility.', instructionHi: 'निकटतम स्वास्थ्य सुविधा से तत्काल मार्गदर्शन प्राप्त करें।', icon: '🏥' }
    ],
    warnings: ['When in doubt, always contact emergency medical services.'],
    warningsHi: ['संदेह होने पर हमेशा आपातकालीन सेवाओं से संपर्क करें।'],
    doNots: ['Do NOT give random medicines without doctor recommendation.']
  }
};

export function getOfflineCategory(id) {
  return offlineFirstAidData[id] || offlineFirstAidData.other_emergency;
}

export function getAllOfflineCategories() {
  return Object.values(offlineFirstAidData);
}
