"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { getChampagneHeroPreview } from "@/lib/brand/preview/getChampagneHeroPreview";
import "@/styles/preview/hero-gilded.css";

type PreviewManifest = Awaited<ReturnType<typeof getChampagneHeroPreview>>;

export default function GildedWavesHero() {
  const [manifest, setManifest] = useState<PreviewManifest | null>(null);

  useEffect(() => {
    let mounted = true;

    getChampagneHeroPreview().then((m) => {
      if (mounted) {
        setManifest(m);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!manifest) return null;

  return (
    <section className="gilded-hero">
      <div
        className="gilded-waves"
        style={{
          "--wave-bg": `url(${manifest.waves.background})`,
          "--wave-mask": `url(${manifest.waves.mask})`,
        } as CSSProperties}
      />
      <video
        className="gilded-motion"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={manifest.motion.caustics}
      />
      <video
        className="gilded-motion"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={manifest.motion.glass}
      />
      <video
        className="gilded-motion"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={manifest.motion.particles}
      />
      <div
        className="gilded-grain"
        style={{ "--grain": `url(${manifest.textures.grain})` } as CSSProperties}
      />
      <div className="gilded-content">
        <h1>Gilded Light, Calm Precision</h1>
        <p>
          Preview the Champagne experience in a dedicated sandbox. Refined motion, balanced shimmer, and the Manus signature glow.
        </p>
        <div className="gilded-ctas">
          <a className="cta cta-primary" href="/contact">
            Request a private consult
          </a>
          <a className="cta cta-ghost" href="/treatments">
            Explore bespoke treatments
          </a>
        </div>
      </div>
    </section>
  );
}
