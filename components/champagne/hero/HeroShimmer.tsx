"use client";

import type { HeroShimmerDensity } from "@/lib/champagne/hero-schema";

type HeroShimmerProps = {
  density: HeroShimmerDensity;
};

const SHIMMER_STACK = [
  "/brand/particles/particles-soft.webm",
  "/brand/particles/iridescent-glow.webm",
  "/brand/particles/gold-dust-drift.webm",
];

export function HeroShimmer({ density }: HeroShimmerProps) {
  return (
    <div className="hero-shimmer-layer" aria-hidden="true" data-density={density}>
      <video autoPlay loop muted playsInline poster="/brand/waves-bg-1024.webp">
        {SHIMMER_STACK.map((src) => (
          <source key={src} src={src} type="video/webm" />
        ))}
      </video>
    </div>
  );
}
