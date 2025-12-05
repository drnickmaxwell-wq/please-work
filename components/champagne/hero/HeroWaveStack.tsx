import type { HeroSchema, HeroWaveMask, HeroWaveStrength } from "@/lib/champagne/hero-schema";

type HeroWaveStackProps = {
  waves: HeroSchema["waves"];
  strength?: HeroWaveStrength;
  className?: string;
};

const waveMaskMap: Record<HeroWaveMask, string> = {
  "wave-01": "/brand/waves/header-wave-mask.svg",
  "wave-02": "/brand/waves/wave-field.svg",
  "wave-03": "/brand/waves/wave-dots.svg",
};

const strengthToLayers: Record<HeroWaveStrength, number> = {
  soft: 1,
  medium: 2,
  strong: 3,
};

export function HeroWaveStack({ waves, strength = "medium", className }: HeroWaveStackProps) {
  const mask = waveMaskMap[waves.mask];
  const blendMode = waves.blendMode ?? "soft-light";
  const layerCount = strengthToLayers[strength] ?? strengthToLayers.medium;
  const baseOpacity = typeof waves.opacity === "number" ? waves.opacity : 0.28;

  return (
    <div className={`hero-wave-stack ${className ?? ""}`.trim()} aria-hidden>
      {Array.from({ length: layerCount }).map((_, index) => {
        const depthScale = 1 - index * 0.18;
        const layerOpacity = Math.max(0.08, Math.min(baseOpacity * depthScale, 0.92));
        const backgroundPosition = `50% ${42 - index * 5}%`;
        const backgroundSize = `${140 + index * 12}% ${140 + index * 12}%`;
        const layerClassName = ["hero-wave-layer", className, layerCount > 1 ? `hero-wave-layer--${index + 1}` : null]
          .filter(Boolean)
          .join(" ");

        return (
          <div
            key={`${waves.mask}-${index}`}
            className={layerClassName}
            style={{
              backgroundImage:
                "linear-gradient(135deg, color-mix(in srgb, var(--hero-wave-fill) 82%, transparent) 0%, color-mix(in srgb, var(--hero-wave-highlight) 32%, transparent) 100%)",
              opacity: layerOpacity,
              mixBlendMode: blendMode,
              backgroundPosition,
              backgroundSize,
              filter: index > 0 ? "blur(1px)" : undefined,
              maskImage: `url(${mask})`,
              WebkitMaskImage: `url(${mask})`,
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: backgroundPosition,
              WebkitMaskPosition: backgroundPosition,
              maskSize: backgroundSize,
              WebkitMaskSize: backgroundSize,
            }}
          />
        );
      })}
    </div>
  );
}
