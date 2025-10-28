"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import Hero4KVideo from "@/components/hero/4k-hero-video";
import Particles from "@/components/brand/Particles";

export const dynamic = "force-dynamic";

type Diagnostics = {
  gradient: string;
  magenta: string;
  teal: string;
  vignetteAlpha: string;
  sheenOpacity: string;
  particlesOpacity: string;
  surfaces: string[];
  reducedMotion: string;
};

const TOKEN_KEYS = {
  gradient: "--smh-gradient",
  magenta: "--smh-primary-magenta",
  teal: "--smh-primary-teal",
} as const;

export default function BrandLivePreview() {
  const [waveOn, setWaveOn] = useState(false);
  const [particlesOn, setParticlesOn] = useState(true);
  const [snapshot, setSnapshot] = useState<Diagnostics | null>(null);

  const captureSnapshot = useCallback((): Diagnostics => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);

    const gradient = styles.getPropertyValue(TOKEN_KEYS.gradient).trim();
    const magenta = styles.getPropertyValue(TOKEN_KEYS.magenta).trim().toUpperCase();
    const teal = styles.getPropertyValue(TOKEN_KEYS.teal).trim().toUpperCase();

    const vignetteAlpha = styles.getPropertyValue("--champagne-vignette-alpha").trim();
    const sheenOpacity = styles.getPropertyValue("--champagne-sheen-opacity").trim();

    let particlesOpacity = "n/a";
    const particlesElement = document.querySelector<HTMLElement>('.champagne-surface .champagne-particles');
    if (particlesElement) {
      particlesOpacity = getComputedStyle(particlesElement).opacity;
      const state = particlesElement.dataset.state;
      if (state === 'off') {
        particlesOpacity = `${particlesOpacity} (state: off)`;
      }
    } else if (!particlesOn) {
      particlesOpacity = "0 (toggle off)";
    }

    const surfaces = Array.from(document.querySelectorAll<HTMLElement>(".champagne-surface"))
      .map((surface, index) => {
        const baseLabel = surface.getAttribute("data-page") ?? surface.getAttribute("data-hero") ?? "surface";
        const label = `${baseLabel ?? 'surface'}#${index + 1}`;
        const waveActive = surface.classList.contains("has-wave") || surface.dataset.wave === "on";
        const particles = surface.querySelector<HTMLElement>(".champagne-particles");
        const particleState = particles?.dataset.state ?? (particles ? "on" : "none");
        return `${label}: wave=${waveActive ? "on" : "off"}, particles=${particleState}`;
      });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "yes" : "no";

    return {
      gradient,
      magenta,
      teal,
      vignetteAlpha,
      sheenOpacity,
      particlesOpacity,
      surfaces,
      reducedMotion,
    };
  }, [particlesOn]);

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
            ["Magenta token", snapshot.magenta],
            ["Teal token", snapshot.teal],
            ["Vignette alpha", snapshot.vignetteAlpha],
            ["Sheen opacity", snapshot.sheenOpacity],
            ["Particles opacity (computed)", snapshot.particlesOpacity],
            ["Active surfaces", snapshot.surfaces.join("; ") || "none"],
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
          className="rounded-full border border-[color:var(--glass-border)] px-4 py-2 text-sm"
          onClick={() => setWaveOn((value) => !value)}
        >
          Toggle wave (currently {waveOn ? "on" : "off"})
        </button>
        <button
          type="button"
          className="rounded-full border border-[color:var(--glass-border)] px-4 py-2 text-sm"
          onClick={() => setParticlesOn((value) => !value)}
        >
          Toggle particles (currently {particlesOn ? "on" : "off"})
        </button>
        <span className="text-sm text-[color:var(--smh-text-muted)]">
          Wave overlay stays off unless you opt in.
        </span>
        <span className="text-sm text-[color:var(--smh-text-muted)]">
          Reduced motion: {snapshot?.reducedMotion === "yes" ? "active" : "off"}
        </span>
      </div>

      <div className="max-w-4xl">
        <div className="glass-pane" style={{ boxShadow: "var(--glass-box-shadow)" }}>
          <div className="space-y-6 p-6">
            <h2 className="font-serif text-2xl">Live brand diagnostics</h2>
            {snapshot ? (
              <dl className="grid gap-3 font-mono text-xs sm:text-sm">
                {diagnostics.map(([label, value]) => (
                  <div key={label} className="flex flex-wrap items-baseline justify-between gap-4">
                    <dt className="uppercase tracking-[0.12em] text-[color:var(--smh-text-muted)]">{label}</dt>
                    <dd className="flex-1 text-right text-[color:var(--smh-text)]">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p aria-live="polite">Reading tokens…</p>
            )}
          </div>
        </div>
      </div>

      <section
        data-hero="champagne"
        data-wave="off"
        data-particles="off"
        className="champagne-surface relative mt-4 min-h-[28vh] overflow-hidden rounded-2xl"
      >
        <canvas className="champagne-particles" aria-hidden data-state="off" />
        <div className="champagne-vignette" aria-hidden />
        <div className="champagne-sheen" aria-hidden />
        <div className="absolute inset-0 grid place-items-center text-center">
          <p className="max-w-md font-serif text-lg text-[color:var(--smh-text-strong, var(--smh-text))]">
            Reference surface with waves locked off. Sheen and vignette should feel calm and luminous.
          </p>
        </div>
      </section>

      <section
        data-hero="champagne"
        data-wave={waveOn ? "on" : "off"}
        data-particles={particlesOn ? "on" : "off"}
        className={`champagne-surface relative min-h-[32vh] overflow-hidden rounded-2xl ${waveOn ? 'has-wave' : ''}`}
      >
        {particlesOn ? (
          <Particles className="champagne-particles" aria-hidden />
        ) : (
          <canvas className="champagne-particles" aria-hidden data-state="off" />
        )}
        <div className="champagne-vignette" aria-hidden />
        <div className="champagne-sheen" aria-hidden />
        <div className="absolute inset-0 grid place-items-center text-center">
          <p className="max-w-md font-serif text-lg text-[color:var(--smh-text-strong, var(--smh-text))]">
            Wave overlay is {waveOn ? "enabled" : "off"}. Toggle above to inspect layering and particle response.
          </p>
        </div>
      </section>
    </main>
  );
}
