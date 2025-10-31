#!/usr/bin/env node
if (process.env.VERCEL === '1' || process.env.PLAYWRIGHT_SKIP === '1') {
  console.log('[playwright] Skipping (Vercel/PLAYWRIGHT_SKIP set).');
  process.exit(0);
}

const { spawn } = require('node:child_process');

const run = spawn('pnpm', ['exec', 'playwright', 'test', 'tests/brand-lock.spec.ts'], {
  stdio: 'inherit',
});

run.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});

run.on('error', (err) => {
  console.error('Failed to launch Playwright tests:', err);
  process.exit(1);
});
