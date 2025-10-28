// Fails CI if glass tokens lose translucency or the hero gradient drifts.
const fs = require('fs');

const css = fs.readFileSync('styles/tokens.css', 'utf8');
const champagne = fs.readFileSync('styles/tokens/smh-champagne-tokens.css', 'utf8');

// naive but robust: capture the percentage used in glass strong definitions
function extractPerc(text, varName) {
  const re = new RegExp(`${varName}\\s*:\\s*color-mix\\([^\\)]*var\\(\\s*--smh-bg\\s*\\)\\s*(\\d+)%`, 'i');
  const m = text.match(re);
  return m ? parseInt(m[1], 10) : null;
}

const light = extractPerc(css, '--glass-bg-strong');
const dark = (() => {
  const darkBlock = css.split('@media').slice(1).join('@media'); // grab media parts
  return extractPerc(darkBlock || '', '--glass-bg-strong');
})();

function assertOk(label, val) {
  if (val == null) {
    console.error(`✖ Could not find ${label} --glass-bg-strong definition`);
    process.exit(1);
  }
  if (val > 78) {
    console.error(`✖ ${label} glass too opaque: ${val}% bg (must be ≤ 78)`);
    process.exit(1);
  }
}

assertOk('light', light);
assertOk('dark', dark);

const gradientMatch = champagne.match(/--smh-gradient:\s*([^;]+);/i);

if (!gradientMatch) {
  console.error('✖ Could not locate --smh-gradient definition');
  process.exit(1);
}

const gradient = gradientMatch[1].trim().toLowerCase();

if (!gradient.includes('linear-gradient(135deg')) {
  console.error('✖ --smh-gradient must remain at 135deg');
  process.exit(1);
}

if (!gradient.includes('#d94bc6') || !gradient.includes('#00c2c7')) {
  console.error('✖ --smh-gradient must contain #D94BC6 and #00C2C7');
  process.exit(1);
}

console.log(`✔ Glass translucency OK (light=${light}%, dark=${dark}%)`);
console.log(`✔ Champagne gradient locked (${gradientMatch[1].trim()})`);
