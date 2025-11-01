export type BrandManifest = {
  static: {
    textures: { filmGrain: string; glassSoft: string };
    waves: { background: string; mask: string };
  };
  dynamic?: {
    particles?: Array<{
      id: string;
      src: string;
      codec: string;
      duration: number;
      fps: number;
      loop: boolean;
      intensity: "subtle" | "ultra-subtle";
    }>;
  };
};

let cache: BrandManifest | null = null;

export async function loadBrandManifest(): Promise<BrandManifest> {
  if (cache) return cache;
  // dynamic import so it works in both node & edge builds
  const res = await import("../../public/brand/manifest.json");
  const m = res.default as BrandManifest;
  cache = m;
  return m;
}
