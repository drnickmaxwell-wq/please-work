import { readdir, readFile } from 'node:fs/promises';
import { join, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const CANONICAL_GRADIENT = 'linear-gradient(135deg,\x23D94BC6 0%,\x2300C2C7 100%)';
const BRAND_HEXES = ['\x23C2185B', '\x2340C4B4', '\x23D4AF37'];

const currentDir = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(currentDir, '..');
const TOKENS_DIR = join(ROOT, 'styles', 'tokens');
const TOKEN_FILE = join(TOKENS_DIR, 'smh-champagne-tokens.css');

const escapeForRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const forbiddenPatterns = [
  { label: CANONICAL_GRADIENT, regex: new RegExp(escapeForRegex(CANONICAL_GRADIENT), 'gi') },
  ...BRAND_HEXES.map((hex) => ({ label: hex, regex: new RegExp(escapeForRegex(hex), 'gi') })),
];

const IGNORED_DIRS = new Set(['.git', '.next', 'node_modules']);

function logFailure(message) {
  console.error(`✖ ${message}`);
}

async function assertGradientCanonical() {
  const tokens = await readFile(TOKEN_FILE, 'utf8');
  if (!tokens.includes(CANONICAL_GRADIENT)) {
    throw new Error(`Canonical gradient string missing or changed in ${TOKEN_FILE}`);
  }
}

async function walk(dir, visitor) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath, visitor);
    } else if (entry.isFile()) {
      await visitor(fullPath);
    }
  }
}

function isInTokens(filePath) {
  const rel = relative(TOKENS_DIR, filePath);
  return rel && !rel.startsWith('..') && !isAbsolute(rel);
}

async function main() {
  const offenders = [];
  await assertGradientCanonical();

  await walk(ROOT, async (filePath) => {
    if (isInTokens(filePath)) return;

    let contents;
    try {
      contents = await readFile(filePath, 'utf8');
    } catch {
      return;
    }

    for (const pattern of forbiddenPatterns) {
      if (pattern.regex.test(contents)) {
        offenders.push({ filePath, pattern: pattern.label });
      }
      pattern.regex.lastIndex = 0;
    }
  });

  if (offenders.length > 0) {
    for (const offender of offenders) {
      logFailure(`Found ${offender.pattern} in ${relative(ROOT, offender.filePath)}`);
    }
    throw new Error('Brand guard detected hard-coded brand color usage.');
  }

  console.log('✔ Champagne brand guard passed');
}

main().catch((error) => {
  if (error) {
    if (error.message) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
  process.exitCode = 1;
});
