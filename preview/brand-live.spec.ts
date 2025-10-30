import { test, expect } from '@playwright/test';

test.describe('SMH Champagne surface lock', () => {
  test('surface + glass baseline remain pristine', async ({ page }) => {
    await page.goto('/preview/brand-live');

    const diagnostics = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const surface = document.querySelector('.champagne-surface') as HTMLElement | null;
      const glass = document.querySelector('.champagne-glass') as HTMLElement | null;
      const computedSurface = surface ? getComputedStyle(surface).backgroundImage.trim() : '';
      const computedGlass = glass ? getComputedStyle(glass).backgroundColor.trim() : '';
      const grain = surface ? getComputedStyle(surface).getPropertyValue('--champagne-grain-alpha').trim() : '';
      const vignette = surface ? getComputedStyle(surface).getPropertyValue('--champagne-vignette-alpha').trim() : '';
      const particles = surface ? getComputedStyle(surface).getPropertyValue('--champagne-particles-alpha').trim() : '';

      return {
        gradient: root.getPropertyValue('--smh-gradient').trim(),
        surface: computedSurface,
        glass: computedGlass,
        grain,
        vignette,
        particles,
      };
    });

    expect(diagnostics.surface.replace(/\s+/g, '')).toBe(diagnostics.gradient.replace(/\s+/g, ''));
    expect(diagnostics.glass).toBe('rgba(0, 0, 0, 0)');
    expect(Number.parseFloat(diagnostics.vignette || '0')).toBe(0);
    expect(Math.abs(Number.parseFloat(diagnostics.grain || '0') - 0.02)).toBeLessThan(0.001);
    expect(Number.parseFloat(diagnostics.particles || '0')).toBe(0);
  });
});
