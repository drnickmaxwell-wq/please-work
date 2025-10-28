"use client";

import { useCallback, useEffect, useState } from "react";

import Hero4KVideo from "@/components/hero/4k-hero-video";

export const dynamic = "force-dynamic";

type Diagnostics = {
  gradient: string;
  magenta: string;
  teal: string;
  vignetteAlpha: string;
  particlesOpacity: string;
  sheenDesktop: string;
  sheenMobile: string;
  particlesDesktop: string;
  particlesMobile: string;
  reducedMotion: string;
  hasSurfaceClass: string;
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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const captureSnapshot = useCallback((): Diagnostics => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const hero = document.querySelector<HTMLElement>('section[data-hero="champagne"]');

    const tokenValue = (tokenName?: string | null) =>
      tokenName ? styles.getPropertyValue(tokenName).trim() || 'n/a' : 'n/a';

    const gradientToken = hero?.dataset.gradientToken ?? TOKEN_KEYS.gradient;
    const gradient = tokenValue(gradientToken);
    const magenta = styles.getPropertyValue(TOKEN_KEYS.magenta).trim().toUpperCase();
    const teal = styles.getPropertyValue(TOKEN_KEYS.teal).trim().toUpperCase();

    const vignetteAlpha = tokenValue(hero?.dataset.vignetteAlpha);
    const sheenDesktop = tokenValue(hero?.dataset.sheenOpacityD);
    const sheenMobile = tokenValue(hero?.dataset.sheenOpacityM);
    const particlesDesktop = tokenValue(hero?.dataset.particlesOpacityD);
    const particlesMobile = tokenValue(hero?.dataset.particlesOpacityM);

    let particlesOpacity: string;
    const canvas = hero?.querySelector<HTMLCanvasElement>('.particles-layer');
    if (canvas) {
      particlesOpacity = getComputedStyle(canvas).opacity;
    } else if (!particlesOn) {
      particlesOpacity = '0 (toggle off)';
    } else if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      particlesOpacity = '0 (prefers-reduced-motion)';
    } else {
      particlesOpacity = 'n/a';
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'yes' : 'no';
    const hasSurfaceClass = hero?.classList.contains('champagne-surface') ? 'yes' : 'no';

    const snapshot: Diagnostics = {
      gradient,
      magenta,
      teal,
      vignetteAlpha,
      particlesOpacity,
      sheenDesktop,
      sheenMobile,
      particlesDesktop,
      particlesMobile,
      reducedMotion,
      hasSurfaceClass,
    };

    console.info('champagne-surface snapshot', snapshot);

    return snapshot;
  }, [particlesOn]);

  useEffect(() => {
    setSnapshot(captureSnapshot());

    const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const refresh = () => setSnapshot(captureSnapshot());
    const updateMotion = () => {
      setPrefersReducedMotion(motionQuery.matches);
      refresh();
    };

    setPrefersReducedMotion(motionQuery.matches);
    themeQuery.addEventListener('change', refresh);
    motionQuery.addEventListener('change', updateMotion);

    return () => {
      themeQuery.removeEventListener('change', refresh);
      motionQuery.removeEventListener('change', updateMotion);
    };
  }, [captureSnapshot]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setSnapshot(captureSnapshot()));
    return () => cancelAnimationFrame(frame);
  }, [captureSnapshot, particlesOn, waveOn]);

  const diagnostics: Array<[string, string]> = snapshot
    ? [
        ["Gradient", snapshot.gradient],
        ["Magenta", snapshot.magenta],
        ["Teal", snapshot.teal],
        ["Vignette alpha", snapshot.vignetteAlpha],
        ["Sheen opacity (desktop)", snapshot.sheenDesktop],
        ["Sheen opacity (mobile)", snapshot.sheenMobile],
        ["Particles token (desktop)", snapshot.particlesDesktop],
        ["Particles token (mobile)", snapshot.particlesMobile],
        ["Particles opacity", snapshot.particlesOpacity],
        ["Reduced motion", snapshot.reducedMotion],
        ["Has .champagne-surface", snapshot.hasSurfaceClass],
      ]
    : [];

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
        <span className="rounded-full border border-[color:var(--glass-border)] px-3 py-1 text-xs uppercase tracking-[0.08em] text-[color:var(--smh-text-muted)]">
          Reduced motion: {prefersReducedMotion ? "on" : "off"}
        </span>
        <span className="text-sm text-[color:var(--smh-text-muted)]">
          Wave overlay stays off unless you opt in.
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
        className="champagne-surface champagne-sheen relative mt-4 min-h-[28vh] overflow-hidden rounded-2xl"
      >
        <div className="gradient-layer" aria-hidden />
        <div className="wave-layer" aria-hidden data-state="off" />
        <canvas className="particles-layer" aria-hidden data-state="off" />
        <div className="vignette-layer" aria-hidden />
        <div className="absolute inset-0 grid place-items-center text-center">
          <p className="max-w-md font-serif text-lg text-[color:var(--smh-text)]">
            Reference surface with waves locked off. Sheen and vignette should feel calm and luminous.
          </p>
        </div>
      </section>

      <section
        data-hero="champagne"
        data-wave={waveOn ? "on" : "off"}
        className="champagne-surface champagne-sheen relative min-h-[32vh] overflow-hidden rounded-2xl"
      >
        <div className="gradient-layer" aria-hidden />
        <div className="wave-layer" aria-hidden data-state={waveOn ? "on" : "off"} />
        <canvas className="particles-layer" aria-hidden data-state={particlesOn ? "on" : "off"} />
        <div className="vignette-layer" aria-hidden />
        <div className="absolute inset-0 grid place-items-center text-center">
          <p className="max-w-md font-serif text-lg text-[color:var(--smh-text)]">
            Wave overlay is {waveOn ? "enabled" : "off"}. Toggle above to inspect layering and particle response.
          </p>
        </div>
      </section>
    </main>
  );
}
