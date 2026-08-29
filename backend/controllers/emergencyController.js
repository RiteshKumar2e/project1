/**
 * Emergency Controller
 * 
 * Handles: symptom analysis, category lookup, first-aid retrieval
 */

const { analyzeWithAI } = require('../services/aiService');
const { applySafetyRules, getSeverityInfo } = require('../services/safetyEngine');
const { getCategoryById, getAllCategories } = require('../data/knowledgeBase');
const { getVideosByCategory } = require('../data/emergencyVideos');

// In-memory session tracking (used when MongoDB is unavailable)
const inMemorySessions = [];

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
 * POST /api/emergency/analyze
 * Analyze user's emergency description
 */
async function analyzeEmergency(req, res) {
  try {
    const { description, isDemo } = req.body;

    if (!description || typeof description !== 'string') {
      return res.status(400).json({
        error: 'Please describe the emergency situation.',
        errorHi: 'कृपया आपातकालीन स्थिति का वर्णन करें।'
      });
    }

    // Sanitize input
    const sanitizedInput = description.trim().substring(0, 1000);

    if (sanitizedInput.length < 3) {
      return res.status(400).json({
        error: 'Please provide more details about the emergency.',
        errorHi: 'कृपया आपातकाल के बारे में अधिक विवरण प्रदान करें।'
      });
    }

    // Step 1: AI Analysis (or keyword fallback)
    const aiResult = await analyzeWithAI(sanitizedInput);

    // Step 2: Apply safety rules (deterministic override)
    const safeResult = applySafetyRules(aiResult, sanitizedInput);

    // Step 3: Get curated first-aid data from knowledge base
    const category = getCategoryById(safeResult.emergency_category);
    if (!category) {
      return res.status(500).json({ error: 'Unable to process emergency category.' });
    }

    // Step 4: Get severity details
    const severityInfo = getSeverityInfo(safeResult.severity);

    // Step 5: Get related videos
    const videos = getVideosByCategory(category.videoCategory);

    // Step 6: Track session (anonymous)
    try {
      const SessionModel = await getSessionModel();
      if (SessionModel) {
        await SessionModel.create({
          category: category.id,
          severity: safeResult.severity,
          source: safeResult.source,
          isDemo: isDemo || false
        });
      } else {
        inMemorySessions.push({
          category: category.id,
          severity: safeResult.severity,
          source: safeResult.source,
          isDemo: isDemo || false,
          timestamp: new Date()
        });
      }
    } catch (dbError) {
      console.error('[DB] Session tracking error:', dbError.message);
    }

    // Step 7: Return structured response
    res.json({
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
        severity: severityInfo,
        immediateAction: safeResult.immediateAction || safeResult.immediate_action_required,
        emergencyCallPrompt: safeResult.emergencyCallPrompt || false
      },
      firstAid: {
        steps: category.firstAidSteps,
        warnings: category.warnings,
        warningsHi: category.warningsHi,
        doNots: category.doNots
      },
      videos,
      safety: {
        disclaimer: safeResult.disclaimer,
        disclaimerHi: safeResult.disclaimerHi,
        seekProfessionalHelp: safeResult.seekProfessionalHelp,
        safetyOverride: safeResult.safetyOverride || false
      },
      mentalHealthCrisis: safeResult.mentalHealthCrisis ? safeResult.mentalHealthResources : null,
      meta: {
        source: safeResult.source,
        confidence: safeResult.confidence
      }
    });

  } catch (error) {
    console.error('[Emergency Controller] Error:', error);
    res.status(500).json({
      error: 'An error occurred. If this is an emergency, please call 112 immediately.',
      errorHi: 'एक त्रुटि हुई। यदि यह आपातकाल है, तो कृपया तुरंत 112 पर कॉल करें।',
      emergencyNumber: '112'
    });
  }
}

/**
 * GET /api/emergency/categories
 * Get all emergency categories
 */
function getCategories(req, res) {
  const categories = getAllCategories().map(cat => ({
    id: cat.id,
    name: cat.name,
    nameHi: cat.nameHi,
    icon: cat.icon,
    description: cat.description,
    descriptionHi: cat.descriptionHi,
    severity: cat.severity
  }));
  res.json({ success: true, categories });
}

/**
 * GET /api/emergency/category/:id
 * Get specific category with full first-aid guide
 */
function getCategoryDetails(req, res) {
  const { id } = req.params;
  const category = getCategoryById(id);

  if (!category) {
    return res.status(404).json({
      error: 'Emergency category not found.',
      errorHi: 'आपातकालीन श्रेणी नहीं मिली।'
    });
  }

  const videos = getVideosByCategory(category.videoCategory);
  const severityInfo = getSeverityInfo(category.severity);

  res.json({
    success: true,
    category: {
      ...category,
      severityInfo,
      videos
    }
  });
}

/**
 * Get in-memory sessions for dashboard (when MongoDB unavailable)
 */
function getInMemorySessions() {
  return inMemorySessions;
}

module.exports = { analyzeEmergency, getCategories, getCategoryDetails, getInMemorySessions };
