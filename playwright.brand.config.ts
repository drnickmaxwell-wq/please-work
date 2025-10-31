import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    viewport: { width: 1280, height: 800 }
  },
  retries: 0,
  timeout: 30_000,
  // We start Next separately in the workflow to keep logs clean.
});
