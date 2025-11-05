import { readFileSync } from "node:fs";
import { join } from "node:path";

const CHAMPAGNE_MANIFEST_FILE = "champagne_machine_manifest_full.json";
const MANUS_MANIFEST_FILE = "manus_import_unified_manifest_20251104.json";
const BRAND_DIR = join(process.cwd(), "public", "brand");

const champagne = loadManifest("Champagne", CHAMPAGNE_MANIFEST_FILE);
const manus = loadManifest("Manus", MANUS_MANIFEST_FILE);

printSummary("Champagne", champagne);
printSummary("Manus", manus);
printDiff(champagne, manus);

if (!champagne.ok || !manus.ok) {
  process.exitCode = 1;
}

function loadManifest(label, fileName) {
  const path = join(BRAND_DIR, fileName);
  try {
    const buffer = readFileSync(path);
    if (buffer.length === 0) {
      return failure({
        label,
        path,
        status: 200,
        statusText: "empty body",
        error: `${label} manifest is empty (0 bytes). Path: ${path}`,
      });
    }

    const text = buffer.toString("utf8");
    try {
      const json = JSON.parse(text);
      const summary = computeSummary(json);
      return {
        ok: true,
        label,
        path,
        summary,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return failure({
        label,
        path,
        status: 422,
        statusText: "json parse error",
        error: `${label} manifest failed to parse: ${message}. Path: ${path}`,
      });
    }
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    const code = err && typeof err === "object" && "code" in err ? err.code : undefined;
    const status =
      code === "ENOENT" ? 404 : code === "EACCES" || code === "EPERM" ? 403 : 500;
    const statusText =
      status === 404 ? "not found" : status === 403 ? "permission denied" : "read error";
    const reason = err.message || String(err);
    return failure({
      label,
      path,
      status,
      statusText,
      error: `${label} manifest could not be read (${statusText}): ${reason}. Path: ${path}`,
    });
  }
}

function computeSummary(manifest) {
  const { ids, assets } = extractComponents(manifest);
  let guardsCount = 0;

  if (manifest && typeof manifest === "object") {
    const guards = manifest.guards;
    if (guards && typeof guards === "object") {
      for (const value of Object.values(guards)) {
        if (!value) continue;
        if (Array.isArray(value)) {
          guardsCount += value.length;
        } else if (typeof value === "object") {
          for (const inner of Object.values(value)) {
            if (Array.isArray(inner)) {
              guardsCount += inner.length;
            }
          }
        }
      }
    }

    const assetsSummary = manifest.assets_summary;
    if (assetsSummary && typeof assetsSummary === "object") {
      for (const value of Object.values(assetsSummary)) {
        if (!value) continue;
        if (Array.isArray(value)) {
          for (const item of value) {
            if (!item) continue;
            if (typeof item === "string") {
              assets.add(item);
            } else if (item && typeof item === "object") {
              const path = item.file ?? item.path;
              if (typeof path === "string" && path.length > 0) {
                assets.add(path);
              }
            }
          }
        }
      }
    }
  }

  return {
    componentsCount: ids.size,
    assetsCount: assets.size,
    guardsCount,
    componentIds: Array.from(ids).sort(),
  };
}

function extractComponents(manifest) {
  const ids = new Set();
  const assets = new Set();

  if (!manifest || typeof manifest !== "object") {
    return { ids, assets };
  }

  const rawComponents = manifest.components;
  if (Array.isArray(rawComponents)) {
    for (const entry of rawComponents) {
      if (!entry) continue;
      if (typeof entry === "string") {
        const id = entry.trim();
        if (id) ids.add(id);
        continue;
      }
      if (typeof entry === "object") {
        const id = typeof entry.id === "string" ? entry.id.trim() : "";
        if (id) ids.add(id);
        const componentAssets = entry.assets;
        if (Array.isArray(componentAssets)) {
          for (const asset of componentAssets) {
            if (!asset) continue;
            if (typeof asset === "string") {
              assets.add(asset);
            } else if (typeof asset === "object") {
              const path = asset.path ?? asset.file;
              if (typeof path === "string" && path.length > 0) {
                assets.add(path);
              }
            }
          }
        }
      }
    }
  } else if (rawComponents && typeof rawComponents === "object") {
    for (const [key, value] of Object.entries(rawComponents)) {
      if (typeof key === "string" && key.trim()) {
        ids.add(key.trim());
      }
      if (value && typeof value === "object") {
        const componentAssets = value.assets;
        if (Array.isArray(componentAssets)) {
          for (const asset of componentAssets) {
            if (!asset) continue;
            if (typeof asset === "string") {
              assets.add(asset);
            } else if (typeof asset === "object") {
              const path = asset.path ?? asset.file;
              if (typeof path === "string" && path.length > 0) {
                assets.add(path);
              }
            }
          }
        }
      }
    }
  }

  return { ids, assets };
}

function failure({ label, path, status, statusText, error }) {
  return {
    ok: false,
    label,
    path,
    status,
    statusText,
    error,
    summary: {
      componentsCount: 0,
      assetsCount: 0,
      guardsCount: 0,
      componentIds: [],
    },
  };
}

function printSummary(label, result) {
  console.log(`\n[${label}] path: ${result.path}`);
  if (result.ok) {
    console.log(`status: 200 OK`);
    console.log(`components: ${result.summary.componentsCount}`);
    console.log(`assets: ${result.summary.assetsCount}`);
    console.log(`guards: ${result.summary.guardsCount}`);
  } else {
    console.error(
      `status: ${result.status} ${result.statusText} — ${result.error}`
    );
  }
}

function printDiff(champagne, manus) {
  if (!champagne.ok || !manus.ok) {
    console.error("\nCannot compute differences until both manifests load successfully.");
    return;
  }

  const missing = champagne.summary.componentIds
    .filter((id) => !manus.summary.componentIds.includes(id))
    .sort();
  const extra = manus.summary.componentIds
    .filter((id) => !champagne.summary.componentIds.includes(id))
    .sort();

  console.log("\nMissing from Manus:");
  if (missing.length) {
    for (const id of missing) {
      console.log(`  - ${id}`);
    }
  } else {
    console.log("  none");
  }

  console.log("\nExtra in Manus:");
  if (extra.length) {
    for (const id of extra) {
      console.log(`  - ${id}`);
    }
  } else {
    console.log("  none");
  }
}
