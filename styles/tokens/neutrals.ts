export const INK = "var(--ink)";
export const TEXT = "var(--text)";
export const BG = "var(--bg)";
export const WHITE = "var(--smh-white)";
export const GRAY_200 = "var(--smh-gray-200)";

// Helpful aliases for components that expect semantic names
export const PRIMARY_INK = "var(--smh-primary-ink)";

export const TOKENS = {
  white: WHITE,
  ink: "var(--smh-ink, var(--smh-primary-ink))",
  graySubtle: GRAY_200,
  champagne: "var(--smh-champagne)",
  silver: "var(--smh-silver)",
  navy: "var(--smh-navy-800)",
  urgent: "var(--smh-urgent)",
} as const;

export type NeutralToken = keyof typeof TOKENS;
