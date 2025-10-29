/** SMH Champagne Lock */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Playfair Display","serif"],
        sans: ["Inter","system-ui","sans-serif"],
      },
      colors: {
        smh: {
          magenta: "var(--smh-primary-magenta)",
          teal: "var(--smh-primary-teal)",
          gold: "var(--smh-accent-gold)",
        }
      },
      backgroundImage: {
        "smh-gradient": "var(--smh-gradient)"
      },
      boxShadow: {
        "champagne-pane": "var(--champagne-pane)"
      }
    }
  },
  plugins: []
};
