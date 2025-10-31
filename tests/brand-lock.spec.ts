import { test, expect } from '@playwright/test';

test.describe('Brand lock surface diagnostics', () => {
  test('gradient stack and waves are locked', async ({ page }) => {
    await page.goto('/preview/brand-lock');

    const diagnostics = await page.evaluate(() => {
      const surface = document.querySelector<HTMLElement>('.champagne-surface-lux');
      if (!surface) {
        throw new Error('Champagne surface not found');
      }
      const surfaceStyles = getComputedStyle(surface);
      const rootStyles = getComputedStyle(document.documentElement);
      const gradientImage = surfaceStyles.backgroundImage;
      const normalizedTokenGradient = rootStyles
        .getPropertyValue('--smh-gradient')
        .replace(/\s+/g, '')
        .trim();

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
        const resolved = resolveToken(token).replace(/\s+/g, '').toLowerCase();
        const suffix = index === 0 ? '0%' : index === 1 ? '42%' : '100%';
        return `${resolved}${suffix}`;
      });

      return {
        gradientImage,
        normalizedTokenGradient,
        stopValues,
        waveField: gradientImage.includes('wave-field.svg'),
        waveDots: gradientImage.includes('wave-dots.svg'),
      };
    });

    expect(diagnostics.gradientImage).toContain('linear-gradient');
    const gradientString = diagnostics.normalizedTokenGradient.toLowerCase();
    diagnostics.stopValues.forEach((stop) => {
      expect(gradientString).toContain(stop);
    });
    expect(gradientString.indexOf(diagnostics.stopValues[0])).toBeLessThan(
      gradientString.indexOf(diagnostics.stopValues[1]),
    );
    expect(gradientString.indexOf(diagnostics.stopValues[1])).toBeLessThan(
      gradientString.indexOf(diagnostics.stopValues[2]),
    );

    expect(diagnostics.waveField).toBeTruthy();
    expect(diagnostics.waveDots).toBeTruthy();
  });
});
