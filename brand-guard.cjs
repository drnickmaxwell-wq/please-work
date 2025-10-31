#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const ROOT = process.cwd();
const SELF = path.join(ROOT, 'brand-guard.cjs');
const BLOCKED = ['#D94BC6', '#00C2C7']; // legacy two-stop drift
const SCAN_DIRECTORIES = [
  'styles/champagne',
  'styles/tokens',
  'components/surfaces',
  'app/preview/brand-lock'
];
const IGNORE_GLOBS = [
  'styles/preview/**',
  'app/**/technology/**',
  'app/**/treatments/**',
  'public/**',
];
const TOKENS_ALLOWLIST_DIRS = ['styles/tokens'];

const EXTENSIONS = /\.(c|m)?(t|j)sx?$|\.css|\.mdx?$|\.json$/i;

function globToRegExp(glob) {
  const escaped = glob
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '\\u0000')
    .replace(/\*/g, '[^/]*')
    .replace(/\?/g, '[^/]');
  return new RegExp('^' + escaped.replace(/\\u0000/g, '.*') + '$');
}

const IGNORE_REGEXES = IGNORE_GLOBS.map(globToRegExp);

function shouldIgnore(relativePath) {
  return IGNORE_REGEXES.some((regex) => regex.test(relativePath));
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const absolutePath = path.join(dir, entry.name);
    const relativePath = path.relative(ROOT, absolutePath).replace(/\\/g, '/');
    if (shouldIgnore(relativePath)) continue;
    if (absolutePath === SELF) continue;
    if (entry.isDirectory()) {
      walk(absolutePath, files);
      continue;
    }
    if (!EXTENSIONS.test(entry.name)) continue;
    files.push({ absolutePath, relativePath });
  }
  return files;
}

function isInAllowlistedTokens(file) {
  const normalized = file.replace(/\\/g, '/');
  return TOKENS_ALLOWLIST_DIRS.some((dir) => normalized.includes(dir + '/'));
}

const filesToCheck = SCAN_DIRECTORIES
  .map((relativeDir) => path.join(ROOT, relativeDir))
  .reduce((acc, dir) => walk(dir, acc), []);

let failures = [];
for (const { absolutePath, relativePath } of filesToCheck) {
  const txt = fs.readFileSync(absolutePath, 'utf8');
  for (const hex of BLOCKED) {
    if (txt.includes(hex) && !isInAllowlistedTokens(relativePath)) {
      failures.push(`${relativePath}: legacy hex ${hex}`);
    }
  }
}

if (failures.length) {
  console.error('Brand Guard failed (legacy two-stop hex detected in scoped files):');
  for (const failure of failures) {
    console.error(' - ' + failure);
  }
  process.exit(1);
}

console.log('Brand Guard passed.');
