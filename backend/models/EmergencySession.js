const mongoose = require('mongoose');

const emergencySessionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    index: true
  },
  severity: {
    type: String,
    enum: ['critical', 'urgent', 'less_urgent'],
    required: true
  },
  source: {
    type: String,
    enum: ['ai', 'keyword_fallback', 'demo'],
    default: 'ai'
  },
  isDemo: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
  // NOTE: We intentionally do NOT store symptom descriptions or user data
  // to protect patient privacy. Only anonymous category/severity data.
});

// TTL index — auto-delete sessions older than 90 days
emergencySessionSchema.index({ timestamp: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

module.exports = mongoose.models.EmergencySession || mongoose.model('EmergencySession', emergencySessionSchema);
