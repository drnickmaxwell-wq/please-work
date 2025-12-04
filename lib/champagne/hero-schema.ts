export type HeroTone = "dusk" | "teal-lux" | "noir" | "dawn" | "whitening" | "custom";
export type HeroIntensity = "soft" | "standard" | "lux";
export type HeroLayout = "left" | "center";
export type HeroWaveMask = "wave-01" | "wave-02" | "wave-03";
export type HeroShimmerDensity = "low" | "med" | "high";

export type HeroCTAConfig = {
  primary: string;
  secondary: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryHref?: string;
  secondaryHref?: string;
};

export type HeroSchema = {
  tone: HeroTone;
  intensity: HeroIntensity;
  waves: {
    mask: HeroWaveMask;
    opacity: number;
  };
  shimmer: {
    enabled: boolean;
    density: HeroShimmerDensity;
  };
  cta: HeroCTAConfig;
  layout: HeroLayout;
  eyebrow: string;
  headline: string;
  subcopy: string;
};

const DEFAULT_SCHEMA: HeroSchema = {
  tone: "dusk",
  intensity: "standard",
  waves: {
    mask: "wave-01",
    opacity: 0.26,
  },
  shimmer: {
    enabled: true,
    density: "med",
  },
  cta: {
    primary: "cta-primary-ink-light",
    secondary: "cta-secondary-glass-gold",
  },
  layout: "left",
  eyebrow: "",
  headline: "",
  subcopy: "",
};

function clampOpacity(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return DEFAULT_SCHEMA.waves.opacity;
  if (value < 0.1) return 0.1;
  if (value > 0.45) return 0.45;
  return value;
}

function normaliseTone(tone?: HeroTone) {
  if (!tone) return DEFAULT_SCHEMA.tone;
  const allowed: HeroTone[] = ["dusk", "teal-lux", "noir", "dawn", "whitening", "custom"];
  return allowed.includes(tone) ? tone : DEFAULT_SCHEMA.tone;
}

function normaliseIntensity(intensity?: HeroIntensity) {
  const allowed: HeroIntensity[] = ["soft", "standard", "lux"];
  if (!intensity || !allowed.includes(intensity)) return DEFAULT_SCHEMA.intensity;
  return intensity;
}

function normaliseLayout(layout?: HeroLayout) {
  const allowed: HeroLayout[] = ["left", "center"];
  if (!layout || !allowed.includes(layout)) return DEFAULT_SCHEMA.layout;
  return layout;
}

function normaliseWaveMask(mask?: HeroWaveMask) {
  const allowed: HeroWaveMask[] = ["wave-01", "wave-02", "wave-03"];
  if (!mask || !allowed.includes(mask)) return DEFAULT_SCHEMA.waves.mask;
  return mask;
}

function normaliseShimmerDensity(density?: HeroShimmerDensity) {
  const allowed: HeroShimmerDensity[] = ["low", "med", "high"];
  if (!density || !allowed.includes(density)) return DEFAULT_SCHEMA.shimmer.density;
  return density;
}

export function validateHeroSchema(schema?: Partial<HeroSchema>): HeroSchema {
  const safeTone = normaliseTone(schema?.tone);
  const safeIntensity = normaliseIntensity(schema?.intensity);
  const safeLayout = normaliseLayout(schema?.layout);
  const safeMask = normaliseWaveMask(schema?.waves?.mask);
  const safeOpacity = clampOpacity(schema?.waves?.opacity);
  const shimmerEnabled = schema?.shimmer?.enabled ?? DEFAULT_SCHEMA.shimmer.enabled;
  const shimmerDensity = normaliseShimmerDensity(schema?.shimmer?.density);

  return {
    tone: safeTone,
    intensity: safeIntensity,
    waves: { mask: safeMask, opacity: safeOpacity },
    shimmer: { enabled: shimmerEnabled, density: shimmerDensity },
    cta: {
      primary: schema?.cta?.primary || DEFAULT_SCHEMA.cta.primary,
      secondary: schema?.cta?.secondary || DEFAULT_SCHEMA.cta.secondary,
      primaryLabel: schema?.cta?.primaryLabel || DEFAULT_SCHEMA.cta.primaryLabel,
      secondaryLabel: schema?.cta?.secondaryLabel || DEFAULT_SCHEMA.cta.secondaryLabel,
      primaryHref: schema?.cta?.primaryHref || DEFAULT_SCHEMA.cta.primaryHref,
      secondaryHref: schema?.cta?.secondaryHref || DEFAULT_SCHEMA.cta.secondaryHref,
    },
    layout: safeLayout,
    eyebrow: schema?.eyebrow ?? DEFAULT_SCHEMA.eyebrow,
    headline: schema?.headline ?? DEFAULT_SCHEMA.headline,
    subcopy: schema?.subcopy ?? DEFAULT_SCHEMA.subcopy,
  };
}
