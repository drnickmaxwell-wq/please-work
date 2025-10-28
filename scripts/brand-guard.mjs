import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const tokensDir = path.join("styles", "tokens");

const ignoredDirectories = new Set([".git", "node_modules", ".next", "dist", "out", ".turbo", ".vercel"]);
const binaryExtensionPattern = /\.(?:png|jpe?g|gif|mp4|mov|mp3|webm|avi|mkv|ico|icns|pdf|zip|gz|bz2|7z|tar|woff2?|ttf|eot|otf|heic|heif|avif|glb|gltf|wasm)$/i;
const canonicalHexPairs = [
  ["#D94", "BC6"],
  ["#00C", "2C7"],
  ["#C21", "85B"],
  ["#40C", "4B4"],
  ["#D4A", "F37"],
];
const bannedHexes = canonicalHexPairs.map(([left, right]) => (left + right).toLowerCase());
const bannedHexLabels = canonicalHexPairs.map(([left, right]) => left + right);
const allowedHexFiles = new Set(["styles/brand/brand-gradient.css", "scripts/brand-guard.mjs"]);
const gradientWatchFiles = new Set([
  "styles/tokens/smh-champagne-tokens.css",
  "styles/brand/brand-gradient.css",
]);

const errors = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (ignoredDirectories.has(entry.name)) continue;

    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
    } else if (entry.isFile()) {
      await inspectFile(fullPath);
    }
  }
}

function normaliseRelative(filePath) {
  return path.relative(rootDir, filePath).replace(/\\/g, "/");
}

async function inspectFile(filePath) {
  if (binaryExtensionPattern.test(filePath)) {
    return;
  }

  const relativePath = normaliseRelative(filePath);
  const content = await readFile(filePath, "utf8");
  const lowerContent = content.toLowerCase();

  bannedHexes.forEach((hex, index) => {
    if (
      lowerContent.includes(hex) &&
      !relativePath.startsWith(tokensDir) &&
      !allowedHexFiles.has(relativePath)
    ) {
      errors.push(`${bannedHexLabels[index]} found in ${relativePath}`);
    }
  });

  if (gradientWatchFiles.has(relativePath)) {
    const gradients = collectGradients(content);
    for (const gradient of gradients) {
      const gradientLower = gradient.toLowerCase();
      if (!/linear-gradient\(\s*135deg/.test(gradientLower)) {
        continue;
      }

      const startIndex = gradientLower.indexOf("#d94bc6");
      const endIndex = gradientLower.lastIndexOf("#00c2c7");
      if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
        errors.push(`Non-canonical 135deg gradient in ${relativePath}: ${gradient.trim()}`);
      }
    }
  }

  if (relativePath.endsWith(".svg")) {
    const attributeRegex = /(fill|stroke)\s*=\s*"([^"]*)"/gi;
    let attributeMatch;
    while ((attributeMatch = attributeRegex.exec(content)) !== null) {
      const value = attributeMatch[2].trim().toLowerCase();
      if (
        value &&
        value !== "currentcolor" &&
        value !== "none" &&
        !value.startsWith("url(")
      ) {
        errors.push(`SVG ${relativePath} has ${attributeMatch[1]}="${attributeMatch[2]}"`);
      }
    }
  }
}

function collectGradients(source) {
  const gradients = [];
  const lowerSource = source.toLowerCase();
  const needle = "linear-gradient(";
  let index = 0;

  while (index < lowerSource.length) {
    const start = lowerSource.indexOf(needle, index);
    if (start === -1) break;

    let depth = 0;
    let end = start;
    for (let position = start; position < source.length; position += 1) {
      const char = source[position];
      if (char === "(") {
        depth += 1;
      } else if (char === ")") {
        depth -= 1;
        if (depth === 0) {
          end = position + 1;
          break;
        }
      }
    }

    if (end === start) {
      gradients.push(source.slice(start));
      break;
    }

    gradients.push(source.slice(start, end));
    index = end;
  }

  return gradients;
}

(async () => {
  try {
    const rootStats = await stat(rootDir);
    if (!rootStats.isDirectory()) {
      throw new Error(`Unable to locate repository root at ${rootDir}`);
    }

    await walk(rootDir);

    if (errors.length > 0) {
      for (const message of errors) {
        console.error(`❌ ${message}`);
      }
      process.exit(1);
    }

    console.log("✅ Brand guard passed. Champagne hues remain locked.");
  } catch (error) {
    console.error("Brand guard failed:", error);
    process.exit(1);
  }
})();
