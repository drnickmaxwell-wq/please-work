import { getBrandManifest as getChampagneManifest } from "@/lib/brand/manifest";

type ChampagneManifest = Awaited<ReturnType<typeof getChampagneManifest>> & {
  motion: {
    waveCaustics: string;
    glassShimmer: string;
    particlesDrift: string;
  };
};

export async function getChampagneHeroPreview() {
  const m = (await getChampagneManifest()) as ChampagneManifest;
  return {
    waves: {
      background: m.waves.background,
      mask: m.waves.mask,
    },
    motion: {
      caustics: m.motion.waveCaustics,
      glass: m.motion.glassShimmer,
      particles: m.motion.particlesDrift,
    },
    textures: {
      grain: m.textures.filmGrain,
    },
  };
}
