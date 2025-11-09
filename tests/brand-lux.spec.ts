import { test, expect, type Page } from "@playwright/test";

async function getVar(page: Page, selector: string, varName: string) {
  return await page.$eval(
    selector,
    (el, name) =>
      getComputedStyle(el as HTMLElement).getPropertyValue(name as string).trim(),
    varName,
  );
}

test("canonical gradient and keyline gold are present", async ({ page }) => {
  await page.goto("/preview/brand-lock");

  const gradient = await getVar(page, ":root", "--smh-gradient");
  expect(gradient).toMatch(/linear-gradient/i);
  expect(gradient).toMatch(/135deg/);

  const accentGold = await getVar(page, ":root", "--smh-accent-gold");
  expect(accentGold).not.toEqual("");

  await page.goto("/preview/brand-live");
  const borderColor = await page
    .locator(".glass-btn")
    .first()
    .evaluate((el) => getComputedStyle(el as HTMLElement).borderColor.trim());

  expect(borderColor).toMatch(/rgb\s*\(/i);
  expect(borderColor).not.toMatch(/rgba?\(\s*0\s*,\s*0\s*,\s*0\s*(?:,\s*0\s*)?\)/i);
});
