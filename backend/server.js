/**
 * Rural Emergency Assistance Platform — Backend Server
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const emergencyRoutes = require('./routes/emergency');
const facilityRoutes = require('./routes/facilities');
const dashboardRoutes = require('./routes/dashboard');
const chatRoutes = require('./routes/chat');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ──────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(compression());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json({ limit: '10kb' }));
app.use(rateLimiter(60, 60000)); // 60 requests per minute

// ─── Routes ─────────────────────────────────────────────
app.use('/api/emergency', emergencyRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/chat', chatRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Rural Emergency Assistance API',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime())
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

// Error handler
app.use(errorHandler);

// ─── Database Connection ─────────────────────────────────
const { initDB, dbStoragePath } = require('./models/db');

// ─── Start Server ───────────────────────────────────────
async function start() {
  await initDB();

  app.listen(PORT, () => {
    console.log('╔══════════════════════════════════════════════╗');
    console.log('║  🚑 Rural Emergency Assistance Platform     ║');
    console.log('║  Backend API Server                          ║');
    console.log(`║  Running on: http://localhost:${PORT}            ║`);
    console.log('╚══════════════════════════════════════════════╝');
    console.log('');
    console.log(`  AI Service: ${process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here' ? '✅ Gemini API configured' : '⚠️  Using keyword fallback (set GEMINI_API_KEY)'}`);
    console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('');
  });
}

start();
