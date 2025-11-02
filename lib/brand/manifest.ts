export type ChampagneManifest = {
  gradient?: string;
  waves: { bg: string; mask: string };
  motion: { particles?: string; goldDust?: string };
  textures?: { filmGrain?: string; glassSoft?: string };
};

const MANIFEST_PATH = "/assets/champagne/manifest.json";

let manifestCache: ChampagneManifest | null = null;
let manifestPromise: Promise<ChampagneManifest> | null = null;

export async function loadBrandManifest(): Promise<ChampagneManifest> {
  if (manifestCache) {
    return manifestCache;
  }

  if (!manifestPromise) {
    manifestPromise = fetchManifest().then((manifest) => {
      manifestCache = manifest;
      return manifest;
    });
  }

  return manifestPromise;
}

function resolveManifestUrl() {
  if (typeof window !== "undefined") {
    return MANIFEST_PATH;
  }

  const { NEXT_PUBLIC_SITE_URL, VERCEL_URL } = process.env;

  if (NEXT_PUBLIC_SITE_URL) {
    return new URL(
      MANIFEST_PATH,
      ensureProtocol(NEXT_PUBLIC_SITE_URL),
    ).toString();
  }

  if (VERCEL_URL) {
    const base = VERCEL_URL.includes("://")
      ? VERCEL_URL
      : `https://${VERCEL_URL}`;

    return new URL(MANIFEST_PATH, base).toString();
  }

  return `http://localhost:3000${MANIFEST_PATH}`;
}

function ensureProtocol(url: string) {
  return url.includes("://") ? url : `https://${url}`;
}

async function fetchManifest(): Promise<ChampagneManifest> {
  const manifestUrl = resolveManifestUrl();
  const response = await fetch(manifestUrl, { cache: "force-cache" });

  if (!response.ok) {
    throw new Error(`Failed to load brand manifest from ${manifestUrl}`);
  }

  return (await response.json()) as ChampagneManifest;
}
