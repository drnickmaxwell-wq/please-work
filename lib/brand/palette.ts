export const SMH_BRAND_COLOR_TOKENS = {
  magenta: '--smh-primary-magenta',
  teal: '--smh-primary-teal',
  gold: '--smh-accent-gold',
} as const;

type BrandColorName = keyof typeof SMH_BRAND_COLOR_TOKENS;

export const SMH_BRAND_COLOR_FALLBACKS: Record<BrandColorName, string> = {
  magenta: '#C2185B',
  teal: '#40C4B4',
  gold: '#D4AF37',
};

export const SMH_BRAND_COLOR_VARIABLES: Record<BrandColorName, string> = {
  magenta: `var(${SMH_BRAND_COLOR_TOKENS.magenta})`,
  teal: `var(${SMH_BRAND_COLOR_TOKENS.teal})`,
  gold: `var(${SMH_BRAND_COLOR_TOKENS.gold})`,
};

export function getBrandColor(name: BrandColorName): string {
  if (typeof window === 'undefined') {
    return SMH_BRAND_COLOR_FALLBACKS[name];
  }

  const token = SMH_BRAND_COLOR_TOKENS[name];
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(token)
    .trim();

  return value || SMH_BRAND_COLOR_FALLBACKS[name];
}
