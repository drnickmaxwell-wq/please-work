"use client";

import type { HeroWaveMask } from "@/lib/champagne/hero-schema";

type HeroWaveStackProps = {
  mask: HeroWaveMask;
  opacity: number;
};

const WAVE_MAP: Record<HeroWaveMask, string> = {
  "wave-01": "/brand/waves/header-wave-mask.svg",
  "wave-02": "/brand/waves/wave-dots.svg",
  "wave-03": "/brand/waves/wave-field.svg",
};

export function HeroWaveStack({ mask, opacity }: HeroWaveStackProps) {
  const waveSrc = WAVE_MAP[mask] ?? WAVE_MAP["wave-01"];
  const blend = mask === "wave-03" ? "overlay" : "soft-light";
  const safeOpacity = Math.min(Math.max(opacity, 0.1), 0.45);

  return (
    <div className="hero-wave-layer" aria-hidden="true" data-blend={blend} style={{ opacity: safeOpacity }}>
      <svg viewBox="0 0 1440 600" role="presentation" focusable="false" aria-hidden="true">
        <defs>
          <pattern id={`wave-pattern-${mask}`} patternUnits="objectBoundingBox" width="1" height="1">
            <image href={waveSrc} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#wave-pattern-${mask})`} />
      </svg>
    </div>
  );
}
