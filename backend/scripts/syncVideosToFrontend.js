#!/usr/bin/env node
/**
 * Generate frontend/src/data/emergencyVideos.js from the backend catalogue.
 *
 * Why the frontend needs its own copy: the video list used to exist only on
 * the server, so any time the API was slow, restarting, or unreachable the
 * client fell back to local first-aid data and quietly rendered `videos: []`.
 * The steps survived offline but the videos vanished.
 *
 * The backend file stays the single source of truth. This script derives the
 * client copy, including the category-id mapping read straight out of the
 * knowledge base, so the two can never drift by hand.
 *
 *   node scripts/syncVideosToFrontend.js
 */
const fs = require('fs');
const path = require('path');

const { emergencyVideos } = require('../data/emergencyVideos');
const knowledgeBase = require('../data/knowledgeBase');

const OUT = path.join(
  __dirname, '..', '..', 'frontend', 'src', 'data', 'emergencyVideos.js'
);

function categoryList() {
  const raw = knowledgeBase.emergencyCategories || knowledgeBase.categories || {};
  return Array.isArray(raw) ? raw : Object.values(raw);
}

function buildMap() {
  const map = {};
  for (const category of categoryList()) {
    if (category.id && category.videoCategory) {
      map[category.id] = category.videoCategory;
    }
  }
  return map;
}

function main() {
  const map = buildMap();
  const count = Object.values(emergencyVideos).flat().length;

  const banner = `/**
 * Emergency instructional videos — Hindi and Hinglish, Indian sources.
 *
 * GENERATED FILE — do not edit by hand.
 * Source: backend/data/emergencyVideos.js
 * Regenerate: cd backend && node scripts/syncVideosToFrontend.js
 *
 * Bundled into the client so the video list survives the API being slow,
 * restarting or unreachable. The links themselves still need a connection
 * to play, but the list renders either way.
 */
`;

  const body = [
    banner,
    `export const emergencyVideos = ${JSON.stringify(emergencyVideos, null, 2)};`,
    '',
    '/* Emergency category id -> video category key, mirrored from the knowledge base. */',
    `const CATEGORY_VIDEO_MAP = ${JSON.stringify(map, null, 2)};`,
    '',
    '/**',
    ' * Videos for a first-aid category id (for example "chest_pain").',
    ' * Falls back to the general set so a page never renders an empty section.',
    ' */',
    'export function getVideosForCategory(categoryId) {',
    '  const key = CATEGORY_VIDEO_MAP[categoryId];',
    '  return emergencyVideos[key] || emergencyVideos.general_emergency || [];',
    '}',
    ''
  ].join('\n');

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, body, 'utf8');

  console.log(`Wrote ${path.relative(path.join(__dirname, '..', '..'), OUT)}`);
  console.log(`  ${count} videos, ${Object.keys(emergencyVideos).length} video categories`);
  console.log(`  ${Object.keys(map).length} category ids mapped`);

  const unmapped = categoryList()
    .filter((c) => c.id && !map[c.id])
    .map((c) => c.id);
  if (unmapped.length) {
    console.warn(`  WARNING: no videoCategory for: ${unmapped.join(', ')}`);
  }
}

main();
