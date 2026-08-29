#!/usr/bin/env node
/**
 * Check every video in data/emergencyVideos.js against YouTube.
 *
 * YouTube's oembed endpoint answers 200 with the title and channel for a
 * publicly playable video, and 401/403/404 for one that has been deleted,
 * made private, or region-blocked. That makes it a cheap, dependency-free
 * liveness check.
 *
 * Reports three things:
 *   DEAD    the video no longer plays, so the app would show a broken link
 *   MOVED   the channel name no longer matches our `source` field
 *   RENAMED the video's own title changed, which can mean the content did
 *
 * Exits non-zero if anything is DEAD, so it can gate a deploy.
 *
 *   node scripts/checkVideoLinks.js
 */
const https = require('https');
const { emergencyVideos } = require('../data/emergencyVideos');

function oembed(videoUrl) {
  const url =
    'https://www.youtube.com/oembed?url=' +
    encodeURIComponent(videoUrl) +
    '&format=json';

  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 15000 }, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        return resolve({ ok: false, reason: `HTTP ${res.statusCode}` });
      }
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          resolve({ ok: true, author: data.author_name, title: data.title });
        } catch {
          resolve({ ok: false, reason: 'bad JSON' });
        }
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false, reason: 'timeout' });
    });
    req.on('error', (e) => resolve({ ok: false, reason: e.message }));
  });
}

async function main() {
  const entries = [];
  for (const [category, videos] of Object.entries(emergencyVideos)) {
    for (const video of videos) entries.push({ category, video });
  }

  console.log(`Checking ${entries.length} videos...\n`);

  const dead = [];
  const moved = [];
  const renamed = [];

  for (const { category, video } of entries) {
    const result = await oembed(video.url);

    if (!result.ok) {
      dead.push({ category, video, reason: result.reason });
      console.log(`DEAD    ${video.id}  ${category}  (${result.reason})`);
      continue;
    }

    if (result.author !== video.source) {
      moved.push({ category, video, now: result.author });
      console.log(`MOVED   ${video.id}  source "${video.source}" -> "${result.author}"`);
    }

    if (video.youtubeTitle && result.title !== video.youtubeTitle) {
      renamed.push({ category, video, now: result.title });
      console.log(`RENAMED ${video.id}  "${video.youtubeTitle}" -> "${result.title}"`);
    }

    if (result.author === video.source && result.title === video.youtubeTitle) {
      console.log(`ok      ${video.id}  ${category}`);
    }

    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(
    `\n${entries.length - dead.length}/${entries.length} playable` +
      `${moved.length ? `, ${moved.length} moved` : ''}` +
      `${renamed.length ? `, ${renamed.length} renamed` : ''}`
  );

  if (dead.length) {
    console.log('\nReplace these before shipping:');
    for (const d of dead) console.log(`  ${d.category}  ${d.video.url}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
