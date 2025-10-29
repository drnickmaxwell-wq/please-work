/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css}"
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif']
      },
      spacing: {
        8: '2rem',
        12: '3rem',
        16: '4rem',
        24: '6rem'
      }
    }
  },
  safelist: [
    "champagne-surface","champagne-glass","backdrop-blur",
    "md:grid-cols-2","rounded-none","rounded-3xl",
    "from-[var(--smh-gradient)]","bg-[var(--smh-ink)]","text-[var(--smh-text)]"
  ]
};
