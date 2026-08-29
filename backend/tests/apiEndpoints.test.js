/**
 * Integration Test for Backend Controller Endpoints
 * Runs in-process controller tests without requiring an active network server
 */

const test = require('node:test');
const assert = require('node:assert/strict');

const { analyzeEmergency, getCategories, getCategoryDetails } = require('../controllers/emergencyController');
const { getDashboardStats } = require('../controllers/dashboardController');

function createMockReqRes(body = {}, query = {}, params = {}) {
  const req = { body, query, params, ip: '127.0.0.1' };
  const res = {
    statusCode: 200,
    data: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(data) {
      this.data = data;
      return this;
    }
  };
  return { req, res };
}

test('API Controller — POST /api/emergency/analyze (Critical Chest Pain)', async () => {
  const { req, res } = createMockReqRes({ description: 'Severe chest pain and cannot breathe', isDemo: true });
  await analyzeEmergency(req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.data.success, true);
  assert.equal(res.data.assessment.category.id, 'chest_pain');
  assert.equal(res.data.assessment.severity.level, 'critical');
  assert.ok(res.data.firstAid.steps.length > 0);
  assert.ok(res.data.safety.disclaimer);
});

test('API Controller — POST /api/emergency/analyze (Input Validation / Edge Case: Empty Input)', async () => {
  const { req, res } = createMockReqRes({ description: '' });
  await analyzeEmergency(req, res);

  assert.equal(res.statusCode, 400);
  assert.ok(res.data.error);
});

test('API Controller — POST /api/emergency/analyze (Edge Case: Unknown/Nonsense Text)', async () => {
  const { req, res } = createMockReqRes({ description: 'asdfqwerty unknown distress' });
  await analyzeEmergency(req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.data.success, true);
  assert.equal(res.data.assessment.category.id, 'other_emergency');
  assert.ok(res.data.firstAid.steps.length > 0);
});

test('API Controller — GET /api/emergency/categories', () => {
  const { req, res } = createMockReqRes();
  getCategories(req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.data.success, true);
  assert.equal(res.data.categories.length, 14);
});

test('API Controller — GET /api/emergency/category/:id (Valid Category)', () => {
  const { req, res } = createMockReqRes({}, {}, { id: 'snake_bite' });
  getCategoryDetails(req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.data.success, true);
  assert.equal(res.data.category.id, 'snake_bite');
  assert.equal(res.data.category.severity, 'critical');
  assert.ok(res.data.category.videos.length > 0);
});

test('API Controller — GET /api/dashboard/stats', async () => {
  const { req, res } = createMockReqRes();
  await getDashboardStats(req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.data.success, true);
  assert.ok(typeof res.data.stats.totalSessions === 'number');
  assert.ok(res.data.stats.systemStatus);
});
