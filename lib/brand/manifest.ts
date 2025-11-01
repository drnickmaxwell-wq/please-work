export type GradientStop = { color: string; pos?: number };

export type BrandParticle = {
  id: string;
  src: string;
  codec: string;
  duration: number;
  fps: number;
  loop: boolean;
  intensity: "subtle" | "ultra-subtle";
};

export type RawBrandManifest = {
  name?: string;
  version?: string;
  tokens?: string;
  gradient?: {
    angle?: number;
    stops?: GradientStop[];
    css?: string;
  };
  gold?: { hex?: string; usage?: string };
  typography?: { headings?: string; body?: string };
  textures?: Record<string, string>;
  particles?: Record<string, string | boolean>;
  waves?: { background?: string; mask?: string };
  static: {
    textures: { filmGrain: string; glassSoft: string };
    waves: { background: string; mask: string };
  };
  dynamic?: {
    particles?: BrandParticle[];
  };
};

export type BrandTextures = Record<string, string | undefined> & {
  filmGrain?: string;
  glassSoft?: string;
};

export type BrandParticlesMap = Record<string, string | boolean | undefined> & {
  soft?: string;
};

export type BrandWaves = { background?: string; mask?: string };

export type BrandManifest = RawBrandManifest & {
  gradientCss: string;
  gradientStops: GradientStop[];
  gradientAngle?: number;
  textures: BrandTextures;
  particles: BrandParticlesMap;
  waves: BrandWaves;
};

function buildGradientCss(gradient?: RawBrandManifest["gradient"]): string {
  if (gradient?.css) {
    return gradient.css;
  }

  if (gradient?.stops?.length) {
    const angle = typeof gradient.angle === "number" ? gradient.angle : 135;
    const serializedStops = gradient.stops
      .filter((stop): stop is GradientStop & { color: string } => Boolean(stop?.color))
      .map((stop) =>
        typeof stop.pos === "number" ? `${stop.color} ${stop.pos}%` : stop.color,
      )
      .join(",");

    if (serializedStops.length > 0) {
      return `linear-gradient(${angle}deg,${serializedStops})`;
    }
  }

  return "var(--smh-gradient)";
}

function normalizeTextures(raw: RawBrandManifest): BrandTextures {
  const textures = { ...(raw.textures ?? {}) } as BrandTextures;

  if (!textures.filmGrain) {
    textures.filmGrain =
      raw.static?.textures?.filmGrain ?? textures.grain ?? textures["grainTexture"];
  }

  if (!textures.glassSoft) {
    textures.glassSoft = raw.static?.textures?.glassSoft ?? textures.glass;
  }

  return textures;
}

function normalizeWaves(raw: RawBrandManifest): BrandWaves {
  return {
    background:
      raw.static?.waves?.background ?? raw.waves?.background ?? undefined,
    mask: raw.static?.waves?.mask ?? raw.waves?.mask ?? undefined,
  };
}

function normalizeParticles(raw: RawBrandManifest): BrandParticlesMap {
  const particles = { ...(raw.particles ?? {}) } as BrandParticlesMap;

  if (!particles.soft) {
    const dynamicSoft = raw.dynamic?.particles?.find(
      (particle) => particle.id === "particles-soft",
    );

    particles.soft =
      (typeof particles.soft === "string" ? particles.soft : undefined) ??
      dynamicSoft?.src ??
      (typeof particles.light === "string" ? particles.light : undefined);
  }

  return particles;
}

export function normalizeBrandManifest(raw: RawBrandManifest): BrandManifest {
  const gradientCss = buildGradientCss(raw.gradient);
  const gradientStops = raw.gradient?.stops ?? [];
  const gradientAngle = raw.gradient?.angle;

  return {
    ...raw,
    gradient: {
      ...raw.gradient,
      css: gradientCss,
    },
    gradientCss,
    gradientStops,
    gradientAngle,
    textures: normalizeTextures(raw),
    particles: normalizeParticles(raw),
    waves: normalizeWaves(raw),
  };
}

let cache: BrandManifest | null = null;

export async function loadBrandManifest(): Promise<BrandManifest> {
  if (cache) return cache;
  // dynamic import so it works in both node & edge builds
  const res = await import("../../public/brand/manifest.json");
  const m = normalizeBrandManifest(res.default as RawBrandManifest);
  cache = m;
  return m;
}
