#!/usr/bin/env node
import { readFile, writeFile, access, readdir } from 'fs/promises';
import { constants as fsConstants } from 'fs';
import path from 'path';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const manifestPath = path.resolve(repoRoot, 'public/assets/champagne/manifest.json');
const baselinePath = path.resolve(repoRoot, 'scripts/hero-freeze.hashes.json');

const args = process.argv.slice(2);
const writeBaseline = args.includes('--write-baseline');

function isHttpUrl(value) {
  return /^https?:\/\//i.test(value ?? '');
}

function normalizePath(rawPath) {
  if (typeof rawPath !== 'string') return null;
  let normalized = rawPath.trim();
  if (!normalized) return null;
  if (isHttpUrl(normalized)) return null;
  normalized = normalized.replace(/^\.\/+/, '');
  if (normalized.startsWith('~')) {
    return null;
  }
  if (normalized.startsWith('/')) {
    normalized = path.join('public', normalized);
  }
  return path.resolve(repoRoot, normalized);
}

function flattenHero(hero, prefix = []) {
  const entries = new Map();
  if (!hero || typeof hero !== 'object') return entries;
  const keys = Object.keys(hero).sort();
  for (const key of keys) {
    const value = hero[key];
    const currentPath = [...prefix, key];
    if (typeof value === 'string') {
      const label = currentPath.join('.');
      entries.set(label, value);
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      for (const [subLabel, subValue] of flattenHero(value, currentPath)) {
        entries.set(subLabel, subValue);
      }
    }
  }
  return entries;
}

function getNested(obj, pathParts) {
  let current = obj;
  for (const part of pathParts) {
    if (!current || typeof current !== 'object') {
      return null;
    }
    current = current[part];
  }
  return typeof current === 'string' ? current : null;
}

function findLayerSource(layers, predicate) {
  if (!Array.isArray(layers)) return null;
  for (const layer of layers) {
    if (!layer || typeof layer !== 'object') continue;
    const name = String(layer.name ?? '');
    if (!predicate(name, layer)) continue;
    for (const key of ['src', 'srcDesktop', 'srcTablet', 'srcMobile', 'poster']) {
      const candidate = layer[key];
      if (typeof candidate === 'string' && candidate.trim()) {
        return candidate;
      }
    }
  }
  return null;
}

function findAssetEntry(assets, predicate) {
  if (!Array.isArray(assets)) return null;
  for (const asset of assets) {
    if (!asset || typeof asset !== 'object') continue;
    const candidate = asset.path;
    if (typeof candidate === 'string' && predicate(candidate, asset)) {
      return candidate;
    }
  }
  return null;
}

function extractSizeToken(name) {
  const matches = name.match(/(\d{3,4})/g);
  if (!matches) return 0;
  return Math.max(...matches.map(Number));
}

function chooseWaveMask(waveFiles) {
  const candidates = waveFiles.filter((file) => /mask/i.test(file));
  if (!candidates.length) return null;
  const sorted = candidates.sort((a, b) => {
    const weight = (file) => {
      const lower = file.toLowerCase();
      if (lower.includes('desktop')) return 3;
      if (lower.includes('tablet')) return 2;
      if (lower.includes('mobile')) return 1;
      return 0;
    };
    const weightDiff = weight(b) - weight(a);
    if (weightDiff !== 0) return weightDiff;
    return extractSizeToken(b) - extractSizeToken(a);
  });
  return `public/assets/champagne/waves/${sorted[0]}`;
}

function chooseWaveBackground(waveFiles) {
  const candidates = waveFiles.filter((file) => /wave(s)?-?bg/i.test(file));
  if (!candidates.length) return null;
  const sorted = candidates.sort((a, b) => {
    const sizeDiff = extractSizeToken(b) - extractSizeToken(a);
    if (sizeDiff !== 0) return sizeDiff;
    const extWeight = (file) => (file.toLowerCase().endsWith('.webp') ? 2 : file.toLowerCase().endsWith('.png') ? 1 : 0);
    const extDiff = extWeight(b) - extWeight(a);
    if (extDiff !== 0) return extDiff;
    return a.localeCompare(b);
  });
  return `public/assets/champagne/waves/${sorted[0]}`;
}

async function safeReadJson(filePath) {
  try {
    const data = await readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {};
    }
    throw error;
  }
}

