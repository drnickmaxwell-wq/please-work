import { test, expect } from '@playwright/test';

test('canonical gradient and keyline gold are present', async ({ page }) => {
  await page.goto('/preview/brand-lock');

  const resolved = await page.evaluate(() => {
    const g = getComputedStyle(document.documentElement).getPropertyValue('--smh-gradient').trim();
    return g.replace(/\s+/g, ' ');
  });
  expect(resolved).toContain('linear-gradient(135deg');
  expect(resolved).toContain('var(--brand-magenta) 0%');
  expect(resolved).toContain('var(--brand-teal) 60%');
  expect(resolved).toContain('var(--brand-gold) 100%');

  // Check a CTA border uses keyline gold #F9E8C3
  await page.goto('/preview/brand-live');
  const borderUsesToken = await page.evaluate(() => {
    const sheets = Array.from(document.styleSheets);
    return sheets.some(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        return rules.some(rule => {
          if (!(rule instanceof CSSStyleRule)) return false;
          if (!rule.selectorText?.includes('.glass-btn')) return false;
          const directBorder = rule.style.getPropertyValue('border');
          const borderColor = rule.style.getPropertyValue('border-color');
          const borderTopColor = rule.style.getPropertyValue('border-top-color');
          return [directBorder, borderColor, borderTopColor].some(value =>
            typeof value === 'string' && value.includes('var(--brand-gold-keyline)')
          );
        });
      } catch (error) {
        return false;
      }
    });
  });
  expect(borderUsesToken).toBeTruthy();
});
