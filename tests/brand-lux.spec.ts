import { test, expect } from '@playwright/test';

test('canonical gradient and keyline gold are present', async ({ page }) => {
  await page.goto('/preview/brand-lock');

  const resolved = await page.evaluate(() => {
    const g = getComputedStyle(document.documentElement).getPropertyValue('--smh-gradient').trim();
    return g.replace(/\s+/g, ' ');
  });
  // rgb() canonical equivalent for var(--brand-magenta), var(--brand-teal), var(--brand-gold)
  expect(resolved).toContain('linear-gradient(135deg');
  expect(resolved).toContain('var(--brand-magenta) 0%');
  expect(resolved).toContain('var(--brand-teal) 60%');
  expect(resolved).toContain('var(--brand-gold) 100%');

  // Check border uses var(--brand-gold-keyline)
  await page.goto('/preview/brand-live');
  const borderColor = await page.locator('.glass-btn').first().evaluate(el => getComputedStyle(el).borderColor);
  const keylineToken = await page.evaluate(() => {
    const root = document.documentElement;
    const keyline = getComputedStyle(root).getPropertyValue('--brand-gold-keyline').trim();
    const probe = document.createElement('div');
    probe.style.color = keyline;
    document.body.appendChild(probe);
    const rgb = getComputedStyle(probe).color;
    probe.remove();
    return rgb.replace(/\s+/g, '');
  });
  expect(borderColor.replace(/\s+/g, '')).toBe(keylineToken);
});
