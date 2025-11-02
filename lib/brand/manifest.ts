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
const CHAMPAGNE_MANIFEST_PATH = "/assets/champagne/manifest.json";

let manifestCache: BrandManifest | null = null;
let manifestPromise: Promise<BrandManifest> | null = null;
let champagneManifestCache: ChampagneHeroManifest | null = null;
let champagneManifestPromise: Promise<ChampagneHeroManifest> | null = null;

export type ChampagneHeroManifest = {
  gradient: string;
  waves: { background: string; mask: string };
  motion: Record<string, string>;
  textures?: { grain?: string; glass?: string };
};

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

export async function getChampagneHeroManifest(): Promise<ChampagneHeroManifest> {
  if (champagneManifestCache) return champagneManifestCache;
  if (!champagneManifestPromise) {
    champagneManifestPromise = fetchChampagneHeroManifest().then((manifest) => {
      champagneManifestCache = manifest;
      return manifest;
    });
  }

  return champagneManifestPromise;
}

function resolveManifestUrl(path = MANIFEST_PATH) {
  if (typeof window !== "undefined") {
    return path;
  }

  const { NEXT_PUBLIC_SITE_URL, VERCEL_URL } = process.env;

  if (NEXT_PUBLIC_SITE_URL) {
    return new URL(
      path,
      ensureProtocol(NEXT_PUBLIC_SITE_URL),
    ).toString();
  }

  if (VERCEL_URL) {
    const base = VERCEL_URL.includes("://")
      ? VERCEL_URL
      : `https://${VERCEL_URL}`;
    return new URL(path, base).toString();
  }

  return `http://localhost:3000${path}`;
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

type RawChampagneManifest = {
  gradient?: string;
  tokens?: {
    gradients?: {
      champagne?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  waves?: {
    background?: string;
    mask?: string;
    [key: string]: unknown;
  };
  motion?: Record<string, unknown>;
  textures?: {
    grain?: string;
    glass?: string;
    [key: string]: unknown;
  };
  layers?: Array<{
    id?: number;
    name?: string;
    type?: string;
    src?: string;
    srcMobile?: string;
    cssBackground?: string;
    [key: string]: unknown;
  }>;
  assets?: Array<{
    path?: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
};

async function fetchChampagneHeroManifest(): Promise<ChampagneHeroManifest> {
  const manifestUrl = resolveManifestUrl(CHAMPAGNE_MANIFEST_PATH);
  const response = await fetch(manifestUrl);

  if (!response.ok) {
    throw new Error(
      `Failed to load champagne hero manifest from ${manifestUrl}`,
    );
  }

  const raw = (await response.json()) as RawChampagneManifest;
  const layers = Array.isArray(raw.layers) ? raw.layers : [];
  const assets = Array.isArray(raw.assets) ? raw.assets : [];

  const gradient =
    (typeof raw.gradient === "string" && raw.gradient) ||
    (typeof raw.tokens?.gradients?.champagne === "string"
      ? raw.tokens.gradients.champagne
      : undefined) ||
    layers.find((layer) => typeof layer.cssBackground === "string")
      ?.cssBackground ||
    "var(--smh-gradient)";

  const mask =
    normalisePath(
      (typeof raw.waves?.mask === "string" && raw.waves.mask) ||
        layers.find((layer) => layer.name === "wave-mask")?.src ||
        assets.find((asset) => asset.path?.includes("wave-mask"))?.path,
    ) || "/assets/champagne/waves/wave-mask-desktop.webp";

  const background =
    normalisePath(
      (typeof raw.waves?.background === "string" &&
        raw.waves.background) ||
        assets.find((asset) => asset.path?.includes("waves-bg"))?.path,
    ) || "/assets/champagne/waves/waves-bg-2560.webp";

  const motionEntries: Record<string, string> = {};
  if (raw.motion && Object.values(raw.motion).every((value) => typeof value === "string")) {
    Object.assign(motionEntries, raw.motion as Record<string, string>);
  } else {
    layers
      .filter((layer) => layer.type === "motion" && typeof layer.src === "string")
      .forEach((layer) => {
        const key = layer.name ?? `motion-${layer.id ?? Object.keys(motionEntries).length}`;
        motionEntries[key] = layer.src as string;
      });
  }

  const grainSource =
    (typeof raw.textures?.grain === "string" && raw.textures.grain) ||
    layers.find((layer) => layer.name?.includes("grain"))?.src ||
    assets.find((asset) => asset.path?.includes("film-grain"))?.path;
  const glassSource =
    (typeof raw.textures?.glass === "string" && raw.textures.glass) ||
    assets.find((asset) => asset.path?.includes("glass"))?.path;

  const textureEntries: { grain?: string; glass?: string } = {};

  if (grainSource) {
    textureEntries.grain = normalisePath(grainSource);
  }

  if (glassSource) {
    textureEntries.glass = normalisePath(glassSource);
  }

  return {
    gradient,
    waves: {
      background,
      mask,
    },
    motion: motionEntries,
    textures: Object.keys(textureEntries).length ? textureEntries : undefined,
  };
}

function normalisePath(path?: string) {
  if (!path) return undefined;
  if (path.startsWith("http")) return path;
  if (path.startsWith("/")) return path;
  return path.replace(/^public/, "");
}
