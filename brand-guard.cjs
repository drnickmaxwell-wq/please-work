#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const SELF = path.join(ROOT, 'brand-guard.cjs');
const TOKEN_MAP_FILE = path.join(ROOT, 'brand', 'token-hex-map.json');
const TOKEN_HEX_MAP = require('./brand/token-hex-map.json');
const TOKENS_ALLOWLIST_DIRS = ['styles/tokens'];
const HEX_PATTERN = /#[0-9a-fA-F]{6}\b/g;
const WATCHED_HEXES = new Set(Object.keys(TOKEN_HEX_MAP));

function walk(dir, files=[]) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules','.next','.turbo','.vercel','dist','build','coverage','public'].includes(entry.name)) continue;
      walk(p, files);
    } else {
      if (!/\.(c|m)?(t|j)sx?$|\.css|\.mdx?$|\.json$/i.test(entry.name)) continue;
      files.push(p);
    }
  }
  return files;
}

function isInAllowlistedTokens(file) {
  return TOKENS_ALLOWLIST_DIRS.some(d => file.replace(/\\/g,'/').includes(d + '/'));
}

const suggestions = [];
let failures = [];
for (const file of walk(ROOT)) {
  if (file === SELF || file === TOKEN_MAP_FILE) continue;
  const txt = fs.readFileSync(file, 'utf8');
  if (isInAllowlistedTokens(file)) continue;
  const matches = txt.matchAll(HEX_PATTERN);
  for (const match of matches) {
    const hex = match[0];
    const normalized = hex.toLowerCase();
    if (!WATCHED_HEXES.has(normalized)) continue;
    const token = TOKEN_HEX_MAP[normalized];
    if (token) {
      suggestions.push({ file, hex, token });
      continue;
    }
    failures.push(`${file}: non-token hex ${hex}`);
  }
}
if (failures.length) {
  console.error('Brand Guard failed (non-token hex detected outside tokens):');
  for (const f of failures) console.error(' - ' + f);
  process.exit(1);
}
if (suggestions.length) {
  const unique = new Map();
  for (const { file, hex, token } of suggestions) {
    const key = `${file}:${hex.toLowerCase()}`;
    if (!unique.has(key)) {
      unique.set(key, { file, hex: hex.toLowerCase(), token });
    }
  }
  console.log('Token usage tips:');
  for (const { file, hex, token } of unique.values()) {
    console.log(` - ${file}: replace ${hex} with ${token}`);
  }
}
console.log('Brand Guard passed.');
