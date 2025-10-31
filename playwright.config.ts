import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  reporter: 'list',
  timeout: 30_000,
  use: {
    headless: true,
    viewport: { width: 1280, height: 800 },
    // helps if tests fetch your local preview route:
    baseURL: 'http://localhost:3000',
  },
  // If your specs do not need a dev server, keep webServer commented out.
  // If they do, uncomment and adjust:
  // webServer: {
  //   command: 'pnpm run dev',
  //   url: 'http://localhost:3000/preview/brand-lock',
  //   reuseExistingServer: true,
  //   timeout: 60_000
  // }
});
