"use client";

import { useEffect, useRef } from "react";
import { getChampagneManifest } from "@/lib/brand/manifest";
import "@/styles/preview/hero-gilded.css";

export default function HeroGildedClient() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let stop = false;
    (async () => {
      const m = await getChampagneManifest();
      if (stop || !root.current) return;
      const el = root.current;
      if (m?.waves?.background) {
        el.style.setProperty("--wave-bg", `url("${m.waves.background}")`);
      }
      if (m?.waves?.mask) {
        el.style.setProperty("--wave-mask", `url("${m.waves.mask}")`);
      }
      if (m?.textures?.grain) {
        el.style.setProperty("--film-grain", `url("${m.textures.grain}")`);
      }
    })();
    return () => {
      stop = true;
    };
  }, []);

  return (
    <section ref={root} className="gilded-hero">
      <div className="gilded-hero__content">
        <h1>Gilded Light, Calm Precision</h1>
        <p>
          Preview the Champagne experience in a dedicated sandbox. Refined motion,
          balanced shimmer, and the Manus signature glow.
        </p>
        <div className="gilded-hero__ctas">
          <a className="cta cta--primary" href="/contact">
            Request a private consult
          </a>
          <a className="cta cta--ghost" href="/treatments">
            Explore bespoke treatments
          </a>
        </div>
      </div>
    </section>
  );
}
