/**
 * Safety Rules Engine
 * 
 * Deterministic safety rules that override AI output.
 * These rules ensure the platform NEVER provides dangerous advice.
 * 
 * Priority: Safety rules ALWAYS take precedence over AI categorization.
 */

// Critical keywords that ALWAYS trigger emergency escalation
const CRITICAL_KEYWORDS = [
  'not breathing', 'stopped breathing', 'no pulse', 'heart stopped',
  'unconscious', 'unresponsive', 'not moving', 'cant wake',
  'severe bleeding', 'heavy bleeding', 'blood everywhere', 'bleeding a lot',
  'chest pain', 'heart attack', 'cardiac arrest',
  'stroke', 'face drooping', 'cant speak', 'paralysis',
  'choking', 'cant breathe', 'airway blocked',
  'poison', 'overdose', 'swallowed chemical', 'drank poison',
  'snake bite', 'venomous', 'bitten by snake',
  'anaphylaxis', 'throat swelling', 'cant swallow',
  'seizure more than 5 minutes', 'continuous seizure',
  'drowning', 'electrocution', 'electric shock',
  'gunshot', 'stabbing', 'stab wound',
  'suicide', 'self harm', 'wants to die',
  'baby not breathing', 'child unconscious', 'infant choking'
];

// Words that suggest the person needs mental health support
const MENTAL_HEALTH_KEYWORDS = [
  'suicide', 'kill myself', 'end my life', 'self harm', 'cutting myself',
  'want to die', 'no reason to live', 'overdose on purpose'
];

// Forbidden actions - the platform must NEVER suggest these
const FORBIDDEN_ACTIONS = [
  'specific medication names with dosages',
  'surgical procedures',
  'setting broken bones',
  'removing embedded objects from wounds',
  'induced vomiting without professional guidance',
  'tourniquets without proper training context',
  'specific drug prescriptions',
  'definitive diagnosis'
];

/**
 * Apply safety rules to an AI response
 * Returns modified response with safety overrides applied
 */
function applySafetyRules(aiResponse, userInput) {
  const input = (userInput || '').toLowerCase();
  const result = { ...aiResponse };

  // Rule 1: Check for critical keyword escalation
  const isCritical = CRITICAL_KEYWORDS.some(keyword => input.includes(keyword));
  if (isCritical && result.severity !== 'critical') {
    result.severity = 'critical';
    result.immediateAction = true;
    result.safetyOverride = true;
    result.safetyNote = 'Severity escalated by safety system based on described symptoms.';
  }

  // Rule 2: Mental health crisis detection
  const isMentalHealth = MENTAL_HEALTH_KEYWORDS.some(keyword => input.includes(keyword));
  if (isMentalHealth) {
    result.mentalHealthCrisis = true;
    result.severity = 'critical';
    result.immediateAction = true;
    result.mentalHealthResources = {
      message: 'If you or someone you know is in crisis, please reach out for help immediately.',
      messageHi: 'यदि आप या आपका कोई जानने वाला संकट में है, तो कृपया तुरंत मदद लें।',
      numbers: [
        { name: 'Emergency Services', number: '112' },
        { name: 'Vandrevala Foundation (India)', number: '1860-2662-345' },
        { name: 'iCall', number: '9152987821' }
      ]
    };
  }

  // Rule 3: Always include safety disclaimer
  result.disclaimer = 'This information is for emergency first-aid support only. It does not replace a doctor or emergency medical service. Always contact professional medical services for serious emergencies.';
  result.disclaimerHi = 'यह जानकारी केवल आपातकालीन प्राथमिक चिकित्सा सहायता के लिए है। यह डॉक्टर या आपातकालीन चिकित्सा सेवा का विकल्प नहीं है। गंभीर आपात स्थितियों के लिए हमेशा पेशेवर चिकित्सा सेवाओं से संपर्क करें।';

  // Rule 4: Critical severity always shows emergency call prompt
  if (result.severity === 'critical') {
    result.immediateAction = true;
    result.emergencyCallPrompt = true;
  }

  // Rule 5: Ensure seek_professional_help is true for critical and urgent
  if (result.severity === 'critical' || result.severity === 'urgent') {
    result.seekProfessionalHelp = true;
  }

  // Rule 6: Validate first aid steps don't contain forbidden actions
  if (result.firstAidSteps) {
    result.firstAidSteps = result.firstAidSteps.map(step => {
      const stepText = (typeof step === 'string' ? step : step.instruction || '').toLowerCase();
      // Check for forbidden content
      if (stepText.includes('prescribe') || stepText.includes('mg ') || stepText.includes('dosage')) {
        return typeof step === 'string'
          ? 'Consult a medical professional for any medication guidance.'
          : { ...step, instruction: 'Consult a medical professional for any medication guidance.' };
      }
      return step;
    });
  }

  // Rule 7: Cap severity — never say "not an emergency" for unknown inputs
  if (!result.severity) {
    result.severity = 'urgent';
    result.seekProfessionalHelp = true;
  }

  return result;
}

/**
 * Validate that output doesn't contain diagnosis claims
 */
function validateNoDiagnosis(text) {
  const diagnosisPatterns = [
    /you (definitely|certainly) have/i,
    /this is (definitely|certainly) a/i,
    /you are having a (heart attack|stroke|seizure)/i,
    /i diagnose/i,
    /my diagnosis/i
  ];

  return !diagnosisPatterns.some(pattern => pattern.test(text));
}

/**
 * Get severity level details
 */
function getSeverityInfo(severity) {
  const severityMap = {
    critical: {
      level: 'critical',
      label: 'Critical',
      labelHi: 'गंभीर',
      color: 'red',
      icon: '🔴',
      message: 'Immediate professional emergency help required.',
      messageHi: 'तत्काल पेशेवर आपातकालीन सहायता आवश्यक।',
      callEmergency: true
    },
    urgent: {
      level: 'urgent',
      label: 'Urgent',
      labelHi: 'अत्यावश्यक',
      color: 'orange',
      icon: '🟠',
      message: 'Medical attention required as soon as possible.',
      messageHi: 'जल्द से जल्द चिकित्सा ध्यान आवश्यक।',
      callEmergency: false
    },
    less_urgent: {
      level: 'less_urgent',
      label: 'Less Urgent',
      labelHi: 'कम अत्यावश्यक',
      color: 'green',
      icon: '🟢',
      message: 'Basic first aid may be appropriate. Monitor the person and consider seeking medical advice.',
      messageHi: 'बुनियादी प्राथमिक चिकित्सा उपयुक्त हो सकती है। व्यक्ति की निगरानी करें और चिकित्सा सलाह लेने पर विचार करें।',
      callEmergency: false
    }
  };

  return severityMap[severity] || severityMap.urgent;
}

module.exports = { applySafetyRules, validateNoDiagnosis, getSeverityInfo, CRITICAL_KEYWORDS };
