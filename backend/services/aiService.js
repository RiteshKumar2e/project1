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

module.exports = { analyzeWithAI, analyzeWithKeywords };
