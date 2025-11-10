// styles/tokens/neutrals.ts
// Token-only neutral palette exports for consumption in TS/JS.
// IMPORTANT: strings reference CSS variables; no #hex here.

export const TOKENS = {
  white: 'var(--smh-white)',
  ink: 'var(--ink)',
  graySubtle: 'var(--smh-gray-200)',
  champagne: 'var(--smh-champagne)',
  silver: 'var(--smh-silver)',
  navy: 'var(--smh-navy-800)',
  urgent: 'var(--smh-urgent)',
} as const;

export type NeutralToken = keyof typeof TOKENS;

export const Neutrals = {
  ink: TOKENS.ink,
  text: 'var(--text)',
  bg: 'var(--bg)',
  white: TOKENS.white,
  gray200: TOKENS.graySubtle,
} as const;

export default Neutrals;