async function safeReaddir(dirPath) {
  try {
    return await readdir(dirPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function fileExists(filePath) {
  try {
    await access(filePath, fsConstants.F_OK);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}

async function gatherHeroAssets(manifest) {
  const heroAssetEntries = new Map();
  const issues = [];
  const hero = manifest && typeof manifest === 'object' ? manifest.hero : null;
  const layers = Array.isArray(manifest?.layers) ? manifest.layers : [];
  const assets = Array.isArray(manifest?.assets) ? manifest.assets : [];

  for (const [label, rawPath] of flattenHero(hero)) {
    heroAssetEntries.set(label, { rawPath, source: 'manifest.hero' });
  }

  const wavesDir = path.resolve(repoRoot, 'public/assets/champagne/waves');
  const waveFiles = await safeReaddir(wavesDir);

  const requiredDescriptors = [
    {
      label: 'waves.mask',
      resolver: () =>
        getNested(hero, ['waves', 'mask']) ??
        findLayerSource(layers, (name) => /wave/.test(name) && /mask/.test(name)) ??
        findAssetEntry(assets, (candidate) => /wave/.test(candidate) && /mask/.test(candidate)) ??
        chooseWaveMask(waveFiles),
    },
    {
      label: 'waves.background',
      resolver: () =>
        getNested(hero, ['waves', 'background']) ??
        findLayerSource(layers, (name, layer) => /wave/.test(name) && /background/.test(name) && typeof layer.src === 'string') ??
        findAssetEntry(assets, (candidate) => /wave(s)?-?bg/i.test(candidate)) ??
        chooseWaveBackground(waveFiles),
    },
    {
      label: 'motion.goldDust',
      resolver: () =>
        getNested(hero, ['motion', 'goldDust']) ??
        findLayerSource(layers, (name) => /gold[-_]dust/i.test(name)) ??
        findAssetEntry(assets, (candidate) => /gold[-_]dust/i.test(candidate)),
    },
  ];

  for (const { label, resolver } of requiredDescriptors) {
    if (heroAssetEntries.has(label)) continue;
    const resolved = resolver();
    if (resolved) {
      heroAssetEntries.set(label, { rawPath: resolved, source: 'derived' });
    } else {
      issues.push(`Missing hero asset path for ${label}`);
    }
  }

  if (!heroAssetEntries.size) {
    issues.push('No hero asset paths could be determined from the manifest.');
  }

  const resolvedAssets = new Map();

  for (const [label, { rawPath, source }] of heroAssetEntries) {
    const absolutePath = normalizePath(rawPath);
    if (!absolutePath) {
      issues.push(`Unsupported or invalid path for ${label}: ${rawPath}`);
      continue;
    }
    const exists = await fileExists(absolutePath);
    if (!exists) {
      issues.push(`File not found for ${label}: ${path.relative(repoRoot, absolutePath)}`);
      continue;
    }
    resolvedAssets.set(label, {
      absolutePath,
      relativePath: path.relative(repoRoot, absolutePath),
      rawPath,
      source,
    });
  }

  return { assets: resolvedAssets, issues };
}

(async () => {
  try {
    const manifest = await safeReadJson(manifestPath);
    if (!Object.keys(manifest).length) {
      console.error(`Unable to read manifest at ${path.relative(repoRoot, manifestPath)}.`);
      process.exit(1);
      return;
    }

    const { assets: heroAssets, issues } = await gatherHeroAssets(manifest);

    if (issues.length) {
      console.error('Hero asset freeze guard failed:');
      for (const issue of issues) {
        console.error(`- ${issue}`);
      }
      process.exit(1);
      return;
    }

    const computedHashes = {};

    for (const [label, info] of heroAssets) {
      const fileBuffer = await readFile(info.absolutePath);
      const hash = createHash('sha256').update(fileBuffer).digest('hex');
      computedHashes[label] = hash;
    }

    const sortedComputed = Object.fromEntries(
      Object.keys(computedHashes)
        .sort()
        .map((key) => [key, computedHashes[key]])
    );

    if (writeBaseline) {
      await writeFile(baselinePath, JSON.stringify(sortedComputed, null, 2) + '\n');
      console.log('Hero asset freeze baseline updated.');
      return;
    }

    const baseline = await safeReadJson(baselinePath);
    const baselineEntries = baseline && typeof baseline === 'object' ? baseline : {};

    const differences = [];
    const baselineKeys = new Set(Object.keys(baselineEntries));

    for (const [label, hash] of Object.entries(sortedComputed)) {
      const baselineHash = baselineEntries[label];
      if (!baselineHash) {
        differences.push(`New hero asset detected (${label}) with hash ${hash}`);
      } else if (baselineHash !== hash) {
        differences.push(
          `Hash mismatch for ${label}:\n  baseline: ${baselineHash}\n  current:  ${hash}`
        );
      }
      baselineKeys.delete(label);
    }

    for (const extraLabel of baselineKeys) {
      differences.push(`Baseline includes ${extraLabel}, but it was not found in the manifest or filesystem.`);
    }

    if (differences.length) {
      console.error('Hero asset freeze guard detected differences:');
      for (const diff of differences) {
        console.error(`- ${diff}`);
      }
      process.exit(1);
      return;
    }

    console.log('Hero asset freeze guard passed.');
  } catch (error) {
    console.error('Hero asset freeze guard encountered an error:');
    console.error(error);
    process.exit(1);
  }
})();
