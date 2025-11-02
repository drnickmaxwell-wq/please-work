"use client";
import { useEffect, useRef } from "react";
import { getChampagneManifest } from "@/lib/brand/manifest";
import "@/styles/preview/hero-gilded.css";

export default function HeroGildedClient() {
  const root = useRef<HTMLDivElement>(null);
  const wavesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let stop = false;
    (async () => {
      const m = await getChampagneManifest();
      if (stop) return;
      const el = root.current;
      const waves = wavesRef.current;
      if (!el || !waves) return;

      if (m?.waves?.background) {
        waves.style.setProperty("--wave-bg", `url("${m.waves.background}")`);
        waves.dataset.bgReady = "1";
      }
      if (m?.waves?.mask) {
        waves.style.setProperty("--wave-mask", `url("${m.waves.mask}")`);
        waves.dataset.maskReady = "1";
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
      {/* Waves layer sits UNDER content, independent of gradient */}
      <div ref={wavesRef} className="gilded-hero__waves" aria-hidden="true" />
      {/* Grain sits OVER waves, UNDER content via :after */}
      <div className="gilded-hero__content">
        <h1>Gilded Light, Calm Precision</h1>
        <p>
          Preview the Champagne experience in a dedicated sandbox. Refined motion, balanced
          shimmer, and the Manus signature glow.
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
