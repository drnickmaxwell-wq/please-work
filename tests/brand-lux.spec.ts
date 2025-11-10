import { test, expect } from '@playwright/test';

test('canonical gradient and keyline gold are token driven', async ({ page }) => {
  await page.goto('/preview/brand-lock');

  const gradientToken = await page.evaluate(() =>
    getComputedStyle(document.documentElement)
      .getPropertyValue('--smh-gradient')
      .trim(),
  );

  expect(gradientToken).not.toBe('');
  expect(gradientToken).toMatch(/linear-gradient/i);

  await page.goto('/preview/brand-live');

  const match = await page.evaluate(() => {
    const button = document.querySelector<HTMLElement>('.glass-btn');
    if (!button) {
      return null;
    }

    const computed = getComputedStyle(button);
    const border = computed.borderTopColor;

    const probe = document.createElement('div');
    probe.style.color = 'var(--brand-gold-keyline)';
    probe.style.position = 'absolute';
    probe.style.opacity = '0';
    probe.style.pointerEvents = 'none';
    document.body.append(probe);
    const tokenColor = getComputedStyle(probe).color;
    probe.remove();

    return { border, tokenColor };
  });

  expect(match).not.toBeNull();
  expect(match?.border).toBe(match?.tokenColor);

  const cta = page.locator('.glass-btn').first();
  await cta.hover();
  await expect(cta).toHaveCSS('background-image', /var\(--smh-gradient\)|linear-gradient/i);
});
