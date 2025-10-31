#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const manifestPath = path.join(projectRoot, 'brand', 'manus-manifest.json');
const livePath = path.join(projectRoot, 'reports', 'brand-live.json');
const reportPath = path.join(projectRoot, 'reports', 'manus-validate.md');

function rgbToHexComponent(value) {
  const n = Math.max(0, Math.min(255, Number(value)));
  return n.toString(16).padStart(2, '0').toUpperCase();
}

function normalizeGradient(value) {
  if (!value) return value;
  let normalized = value.trim();
  normalized = normalized.replace(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*\.?\d+))?\s*\)/gi, (match, r, g, b, a) => {
    if (typeof a !== 'undefined' && Number(a) !== 1) {
      return match.replace(/\s+/g, ' ');
    }
    return `#${rgbToHexComponent(r)}${rgbToHexComponent(g)}${rgbToHexComponent(b)}`;
  });
  normalized = normalized.replace(/\s+/g, ' ');
  normalized = normalized.replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');
  normalized = normalized.replace(/\s*,\s*/g, ',');
  return normalized;
}

function readJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function includesExpected(actual, expected) {
  if (!actual || !expected) return false;
  const lowerActual = actual.toLowerCase();
  const lowerExpected = expected.toLowerCase();
  if (lowerActual.includes(lowerExpected)) return true;
  const base = expected.split(/[\\/]/).pop();
  return base ? lowerActual.includes(base.toLowerCase()) : false;
}

function firstValueSegment(value) {
  if (!value || typeof value !== 'string') return value;
  return value.split(',')[0].trim();
}

function record(lines, ok, label, details = []) {
  const icon = ok ? '✅' : '⚠️';
  lines.push(`- ${icon} ${label}`);
  for (const detail of details) {
    lines.push(`  - ${detail}`);
  }
}

function main() {
  ensureDir(path.dirname(reportPath));

  const manifest = readJson(manifestPath);
  const live = readJson(livePath);

  const lines = ['# Manus Validation Report', ''];

  if (!manifest) {
    record(lines, false, `Unable to read manifest at ${path.relative(projectRoot, manifestPath)}`);
  }

  if (!live) {
    record(lines, false, `Unable to read live report at ${path.relative(projectRoot, livePath)}`);
  }

  if (!manifest || !live) {
    fs.writeFileSync(reportPath, `${lines.join('\n')}\n`, 'utf8');
    return;
  }

  const hero = manifest.sections && manifest.sections.hero ? manifest.sections.hero : {};
  const liveHome = live.home || {};
  const liveLock = live.brandLock || {};

  const expectedGradient = normalizeGradient(hero.gradient);
  const actualHomeGradient = normalizeGradient(liveHome.gradient);
  const actualLockGradient = normalizeGradient(liveLock.gradient);

  const homeGradientMatch = expectedGradient && actualHomeGradient && expectedGradient === actualHomeGradient;
  record(lines, Boolean(homeGradientMatch), 'home.gradient matches Manus manifest', [
    `expected: ${expectedGradient ?? 'n/a'}`,
    `actual: ${actualHomeGradient ?? 'n/a'}`,
  ]);

  const lockGradientMatch = expectedGradient && actualLockGradient && expectedGradient === actualLockGradient;
  record(lines, Boolean(lockGradientMatch), 'brandLock.gradient matches Manus manifest', [
    `expected: ${expectedGradient ?? 'n/a'}`,
    `actual: ${actualLockGradient ?? 'n/a'}`,
  ]);

  const bgSizeOk = firstValueSegment(liveHome.bgSize) === hero.bgSize;
  record(lines, Boolean(bgSizeOk), 'home.backgroundSize is cover', [
    `expected: ${hero.bgSize ?? 'n/a'}`,
    `actual: ${liveHome.bgSize ?? 'n/a'}`,
  ]);

  const bgPosOk = firstValueSegment(liveHome.bgPos) === hero.bgPos;
  record(lines, Boolean(bgPosOk), 'home.backgroundPosition is center', [
    `expected: ${hero.bgPos ?? 'n/a'}`,
    `actual: ${liveHome.bgPos ?? 'n/a'}`,
  ]);

  const waves = Array.isArray(liveHome.waves) ? liveHome.waves : [];
  const hasWaveField = waves.some((value) => value && value.toLowerCase().includes('waves-bg'));
  const hasWaveMask = waves.some((value) => value && value.toLowerCase().includes('mask'));
  record(lines, hasWaveField && hasWaveMask, 'home includes wave field and mask assets', [
    `wave field detected: ${hasWaveField ? 'yes' : 'no'}`,
    `mask detected: ${hasWaveMask ? 'yes' : 'no'}`,
    `waves: ${waves.length ? waves.join(', ') : 'none'}`,
  ]);

  const expectedParticles = hero.particles && hero.particles.file;
  const particlesOk = includesExpected(liveHome.particles, expectedParticles);
  record(lines, particlesOk, 'home particles reference matches manifest', [
    `expected contains: ${expectedParticles ?? 'n/a'}`,
    `actual: ${liveHome.particles ?? 'n/a'}`,
  ]);

  const expectedGrain = hero.grain && hero.grain.file;
  const grainOk = includesExpected(liveHome.grain, expectedGrain);
  record(lines, grainOk, 'home grain reference matches manifest', [
    `expected contains: ${expectedGrain ?? 'n/a'}`,
    `actual: ${liveHome.grain ?? 'n/a'}`,
  ]);

  fs.writeFileSync(reportPath, `${lines.join('\n')}\n`, 'utf8');
}

main();
