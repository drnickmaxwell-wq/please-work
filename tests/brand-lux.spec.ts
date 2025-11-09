import { test, expect } from '@playwright/test';

test('canonical gradient and keyline gold are present', async ({ page }) => {
  await page.goto('/preview/brand-lock');

  const resolved = await page.evaluate(() => {
    const g = getComputedStyle(document.documentElement).getPropertyValue('--smh-gradient').trim();
    return g.replace(/\s+/g, ' ');
  });
  expect(resolved).toContain('linear-gradient(135deg');
  const resolvedStops = resolved.match(/rgb\(/g) ?? [];
  expect(resolvedStops.length).toBeGreaterThanOrEqual(3);

  // Check a CTA border resolves to a rendered color via tokens
  await page.goto('/preview/brand-live');
  const borderColor = await page.locator('.glass-btn').first().evaluate(el => getComputedStyle(el).borderColor);
  expect(borderColor).toMatch(/rgb\(/);
});
