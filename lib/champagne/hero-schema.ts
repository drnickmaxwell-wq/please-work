export type HeroTone = "dusk" | "teal-lux" | "noir" | "dawn" | "whitening" | "custom";
export type HeroIntensity = "soft" | "standard" | "lux";
export type HeroWaveMask = "wave-01" | "wave-02" | "wave-03";
export type HeroWaveBlend = "soft-light" | "overlay";
export type HeroShimmerDensity = "low" | "med" | "high";

export type HeroSchema = {
  tone: HeroTone;
  intensity: HeroIntensity;
  waves: {
    mask: HeroWaveMask;
    opacity: number;
    blendMode?: HeroWaveBlend;
  };
  shimmer: {
    enabled: boolean;
    density: HeroShimmerDensity;
  };
  cta: {
    primary: string;
    secondary: string;
    primaryLabel?: string;
    secondaryLabel?: string;
    primaryHref?: string;
    secondaryHref?: string;
  };
  layout: "left" | "center";
  eyebrow: string;
  headline: string;
  subcopy: string;
};

const defaultSchema: HeroSchema = {
  tone: "dusk",
  intensity: "standard",
  waves: {
    mask: "wave-01",
    opacity: 0.28,
    blendMode: "soft-light",
  },
  shimmer: {
    enabled: true,
    density: "med",
  },
  cta: {
    primary: "cta-primary-ink-light",
    secondary: "cta-secondary-glass-gold",
    primaryLabel: "Primary CTA",
    secondaryLabel: "Secondary CTA",
  },
  layout: "left",
  eyebrow: "Champagne preview",
  headline: "Preview hero",
  subcopy: "Token-driven hero surface ready for Manus-aligned content.",
};

const toneFallback: HeroTone = "dusk";
const toneSet: Set<HeroTone> = new Set(["dusk", "teal-lux", "noir", "dawn", "whitening", "custom"]);
const intensitySet: Set<HeroIntensity> = new Set(["soft", "standard", "lux"]);
const waveMaskSet: Set<HeroWaveMask> = new Set(["wave-01", "wave-02", "wave-03"]);
const shimmerDensitySet: Set<HeroShimmerDensity> = new Set(["low", "med", "high"]);

function clampOpacity(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return defaultSchema.waves.opacity;
  if (value < 0.1) return 0.1;
  if (value > 0.45) return 0.45;
  return value;
}

export function validateHeroSchema(schema: Partial<HeroSchema>): HeroSchema {
  const tone = toneSet.has(schema.tone as HeroTone) ? (schema.tone as HeroTone) : toneFallback;
  const intensity = intensitySet.has(schema.intensity as HeroIntensity)
    ? (schema.intensity as HeroIntensity)
    : defaultSchema.intensity;
  const waveMask = waveMaskSet.has(schema.waves?.mask as HeroWaveMask)
    ? (schema.waves?.mask as HeroWaveMask)
    : defaultSchema.waves.mask;
  const blendMode = schema.waves?.blendMode === "overlay" ? "overlay" : defaultSchema.waves.blendMode;
  const waveOpacity = clampOpacity(schema.waves?.opacity);

  const shimmerEnabled = schema.shimmer?.enabled ?? defaultSchema.shimmer.enabled;
  const shimmerDensity = shimmerDensitySet.has(schema.shimmer?.density as HeroShimmerDensity)
    ? (schema.shimmer?.density as HeroShimmerDensity)
    : defaultSchema.shimmer.density;

  const layout = schema.layout === "center" ? "center" : defaultSchema.layout;

  const eyebrow = schema.eyebrow?.trim() || defaultSchema.eyebrow;
  const headline = schema.headline?.trim() || defaultSchema.headline;
  const subcopy = schema.subcopy?.trim() || defaultSchema.subcopy;

  return {
    tone,
    intensity,
    layout,
    eyebrow,
    headline,
    subcopy,
    waves: {
      mask: waveMask,
      opacity: waveOpacity,
      blendMode,
    },
    shimmer: {
      enabled: shimmerEnabled,
      density: shimmerDensity,
    },
    cta: {
      primary: schema.cta?.primary || defaultSchema.cta.primary,
      secondary: schema.cta?.secondary || defaultSchema.cta.secondary,
      primaryLabel: schema.cta?.primaryLabel || defaultSchema.cta.primaryLabel,
      secondaryLabel: schema.cta?.secondaryLabel || defaultSchema.cta.secondaryLabel,
      primaryHref: schema.cta?.primaryHref || defaultSchema.cta.primaryHref,
      secondaryHref: schema.cta?.secondaryHref || defaultSchema.cta.secondaryHref,
    },
  };
}
