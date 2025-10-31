import { test, expect } from '@playwright/test';

test.describe('SMH Champagne surface lock', () => {
  test('surface + glass baseline remain pristine', async ({ page }) => {
    const baseURL = process.env.BRAND_PREVIEW_URL ?? 'http://127.0.0.1:3000';
    await page.goto(new URL('/preview/brand-live', baseURL).toString());

    const diagnostics = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const surface = document.querySelector('.champagne-surface-lux') as HTMLElement | null;
      const glass = document.querySelector('.champagne-glass') as HTMLElement | null;
      const surfaceStyles = surface ? getComputedStyle(surface) : null;
      const backgroundImage = surfaceStyles?.backgroundImage.trim() ?? '';
      const normalize = (value: string) => value.replace(/\s+/g, '').toLowerCase();

      return {
        backgroundImage,
        backgroundNormalized: normalize(backgroundImage.split(/,(.+)/)[0] ?? ''),
        gradientToken: normalize(root.getPropertyValue('--smh-gradient').trim()),
        canonicalGradient:
          'linear-gradient(var(--smh-grad-angle),var(--smh-grad-stop1)0%,var(--smh-grad-stop2)42%,var(--smh-grad-stop3)100%)',
        glass: glass ? getComputedStyle(glass).backgroundColor.trim() : '',
        grain: surfaceStyles?.getPropertyValue('--champagne-grain-alpha').trim() ?? '',
        grainToken: root.getPropertyValue('--champagne-grain-alpha').trim(),
        vignette: surfaceStyles?.getPropertyValue('--champagne-vignette-alpha').trim() ?? '',
        vignetteToken: root.getPropertyValue('--champagne-vignette-alpha').trim(),
        particles: surfaceStyles?.getPropertyValue('--champagne-particles-alpha').trim() ?? '',
        particlesToken: root.getPropertyValue('--champagne-particles-alpha').trim(),
      };
    });

    expect(diagnostics.gradientToken).toBe(diagnostics.canonicalGradient);
    expect(diagnostics.backgroundImage.toLowerCase()).toContain('linear-gradient');
    expect(diagnostics.backgroundImage.toLowerCase()).toContain('wave-field.svg');
    expect(diagnostics.backgroundImage.toLowerCase()).toContain('wave-dots.svg');
    expect(diagnostics.glass).toBe('rgba(0, 0, 0, 0)');
    expect(diagnostics.vignette).toBe(diagnostics.vignetteToken);
    expect(diagnostics.grain).toBe(diagnostics.grainToken);
    expect(diagnostics.particles).toBe(diagnostics.particlesToken);
  });
});
