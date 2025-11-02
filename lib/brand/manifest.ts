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
  grain?: string;
  glass?: string;
  [key: string]: string | undefined;
};

type ManifestParticles = {
  soft?: string;
  poster?: string;
  [key: string]: string | undefined;
};

export type ChampagneManifest = BrandManifest & {
  waves?: {
    background?: string;
    mask?: string;
    [key: string]: string | undefined;
  };
  textures?: {
    grain?: string;
    glass?: string;
    filmGrain?: string;
    glassSoft?: string;
    [key: string]: string | undefined;
  };
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
  const manifestPath = joinBasePath(MANIFEST_PATH);

  if (typeof window !== "undefined") {
    return manifestPath;
  }

  const { NEXT_PUBLIC_SITE_URL, VERCEL_URL } = process.env;

  if (NEXT_PUBLIC_SITE_URL) {
    return new URL(
      manifestPath,
      ensureProtocol(NEXT_PUBLIC_SITE_URL),
    ).toString();
  }

  if (VERCEL_URL) {
    const base = VERCEL_URL.includes("://")
      ? VERCEL_URL
      : `https://${VERCEL_URL}`;
    return new URL(manifestPath, base).toString();
  }

  return `http://localhost:3000${manifestPath}`;
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

export async function getChampagneManifest(): Promise<ChampagneManifest> {
  const manifest = await getBrandManifest();

  return {
    ...manifest,
    waves: withBasePath(manifest.waves),
    textures: withBasePath(manifest.textures),
  };
}

function getBasePath() {
  const raw =
    process.env.NEXT_PUBLIC_BASE_PATH ??
    process.env.NEXT_BASE_PATH ??
    process.env.BASE_PATH ??
    "";

  if (!raw || raw === "/") {
    return "";
  }

  return raw.startsWith("/") ? raw : `/${raw}`;
}

function joinBasePath(pathname: string) {
  const basePath = getBasePath();
  if (!basePath) return pathname;
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${basePath}${normalizedPath}`;
}

function withBasePath<T extends Record<string, string | undefined>>(
  input: T | undefined,
): T | undefined {
  if (!input) return input;

  const result = Object.fromEntries(
    Object.entries(input).map(([key, value]) => [
      key,
      typeof value === "string" ? applyBasePath(value) : value,
    ]),
  ) as T;

  return result;
}

function applyBasePath(value: string) {
  if (
    !value ||
    /^([a-z]+:)?\/\//i.test(value) ||
    value.startsWith("data:") ||
    value.startsWith("#")
  ) {
    return value;
  }

  const basePath = getBasePath();
  if (!basePath) {
    return value;
  }

  if (value.startsWith(basePath)) {
    return value;
  }

  if (value.startsWith("/")) {
    return `${basePath}${value}`;
  }

  return `${basePath}/${value}`;
}
