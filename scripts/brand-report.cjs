#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();
const tokensPath = path.join(repoRoot, 'styles/tokens/smh-champagne-tokens.css');
const heroPath = path.join(repoRoot, 'components/hero/4k-hero-video.tsx');
const journeyPath = path.join(repoRoot, 'components/sections/SmileJourney.tsx');

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
  const grainMatch = tokens.match(/--champagne-grain-alpha:\s*([^;]+);/i);
  const vignetteMatch = tokens.match(/--champagne-vignette-alpha:\s*([^;]+);/i);
  const glassMixMatch = tokens.match(/--champagne-glass-bg:\s*color-mix\([^)]*?(\d+)%/i);

  const gradient = gradientMatch ? gradientMatch[1].trim() : null;
  const glassOpacity = glassMixMatch ? Number(glassMixMatch[1]) : null;

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
  if (glassOpacity != null) console.log(`• Glass opacity mix: ${glassOpacity}% ink`);
  if (grainMatch) console.log(`• Grain α: ${grainMatch[1].trim()}`);
  if (vignetteMatch) console.log(`• Vignette α: ${vignetteMatch[1].trim()}`);
  console.log('');
}

function structureReport() {
  const hero = readFile(heroPath);
  const journey = readFile(journeyPath);

  const heroHasSurface = hero.includes('champagne-surface');
  const journeyHasSurface = journey.includes('champagne-surface');
  const hasMdGrid = journey.includes('md:grid-cols-2');
  const hasLgGrid = journey.includes('lg:grid-cols-3');
  const heroHasGlassPanel = /className="[^"]*champagne-glass/.test(hero);
  const journeyGlassCards = journey.match(/champagne-glass/g)?.length ?? 0;

  console.log('=== Structure Report ===');
  console.log(`• Hero champagne-surface present: ${heroHasSurface ? 'yes' : 'no'}`);
  console.log(`• Smile Journey champagne-surface present: ${journeyHasSurface ? 'yes' : 'no'}`);
  console.log(`• Hero glass content block: ${heroHasGlassPanel ? 'yes' : 'no'}`);
  console.log(`• Journey glass card count: ${journeyGlassCards}`);
  console.log(`• Journey grid md:grid-cols-2 present: ${hasMdGrid ? 'yes' : 'no'}`);
  console.log(`• Journey grid lg:grid-cols-3 present: ${hasLgGrid ? 'yes' : 'no'}`);
}

hueReport();
structureReport();
