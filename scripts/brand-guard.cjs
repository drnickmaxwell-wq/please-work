const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const CANONICAL_GRADIENT = 'linear-gradient(135deg, #D94BC6 0%, #00C2C7 100%)';
const LOCKED_HEXES = ['#d94bc6', '#00c2c7'];

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
  const allowedHexFiles = new Set([
    path.join('scripts', 'brand-guard.cjs'),
    path.join('scripts', 'brand-lock-guard.cjs'),
  ]);
  const isAllowedHexFile = allowedHexFiles.has(relPath);

  if (!inTokens && !isAllowedHexFile) {
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

  if (relPath.endsWith('.svg') && relPath.includes(`${path.sep}icons${path.sep}`)) {
    const fillViolations = contents.match(/fill\s*=\s*['"](?!none['"]).+?['"]/gi);
    if (fillViolations) {
      console.error(`✗ Non-compliant fill detected in ${relPath}: ${fillViolations[0]}`);
      hasError = true;
    }
  }
}

const buildDir = path.join(ROOT, '.next');
let gradientFoundInBuild = false;
if (fs.existsSync(buildDir)) {
  const cssFiles = walk(buildDir).filter((file) => file.endsWith('.css'));
  for (const cssFile of cssFiles) {
    const css = fs.readFileSync(cssFile, 'utf8');
    const gradientRegex = /linear-gradient\(135deg\s*,\s*#d94bc6(?:\s*0%?)?\s*,\s*#00c2c7(?:\s*100%?)?\s*\)/i;
    if (gradientRegex.test(css)) {
      gradientFoundInBuild = true;
      break;
    }
  }
} else {
  console.error('✗ Build output not found. Run the build before brand guard.');
  hasError = true;
}

if (!gradientFoundInBuild) {
  console.error(`✗ Canonical gradient not found in built CSS (${CANONICAL_GRADIENT})`);
  hasError = true;
}

if (hasError) {
  process.exit(1);
}

console.log('✓ Brand guard checks passed');
