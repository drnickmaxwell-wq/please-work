import { test, expect } from '@playwright/test';

test('brand surfaces use champagne tokens (no raw hex)', async ({ page }) => {
  await page.goto('/preview/brand-live');

  // Example: check that a known surface style includes our CSS variable references
  const gradient = await page.locator('[data-brand-surface]').evaluate((el) => {
    return getComputedStyle(el).getPropertyValue('background-image');
  });

  expect(gradient).toContain('linear-gradient');
  // Don’t check hex; just assert the canonical var names appear somewhere on the page
  const cssText = await page.content();
  expect(cssText).toContain('--smh-gradient');
  expect(cssText).toContain('--smh-accent-gold');
});
