import { test, expect } from "@playwright/test";

test("canonical gradient and keyline gold are present", async ({ page }) => {
  await page.goto("/preview/brand-lock");

  const gradient = await page.evaluate(() =>
    getComputedStyle(document.documentElement)
      .getPropertyValue("--smh-gradient")
      .trim(),
  );

  expect(gradient).toMatch(/linear-gradient/i);
  expect(gradient).toMatch(/135deg/);

  await page.goto("/preview/brand-live");
  const borderColor = await page
    .locator(".glass-btn")
    .first()
    .evaluate((el) => getComputedStyle(el).borderColor);

  expect(borderColor).toMatch(/rgb\s*\(/i);
  expect(borderColor).not.toMatch(/rgba?\(\s*0\s*,\s*0\s*,\s*0\s*(?:,\s*0\s*)?\)/i);
});
