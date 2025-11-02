#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const requiredSelectors = [
  '.champagne-hero',
  '.hero-gradient-base',
  '.hero-wave-mask',
  '.hero-film-grain',
  '.hero-particles-static',
  '.hero-wave-caustics',
  '.hero-glass-shimmer',
  '.hero-particles-drift',
  '.hero-gold-dust-drift',
  '.hero-content'
];

const requiredAssets = [
  '/assets/champagne/waves/wave-mask-desktop.webp',
  '/assets/champagne/motion/wave-caustics.webm',
  '/assets/champagne/motion/glass-shimmer.webm',
  '/assets/champagne/motion/particles-drift.webm',
  '/assets/champagne/particles/gold-dust-drift.webm',
  '/assets/champagne/particles/home-hero-particles.webp',
  '/assets/champagne/textures/home-hero-film-grain.webp'
];

const manifestKeyPaths = [
  'waves.mask',
  'waves.background',
  'textures.filmGrain',
  'motion.waveCaustics',
  'motion.glassShimmer',
  'motion.particlesDrift',
  'particles.goldDust'
];

const manifestFiles = [
  'public/assets/champagne/manifest.json',
  'public/brand/manifest.json'
];

const selectorSources = [
  'components/home/ChampagneHero.tsx',
  'components/preview/HeroGilded.tsx',
  'app/champagne/hero/page.tsx'
];

function formatResultRow(label, ok, detail = '') {
  const icon = ok ? '✅' : '❌';
  return `${icon} ${label}${detail ? ` — ${detail}` : ''}`;
}

async function readManifest(manifestPath) {
  const absolutePath = path.join(projectRoot, manifestPath);
  try {
    const data = await fs.readFile(absolutePath, 'utf8');
    const parsed = JSON.parse(data);
    return { path: manifestPath, parsed, error: null };
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { path: manifestPath, parsed: null, error: 'missing' };
    }
    return { path: manifestPath, parsed: null, error: error.message };
  }
}

function getPathValue(obj, keyPath) {
  return keyPath.split('.').reduce((value, segment) => {
    if (value && Object.prototype.hasOwnProperty.call(value, segment)) {
      return value[segment];
    }
    return undefined;
  }, obj);
}

async function checkAssets() {
  const results = [];
  for (const asset of requiredAssets) {
    const assetPath = path.join(projectRoot, 'public', asset.replace(/^\//, ''));
    try {
      const stats = await fs.stat(assetPath);
      results.push({ label: asset, ok: stats.isFile() && stats.size > 0 });
    } catch {
      results.push({ label: asset, ok: false });
    }
  }
  return results;
}

async function checkSelectors() {
  const fileContents = await Promise.all(
    selectorSources.map(async (relativePath) => {
      const absolutePath = path.join(projectRoot, relativePath);
      try {
        const content = await fs.readFile(absolutePath, 'utf8');
        return { relativePath, content };
      } catch {
        return { relativePath, content: '' };
      }
    })
  );

  return requiredSelectors.map((selector) => {
    const normalized = selector.startsWith('.') ? selector.slice(1) : selector;
    const matched = fileContents.some(({ content }) =>
      content.includes(selector) || content.includes(normalized)
    );
    return { label: selector, ok: matched };
  });
}

function summarize(title, items) {
  console.log(`\n${title}`);
  for (const item of items) {
    console.log(formatResultRow(item.label, item.ok, item.detail));
  }
}

async function main() {
  console.log('Champagne Hero Layer Audit');
  console.log('--------------------------------');

  const manifests = await Promise.all(manifestFiles.map(readManifest));

  const manifestResults = manifests.map(({ path: manifestPath, parsed, error }) => {
    if (error === 'missing') {
      return { label: manifestPath, ok: false, detail: 'file missing' };
    }
    if (error) {
      return { label: manifestPath, ok: false, detail: `parse error: ${error}` };
    }
    return { label: manifestPath, ok: true, detail: 'loaded' };
  });

  summarize('Manifest availability', manifestResults);

  const manifestKeyResults = manifestKeyPaths.map((keyPath) => {
    const present = manifests.some(({ parsed }) => parsed && getPathValue(parsed, keyPath) !== undefined);
    return { label: keyPath, ok: present };
  });

  summarize('Manifest keys', manifestKeyResults);

  const assetResults = await checkAssets();
  summarize('Asset files', assetResults);

  const selectorResults = await checkSelectors();
  summarize('DOM selectors', selectorResults);

  const totalChecks = [...manifestResults, ...manifestKeyResults, ...assetResults, ...selectorResults];
  const passed = totalChecks.every((item) => item.ok);

  console.log('\nResult:', passed ? 'PASS (advisory)' : 'FAIL (advisory)');
}

main().catch((error) => {
  console.error('Unexpected error during audit:', error);
  console.log('\nResult: FAIL (advisory)');
});
