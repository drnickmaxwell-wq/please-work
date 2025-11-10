// styles/tokens/neutrals.ts
// Token proxies only — no literal hex allowed.
export const NEUTRALS = {
  paper: 'var(--smh-white)',
  bg: 'var(--bg)',
  ink: 'var(--ink)',
  text: 'var(--text)',
  gray200: 'var(--smh-gray-200)'
} as const;

export type NeutralKey = keyof typeof NEUTRALS;
export const neutral = (k: NeutralKey) => NEUTRALS[k];
