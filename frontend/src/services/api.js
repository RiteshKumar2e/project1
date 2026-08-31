/**
 * API Service
 * Handles communication with backend, timeouts, retries, and offline fallback.
 */

import { getOfflineCategory } from '../data/offlineFirstAid';
import { getVideosForCategory } from '../data/emergencyVideos';

const API_BASE = '/api';

export async function analyzeSymptoms(description, isDemo = false) {
  // If offline, provide offline keyword matching directly
  if (!navigator.onLine) {
    return getOfflineAnalysis(description);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    const response = await fetch(`${API_BASE}/emergency/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, isDemo }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.warn('[API Service] Falling back to local offline analysis:', err.message);
    return getOfflineAnalysis(description);
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE}/emergency/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return await res.json();
  } catch {
    return {
      success: true,
      categories: Object.values(await import('../data/offlineFirstAid').then(m => m.offlineFirstAidData))
    };
  }
}

export async function fetchCategoryDetails(id) {
  try {
    const res = await fetch(`${API_BASE}/emergency/category/${id}`);
    if (!res.ok) throw new Error('Failed to fetch category details');
    return await res.json();
  } catch {
    const cat = getOfflineCategory(id);
    return {
      success: true,
      category: {
        ...cat,
        severityInfo: {
          level: cat.severity,
          label: cat.severity.toUpperCase(),
          color: cat.severity === 'critical' ? 'red' : 'orange'
        },
        videos: getVideosForCategory(id)
      }
    };
  }
}

export async function fetchNearbyFacilities(lat, lng, radius = 15000) {
  /*
    Overpass is free and heavily loaded; a real query against it takes
    20-40 seconds. The old 12s abort meant this never once succeeded.
  */
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  try {
    const res = await fetch(
      `${API_BASE}/facilities/nearby?lat=${lat}&lng=${lng}&radius=${radius}`,
      { signal: controller.signal }
    );

    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      const err = new Error(body.error || `Server returned ${res.status}`);
      err.code = body.code || 'SERVER_ERROR';
      throw err;
    }

    return body;
  } catch (err) {
    if (err.name === 'AbortError') {
      const timeout = new Error('The map service did not respond in time.');
      timeout.code = 'TIMEOUT';
      throw timeout;
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchDashboardStats() {
  try {
    const res = await fetch(`${API_BASE}/dashboard/stats`);
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    return await res.json();
  } catch (err) {
    /*
      No invented numbers here. This screen reports how much the service is
      actually being used; filling it with plausible-looking figures when the
      server is down makes it worse than useless.
    */
    console.warn('[API Service] Dashboard stats unavailable:', err.message);
    return { success: false, error: 'unavailable' };
  }
}

/**
 * Client-side keyword categorization for total offline resilience
 */
function getOfflineAnalysis(text) {
  const lower = (text || '').toLowerCase();
  let categoryId = 'other_emergency';

  if (lower.includes('chest') || lower.includes('heart') || lower.includes('angina')) categoryId = 'chest_pain';
  else if (lower.includes('breath') || lower.includes('suffocat') || lower.includes('asthma') || lower.includes('gasp')) categoryId = 'breathing_difficulty';
  else if (lower.includes('bleed') || lower.includes('blood') || lower.includes('cut') || lower.includes('wound')) categoryId = 'severe_bleeding';
  else if (lower.includes('burn') || lower.includes('fire') || lower.includes('scald')) categoryId = 'burns';
  else if (lower.includes('fractur') || lower.includes('bone') || lower.includes('sprain') || lower.includes('fall')) categoryId = 'fracture';
  else if (lower.includes('unconscious') || lower.includes('faint') || lower.includes('collapsed') || lower.includes('passed out')) categoryId = 'unconsciousness';
  else if (lower.includes('seizure') || lower.includes('convuls') || lower.includes('epilep') || lower.includes('shaking')) categoryId = 'seizure';
  else if (lower.includes('poison') || lower.includes('swallow') || lower.includes('overdose') || lower.includes('toxic') || lower.includes('pesticide')) categoryId = 'poisoning';
  else if (lower.includes('stroke') || lower.includes('slur') || lower.includes('paraly') || lower.includes('droop')) categoryId = 'stroke';
  else if (lower.includes('allerg') || lower.includes('anaph') || lower.includes('hive') || lower.includes('swell')) categoryId = 'allergic_reaction';
  else if (lower.includes('chok') || lower.includes('throat') || lower.includes('stuck')) categoryId = 'choking';
  else if (lower.includes('fever') || lower.includes('temperature') || lower.includes('hot') || lower.includes('chill')) categoryId = 'high_fever';
  else if (lower.includes('snake') || lower.includes('bite') || lower.includes('insect') || lower.includes('sting') || lower.includes('scorpion')) categoryId = 'snake_bite';

  const category = getOfflineCategory(categoryId);
  const isCritical = category.severity === 'critical';

  return {
    success: true,
    assessment: {
      category: {
        id: category.id,
        name: category.name,
        nameHi: category.nameHi,
        icon: category.icon,
        description: category.description,
        descriptionHi: category.descriptionHi
      },
      severity: {
        level: category.severity,
        label: isCritical ? 'Critical' : 'Urgent',
        labelHi: isCritical ? 'गंभीर' : 'अत्यावश्यक',
        color: isCritical ? 'red' : 'orange',
        icon: isCritical ? '🔴' : '🟠',
        message: isCritical ? 'Immediate professional emergency help required.' : 'Medical attention required as soon as possible.',
        messageHi: isCritical ? 'तत्काल पेशेवर आपातकालीन सहायता आवश्यक।' : 'जल्द से जल्द चिकित्सा ध्यान आवश्यक।',
        callEmergency: isCritical
      },
      immediateAction: category.immediateAction,
      emergencyCallPrompt: isCritical
    },
    firstAid: {
      steps: category.firstAidSteps,
      warnings: category.warnings,
      warningsHi: category.warningsHi,
      doNots: category.doNots
    },
    videos: getVideosForCategory(categoryId),
    safety: {
      disclaimer: 'This information is for emergency first-aid support only. It does not replace a doctor or emergency medical service.',
      disclaimerHi: 'यह जानकारी केवल आपातकालीन प्राथमिक चिकित्सा सहायता के लिए है। यह डॉक्टर या आपातकालीन चिकित्सा सेवा का विकल्प नहीं है।',
      seekProfessionalHelp: true,
      safetyOverride: false
    },
    meta: {
      source: 'offline_client_engine',
      confidence: 0.6
    }
  };
}
