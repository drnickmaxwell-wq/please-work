"use client";

import { useEffect, useState } from "react";
import "@styles/champagne/hero-gilded-tweaks.css";

export default function PreviewHeroGildedClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      aria-labelledby="hero-title"
      className="champagne-hero"
      // No hex. Keep background by tokens only.
      style={{ background: "var(--smh-gradient)" }}
    >
      <div className="glass-card">
        <h1 id="hero-title">Champagne Gilded Hero</h1>
        <p className="lede">Luxurious, elegant, motion-safe.</p>
      </div>
      {mounted && <div className="fx fx-particles" aria-hidden="true" />}
    </section>
  );
}
