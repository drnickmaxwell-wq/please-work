"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { useSearchParams } from "next/navigation";

import {
  getBrandManifestClient,
  type BrandManifest,
} from "@/lib/brand/manifest";

import LoopCrossfade from "./LoopCrossfade";
import useReducedMotion from "@/components/preview/useReducedMotion";

type HeroLayers = Pick<BrandManifest, "waves" | "textures" | "particles" | "motion">;

type MotionPosterMap = Record<string, string | undefined>;

type PreviewHeroLayers = HeroLayers & {
  waveMask?: string;
  waveBg?: string;
  motionPosters?: MotionPosterMap;
};

type MotionSource = {
  src: string;
  poster?: string;
};

type MotionEntry =
  | string
  | {
      src?: string | null;
      poster?: string | null;
      duration?: number | string | null;
      durationSec?: number | string | null;
      durationSeconds?: number | string | null;
    };

type MotionDurations = {
  caustics?: number;
  glass?: number;
  particles?: number;
  gold?: number;
  [key: string]: number | undefined;
};

type LoopMetrics = {
  effectiveDuration: number;
  metadataDuration?: number;
  manifestDuration?: number;
  isReady: boolean;
};

type LayerOpacities = {
  caustics: number;
  particles: number;
  gold: number;
};

type ManifestLayer = {
  name?: string | null;
  opacity?: number | string | null;
};

const OPACITY_DEFAULTS: LayerOpacities = {
  caustics: 0.08,
  particles: 0.06,
  gold: 0.04,
};

const OPACITY_MAX: LayerOpacities = {
  caustics: 0.1,
  particles: 0.08,
  gold: 0.06,
};

const OVERLAY_MAX = 0.18;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function parseDuration(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const match = /(?<seconds>\d+(?:\.\d+)?)s?/i.exec(value);
    if (match?.groups?.seconds) {
      return Number.parseFloat(match.groups.seconds);
    }
  }

  return undefined;
}

function parseLayerOpacityValue(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    if (value > 1) {
      return value / 100;
    }

    return Math.max(0, value);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (trimmed.endsWith("%")) {
      const numeric = Number.parseFloat(trimmed.slice(0, -1));
      if (Number.isFinite(numeric)) {
        return Math.max(0, numeric / 100);
      }
    }

    const parsed = Number.parseFloat(trimmed);
    if (Number.isFinite(parsed)) {
      return parsed > 1 ? parsed / 100 : Math.max(0, parsed);
    }
  }

  return undefined;
}

function getLayerOpacity(
  manifest: BrandManifest,
  layerNames: string[],
): number | undefined {
  const manifestWithLayers = manifest as BrandManifest & {
    layers?: ManifestLayer[] | null;
  };

  const layers = manifestWithLayers.layers;
  if (!Array.isArray(layers)) {
    return undefined;
  }

  for (const layer of layers) {
    const name = typeof layer?.name === "string" ? layer.name.toLowerCase() : "";
    if (!name) {
      continue;
    }

    if (layerNames.some((candidate) => name.includes(candidate))) {
      const parsed = parseLayerOpacityValue(layer?.opacity);
      if (typeof parsed === "number") {
        return parsed;
      }
    }
  }

  return undefined;
}

function clampLayerOpacities(base?: Partial<LayerOpacities>): LayerOpacities {
  const merged: LayerOpacities = {
    caustics: base?.caustics ?? OPACITY_DEFAULTS.caustics,
    particles: base?.particles ?? OPACITY_DEFAULTS.particles,
    gold: base?.gold ?? OPACITY_DEFAULTS.gold,
  };

  const clamped: LayerOpacities = {
    caustics: Math.min(Math.max(0, merged.caustics), OPACITY_MAX.caustics),
    particles: Math.min(Math.max(0, merged.particles), OPACITY_MAX.particles),
    gold: Math.min(Math.max(0, merged.gold), OPACITY_MAX.gold),
  };

  const total = clamped.caustics + clamped.particles + clamped.gold;

  if (total > OVERLAY_MAX && total > 0) {
    const scale = OVERLAY_MAX / total;

    return {
      caustics: Number((clamped.caustics * scale).toFixed(4)),
      particles: Number((clamped.particles * scale).toFixed(4)),
      gold: Number((clamped.gold * scale).toFixed(4)),
    };
  }

  return {
    caustics: Number(clamped.caustics.toFixed(4)),
    particles: Number(clamped.particles.toFixed(4)),
    gold: Number(clamped.gold.toFixed(4)),
  };
}

