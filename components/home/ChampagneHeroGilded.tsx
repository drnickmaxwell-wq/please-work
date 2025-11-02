"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { getHeroLayers } from "@/app/brand";

type HeroLayers = Awaited<ReturnType<typeof getHeroLayers>>;

type MotionSource = {
  src: string;
  poster?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function ChampagneHeroGilded() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [layers, setLayers] = useState<HeroLayers | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const manifestWaves =
    (layers as { waves?: { mask?: string; background?: string } } | null)?.
      waves;

  const waveMaskUrl =
    manifestWaves?.mask ||
    layers?.waveMask ||
    "/waves/smh-wave-mask.svg";
  const waveBgUrl =
    manifestWaves?.background ||
    layers?.waveBg ||
    "/assets/champagne/waves/wave-bg.webp";

  useEffect(() => {
    let isMounted = true;

    getHeroLayers()
      .then((heroLayers) => {
        if (isMounted) {
          setLayers(heroLayers);
        }
      })
      .catch(() => {
        /* no-op: preview should remain functional with static fallbacks */
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log("[hero-gilded] waveBg:", waveBgUrl, "waveMask:", waveMaskUrl);
  }, [waveBgUrl, waveMaskUrl]);

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
    if (!layers?.particles) {
      return [];
    }

    return layers.particles.map(({ src, poster }) => ({ src, poster }));
  }, [layers]);

  return (
    <section
      ref={heroRef}
      className="champagne-hero champagne-hero--gilded preview-hero-gilded"
      aria-labelledby="hero-gilded-title"
      data-smoothing="preview"
    >
      <div className="hero-gradient-base gradient-base" />

      <div
        className="hero-wave-bg parallax-1"
        data-layer="wave-bg"
        style={{ backgroundImage: `url('${waveBgUrl}')` }}
      />

      <div
        className="hero-wave-mask parallax-1"
        data-layer="wave-mask"
        style={
          {
            "--wave-mask-url": `url('${waveMaskUrl}')`,
          } as CSSProperties
        }
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
          backgroundImage: layers?.filmGrain
            ? `url(${layers.filmGrain})`
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
