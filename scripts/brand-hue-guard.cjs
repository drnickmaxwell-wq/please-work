const fs = require('fs');
const path = require('path');

const TOKENS = path.join(process.cwd(), 'styles/tokens/smh-champagne-tokens.css');
const css = fs.readFileSync(TOKENS, 'utf8');

const GRAD = 'linear-gradient(135deg,#D94BC6 0%,#00C2C7 100%)';
const must = [
  '--smh-magenta:#C2185B', '--smh-teal:#40C4B4', '--smh-gold:#D4AF37',
  '--smh-ink:#0b0d0f', `--smh-gradient: ${GRAD}`
];

const missing = must.filter(m => !css.includes(m));
if (missing.length) {
  console.error('❌ Hue Guard: Missing tokens/gradient:\n' + missing.join('\n'));
  process.exit(1);
}

console.log('✅ Hue Guard: tokens + canonical gradient present.');
