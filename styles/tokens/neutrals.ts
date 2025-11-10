export const TOKENS = {
  white: 'var(--smh-white)',
  ink: 'var(--ink)',
  graySubtle: 'var(--smh-gray-200)',
  champagne: 'color-mix(in oklab, var(--brand-gold) 18%, var(--smh-white) 82%)',
  silver: 'color-mix(in oklab, var(--ink) 12%, var(--smh-white) 88%)',
  navy: 'color-mix(in oklab, var(--ink) 82%, var(--smh-white) 18%)',
  urgent: 'color-mix(in oklab, var(--brand-magenta) 68%, var(--brand-gold) 32%)'
} as const;

export type NeutralToken = keyof typeof TOKENS;
