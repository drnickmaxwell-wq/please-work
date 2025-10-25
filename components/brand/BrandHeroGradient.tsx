// components/brand/BrandHeroGradient.tsx
"use client";

import React, { PropsWithChildren, useEffect, useMemo, useRef } from "react";
import { asset } from "@/lib/asset";
import ParticlesSoft from "./ParticlesSoft";
import { useParallax } from "./hooks/useParallax";
import "@/app/globals/hero-polish.css";

export type BrandHeroGradientProps = PropsWithChildren<{
  /** Overall opacity of the gradient wash */
  intensity?: "soft" | "standard" | "bold";
  /** Opacity of wave mask layer (0–1) */
  waveOpacity?: number;
  /** Density of gold particles */
  goldDensity?: "low" | "med" | "high";
  /** Not used for clipping yet; reserved for future SVG clip-path variants */
  clip?: "none" | "wave-top" | "wave-bottom";
  /** Toggle particle overlay */
  particles?: boolean;
}>;

const intensityOpacity = {
  soft: 0.2,
  standard: 0.32,
  bold: 0.42,
} as const;

const particleStrength = {
  low: 0.8,
  med: 1,
  high: 1.25,
} as const;

function MotionDiv({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReduce.matches) {
      element.dataset.ready = "true";
      element.style.opacity = "1";
      element.style.transform = "translate3d(0,0,0)";
      return;
    }

    let start: number | null = null;
    let frame: number;

    const animate = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / 600, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.style.opacity = eased.toString();
      element.style.transform = `translate3d(0, ${(1 - eased) * 18}px, 0)`;
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        element.dataset.ready = "true";
      }
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="brand-hero-motion" data-ready="false">
      {children}
    </div>
  );
}

export default function BrandHeroGradient({
  intensity = "standard",
  waveOpacity = 0.18,
  goldDensity = "low",
  clip = "none",
  particles = true,
  children,
}: BrandHeroGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const { x, y, rotateZ } = useParallax(containerRef);

  useEffect(() => {
    if (!highlightRef.current) return;
    highlightRef.current.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(
      2,
    )}px, 0) rotate(${rotateZ.toFixed(2)}deg)`;
  }, [x, y, rotateZ]);

  const baseOpacity = useMemo(() => Math.min(0.28 + intensityOpacity[intensity] * 1.3, 0.85), [intensity]);
  const accentOpacity = useMemo(
    () => Math.min(0.18 + intensityOpacity[intensity] * 1.1, 0.68),
    [intensity],
  );
  const highlightOpacity = useMemo(
    () => Math.min(0.24 + intensityOpacity[intensity] * 0.9, 0.72),
    [intensity],
  );

  const clipClass = useMemo(() => {
    if (clip === "wave-top") return "brand-hero-clip-top";
    if (clip === "wave-bottom") return "brand-hero-clip-bottom";
    return "";
  }, [clip]);

  const particleMultiplier = particleStrength[goldDensity] ?? particleStrength.low;

  return (
    <div ref={containerRef} className={`brand-hero-shell ${clipClass}`.trim()}>
      <div className="brand-hero-layers" aria-hidden="true">
        <div className="brand-hero-layer brand-hero-layer--base" style={{ opacity: baseOpacity }} />
        <div className="brand-hero-layer brand-hero-layer--accent" style={{ opacity: accentOpacity }} />
        <div
          className="brand-hero-layer brand-hero-layer--highlight"
          ref={highlightRef}
          style={{
            opacity: highlightOpacity,
            backgroundImage: `linear-gradient(120deg, color-mix(in oklab, var(--brand-gold) 32%, transparent) 0%, transparent 65%), url(${asset(
              "/brand-polish/glass-reflect.svg",
            )})`,
          }}
        />
        <div
          className="brand-hero-layer brand-hero-layer--wave"
          style={{
            opacity: waveOpacity,
            backgroundImage: `url(${asset("/brand-polish/wave-light-overlay.webp")})`,
          }}
        />
        <div
          className="brand-hero-layer brand-hero-layer--shimmer"
          style={{ opacity: Math.min(0.36 + intensityOpacity[intensity], 0.7) }}
        />
        <div
          className="brand-hero-layer brand-hero-layer--grain"
          style={{ backgroundImage: `image-set(url(${asset("/textures/film-grain-desktop.webp")}) 1x)` }}
        />
      </div>

      {particles ? <ParticlesSoft strength={particleMultiplier} /> : null}

      {children ? <MotionDiv>{children}</MotionDiv> : null}
    </div>
  );
}
