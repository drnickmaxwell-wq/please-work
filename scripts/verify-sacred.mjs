#!/usr/bin/env node
import { execSync } from 'node:child_process';

function resolveBase() {
  const baseRef = process.env.GITHUB_BASE_REF || 'main';
  const candidates = [`origin/${baseRef}`, baseRef];

  for (const ref of candidates) {
    try {
      return execSync(`git merge-base ${ref} HEAD`).toString().trim();
    } catch {
      // continue
    }
  }

  try {
    return execSync('git rev-parse HEAD^').toString().trim();
  } catch {
    return execSync('git rev-parse HEAD').toString().trim();
  }
}

const base = resolveBase();
const diff = execSync(`git diff --name-only ${base} HEAD`).toString().trim();
const changed = diff ? diff.split('\n').filter(Boolean) : [];

const sacredFiles = [
  'components/home/ChampagneHero.tsx',
];

const sacredPatterns = [
  /^app\/preview\/hero-gilded\//,
  /^public\/assets\/champagne\//,
  /^public\/brand\//,
];

const violations = changed.filter(
  file => sacredFiles.includes(file) || sacredPatterns.some(pattern => pattern.test(file)),
);

if (violations.length > 0) {
  console.error('❌ Sacred champagne hero artifacts must not change in this branch.');
  for (const file of violations) {
    console.error(` - ${file}`);
  }
  process.exit(1);
}

console.log('✅ Sacred champagne hero artifacts remain untouched.');
