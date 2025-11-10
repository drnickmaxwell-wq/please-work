import { test, expect } from '@playwright/test';

test('canonical gradient and keyline gold are present', async ({ page }) => {
  await page.goto('/preview/brand-lock');

  const resolved = await page.evaluate(() => {
    const probe = document.createElement('div');
    probe.style.backgroundImage = 'var(--smh-gradient)';
    document.body.appendChild(probe);
    const computed = getComputedStyle(probe).backgroundImage.replace(/\s+/g, ' ');
    probe.remove();
    return computed;
  });
  // rgb() canonical equivalent for var(--brand-magenta), var(--brand-teal), var(--brand-gold)
  expect(resolved).toContain('linear-gradient(135deg');
  expect(resolved).toMatch(/rgb\(\s*194,\s*24,\s*91\s*\)\s*0%/);
  expect(resolved).toMatch(/rgb\(\s*64,\s*196,\s*180\s*\)\s*60%/);
  expect(resolved).toMatch(/rgb\(\s*212,\s*175,\s*55\s*\)\s*100%/);

  // Check a CTA border uses keyline gold var(--champagne-keyline-gold)
  const keylineGold = await page.evaluate(() => {
    const probe = document.createElement('div');
    probe.style.border = '1px solid var(--champagne-keyline-gold)';
    document.body.appendChild(probe);
    const color = getComputedStyle(probe).borderTopColor.replace(/\s+/g, '');
    probe.remove();
    return color;
  });
  expect(keylineGold).toBe('rgb(249,232,195)');
});
