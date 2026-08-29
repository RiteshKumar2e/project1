/**
 * Automated Test Suite for Safety Rules Engine & Keyword Categorization
 * Uses Node.js built-in test runner (no external test runner dependencies needed)
 */

const test = require('node:test');
const assert = require('node:assert/strict');

const { applySafetyRules, validateNoDiagnosis, getSeverityInfo } = require('../services/safetyEngine');
const { searchByKeywords, getCategoryById, getAllCategories } = require('../data/knowledgeBase');

test('Safety Engine — Life-threatening keyword escalation', () => {
  const aiMockOutput = {
    emergency_category: 'chest_pain',
    severity: 'less_urgent', // Incorrectly marked as less urgent by mock AI
    immediateAction: false
  };

  const criticalInput = 'My father is having severe chest pain and stopped breathing';
  const safeOutput = applySafetyRules(aiMockOutput, criticalInput);

  assert.equal(safeOutput.severity, 'critical', 'Critical keywords must escalate severity to critical');
  assert.equal(safeOutput.immediateAction, true, 'Critical situations must require immediate action');
  assert.equal(safeOutput.emergencyCallPrompt, true, 'Critical situations must display emergency call prompt');
});

test('Safety Engine — Mental health crisis detection and resource provisioning', () => {
  const aiMockOutput = {
    emergency_category: 'other_emergency',
    severity: 'urgent'
  };

  const suicideInput = 'I am thinking about self harm and want to die';
  const safeOutput = applySafetyRules(aiMockOutput, suicideInput);

  assert.equal(safeOutput.mentalHealthCrisis, true);
  assert.equal(safeOutput.severity, 'critical');
  assert.ok(safeOutput.mentalHealthResources);
  assert.ok(safeOutput.mentalHealthResources.numbers.length > 0);
});

test('Safety Engine — Diagnosis prevention validation', () => {
  assert.equal(validateNoDiagnosis('These symptoms may indicate a cardiac issue.'), true);
  assert.equal(validateNoDiagnosis('You definitely have a heart attack.'), false);
  assert.equal(validateNoDiagnosis('I diagnose you with acute appendicitis.'), false);
});

test('Safety Engine — Mandatory disclaimer inclusion', () => {
  const result = applySafetyRules({ emergency_category: 'burns', severity: 'urgent' }, 'Burn on finger');
  assert.ok(result.disclaimer, 'Safety disclaimer in English must be present');
  assert.ok(result.disclaimerHi, 'Safety disclaimer in Hindi must be present');
});

test('Knowledge Base — All 14 emergency categories present and structured', () => {
  const categories = getAllCategories();
  assert.equal(categories.length, 14, 'Knowledge base must have exactly 14 emergency categories');

  for (const cat of categories) {
    assert.ok(cat.id, 'Category must have an ID');
    assert.ok(cat.name, 'Category must have English name');
    assert.ok(cat.nameHi, 'Category must have Hindi name');
    assert.ok(cat.firstAidSteps.length > 0, `Category ${cat.id} must have first aid steps`);
    assert.ok(cat.warnings.length > 0, `Category ${cat.id} must have warnings`);
  }
});

test('Knowledge Base — Keyword search accuracy', () => {
  const test1 = searchByKeywords('heavy bleeding from deep cut');
  assert.equal(test1.id, 'severe_bleeding');

  const test2 = searchByKeywords('person is unconscious and not waking up');
  assert.equal(test2.id, 'unconsciousness');

  const test3 = searchByKeywords('snake bite on leg in the field');
  assert.equal(test3.id, 'snake_bite');

  const test4 = searchByKeywords('person is choking on food cannot breathe');
  assert.equal(test4.id, 'choking');
});
