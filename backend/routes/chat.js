const express = require('express');
const router = express.Router();
const { handleChat } = require('../controllers/chatController');

// POST /api/chat — Conversational AI Chatbot
router.post('/', handleChat);

module.exports = router;
