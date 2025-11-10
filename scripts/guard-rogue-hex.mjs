#!/usr/bin/env node
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import micromatch from "micromatch";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Add or update this list of canonical files that are allowed to contain literal hex.
// These are definitions, constants, or historical manifests — not UI surfaces.
const CANONICAL_ALLOW = [
  /styles\/tokens\/smh-champagne-tokens\.css$/,
  /scripts\/brand-guard\.cjs$/,
  /scripts\/brand-lock-guard\.cjs$/,
  /scripts\/brand-report\.cjs$/,
  /brand\/hue-lock\.json$/,
  /brand\/champagne_machine_manifest_full\.json$/,
  // tests & snapshots should never break CI for hex literals in comments/fixtures
  /tests\/.*\.spec\.(t|j)sx?$/,
  /tests\/.*__snapshots__\/.*$/,
];

const allowConfigPath = resolve(__dirname, "guard-rogue-hex.allow.json");
const allowConfig = JSON.parse(readFileSync(allowConfigPath, "utf8"));
const allowGlobs = allowConfig.allow ?? [];
const allowExtensions = new Set(allowConfig.allowExtensions ?? []);
const warnOnlyExtensions = new Set(allowConfig.warnOnlyExtensions ?? []);

function allowListStatus(filePath) {
  if (CANONICAL_ALLOW.some((re) => re.test(filePath))) {
    return "canonical";
  }
  if (allowGlobs.length && micromatch.isMatch(filePath, allowGlobs)) {
    return "config";
  }
  return null;
}

function isAllowListed(filePath) {
  return allowListStatus(filePath) !== null;
}

const targetBase = process.env.GITHUB_BASE_REF || "main";
const base = (() => {
  const candidates = [`origin/${targetBase}`, targetBase];
  for (const candidate of candidates) {
    try {
      return execSync(`git merge-base ${candidate} HEAD 2>/dev/null`)
        .toString()
        .trim();
    } catch (error) {
      // try next candidate
    }
  }
  try {
    return execSync("git rev-parse HEAD^ 2>/dev/null").toString().trim();
  } catch (error) {
    // fall back to repository root commit
  }
  const roots = execSync("git rev-list --max-parents=0 HEAD")
    .toString()
    .trim()
    .split("\n")
    .filter(Boolean);
  return roots[roots.length - 1];
})();

const filesOutput = execSync(
  `git diff --name-only --diff-filter=AM ${base} HEAD`
)
  .toString()
  .trim();

const files = filesOutput ? filesOutput.split("\n").filter(Boolean) : [];
const ignorePrefixes = ["reports/"];
const hexRegex = /#[0-9a-fA-F]{3,8}\b/;

const flagged = new Set();
const allowlisted = new Set();

let failed = false;
for (const file of files) {
  if (ignorePrefixes.some((prefix) => file.startsWith(prefix))) {
    console.log(`ALLOW generated artifact: ${file}`);
    continue;
  }
  const extension = extname(file);
  if (allowExtensions.has(extension)) {
    console.log(`ALLOW extension (${extension}): ${file}`);
    continue;
  }

  const diff = execSync(`git diff ${base} HEAD -- ${file}`).toString();
  const hasHex = diff
    .split("\n")
    .some((line) => {
      if (!line.startsWith("+")) {
        return false;
      }
      if (line.startsWith("+++")) {
        return false;
      }
      return hexRegex.test(line);
    });
  if (!hasHex) {
    continue;
  }

  if (isAllowListed(file)) {
    allowlisted.add(file);
    const status = allowListStatus(file);
    if (warnOnlyExtensions.has(extension)) {
      console.warn(`WARN allowlisted manifest: ${file}`);
    } else if (status === "canonical") {
      console.warn(`WARN allowlisted canonical: ${file}`);
    } else {
      console.warn(`WARN allowlisted: ${file}`);
    }
    continue;
  }

  console.error(`❌ Rogue HEX detected in ${file}. Use Champagne tokens instead.`);
  flagged.add(file);
  failed = true;
}

if (failed) {
  const summaryMessage = `Rogue HEX scan summary — scanned ${files.length} file(s); allowlisted: ${allowlisted.size}; violations: ${flagged.size}.`;
  console.error(summaryMessage);
  process.exit(1);
}

const summaryMessage = `Rogue HEX scan summary — scanned ${files.length} file(s); allowlisted: ${allowlisted.size}; violations: 0.`;
console.log(summaryMessage);
