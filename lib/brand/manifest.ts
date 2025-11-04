import { readFile } from "node:fs/promises";
import path from "node:path";

export type BrandManifest = {
  name: string;
  gradientVar?: string;
  goldVar?: string;
  waves: ManifestWaves;
  textures: ManifestTextures;
  particles?: ManifestParticles;
  motion?: ManifestMotion;
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

type ManifestMotion = {
  [key: string]: string | undefined;
};

export type ChampagneSpecEntry = Record<string, unknown>;

export type ChampagneSpec = {
  spec?: string;
  entries: ChampagneSpecEntry[];
  [key: string]: unknown;
};

export type ManusImport = {
  components?: unknown[];
  assets_summary?: unknown;
  [key: string]: unknown;
};

const MANIFEST_PATH = "/brand/manifest.json";

const CHAMPAGNE_SPEC_RELATIVE_PATH = path.join(
  "brand",
  "champagne_machine_manifest_full.json",
);

const MANUS_IMPORT_RELATIVE_PATH = path.join(
  "brand",
  "manus_import_unified_manifest_20251104.json",
);

const jsonCache = new Map<string, unknown>();
const jsonPromiseCache = new Map<string, Promise<unknown | null>>();

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

export async function getHeroLayers() {
  const manifest = await getBrandManifest();

  return {
    waves: manifest.waves,
    textures: manifest.textures,
    particles: manifest.particles,
    motion: manifest.motion,
  };
}

async function readJsonFile<T>(
  relativePath: string,
  label: string,
): Promise<T | null> {
  if (jsonCache.has(relativePath)) {
    return jsonCache.get(relativePath) as T | null;
  }

  const existingPromise = jsonPromiseCache.get(relativePath);
  if (existingPromise) {
    return (await existingPromise) as T | null;
  }

  const fullPath = path.join(process.cwd(), relativePath);
  const promise = readFile(fullPath, "utf8")
    .then((raw) => {
      const parsed = JSON.parse(raw) as T;
      jsonCache.set(relativePath, parsed as unknown);
      jsonPromiseCache.delete(relativePath);
      return parsed;
    })
    .catch((error) => {
      jsonCache.delete(relativePath);
      jsonPromiseCache.delete(relativePath);

      const details =
        error instanceof Error ? `${error.message}` : String(error);
      const message = `Failed to load ${label} at ${fullPath}: ${details}`;

      if (process.env.NODE_ENV === "production") {
        console.error(message);
        return null;
      }

      if (error instanceof Error) {
        error.message = message;
        throw error;
      }

      throw new Error(message);
    });

  jsonPromiseCache.set(relativePath, promise as Promise<unknown | null>);
  return promise;
}

export async function loadChampagneSpec(): Promise<ChampagneSpec | null> {
  return readJsonFile<ChampagneSpec>(
    CHAMPAGNE_SPEC_RELATIVE_PATH,
    "champagne spec",
  );
}

export async function loadManusImport(): Promise<ManusImport | null> {
  return readJsonFile<ManusImport>(
    MANUS_IMPORT_RELATIVE_PATH,
    "Manus import",
  );
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
