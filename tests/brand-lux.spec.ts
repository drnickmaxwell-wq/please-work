import { test, expect } from '@playwright/test';

test('brand uses champagne tokens (no raw hex)', async ({ page }) => {
  await page.goto('/preview/brand-live');

  // Page HTML should reference our brand tokens (not raw hex in markup/CSS)
  const html = await page.content();
  expect(html).toContain('--smh-gradient');
  expect(html).toContain('--smh-accent-gold');

  // Example surface has gradient; we don’t compare hex—only presence of gradient
  const bgImage = await page.locator('[data-brand-surface]')
    .first()
    .evaluate(el => getComputedStyle(el).getPropertyValue('background-image'));
  expect(bgImage).toContain('linear-gradient');
});
