#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();
const tokensPath = path.join(repoRoot, 'styles/tokens/smh-champagne-tokens.css');
const heroPath = path.join(repoRoot, 'components/hero/4k-hero-video.tsx');
const journeyPath = path.join(repoRoot, 'components/sections/SmileJourney.tsx');
const surfacePath = path.join(repoRoot, 'styles/champagne/surface.css');
const glassPath = path.join(repoRoot, 'styles/champagne/glass.css');

const normalize = (value) => value.replace(/\s+/g, '').toLowerCase();

const getDecl = (block, prop) => {
  const match = block.match(new RegExp(`${prop}\\s*:\\s*([^;]+);`, 'i'));
  return match ? match[1].trim() : null;
};

let failed = false;

function assertCheck(condition, message) {
  if (!condition) {
    failed = true;
    console.error(`✖ ${message}`);
  }
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function hueReport() {
  const tokens = readFile(tokensPath);
  const gradientMatch = tokens.match(/--smh-gradient:\s*([^;]+);/i);
  const magentaMatch = tokens.match(/--smh-primary-magenta:\s*([^;]+);/i);
  const tealMatch = tokens.match(/--smh-primary-teal:\s*([^;]+);/i);
  const goldMatch = tokens.match(/--smh-accent-gold:\s*([^;]+);/i);
  const inkMatch = tokens.match(/--smh-primary-ink:\s*([^;]+);/i);

  const gradient = gradientMatch ? gradientMatch[1].trim() : null;

  console.log('=== Hue Report ===');
  if (gradient) {
    console.log(`• Champagne gradient: ${gradient}`);
  } else {
    console.log('• Champagne gradient: unavailable');
  }
  if (magentaMatch) console.log(`• Magenta: ${magentaMatch[1].trim()}`);
  if (tealMatch) console.log(`• Teal: ${tealMatch[1].trim()}`);
  if (goldMatch) console.log(`• Gold: ${goldMatch[1].trim()}`);
  if (inkMatch) console.log(`• Ink: ${inkMatch[1].trim()}`);

  if (gradient) {
    const normalizedToken = normalize(gradient);
    const canonical = 'linear-gradient(135deg,#d94bc60%,#00c2c7100%)';
    assertCheck(
      normalizedToken === canonical,
      'Token gradient must remain the canonical linear-gradient(135deg,#D94BC6 0%,#00C2C7 100%)',
    );
  }

  console.log('');
}

function structureReport() {
  const hero = readFile(heroPath);
  const journey = readFile(journeyPath);
  const surfaceCss = readFile(surfacePath);
  const glassCss = readFile(glassPath);

  const surfaceBlockMatch = surfaceCss.match(/\.champagne-surface-lux\s*\{([^}]*)\}/i);
  const glassBlockMatch = glassCss.match(/\.champagne-glass\s*\{([^}]*)\}/i);
  const surfaceBlock = surfaceBlockMatch ? surfaceBlockMatch[1] : '';
  const glassBlock = glassBlockMatch ? glassBlockMatch[1] : '';

  const backgroundImage = getDecl(surfaceBlock, 'background-image');
  const backgroundSize = getDecl(surfaceBlock, 'background-size');
  const backgroundPosition = getDecl(surfaceBlock, 'background-position');
  const glassBackground = getDecl(glassBlock, 'background-color');

  const tokens = readFile(tokensPath);
  const tokenGradientMatch = tokens.match(/--smh-gradient:\s*([^;]+);/i);
  const tokenGradient = tokenGradientMatch ? tokenGradientMatch[1].trim() : null;
  const normalizedTokenGradient = tokenGradient ? normalize(tokenGradient) : null;
  const normalizedSurfaceGradient = backgroundImage ? normalize(backgroundImage) : null;

  const heroHasSurface = hero.includes('champagne-surface-lux');
  const journeyHasSurface = journey.includes('champagne-surface-lux');
  const hasMdGrid = journey.includes('md:grid-cols-2');
  const hasLgGrid = journey.includes('lg:grid-cols-3');
  const heroHasGlassPanel = /className="[^"]*champagne-glass/.test(hero);
  const journeyGlassCards = journey.match(/champagne-glass/g)?.length ?? 0;

  console.log('=== Structure Report ===');
  console.log(`• Hero champagne-surface-lux present: ${heroHasSurface ? 'yes' : 'no'}`);
  console.log(`• Smile Journey champagne-surface-lux present: ${journeyHasSurface ? 'yes' : 'no'}`);
  console.log(`• Hero glass content block: ${heroHasGlassPanel ? 'yes' : 'no'}`);
  console.log(`• Journey glass card count: ${journeyGlassCards}`);
  console.log(`• Journey grid md:grid-cols-2 present: ${hasMdGrid ? 'yes' : 'no'}`);
  console.log(`• Journey grid lg:grid-cols-3 present: ${hasLgGrid ? 'yes' : 'no'}`);
  if (backgroundSize) console.log(`• Surface background-size: ${backgroundSize}`);
  if (backgroundPosition) console.log(`• Surface background-position: ${backgroundPosition}`);
  if (glassBackground) console.log(`• Glass background-color: ${glassBackground}`);

  if (normalizedSurfaceGradient && normalizedTokenGradient) {
    const resolvedGradient = normalizedSurfaceGradient.startsWith('var(--smh-gradient)')
      ? normalizedTokenGradient
      : normalizedSurfaceGradient;
    assertCheck(
      resolvedGradient === normalizedTokenGradient,
      'Surface gradient must resolve to the canonical token',
    );
  }

  if (glassBackground) {
    assertCheck(
      /transparent|rgba\(0,\s*0,\s*0,\s*0\)/i.test(glassBackground),
      'Glass background-color must remain fully transparent',
    );
  }

  if (backgroundPosition) {
    const parts = backgroundPosition.split(/\s+/);
    const [x, y] = parts;
    const parsePercent = (value) => {
      const num = Number.parseFloat(value.replace('%', ''));
      return Number.isFinite(num) ? num : null;
    };
    const posX = x ? parsePercent(x) : null;
    const posY = y ? parsePercent(y) : null;
    if (posX != null) {
      assertCheck(posX <= 26, 'Surface background-position X must be ≤ 26%');
    }
    if (posY != null) {
      assertCheck(posY <= 46, 'Surface background-position Y must be ≤ 46%');
    }
  }
}

function main() {
  hueReport();
  structureReport();
  if (failed) {
    process.exit(1);
  }
}

main();
