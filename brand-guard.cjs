#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const SELF = path.join(ROOT, 'brand-guard.cjs');
const BLOCKED = ['#D94BC6', '#00C2C7']; // legacy two-stop drift
const TOKENS_ALLOWLIST_DIRS = ['styles/tokens'];
// Preview/demo files can temporarily include legacy hex values for contrast tweaks.
// These globs are allowed but will emit a NOTICE instead of failing the guard.
const PREVIEW_ALLOWLIST = [/^styles\/preview\//, /^app\/.*\/preview\//, /stories\./];

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

function toPosixRelative(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/');
}

function isInAllowlistedTokens(file) {
  return TOKENS_ALLOWLIST_DIRS.some((dir) => file.includes(dir + '/'));
}

function isInPreviewAllowlist(file) {
  return PREVIEW_ALLOWLIST.some((regex) => regex.test(file));
}

let failures = [];
let notices = [];
for (const file of walk(ROOT)) {
  if (file === SELF) continue;
  const rel = toPosixRelative(file);
  const txt = fs.readFileSync(file, 'utf8');
  for (const hex of BLOCKED) {
    if (!txt.includes(hex)) continue;

    if (isInAllowlistedTokens(rel)) continue;

    if (isInPreviewAllowlist(rel)) {
      notices.push(`${rel}: legacy hex ${hex} (preview allowlist)`);
      continue;
    }

    failures.push(`${rel}: legacy hex ${hex}`);
  }
}
if (failures.length) {
  console.error('Brand Guard failed (legacy two-stop hex detected outside tokens):');
  for (const f of failures) console.error(' - ' + f);
  process.exit(1);
}
if (notices.length) {
  console.log('Brand Guard notice: legacy hex allowed in preview/story files:');
  for (const note of notices) console.log(' - ' + note);
}
console.log('Brand Guard passed.');
