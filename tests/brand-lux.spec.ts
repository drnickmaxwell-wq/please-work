import { test, expect } from '@playwright/test';

test('canonical gradient and keyline gold are present', async ({ page }) => {
  await page.goto('/preview/brand-lock');

  const resolved = await page.evaluate(() => {
    const g = getComputedStyle(document.documentElement).getPropertyValue('--smh-gradient').trim();
    return g.replace(/\s+/g, ' ');
  });
  // Ensure the Manus Lux gradient is using canonical tokenized stops.
  expect(resolved).toContain('linear-gradient(135deg');
  expect(resolved).toMatch(/#C2185B\s*0%/i);
  expect(resolved).toMatch(/#40C4B4\s*60%/i);
  expect(resolved).toMatch(/#D4AF37\s*100%/i);

  // Check a CTA border uses keyline gold #F9E8C3
  await page.goto('/preview/brand-live');
  const keyline = await page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const token = root.getPropertyValue('--brand-gold-keyline').trim() || root.getPropertyValue('--smh-keyline-gold').trim();
    return token;
  });
  const canonicalKeyline = keyline.replace(/\s+/g, '').toUpperCase().replace(/^RGB\((\d+),(\d+),(\d+)\)$/i, (_, r, g, b) => {
    const hex = [r, g, b].map(component => Number.parseInt(component, 10).toString(16).padStart(2, '0')).join('');
    return `#${hex}`;
  });
  expect(canonicalKeyline).toBe('#F9E8C3');
});
