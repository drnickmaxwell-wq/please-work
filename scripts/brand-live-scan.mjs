#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import process from 'process';
import { chromium } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const reportsDir = path.join(projectRoot, 'reports');
const outputPath = path.join(reportsDir, 'brand-live.json');
const PORT = 3005;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const SERVER_CHECK_URL = `${BASE_URL}/`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function rgbToHexComponent(value) {
  const n = Math.max(0, Math.min(255, Number(value)));
  return n.toString(16).padStart(2, '0').toUpperCase();
}

function normalizeGradient(value) {
  if (!value) return value;
  let normalized = value.trim();
  normalized = normalized.replace(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*\.?\d+))?\s*\)/gi, (match, r, g, b, a) => {
    if (typeof a !== 'undefined' && Number(a) !== 1) {
      return match.replace(/\s+/g, ' ');
    }
    return `#${rgbToHexComponent(r)}${rgbToHexComponent(g)}${rgbToHexComponent(b)}`;
  });
  normalized = normalized.replace(/\s+/g, ' ');
  normalized = normalized.replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');
  normalized = normalized.replace(/\s*,\s*/g, ',');
  return normalized;
}

function cleanValue(value) {
  return typeof value === 'string' ? value.trim() : value;
}

function extractUrls(value) {
  if (!value || typeof value !== 'string') return [];
  const urls = [];
  const regex = /url\(([^)]+)\)/gi;
  let match;
  while ((match = regex.exec(value))) {
    let url = match[1].trim();
    url = url.replace(/^"|^'|"$|'$/g, '');
    urls.push(url);
  }
  return urls;
}

async function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { stdio: 'inherit', ...options });
    proc.on('error', reject);
    proc.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
      }
    });
  });
}

async function ensureBuild() {
  const nextDir = path.join(projectRoot, '.next');
  const buildIdPath = path.join(nextDir, 'BUILD_ID');
  if (fs.existsSync(nextDir) && fs.existsSync(buildIdPath)) {
    return;
  }
  await runCommand('pnpm', ['exec', 'next', 'build'], { cwd: projectRoot });
}

async function startServer() {
  await ensureBuild();
  const server = spawn('pnpm', ['exec', 'next', 'start', '-p', String(PORT)], {
    cwd: projectRoot,
    env: { ...process.env, PORT: String(PORT) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  const errors = [];
  server.stderr.on('data', (data) => {
    errors.push(data.toString());
  });

  let ready = false;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(SERVER_CHECK_URL, { method: 'GET' });
      if (response.ok || response.status === 404) {
        ready = true;
        break;
      }
    } catch (_) {
      // retry
    }
    await sleep(500);
  }

  if (!ready) {
    server.kill();
    if (errors.length) {
      throw new Error(`Failed to start Next.js server:\n${errors.join('\n')}`);
    }
    throw new Error('Failed to start Next.js server on port 3005.');
  }

  return {
    process: server,
    async stop() {
      if (!server.killed) {
        await new Promise((resolve) => {
          server.on('exit', resolve);
          server.kill();
        });
      }
    },
  };
}

function analyzeBackgrounds(data) {
  const gradient = normalizeGradient(cleanValue(data.gradient));
  const bgSize = cleanValue(data.bgSize);
  const bgPos = cleanValue(data.bgPos);
  const waves = new Set();
  let particles = null;
  let grain = null;

  for (const entry of data.backgrounds) {
    const urls = extractUrls(entry.image);
    for (const rawUrl of urls) {
      const lower = rawUrl.toLowerCase();
      if (lower.includes('particles') && !particles) {
        particles = rawUrl;
      } else if ((lower.includes('grain') || lower.includes('texture')) && !grain) {
        grain = rawUrl;
      }
      if (lower.includes('wave') || lower.includes('mask')) {
        waves.add(rawUrl);
      }
    }
  }

  return {
    gradient,
    bgSize,
    bgPos,
    waves: Array.from(waves),
    particles,
    grain,
  };
}

async function captureSurface(page, url) {
  const response = await page.goto(url, { waitUntil: 'load', timeout: 60_000 });
  if (response && response.status() >= 400) {
    throw new Error(`Failed to load ${url}: ${response.status()}`);
  }

  return await page.evaluate(() => {
    const selectors = ['.champagne-surface', '.champagne-surface-lux', 'main', 'body'];
    let element = null;
    for (const selector of selectors) {
      if (selector === 'body') {
        element = document.body;
      } else {
        const candidate = document.querySelector(selector);
        if (candidate) {
          element = candidate;
        }
      }
      if (element) break;
    }
    if (!element) return null;

    const base = window.getComputedStyle(element);
    const before = window.getComputedStyle(element, '::before');
    const after = window.getComputedStyle(element, '::after');

    return {
      gradient: base.backgroundImage,
      bgSize: base.backgroundSize,
      bgPos: base.backgroundPosition,
      backgrounds: [
        { pseudo: 'self', image: base.backgroundImage },
        { pseudo: 'before', image: before.backgroundImage },
        { pseudo: 'after', image: after.backgroundImage },
      ],
    };
  });
}

async function main() {
  await fs.promises.mkdir(reportsDir, { recursive: true });
  let server;

  try {
    server = await startServer();
    const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    const targets = [
      ['home', '/'],
      ['brandLock', '/preview/brand-lock'],
    ];

    const results = {};

    for (const [key, route] of targets) {
      const url = new URL(route, BASE_URL).toString();
      const data = await captureSurface(page, url);
      if (data) {
        results[key] = analyzeBackgrounds(data);
      } else {
        results[key] = {
          gradient: null,
          bgSize: null,
          bgPos: null,
          waves: [],
          particles: null,
          grain: null,
        };
      }
    }

    await browser.close();
    await fs.promises.writeFile(outputPath, `${JSON.stringify(results, null, 2)}\n`, 'utf8');
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  } finally {
    if (server) {
      await server.stop();
    }
  }
}

main();
