/**
 * Dashboard Controller
 * Aggregated statistics — no private patient data exposed
 */

const { getInMemorySessions } = require('./emergencyController');

async function getSessionModel() {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState === 1) {
      return require('../models/EmergencySession');
    }
  } catch (e) { /* MongoDB not available */ }
  return null;
}

/**
 * GET /api/dashboard/stats
 */
async function getDashboardStats(req, res) {
  try {
    const SessionModel = await getSessionModel();
    let rawSessions = [];

    if (SessionModel) {
      try {
        rawSessions = await SessionModel.find({}).lean();
      } catch (e) {
        console.warn('[Dashboard Controller] DB query failed, using memory:', e.message);
        rawSessions = typeof getInMemorySessions === 'function' ? getInMemorySessions() : [];
      }
    } else {
      rawSessions = typeof getInMemorySessions === 'function' ? getInMemorySessions() : [];
    }

    const sessions = Array.isArray(rawSessions) ? rawSessions : [];

    // Category & Severity distribution
    const categoryCount = {};
    const severityCount = { critical: 0, urgent: 0, less_urgent: 0 };
    let totalSessions = sessions.length;
    let demoSessions = 0;

    sessions.forEach(s => {
      if (!s) return;
      
      const catKey = s.category || 'other_emergency';
      categoryCount[catKey] = (categoryCount[catKey] || 0) + 1;

      if (s.severity && severityCount.hasOwnProperty(s.severity)) {
        severityCount[s.severity] = (severityCount[s.severity] || 0) + 1;
      } else if (s.severity) {
        severityCount.urgent = (severityCount.urgent || 0) + 1;
      }

      if (s.isDemo) demoSessions++;
    });

    // Top categories
    const topCategories = Object.entries(categoryCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([category, count]) => ({ category, count }));

    // Time calculations
    const now = Date.now();
    const last24h = sessions.filter(s => {
      const ts = s && s.timestamp ? new Date(s.timestamp).getTime() : now;
      return !isNaN(ts) && now - ts < 24 * 60 * 60 * 1000;
    }).length;

    const last7d = sessions.filter(s => {
      const ts = s && s.timestamp ? new Date(s.timestamp).getTime() : now;
      return !isNaN(ts) && now - ts < 7 * 24 * 60 * 60 * 1000;
    }).length;

    return res.json({
      success: true,
      stats: {
        totalSessions,
        demoSessions,
        realSessions: Math.max(0, totalSessions - demoSessions),
        last24Hours: last24h,
        last7Days: last7d,
        categoryDistribution: categoryCount,
        severityDistribution: severityCount,
        topCategories,
        systemStatus: {
          database: SessionModel ? 'connected' : 'in-memory',
          ai: (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') ? 'configured' : 'fallback',
          uptime: Math.floor(process.uptime())
        }
      }
    });

  } catch (error) {
    console.error('[Dashboard Controller] Error:', error);
    return res.status(200).json({
      success: true,
      stats: {
        totalSessions: 0,
        demoSessions: 0,
        realSessions: 0,
        last24Hours: 0,
        last7Days: 0,
        categoryDistribution: {},
        severityDistribution: { critical: 0, urgent: 0, less_urgent: 0 },
        topCategories: [],
        systemStatus: {
          database: 'in-memory',
          ai: 'fallback',
          uptime: Math.floor(process.uptime())
        }
      }
    });
  }
}

module.exports = { getDashboardStats };
