// styles/tokens/neutrals.ts
// Canonical neutral aliases that never ship raw hex. 100% token- or mix-based.
// This file must contain zero literal hex values to satisfy guard-rogue-hex.mjs.

const neutrals = {
  white: 'var(--smh-white)',            // resolves to var(--bg)
  ink: 'var(--ink)',
  text: 'var(--text)',

  graySubtle: 'var(--smh-gray-200)',

  // Champagne surface: until dedicated token minted, fall back to keyline gold token (no hex)
  champagne: 'var(--smh-champagne, var(--brand-gold-keyline))',

  // Silver: token or token mix (no literals)
  silver: 'var(--smh-silver, color-mix(in oklab, var(--smh-gray-200) 70%, var(--bg) 30%))',

  // Navy: token or token mix (no literals)
  navy: 'var(--smh-navy-800, color-mix(in oklab, var(--ink) 85%, var(--smh-white) 15%))',

  // Urgent: derived from tokens (no bespoke red)
  urgent: 'var(--smh-urgent, color-mix(in oklab, var(--brand-magenta) 48%, var(--ink) 52%))',
} as const;

export default neutrals;
