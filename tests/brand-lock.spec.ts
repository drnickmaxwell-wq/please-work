import { test, expect } from '@playwright/test';

test.describe('Brand lock surface diagnostics', () => {
  test('gradient + wave assets stay canonical', async ({ page }) => {
    const baseURL = process.env.BRAND_PREVIEW_URL ?? 'http://127.0.0.1:3000';
    await page.goto(new URL('/preview/brand-lock', baseURL).toString());
    await page.waitForSelector('.champagne-surface-lux');

    const diagnostics = await page.evaluate(() => {
      const surface = document.querySelector('.champagne-surface-lux') as HTMLElement | null;
      if (!surface) {
        throw new Error('champagne-surface-lux not found');
      }
      const surfaceStyles = getComputedStyle(surface);
      const rootStyles = getComputedStyle(document.documentElement);
      const normalize = (value: string) => value.replace(/\s+/g, '').toLowerCase();

      const sizeLayers = surfaceStyles.backgroundSize.split(',').map((value) => value.trim());
      const positionLayers = surfaceStyles.backgroundPosition.split(',').map((value) => value.trim());
      const normalizeToken = (value: string) => value.replace(/\s+/g, '').toLowerCase();

      return {
        backgroundImage: surfaceStyles.backgroundImage,
        backgroundSizeLayers: sizeLayers,
        backgroundPositionLayers: positionLayers,
        gradientToken: normalize(rootStyles.getPropertyValue('--smh-gradient').trim()),
        sizeToken: rootStyles.getPropertyValue('--smh-bg-size').trim(),
        positionToken: rootStyles.getPropertyValue('--smh-bg-pos').trim(),
        stop1Token: normalizeToken(rootStyles.getPropertyValue('--smh-grad-stop1').trim()),
        stop2Token: normalizeToken(rootStyles.getPropertyValue('--smh-grad-stop2').trim()),
        stop3Token: normalizeToken(rootStyles.getPropertyValue('--smh-grad-stop3').trim()),
      };
    });

    expect(diagnostics.backgroundImage.toLowerCase()).toContain('linear-gradient');
    expect(diagnostics.backgroundImage.toLowerCase()).toContain('wave-field.svg');
    expect(diagnostics.backgroundImage.toLowerCase()).toContain('wave-dots.svg');

    expect(diagnostics.gradientToken.startsWith('linear-gradient')).toBe(true);
    const firstStop = diagnostics.gradientToken.indexOf(diagnostics.stop1Token);
    const secondStop = diagnostics.gradientToken.indexOf(diagnostics.stop2Token);
    const thirdStop = diagnostics.gradientToken.lastIndexOf(diagnostics.stop3Token);
    expect(firstStop).toBeGreaterThanOrEqual(0);
    expect(secondStop).toBeGreaterThan(firstStop);
    expect(thirdStop).toBeGreaterThan(secondStop);

    expect(diagnostics.backgroundSizeLayers[0]).toBe(diagnostics.sizeToken);
    expect(diagnostics.backgroundPositionLayers[0]).toBe(diagnostics.positionToken);
  });
});
