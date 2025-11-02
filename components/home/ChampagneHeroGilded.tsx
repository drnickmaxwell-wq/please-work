"use client";

import React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import { getHeroLayers } from "@/lib/brand/manifest";

type HeroLayers = Awaited<ReturnType<typeof getHeroLayers>>;

type MotionSource = {
  src: string;
  poster?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const WAVE_BG_FALLBACK = "/assets/champagne/waves/wave-bg.webp";
const WAVE_MASK_FALLBACK = "/assets/champagne/waves/wave-mask-desktop.webp";

export default function ChampagneHeroGilded() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [layers, setLayers] = useState<HeroLayers | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const data = await getHeroLayers();

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
          (await verify(data.waves?.mask)) ??
          "/assets/champagne/waves/wave-mask-desktop.webp";
        const verifiedWavesBackground =
          (await verify(data.waves?.background)) ??
          "/assets/champagne/waves/wave-bg.webp";
        const verifiedFilmGrain =
          (await verify(data.textures?.filmGrain)) ??
          "/assets/champagne/textures/home-hero-film-grain.webp";
        const verifiedSoftParticles =
          (await verify(data.particles?.soft)) ??
          "/assets/champagne/particles/home-hero-particles.webp";

        const verifiedLayers: HeroLayers = {
          waves: {
            ...data.waves,
            mask: verifiedWavesMask,
            background: verifiedWavesBackground,
          },
          textures: {
            ...data.textures,
            filmGrain: verifiedFilmGrain,
          },
          particles: data.particles
            ? {
                ...data.particles,
                soft: verifiedSoftParticles,
              }
            : {
                soft: verifiedSoftParticles,
              },
          motion: data.motion,
        };

        if (isMounted) {
          setLayers(verifiedLayers);
          console.log("[hero-gilded] verified layers", verifiedLayers);
        }
      } catch {
        if (isMounted) {
          setLayers({
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
          } as HeroLayers);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);

    updateMotionPreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateMotionPreference);

      return () => {
        mediaQuery.removeEventListener("change", updateMotionPreference);
      };
    }

    mediaQuery.addListener(updateMotionPreference);

    return () => {
      mediaQuery.removeListener(updateMotionPreference);
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

  const waveBgUrl =
    layers?.waves?.background || layers?.waveBg || WAVE_BG_FALLBACK;

  const waveMaskUrl = layers?.waves?.mask || layers?.waveMask || WAVE_MASK_FALLBACK;

  return (
    <section
      ref={heroRef}
      className="champagne-hero champagne-hero--gilded preview-hero-gilded"
      aria-labelledby="hero-gilded-title"
      data-smoothing="preview"
    >
      <div className="hero-gradient-base gradient-base" />

      <div
        className="hero-wave-bg"
        aria-hidden
        style={{ ["--wave-bg" as any]: `url("${waveBgUrl}")` }}
      />

      <div
        className="hero-wave-mask"
        aria-hidden
        style={{ ["--wave-mask" as any]: `url("${waveMaskUrl}")` }}
      />

      {!reduceMotion && (
        <>
          <div className="hero-wave-caustics parallax-1">
            <video autoPlay loop muted playsInline preload="auto">
              <source
                src="/assets/champagne/motion/wave-caustics.webm"
                type="video/webm"
              />
            </video>
          </div>

          <div className="hero-glass-shimmer">
            <video autoPlay loop muted playsInline preload="auto">
              <source
                src="/assets/champagne/motion/glass-shimmer.webm"
                type="video/webm"
              />
            </video>
          </div>

          <div className="hero-particles-drift">
            <video autoPlay loop muted playsInline preload="auto">
              <source
                src="/assets/champagne/motion/particles-drift.webm"
                type="video/webm"
              />
            </video>
          </div>

          <div className="hero-gold-dust-drift parallax-2 lux-gold">
            <video autoPlay loop muted playsInline preload="auto">
              <source
                src="/assets/champagne/particles/gold-dust-drift.webm"
                type="video/webm"
              />
            </video>
          </div>

          {particleSources.map(({ src, poster }) => (
            <div className="hero-particles-drift" key={src}>
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster={poster}
              >
                <source src={src} type="video/webm" />
              </video>
            </div>
          ))}
        </>
      )}

      <div className="hero-particles-static" />

      <div
        className="hero-film-grain"
        style={{
          backgroundImage: layers?.textures?.filmGrain
            ? `url(${layers.textures.filmGrain})`
            : undefined,
        }}
      />

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
