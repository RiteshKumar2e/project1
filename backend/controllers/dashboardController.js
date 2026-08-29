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
    let sessions;

    if (SessionModel) {
      sessions = await SessionModel.find({}).lean();
    } else {
      sessions = getInMemorySessions();
    }

    // Category distribution
    const categoryCount = {};
    const severityCount = { critical: 0, urgent: 0, less_urgent: 0 };
    let totalSessions = sessions.length;
    let demoSessions = 0;

    sessions.forEach(s => {
      categoryCount[s.category] = (categoryCount[s.category] || 0) + 1;
      if (s.severity) severityCount[s.severity]++;
      if (s.isDemo) demoSessions++;
    });

    // Most common categories (top 5)
    const topCategories = Object.entries(categoryCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([category, count]) => ({ category, count }));

    // Sessions in last 24h
    const last24h = sessions.filter(s => {
      const sessionTime = new Date(s.timestamp).getTime();
      return Date.now() - sessionTime < 24 * 60 * 60 * 1000;
    }).length;

    // Sessions in last 7 days
    const last7d = sessions.filter(s => {
      const sessionTime = new Date(s.timestamp).getTime();
      return Date.now() - sessionTime < 7 * 24 * 60 * 60 * 1000;
    }).length;

    res.json({
      success: true,
      stats: {
        totalSessions,
        demoSessions,
        realSessions: totalSessions - demoSessions,
        last24Hours: last24h,
        last7Days: last7d,
        categoryDistribution: categoryCount,
        severityDistribution: severityCount,
        topCategories,
        systemStatus: {
          database: SessionModel ? 'connected' : 'in-memory',
          ai: process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here' ? 'configured' : 'fallback',
          uptime: Math.floor(process.uptime())
        }
      }
    });

  } catch (error) {
    console.error('[Dashboard Controller] Error:', error);
    res.status(500).json({ error: 'Unable to fetch dashboard stats.' });
  }
}

module.exports = { getDashboardStats };
