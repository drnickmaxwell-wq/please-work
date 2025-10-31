import { test, expect } from '@playwright/test';

const EXPECTED_GRADIENT = 'linear-gradient(135deg, #C2185B 0%, #40C4B4 60%, #D4AF37 100%)';

test('brand lock exposes Manus gradient and keyline gold', async ({ page }) => {
  await page.goto('/preview/brand-lock');

  const tokens = await page.evaluate(() => {
    const styles = getComputedStyle(document.documentElement);
    const normalize = (value) => value.trim().replace(/\s+/g, ' ');
    const toHex = (channel) => Number(channel).toString(16).padStart(2, '0').toUpperCase();

    const rawGradient = normalize(styles.getPropertyValue('--smh-gradient'));
    const expandedGradient = rawGradient
      .replace(/var\(--brand-magenta\)/g, normalize(styles.getPropertyValue('--brand-magenta')))
      .replace(/var\(--brand-teal\)/g, normalize(styles.getPropertyValue('--brand-teal')))
      .replace(/var\(--brand-gold\)/g, normalize(styles.getPropertyValue('--brand-gold')));

    const gradientHex = normalize(expandedGradient).replace(
      /rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/g,
      (_, r, g, b) => `#${toHex(r)}${toHex(g)}${toHex(b)}`
    );

    const keylineRaw = normalize(styles.getPropertyValue('--champagne-keyline-gold'));
    const varMatch = keylineRaw.match(/^var\((--[^)]+)\)$/);
    const keyline = varMatch ? normalize(styles.getPropertyValue(varMatch[1])) : keylineRaw;

    return { rawGradient, gradientHex, keyline };
  });

  expect(tokens.gradientHex).toBe(EXPECTED_GRADIENT);
  // rgb() canonical equivalent for #C2185B, #40C4B4, #D4AF37
  expect(tokens.rawGradient).toContain('linear-gradient(135deg');
  expect(tokens.rawGradient).toMatch(/rgb\(\s*194,\s*24,\s*91\s*\)\s*0%/);
  expect(tokens.rawGradient).toMatch(/rgb\(\s*64,\s*196,\s*180\s*\)\s*60%/);
  expect(tokens.rawGradient).toMatch(/rgb\(\s*212,\s*175,\s*55\s*\)\s*100%/);

  expect(tokens.keyline.replace(/\s+/g, '').toUpperCase()).toBe('#F9E8C3');
});
