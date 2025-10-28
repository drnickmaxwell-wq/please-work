#!/usr/bin/env node
const fsp = require('fs/promises');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const ignored = new Set(['.git', 'node_modules', '.next', 'out', 'dist', '.turbo', '.vercel']);
const binaryPattern = /\.(?:png|jpe?g|gif|mp4|mov|mp3|webm|avi|mkv|ico|icns|pdf|zip|gz|bz2|7z|tar|woff2?|ttf|eot|otf|heic|heif|avif|glb|gltf|wasm)$/i;
const gradientTarget = 'linear-gradient(135deg, #D94BC6 0%, #00C2C7 100%)';
const gradientRegex = /linear-gradient\(135deg\s*,\s*#d94bc6(?:\s*0%)?\s*,\s*#00c2c7(?:\s*100%)?\s*\)/i;
const tokensFile = path.join('styles', 'tokens', 'smh-champagne-tokens.css');

const bannedHexes = ['#d94bc6', '#00c2c7'];

const errors = [];

function normalise(filePath) {
  return path.relative(repoRoot, filePath).replace(/\\/g, '/');
}

async function verifyGradientStrings() {
  const tokenPath = path.join(repoRoot, tokensFile);
  try {
    const contents = await fsp.readFile(tokenPath, 'utf8');
    if (!contents.includes(gradientTarget)) {
      errors.push(`Missing canonical gradient in ${tokensFile}`);
    }
  } catch (error) {
    errors.push(`Unable to read ${tokensFile}: ${error.message}`);
  }

  const buildCssFiles = await findBuildCss();
  if (buildCssFiles.length === 0) {
    errors.push('No built CSS files found in .next. Run the build before brand:guard.');
    return;
  }

  const cssChecks = await Promise.all(
    buildCssFiles.map(async (relativePath) => {
      const filePath = path.join(repoRoot, relativePath);
      try {
        const contents = await fsp.readFile(filePath, 'utf8');
        return contents.includes(gradientTarget) || gradientRegex.test(contents);
      } catch (error) {
        errors.push(`Unable to read ${relativePath}: ${error.message}`);
        return false;
      }
    })
  );

  if (!cssChecks.some(Boolean)) {
    errors.push('Built CSS is missing the canonical gradient string.');
  }
}

function isAllowedHexFile(relativePath) {
  return (
    relativePath.startsWith('styles/tokens/') ||
    relativePath === 'scripts/brand-guard.cjs' ||
    relativePath === 'scripts/brand-lock-guard.cjs'
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

async function findBuildCss() {
  const cssFiles = [];
  const nextDir = path.join(repoRoot, '.next');
  try {
    await walkBuild(nextDir, cssFiles);
  } catch (error) {
    errors.push(`Unable to scan build output: ${error.message}`);
  }
  return cssFiles;
}

async function walkBuild(directory, results) {
  const entries = await fsp.readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await walkBuild(fullPath, results);
    } else if (entry.isFile() && entry.name.endsWith('.css')) {
      results.push(normalise(fullPath));
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
