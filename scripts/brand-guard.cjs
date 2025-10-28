const fs = require('fs'); const path = require('path');

const ROOT = process.cwd();
const BAD_SPACES = /oklab|oklch|lab|lch|\bcolor-mix\([^)]*brand-gradient/gi;
const LOCKED = {
  gradient: 'linear-gradient(135deg, #D94BC6 0%, #00C2C7 100%)',
  hexes: ['#C2185B', '#40C4B4', '#D4AF37']
};

function read(p) { return fs.readFileSync(p, 'utf8'); }
function allFiles(dir) {
  const out=[]; for (const e of fs.readdirSync(dir,{withFileTypes:true})) {
    const p=path.join(dir,e.name);
    if (e.isDirectory()) out.push(...allFiles(p));
    else out.push(p);
  } return out;
}

const files = allFiles(ROOT)
  .filter(p => !p.includes('node_modules') && !p.includes('.git') && !p.endsWith('.lock'));

let ok = true;
for (const f of files) {
  const s = read(f);
  const isTokenFile = f.includes('styles/tokens');
  const touchesGradient = isTokenFile || f.includes('brand-gradient');

  // Gradient must exist exactly in at least one token file
  if (isTokenFile && s.includes('--smh-gradient')) {
    if (!s.includes(LOCKED.gradient)) { console.error('✗ Token gradient string drift in', f); ok=false; }
  }

  // No oklab/oklch/etc near the brand gradient
  if (touchesGradient && BAD_SPACES.test(s)) {
    console.error('✗ Color-space transform found next to brand gradient or tokens in', f);
    ok=false;
  }

  // No hard-coded brand hexes outside token files (except this script)
  if (!f.includes('styles/tokens') && !f.endsWith('brand-guard.cjs')) {
    for (const hex of LOCKED.hexes) {
      if (s.toLowerCase().includes(hex.toLowerCase())) {
        console.error('✗ Hard-coded brand hex outside tokens in', f, hex);
        ok=false;
      }
    }
  }
}

if (!ok) process.exit(1);
console.log('✓ Brand lock OK');
