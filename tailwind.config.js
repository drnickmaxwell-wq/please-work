/** SMH Champagne Lock */
const safelist = [
  'champagne-surface',
  'champagne-glass',
  'rounded-lg',
  'rounded-xl',
  'rounded-2xl',
  'rounded-3xl',
  'grid',
  'md:grid-cols-2',
  'lg:grid-cols-3',
];

module.exports = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './styles/**/*.{css}',
  ],
  safelist,
  theme: {
    extend: {
      fontFamily: {
        serif: ["Playfair Display Variable", "Playfair Display", "serif"],
        sans: ["Inter Variable", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        smh: {
          magenta: "var(--smh-primary-magenta)",
          teal: "var(--smh-primary-teal)",
          gold: "var(--smh-accent-gold)",
          ink: "var(--smh-primary-ink)",
        },
        ink: "rgb(11 13 15)",
      },
      backgroundImage: {
        "smh-gradient": "var(--smh-gradient)",
      },
      boxShadow: {
        champagne: "var(--champagne-pane, 0 8px 24px rgba(0,0,0,.18))",
      },
      borderRadius: {
        champagne: "18px",
      },
    },
  },
  plugins: [],
};
