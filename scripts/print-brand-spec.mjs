#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import path from "node:path";

async function main() {
  const filePath = path.join(
    process.cwd(),
    "brand",
    "champagne_machine_manifest_full.json",
  );

  const raw = await readFile(filePath, "utf8");
  const data = JSON.parse(raw);
  const entries = Array.isArray(data.entries) ? data.entries : [];
  const sections = new Set();
  let assetCount = 0;

  for (const entry of entries) {
    if (entry && typeof entry.section === "string") {
      sections.add(entry.section);
    }

    const refs = entry?.asset_refs;
    if (typeof refs === "string" && refs.trim()) {
      try {
        const parsed = JSON.parse(refs);
        if (Array.isArray(parsed)) {
          assetCount += parsed.length;
        }
      } catch {
        // ignore parsing issues for individual rows
      }
    }
  }

  const topLevelKeys = Object.keys(data);

  console.log("Champagne Spec Summary");
  console.log(`- Top-level keys: ${topLevelKeys.join(", ") || "(none)"}`);
  console.log(`- Sections: ${sections.size}`);
  console.log(`- Components: ${entries.length}`);
  console.log(`- Assets referenced: ${assetCount}`);
}

main().catch((error) => {
  console.error("Failed to print Champagne spec summary:", error);
  process.exitCode = 1;
});
