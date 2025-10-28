"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

import Particles from "@/components/brand/Particles";
import Hero4KVideo from "@/components/hero/4k-hero-video";

export const dynamic = "force-dynamic";

type Diagnostics = {
  gradient: string;
  magenta: string;
  teal: string;
  surfaces: string;
  heroWave: string;
  particlesOpacity: string;
  vignetteAlpha: string;
  reducedMotion: string;
};

const TOKEN_KEYS = {
  gradient: "--smh-gradient",
  magenta: "--smh-primary-magenta",
  teal: "--smh-primary-teal",
} as const;

const WAVE_STYLE: CSSProperties = {
  "--champagne-wave": "url('/waves/smh-wave-mask.svg') center / cover no-repeat",
};

export default function BrandLivePreview() {
  const [waveOn, setWaveOn] = useState(false);
  const [particlesOn, setParticlesOn] = useState(true);
  const [snapshot, setSnapshot] = useState<Diagnostics | null>(null);
  const dynamicSurfaceClass = [
    "champagne-surface relative min-h-[32vh] overflow-hidden rounded-2xl",
    waveOn ? "has-wave" : null,
  ]
    .filter(Boolean)
    .join(" ");

  const captureSnapshot = useCallback((): Diagnostics => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);

    const gradient = styles.getPropertyValue(TOKEN_KEYS.gradient).trim();
    const magenta = styles.getPropertyValue(TOKEN_KEYS.magenta).trim().toUpperCase();
    const teal = styles.getPropertyValue(TOKEN_KEYS.teal).trim().toUpperCase();
    const vignetteAlpha = styles.getPropertyValue("--champagne-vignette-alpha").trim() || "n/a";

    const surfaces = Array.from(document.querySelectorAll<HTMLElement>(".champagne-surface"));
    const hero = document.querySelector<HTMLElement>('section[data-hero="champagne"]');
    const reducedMotionActive = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const heroWave = hero?.classList.contains("has-wave") ? "on" : "off";
    let particlesOpacity = "0";

    if (hero) {
      const particlesLayer = hero.querySelector<HTMLElement>(".champagne-particles");
      if (particlesLayer) {
        particlesOpacity = getComputedStyle(particlesLayer).opacity;
      }
    }

    const surfaceSummaries = surfaces.map((surface) => {
      const label = surface.dataset.hero ?? surface.dataset.surface ?? surface.tagName.toLowerCase();
      const waveState = surface.classList.contains("has-wave") ? "wave:on" : "wave:off";
      const particlesLayer = surface.querySelector<HTMLElement>(".champagne-particles");
      const particlesState = particlesLayer?.dataset.state ?? "off";
      return `${label} (${waveState}, particles:${particlesState})`;
    });

    return {
      gradient,
      magenta,
      teal,
      surfaces: surfaceSummaries.length ? surfaceSummaries.join(" | ") : "none",
      heroWave,
      particlesOpacity,
      vignetteAlpha,
      reducedMotion: reducedMotionActive ? "yes" : "no",
    };
  }, []);

  useEffect(() => {
    setSnapshot(captureSnapshot());

    const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const refresh = () => setSnapshot(captureSnapshot());

    themeQuery.addEventListener("change", refresh);
    motionQuery.addEventListener("change", refresh);

    return () => {
      themeQuery.removeEventListener("change", refresh);
      motionQuery.removeEventListener("change", refresh);
    };
  }, [captureSnapshot]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setSnapshot(captureSnapshot()));
    return () => cancelAnimationFrame(frame);
  }, [captureSnapshot, particlesOn, waveOn]);

  const diagnostics: Array<[string, string]> = useMemo(
    () =>
      snapshot
        ? [
            ["Gradient", snapshot.gradient],
            ["Magenta", snapshot.magenta],
            ["Teal", snapshot.teal],
            ["Champagne surfaces", snapshot.surfaces],
            ["Hero wave", snapshot.heroWave],
            ["Particles opacity (computed)", snapshot.particlesOpacity],
            ["Vignette alpha", snapshot.vignetteAlpha],
            ["Reduced motion active", snapshot.reducedMotion],
          ]
        : [],
    [snapshot]
  );

  return (
    <main className="min-h-screen space-y-10 bg-[color:var(--smh-bg)] p-6 text-[color:var(--smh-text)]">
      <Hero4KVideo showParticles={particlesOn} showWave={waveOn} />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="rounded-full border border-[color:var(--champagne-glass-border)] px-4 py-2 text-sm"
          onClick={() => setWaveOn((value) => !value)}
        >
          Toggle wave (currently {waveOn ? "on" : "off"})
        </button>
        <button
          type="button"
          className="rounded-full border border-[color:var(--champagne-glass-border)] px-4 py-2 text-sm"
          onClick={() => setParticlesOn((value) => !value)}
        >
          Toggle particles (currently {particlesOn ? "on" : "off"})
        </button>
        <span className="text-sm text-[color:var(--smh-text-subtle)]">
          Reduced motion: {snapshot?.reducedMotion === "yes" ? "active" : "off"}
        </span>
      </div>

      <section aria-live="polite" className="rounded-2xl border border-[color:var(--champagne-glass-border)] bg-[color:var(--champagne-glass-bg)] p-6">
        <h2 className="mb-3 font-serif text-2xl">Live diagnostics</h2>
        {diagnostics.length > 0 ? (
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            {diagnostics.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1 rounded-lg border border-[color:var(--champagne-glass-border)] bg-[color:var(--champagne-glass-bg)]/60 p-3">
                <dt className="font-semibold text-[color:var(--smh-text)]">{label}</dt>
                <dd className="font-mono text-xs text-[color:var(--smh-text-subtle)]">{value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="text-sm text-[color:var(--smh-text-subtle)]">Reading tokens…</p>
        )}
      </section>

      <section
        data-hero="preview-static"
        data-surface="static"
        className="champagne-surface relative min-h-[28vh] overflow-hidden rounded-2xl"
        style={WAVE_STYLE}
      >
        <div aria-hidden className="absolute inset-0 z-0" />
        <div aria-hidden className="champagne-vignette" />
        <div aria-hidden className="champagne-sheen" />
        <div className="absolute inset-0 grid place-items-center text-center">
          <p className="max-w-md font-serif text-lg text-[color:var(--smh-text)]">
            Reference surface with waves and particles disabled. Sheen and vignette remain luminous.
          </p>
        </div>
      </section>

      <section
        data-hero="preview-dynamic"
        data-surface="dynamic"
        className={dynamicSurfaceClass}
        style={WAVE_STYLE}
      >
        <div aria-hidden className="absolute inset-0 z-0" />
        {particlesOn ? (
          <Particles className="champagne-particles" data-state="on" aria-hidden />
        ) : (
          <div className="champagne-particles" data-state="off" aria-hidden style={{ opacity: 0 }} />
        )}
        <div aria-hidden className="champagne-vignette" />
        <div aria-hidden className="champagne-sheen" />
        <div className="absolute inset-0 grid place-items-center text-center">
          <p className="max-w-md font-serif text-lg text-[color:var(--smh-text)]">
            Wave overlay is {waveOn ? "enabled" : "off"}. Particles are {particlesOn ? "rendering" : "disabled"}.
          </p>
        </div>
      </section>
    </main>
  );
}
