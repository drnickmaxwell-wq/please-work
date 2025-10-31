import { test, expect } from '@playwright/test';

test.describe('Brand lock surface diagnostics', () => {
  test('gradient stack and waves are locked', async ({ page }) => {
    await page.goto('/preview/brand-lock');

    const diagnostics = await page.evaluate(() => {
      const surface = document.querySelector<HTMLElement>('.champagne-surface');
      if (!surface) {
        throw new Error('Champagne surface not found');
      }
      const surfaceStyles = getComputedStyle(surface);
      const rootStyles = getComputedStyle(document.documentElement);
      return {
        backgroundImage: surfaceStyles.backgroundImage,
        backgroundSize: surfaceStyles.backgroundSize,
        backgroundPosition: surfaceStyles.backgroundPosition,
        gradientToken: rootStyles.getPropertyValue('--smh-gradient').replace(/\s+/g, ' ').trim(),
        magenta: rootStyles.getPropertyValue('--smh-magenta').trim(),
        teal: rootStyles.getPropertyValue('--smh-teal').trim(),
      };
    });

    expect(diagnostics.backgroundImage).toContain('linear-gradient(135deg');
    expect(diagnostics.backgroundImage).toMatch(/rgb\(206,\s*75,\s*149\)/);
    expect(diagnostics.backgroundImage).toMatch(/rgb\(85,\s*171,\s*168\)/);
    expect(diagnostics.backgroundImage).toContain('wave-field.svg');
    expect(diagnostics.backgroundImage).toContain('wave-dots.svg');

    expect(diagnostics.backgroundSize.replace(/\s+/g, ' ')).toContain('165% 165%');
    expect(diagnostics.backgroundPosition.replace(/\s+/g, ' ')).toContain('18% 38%');

    expect(diagnostics.gradientToken).toBe('linear-gradient(135deg, var(--smh-magenta) 0%, var(--smh-teal) 100%)');
    expect(diagnostics.magenta.toLowerCase()).toBe('#ce4b95');
    expect(diagnostics.teal.toLowerCase()).toBe('#55aba8');
  });
});
