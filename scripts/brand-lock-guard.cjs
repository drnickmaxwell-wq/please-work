// Fails CI if glass tokens lose translucency or the hero gradient drifts.
const fs = require('fs');

const champagne = fs.readFileSync('styles/tokens/smh-champagne-tokens.css', 'utf8');

function extractOpacity(varName) {
  const re = new RegExp(`${varName}\\s*:\\s*color-mix\\([^;]+)`, 'i');
  const match = champagne.match(re);
  if (!match) return null;
  const [, body] = match;
  const percMatch = body.match(/\s(\d+)%/);
  return percMatch ? parseInt(percMatch[1], 10) : null;
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

const gradient = gradientMatch[1].trim();
const canonical = 'linear-gradient(135deg, #D94BC6 0%, #00C2C7 100%)';

if (gradient !== canonical) {
  console.error(`✖ Gradient drifted. Expected "${canonical}" but found "${gradient}"`);
  process.exit(1);
}

console.log(`✔ Glass translucency OK (${glassOpacity}%)`);
console.log(`✔ Champagne gradient locked (${gradient})`);
