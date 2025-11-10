#!/usr/bin/env node
import { execSync } from "node:child_process";
import micromatch from "micromatch";
import { sacredHeroGlobs } from "./sacred-hero-globs.mjs";

const allowOverride = process.env.ALLOW_HERO_CHANGES === "1";

const baseRef = process.env.BASE_SHA || "origin/main";
let changedFilesOutput = "";

try {
  changedFilesOutput = execSync(
    `git diff --name-only --diff-filter=AMR ${baseRef}...HEAD`,
    { stdio: ["ignore", "pipe", "pipe"] }
  )
    .toString()
    .trim();
} catch (error) {
  console.error("Failed to determine changed files against base ref:", baseRef);
  console.error(error.message ?? error);
  process.exit(allowOverride ? 0 : 1);
}

const changedFiles = changedFilesOutput
  ? changedFilesOutput.split("\n").filter(Boolean)
  : [];

const sacredChanges = micromatch(changedFiles, sacredHeroGlobs, { dot: true });

if (sacredChanges.length === 0) {
  console.log("✅ No sacred hero files were modified.");
  process.exit(0);
}

if (allowOverride) {
  console.warn("WARN sacred hero files changed but ALLOW_HERO_CHANGES=1; proceeding.");
  for (const file of sacredChanges) {
    console.warn(` - ${file}`);
  }
  process.exit(0);
}

console.error("Error: sacred hero files were modified. Move this change to a hero-approved branch.");
for (const file of sacredChanges) {
  console.error(` - ${file}`);
}
process.exit(1);
