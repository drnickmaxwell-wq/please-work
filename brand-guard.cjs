#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const SELF = path.join(ROOT, 'brand-guard.cjs');
const BLOCKED = ['#D94BC6', '#00C2C7']; // legacy two-stop drift
const ALLOWED_HEX = new Set(['#c2185b', '#40c4b4', '#d4af37']); // magenta, teal, gold
const TOKENS_ALLOWLIST_DIRS = ['styles/tokens'];

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

const HEX_IN_GRADIENT = /linear-gradient\([^)]*\)/gi;
const HEX_COLOR = /#[0-9a-fA-F]{3,8}\b/g;

let failures = [];
for (const file of walk(ROOT)) {
  if (file === SELF) continue;
  const txt = fs.readFileSync(file, 'utf8');
  for (const hex of BLOCKED) {
    if (txt.includes(hex) && !isInAllowlistedTokens(file)) {
      failures.push(`${file}: legacy hex ${hex}`);
    }
  }
  if (!isInAllowlistedTokens(file)) {
    const gradients = txt.match(HEX_IN_GRADIENT) || [];
    for (const gradient of gradients) {
      const matches = gradient.match(HEX_COLOR) || [];
      for (const match of matches) {
        if (!ALLOWED_HEX.has(match.toLowerCase())) {
          failures.push(`${file}: rogue hex ${match} in gradient`);
        }
      }
    }
  }
}
if (failures.length) {
  console.error('Brand Guard failed (legacy or rogue hex detected outside tokens):');
  for (const f of failures) console.error(' - ' + f);
  process.exit(1);
}
console.log('Brand Guard passed.');
