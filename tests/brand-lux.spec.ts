import { test, expect } from '@playwright/test';

test('canonical gradient and keyline gold are present', async ({ page }) => {
  await page.goto('/preview/brand-lock');

  const resolved = await page.evaluate(() => {
    const g = getComputedStyle(document.documentElement).getPropertyValue('--smh-gradient').trim();
    return g.replace(/\s+/g, ' ');
  });
  // rgb() canonical equivalent for #C2185B, #40C4B4, #D4AF37
  expect(resolved).toContain('linear-gradient(135deg');
  // Accept either hex or rgb for the 3-stop canon: magenta 0%, teal 60%, gold 100%
  const GRADIENT_135_HEX_OR_RGB =
    /linear-gradient\(135deg,\s*(?:#c2185b|rgb\(\s*194\s*,\s*24\s*,\s*91\s*\))\s*0%,\s*(?:#40c4b4|rgb\(\s*64\s*,\s*196\s*,\s*180\s*\))\s*60%,\s*(?:#d4af37|rgb\(\s*212\s*,\s*175\s*,\s*55\s*\))\s*100%\)/i;
  // …where `resolved` is the captured computed style string
  expect(resolved).toMatch(GRADIENT_135_HEX_OR_RGB);
  expect(resolved).toMatch(/(?:#d4af37|rgb\(\s*212\s*,\s*175\s*,\s*55\s*\))\s*100%/i);

  // Check a CTA border uses keyline gold #F9E8C3
  await page.goto('/preview/brand-live');
  const borderColor = await page.locator('.glass-btn').first().evaluate(el => getComputedStyle(el).borderColor);
  expect(borderColor.replace(/\s+/g,'')).toMatch(/rgb\(249,232,195\)/);
});
