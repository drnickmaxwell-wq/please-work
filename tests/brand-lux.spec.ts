import { test, expect } from '@playwright/test';

test('canonical gradient and keyline gold are present', async ({ page }) => {
  await page.goto('/preview/brand-lock');

  const resolved = await page.evaluate(() => {
    const g = getComputedStyle(document.documentElement).getPropertyValue('--smh-gradient').trim();
    return g.replace(/\s+/g, ' ');
  });
  expect(resolved).toContain('linear-gradient(135deg');
  expect(resolved).toContain('#C2185B 0%');
  expect(resolved).toContain('#40C4B4 60%');
  expect(resolved).toContain('#D4AF37 100%');

  // Check a CTA border uses keyline gold #F9E8C3
  await page.goto('/preview/brand-live');
  const borderColor = await page.locator('.glass-btn').first().evaluate(el => getComputedStyle(el).borderColor);
  expect(borderColor.replace(/\s+/g,'')).toMatch(/rgb\(249,232,195\)/);
});
