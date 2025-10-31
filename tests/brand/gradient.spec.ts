import { test, expect } from '@playwright/test';

test.describe('Brand lock – gradient & geometry', () => {
  test('champagne surface matches locked gradient + geometry', async ({ page }) => {
    await page.goto('/preview/brand-lock');

    const surface = page.locator('.champagne-surface').first();
    await expect(surface).toBeVisible();

    const bgImage = await surface.evaluate((el) => getComputedStyle(el).backgroundImage);
    const normalized = (bgImage || '').replace(/\s+/g, ' ').trim();

    expect(normalized).toContain('linear-gradient(135deg');
    expect(normalized).toMatch(/rgb\(206,\s*75,\s*149\).*rgb\(85,\s*171,\s*168\)/);

    const bgSize = await surface.evaluate((el) => getComputedStyle(el).backgroundSize);
    const bgPos = await surface.evaluate((el) => getComputedStyle(el).backgroundPosition);

    expect(bgSize.replace(/\s+/g, ' ')).toContain('165% 165%');
    expect(bgPos.replace(/\s+/g, ' ')).toContain('18% 38%');
  });
});
