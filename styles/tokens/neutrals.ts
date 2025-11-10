// No raw hex outside token CSS
export const INK = 'var(--ink)';
export const TEXT = 'var(--text)';
export const WHITE = 'var(--smh-white)';
export const GRAY_200 = 'var(--smh-gray-200)';

export const TOKENS = {
  white: WHITE,
  ink: INK,
  graySubtle: GRAY_200,
  champagne: 'var(--smh-champagne)',
  silver: 'var(--smh-silver)',
  navy: 'var(--smh-navy-800)',
  urgent: 'var(--smh-urgent)'
} as const;

export type NeutralToken = keyof typeof TOKENS;
