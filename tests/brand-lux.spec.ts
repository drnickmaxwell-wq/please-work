import { describe, it, expect } from 'vitest';
import { normalizeGradient } from './utils/gradient-normalize';
import fs from 'node:fs';

describe('canonical gradient and keyline gold are present', () => {
  it('matches Manus canon', async () => {
    // Canonical 3-stop gradient from tokens/manifest (do not inline hex elsewhere)
    const canon = 'linear-gradient(135deg,#c2185b 0%,#40c4b4 60%,#d4af37 100%)';
    // scripts/verify-hue.cjs should log or write the live computed gradient:
    const live = fs.readFileSync('reports/brand-live.json','utf8');
    const json = JSON.parse(live);
    const liveGradient = json?.surface?.gradient || '';

    expect(normalizeGradient(liveGradient)).toContain(normalizeGradient(canon));
    // Also assert keyline gold is present in tokens
    const tokens = fs.readFileSync('styles/tokens/smh-champagne-tokens.css','utf8');
    expect(tokens).toMatch(/--smh-accent-gold\s*:\s*(?:var\(--brand-gold\)|#d4af37)/i);
  });
});
