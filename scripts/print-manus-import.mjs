#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import path from "node:path";

function sumAssetCounts(summary) {
  if (!summary || typeof summary !== "object") {
    return 0;
  }

  let total = 0;
  for (const value of Object.values(summary)) {
    if (Array.isArray(value)) {
      total += value.length;
    } else if (value && typeof value === "object") {
      total += sumAssetCounts(value);
    } else if (typeof value === "number" && Number.isFinite(value)) {
      total += value;
    }
  }
  return total;
}

async function main() {
  const filePath = path.join(
    process.cwd(),
    "brand",
    "manus_import_unified_manifest_20251104.json",
  );

  const raw = await readFile(filePath, "utf8");
  const data = JSON.parse(raw);
  const components = Array.isArray(data.components) ? data.components : [];
  const sections = new Set();

  for (const component of components) {
    if (component && typeof component === "object") {
      const section =
        typeof component.section === "string"
          ? component.section
          : typeof component.section_slug === "string"
            ? component.section_slug
            : typeof component.location === "string"
              ? component.location
              : undefined;
      if (section) {
        sections.add(section);
      }
    }
  }

  const assetsCount = sumAssetCounts(data.assets_summary);
  const topLevelKeys = Object.keys(data);

  console.log("Manus Import Summary");
  console.log(`- Top-level keys: ${topLevelKeys.join(", ") || "(none)"}`);
  console.log(`- Sections: ${sections.size}`);
  console.log(`- Components: ${components.length}`);
  console.log(`- Assets referenced: ${assetsCount}`);
}

main().catch((error) => {
  console.error("Failed to print Manus import summary:", error);
  process.exitCode = 1;
});
