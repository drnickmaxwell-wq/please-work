// Guard rail for champagne tokens
const fs = require('fs');

const tokens = fs.readFileSync('styles/tokens/smh-champagne-tokens.css', 'utf8');

function extractPercent(source, variable, colour) {
  const pattern = new RegExp(`${variable}\\s*:\\s*color-mix\\([^)]*${colour}\\s*(\\d+(?:\\.\\d+)?)%`, 'i');
  const match = source.match(pattern);
  return match ? Number.parseFloat(match[1]) : null;
}

const glassBg = extractPercent(tokens, '--champagne-glass-bg', 'white');
if (glassBg == null) {
  console.error('✖ Missing --champagne-glass-bg definition');
  process.exit(1);
}
if (glassBg > 10) {
  console.error(`✖ Glass background too opaque (${glassBg}%). Keep it ≤ 10%.`);
  process.exit(1);
}

const glassBorder = extractPercent(tokens, '--champagne-glass-border', '#f9e8c3');
if (glassBorder == null) {
  console.error('✖ Missing --champagne-glass-border definition');
  process.exit(1);
}
if (glassBorder > 40) {
  console.error(`✖ Glass border mix too heavy (${glassBorder}%). Keep it ≤ 40%.`);
  process.exit(1);
}

const gradientMatch = tokens.match(/--smh-gradient:\s*([^;]+);/i);
if (!gradientMatch) {
  console.error('✖ Could not locate --smh-gradient definition');
  process.exit(1);
}
const gradient = gradientMatch[1].trim();
if (gradient !== 'linear-gradient(135deg, #D94BC6 0%, #00C2C7 100%)') {
  console.error(`✖ Gradient drift detected: ${gradient}`);
  process.exit(1);
}

console.log('✔ Champagne tokens locked in.');
