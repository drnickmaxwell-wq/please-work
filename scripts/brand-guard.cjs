#!/usr/bin/env node

const { execSync } = require('node:child_process');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

function fail(message) {
  console.error(`\u274c ${message}`);
  process.exitCode = 1;
}

function ensureGradient() {
  const tokensPath = join(process.cwd(), 'styles', 'tokens.css');
  const contents = readFileSync(tokensPath, 'utf8');
  const required = '--smh-gradient: linear-gradient(135deg,#D94BC6 0%,#00C2C7 100%);';
  if (!contents.includes(required)) {
    fail(`Missing gradient string in styles/tokens.css. Expected "${required}"`);
  }
}

function ensureNoBrandHexOutsideTokens() {
  const hexPattern = /#(?:d94bc6|00c2c7|d4af37)/i;
  const files = execSync('git ls-files', { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean);

  for (const file of files) {
    if (file.startsWith('styles/tokens')) continue;
    if (file === 'scripts/brand-guard.cjs' || file === 'scripts/brand-guard.mjs' || file === 'scripts/brand-guard.js') continue;
    if (/\.(?:png|jpe?g|gif|mp4|mov|webm|ico|icns|woff2?|ttf|otf|mp3)$/i.test(file)) continue;
    const content = readFileSync(file, 'utf8');
    if (hexPattern.test(content)) {
      fail(`Brand hex detected outside tokens in ${file}`);
    }
  }
}

function ensureSanitisedSvgs() {
  const svgDirs = [
    join(process.cwd(), 'public', 'icons'),
    join(process.cwd(), 'public', 'assets', 'manus', 'icons'),
  ];
  const requiredAttributes = [
    /stroke="currentColor"/,
    /stroke-width="1\.5"/,
    /stroke-linecap="round"/,
    /stroke-linejoin="round"/,
  ];

  for (const dir of svgDirs) {
    const files = execSync(`git ls-files '${dir.replace(process.cwd() + '/', '')}/*.svg'`, { encoding: 'utf8' })
      .split('\n')
      .filter(Boolean);

    for (const file of files) {
      const content = readFileSync(file, 'utf8');
      const fillMatches = content.match(/fill="([^"]*)"/gi) || [];
      for (const match of fillMatches) {
        const value = match.split('=')[1].replace(/"/g, '').trim().toLowerCase();
        if (value !== 'none') {
          fail(`Remove fill attributes from ${file}`);
        }
      }
      if (/style=/i.test(content)) {
        fail(`Remove inline styles from ${file}`);
      }
      if (/stroke="#/i.test(content)) {
        fail(`Stroke color must use currentColor in ${file}`);
      }
      for (const pattern of requiredAttributes) {
        if (!pattern.test(content)) {
          fail(`Missing ${pattern} in ${file}`);
        }
      }
    }
  }
}

function main() {
  ensureGradient();
  ensureNoBrandHexOutsideTokens();
  ensureSanitisedSvgs();

  if (process.exitCode) {
    process.exit(process.exitCode);
  } else {
    console.info('\u2705 Brand guard checks passed');
  }
}

main();
