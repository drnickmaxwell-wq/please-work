// components/brand/BrandHeroGradient.tsx
"use client";
import React from "react";
import { asset } from "@/lib/asset";

type Props = {
  /** Overall opacity of the gradient wash */
  intensity?: "soft" | "standard" | "bold";
  /** Opacity of wave mask layer (0–1) */
  waveOpacity?: number;
  /** Density of gold particles */
  goldDensity?: "low" | "med" | "high";
  /** Not used for clipping yet; reserved for future SVG clip-path variants */
  clip?: "none" | "wave-top" | "wave-bottom";
};

/**
 * BrandHeroGradient renders the Champagne gradient + wave + particles + film grain,
 * fully decorative (aria-hidden) and always behind content.
 * No binary assets are bundled here—images are resolved at runtime via asset().
 */
export default function BrandHeroGradient({
  intensity = "standard",
  waveOpacity = 0.18,
  goldDensity = "low",
  clip = "none",
}: Props) {
  const particleAlpha = { low: 0.10, med: 0.14, high: 0.18 }[goldDensity];
  const gradOpacity = { soft: 0.20, standard: 0.32, bold: 0.42 }[intensity];

  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      {/* Gradient wash */}
      <div className="brand-gradient brand-hue-drift" style={{ opacity: gradOpacity }} />

      {/* Wave mask (provide /public/waves/smh-wave-mask.svg in repo or via CDN) */}
      <div
        className="brand-wave"
        style={{
          opacity: waveOpacity,
          backgroundImage: `url(${asset("/waves/smh-wave-mask.svg")})`,
        }}
      />

      {/* Tri-palette particle sheets (gold/teal/magenta) */}
      <div
        className="brand-particles"
        style={{
          opacity: particleAlpha,
          backgroundImage: `
            url(${asset("/textures/particles-gold.webp")}),
            url(${asset("/textures/particles-teal.webp")}),
            url(${asset("/textures/particles-magenta.webp")})
          `,
        }}
      />

      {/* Film grain (swap to mobile variant in CSS if desired) */}
      <div
        className="brand-filmgrain"
        style={{
          backgroundImage: `image-set(
            url(${asset("/textures/film-grain-desktop.webp")}) 1x
          )`,
        }}
      />
    </div>
  );
}
