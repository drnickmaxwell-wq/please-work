#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const [inputPath] = process.argv.slice(2);

if (!inputPath) {
  console.error('Usage: node scripts/hash-media.mjs <relative-path>');
  process.exit(1);
}

const absolutePath = path.isAbsolute(inputPath)
  ? inputPath
  : path.join(repoRoot, inputPath);

if (!fs.existsSync(absolutePath)) {
  console.error(`Missing media file: ${path.relative(repoRoot, absolutePath)}`);
  process.exit(1);
}

try {
  const { data } = await sharp(absolutePath).raw().toBuffer({ resolveWithObject: true });
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  console.log(`PIXEL_SHA=${hash}`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
