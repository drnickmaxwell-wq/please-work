import { test, expect } from '@playwright/test';

test('canonical gradient and keyline gold are present', async ({ page }) => {
  await page.goto('/preview/brand-lock');

  const resolved = await page.evaluate(() => {
    const g = getComputedStyle(document.documentElement).getPropertyValue('--smh-gradient').trim();
    return g.replace(/\s+/g, ' ');
  });
  // rgb() canonical equivalent for var(--brand-magenta), var(--brand-teal), var(--brand-gold)
  expect(resolved).toContain('linear-gradient(135deg');
  expect(resolved).toMatch(/rgb\(\s*194,\s*24,\s*91\s*\)\s*0%/);
  expect(resolved).toMatch(/rgb\(\s*64,\s*196,\s*180\s*\)\s*60%/);
  expect(resolved).toMatch(/rgb\(\s*212,\s*175,\s*55\s*\)\s*100%/);

  // Check a CTA border uses keyline gold var(--brand-gold-keyline)
  await page.goto('/preview/brand-live');
  const borderColor = await page.locator('.glass-btn').first().evaluate(el => getComputedStyle(el).borderColor);
  expect(borderColor.replace(/\s+/g,'')).toMatch(/rgb\(249,232,195\)/);
});