function getMotionDurations(manifest?: HeroLayers["motion"]): MotionDurations {
  if (!manifest) {
    return {};
  }

  const durations: MotionDurations = {};

  for (const [key, value] of Object.entries(manifest as Record<string, MotionEntry | undefined>)) {
    if (!value) {
      continue;
    }

    if (typeof value === "string") {
      const match = /duration-(\d+(?:\.\d+)?)s/i.exec(value);
      if (match) {
        durations[key] = Number.parseFloat(match[1]);
      }
      continue;
    }

    const duration =
      parseDuration(value.duration) ??
      parseDuration(value.durationSec) ??
      parseDuration(value.durationSeconds);

    if (typeof duration === "number") {
      durations[key] = duration;
    }
  }

  return durations;
}

function getMotionSrc(
  motion: PreviewHeroLayers["motion"],
  keys: string[],
  fallback: string,
): string {
  if (!motion) {
    return fallback;
  }

  const motionRecord = motion as Record<string, MotionEntry | undefined>;

  for (const key of keys) {
    const entry = motionRecord[key];
    if (!entry) {
      continue;
    }

    if (typeof entry === "string" && entry.trim().length > 0) {
      return entry;
    }

    if (typeof entry === "object" && typeof entry.src === "string" && entry.src.trim().length > 0) {
      return entry.src;
    }
  }

  return fallback;
}

function pickPoster(posters: MotionPosterMap | undefined, keys: string[]): string | undefined {
  if (!posters) {
    return undefined;
  }

  for (const key of keys) {
    const poster = posters[key];
    if (typeof poster === "string" && poster.length > 0) {
      return poster;
    }
  }

  return undefined;
}

function formatHudDuration(seconds?: number): string {
  if (typeof seconds !== "number" || !Number.isFinite(seconds)) {
    return "t=?s";
  }

  return `t=${seconds.toFixed(2)}s`;
}

