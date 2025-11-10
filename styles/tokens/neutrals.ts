// styles/tokens/neutrals.ts
// Canonical neutral aliases that never ship raw hex. 100% token- or mix-based.
// This file must contain zero literal hex values to satisfy guard-rogue-hex.mjs.

const neutrals = {
  white: 'var(--smh-white)',                         // resolves to --bg in canon
  ink: 'var(--ink)',
  text: 'var(--text)',
  graySubtle: 'var(--smh-gray-200)',
  // Use keyline gold as interim champagne fallback (no raw literal)
  champagne: 'var(--smh-champagne, var(--brand-gold-keyline))',
  // Silver approximation from canon neutrals (no raw literal)
  silver: 'var(--smh-silver, color-mix(in oklab, var(--smh-gray-200) 70%, var(--bg) 30%))',
  // Navy approximation from canon neutrals (no raw literal)
  navy: 'var(--smh-navy-800, color-mix(in oklab, var(--ink) 85%, var(--smh-white) 15%))',
  // Urgent tint derived from tokens (no bespoke red literal)
  urgent: 'var(--smh-urgent, color-mix(in oklab, var(--brand-magenta) 48%, var(--ink) 52%))',
} as const;

export default neutrals;
