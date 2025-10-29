/** SMH Champagne Lock */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  safelist: [
    "backdrop-blur-md",
    "bg-ink/40",
    "grid",
    "md:grid-cols-2",
    "lg:grid-cols-3",
    "gap-8",
    "max-w-7xl",
    "mx-auto",
    "px-4",
    "md:px-6",
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
