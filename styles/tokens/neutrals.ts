export const TOKENS = {
  white: 'var(--smh-white, var(--bg))',
  ink: 'var(--smh-ink, var(--smh-primary-ink))',
  graySubtle: 'var(--smh-gray-200, var(--smh-white, var(--bg)))',
  champagne: 'var(--smh-champagne, var(--champagne-keyline-gold, var(--brand-gold-keyline)))',
  silver: 'var(--smh-silver, var(--smh-gray-200, var(--smh-white, var(--bg))))',
  navy: 'var(--smh-navy-800, var(--ink))',
  urgent: 'var(--smh-urgent, var(--smh-warm-rose, var(--brand-magenta)))'
} as const;

export type NeutralToken = keyof typeof TOKENS;
