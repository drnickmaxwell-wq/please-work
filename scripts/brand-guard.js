const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const ALLOWED_FILES = new Set([
  path.join('styles', 'tokens', 'smh-champagne-tokens.css'),
  path.join('styles', 'tokens.css'),
  path.join('scripts', 'brand-guard.js'),
  path.join('scripts', 'brand-lock-guard.cjs'),
]);
const IGNORE_PATH_PREFIXES = [
  'docs/',
  'reports/',
  'advanced-web-features-audit.md',
];
const LOCKED_HEXES = ['#d94bc6', '#00c2c7', '#c2185b', '#40c4b4', '#d4af37'];
const GRADIENT_ASSERT = '--smh-gradient:linear-gradient(135deg,#D94BC6 0%,#00C2C7 100%);';
const IGNORED_DIRS = new Set([
  '.git',
  '.next',
  '.turbo',
  'node_modules',
  'out',
  'dist',
  '.vercel',
]);
const BINARY_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.avif',
  '.gif',
  '.svg',
  '.ico',
  '.mp4',
  '.mov',
  '.mp3',
  '.wav',
  '.woff',
  '.woff2',
  '.ttf',
  '.otf',
  '.eot',
]);

let failed = false;

const offenders = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) {
      continue;
    }

    const resolved = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(resolved);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (BINARY_EXTENSIONS.has(ext)) {
      continue;
    }

    checkFile(resolved);
  }
}

function checkFile(absPath) {
  const relPath = path.relative(ROOT, absPath);
  for (const prefix of IGNORE_PATH_PREFIXES) {
    if (relPath.startsWith(prefix)) {
      return;
    }
  }
  const content = fs.readFileSync(absPath, 'utf8');

  if (!ALLOWED_FILES.has(relPath)) {
    const lines = content.split(/\r?\n/);
    for (let index = 0; index < lines.length; index += 1) {
      const lower = lines[index].toLowerCase();
      for (const hex of LOCKED_HEXES) {
        if (lower.includes(hex)) {
          offenders.push({ file: relPath, line: index + 1, color: hex });
        }
      }
    }
  }
}

function assertGradient() {
  const tokensPath = path.join(ROOT, 'styles', 'tokens', 'smh-champagne-tokens.css');
  const tokensCss = fs.readFileSync(tokensPath, 'utf8');
  if (!tokensCss.includes(GRADIENT_ASSERT)) {
    console.error('✖ --smh-gradient must equal', GRADIENT_ASSERT);
    failed = true;
  }
}

walk(ROOT);

if (offenders.length > 0) {
  console.error('✖ Locked champagne hex values found outside token sources:');
  for (const { file, line, color } of offenders) {
    console.error(`  ${file}:${line} → ${color}`);
  }
  failed = true;
}

assertGradient();

if (!failed) {
  console.log('✔ Champagne guardrails intact');
}

process.exitCode = failed ? 1 : 0;
