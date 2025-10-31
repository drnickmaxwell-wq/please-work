#!/usr/bin/env node
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const { CANON_GRADIENT } = require('./brand-report.cjs');

const { chromium } = require('playwright');

const targetUrl = process.env.BRAND_PREVIEW_URL || 'http://127.0.0.1:3000/preview/brand-lock';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForServer(url, timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { method: 'GET' });
      if (res.ok || res.status >= 200) {
        return;
      }
    } catch {}
    await sleep(500);
  }
  throw new Error(`Timed out waiting for preview at ${url}`);
}

async function isServerAvailable(url, timeoutMs = 2_000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { method: 'GET', signal: controller.signal });
    return res.ok || res.status >= 200;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

async function ensureLocalServer(url) {
  const { hostname, port, origin } = new URL(url);
  const isLocal = ['localhost', '127.0.0.1', '0.0.0.0'].includes(hostname);
  if (!isLocal) {
    return { close: () => Promise.resolve() };
  }

  if (await isServerAvailable(url)) {
    return { close: () => Promise.resolve() };
  }

  const resolvedPort = port || '3000';
  const nextBin = require.resolve('next/dist/bin/next');
  const dev = spawn(process.execPath, [nextBin, 'dev', '--hostname', hostname, '--port', resolvedPort], {
    stdio: 'pipe',
    env: { ...process.env, PORT: resolvedPort },
  });

  dev.stdout.on('data', chunk => {
    process.stdout.write(chunk);
  });
  dev.stderr.on('data', chunk => {
    process.stderr.write(chunk);
  });

  let closed = false;
  dev.on('exit', (code, signal) => {
    if (!closed && (code !== null && code !== 0)) {
      console.error(`Dev server exited with code ${code}`);
      process.exit(code ?? 1);
    }
    if (!closed && signal && signal !== 'SIGTERM') {
      console.error(`Dev server exited via signal ${signal}`);
      process.exit(1);
    }
  });

  await waitForServer(`${origin}/api/health?_brand_ping=${Date.now()}`).catch(async () => {
    // Some previews may not expose /api/health; retry against the preview route.
    await waitForServer(url);
  });

  return {
    async close() {
      closed = true;
      dev.kill('SIGTERM');
      await once(dev, 'exit').catch(() => {});
    },
  };
}

(async () => {
  console.log('Verifying Manus Lux gradient →', CANON_GRADIENT);
  const server = await ensureLocalServer(targetUrl);

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle' });
    const gradient = await page.evaluate(() => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--smh-gradient');
      return raw.trim().replace(/\s+/g, ' ');
    });

    console.log('Resolved Manus Lux gradient:', gradient);

    if (!/linear-gradient\(135deg/i.test(gradient)) {
      throw new Error('Gradient direction is incorrect or missing.');
    }
    if (!/#C2185B\s*0%/i.test(gradient)) {
      throw new Error('Missing Manus Lux rose stop at 0%.');
    }
    if (!/#40C4B4\s*60%/i.test(gradient)) {
      throw new Error('Missing Manus Lux teal stop at 60%.');
    }
    if (!/#D4AF37\s*100%/i.test(gradient)) {
      throw new Error('Missing Manus Lux aureate stop at 100%.');
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
    await server.close();
  }

  if (process.exitCode) {
    process.exit(process.exitCode);
  }
})();
