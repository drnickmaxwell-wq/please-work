export type BrandManifest = {
  name: string;
  gradientVar?: string;
  goldVar?: string;
  waves: ManifestWaves;
  textures: ManifestTextures;
  particles?: ManifestParticles;
  gradient?: unknown;
  gold?: unknown;
  typography?: unknown;
  tokens?: string;
  version?: string;
  static?: unknown;
  dynamic?: unknown;
};

type ManifestWaves = {
  mask: string;
  background?: string;
  [key: string]: string | undefined;
};

type ManifestTextures = {
  filmGrain: string;
  glassSoft: string;
  [key: string]: string;
};

type ManifestParticles = {
  soft?: string;
  poster?: string;
  [key: string]: string | undefined;
};

const MANIFEST_PATH = "/brand/manifest.json";

let manifestCache: BrandManifest | null = null;
let manifestPromise: Promise<BrandManifest> | null = null;

export async function getBrandManifest(): Promise<BrandManifest> {
  if (manifestCache) return manifestCache;
  if (!manifestPromise) {
    manifestPromise = fetchManifest().then((manifest) => {
      manifestCache = manifest;
      return manifest;
    });
  }

  return manifestPromise;
}

export async function getWaves(): Promise<ManifestWaves> {
  const manifest = await getBrandManifest();
  return manifest.waves;
}

export async function getTextures(): Promise<ManifestTextures> {
  const manifest = await getBrandManifest();
  return manifest.textures;
}

export async function getParticles(): Promise<ManifestParticles | undefined> {
  const manifest = await getBrandManifest();
  return manifest.particles;
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

async function fetchManifest(): Promise<BrandManifest> {
  const manifestUrl = resolveManifestUrl();
  const response = await fetch(manifestUrl);

  if (!response.ok) {
    throw new Error(`Failed to load brand manifest from ${manifestUrl}`);
  }

  return (await response.json()) as BrandManifest;
}
