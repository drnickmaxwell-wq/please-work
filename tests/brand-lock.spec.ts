import { test, expect } from '@playwright/test';

test.describe('Brand lock surface diagnostics', () => {
  test('gradient stack and assets align with Manus Lux canon', async ({ page }) => {
    await page.goto('/preview/brand-lock');

    const diagnostics = await page.evaluate(() => {
      const surface = document.querySelector<HTMLElement>('.champagne-surface, .champagne-surface-lux');
      if (!surface) {
        throw new Error('Champagne surface not found');
      }
      const surfaceStyles = getComputedStyle(surface);
      const rootStyles = getComputedStyle(document.documentElement);
      const gradientImage = surfaceStyles.backgroundImage.trim();
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

      const canonicalizeGradient = (value: string) =>
        value
          .replace(/rgb\([^)]*\)/gi, match => toHex(match))
          .replace(/\s+/g, '')
          .toUpperCase();

      const canonicalizeColor = (value: string) => toHex(value).replace(/\s+/g, '').toUpperCase();

      const normalizedSurfaceGradient = canonicalizeGradient(gradientImage);
      const normalizedTokenGradient = canonicalizeGradient(rootStyles.getPropertyValue('--smh-gradient'));

      const resolveToken = (name: string): string => {
        const value = rootStyles.getPropertyValue(name).trim();
        if (!value) return '';
        const match = value.match(/^var\(([^)]+)\)$/);
        if (match) {
          return resolveToken(match[1].trim());
        }
        return value;
      };

      const stopTokens = ['--smh-grad-stop1', '--smh-grad-stop2', '--smh-grad-stop3'] as const;
      const stopValues = stopTokens.map((token, index) => {
        const resolved = canonicalizeColor(resolveToken(token));
        const suffix = index === 0 ? '0%' : index === 1 ? '60%' : '100%';
        return `${resolved}${suffix}`;
      });

      return {
        normalizedSurfaceGradient,
        normalizedTokenGradient,
        stopValues,
        waveMask: rootStyles.getPropertyValue('--wave-mask').trim(),
        particles: rootStyles.getPropertyValue('--particles').trim(),
        grainDesktop: rootStyles.getPropertyValue('--grain-desktop').trim(),
      };
    });

    expect(diagnostics.normalizedSurfaceGradient).toContain('LINEAR-GRADIENT(');
    expect(diagnostics.normalizedSurfaceGradient).toBe(diagnostics.normalizedTokenGradient);
    diagnostics.stopValues.forEach((stop) => {
      expect(diagnostics.normalizedTokenGradient).toContain(stop);
    });
    expect(diagnostics.waveMask).toContain('/assets/champagne/wave-mask-desktop.webp');
    expect(diagnostics.particles).toContain('/assets/champagne/home-hero-particles.webp');
    expect(diagnostics.grainDesktop).toContain('/assets/champagne/film-grain-desktop.webp');
  });
});
