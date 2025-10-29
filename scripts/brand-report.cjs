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
  const opacityMatch = tokens.match(/--champagne-glass-bg:\s*color-mix\([^)]*#0b0d0f\s*(\d+)%/i);
  const gradientMatch = tokens.match(/--smh-gradient:\s*([^;]+);/i);

  const opacity = opacityMatch ? Number(opacityMatch[1]) : null;
  const gradient = gradientMatch ? gradientMatch[1].trim() : null;

  console.log('=== Hue Report ===');
  if (opacity != null) {
    console.log(`• Glass background translucency: ${opacity}%`);
  } else {
    console.log('• Glass background translucency: unavailable');
  }

  if (gradient) {
    console.log(`• Champagne gradient: ${gradient}`);
  } else {
    console.log('• Champagne gradient: unavailable');
  }
  console.log('');
}

function structureReport() {
  const hero = readFile(heroPath);
  const journey = readFile(journeyPath);

  const sectionHasGlass = /<section[^>]*className[^>]*champagne-glass/.test(hero)
    || /<section[^>]*className[^>]*champagne-glass/.test(journey);

  const heroHasSurface = hero.includes('champagne-surface');
  const journeyHasSurface = journey.includes('champagne-surface');
  const hasMdGrid = journey.includes('md:grid-cols-2');
  const hasLgGrid = journey.includes('lg:grid-cols-3');

  console.log('=== Structure Report ===');
  console.log(`• Hero champagne-surface present: ${heroHasSurface ? 'yes' : 'no'}`);
  console.log(`• Smile Journey champagne-surface present: ${journeyHasSurface ? 'yes' : 'no'}`);
  console.log(`• Journey section free of champagne-glass: ${sectionHasGlass ? 'no' : 'yes'}`);
  console.log(`• Journey grid md:grid-cols-2 present: ${hasMdGrid ? 'yes' : 'no'}`);
  console.log(`• Journey grid lg:grid-cols-3 present: ${hasLgGrid ? 'yes' : 'no'}`);
}

hueReport();
structureReport();
