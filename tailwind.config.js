/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,mdx}",
    "./styles/**/*.{css}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0d0f",
        gold: "#D4AF37"
      },
      borderRadius: {
        champagne: "var(--champagne-radius)"
      },
      boxShadow: {
        champagne: "var(--champagne-shadow)"
      }
    }
  },
  plugins: []
}
