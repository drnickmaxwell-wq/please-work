"use client";

import { useEffect, useRef } from "react";
import { getChampagneManifest } from "@/lib/brand/manifest";
import "@/styles/preview/hero-gilded.css";

export default function HeroGildedClient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let stop = false;

    (async () => {
      const manifest = await getChampagneManifest();
      if (stop || !rootRef.current) return;

      const el = rootRef.current;

      if (manifest?.waves?.background) {
        el.style.setProperty("--wave-bg", `url("${manifest.waves.background}")`);
      }

      if (manifest?.waves?.mask) {
        el.style.setProperty("--wave-mask", `url("${manifest.waves.mask}")`);
      }

      if (manifest?.textures?.grain) {
        el.style.setProperty("--film-grain", `url("${manifest.textures.grain}")`);
      } else if (manifest?.textures?.filmGrain) {
        el.style.setProperty("--film-grain", `url("${manifest.textures.filmGrain}")`);
      }
    })();

    return () => {
      stop = true;
    };
  }, []);

  return (
    <section ref={rootRef} className="gilded-hero">
      <div className="gilded-hero__content">
        <h1>Gilded Light, Calm Precision</h1>
        <p>
          Preview the Champagne experience in a dedicated sandbox. Refined motion, balanced shimmer, and
          the Manus signature glow.
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
