export type ChampagneManifest = {
  gradient?: string;
  waves: {
    bg?: string;
    mask?: string;
    [key: string]: string | undefined;
  };
  motion?: {
    particles?: string;
    goldDust?: string;
    [key: string]: unknown;
  };
  textures?: {
    filmGrain?: string;
    glassSoft?: string | null;
    [key: string]: string | undefined;
  };
  [key: string]: unknown;
};

let manifestCache: ChampagneManifest | null = null;
let manifestPromise: Promise<ChampagneManifest> | null = null;

export async function loadBrandManifest(): Promise<ChampagneManifest> {
  if (manifestCache) {
    return manifestCache;
  }

  if (!manifestPromise) {
    manifestPromise = fetch("/assets/champagne/manifest.json", {
      cache: "force-cache",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to load Champagne manifest");
      }

      return res.json() as Promise<ChampagneManifest>;
    }).then((data) => {
      manifestCache = data;
      manifestPromise = null;
      return data;
    }).catch((error) => {
      manifestPromise = null;
      throw error;
    });
  }

  return manifestPromise;
}

export async function getWaves() {
  const manifest = await loadBrandManifest();
  return manifest.waves;
}

export async function getMotion() {
  const manifest = await loadBrandManifest();
  return manifest.motion;
}

export async function getTextures() {
  const manifest = await loadBrandManifest();
  return manifest.textures;
}
