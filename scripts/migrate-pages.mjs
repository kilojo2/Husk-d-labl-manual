/**
 * Migration script: reads all existing page.tsx files,
 * extracts ContentBlock[] arrays, and saves them to the DB via API.
 *
 * Usage:
 *   cd scripts && node migrate-pages.mjs
 *
 * Requires the Vite dev server or production server to be running
 * (the API at localhost:5173 or the Railway URL).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const APP_DIR = path.resolve(__dirname, '..', 'app');

// ── Config ─────────────────────────────────────────────────────
const API_BASE = process.env.API_BASE || 'http://localhost:5173';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || ''; // Set this before running

// ── Skip these directories ─────────────────────────────────────
const SKIP_DIRS = [
  'admin', 'api', 'db', 'favicon.ico', 'globals.css',
  'layout.tsx', 'page.tsx', 'components', 'data', 'lib'
];

// ── Collect all page.tsx files ─────────────────────────────────
function findPageFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !SKIP_DIRS.includes(entry.name) && !entry.name.startsWith('.') && !entry.name.startsWith('[')) {
      results.push(...findPageFiles(fullPath));
    } else if (entry.isFile() && entry.name === 'page.tsx') {
      results.push(fullPath);
    }
  }
  return results;
}

// ── Extract slug from path ─────────────────────────────────────
function slugFromPath(filePath) {
  const relative = path.relative(APP_DIR, filePath);
  let slug = path.dirname(relative);
  slug = slug.replace(/\\/g, '/');
  if (slug === '.' || slug === '') return '/';
  return slug;
}

// ── Parse ContentBlock[] from file ─────────────────────────────
function extractContentBlocks(content) {
  const blocks = [];

  // Find all const xxx: ContentBlock[] = [...] or const xxx = [...]
  const arrayRegex = /const\s+(\w+)\s*:\s*(?:ContentBlock\[\]\s*=\s*|)=\s*(\[[\s\S]*?\]);/g;
  let match;
  while ((match = arrayRegex.exec(content)) !== null) {
    const rawArray = match[2];
    try {
      // Clean up the array text to be parseable JSON
      let cleaned = rawArray
        .replace(/,\s*\]/g, ']') // trailing comma
        .replace(/\{\s*type:\s*"([^"]+)"/g, '{"type":"$1"') // quote type values
        .replace(/,\s*text:\s*"([^"]*)"/g, ',"text":"$1"') // text field
        .replace(/,\s*items:\s*\[/g, ',"items":[') // items
        .replace(/,\s*emoji:\s*"([^"]*)"/g, ',"emoji":"$1"') // emoji field
        .replace(/,\s*headers:\s*\[/g, ',"headers":[') // headers
        .replace(/,\s*rows:\s*\[/g, ',"rows":[') // rows
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      // Simple approach: use Function to evaluate the array literal
      // This is safe because we're reading our own source files
      try {
        const parsed = new Function('return ' + rawArray)();
        if (Array.isArray(parsed)) {
          blocks.push(...parsed);
        }
      } catch (parseErr) {
        console.warn(`  ⚠ Could not parse array in ${match[1]}: ${parseErr.message}`);
      }
    } catch (err) {
      console.warn(`  ⚠ Error processing array ${match[1]}: ${err.message}`);
    }
  }

  return blocks;
}

// ── Extract title and description from ArticlePage ─────────────
function extractMeta(content) {
  const titleMatch = content.match(/title="([^"]*)"/);
  const descMatch = content.match(/description="([^"]*)"/);
  return {
    title: titleMatch ? titleMatch[1] : '',
    description: descMatch ? descMatch[1] : '',
  };
}

// ── Login to admin ─────────────────────────────────────────────
async function login() {
  if (!ADMIN_TOKEN) {
    console.error('❌ ADMIN_TOKEN environment variable is required. Set it before running.');
    console.error('   Example: ADMIN_TOKEN=your-token node migrate-pages.mjs');
    process.exit(1);
  }

  const res = await fetch(`${API_BASE}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: ADMIN_TOKEN }),
  });

  if (!res.ok) {
    throw new Error(`Login failed: ${res.status}`);
  }

  // Get session cookie
  const setCookie = res.headers.get('set-cookie');
  return setCookie || '';
}

// ── Save page to API ───────────────────────────────────────────
async function savePage(slug, title, description, blocks) {
  const res = await fetch(`${API_BASE}/api/admin/pages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      slug,
      title,
      description,
      blocks,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
}

// ── Main ───────────────────────────────────────────────────────
async function main() {
  console.log('🔍 Scanning for page.tsx files in', APP_DIR);
  const files = findPageFiles(APP_DIR);
  console.log(`📄 Found ${files.length} page files\n`);

  // Login first
  console.log('🔑 Logging in...');
  let cookie = '';
  try {
    cookie = await login();
    console.log('✅ Logged in\n');
  } catch (err) {
    console.error('❌ Login failed. Make sure ADMIN_TOKEN is correct and the server is running.');
    console.error('   Server URL:', API_BASE);
    process.exit(1);
  }

  // Set cookie globally for fetch
  global.cookie = cookie;

  let saved = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of files) {
    const slug = slugFromPath(file);
    const content = fs.readFileSync(file, 'utf-8');

    const blocks = extractContentBlocks(content);
    const meta = extractMeta(content);

    if (blocks.length === 0) {
      console.log(`⏭  ${slug} — no ContentBlock arrays found, skipping`);
      skipped++;
      continue;
    }

    try {
      const res = await fetch(`${API_BASE}/api/admin/pages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Cookie': cookie },
        body: JSON.stringify({
          slug,
          title: meta.title || slug,
          description: meta.description || '',
          blocks,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.log(`❌ ${slug} — ${err.error || res.status}`);
        errors++;
      } else {
        console.log(`✅ ${slug} — ${blocks.length} blocks`);
        saved++;
      }
    } catch (err) {
      console.log(`❌ ${slug} — ${err.message}`);
      errors++;
    }
  }

  console.log(`\n🎉 Done! Saved: ${saved}, Skipped: ${skipped}, Errors: ${errors}`);
}

main().catch(console.error);