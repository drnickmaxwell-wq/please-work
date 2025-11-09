#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const HEX_MAP = new Map([
  ["#C2185B", "var(--brand-magenta)"],
  ["#40C4B4", "var(--brand-teal)"],
  ["#2CBFAE", "var(--brand-teal)"],
  ["#D4AF37", "var(--brand-gold)"],
  ["#FFFFFF", "var(--smh-white)"],
  ["#0E1420", "var(--ink)"],
]);

const FREEZE_PREFIXES = [
  "public/assets/champagne/",
  "public/brand/",
  "docs/Brand_Canon_Packet/",
];

function isFrozen(path) {
  return FREEZE_PREFIXES.some((p) => path.startsWith(p));
}

const files = execSync("git ls-files")
  .toString()
  .trim()
  .split("\n")
  .filter(Boolean)
  .filter(
    (p) =>
      p.endsWith(".ts") ||
      p.endsWith(".tsx") ||
      p.endsWith(".css") ||
      p.endsWith(".json"),
  )
  .filter((p) => !p.startsWith("reports/"))
  .filter((p) => !isFrozen(p));

for (const file of files) {
  const src = readFileSync(file, "utf8");
  let out = src;
  for (const [hex, token] of HEX_MAP.entries()) {
    const re = new RegExp(hex.replace("#", "\\#"), "g");
    out = out.replace(re, token);
  }
  if (out !== src) {
    writeFileSync(file, out, "utf8");
    console.log(`Rewrote hex -> tokens: ${file}`);
  }
}
