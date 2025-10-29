/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css}"
  ],
  theme: { extend: {} },
  safelist: [
    "champagne-surface","champagne-glass","backdrop-blur",
    "md:grid-cols-2","rounded-none","rounded-3xl",
    "from-[var(--smh-gradient)]","bg-[var(--smh-ink)]","text-[var(--smh-text)]"
  ]
};
