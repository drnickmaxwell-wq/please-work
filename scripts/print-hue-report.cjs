const fs = require('fs');
const path = require('path');

const tokensPath = path.join(process.cwd(), 'styles/tokens/smh-champagne-tokens.css');
const tokens = fs.readFileSync(tokensPath, 'utf8');

function pick(name){
  const m = tokens.match(new RegExp(`${name}\\s*:\\s*([^;]+);`));
  return m ? m[1].trim() : 'N/A';
}

const report = {
  gradient: pick('--smh-gradient'),
  magenta: pick('--smh-magenta'),
  teal: pick('--smh-teal'),
  gold: pick('--smh-gold'),
  ink: pick('--smh-ink'),
  glass_bg: pick('--champagne-glass-bg'),
  vignette_alpha: pick('--champagne-vignette-alpha'),
  filmgrain_alpha: pick('--champagne-filmgrain-alpha'),
};

console.log('--- Champagne Brand Report ---');
Object.entries(report).forEach(([k,v]) => console.log(`${k}: ${v}`));
console.log('Overlay order (expected): gradient < vignette < grain < glass < content');
