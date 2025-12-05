import type { HeroSchema, HeroWaveMask } from "@/lib/champagne/hero-schema";

type HeroWaveStackProps = {
  waves: HeroSchema["waves"];
};

const waveMaskMap: Record<HeroWaveMask, string> = {
  "wave-01": "/brand/waves/header-wave-mask.svg",
  "wave-02": "/brand/waves/wave-field.svg",
  "wave-03": "/brand/waves/wave-dots.svg",
};

export function HeroWaveStack({ waves }: HeroWaveStackProps) {
  const mask = waveMaskMap[waves.mask];
  const blendMode = waves.blendMode ?? "soft-light";

  return (
    <div
      aria-hidden
      className="hero-wave-layer"
      style={{
        backgroundImage: `url(${mask})`,
        opacity: waves.opacity,
        mixBlendMode: blendMode,
      }}
    />
  );
}
