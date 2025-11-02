import {
  loadBrandManifest,
  getMotion as loadMotion,
  getTextures as loadTextures,
  getWaves as loadWaves,
  type ChampagneManifest,
} from "@/lib/brand/manifest";

export type { ChampagneManifest };

export {
  loadBrandManifest as getBrandManifest,
  loadMotion as getMotion,
  loadTextures as getTextures,
  loadWaves as getWaves,
};

export async function getHeroLayers() {
  const manifest = await loadBrandManifest();
  const textures = manifest.textures ?? {};
  const waves = manifest.waves ?? { bg: "", mask: "" };
  const motion = manifest.motion ?? {};

  const primaryMotion =
    typeof motion.goldDust === "string"
      ? motion.goldDust
      : typeof motion.particles === "string"
        ? motion.particles
        : null;

  return {
    filmGrain: textures.filmGrain ?? "",
    glassSoft: textures.glassSoft ?? "",
    waveBg: waves.bg ?? "",
    waveMask: waves.mask ?? "",
    particles: primaryMotion ? [{ src: primaryMotion }] : [],
  };
}
