/**
 * AI Service — Emergency Symptom Analysis
 * 
 * Integrates with Google Gemini API for natural-language symptom understanding.
 * Falls back to keyword-based categorization when API is unavailable.
 */

const { searchByKeywords, getCategoryById } = require('../data/knowledgeBase');

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SYSTEM_PROMPT = `You are a first-aid emergency categorization assistant. Your ONLY job is to analyze the user's description of a medical emergency and output a structured JSON response.

You must NEVER:
- Claim to diagnose any condition
- Recommend specific medications or dosages
- Suggest complex medical procedures
- Provide reassurance that downplays symptoms
- Invent medical information

You must ALWAYS:
- Err on the side of caution (if unsure, classify as more severe)
- Recommend calling emergency services for potentially life-threatening situations
- Use simple, non-technical language

Respond with ONLY this JSON structure (no markdown, no extra text):
{
  "emergency_category": "one of: chest_pain, breathing_difficulty, severe_bleeding, burns, fracture, unconsciousness, seizure, poisoning, stroke, allergic_reaction, choking, high_fever, snake_bite, other_emergency",
  "severity": "one of: critical, urgent, less_urgent",
  "immediate_action_required": true/false,
  "confidence": 0.0 to 1.0,
  "reasoning": "brief explanation of categorization"
}`;

/**
 * Analyze symptoms using Gemini API
 */
async function analyzeWithAI(userInput) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.log('[AI Service] No API key configured, using keyword fallback');
    return analyzeWithKeywords(userInput);
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${SYSTEM_PROMPT}\n\nUser's emergency description:\n"${userInput}"` }]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 500,
          responseMimeType: 'application/json'
        }
      }),
      signal: AbortSignal.timeout(10000) // 10s timeout
    });

    if (!response.ok) {
      console.error(`[AI Service] API error: ${response.status}`);
      return analyzeWithKeywords(userInput);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error('[AI Service] Empty response from API');
      return analyzeWithKeywords(userInput);
    }

    // Parse and validate JSON response
    const aiResult = JSON.parse(text);

    // Validate the category exists in our knowledge base
    const validCategories = [
      'chest_pain', 'breathing_difficulty', 'severe_bleeding', 'burns',
      'fracture', 'unconsciousness', 'seizure', 'poisoning', 'stroke',
      'allergic_reaction', 'choking', 'high_fever', 'snake_bite', 'other_emergency'
    ];

    if (!validCategories.includes(aiResult.emergency_category)) {
      aiResult.emergency_category = 'other_emergency';
    }

    const validSeverities = ['critical', 'urgent', 'less_urgent'];
    if (!validSeverities.includes(aiResult.severity)) {
      aiResult.severity = 'urgent'; // Default to caution
    }

    return {
      ...aiResult,
      source: 'ai',
      model: 'gemini-2.0-flash'
    };

  } catch (error) {
    console.error('[AI Service] Error:', error.message);
    return analyzeWithKeywords(userInput);
  }
}

/**
 * Fallback: Keyword-based emergency categorization
 * Used when AI API is unavailable
 */
function analyzeWithKeywords(userInput) {
  const category = searchByKeywords(userInput);

  return {
    emergency_category: category.id,
    severity: category.severity,
    immediate_action_required: category.immediateAction,
    confidence: 0.6,
    reasoning: 'Categorized using keyword matching (AI service unavailable)',
    source: 'keyword_fallback'
  };
}

const CHAT_SYSTEM_PROMPT = `You are Rural Health & First-Aid Assistant AI, a helpful, compassionate emergency guidance chatbot for rural India.
Your mission is to provide clear, actionable, life-saving first aid instructions and safety guidance.

Guidelines:
1. Keep your answers concise, structured (numbered steps or bullet points), and very easy to read on a mobile phone screen.
2. In critical situations (chest pain, severe bleeding, snake bite, stroke, choking, unconsciousness), ALWAYS advise calling 112 emergency services right away.
3. Support both English and Hindi (हिन्दी) seamlessly. If the user writes in Hindi or Hinglish, answer clearly with simple Devanagari or English text as appropriate.
4. Never prescribe drugs/antibiotics or diagnose specific diseases. Give standard WHO/Red Cross first aid steps.
5. Emphasize what to DO and what NOT to do.`;

/**
 * Multi-turn conversational chat with Gemini API or intelligent local fallback
 */
async function chatWithAI(messages = [], userLocation = null) {
  const apiKey = process.env.GEMINI_API_KEY;
  const lastUserMsg = messages[messages.length - 1]?.text || '';

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return chatFallback(lastUserMsg);
  }

  try {
    const formattedContents = [
      {
        role: 'user',
        parts: [{ text: CHAT_SYSTEM_PROMPT }]
      },
      {
        role: 'model',
        parts: [{ text: "Understood. I am ready to provide immediate, clear first-aid and emergency assistance." }]
      }
    ];

    messages.forEach(msg => {
      formattedContents.push({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    });

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: formattedContents,
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 600
        }
      }),
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      console.error(`[AI Chat] API error: ${response.status}`);
      return chatFallback(lastUserMsg);
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      return chatFallback(lastUserMsg);
    }

    // Check matching category for quick action links
    const matchedCategory = searchByKeywords(lastUserMsg);

    return {
      text: replyText,
      category: matchedCategory?.id || null,
      source: 'gemini-2.0-flash'
    };

  } catch (error) {
    console.error('[AI Chat] Error:', error.message);
    return chatFallback(lastUserMsg);
  }
}

/**
 * Intelligent Chat Fallback using Knowledge Base
 */
function chatFallback(userInput) {
  const matchedCategory = searchByKeywords(userInput);
  if (matchedCategory && matchedCategory.id !== 'other_emergency') {
    const stepsText = matchedCategory.firstAidSteps
      .map(s => `${s.step}. ${s.instruction} (${s.instructionHi})`)
      .join('\n');
    const warningsText = matchedCategory.warnings.join(' • ');

    const text = `🚨 **${matchedCategory.name} / ${matchedCategory.nameHi}**\n\n` +
      `**Immediate Steps / ज़रूरी कदम:**\n${stepsText}\n\n` +
      `⚠️ **Important Warnings:** ${warningsText}\n\n` +
      `📞 Emergency Services: **Call 112** immediately if severe!`;

    return {
      text,
      category: matchedCategory.id,
      source: 'knowledge_base'
    };
  }

  // Generic helpful fallback
  const isHindi = /[\u0900-\u097F]/.test(userInput) || /kya|kaise|kaha|madad|batao|karo/i.test(userInput);

  if (isHindi) {
    return {
      text: `स्वास्थ्य और प्राथमिक चिकित्सा सहायक में आपका स्वागत है! 🏥\n\nआप मुझसे किसी भी आपातकालीन स्थिति के बारे में पूछ सकते हैं, जैसे:\n- "सांप काटने पर क्या करें?"\n- "सीने में दर्द प्राथमिक उपचार"\n- "खून बहना कैसे रोकें"\n\nगंभीर स्थिति में तुरंत **112** पर कॉल करें।`,
      category: null,
      source: 'knowledge_base'
    };
  }

  return {
    text: `Hello! I am your Rural First-Aid & Emergency Assistant. 🏥\n\nYou can ask me about any first-aid situation or emergency, such as:\n- "What to do for a snake bite?"\n- "First aid for severe bleeding"\n- "CPR steps for unconscious person"\n- "How to care for burns"\n\nFor critical life-threatening situations, call **112** immediately!`,
    category: null,
    source: 'knowledge_base'
  };
}

module.exports = { analyzeWithAI, analyzeWithKeywords, chatWithAI, chatFallback };

