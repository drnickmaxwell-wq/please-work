import { readFileSync } from "node:fs";
import { join } from "node:path";

const CHAMPAGNE_MANIFEST_FILE = "champagne_machine_manifest_full.json";
const MANUS_MANIFEST_FILE = "manus_import_unified_manifest_20251104.json";

const champagne = readManifest("Champagne", CHAMPAGNE_MANIFEST_FILE);
const manus = readManifest("Manus", MANUS_MANIFEST_FILE);

report(champagne, manus);

function brandPath(fileName) {
  return join(process.cwd(), "public", "brand", fileName);
}

function readManifest(label, fileName) {
  const path = brandPath(fileName);

  try {
    const buffer = readFileSync(path);

    if (buffer.length === 0) {
      console.error(`${label}: manifest is empty at ${path}`);
      return { label, path, manifest: null, componentKeys: [], assetCount: 0, guardCount: 0 };
    }

    try {
      const manifest = JSON.parse(buffer.toString());
      const summary = summarise(manifest);
      return { label, path, manifest, ...summary };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`${label}: failed to parse JSON at ${path} — ${message}`);
      return { label, path, manifest: null, componentKeys: [], assetCount: 0, guardCount: 0 };
    }
  } catch (error) {
    const code = error?.code;
    const message = error instanceof Error ? error.message : String(error);
    if (code === "ENOENT") {
      console.error(`${label}: manifest not found at ${path}`);
    } else if (code === "EACCES") {
      console.error(`${label}: permission denied when reading ${path}`);
    } else {
      console.error(`${label}: failed to read ${path} — ${message}`);
    }
    return { label, path, manifest: null, componentKeys: [], assetCount: 0, guardCount: 0 };
  }
}

function summarise(manifest) {
  const componentKeys = new Set();
  const assetPaths = new Set();
  const guardEntries = new Set();

  if (!manifest || typeof manifest !== "object") {
    return { componentKeys: [], assetCount: 0, guardCount: 0 };
  }

  const { sections, components, assets_summary: assetsSummary, guards } = manifest;

  if (sections) {
    if (Array.isArray(sections)) {
      sections.forEach((item) => addToSet(componentKeys, item));
    } else if (typeof sections === "object") {
      Object.keys(sections).forEach((key) => addToSet(componentKeys, key));
    }
  }

  if (components) {
    if (Array.isArray(components)) {
      components.forEach((entry) => {
        if (entry && typeof entry === "object") {
          addToSet(componentKeys, entry.id ?? entry.key ?? entry.name);

          if (Array.isArray(entry.assets)) {
            entry.assets.forEach((asset) => {
              if (asset && typeof asset === "object") {
                addToSet(assetPaths, asset.path ?? asset.file);
              } else {
                addToSet(assetPaths, asset);
              }
            });
          }
        } else {
          addToSet(componentKeys, entry);
        }
      });
    } else if (typeof components === "object") {
      Object.keys(components).forEach((key) => addToSet(componentKeys, key));
    }
  }

  if (assetsSummary && typeof assetsSummary === "object") {
    Object.values(assetsSummary).forEach((group) => {
      if (Array.isArray(group)) {
        group.forEach((asset) => {
          if (asset && typeof asset === "object") {
            addToSet(assetPaths, asset.file ?? asset.path);
          } else {
            addToSet(assetPaths, asset);
          }
        });
      }
    });
  }

  if (guards && typeof guards === "object") {
    Object.values(guards).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach((entry) => addToSet(guardEntries, entry));
      } else if (value && typeof value === "object") {
        Object.values(value).forEach((entry) => addToSet(guardEntries, entry));
      } else {
        addToSet(guardEntries, value);
      }
    });
  }

  return {
    componentKeys: Array.from(componentKeys),
    assetCount: assetPaths.size,
    guardCount: guardEntries.size,
  };
}

function addToSet(set, value) {
  if (typeof value === "string" && value.trim()) {
    set.add(value.trim());
  } else if (typeof value === "number") {
    set.add(String(value));
  }
}

function report(champagne, manus) {
  console.log(`Champagne manifest: ${champagne.path}`);
  console.log(`Manus manifest: ${manus.path}`);

  if (!champagne.manifest || !manus.manifest) {
    console.log("Unable to diff manifests until both are readable JSON.");
    return;
  }

  console.log(`Champagne components: ${champagne.componentKeys.length}`);
  console.log(`Manus components: ${manus.componentKeys.length}`);
  console.log(`Champagne assets: ${champagne.assetCount}`);
  console.log(`Manus assets: ${manus.assetCount}`);
  console.log(`Champagne guards: ${champagne.guardCount}`);
  console.log(`Manus guards: ${manus.guardCount}`);

  const missing = champagne.componentKeys
    .filter((key) => !manus.componentKeys.includes(key))
    .sort();
  const extra = manus.componentKeys
    .filter((key) => !champagne.componentKeys.includes(key))
    .sort();

  if (missing.length > 0) {
    console.log(`Missing from Manus: ${missing.join(", ")}`);
  } else {
    console.log("Missing from Manus: none");
  }

  if (extra.length > 0) {
    console.log(`Extra in Manus: ${extra.join(", ")}`);
  } else {
    console.log("Extra in Manus: none");
  }

  if (missing.length === 0 && extra.length === 0) {
    console.log("No differences between manifests.");
  }
}
