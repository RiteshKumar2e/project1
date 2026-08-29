/**
 * Chat Service
 * Handles conversational queries to /api/chat with client-side fallback when offline or server unreachable.
 */

import { getOfflineCategory } from '../data/offlineFirstAid';

const API_BASE = '/api';

export async function sendChatMessage(messages, userLocation = null) {
  if (!navigator.onLine) {
    return getOfflineChatResponse(messages);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, userLocation }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    return {
      reply: data.reply,
      category: data.category,
      source: data.source || 'online_api'
    };
  } catch (err) {
    console.warn('[Chat Service] Falling back to client-side logic:', err.message);
    return getOfflineChatResponse(messages);
  }
}

/**
 * Offline client-side chat response builder
 */
function getOfflineChatResponse(messages) {
  const lastUserMsg = messages[messages.length - 1]?.text || '';
  const lower = lastUserMsg.toLowerCase();

  let categoryId = null;
  if (lower.includes('snake') || lower.includes('bite') || lower.includes('scorpion') || lower.includes('saap')) categoryId = 'snake_bite';
  else if (lower.includes('chest') || lower.includes('heart') || lower.includes('seene')) categoryId = 'chest_pain';
  else if (lower.includes('breath') || lower.includes('saans') || lower.includes('suffocat')) categoryId = 'breathing_difficulty';
  else if (lower.includes('bleed') || lower.includes('khoon') || lower.includes('blood')) categoryId = 'severe_bleeding';
  else if (lower.includes('burn') || lower.includes('jal') || lower.includes('fire')) categoryId = 'burns';
  else if (lower.includes('fractur') || lower.includes('haddi') || lower.includes('bone') || lower.includes('sprain')) categoryId = 'fracture';
  else if (lower.includes('unconscious') || lower.includes('behos') || lower.includes('faint')) categoryId = 'unconsciousness';
  else if (lower.includes('seizure') || lower.includes('daura') || lower.includes('mirgi')) categoryId = 'seizure';
  else if (lower.includes('poison') || lower.includes('zahar') || lower.includes('toxic')) categoryId = 'poisoning';
  else if (lower.includes('stroke') || lower.includes('paraly')) categoryId = 'stroke';
  else if (lower.includes('allerg')) categoryId = 'allergic_reaction';
  else if (lower.includes('chok') || lower.includes('gala')) categoryId = 'choking';
  else if (lower.includes('fever') || lower.includes('bukhar') || lower.includes('temp')) categoryId = 'high_fever';

  const isHindi = /[\u0900-\u097F]/.test(lastUserMsg) || /kya|kaise|kaha|madad|batao|karo|bhi/i.test(lastUserMsg);

  if (categoryId) {
    const cat = getOfflineCategory(categoryId);
    const steps = cat.firstAidSteps
      .map(s => `• Step ${s.step}: ${s.instruction}\n  (${s.instructionHi})`)
      .join('\n\n');

    const reply = `🚑 **${cat.name} / ${cat.nameHi}**\n\n` +
      `**Immediate First Aid Steps:**\n${steps}\n\n` +
      `⚠️ **Warning:** ${cat.warnings[0]}\n\n` +
      `📞 Emergency Call **112** immediately if situation deteriorates!`;

    return {
      reply,
      category: categoryId,
      source: 'offline_knowledge_base'
    };
  }

  if (isHindi) {
    return {
      reply: `आपातकालीन सहायता में आपका स्वागत है! 🏥\n\nआप निम्न के बारे में प्रश्न पूछ सकते हैं:\n1. सांप या कीड़े के काटने पर क्या करें?\n2. सीने में दर्द या हृदय रोग प्राथमिक चिकित्सा\n3. गहरा घाव और खून बहना रोकना\n4. जलने पर प्राथमिक उपचार\n\nगंभीर स्थिति में तुरंत **112** पर कॉल करें!`,
      category: null,
      source: 'offline_default'
    };
  }

  return {
    reply: `Hello! I am your First-Aid & Emergency Assistant AI. 🏥\n\nYou can ask me questions like:\n- "How to stop heavy bleeding?"\n- "What to do for snake bite?"\n- "First aid for burns"\n- "CPR instructions"\n\nIn critical situations, please dial **112** for emergency help immediately!`,
    category: null,
    source: 'offline_default'
  };
}
