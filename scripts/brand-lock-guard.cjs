// Fails CI if --glass-bg-strong gets too opaque (>= 60% bg).
const fs = require('fs');

const css = fs.readFileSync('styles/tokens.css', 'utf8');

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
  if (val >= 60) {
    console.error(`✖ ${label} glass too opaque: ${val}% bg (must be < 60)`);
    process.exit(1);
  }
}

assertOk('light', light);
assertOk('dark', dark);

console.log(`✔ Glass translucency OK (light=${light}%, dark=${dark}%)`);
