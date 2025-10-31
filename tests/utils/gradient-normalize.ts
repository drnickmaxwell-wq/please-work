export function normalizeGradient(s: string): string {
  if (!s) return '';
  const x = s
    .toLowerCase()
    .replace(/\s+/g, '')                // strip whitespace
    .replace(/#([0-9a-f]{6})/g, (m, hex) => m)  // keep hex as-is
    .replace(/rgb\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/g, (_, r, g, b) => {
      const toHex = (n:number)=>Number(n).toString(16).padStart(2,'0');
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    });
  return x;
}
