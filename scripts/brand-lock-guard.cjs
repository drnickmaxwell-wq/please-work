// Fails CI if glass tokens lose translucency or the hero gradient drifts.
const fs = require('fs');

const champagne = fs.readFileSync('styles/tokens/smh-champagne-tokens.css', 'utf8');
const HEX_CODES = Object.freeze({
  GRADIENT_MAGENTA: '#D94BC6',
  GRADIENT_TEAL: '#00C2C7',
});

function extractOpacity(varName) {
  const re = new RegExp(`${varName}\\s*:\\s*(color-mix\\([^;]+\\))`, 'i');
  const match = champagne.match(re);
  if (!match) return null;
  const body = match[1];
  const darkMixMatch = body.match(/#([0-9a-f]{6})\s*(\d+)%/i);
  if (darkMixMatch) {
    return parseInt(darkMixMatch[2], 10);
  }

  const percMatches = body.match(/(\d+)%/);
  return percMatches ? parseInt(percMatches[1], 10) : null;
}

const glassOpacity = extractOpacity('--champagne-glass-bg');

if (glassOpacity == null) {
  console.error('✖ Could not locate --champagne-glass-bg opacity');
  process.exit(1);
}

if (glassOpacity > 12) {
  console.error(`✖ Glass background too strong (${glassOpacity}%); keep ≤ 12%`);
  process.exit(1);
}

const gradientMatch = champagne.match(/--smh-gradient:\s*([^;]+);/i);

if (!gradientMatch) {
  console.error('✖ Could not locate --smh-gradient definition');
  process.exit(1);
}

const normalizeGradient = (value) => value.replace(/\s+/g, '').toLowerCase();
const gradientRaw = gradientMatch[1].trim();
const gradientNormalized = normalizeGradient(gradientRaw);
const canonicalDisplay = `linear-gradient(135deg,${HEX_CODES.GRADIENT_MAGENTA} 0%,${HEX_CODES.GRADIENT_TEAL} 100%)`;
const canonical = `linear-gradient(135deg,${HEX_CODES.GRADIENT_MAGENTA.toLowerCase()}0%,${HEX_CODES.GRADIENT_TEAL.toLowerCase()}100%)`;

if (gradientNormalized !== canonical) {
  console.error(`✖ Gradient drifted. Expected "${canonicalDisplay}" but found "${gradientRaw}"`);
  console.error(`  normalized expected: "${canonical}" vs found: "${gradientNormalized}"`);
  process.exit(1);
}

console.log(`✔ Glass translucency OK (${glassOpacity}%)`);
console.log(`✔ Champagne gradient locked (${gradientRaw})`);
