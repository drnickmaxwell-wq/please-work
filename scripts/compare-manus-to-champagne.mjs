const CHAMPAGNE_MANIFEST_PATH = "/brand/champagne_machine_manifest_full.json";
const MANUS_MANIFEST_PATH = "/brand/manus_import_unified_manifest_20251104.json";

const BASE_URL =
  process.env.BRAND_COMPARE_BASE_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const champagne = await fetchManifest("Champagne", CHAMPAGNE_MANIFEST_PATH);
const manus = await fetchManifest("Manus", MANUS_MANIFEST_PATH);

printDiff(champagne, manus);

function createAbsoluteUrl(pathname) {
  return new URL(pathname, BASE_URL).toString();
}

async function fetchManifest(label, pathname) {
  const url = createAbsoluteUrl(pathname);

  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      console.error(`Fetch failed: ${url} — ${response.status} ${response.statusText}`);
      return { label, url, sectionKeys: [] };
    }

    const manifest = await response.json();
    const sectionKeys = extractSectionKeys(manifest);

    return { label, url, sectionKeys };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Fetch failed: ${url} — network ${message}`);
    return { label, url, sectionKeys: [] };
  }
}

function extractSectionKeys(manifest) {
  if (!manifest || typeof manifest !== "object") {
    return [];
  }

  const { sections } = manifest;

  if (sections && typeof sections === "object" && !Array.isArray(sections)) {
    return Object.keys(sections);
  }

  return [];
}

function printDiff(champagne, manus) {
  const missing = champagne.sectionKeys.filter((key) => !manus.sectionKeys.includes(key)).sort();
  const unexpected = manus.sectionKeys.filter((key) => !champagne.sectionKeys.includes(key)).sort();

  if (missing.length > 0) {
    console.log(`Missing from Manus: ${missing.join(", ")}`);
  } else {
    console.log("Missing from Manus: none");
  }

  if (unexpected.length > 0) {
    console.log(`Unexpected in Manus: ${unexpected.join(", ")}`);
  } else {
    console.log("Unexpected in Manus: none");
  }

  if (missing.length === 0 && unexpected.length === 0) {
    console.log("No differences between manifests.");
  }
}
