const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const CANONICAL_GRADIENT = 'linear-gradient(135deg,#D94BC6 0%,#00C2C7 100%)';
const LOCKED_HEXES = ['#d94bc6', '#00c2c7', '#d4af37'];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (['node_modules', '.git', '.next', 'out'].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function normaliseGradient(value) {
  return value.replace(/\s+/g, '').toLowerCase();
}

const NORMALISED_CANONICAL = normaliseGradient(CANONICAL_GRADIENT);
const files = walk(ROOT).filter((filePath) => !filePath.endsWith('.lock'));
let hasError = false;

for (const filePath of files) {
  const contents = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(ROOT, filePath);
  const inTokens = relPath.startsWith(path.join('styles', 'tokens') + path.sep);
  const isGuardScript = relPath === path.join('scripts', 'brand-guard.cjs');

  if (!inTokens && !isGuardScript) {
    for (const hex of LOCKED_HEXES) {
      if (contents.toLowerCase().includes(hex)) {
        console.error(`✗ Locked brand hex ${hex.toUpperCase()} found outside tokens in ${relPath}`);
        hasError = true;
      }
    }
  }

  const gradientMatches = contents.match(/linear-gradient\(135deg[^)]*\)/gi) ?? [];
  for (const match of gradientMatches) {
    const lower = match.toLowerCase();
    if (!lower.includes('#d94bc6') && !lower.includes('#00c2c7')) continue;
    if (normaliseGradient(match) !== NORMALISED_CANONICAL) {
      console.error(`✗ Gradient drift detected in ${relPath}: ${match}`);
      hasError = true;
    }
  }

  const svgTagRegex = /<svg[^>]*>/gi;
  let svgMatch;
  while ((svgMatch = svgTagRegex.exec(contents)) !== null) {
    const tag = svgMatch[0];
    if (/fill="#/i.test(tag)) {
      console.error(`✗ Inline fill detected on <svg> in ${relPath}`);
      hasError = true;
    }
    if (/style="[^">]*color\s*:/i.test(tag)) {
      console.error(`✗ Inline color style detected on <svg> in ${relPath}`);
      hasError = true;
    }
  }
}

if (hasError) {
  process.exit(1);
}

console.log('✓ Brand guard checks passed');
