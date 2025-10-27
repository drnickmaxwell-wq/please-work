import fs from "node:fs";

const MUST = [
  "--smh-primary-magenta:",
  "--smh-primary-teal:",
  "--smh-accent-gold:",
  "--smh-gradient:",
  "--glass-bg-strong:",
];

const css = fs.readFileSync("styles/tokens/smh-champagne-tokens.css","utf8")
          + "\n" + fs.readFileSync("styles/tokens.css","utf8");

const missing = MUST.filter(t => !css.includes(t));
if (missing.length) {
  console.error("Missing required tokens:", missing.join(", "));
  process.exit(1);
}
console.log("Brand tokens verified ✓");
