import {
  loadBrandManifest,
  type ChampagneManifest,
} from "@/lib/brand/manifest";

export { loadBrandManifest };
export type { ChampagneManifest };

export async function getHeroLayers() {
  const manifest = await loadBrandManifest();

  const particles: Array<{ src: string; poster?: string }> = [];

  if (manifest.motion.goldDust) {
    particles.push({ src: manifest.motion.goldDust });
  }

  if (manifest.motion.particles) {
    particles.push({ src: manifest.motion.particles });
  }

  return {
    filmGrain: manifest.textures?.filmGrain,
    glassSoft: manifest.textures?.glassSoft,
    waveBg: manifest.waves?.bg,
    waveMask: manifest.waves?.mask,
    particles,
  };
}
