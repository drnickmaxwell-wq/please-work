import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const manifestPath = path.resolve(__dirname, '../../brand/manus-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const expectedGradient: string = manifest.sections.hero.gradient;

function rgbToHexComponent(value: string): string {
  const n = Math.max(0, Math.min(255, Number(value)));
  return n.toString(16).padStart(2, '0').toUpperCase();
}

function normalizeGradient(value?: string | null): string | null {
  if (!value) return value ?? null;
  let normalized = value.trim();
  normalized = normalized.replace(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d*\.?\d+))?\s*\)/gi, (match, r, g, b, a) => {
    if (typeof a !== 'undefined' && Number(a) !== 1) {
      return match.replace(/\s+/g, ' ');
    }
    return `#${rgbToHexComponent(r)}${rgbToHexComponent(g)}${rgbToHexComponent(b)}`;
  });
  normalized = normalized.replace(/\s+/g, ' ');
  normalized = normalized.replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');
  normalized = normalized.replace(/\s*,\s*/g, ',');
  return normalized;
}

async function ensureScreenshot(page, slug: string) {
  const screenshotDir = path.resolve(process.cwd(), 'reports', 'screenshots');
  await fs.promises.mkdir(screenshotDir, { recursive: true });
  const screenshotPath = path.join(screenshotDir, `manus-${slug}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  await test.info().attach(`screenshot-${slug}`, {
    path: screenshotPath,
    contentType: 'image/png',
  });
}

type SurfaceResult = {
  gradient: string | null;
};

async function readSurfaceGradient(page: Page): Promise<string | null> {
  const data = await page.evaluate<SurfaceResult | null>(() => {
    const selectors = ['.champagne-surface', '.champagne-surface-lux', 'main', 'body'];
    let element: Element | null = null;
    for (const selector of selectors) {
      if (selector === 'body') {
        element = document.body;
      } else {
        const candidate = document.querySelector(selector);
        if (candidate) {
          element = candidate;
        }
      }
      if (element) break;
    }
    if (!element) return null;

    const style = window.getComputedStyle(element);
    return {
      gradient: style.backgroundImage,
    };
  });

  return data ? data.gradient : null;
}

const normalizedExpected = normalizeGradient(expectedGradient) ?? '';

const routes = [
  { name: 'home', slug: 'home', path: '/' },
  { name: 'brand lock', slug: 'brand-lock', path: '/preview/brand-lock' },
];

test.describe('Manus gradient smoke check', () => {
  for (const route of routes) {
    test(`${route.name} gradient matches Manus manifest`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: 'networkidle' });
      await page.waitForTimeout(250);
      const gradient = await readSurfaceGradient(page);
      const normalizedActual = normalizeGradient(gradient) ?? '';

      const gradientsMatch = normalizedActual === normalizedExpected;

      if (!gradientsMatch) {
        await ensureScreenshot(page, route.slug);
        test.fail(true, 'Manus gradient mismatch');
      }

      await expect.soft(normalizedActual).toBe(normalizedExpected);
    });
  }
});
