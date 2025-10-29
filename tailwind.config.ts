import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './styles/**/*.{css}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      spacing: {
        8: '2rem',
        12: '3rem',
        16: '4rem',
        24: '6rem',
      },
    },
  },
  safelist: [
    'champagne-surface',
    'champagne-glass',
    'rounded-2xl',
    'md:grid-cols-2',
    'lg:grid-cols-3',
    'rounded-none',
    'rounded-[0px]',
  ],
};

export default config;
