export const TOKENS = {
  white: 'var(--smh-white)',
  ink: 'var(--ink)',
  text: 'var(--text)',
  graySubtle: 'var(--smh-gray-200)',
  champagne: 'var(--smh-champagne, #f5f5dc)',
  silver: 'var(--smh-silver, #c0c0c0)',
  navy: 'var(--smh-navy-800, #1e293b)',
  urgent: 'var(--smh-urgent, #dc2626)'
} as const;

export type NeutralToken = keyof typeof TOKENS;
