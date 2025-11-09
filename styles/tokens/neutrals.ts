export const neutralInk = 'var(--smh-ink)';
export const neutralWhite = 'var(--smh-white)';
export const neutralText = 'var(--smh-text)';

export const TOKENS = {
  white: neutralWhite,
  ink: neutralInk,
  graySubtle: 'var(--smh-gray-200)',
  champagne: 'var(--smh-champagne)',
  silver: 'var(--smh-silver)',
  navy: 'var(--smh-navy-800)',
  urgent: 'var(--smh-urgent)'
} as const;

export type NeutralToken = keyof typeof TOKENS;
