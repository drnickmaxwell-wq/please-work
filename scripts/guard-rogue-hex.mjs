#!/usr/bin/env node
import { execSync } from "node:child_process";
const base = execSync(`git merge-base origin/${process.env.GITHUB_BASE_REF||"main"} HEAD`).toString().trim();
const files = execSync(`git diff --name-only ${base} HEAD`).toString().trim().split("\n").filter(Boolean);
const hexRegex = /#[0-9a-fA-F]{3,8}\b/g;
const allow = ["styles/tokens/", "styles/champagne/manifest.json"];

let failed = false;
for (const f of files) {
  const isAllowed = allow.some(a => f.startsWith(a) || f === a);
  if (isAllowed) continue;
  const diff = execSync(`git diff ${base} HEAD -- ${f}`).toString();
  if (hexRegex.test(diff)) {
    console.error(`❌ Rogue HEX detected in ${f}. Use Champagne tokens instead.`);
    failed = true;
  }
}
if (failed) process.exit(1);
console.log("✅ No rogue HEX outside token files.");
