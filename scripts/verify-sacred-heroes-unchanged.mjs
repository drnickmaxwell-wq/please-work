import { execSync } from 'node:child_process';

const sacred = [
  'components/home/ChampagneHero.tsx',
  'components/home/ChampagneHeroGilded.tsx',
  'components/brand/BrandHeroGradient.tsx',
  'app/preview/hero-gilded/',
  'app/champagne/hero/',
  'public/assets/champagne/',
  'styles/champagne/hero'
];

const baseCandidates = [
  'origin/main',
  'main',
  'origin/master',
  'master',
  'work'
];

const resolveBase = () => {
  for (const ref of baseCandidates) {
    try {
      execSync(`git rev-parse --verify ${ref}`, { stdio: 'ignore' });
      return execSync(`git merge-base ${ref} HEAD`).toString().trim();
    } catch (error) {
      // try next candidate
    }
  }
  // Fallback to the previous commit if no baseline found
  try {
    return execSync('git rev-parse HEAD^').toString().trim();
  } catch (error) {
    return execSync('git rev-parse HEAD').toString().trim();
  }
};

const base = resolveBase();
const diff = execSync(`git diff --name-only ${base}...HEAD`).toString().split('\n').filter(Boolean);
const touched = diff.filter(p => sacred.some(s => p.startsWith(s)));

if (touched.length) {
  console.error('❌ Sacred hero paths modified:', touched);
  process.exit(1);
}
console.log('✅ Sacred hero paths unchanged');
