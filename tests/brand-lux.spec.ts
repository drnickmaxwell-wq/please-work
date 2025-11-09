import { test, expect } from '@playwright/test';

const matchTokenOrRgb = (value: string, token: string, rgbPattern: RegExp) => {
  const normalized = value.replace(/\s+/g, '');
  expect(normalized).toMatch(new RegExp(`var\\(${token}\\)|${rgbPattern.source}`));
};

test('canonical gradient and keyline gold are present', async ({ page }) => {
  await page.goto('/preview/brand-lock');

  const resolved = await page.evaluate(() => {
    const g = getComputedStyle(document.documentElement).getPropertyValue('--smh-gradient').trim();
    return g.replace(/\s+/g, ' ');
  });

  expect(resolved).toContain('linear-gradient(135deg');
  matchTokenOrRgb(resolved, '--brand-magenta', /rgb\(194,24,91\)/);
  matchTokenOrRgb(resolved, '--brand-teal', /rgb\(64,196,180\)/);
  matchTokenOrRgb(resolved, '--smh-accent-gold', /rgb\(212,175,55\)/);

  await page.goto('/preview/brand-live');
  const borderColor = await page.locator('.glass-btn').first().evaluate(el => getComputedStyle(el).borderColor);
  matchTokenOrRgb(borderColor, '--smh-accent-gold', /rgb\(249,232,195\)/);
});
