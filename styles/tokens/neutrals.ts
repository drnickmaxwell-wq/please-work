export const TOKENS = {
  white: 'var(--smh-white, #FFFFFF)',
  ink: 'var(--smh-ink, #0b0d0f)',
  graySubtle: 'var(--smh-gray-200, #e5e7eb)',
} as const;

type NeutralKey = keyof typeof TOKENS;

const VARIABLE_NAMES: Record<NeutralKey, string> = Object.fromEntries(
  Object.entries(TOKENS).map(([key, value]) => {
    const match = value.match(/var\(([^,\s)]+)/i);
    return [key, match ? match[1] : value];
  })
) as Record<NeutralKey, string>;

const FALLBACKS: Record<NeutralKey, string> = Object.fromEntries(
  Object.entries(TOKENS).map(([key, value]) => {
    const match = value.match(/var\([^,]+,\s*([^)]+)\)/i);
    return [key, match ? match[1].trim() : value];
  })
) as Record<NeutralKey, string>;

export function resolveNeutralColor(token: NeutralKey): string {
  if (typeof window === 'undefined') {
    return FALLBACKS[token];
  }

  const resolved = getComputedStyle(document.documentElement)
    .getPropertyValue(VARIABLE_NAMES[token])
    .trim();

  return resolved || FALLBACKS[token];
}

export function getNeutralVariable(token: NeutralKey): string {
  return VARIABLE_NAMES[token];
}
