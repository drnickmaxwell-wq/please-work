import { test, expect } from '@playwright/test';

const GOLD = 'var(--smh-accent-gold)';
const MAGENTA = 'var(--smh-primary-magenta)';
const TEAL = 'var(--smh-primary-teal)';

const resolveColor = async (page, value) => {
  return page.evaluate(val => {
    const probe = document.createElement('div');
    probe.style.color = val;
    document.body.appendChild(probe);
    const color = getComputedStyle(probe).color.replace(/\s+/g, '');
    probe.remove();
    return color;
  }, value);
};

test('canonical gradient and keyline gold are present', async ({ page }) => {
  await page.goto('/preview/brand-lock');

  const { gradient, colors } = await page.evaluate(({ GOLD, MAGENTA, TEAL }) => {
    const root = document.documentElement;
    const gradientToken = getComputedStyle(root).getPropertyValue('--smh-gradient').trim();
    const scratch = document.createElement('div');
    scratch.style.backgroundImage = gradientToken;
    document.body.appendChild(scratch);
    const resolvedGradient = getComputedStyle(scratch).backgroundImage.replace(/\s+/g, ' ');
    scratch.remove();

    const toColor = value => {
      const probe = document.createElement('div');
      probe.style.color = value;
      document.body.appendChild(probe);
      const color = getComputedStyle(probe).color.replace(/\s+/g, '');
      probe.remove();
      return color;
    };

    return {
      gradient: resolvedGradient,
      colors: {
        gold: toColor(GOLD),
        magenta: toColor(MAGENTA),
        teal: toColor(TEAL)
      }
    };
  }, { GOLD, MAGENTA, TEAL });

  expect(gradient).toContain('linear-gradient(135deg');
  expect(gradient).toContain(colors.magenta);
  expect(gradient).toContain(colors.teal);
  expect(gradient).toContain(colors.gold);

  await page.goto('/preview/brand-live');
  const borderColor = await page.locator('.glass-btn').first().evaluate(el => getComputedStyle(el).borderColor.replace(/\s+/g, ''));
  const keylineGold = await resolveColor(page, 'var(--champagne-keyline-gold)');

  expect(borderColor).toBe(keylineGold);
});
