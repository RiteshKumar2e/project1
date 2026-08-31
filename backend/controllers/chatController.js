/**
 * Chat Controller — Conversational First-Aid Assistant
 */

const { chatWithAI } = require('../services/aiService');

async function handleChat(req, res, next) {
  try {
    const { messages, userLocation } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const response = await chatWithAI(messages, userLocation);

    return res.json({
      success: true,
      reply: response.text,
      category: response.category || null,
      source: response.source,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { handleChat };
