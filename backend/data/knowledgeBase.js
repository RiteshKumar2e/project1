/**
 * Curated Emergency First-Aid Knowledge Base
 * 
 * IMPORTANT: This content is for emergency first-aid support only.
 * It does NOT replace professional medical advice, diagnosis, or treatment.
 * All guidance follows established first-aid protocols from organizations like
 * Red Cross, WHO, and St John Ambulance.
 */

const emergencyCategories = {
  chest_pain: {
    id: 'chest_pain',
    name: 'Chest Pain',
    nameHi: 'सीने में दर्द',
    icon: '❤️‍🩹',
    description: 'Pain, pressure, or discomfort in the chest area',
    descriptionHi: 'छाती के क्षेत्र में दर्द, दबाव या बेचैनी',
    severity: 'critical',
    keywords: ['chest pain', 'chest pressure', 'heart attack', 'heart pain', 'chest tightness', 'chest discomfort', 'angina', 'cardiac'],
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
    ],
    videoCategory: 'chest_pain_emergency'
  },

  breathing_difficulty: {
    id: 'breathing_difficulty',
    name: 'Breathing Difficulty',
    nameHi: 'सांस लेने में कठिनाई',
    icon: '🫁',
    description: 'Difficulty breathing, shortness of breath, or respiratory distress',
    descriptionHi: 'सांस लेने में कठिनाई, सांस की कमी, या श्वसन संकट',
    severity: 'critical',
    keywords: ['breathing', 'breathless', 'cant breathe', 'shortness of breath', 'suffocating', 'gasping', 'respiratory', 'asthma attack', 'wheezing'],
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
    ],
    videoCategory: 'breathing_emergency'
  },

  severe_bleeding: {
    id: 'severe_bleeding',
    name: 'Severe Bleeding',
    nameHi: 'गंभीर रक्तस्राव',
    icon: '🩸',
    description: 'Heavy or uncontrollable bleeding from a wound or injury',
    descriptionHi: 'घाव या चोट से भारी या अनियंत्रित रक्तस्राव',
    severity: 'critical',
    keywords: ['bleeding', 'blood', 'hemorrhage', 'cut', 'wound', 'laceration', 'heavy bleeding', 'blood loss'],
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
    ],
    videoCategory: 'bleeding_emergency'
  },

  burns: {
    id: 'burns',
    name: 'Burns',
    nameHi: 'जलना',
    icon: '🔥',
    description: 'Burns from heat, chemicals, or electrical sources',
    descriptionHi: 'गर्मी, रसायन, या बिजली के स्रोतों से जलना',
    severity: 'urgent',
    keywords: ['burn', 'burned', 'scalded', 'scald', 'fire', 'hot water', 'chemical burn', 'electrical burn', 'blister'],
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
      'Do NOT remove clothing stuck to the burn.',
      'Do NOT use fluffy materials like cotton wool directly on the burn.'
    ],
    videoCategory: 'burns_emergency'
  },

  fracture: {
    id: 'fracture',
    name: 'Fracture / Bone Injury',
    nameHi: 'हड्डी टूटना / चोट',
    icon: '🦴',
    description: 'Suspected broken bone or serious musculoskeletal injury',
    descriptionHi: 'संदिग्ध टूटी हुई हड्डी या गंभीर मस्कुलोस्केलेटल चोट',
    severity: 'urgent',
    keywords: ['fracture', 'broken bone', 'break', 'fall', 'twisted', 'sprain', 'swollen', 'deformed', 'cant move', 'injury'],
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
      'Spinal injuries require the person to remain completely still.',
      'Open fractures (bone visible) are serious — cover with clean cloth and call 112.'
    ],
    warningsHi: [
      'टूटी हड्डी को हिलाने से और चोट लग सकती है।',
      'रीढ़ की हड्डी की चोटों में व्यक्ति को पूरी तरह स्थिर रहना चाहिए।',
      'खुले फ्रैक्चर (हड्डी दिखाई देना) गंभीर हैं — साफ कपड़े से ढकें और 112 कॉल करें।'
    ],
    doNots: [
      'Do NOT try to realign or push a bone back.',
      'Do NOT move the person if you suspect a spinal injury.',
      'Do NOT apply direct ice to the skin.'
    ],
    videoCategory: 'fracture_emergency'
  },

  unconsciousness: {
    id: 'unconsciousness',
    name: 'Unconsciousness',
    nameHi: 'बेहोशी',
    icon: '😵',
    description: 'Person is unconscious, unresponsive, or has fainted',
    descriptionHi: 'व्यक्ति बेहोश है, अनुत्तरदायी है, या बेहोश हो गया है',
    severity: 'critical',
    keywords: ['unconscious', 'fainted', 'unresponsive', 'collapsed', 'passed out', 'not waking up', 'coma', 'blackout'],
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
      'If the person is not breathing, every second counts.',
      'Do NOT try to wake them by shaking violently or splashing cold water.'
    ],
    warningsHi: [
      'बेहोशी जानलेवा हो सकती है।',
      'यदि व्यक्ति सांस नहीं ले रहा है, तो हर सेकंड महत्वपूर्ण है।',
      'उन्हें जोर से हिलाकर या ठंडा पानी डालकर जगाने की कोशिश न करें।'
    ],
    doNots: [
      'Do NOT leave an unconscious person alone.',
      'Do NOT try to give them food or water.',
      'Do NOT try to move them unless they are in immediate danger.'
    ],
    videoCategory: 'unconsciousness_emergency'
  },

  seizure: {
    id: 'seizure',
    name: 'Seizure',
    nameHi: 'दौरा/मिर्गी',
    icon: '⚡',
    description: 'Person is having a seizure or convulsions',
    descriptionHi: 'व्यक्ति को दौरा या ऐंठन हो रही है',
    severity: 'critical',
    keywords: ['seizure', 'convulsion', 'epilepsy', 'fitting', 'shaking', 'jerking', 'epileptic'],
    immediateAction: true,
    firstAidSteps: [
      { step: 1, instruction: 'Clear the area around the person. Move away furniture or objects that could cause injury.', instructionHi: 'व्यक्ति के आसपास का क्षेत्र साफ करें। फर्नीचर या वस्तुओं को हटाएं जो चोट का कारण बन सकते हैं।', icon: '🧹' },
      { step: 2, instruction: 'Do NOT hold the person down or try to stop the movements.', instructionHi: 'व्यक्ति को पकड़कर न रखें या हिलने-डुलने से रोकने की कोशिश न करें।', icon: '🚫' },
      { step: 3, instruction: 'Place something soft (like a folded cloth) under their head if possible.', instructionHi: 'यदि संभव हो तो उनके सिर के नीचे कुछ नरम (जैसे मुड़ा हुआ कपड़ा) रखें।', icon: '🧸' },
      { step: 4, instruction: 'Note the time when the seizure started.', instructionHi: 'दौरा शुरू होने का समय नोट करें।', icon: '⏱️' },
      { step: 5, instruction: 'After the seizure stops, gently place them on their side (recovery position).', instructionHi: 'दौरा रुकने के बाद, उन्हें धीरे से करवट पर लिटाएं (रिकवरी पोजीशन)।', icon: '🔄' },
      { step: 6, instruction: 'Call emergency services (112) if the seizure lasts more than 5 minutes, or if it is the first seizure.', instructionHi: 'यदि दौरा 5 मिनट से अधिक चलता है, या यदि यह पहला दौरा है, तो आपातकालीन सेवाओं (112) को कॉल करें।', icon: '📞' }
    ],
    warnings: [
      'Most seizures stop on their own within a few minutes.',
      'A seizure lasting more than 5 minutes is a medical emergency.',
      'The person may be confused or sleepy after the seizure — this is normal.'
    ],
    warningsHi: [
      'अधिकांश दौरे कुछ मिनटों में अपने आप बंद हो जाते हैं।',
      '5 मिनट से अधिक चलने वाला दौरा एक चिकित्सा आपातकाल है।',
      'दौरे के बाद व्यक्ति भ्रमित या नींद में हो सकता है — यह सामान्य है।'
    ],
    doNots: [
      'Do NOT put anything in the person\'s mouth.',
      'Do NOT try to hold them down.',
      'Do NOT give them food or water until fully recovered.'
    ],
    videoCategory: 'seizure_emergency'
  },

  poisoning: {
    id: 'poisoning',
    name: 'Poisoning',
    nameHi: 'विषाक्तता',
    icon: '☠️',
    description: 'Suspected ingestion of poison, toxic substance, or overdose',
    descriptionHi: 'ज़हर, विषाक्त पदार्थ, या ओवरडोज़ का संदिग्ध सेवन',
    severity: 'critical',
    keywords: ['poison', 'poisoning', 'toxic', 'ingested', 'swallowed', 'overdose', 'chemical', 'pesticide', 'insecticide'],
    immediateAction: true,
    firstAidSteps: [
      { step: 1, instruction: 'Call emergency services (112) immediately. If possible, tell them what was swallowed.', instructionHi: 'तुरंत आपातकालीन सेवाओं (112) को कॉल करें। यदि संभव हो, बताएं कि क्या निगला गया था।', icon: '📞' },
      { step: 2, instruction: 'Do NOT make the person vomit unless told to by emergency services.', instructionHi: 'आपातकालीन सेवाओं द्वारा कहे जाने तक व्यक्ति को उल्टी न कराएं।', icon: '🚫' },
      { step: 3, instruction: 'If the person is conscious, try to find out what they swallowed, how much, and when.', instructionHi: 'यदि व्यक्ति होश में है, तो पता लगाने की कोशिश करें कि उसने क्या निगला, कितना, और कब।', icon: '🔍' },
      { step: 4, instruction: 'Keep any containers, labels, or samples of the substance to show medical personnel.', instructionHi: 'चिकित्सा कर्मियों को दिखाने के लिए किसी भी कंटेनर, लेबल, या पदार्थ के नमूने रखें।', icon: '🏷️' },
      { step: 5, instruction: 'If the person is unconscious but breathing, place them on their side.', instructionHi: 'यदि व्यक्ति बेहोश है लेकिन सांस ले रहा है, तो उन्हें करवट पर लिटाएं।', icon: '🔄' },
      { step: 6, instruction: 'Monitor their breathing until help arrives.', instructionHi: 'मदद आने तक उनकी सांस पर नज़र रखें।', icon: '👀' }
    ],
    warnings: [
      'Poisoning can be life-threatening. Always call emergency services.',
      'Some poisons act quickly — do not wait for symptoms to worsen.',
      'Chemical burns in the mouth may indicate corrosive poisoning.'
    ],
    warningsHi: [
      'विषाक्तता जानलेवा हो सकती है। हमेशा आपातकालीन सेवाओं को कॉल करें।',
      'कुछ जहर तेजी से काम करते हैं — लक्षण बिगड़ने का इंतजार न करें।',
      'मुंह में रासायनिक जलन संक्षारक विषाक्तता का संकेत हो सकती है।'
    ],
    doNots: [
      'Do NOT induce vomiting unless instructed by medical professionals.',
      'Do NOT give food, water, or milk unless told by emergency services.',
      'Do NOT try to neutralize the poison with other substances.'
    ],
    videoCategory: 'poisoning_emergency'
  },

  stroke: {
    id: 'stroke',
    name: 'Stroke Warning Signs',
    nameHi: 'स्ट्रोक के चेतावनी संकेत',
    icon: '🧠',
    description: 'Sudden weakness, speech problems, or facial drooping that may indicate stroke',
    descriptionHi: 'अचानक कमजोरी, बोलने में समस्या, या चेहरे का लटकना जो स्ट्रोक का संकेत हो सकता है',
    severity: 'critical',
    keywords: ['stroke', 'face drooping', 'slurred speech', 'arm weakness', 'numbness', 'paralysis', 'sudden headache', 'vision loss'],
    immediateAction: true,
    firstAidSteps: [
      { step: 1, instruction: 'Call emergency services (112) IMMEDIATELY. Stroke treatment is time-critical.', instructionHi: 'तुरंत आपातकालीन सेवाओं (112) को कॉल करें। स्ट्रोक का उपचार समय-महत्वपूर्ण है।', icon: '📞' },
      { step: 2, instruction: 'Use FAST to check: Face drooping? Arm weakness? Speech difficulty? Time to call 112.', instructionHi: 'FAST से जांचें: चेहरा लटका? बांह में कमजोरी? बोलने में कठिनाई? 112 कॉल करने का समय।', icon: '🔍' },
      { step: 3, instruction: 'Note the time when symptoms first appeared. Tell this to emergency services.', instructionHi: 'जब लक्षण पहली बार दिखाई दिए तो समय नोट करें। यह आपातकालीन सेवाओं को बताएं।', icon: '⏱️' },
      { step: 4, instruction: 'Help the person lie down with their head slightly raised.', instructionHi: 'व्यक्ति को सिर थोड़ा ऊंचा करके लेटने में मदद करें।', icon: '🛏️' },
      { step: 5, instruction: 'Do NOT give them anything to eat or drink.', instructionHi: 'उन्हें कुछ भी खाने या पीने को न दें।', icon: '🚫' },
      { step: 6, instruction: 'Stay with them and keep them calm until help arrives.', instructionHi: 'मदद आने तक उनके साथ रहें और उन्हें शांत रखें।', icon: '🤝' }
    ],
    warnings: [
      'Every minute matters in a stroke. Brain cells die rapidly without blood flow.',
      'Even if symptoms seem to improve, still call emergency services.',
      'Note the exact time symptoms started — this helps doctors choose treatment.'
    ],
    warningsHi: [
      'स्ट्रोक में हर मिनट मायने रखता है। रक्त प्रवाह के बिना मस्तिष्क कोशिकाएं तेजी से मरती हैं।',
      'भले ही लक्षण सुधरते दिखें, फिर भी आपातकालीन सेवाओं को कॉल करें।',
      'लक्षण शुरू होने का सही समय नोट करें — इससे डॉक्टरों को उपचार चुनने में मदद मिलती है।'
    ],
    doNots: [
      'Do NOT wait for symptoms to go away.',
      'Do NOT give any medication.',
      'Do NOT let the person go to sleep without medical evaluation.'
    ],
    videoCategory: 'stroke_emergency'
  },

  allergic_reaction: {
    id: 'allergic_reaction',
    name: 'Allergic Reaction',
    nameHi: 'एलर्जी प्रतिक्रिया',
    icon: '🤧',
    description: 'Severe allergic reaction or anaphylaxis',
    descriptionHi: 'गंभीर एलर्जी प्रतिक्रिया या एनाफिलेक्सिस',
    severity: 'critical',
    keywords: ['allergic', 'allergy', 'anaphylaxis', 'swelling', 'hives', 'rash', 'throat swelling', 'allergic reaction', 'epipen'],
    immediateAction: true,
    firstAidSteps: [
      { step: 1, instruction: 'Call emergency services (112) immediately if there is throat swelling, breathing difficulty, or dizziness.', instructionHi: 'यदि गले में सूजन, सांस लेने में कठिनाई, या चक्कर आ रहा है तो तुरंत आपातकालीन सेवाओं (112) को कॉल करें।', icon: '📞' },
      { step: 2, instruction: 'If the person has a prescribed epinephrine auto-injector, help them use it.', instructionHi: 'यदि व्यक्ति के पास निर्धारित एपिनेफ्रिन ऑटो-इंजेक्टर है, तो उसे उपयोग करने में मदद करें।', icon: '💉' },
      { step: 3, instruction: 'Help the person sit upright to make breathing easier.', instructionHi: 'सांस लेने में आसानी के लिए व्यक्ति को सीधे बैठने में मदद करें।', icon: '🪑' },
      { step: 4, instruction: 'If the person feels faint, help them lie down with legs raised.', instructionHi: 'यदि व्यक्ति को बेहोशी महसूस हो, तो उन्हें पैर ऊपर करके लेटने में मदद करें।', icon: '🦵' },
      { step: 5, instruction: 'Remove the trigger if possible (e.g., insect stinger).', instructionHi: 'यदि संभव हो तो ट्रिगर हटाएं (जैसे, कीट का डंक)।', icon: '🔍' },
      { step: 6, instruction: 'Monitor their breathing and stay with them until help arrives.', instructionHi: 'उनकी सांस पर नज़र रखें और मदद आने तक उनके साथ रहें।', icon: '👀' }
    ],
    warnings: [
      'Severe allergic reactions (anaphylaxis) can be fatal within minutes.',
      'Symptoms can worsen rapidly even after seeming to improve.',
      'Signs of severe reaction: throat tightness, difficulty breathing, dizziness, swelling.'
    ],
    warningsHi: [
      'गंभीर एलर्जी प्रतिक्रिया (एनाफिलेक्सिस) मिनटों में घातक हो सकती है।',
      'लक्षण सुधरने के बाद भी तेजी से बिगड़ सकते हैं।',
      'गंभीर प्रतिक्रिया के संकेत: गले में जकड़न, सांस लेने में कठिनाई, चक्कर आना, सूजन।'
    ],
    doNots: [
      'Do NOT give the person anything to eat or drink.',
      'Do NOT leave them alone.',
      'Do NOT wait to see if symptoms improve on their own.'
    ],
    videoCategory: 'allergic_reaction_emergency'
  },

  choking: {
    id: 'choking',
    name: 'Choking',
    nameHi: 'गला घुटना',
    icon: '😰',
    description: 'Person is choking and unable to breathe or speak',
    descriptionHi: 'व्यक्ति का गला घुट रहा है और सांस लेने या बोलने में असमर्थ है',
    severity: 'critical',
    keywords: ['choking', 'choke', 'cant speak', 'cant breathe', 'food stuck', 'throat blocked', 'gagging', 'airway'],
    immediateAction: true,
    firstAidSteps: [
      { step: 1, instruction: 'Ask the person: "Are you choking?" If they cannot speak or cough, act immediately.', instructionHi: 'व्यक्ति से पूछें: "क्या आपका गला घुट रहा है?" अगर वे बोल या खांस नहीं सकते, तुरंत कार्रवाई करें।', icon: '❓' },
      { step: 2, instruction: 'Stand behind the person. Give up to 5 firm back blows between the shoulder blades using the heel of your hand.', instructionHi: 'व्यक्ति के पीछे खड़े हों। अपने हाथ की एड़ी का उपयोग करके कंधे की हड्डियों के बीच 5 तक मजबूत पीठ पर वार करें।', icon: '✋' },
      { step: 3, instruction: 'If back blows don\'t work: Give up to 5 abdominal thrusts (Heimlich maneuver) — place your fist above their navel and thrust inward and upward.', instructionHi: 'यदि पीठ पर वार काम न करे: 5 तक पेट के धक्के (हाइम्लिच मैन्यूवर) दें — अपनी मुट्ठी उनकी नाभि के ऊपर रखें और अंदर और ऊपर की ओर धक्का दें।', icon: '👊' },
      { step: 4, instruction: 'Alternate between 5 back blows and 5 abdominal thrusts until the object is dislodged.', instructionHi: 'वस्तु निकलने तक 5 पीठ के वार और 5 पेट के धक्कों के बीच बदलते रहें।', icon: '🔄' },
      { step: 5, instruction: 'If the person becomes unconscious, call 112 and begin CPR if trained.', instructionHi: 'यदि व्यक्ति बेहोश हो जाता है, तो 112 कॉल करें और यदि प्रशिक्षित हैं तो CPR शुरू करें।', icon: '📞' },
      { step: 6, instruction: 'Even after the object is removed, seek medical attention.', instructionHi: 'वस्तु निकालने के बाद भी चिकित्सा सहायता लें।', icon: '🏥' }
    ],
    warnings: [
      'A person who cannot cough, speak, or breathe is having a severe choking emergency.',
      'Act quickly — brain damage can occur within minutes without oxygen.',
      'If the person can cough forcefully, encourage them to keep coughing.'
    ],
    warningsHi: [
      'जो व्यक्ति खांस, बोल, या सांस नहीं ले सकता, उसे गंभीर दम घुटने की आपात स्थिति है।',
      'जल्दी कार्रवाई करें — ऑक्सीजन के बिना मिनटों में मस्तिष्क क्षति हो सकती है।',
      'यदि व्यक्ति जोर से खांस सकता है, तो उन्हें खांसते रहने के लिए प्रोत्साहित करें।'
    ],
    doNots: [
      'Do NOT perform abdominal thrusts on pregnant women or infants — use chest thrusts instead.',
      'Do NOT try to reach in and pull the object out with your fingers.',
      'Do NOT slap the person on the back if they can still cough effectively.'
    ],
    videoCategory: 'choking_emergency'
  },

  high_fever: {
    id: 'high_fever',
    name: 'High Fever',
    nameHi: 'तेज बुखार',
    icon: '🌡️',
    description: 'Very high body temperature or fever with concerning symptoms',
    descriptionHi: 'बहुत अधिक शरीर का तापमान या चिंताजनक लक्षणों के साथ बुखार',
    severity: 'urgent',
    keywords: ['fever', 'high temperature', 'hot', 'sweating', 'chills', 'shivering', 'temperature'],
    immediateAction: false,
    firstAidSteps: [
      { step: 1, instruction: 'Help the person rest in a cool, comfortable place.', instructionHi: 'व्यक्ति को ठंडी, आरामदायक जगह पर आराम करने में मदद करें।', icon: '🛏️' },
      { step: 2, instruction: 'Remove excess clothing. Use a light sheet or blanket.', instructionHi: 'अतिरिक्त कपड़े हटाएं। हल्की चादर या कंबल का उपयोग करें।', icon: '👕' },
      { step: 3, instruction: 'Give them plenty of water or oral rehydration solution to stay hydrated.', instructionHi: 'उन्हें हाइड्रेटेड रहने के लिए भरपूर पानी या ओरल रिहाइड्रेशन सॉल्यूशन दें।', icon: '💧' },
      { step: 4, instruction: 'Use a damp cloth on the forehead and neck to help cool down.', instructionHi: 'ठंडा करने में मदद के लिए माथे और गर्दन पर गीला कपड़ा रखें।', icon: '🧊' },
      { step: 5, instruction: 'Monitor the temperature regularly if a thermometer is available.', instructionHi: 'यदि थर्मामीटर उपलब्ध है तो नियमित रूप से तापमान की निगरानी करें।', icon: '🌡️' },
      { step: 6, instruction: 'Seek medical attention if the fever is very high, lasts more than 2 days, or is in a child or elderly person.', instructionHi: 'यदि बुखार बहुत अधिक है, 2 दिनों से अधिक रहता है, या बच्चे या बुजुर्ग व्यक्ति में है तो चिकित्सा सहायता लें।', icon: '🏥' }
    ],
    warnings: [
      'High fever in infants and young children can be serious — seek medical help quickly.',
      'Fever with stiff neck, severe headache, or rash may indicate a serious condition.',
      'Call 112 if the person has a seizure due to fever.'
    ],
    warningsHi: [
      'शिशुओं और छोटे बच्चों में तेज बुखार गंभीर हो सकता है — जल्दी चिकित्सा सहायता लें।',
      'गर्दन में अकड़न, गंभीर सिरदर्द, या दाने के साथ बुखार एक गंभीर स्थिति का संकेत हो सकता है।',
      'बुखार के कारण दौरा पड़ने पर 112 कॉल करें।'
    ],
    doNots: [
      'Do NOT give aspirin to children.',
      'Do NOT use ice-cold water for bathing — use lukewarm water.',
      'Do NOT bundle up with heavy blankets if the person is already hot.'
    ],
    videoCategory: 'fever_management'
  },

  snake_bite: {
    id: 'snake_bite',
    name: 'Snake / Insect Bite',
    nameHi: 'सांप / कीट का काटना',
    icon: '🐍',
    description: 'Bite from a snake, scorpion, spider, or insect',
    descriptionHi: 'सांप, बिच्छू, मकड़ी, या कीट का काटना',
    severity: 'critical',
    keywords: ['snake bite', 'bite', 'insect bite', 'scorpion', 'spider', 'sting', 'venom', 'snake'],
    immediateAction: true,
    firstAidSteps: [
      { step: 1, instruction: 'Call emergency services (112) immediately. Try to note the appearance of the snake/insect.', instructionHi: 'तुरंत आपातकालीन सेवाओं (112) को कॉल करें। सांप/कीट की शक्ल नोट करने की कोशिश करें।', icon: '📞' },
      { step: 2, instruction: 'Keep the person still and calm. Movement can spread venom faster.', instructionHi: 'व्यक्ति को स्थिर और शांत रखें। हिलने-डुलने से जहर तेजी से फैल सकता है।', icon: '🧘' },
      { step: 3, instruction: 'Keep the bitten area below the level of the heart if possible.', instructionHi: 'यदि संभव हो तो काटे गए क्षेत्र को हृदय के स्तर से नीचे रखें।', icon: '⬇️' },
      { step: 4, instruction: 'Remove any jewelry or tight clothing near the bite before swelling starts.', instructionHi: 'सूजन शुरू होने से पहले काटे गए स्थान के पास कोई भी गहना या तंग कपड़ा हटाएं।', icon: '💍' },
      { step: 5, instruction: 'Clean the bite area gently with clean water if available.', instructionHi: 'यदि उपलब्ध हो तो साफ पानी से काटे गए क्षेत्र को धीरे से साफ करें।', icon: '💧' },
      { step: 6, instruction: 'Get the person to a hospital as quickly as possible for anti-venom treatment.', instructionHi: 'एंटी-वेनम उपचार के लिए व्यक्ति को जल्द से जल्द अस्पताल ले जाएं।', icon: '🏥' }
    ],
    warnings: [
      'Snake bites can be fatal — always treat as serious even if the person feels fine.',
      'Time is critical for anti-venom treatment.',
      'Do NOT try to catch or kill the snake — note its appearance for identification.'
    ],
    warningsHi: [
      'सांप का काटना घातक हो सकता है — भले ही व्यक्ति ठीक महसूस करे, हमेशा गंभीरता से लें।',
      'एंटी-वेनम उपचार के लिए समय महत्वपूर्ण है।',
      'सांप को पकड़ने या मारने की कोशिश न करें — पहचान के लिए उसकी शक्ल नोट करें।'
    ],
    doNots: [
      'Do NOT suck the venom out.',
      'Do NOT apply a tourniquet.',
      'Do NOT cut the wound.',
      'Do NOT apply ice directly to the bite.',
      'Do NOT give the person alcohol.'
    ],
    videoCategory: 'snakebite_emergency'
  },

  other_emergency: {
    id: 'other_emergency',
    name: 'Other Emergency',
    nameHi: 'अन्य आपातकाल',
    icon: '🆘',
    description: 'Any other medical emergency not listed above',
    descriptionHi: 'ऊपर सूचीबद्ध नहीं की गई कोई अन्य चिकित्सा आपातकाल',
    severity: 'urgent',
    keywords: [],
    immediateAction: false,
    firstAidSteps: [
      { step: 1, instruction: 'If the person is in immediate danger or their condition seems life-threatening, call emergency services (112).', instructionHi: 'यदि व्यक्ति तत्काल खतरे में है या उनकी स्थिति जानलेवा लगती है, तो आपातकालीन सेवाओं (112) को कॉल करें।', icon: '📞' },
      { step: 2, instruction: 'Keep the person comfortable and calm.', instructionHi: 'व्यक्ति को आरामदायक और शांत रखें।', icon: '🧘' },
      { step: 3, instruction: 'Check for breathing and consciousness regularly.', instructionHi: 'नियमित रूप से श्वास और चेतना की जांच करें।', icon: '👀' },
      { step: 4, instruction: 'Do not move the person if you suspect a spinal or neck injury.', instructionHi: 'यदि आपको रीढ़ या गर्दन की चोट का संदेह है तो व्यक्ति को न हिलाएं।', icon: '🚫' },
      { step: 5, instruction: 'Gather information: What happened? When? Any known medical conditions?', instructionHi: 'जानकारी इकट्ठा करें: क्या हुआ? कब? कोई ज्ञात चिकित्सा स्थितियां?', icon: '📋' },
      { step: 6, instruction: 'Contact a doctor or visit the nearest healthcare facility.', instructionHi: 'डॉक्टर से संपर्क करें या निकटतम स्वास्थ्य सुविधा पर जाएं।', icon: '🏥' }
    ],
    warnings: [
      'When in doubt, call emergency services (112).',
      'It is better to be cautious with medical emergencies.',
      'Monitor the person closely for any worsening symptoms.'
    ],
    warningsHi: [
      'संदेह होने पर, आपातकालीन सेवाओं (112) को कॉल करें।',
      'चिकित्सा आपात स्थितियों में सतर्क रहना बेहतर है।',
      'किसी भी बिगड़ते लक्षणों के लिए व्यक्ति की बारीकी से निगरानी करें।'
    ],
    doNots: [
      'Do NOT give medications you are unsure about.',
      'Do NOT delay seeking professional help if the situation seems serious.'
    ],
    videoCategory: 'general_emergency'
  }
};

function getCategoryById(id) {
  return emergencyCategories[id] || null;
}

function getAllCategories() {
  return Object.values(emergencyCategories);
}

function searchByKeywords(text) {
  const lowerText = text.toLowerCase();
  const results = [];

  for (const category of Object.values(emergencyCategories)) {
    let score = 0;
    for (const keyword of category.keywords) {
      if (lowerText.includes(keyword)) {
        score += keyword.split(' ').length; // Multi-word matches score higher
      }
    }
    if (score > 0) {
      results.push({ category, score });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.length > 0 ? results[0].category : emergencyCategories.other_emergency;
}

module.exports = { emergencyCategories, getCategoryById, getAllCategories, searchByKeywords };
