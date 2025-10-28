#!/usr/bin/env node
const fsp = require('fs/promises');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const ignored = new Set(['.git', 'node_modules', '.next', 'out', 'dist', '.turbo', '.vercel']);
const binaryPattern = /\.(?:png|jpe?g|gif|mp4|mov|mp3|webm|avi|mkv|ico|icns|pdf|zip|gz|bz2|7z|tar|woff2?|ttf|eot|otf|heic|heif|avif|glb|gltf|wasm)$/i;
const gradientTarget = 'linear-gradient(135deg,#D94BC6 0%,#00C2C7 100%)';
const gradientFiles = [
  path.join('styles', 'tokens.css'),
  path.join('styles', 'brand', 'brand-gradient.css'),
  path.join('styles', 'tokens', 'smh-champagne-tokens.css'),
];

const bannedHexes = ['#d94bc6', '#00c2c7', '#d4af37'];

const errors = [];

function normalise(filePath) {
  return path.relative(repoRoot, filePath).replace(/\\/g, '/');
}

async function verifyGradientStrings() {
  await Promise.all(
    gradientFiles.map(async (relativePath) => {
      const filePath = path.join(repoRoot, relativePath);
      try {
        const contents = await fsp.readFile(filePath, 'utf8');
        if (!contents.includes(gradientTarget)) {
          errors.push(`Missing canonical gradient in ${relativePath}`);
        }
      } catch (error) {
        errors.push(`Unable to read ${relativePath}: ${error.message}`);
      }
    })
  );
}

function isAllowedHexFile(relativePath) {
  return (
    relativePath.startsWith('styles/tokens/') ||
    relativePath === 'styles/tokens.css' ||
    relativePath === 'styles/brand/brand-gradient.css' ||
    relativePath === 'scripts/brand-guard.cjs'
  );
}

function shouldValidateSvg(relativePath) {
  return (
    relativePath.startsWith('public/icons/') ||
    relativePath.startsWith('public/assets/manus/icons/')
  );
}

async function walk(directory) {
  const entries = await fsp.readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
    } else if (entry.isFile()) {
      await inspectFile(fullPath);
    }
  }
}

async function inspectFile(filePath) {
  if (binaryPattern.test(filePath)) {
    return;
  }

  const relativePath = normalise(filePath);
  const contents = await fsp.readFile(filePath, 'utf8');
  const lowerContents = contents.toLowerCase();

  for (const hex of bannedHexes) {
    if (lowerContents.includes(hex) && !isAllowedHexFile(relativePath)) {
      errors.push(`Forbidden brand hex ${hex.toUpperCase()} in ${relativePath}`);
    }
  }

  if (relativePath.endsWith('.svg') && shouldValidateSvg(relativePath)) {
    validateSvg(relativePath, contents);
  }
}

function validateSvg(relativePath, source) {
  const styleMatch = source.match(/style\s*=/i);
  if (styleMatch) {
    errors.push(`Inline style attribute found in ${relativePath}`);
  }

  const fillRegex = /fill\s*=\s*"([^"]*)"/gi;
  let fillMatch;
  while ((fillMatch = fillRegex.exec(source)) !== null) {
    const value = fillMatch[1].trim().toLowerCase();
    if (value && value !== 'none' && value !== 'currentcolor') {
      errors.push(`SVG ${relativePath} has disallowed fill="${fillMatch[1]}"`);
    }
  }

  const strokeRegex = /stroke\s*=\s*"([^"]*)"/gi;
  let strokeMatch;
  while ((strokeMatch = strokeRegex.exec(source)) !== null) {
    const value = strokeMatch[1].trim().toLowerCase();
    if (value && value !== 'currentcolor' && value !== 'none') {
      errors.push(`SVG ${relativePath} has disallowed stroke="${strokeMatch[1]}"`);
    }
  }
}

(async () => {
  await verifyGradientStrings();
  await walk(repoRoot);

  if (errors.length > 0) {
    for (const message of errors) {
      console.error(`❌ ${message}`);
    }
    process.exit(1);
  }

  console.log('✅ Brand guard passed. Champagne hues remain locked.');
})();
