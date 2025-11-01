import { globby } from 'globby';
import fs from 'node:fs/promises';
import pc from 'picocolors';

const HEX = /#[0-9a-fA-F]{3,8}\b/g;
const BAD_GRAD = /linear-gradient\([^)]*#[0-9a-fA-F]/g;

const allowlist = [
  // tokens only – keep these if they live in tokens file
  '--smh-primary-magenta',
  '--smh-primary-teal',
  '--smh-accent-gold',
  '--smh-gradient'
];

const files = await globby(['**/*.{ts,tsx,js,jsx,css,mdx}', '!node_modules/**', '!dist/**']);
let bad = 0;

for (const f of files) {
  const s = await fs.readFile(f, 'utf8');
  const hexHits = s.match(HEX) || [];
  const gradHits = s.match(BAD_GRAD) || [];

  // ignore token files if needed:
  const inTokens = f.includes('tokens') || f.includes('brand');

  if (!inTokens && (hexHits.length || gradHits.length)) {
    const filtered = hexHits.filter(h => !allowlist.includes(h));
    if (filtered.length || gradHits.length) {
      bad++;
      console.log(pc.red(`✖ Rogue brand usage in ${f}`));
      if (filtered.length) console.log('  hex:', [...new Set(filtered)].join(', '));
      if (gradHits.length) console.log('  gradient contains hex; use tokenized gradient');
    }
  }
}

if (bad) {
  console.error(pc.red(`\nBrand scan failed in ${bad} file(s). Use tokens and manifests only.`));
  process.exit(1);
} else {
  console.log(pc.green('✓ Brand scan clean (static guards)'));
}
