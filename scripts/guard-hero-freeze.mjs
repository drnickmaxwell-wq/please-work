#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const baselinePath = path.join(__dirname, 'hero-freeze.hashes.json');

function readBaseline(fp) {
  try {
    const raw = fs.readFileSync(fp, 'utf8');
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object' || typeof data.files !== 'object') {
      throw new Error('Invalid baseline format');
    }
    return { files: data.files };
  } catch (error) {
    return { error };
  }
}

function sha256File(absPath) {
  const hash = crypto.createHash('sha256');
  hash.update(fs.readFileSync(absPath));
  return `sha256:${hash.digest('hex')}`;
}

const { error, files } = readBaseline(baselinePath);
if (error) {
  console.error('❌ Hero freeze failed:');
  if (error.code === 'ENOENT') {
    console.error(`  - MISSING_BASELINE ${path.relative(repoRoot, baselinePath)}`);
  } else {
    console.error(`  - INVALID_BASELINE ${path.relative(repoRoot, baselinePath)}`);
  }
  process.exit(1);
}

const entries = Object.entries(files).sort(([a], [b]) => a.localeCompare(b));

const missing = [];
const mismatched = [];

for (const [relativePath, expected] of entries) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(absolutePath)) {
    missing.push(relativePath);
    continue;
  }
  const actual = sha256File(absolutePath);
  if (actual !== expected) {
    mismatched.push(relativePath);
  }
}

if (missing.length || mismatched.length) {
  console.error('❌ Hero freeze failed:');
  for (const rel of mismatched) {
    console.error(`  - MISMATCH ${rel}`);
  }
  for (const rel of missing) {
    console.error(`  - MISSING  ${rel}`);
  }
  process.exit(1);
}

console.log(`✅ Hero freeze OK (${entries.length} files checked)`);
