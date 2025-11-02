#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const WRITE_BASELINE = args.includes('--write-baseline');

const BASELINE_FILE = path.join(__dirname, 'hero-freeze.hashes.json');

// Candidate manifest locations (support both historical layouts)
const MANIFEST_CANDIDATES = [
  path.join(repoRoot, 'public', 'assets', 'champagne', 'manifest.json'),
  path.join(repoRoot, 'public', 'brand', 'manifest.json'),
];

// Fallback assets if manifest is missing (we'll only include those that exist)
const FALLBACK_ASSETS = [
  'public/assets/champagne/motion/gold-dust.webm',
  'public/assets/champagne/waves/wave-bg.webp',
  'public/assets/champagne/waves/wave-mask.svg',
  'public/brand/textures/film-grain-2560x1440.webp',
  'public/brand/textures/glass-soft.webp',
  'public/brand/particles/particles-soft.webm',
];

// Read JSON helper
function readJSON(fp) {
  try {
    const raw = fs.readFileSync(fp, 'utf8');
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

// Find a manifest (first that exists)
function findManifest() {
  for (const fp of MANIFEST_CANDIDATES) {
    if (fs.existsSync(fp)) return fp;
  }
  return null;
}

// From manifest, gather asset paths we want to freeze
function gatherAssetsFromManifest(json) {
  // Manus packs typically use keys like: textures, waves, motion/particles, hero, etc.
  // We'll walk known buckets, then de-dup.
  const buckets = [];
  const pushMaybe = v => { if (typeof v === 'string') buckets.push(v); };

  // Try common shapes
  const maybeArrays = [
    json?.textures,
    json?.waves,
    json?.particles,
    json?.motion,
    json?.assets,
    json?.hero?.assets,
  ].filter(Boolean);

  for (const arr of maybeArrays) {
    if (Array.isArray(arr)) {
      arr.forEach(pushMaybe);
    } else if (typeof arr === 'object') {
      Object.values(arr).forEach(pushMaybe);
    }
  }

  // Also scan for wave mask/bg if present in nested objects
  if (json?.waves?.mask) pushMaybe(json.waves.mask);
  if (json?.waves?.background) pushMaybe(json.waves.background);

  // Normalise: ensure leading without extra slashes, then re-join from repo root
  const unique = Array.from(new Set(buckets))
    .map(p => p.replace(/^\/+/, ''))
    .map(p => path.join(repoRoot, p));

  return unique;
}

function sha256File(fp) {
  const hash = crypto.createHash('sha256');
  const data = fs.readFileSync(fp);
  hash.update(data);
  return hash.digest('hex');
}

function existingOnly(paths) {
  return paths.filter(p => fs.existsSync(p));
}

function writeBaseline(map) {
  fs.writeFileSync(
    BASELINE_FILE,
    JSON.stringify({ version: 1, createdAt: new Date().toISOString(), files: map }, null, 2) + '\n',
    'utf8'
  );
}

function loadBaseline() {
  const json = readJSON(BASELINE_FILE);
  if (!json || !json.files) return null;
  return json.files;
}

function relativeFromRoot(abs) {
  return path.relative(repoRoot, abs).replaceAll('\\', '/');
}

function log(msg) {
  // keep output tidy in Actions
  process.stdout.write(`${msg}\n`);
}

(function main() {
  // Discover assets to protect
  let manifestPath = findManifest();
  let assets = [];

  if (manifestPath) {
    const manifest = readJSON(manifestPath);
    if (manifest) {
      assets = gatherAssetsFromManifest(manifest);
    }
  }

  if (assets.length === 0) {
    // Use FALLBACKS but only those that actually exist in the repo
    assets = existingOnly(FALLBACK_ASSETS.map(p => path.join(repoRoot, p)));
  } else {
    assets = existingOnly(assets);
  }

  if (assets.length === 0) {
    log('hero-freeze: No assets found to protect. Nothing to do.');
    process.exit(0);
  }

  // Build current hash map
  const current = Object.fromEntries(
    assets.map(abs => [relativeFromRoot(abs), sha256File(abs)])
  );

  if (WRITE_BASELINE) {
    writeBaseline(current);
    log(`hero-freeze: baseline written to ${path.relative(repoRoot, BASELINE_FILE)}`);
    process.exit(0);
  }

  // Compare against baseline
  const baseline = loadBaseline();
  if (!baseline) {
    log(`hero-freeze: No baseline found at ${path.relative(repoRoot, BASELINE_FILE)}.`);
    log('           Run: pnpm run guard:hero:baseline');
    process.exit(1);
  }

  // Determine changes
  const added = [];
  const removed = [];
  const changed = [];

  const bKeys = new Set(Object.keys(baseline));
  const cKeys = new Set(Object.keys(current));

  for (const k of cKeys) {
    if (!bKeys.has(k)) added.push(k);
    else if (baseline[k] !== current[k]) changed.push(k);
  }
  for (const k of bKeys) {
    if (!cKeys.has(k)) removed.push(k);
  }

  if (added.length || removed.length || changed.length) {
    log('hero-freeze: ❌ Protected hero assets changed.');
    if (added.length)  log(`  + Added:   ${added.join(', ')}`);
    if (removed.length)log(`  - Removed: ${removed.join(', ')}`);
    if (changed.length)log(`  ~ Changed: ${changed.join(', ')}`);
    log('Run: pnpm run guard:hero:baseline   (if these updates are intentional)');
    process.exit(1);
  }

  log('hero-freeze: ✅ Protected hero assets match baseline.');
})();
