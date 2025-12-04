"use client";

import { ChampagneHeroFrame } from "@/components/preview/champagne/ChampagneHeroFrame";

export default function ChampagneHero() {
  return (
    <ChampagneHeroFrame variant="home" titleId="home-hero-title">
      <h1 id="home-hero-title">Your Luxury Smile Awaits</h1>
      <p>
        Private dental care with calm precision, comfort-first technology, and a signature Manus AI finish.
      </p>
      <div className="hero-cta-group">
        <a href="/contact" className="hero-cta-primary">
          Book a consultation
        </a>
        <a href="/treatments" className="hero-cta-secondary">
          Explore treatments
        </a>
      </div>
    </ChampagneHeroFrame>
  );
}
