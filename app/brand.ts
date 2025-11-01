import { loadBrandManifest } from "@/lib/brand/manifest";

export { loadBrandManifest };

export async function getHeroLayers() {
  const m = await loadBrandManifest();
  return {
    filmGrain: m.static.textures.filmGrain,
    glassSoft: m.static.textures.glassSoft,
    waveBg: m.static.waves.background,
    waveMask: m.static.waves.mask,
    particles: m.dynamic?.particles ?? [],
  };
}
