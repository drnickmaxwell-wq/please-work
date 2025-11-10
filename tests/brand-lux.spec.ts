import { test, expect } from '@playwright/test';

test('canonical gradient and keyline gold are present', async ({ page }) => {
  await page.goto('/preview/brand-lock');

  const gradient = await page.evaluate(() => {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue('--smh-gradient')
      .replace(/\s+/g, ' ')
      .trim();
    return raw;
  });

  expect(gradient).toBe(
    'linear-gradient(135deg, var(--brand-magenta) 0%, var(--brand-teal) 60%, var(--brand-gold) 100%)'
  );

  // Check a CTA border uses the champagne keyline gold token
  await page.goto('/preview/brand-live');
  const { keylineToken, resolvedKeyline, borderColor } = await page.evaluate(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const keylineToken = rootStyles.getPropertyValue('--champagne-keyline-gold').trim() || '--champagne-keyline-gold';

    const resolveToken = (token) => {
      if (!token.startsWith('var(')) return token;
      const inner = token.slice(4, -1).split(',')[0].trim();
      return rootStyles.getPropertyValue(inner).trim() || token;
    };

    const button = document.querySelector('.glass-btn');
    if (!button) {
      return { keylineToken, resolvedKeyline: resolveToken(keylineToken), borderColor: '' };
    }

    const border = getComputedStyle(button).borderColor.replace(/\s+/g, ' ');
    return { keylineToken, resolvedKeyline: resolveToken(keylineToken).replace(/\s+/g, ' '), borderColor: border };
  });

  expect(keylineToken).toContain('var(--brand-gold-keyline)');
  expect(borderColor).not.toEqual('');
  expect(resolvedKeyline).toBe(borderColor);
});
