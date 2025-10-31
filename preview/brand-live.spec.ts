import { test, expect } from '@playwright/test';

test.describe('SMH Champagne surface lock', () => {
  test('surface + glass baseline remain pristine', async ({ page }) => {
    await page.goto('/preview/brand-live');

    const diagnostics = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const surface = document.querySelector('.champagne-surface, .champagne-surface-lux') as HTMLElement | null;
      const glass = document.querySelector('.champagne-glass') as HTMLElement | null;
      const surfaceStyles = surface ? getComputedStyle(surface) : null;
      const computedSurface = surfaceStyles?.backgroundImage.trim() ?? '';

      const extractGradient = (value: string) => {
        const lower = value.toLowerCase();
        const start = lower.indexOf('linear-gradient(');
        if (start === -1) return '';
        let depth = 0;
        for (let i = start; i < value.length; i += 1) {
          const char = value[i];
          if (char === '(') {
            depth += 1;
          } else if (char === ')') {
            depth -= 1;
            if (depth === 0) {
              return value.slice(start, i + 1);
            }
          }
        }
        return '';
      };

      const toHex = (value: string) => {
        const match = value.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
        if (!match) return value;
        const [, r, g, b] = match;
        const hex = [r, g, b]
          .map(component => Number.parseInt(component, 10).toString(16).padStart(2, '0'))
          .join('')
          .toUpperCase();
        return `#${hex}`;
      };

      const canonicalize = (value: string) =>
        value
          .replace(/rgb\([^)]*\)/gi, match => toHex(match))
          .replace(/\s+/g, '')
          .toUpperCase();

      const gradient = canonicalize(root.getPropertyValue('--smh-gradient'));
      const surfaceGradient = extractGradient(computedSurface);
      const firstGradient = surfaceGradient ? canonicalize(surfaceGradient) : '';
      const computedGlass = glass ? getComputedStyle(glass).backgroundColor.trim() : 'rgba(0, 0, 0, 0)';
      const grain = surfaceStyles?.getPropertyValue('--smh-grain-alpha').trim() ?? '';
      const vignette = surfaceStyles?.getPropertyValue('--smh-vignette-alpha').trim() ?? '';
      const particles = surfaceStyles?.getPropertyValue('--smh-particles-alpha').trim() ?? '';

      return {
        gradient,
        surfaceGradient: firstGradient,
        surface: computedSurface,
        glass: computedGlass,
        grain,
        vignette,
        particles,
      };
    });

    expect(diagnostics.surfaceGradient).toContain('LINEAR-GRADIENT(135DEG');
    ['#C2185B0%', '#40C4B460%', '#D4AF37100%'].forEach(stop => {
      expect(diagnostics.surfaceGradient).toContain(stop);
    });
    expect(diagnostics.glass).toBe('rgba(0, 0, 0, 0)');
    expect(Math.abs(Number.parseFloat(diagnostics.vignette || '0') - 0.06)).toBeLessThan(0.001);
    expect(Math.abs(Number.parseFloat(diagnostics.grain || '0') - 0.04)).toBeLessThan(0.001);
    expect(Math.abs(Number.parseFloat(diagnostics.particles || '0') - 0.06)).toBeLessThan(0.001);
  });
});
