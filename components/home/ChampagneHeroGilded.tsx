"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, RefObject } from "react";

import { getBrandManifest, getHeroLayers } from "@/app/brand";

type HeroLayers = Awaited<ReturnType<typeof getHeroLayers>>;
type BrandManifest = Awaited<ReturnType<typeof getBrandManifest>>;

type MotionSource = {
  src: string;
  poster?: string;
};

const SMOOTH_LOOP_ENABLED =
  typeof process !== "undefined" &&
  /^(1|true)$/i.test(process.env.NEXT_PUBLIC_HERO_SMOOTH_LOOP ?? "");

const WAVE_MOTION_SRC = "/assets/champagne/motion/wave-caustics.webm";
const GLASS_MOTION_SRC = "/assets/champagne/motion/glass-shimmer.webm";
const PARTICLE_MOTION_SRC = "/assets/champagne/motion/particles-drift.webm";

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (event?: MediaQueryListEvent) => {
      setPrefersReducedMotion(event ? event.matches : mediaQuery.matches);
    };

    handleChange();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }

    return undefined;
  }, []);

  return prefersReducedMotion;
}

function useSmoothLoop(ref: RefObject<HTMLVideoElement>, enabled: boolean) {
  useEffect(() => {
    const video = ref.current;

    if (!video || !enabled) {
      return;
    }

    let fadeTimeout: ReturnType<typeof setTimeout> | undefined;

    const handleEnded = () => {
      if (!video) return;

      video.style.transition = "opacity 240ms ease";
      video.style.opacity = "0";

      fadeTimeout = setTimeout(() => {
        if (!video) return;

        video.currentTime = 0;
        void video.play();
        requestAnimationFrame(() => {
          if (!video) return;
          video.style.opacity = "1";
        });
      }, 120);
    };

    video.addEventListener("ended", handleEnded);

    return () => {
      if (fadeTimeout) {
        clearTimeout(fadeTimeout);
      }
      video.removeEventListener("ended", handleEnded);
      video.style.opacity = "";
      video.style.transition = "";
    };
  }, [ref, enabled]);
}

type MotionVideoProps = MotionSource & {
  className?: string;
};

function MotionVideo({ className, src, poster }: MotionVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useSmoothLoop(videoRef, SMOOTH_LOOP_ENABLED);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      playsInline
      loop={!SMOOTH_LOOP_ENABLED}
      preload="auto"
      poster={poster}
      aria-hidden
    >
      <source src={src} type="video/webm" />
    </video>
  );
}

export default function ChampagneHeroGilded() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [layers, setLayers] = useState<HeroLayers | null>(null);
  const [manifest, setManifest] = useState<BrandManifest | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const [heroLayers, brandManifest] = await Promise.all([
        getHeroLayers(),
        getBrandManifest(),
      ]);

      if (!mounted) return;

      setLayers(heroLayers);
      setManifest(brandManifest);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const resetParallax = () => {
      hero.style.setProperty("--scrollY", "0");
      hero.style.setProperty("--parallax-1", "0");
      hero.style.setProperty("--parallax-2", "0");
    };

    resetParallax();

    if (prefersReducedMotion) {
      return;
    }

    let frame: number | null = null;

    const update = () => {
      frame = null;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const heroTop = window.scrollY + rect.top;
      const viewportMid = window.scrollY + window.innerHeight / 2;
      const scrollProgressVH = ((viewportMid - heroTop) / window.innerHeight) * 100;
      const parallax1 = clamp(-0.06 * scrollProgressVH, -6, 6);
      const parallax2 = clamp(-0.03 * scrollProgressVH, -6, 6);

      hero.style.setProperty("--scrollY", scrollProgressVH.toFixed(2));
      hero.style.setProperty("--parallax-1", parallax1.toFixed(3));
      hero.style.setProperty("--parallax-2", parallax2.toFixed(3));
    };

    const queueUpdate = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(update);
    };

    queueUpdate();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      resetParallax();
    };
  }, [prefersReducedMotion]);

  const heroStyle = useMemo(() => {
    if (!layers && !manifest) {
      return undefined;
    }

    const gradientVar = manifest?.gradientVar ?? "--smh-gradient";
    const goldVar = manifest?.goldVar ?? "--smh-accent-gold";

    return {
      "--hero-gradient": `var(${gradientVar})`,
      "--lux-gold": `var(${goldVar})`,
      "--wave-mask-url": layers ? `url(${layers.waveMask})` : undefined,
      "--wave-background-url": layers ? `url(${layers.waveBg})` : undefined,
      "--hero-glass-url": layers ? `url(${layers.glassSoft})` : undefined,
      "--hero-grain-url": layers ? `url(${layers.filmGrain})` : undefined,
    } as CSSProperties;
  }, [layers, manifest]);

  const goldSource: MotionSource | null = useMemo(() => {
    if (layers && layers.particles.length > 0) {
      return layers.particles[0];
    }

    return null;
  }, [layers]);

  return (
    <section
      ref={heroRef}
      className="champagne-hero-gilded"
      aria-labelledby="champagne-hero-gilded-title"
      style={heroStyle}
    >
      <div className="hero-gradient-base" aria-hidden />

      <div className="hero-wave-mask parallax-1" aria-hidden />

      {!prefersReducedMotion && (
        <div className="hero-motion">
          <div className="hero-wave-caustics" data-motion="true">
            <MotionVideo className="hero-motion-video" src={WAVE_MOTION_SRC} />
          </div>
          <div className="hero-glass-shimmer" data-motion="true">
            <MotionVideo className="hero-motion-video" src={GLASS_MOTION_SRC} />
          </div>
          <div className="hero-particles-drift" data-motion="true">
            <MotionVideo className="hero-motion-video" src={PARTICLE_MOTION_SRC} />
          </div>
          {goldSource && (
            <div className="lux-gold parallax-2" data-motion="true">
              <MotionVideo
                className="hero-motion-video"
                src={goldSource.src}
                poster={goldSource.poster}
              />
            </div>
          )}
        </div>
      )}

      <div className="hero-particles-static" aria-hidden />
      <div className="hero-film-grain" aria-hidden />

      <div className="hero-content">
        <div className="hero-content-wrapper">
          <p className="hero-eyebrow">Manus Preview</p>
          <h1 id="champagne-hero-gilded-title">
            Tailored luminosity for every smile
          </h1>
          <p className="hero-subtitle">
            Immerse clients in the Manus champagne palette with motion that gently
            breathes, shimmered with gold yet tuned for accessibility.
          </p>
          <div className="hero-cta-group">
            <a className="hero-cta hero-cta-primary" href="/contact">
              Reserve your private consultation
            </a>
            <a className="hero-cta hero-cta-secondary" href="/treatments">
              Explore our digital artistry
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
