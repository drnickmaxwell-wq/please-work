#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const SELF = path.join(ROOT, 'brand-guard.cjs');
const BLOCKED = ['#D94BC6', '#00C2C7']; // legacy two-stop drift
const TOKENS_ALLOWLIST_DIRS = ['styles/tokens'];
const BLOCKED_PATTERNS = BLOCKED.map(hex => ({
  hex,
  regex: new RegExp(hex.replace('#', '\\#'), 'ig'),
}));

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

function isInsideVarReference(line, matchIndex) {
  const openIdx = line.lastIndexOf('var(', matchIndex);
  if (openIdx === -1) return false;
  const closeIdx = line.indexOf(')', openIdx);
  return closeIdx !== -1 && closeIdx > matchIndex;
}

let failures = [];
for (const file of walk(ROOT)) {
  if (file === SELF) continue;
  const txt = fs.readFileSync(file, 'utf8');
  if (isInAllowlistedTokens(file)) continue;
  const lines = txt.split(/\r?\n/);
  lines.forEach((line, idx) => {
    for (const { hex, regex } of BLOCKED_PATTERNS) {
      regex.lastIndex = 0;
      for (const match of line.matchAll(regex)) {
        const index = match.index ?? -1;
        if (index === -1) continue;
        if (isInsideVarReference(line, index)) continue;
        failures.push({ file, line: idx + 1, hex });
      }
    }
  });
}
if (failures.length) {
  console.error('Brand Guard failed (legacy brand hex detected outside tokens):');
  for (const failure of failures) {
    console.error(` - ${failure.file}:${failure.line} -> ${failure.hex.toLowerCase()} (use tokens, rgba(), or color-mix())`);
  }
  process.exit(1);
}
console.log('Brand Guard passed.');
