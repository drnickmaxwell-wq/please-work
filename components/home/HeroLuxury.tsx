"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { loadBrandManifest, type ChampagneManifest } from "@/lib/brand/manifest";

export default function HeroLuxury() {
  const [manifest, setManifest] = useState<ChampagneManifest | null>(null);

  useEffect(() => {
    let mounted = true;

    loadBrandManifest()
      .then((data) => {
        if (mounted) {
          setManifest(data);
        }
      })
      .catch(() => {
        if (mounted) {
          setManifest(null);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const motionSource =
    manifest?.motion?.goldDust ?? manifest?.motion?.particles ?? null;

  return (
    <section
      aria-label="Champagne Hero"
      className="relative overflow-hidden min-h-[72vh] md:min-h-[78vh] flex items-center"
    >
      <div
        className="absolute inset-0"
        style={{
          background: "var(--smh-gradient)",
        }}
        aria-hidden="true"
      />

      {manifest?.waves?.bg ? (
        <Image
          src={manifest.waves.bg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover pointer-events-none"
        />
      ) : null}

      {manifest?.waves?.mask ? (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            WebkitMaskImage: `url(${manifest.waves.mask})`,
            maskImage: `url(${manifest.waves.mask})`,
            WebkitMaskSize: "cover",
            maskSize: "cover",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            opacity: 0.9,
            background: "var(--smh-gradient)",
          }}
          aria-hidden="true"
        />
      ) : null}

      {motionSource ? (
        <video
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-25"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src={motionSource} type="video/webm" />
        </video>
      ) : null}

      {manifest?.textures?.filmGrain ? (
        <Image
          src={manifest.textures.filmGrain}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[.08] mix-blend-soft-light pointer-events-none"
        />
      ) : null}

      <div className="relative mx-auto w-full max-w-5xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="tracking-[.2em] text-xs font-medium text-[color:var(--smh-text)]/80 mb-2">
            ST MARY’S HOUSE
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight text-[color:var(--smh-text)] drop-shadow-[0_1px_0_rgba(0,0,0,.2)]">
            Your Luxury Smile Awaits
          </h1>
          <p className="mt-3 text-[15px] sm:text-base text-[color:var(--smh-text)]/85 max-w-xl">
            Private dental care with calm precision, comfort-first technology, and a signature Manus AI finish.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
            <a
              className="smh-gold-button inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium bg-white/80 hover:bg-white transition"
              href="/contact"
            >
              Book a consultation
            </a>
            <a
              className="smh-gold-button inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium bg-transparent backdrop-blur-md hover:bg-white/20 transition"
              href="/treatments"
            >
              Explore treatments
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          video {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
