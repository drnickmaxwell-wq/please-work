import { test, expect } from '@playwright/test';

/** Allow HEX or RGB for each stop, normalize spacing, and assert 135deg + stops. */
test('canonical gradient and keyline gold are present', async ({ page }) => {
  await page.goto('/preview/brand-lock');

  // Pull the computed background-image from the main surface element
  const resolved = await page.evaluate(() => {
    const el = document.querySelector('[data-brand-surface]') || document.body;
    return getComputedStyle(el).backgroundImage.trim();
  });

  // Build a tolerant regex: accepts either rgb(...) or #hex for each stop
  const stop1 = '(?:rgb\\(\\s*194\\s*,\\s*24\\s*,\\s*91\\s*\\)|#c2185b)';
  const stop2 = '(?:rgb\\(\\s*64\\s*,\\s*196\\s*,\\s*180\\s*\\)|#40c4b4)';
  const stop3 = '(?:rgb\\(\\s*212\\s*,\\s*175\\s*,\\s*55\\s*\\)|#d4af37)';
  const gradientRx = new RegExp(
    `linear-gradient\\(\\s*135deg\\s*,\\s*${stop1}\\s*0%\\s*,\\s*${stop2}\\s*60%\\s*,\\s*${stop3}\\s*100%\\s*\\)`,
    'i'
  );

  expect(resolved.replace(/\s+/g, ' ')).toMatch(gradientRx);

  // Extra gold presence check (tolerant to rgb/hex anywhere in the style stack)
  const styleDump = await page.evaluate(() => {
    const el = document.querySelector('[data-brand-surface]') || document.body;
    const cs = getComputedStyle(el);
    return [
      cs.background,
      cs.backgroundImage,
      cs.backgroundColor,
      cs.borderColor,
      cs.boxShadow
    ].join(' | ').toLowerCase();
  });
  expect(styleDump).toMatch(/#d4af37|rgb\\(\\s*212\\s*,\\s*175\\s*,\\s*55\\s*\\)/i);
});
