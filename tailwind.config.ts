import type { Config } from "tailwindcss";

const safelist = [
  "champagne-surface",
  "champagne-glass",
  "rounded-champagne",
  "shadow-champagne",
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
  "py-24",
  "md:py-32",
  "rounded-full",
  "border",
];

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{css,scss}",
  ],
  safelist,
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Playfair Display Variable'", "'Playfair Display'", "serif"],
        sans: ["'Inter Variable'", "'Inter'", "system-ui", "sans-serif"],
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
} satisfies Config;

export default config;
