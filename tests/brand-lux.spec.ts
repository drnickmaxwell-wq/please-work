import { test, expect } from '@playwright/test';

test('canonical gradient and keyline gold are present', async ({ page }) => {
  await page.goto('/preview/brand-lock');

  const gradientCheck = await page.evaluate(() => {
    const normalize = (value: string) => value.replace(/\s+/g, '');

    const readTokenColor = (token: string) => {
      const probe = document.createElement('div');
      probe.style.color = `var(${token})`;
      probe.style.position = 'absolute';
      probe.style.opacity = '0';
      document.body.append(probe);
      const computed = getComputedStyle(probe).color;
      probe.remove();
      return normalize(computed);
    };

    const surface = document.createElement('div');
    surface.style.backgroundImage = 'var(--smh-gradient)';
    surface.style.position = 'absolute';
    surface.style.opacity = '0';
    document.body.append(surface);
    const background = normalize(getComputedStyle(surface).backgroundImage);
    surface.remove();

    const gradientVar = normalize(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--smh-gradient')
        .trim(),
    );

    return {
      gradientVar,
      background,
      gold: readTokenColor('--smh-accent-gold'),
      magenta: readTokenColor('--smh-primary-magenta'),
      teal: readTokenColor('--smh-primary-teal'),
    };
  });

  expect(gradientCheck.gradientVar).toContain('linear-gradient(135deg');
  expect(gradientCheck.background).toContain(gradientCheck.magenta);
  expect(gradientCheck.background).toContain(gradientCheck.teal);
  expect(gradientCheck.background).toContain(gradientCheck.gold);

  await page.goto('/preview/brand-live');
  const borderCheck = await page.evaluate(() => {
    const button = document.querySelector<HTMLElement>('.glass-btn');
    if (!button) {
      return null;
    }

    const normalize = (value: string) => value.replace(/\s+/g, '');
    const computed = getComputedStyle(button).borderColor;

    const probe = document.createElement('div');
    probe.style.color = 'var(--smh-accent-gold)';
    probe.style.position = 'absolute';
    probe.style.opacity = '0';
    document.body.append(probe);
    const tokenColor = getComputedStyle(probe).color;
    probe.remove();

    return {
      border: normalize(computed),
      token: normalize(tokenColor),
    };
  });

  expect(borderCheck).not.toBeNull();
  expect(borderCheck?.border).toBe(borderCheck?.token);
});
