const neutrals = {
  white: 'var(--smh-white)',
  ink:   'var(--ink)',
  text:  'var(--text)',
  graySubtle: 'var(--smh-gray-200)',
  champagne: 'var(--smh-champagne, var(--brand-gold-keyline))',
  silver: 'var(--smh-silver, color-mix(in oklab, var(--smh-gray-200) 70%, var(--bg) 30%))',
  navy:  'var(--smh-navy-800, color-mix(in oklab, var(--ink) 85%, var(--smh-white) 15%))',
  urgent:'var(--smh-urgent, color-mix(in oklab, var(--brand-magenta) 48%, var(--ink) 52%))',
} as const;
export default neutrals;
