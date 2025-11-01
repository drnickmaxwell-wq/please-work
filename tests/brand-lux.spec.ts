import { test, expect } from '@playwright/test';

test('canonical gradient and keyline gold are present', async ({ page }) => {
  await page.goto('/preview/brand-lock');

  const resolved = await page.evaluate(() => {
    const g = getComputedStyle(document.documentElement).getPropertyValue('--smh-gradient').trim();
    return g.replace(/\s+/g, ' ');
  });
  // rgb() canonical equivalent for #C2185B, #40C4B4, #D4AF37
  // Allow hex or rgb() to match Manifest parity for canonical gradient stops
  expect(resolved).toContain('linear-gradient(135deg');
  expect(resolved).toMatch(
    /(linear-gradient\(135deg,(#C2185B|rgb\(194,\s*24,\s*91\))\s*0%,\s*(#40C4B4|rgb\(64,\s*196,\s*180\))\s*60%,\s*(#D4AF37|rgb\(212,\s*175,\s*55\))\s*100%\))/
  );

  // Check a CTA border uses keyline gold #F9E8C3
  await page.goto('/preview/brand-live');
  const borderColor = await page.locator('.glass-btn').first().evaluate(el => getComputedStyle(el).borderColor);
  expect(borderColor.replace(/\s+/g,'')).toMatch(/rgb\(249,232,195\)/);
});
