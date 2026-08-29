const express = require('express');
const router = express.Router();
const { analyzeEmergency, getCategories, getCategoryDetails } = require('../controllers/emergencyController');

// POST /api/emergency/analyze — AI symptom analysis
router.post('/analyze', analyzeEmergency);

// GET /api/emergency/categories — All emergency categories
router.get('/categories', getCategories);

// GET /api/emergency/category/:id — Specific category details
router.get('/category/:id', getCategoryDetails);

module.exports = router;
