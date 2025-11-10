import { execSync } from 'node:child_process';

const runGit = (command) => {
  try {
    return execSync(command, { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
  } catch (error) {
    return null;
  }
};

const sacred = [
  'components/home/ChampagneHero.tsx',
  'components/home/ChampagneHeroGilded.tsx',
  'components/brand/BrandHeroGradient.tsx',
  'app/preview/hero-gilded/',
  'app/champagne/hero/',
  'styles/champagne/hero',
  'public/assets/champagne/',
];

const allowedTouches = new Set([
  'styles/champagne/hero-gilded-tweaks.css',
]);

const base =
  runGit('git merge-base origin/main HEAD') ||
  runGit('git merge-base main HEAD') ||
  runGit('git rev-parse HEAD^') ||
  runGit('git rev-list --max-parents=0 HEAD');

if (!base) {
  console.error('❌ Unable to resolve git base for sacred verification');
  process.exit(1);
}
const diff = execSync(`git diff --name-only ${base}...HEAD`)
  .toString()
  .split('\n')
  .filter(Boolean);

const touched = diff.filter((p) => sacred.some((s) => p.startsWith(s)));
const offending = touched.filter((p) => !allowedTouches.has(p));

if (offending.length) {
  console.error('❌ Sacred hero paths modified:', offending);
  process.exit(1);
} else {
  console.log('✅ Sacred hero paths unchanged');
}
