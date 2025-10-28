"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import Hero4KVideo from "@/components/hero/4k-hero-video";
import Particles from "@/components/brand/Particles";

export const dynamic = "force-dynamic";

type Diagnostics = {
  gradient: string;
  magenta: string;
  teal: string;
  surfaceCount: string;
  heroWave: string;
  particlesOpacity: string;
  vignetteAlpha: string;
  reducedMotion: string;
};

const TOKEN_KEYS = {
  gradient: "--brand-gradient",
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

    const surfaces = Array.from(document.querySelectorAll<HTMLElement>('.champagne-surface'));
    const hero = document.querySelector<HTMLElement>('section[data-hero="champagne"]');
    const surfaceCount = surfaces.length > 0 ? `${surfaces.length} surface(s)` : 'none';

    let particlesOpacity = 'n/a';
    let vignetteAlpha = 'n/a';
    const reducedMotionActive = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hero) {
      const particlesLayer = hero.querySelector<HTMLElement>('.particles');
      if (particlesLayer) {
        particlesOpacity = getComputedStyle(particlesLayer).opacity;
      } else if (!particlesOn) {
        particlesOpacity = '0 (toggle off)';
      } else if (reducedMotionActive) {
        particlesOpacity = '0 (prefers-reduced-motion)';
      }
      const vignetteLayer = hero.querySelector<HTMLElement>('.vignette');
      if (vignetteLayer) {
        const background = getComputedStyle(vignetteLayer).backgroundImage;
        const alphaMatches = Array.from(background.matchAll(/rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*(0?\.\d+)/gi));
        if (alphaMatches.length > 0) {
          vignetteAlpha = alphaMatches[alphaMatches.length - 1][1];
        }
      }
    }

    const heroWave = hero?.dataset.wave ?? 'n/a';
    const reducedMotion = reducedMotionActive ? "yes" : "no";

    return {
      gradient,
      magenta,
      teal,
      surfaceCount,
      heroWave,
      particlesOpacity,
      vignetteAlpha,
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
            ["Magenta", snapshot.magenta],
            ["Teal", snapshot.teal],
            ["Champagne surfaces", snapshot.surfaceCount],
            ["Hero data-wave", snapshot.heroWave],
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
        <div className="particles" aria-hidden style={{ opacity: 0 }} />
        <div className="vignette" aria-hidden />
        <div className="sheen" aria-hidden />
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
        className="champagne-surface relative min-h-[32vh] overflow-hidden rounded-2xl"
      >
        {particlesOn ? (
          <Particles className="particles" data-state="on" aria-hidden />
        ) : (
          <div className="particles" aria-hidden style={{ opacity: 0 }} />
        )}
        <div className="vignette" aria-hidden />
        <div className="sheen" aria-hidden />
        <div className="absolute inset-0 grid place-items-center text-center">
          <p className="max-w-md font-serif text-lg text-[color:var(--smh-text-strong, var(--smh-text))]">
            Wave overlay is {waveOn ? "enabled" : "off"}. Toggle above to inspect layering and particle response.
          </p>
        </div>
      </section>
    </main>
  );
}