export default function PreviewHeroGildedClient() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [layers, setLayers] = useState<PreviewHeroLayers | null>(null);
  const [durations, setDurations] = useState<MotionDurations>({});
  const [opacityConfig, setOpacityConfig] = useState<LayerOpacities>(() => clampLayerOpacities());
  const [loopMetrics, setLoopMetrics] = useState<Record<string, LoopMetrics>>({});

  const reduceMotion = useReducedMotion();
  const searchParams = useSearchParams();
  const showDevHud = searchParams?.get("hud") === "1";

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const manifest = await getBrandManifestClient();

        const verify = async (url?: string | null) => {
          if (!url) return null;

          try {
            const res = await fetch(url, { method: "HEAD" });
            return res.ok ? url : null;
          } catch {
            return null;
          }
        };

        const verifiedWavesMask =
          (await verify(manifest.waves?.mask)) ??
          "/assets/champagne/waves/wave-mask-desktop.webp";
        const verifiedWavesBackground =
          (await verify(manifest.waves?.background)) ??
          "/assets/champagne/waves/wave-bg.webp";
        const verifiedFilmGrain =
          (await verify(manifest.textures?.filmGrain)) ??
          "/assets/champagne/textures/home-hero-film-grain.webp";
        const verifiedSoftParticles =
          (await verify(manifest.particles?.soft)) ??
          "/assets/champagne/particles/home-hero-particles.webp";

        const motionPosters = (manifest as BrandManifest & {
          motionPosters?: Record<string, string | null | undefined>;
        }).motionPosters;

        let verifiedMotionPosters: MotionPosterMap | undefined;

        if (motionPosters) {
          const entries = await Promise.all(
            Object.entries(motionPosters).map(async ([key, url]) => {
              const verified = await verify(url ?? undefined);
              return [key, verified] as const;
            }),
          );

          verifiedMotionPosters = entries.reduce<MotionPosterMap>((acc, [key, url]) => {
            if (typeof url === "string") {
              acc[key] = url;
            }

            return acc;
          }, {});

          if (verifiedMotionPosters && Object.keys(verifiedMotionPosters).length === 0) {
            verifiedMotionPosters = undefined;
          }
        }

        const verifiedLayers: PreviewHeroLayers = {
          waves: {
            ...manifest.waves,
            mask: verifiedWavesMask,
            background: verifiedWavesBackground,
          },
          textures: {
            ...manifest.textures,
            filmGrain: verifiedFilmGrain,
          },
          particles: manifest.particles
            ? {
                ...manifest.particles,
                soft: verifiedSoftParticles,
              }
            : {
                soft: verifiedSoftParticles,
              },
          motion: manifest.motion,
          waveMask: verifiedWavesMask,
          waveBg: verifiedWavesBackground,
          motionPosters: verifiedMotionPosters,
        };

        if (isMounted) {
          const baseOpacities: Partial<LayerOpacities> = {
            caustics: getLayerOpacity(manifest, ["wave-caustics", "caustics"]),
            particles: getLayerOpacity(manifest, ["particles-drift", "particles"]),
            gold: getLayerOpacity(manifest, ["gold-dust-drift", "gold"]),
          };

          setOpacityConfig(clampLayerOpacities(baseOpacities));
          setLayers(verifiedLayers);
          setDurations(getMotionDurations(manifest.motion));
          console.log("[preview-hero-gilded] verified layers", verifiedLayers);
        }
      } catch {
        if (isMounted) {
          const fallbackLayers: PreviewHeroLayers = {
            waves: {
              mask: "/assets/champagne/waves/wave-mask-desktop.webp",
              background: "/assets/champagne/waves/wave-bg.webp",
            },
            textures: {
              filmGrain: "/assets/champagne/textures/home-hero-film-grain.webp",
            },
            particles: {
              soft: "/assets/champagne/particles/home-hero-particles.webp",
            },
            motion: undefined,
            waveMask: "/assets/champagne/waves/wave-mask-desktop.webp",
            waveBg: "/assets/champagne/waves/wave-bg.webp",
          };

          setOpacityConfig(clampLayerOpacities());
          setLayers(fallbackLayers);
          setDurations({});
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".champagne-hero");
    if (!root) {
      return;
    }

    const onScroll = () => {
      const y = window.scrollY;
      const fade = Math.min(1, y / 300);
      root.style.setProperty("--scroll-fade", fade.toFixed(2));
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      root.style.removeProperty("--scroll-fade");
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      const node = heroRef.current;
      node?.style.removeProperty("--parallax-1");
      node?.style.removeProperty("--parallax-2");
      return;
    }

    const node = heroRef.current;
    if (!node || typeof window === "undefined") {
      return;
    }

    let rafId = 0;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const centerDelta = rect.top + rect.height / 2 - viewportHeight / 2;
      const normalized = clamp(centerDelta / viewportHeight, -1, 1);
      const parallaxPrimary = Math.round(normalized * -6);
      const parallaxSecondary = Math.round(normalized * -4);

      node.style.setProperty("--parallax-1", String(parallaxPrimary));
      node.style.setProperty("--parallax-2", String(parallaxSecondary));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(update);
    };

    const onResize = () => {
      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    update();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [reduceMotion]);

  const particleSources = useMemo<MotionSource[]>(() => {
    const soft = layers?.particles?.soft;
    if (!soft || !soft.endsWith(".webm")) {
      return [];
    }

    return [{ src: soft, poster: layers?.particles?.poster }];
  }, [layers]);

  const waveMaskUrl =
    layers?.waveMask ?? "/assets/champagne/waves/wave-mask-desktop.webp";
  const waveBgUrl = layers?.waveBg ?? "/assets/champagne/waves/wave-bg.webp";

  const causticsSrc = getMotionSrc(
    layers?.motion,
    ["caustics", "waveCaustics"],
    "/assets/champagne/motion/wave-caustics.webm",
  );
  const glassSrc = getMotionSrc(
    layers?.motion,
    ["glass", "glassShimmer"],
    "/assets/champagne/motion/glass-shimmer.webm",
  );
  const particlesSrc = getMotionSrc(
    layers?.motion,
    ["particles", "particlesDrift"],
    "/assets/champagne/motion/particles-drift.webm",
  );
  const goldSrc = getMotionSrc(
    layers?.motion,
    ["gold", "goldDust"],
    "/assets/champagne/particles/gold-dust-drift.webm",
  );

  const causticsPoster = pickPoster(layers?.motionPosters, ["caustics", "waveCaustics"]);
  const glassPoster = pickPoster(layers?.motionPosters, ["glass", "glassShimmer"]);
  const particlesPoster = pickPoster(layers?.motionPosters, ["particles", "particlesDrift"]);
  const goldPoster = pickPoster(layers?.motionPosters, ["gold", "goldDust"]);

  const causticsDuration = durations.caustics ?? 8;
  const glassDuration = durations.glass ?? 8;
  const particlesDuration = durations.particles ?? 8;
  const goldDuration = durations.gold ?? 8;

  const overlaySum = useMemo(
    () => opacityConfig.caustics + opacityConfig.particles + opacityConfig.gold,
    [opacityConfig],
  );

  const heroStyle = useMemo<CSSProperties>(
    () => ({
      "--preview-layer-caustics": opacityConfig.caustics.toString(),
      "--preview-layer-particles": opacityConfig.particles.toString(),
      "--preview-layer-gold": opacityConfig.gold.toString(),
      "--preview-overlay-sum": overlaySum.toString(),
    }),
    [opacityConfig, overlaySum],
  );

  const handleLoopMetrics = useCallback(
    (layerKey: string) => (metrics: LoopMetrics) => {
      setLoopMetrics((previous) => {
        const current = previous[layerKey];
        if (
          current &&
          current.effectiveDuration === metrics.effectiveDuration &&
          current.metadataDuration === metrics.metadataDuration &&
          current.manifestDuration === metrics.manifestDuration &&
          current.isReady === metrics.isReady
        ) {
          return previous;
        }

        return {
          ...previous,
          [layerKey]: metrics,
        };
      });
    },
    [],
  );

  const activeLayers = useMemo(
    () => [
      "gradient",
      "wave-mask",
      "caustics",
      "particles",
      "film-grain",
      "glass",
      "content",
    ],
    [],
  );

  return (
    <section
      ref={heroRef}
      className="champagne-hero champagne-hero--gilded preview-hero-gilded"
      aria-labelledby="hero-gilded-title"
      data-smoothing="preview"
      data-reduce-motion={reduceMotion ? "true" : "false"}
      style={heroStyle}
    >
      <div className="hero-gradient-base gradient-base" />

      <div
        className="hero-wave-mask parallax-1"
        style={{
          backgroundImage: `url(${waveBgUrl}), url(${waveMaskUrl})`,
        }}
      />

      <div className="loop-pair hero-motion hero-wave-caustics parallax-1" data-layer="caustics">
        <LoopCrossfade
          src={causticsSrc}
          poster={causticsPoster}
          durationSec={causticsDuration}
          crossfadeMs={220}
          onMetricsChange={handleLoopMetrics("caustics")}
        />
      </div>

      <div className="loop-pair hero-motion hero-particles-drift" data-layer="particles">
        <LoopCrossfade
          src={particlesSrc}
          poster={particlesPoster}
          durationSec={particlesDuration}
          crossfadeMs={220}
          onMetricsChange={handleLoopMetrics("particles")}
        />
      </div>

      <div className="loop-pair hero-motion hero-gold-dust-drift lux-gold parallax-2" data-layer="gold">
        <LoopCrossfade
          src={goldSrc}
          poster={goldPoster}
          durationSec={goldDuration}
          crossfadeMs={220}
          onMetricsChange={handleLoopMetrics("gold")}
        />
      </div>

      <div className="hero-gold-dust-drift hero-gold-dust-drift--alt lux-gold" aria-hidden="true" />

      {particleSources.map(({ src, poster }) => (
        <div className="loop-pair hero-particles-drift hero-motion" data-layer="particles" key={src}>
          <LoopCrossfade
            src={src}
            poster={poster}
            durationSec={particlesDuration}
            crossfadeMs={220}
            onMetricsChange={handleLoopMetrics(src)}
          />
        </div>
      ))}

      {reduceMotion ? (
        <>
          {causticsPoster ? (
            <div
              className="hero-motion-poster hero-motion-poster--caustics parallax-1"
              style={{ backgroundImage: `url(${causticsPoster})` }}
              aria-hidden="true"
            />
          ) : null}
          {particlesPoster ? (
            <div
              className="hero-motion-poster hero-motion-poster--particles"
              style={{ backgroundImage: `url(${particlesPoster})` }}
              aria-hidden="true"
            />
          ) : null}
          {goldPoster ? (
            <div
              className="hero-motion-poster hero-motion-poster--gold parallax-2"
              style={{ backgroundImage: `url(${goldPoster})` }}
              aria-hidden="true"
            />
          ) : null}
        </>
      ) : null}

      <div className="hero-particles-static" />

      <div
        className="hero-film-grain"
        style={{
          backgroundImage: layers?.textures?.filmGrain
            ? `url(${layers.textures.filmGrain})`
            : undefined,
        }}
      />

      {reduceMotion && glassPoster ? (
        <div
          className="hero-motion-poster hero-motion-poster--glass"
          style={{ backgroundImage: `url(${glassPoster})` }}
          aria-hidden="true"
        />
      ) : null}

      <div className="loop-pair hero-motion hero-glass-shimmer" data-layer="glass">
        <LoopCrossfade
          src={glassSrc}
          poster={glassPoster}
          durationSec={glassDuration}
          crossfadeMs={220}
          onMetricsChange={handleLoopMetrics("glass")}
        />
      </div>

      <div className="hero-caustic-reflection" aria-hidden="true" />

      {showDevHud ? (
        <div
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            opacity: 0.6,
            fontFamily: "monospace",
            fontSize: "0.75rem",
            lineHeight: 1.25,
            textAlign: "right",
            pointerEvents: "none",
            color: "var(--champagne-hero-text, var(--smh-white))",
            background: "rgba(10, 8, 7, 0.55)",
            padding: "0.5rem 0.75rem",
            borderRadius: "0.5rem",
            backdropFilter: "blur(6px)",
            maxWidth: "16rem",
          }}
        >
          <div>layers: {activeLayers.join(", ")}</div>
          <div>prm: {reduceMotion ? "on" : "off"}</div>
          <div>
            opacities:
            {` c=${opacityConfig.caustics.toFixed(2)} p=${opacityConfig.particles.toFixed(2)} g=${opacityConfig.gold.toFixed(2)} Σ=${overlaySum.toFixed(2)}`}
          </div>
          <div>caustics {formatHudDuration(loopMetrics.caustics?.effectiveDuration ?? causticsDuration)}</div>
          <div>particles {formatHudDuration(loopMetrics.particles?.effectiveDuration ?? particlesDuration)}</div>
          <div>gold {formatHudDuration(loopMetrics.gold?.effectiveDuration ?? goldDuration)}</div>
          <div>glass {formatHudDuration(loopMetrics.glass?.effectiveDuration ?? glassDuration)}</div>
        </div>
      ) : null}

      <div className="hero-content">
        <div className="hero-content-wrapper">
          <h1 id="hero-gilded-title">Gilded Light, Calm Precision</h1>
          <p>
            Preview the Champagne experience in a dedicated sandbox. Refined motion,
            balanced shimmer, and the Manus signature glow.
          </p>
          <div className="hero-cta-group">
            <a href="/contact" className="hero-cta-primary">
              Request a private consult
            </a>
            <a href="/treatments" className="hero-cta-secondary">
              Explore bespoke treatments
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
