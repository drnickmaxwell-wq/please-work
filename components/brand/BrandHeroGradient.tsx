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
  goldDensity: _goldDensity = "low",
  clip = "none",
}: Props) {
  const gradOpacity = { soft: 0.20, standard: 0.32, bold: 0.42 }[intensity];
  void _goldDensity;

  return (
    <div aria-hidden className="absolute inset-0">
      {/* Gradient wash */}
      <div
        className="brand-gradient brand-hue-drift"
        style={{
          opacity: gradOpacity,
          zIndex: 0,
        }}
      />

      {/* Wave mask (provide /public/waves/smh-wave-mask.svg in repo or via CDN) */}
      <div
        className="brand-wave"
        style={{
          opacity: waveOpacity,
          backgroundImage: `url(${asset("/waves/smh-wave-mask.svg")})`,
          zIndex: 0,
        }}
      />

      {/* Tri-palette particle sheets (gold/teal/magenta) */}
      <div
        className="brand-particles"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          backgroundImage:
            "url(/particles/particles-gold.webp),url(/particles/particles-teal.webp),url(/particles/particles-magenta.webp)",
          backgroundRepeat: "repeat,repeat,repeat",
          backgroundSize: "auto,auto,auto",
          opacity: 0.32,
        }}
      />

      {/* Film grain (swap to mobile variant in CSS if desired) */}
      <div
        className="brand-filmgrain"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          backgroundImage: `image-set(
            url(${asset("/textures/film-grain-desktop.webp")}) 1x
          )`,
        }}
      />
    </div>
  );
}
