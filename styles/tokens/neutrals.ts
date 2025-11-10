// styles/tokens/neutrals.ts
// Canonical neutral aliases that never ship raw hex.
// All backups reference other tokens or color-mix of tokens.
// This file is audited by scripts/guard-rogue-hex.mjs

const neutrals = {
  // Canonical white/ink/text come straight from the brand tokens.
  white: 'var(--smh-white)',            // resolves to var(--bg) in canon
  ink: 'var(--ink)',
  text: 'var(--text)',

  // Subtle gray uses the named neutral token directly.
  graySubtle: 'var(--smh-gray-200)',

  // Champagne surface: use dedicated token; fall back to keyline gold if unset.
  champagne: 'var(--smh-champagne, var(--brand-gold-keyline))',

  // Silver: approximate via token blend (no literals).
  silver: 'var(--smh-silver, color-mix(in oklab, var(--smh-gray-200) 70%, var(--bg) 30%))',

  // Navy 800: derive from ink + white so fallback remains tokenized.
  navy: 'var(--smh-navy-800, color-mix(in oklab, var(--ink) 85%, var(--smh-white) 15%))',

  // Urgent: derive from brand magenta + ink for accessibility while avoiding bespoke reds.
  urgent: 'var(--smh-urgent, color-mix(in oklab, var(--brand-magenta) 48%, var(--ink) 52%))',
} as const;

export default neutrals;
