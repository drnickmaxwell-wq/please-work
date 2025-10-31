#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const SELF = path.join(ROOT, 'brand-guard.cjs');
const { CANON_GRADIENT, CANON_HEX_WHITELIST } = require('./scripts/brand-report.cjs');

const BLOCKED = ['#D94BC6', '#00C2C7']; // legacy two-stop drift
const TOKENS_ALLOWLIST_DIRS = ['styles/tokens', 'brand/'];
const EXT_PATTERN = /\.(css|scss|sass|less|styl|tsx|jsx)$/i;

const normalizedCanonGradient = normalizeGradient(CANON_GRADIENT);
const canonicalHexNeedles = CANON_HEX_WHITELIST.map((hex) => hex.toLowerCase());

const manifestPath = path.join(ROOT, 'brand', 'manus-manifest.json');
const ALLOWLIST_FILES = new Set();
if (fs.existsSync(manifestPath)) {
  ALLOWLIST_FILES.add(manifestPath.replace(/\\/g, '/'));
}

function normalizeGradient(value) {
  if (!value) return '';
  return value
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/rgb\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/g, (_, r, g, b) => {
      const toHex = (n) => Number(n).toString(16).padStart(2, '0');
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    });
}

function walk(dir, files=[]) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules','.next','.turbo','.vercel','dist','build','coverage','public'].includes(entry.name)) continue;
      walk(p, files);
    } else {
      if (!EXT_PATTERN.test(entry.name)) continue;
      files.push(p);
    }
  }
  return files;
}

function isInAllowlistedTokens(file) {
  const normalized = file.replace(/\\/g,'/');
  if (ALLOWLIST_FILES.has(normalized)) return true;
  return TOKENS_ALLOWLIST_DIRS.some(d => normalized.includes(d + '/'));
}

let failures = [];
for (const file of walk(ROOT)) {
  if (file === SELF) continue;
  if (isInAllowlistedTokens(file)) continue;
  const txt = fs.readFileSync(file, 'utf8');
  const lower = txt.toLowerCase();
  const normalized = normalizeGradient(txt);

  for (const hex of BLOCKED) {
    if (lower.includes(hex.toLowerCase())) {
      failures.push(`${file}: legacy hex ${hex}`);
    }
  }

  for (const hex of canonicalHexNeedles) {
    if (lower.includes(hex)) {
      failures.push(`${file}: hard-coded Manus brand hex ${hex}`);
    }
  }

  if (normalized.includes(normalizedCanonGradient)) {
    failures.push(`${file}: inline Manus gradient detected; use tokens or manifest`);
  }
}
if (failures.length) {
  console.error('Brand Guard failed:');
  for (const f of failures) console.error(' - ' + f);
  process.exit(1);
}
console.log('Brand Guard passed.');
