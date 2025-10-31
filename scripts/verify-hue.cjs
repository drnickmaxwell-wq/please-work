#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const { CANON_GRADIENT } = require('./brand-report.cjs');

const TOKENS_PATH = path.join(process.cwd(), 'styles', 'tokens', 'smh-champagne-tokens.css');
const REPORTS_DIR = path.join(process.cwd(), 'reports');
const REPORT_PATH = path.join(REPORTS_DIR, 'brand-live.json');

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

function readTokens() {
  if (!fs.existsSync(TOKENS_PATH)) {
    throw new Error(`Tokens file missing at ${TOKENS_PATH}`);
  }
  return fs.readFileSync(TOKENS_PATH, 'utf8');
}

function extractVariables(css) {
  const map = new Map();
  const regex = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match;
  while ((match = regex.exec(css))) {
    map.set(`--${match[1]}`, match[2].trim());
  }
  return map;
}

function resolveValue(value, variables, stack = new Set()) {
  if (!value) return '';
  const varPattern = /var\((--[a-z0-9-]+)(?:,\s*([^)]+))?\)/gi;
  return value.replace(varPattern, (_, varName, fallback) => {
    if (stack.has(varName)) {
      throw new Error(`Circular reference detected while resolving ${varName}`);
    }
    stack.add(varName);
    const resolved = variables.get(varName);
    if (resolved) {
      const output = resolveValue(resolved, variables, stack);
      stack.delete(varName);
      return output;
    }
    stack.delete(varName);
    return typeof fallback === 'string' ? fallback.trim() : '';
  }).trim();
}

function canonicalizeSpacing(value) {
  return value.replace(/\s*,\s*/g, ',').replace(/\s+/g, ' ').trim();
}

function ensureMatch(liveGradient) {
  const normalizedLive = normalizeGradient(liveGradient);
  const normalizedCanon = normalizeGradient(CANON_GRADIENT);
  if (!normalizedLive.includes(normalizedCanon)) {
    throw new Error(`Gradient drifted. Expected ${CANON_GRADIENT} but found ${liveGradient}`);
  }
}

function main() {
  const css = readTokens();
  const variables = extractVariables(css);

  const gradientRaw = variables.get('--smh-gradient');
  if (!gradientRaw) {
    throw new Error('Missing --smh-gradient token');
  }
  const gradientResolved = canonicalizeSpacing(resolveValue(gradientRaw, variables));
  ensureMatch(gradientResolved);

  const sizeToken = variables.get('--smh-surface-bg-size') || variables.get('--smh-bg-size');
  const posToken = variables.get('--smh-surface-bg-position') || variables.get('--smh-bg-pos');

  if (!sizeToken || !posToken) {
    throw new Error('Missing surface background geometry tokens');
  }

  const bgSize = canonicalizeSpacing(resolveValue(sizeToken, variables));
  const bgPos = canonicalizeSpacing(resolveValue(posToken, variables));

  const payload = {
    surface: {
      gradient: gradientResolved,
      bgSize,
      bgPos,
    },
  };

  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  fs.writeFileSync(REPORT_PATH, JSON.stringify(payload, null, 2) + '\n', 'utf8');

  console.log('✔ Manus gradient verified');
  console.log(`  gradient: ${gradientResolved}`);
  console.log(`  bgSize:   ${bgSize}`);
  console.log(`  bgPos:    ${bgPos}`);
}

try {
  main();
} catch (error) {
  console.error(`✖ ${error.message}`);
  process.exit(1);
}
