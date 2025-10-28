const fs = require('fs');
const path = require('path');

let failed = false;

function assert(condition, message) {
  if (!condition) {
    console.error(`✖ ${message}`);
    failed = true;
  }
}

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

const tokensCss = read(path.join('styles', 'tokens.css'));
const brandGradientCss = read(path.join('styles', 'brand', 'brand-gradient.css'));

// 1) Champagne gradient must stay vivid
const gradientString = 'linear-gradient(135deg,#D94BC6 0%,#00C2C7 100%)';
assert(tokensCss.includes(gradientString), `Missing canonical gradient string: ${gradientString}`);

// 2) Glass translucency must stay at or below 70% surface mix
const glassStrongMatches = [...tokensCss.matchAll(/--glass-bg-strong:\s*color-mix\([^)]*var\(\s*--smh-bg\s*\)\s*(\d+)%/gi)];
assert(glassStrongMatches.length > 0, 'Could not find --glass-bg-strong definitions');
for (const match of glassStrongMatches) {
  const pct = Number.parseInt(match[1], 10);
  assert(Number.isFinite(pct) && pct <= 70, `--glass-bg-strong too opaque (${pct}%)`);
}

// 3) Hero overlay guard
const homeWaveRule = /section\[data-hero="champagne"\]\[data-page="home"\]::after\s*\{[^}]*content:\s*none[^}]*\}/i;
assert(homeWaveRule.test(brandGradientCss), 'Home hero must disable wave overlay with content: none');

// 4) Block bg-white / bg-black utilities on hero panes/components
const heroFiles = [
  path.join('components', 'hero', '4k-hero-video.tsx'),
  path.join('components', 'video', 'cinematic-hero-video.tsx'),
];
const bgUtilityRegex = /\bbg-(?:white|black)(?:\/\d+)?\b/;
for (const filePath of heroFiles) {
  if (!fs.existsSync(filePath)) continue;
  const contents = read(filePath);
  assert(!bgUtilityRegex.test(contents), `Forbidden bg-white/bg-black utility found in ${filePath}`);
}

// 5) Footer token usage
const footerComponentPath = path.join('components', 'layout', 'FooterLuxe.tsx');
const footerSource = read(footerComponentPath);
assert(footerSource.includes('data-footer'), 'Footer must include data-footer attribute');
assert(/\[data-footer\][^{]*\{[^}]*background:\s*var\(\s*--smh-footer-bg\s*\)/i.test(footerSource),
  'Footer must use --smh-footer-bg for background');

if (!failed) {
  console.log('✔ Champagne guardrails intact');
}

process.exitCode = failed ? 1 : 0;
