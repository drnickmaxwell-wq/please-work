"use client";

import { useEffect, useState } from "react";

import { getChampagneHeroManifest } from "@/lib/brand/manifest";

type Manifest = Awaited<ReturnType<typeof getChampagneHeroManifest>>;

type CssSnapshot = {
  wavesBg: string;
  wavesMask: string;
  heroGrain: string;
  heroGrainLegacy: string;
  heroGlass: string;
  gradient: string;
};

const PREFERS_REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export default function HeroGilded() {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    let active = true;

    getChampagneHeroManifest()
      .then((data) => {
        if (active) {
          setManifest(data);
        }
      })
      .catch(() => {
        /* swallow – preview keeps static fallbacks */
      });

    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return () => {
        active = false;
      };
    }

    const mediaQuery = window.matchMedia(PREFERS_REDUCED_MOTION_QUERY);
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);
    } else {
      mediaQuery.addListener?.(updatePreference);
    }

    return () => {
      active = false;
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", updatePreference);
      } else {
        mediaQuery.removeListener?.(updatePreference);
      }
    };
  }, []);

  useEffect(() => {
    if (!manifest || typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    const snapshot: CssSnapshot = {
      wavesBg: root.style.getPropertyValue("--waves-bg"),
      wavesMask: root.style.getPropertyValue("--waves-mask"),
      heroGrain: root.style.getPropertyValue("--hero-grain-url"),
      heroGrainLegacy: root.style.getPropertyValue("--hero-grain"),
      heroGlass: root.style.getPropertyValue("--hero-glass-url"),
      gradient: root.style.getPropertyValue("--smh-gradient"),
    };

    root.style.setProperty("--waves-bg", `url(${manifest.waves.background})`);
    root.style.setProperty("--waves-mask", `url(${manifest.waves.mask})`);

    if (manifest.textures?.grain) {
      const grainUrl = `url(${manifest.textures.grain})`;
      root.style.setProperty("--hero-grain-url", grainUrl);
      root.style.setProperty("--hero-grain", grainUrl);
    }

    if (manifest.textures?.glass) {
      root.style.setProperty(
        "--hero-glass-url",
        `url(${manifest.textures.glass})`,
      );
    }

    root.style.setProperty("--smh-gradient", manifest.gradient);

    return () => {
      restoreVariable(root, "--waves-bg", snapshot.wavesBg);
      restoreVariable(root, "--waves-mask", snapshot.wavesMask);
      restoreVariable(root, "--hero-grain-url", snapshot.heroGrain);
      restoreVariable(root, "--hero-grain", snapshot.heroGrainLegacy);
      restoreVariable(root, "--hero-glass-url", snapshot.heroGlass);
      restoreVariable(root, "--smh-gradient", snapshot.gradient);
    };
  }, [manifest]);

  return (
    <section
      className="preview-hero relative flex min-h-[70vh] items-center overflow-hidden"
      style={{ background: "var(--smh-gradient)" }}
    >
      <div className="waves-bg" aria-hidden />
      <div className="waves-mask" aria-hidden />
      {!reducedMotion && manifest?.motion?.["glass-shimmer"] && (
        <video
          className="absolute inset-0 h-full w-full object-cover pointer-events-none z-[3]"
          autoPlay
          playsInline
          muted
          loop
          src={manifest.motion["glass-shimmer"]}
        />
      )}
      <div className="heroGrain pointer-events-none absolute inset-0 z-[5]" aria-hidden />
      <div className="relative z-[4] container mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-4xl font-semibold text-white/95 drop-shadow-sm md:text-5xl">
          Gilded Light, Calm Precision
        </h1>
        <p className="mt-3 max-w-[52ch] text-white/80">
          Preview the Champagne experience in a dedicated sandbox. Refined motion, balanced shimmer, and the Manus signature glow.
        </p>
        <div className="mt-6 flex gap-3">
          <a className="btn-champagne" href="/contact">
            Request a private consult
          </a>
          <a className="btn-ghost" href="/treatments">
            Explore bespoke treatments
          </a>
        </div>
      </div>
    </section>
  );
}

function restoreVariable(element: HTMLElement, name: string, previous: string) {
  if (previous && previous.trim().length > 0) {
    element.style.setProperty(name, previous);
  } else {
    element.style.removeProperty(name);
  }
}
