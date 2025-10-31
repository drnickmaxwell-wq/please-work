import { test, expect } from '@playwright/test';

test.describe('SMH Champagne surface lock', () => {
  test('surface + glass baseline remain pristine', async ({ page }) => {
    await page.goto('/preview/brand-live');

    const diagnostics = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const surface = document.querySelector('.champagne-surface') as HTMLElement | null;
      const glass = document.querySelector('.champagne-glass') as HTMLElement | null;
      const surfaceStyles = surface ? getComputedStyle(surface) : null;
      const computedSurface = surfaceStyles?.backgroundImage.trim() ?? '';
      const gradientMatch = computedSurface.match(/linear-gradient\([^)]*\))/i);
      const firstGradient = gradientMatch ? gradientMatch[0].replace(/\s+/g, '') : '';
      const computedGlass = glass ? getComputedStyle(glass).backgroundColor.trim() : '';
      const grain = surfaceStyles?.getPropertyValue('--smh-grain-alpha').trim() ?? '';
      const vignette = surfaceStyles?.getPropertyValue('--smh-vignette-alpha').trim() ?? '';
      const particles = surfaceStyles?.getPropertyValue('--smh-particles-alpha').trim() ?? '';

      return {
        gradient: root.getPropertyValue('--smh-gradient').replace(/\s+/g, ' ').trim(),
        surfaceGradient: firstGradient ?? '',
        surface: computedSurface,
        glass: computedGlass,
        grain,
        vignette,
        particles,
        magenta: root.getPropertyValue('--smh-magenta').trim(),
        teal: root.getPropertyValue('--smh-teal').trim(),
      };
    });

    expect(diagnostics.gradient).toBe('linear-gradient(135deg, var(--smh-magenta) 0%, var(--smh-teal) 100%)');
    expect(diagnostics.surfaceGradient).toContain('linear-gradient(135deg');
    expect(diagnostics.surfaceGradient).toMatch(/rgb\(206,\s*75,\s*149\)/);
    expect(diagnostics.surfaceGradient).toMatch(/rgb\(85,\s*171,\s*168\)/);
    expect(diagnostics.magenta.toLowerCase()).toBe('#ce4b95');
    expect(diagnostics.teal.toLowerCase()).toBe('#55aba8');
    expect(diagnostics.glass).toBe('rgba(0, 0, 0, 0)');
    expect(Math.abs(Number.parseFloat(diagnostics.vignette || '0') - 0.06)).toBeLessThan(0.001);
    expect(Math.abs(Number.parseFloat(diagnostics.grain || '0') - 0.04)).toBeLessThan(0.001);
    expect(Math.abs(Number.parseFloat(diagnostics.particles || '0') - 0.06)).toBeLessThan(0.001);
  });
});
