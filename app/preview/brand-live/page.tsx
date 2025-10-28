"use client";

import { useCallback, useEffect, useState } from "react";

import Hero4KVideo from "@/components/hero/4k-hero-video";

type Snapshot = {
  gradient: string;
  magenta: string;
  teal: string;
  glassStrong: string;
  heroWaves: string;
};

const TOKENS: Array<[keyof Snapshot, string]> = [
  ["gradient", "--smh-gradient"],
  ["magenta", "--smh-primary-magenta"],
  ["teal", "--smh-primary-teal"],
  ["glassStrong", "--glass-bg-strong"],
  ["heroWaves", "--hero-waves"],
];

export default function BrandLivePreview() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);

  const captureSnapshot = useCallback(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    return TOKENS.reduce((acc, [key, token]) => {
      const value = styles.getPropertyValue(token).trim();
      (acc as Snapshot)[key] = value;
      return acc;
    }, {} as Snapshot);
  }, []);

  useEffect(() => {
    setSnapshot(captureSnapshot());

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = () => {
      setSnapshot(captureSnapshot());
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, [captureSnapshot]);

  const disableWaves = () => {
    document.documentElement.style.setProperty("--hero-waves", "0");
    setSnapshot(captureSnapshot());
  };

  return (
    <main className="min-h-screen space-y-8 bg-[color:var(--smh-bg)] p-6 text-[color:var(--smh-text)]">
      <Hero4KVideo />
      <div className="glass-pane max-w-3xl">
        <h2 className="font-serif text-2xl mb-4">Live brand surface</h2>
        {snapshot ? (
          <pre className="whitespace-pre-wrap font-mono text-sm">
{`gradient: ${snapshot.gradient}
magenta: ${snapshot.magenta}
teal: ${snapshot.teal}
glassStrong: ${snapshot.glassStrong}
heroWaves: ${snapshot.heroWaves}`}
          </pre>
        ) : (
          <p aria-live="polite">Reading tokens…</p>
        )}
        <button
          type="button"
          className="glass-chip mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm text-[color:var(--smh-text)]"
          onClick={disableWaves}
        >
          Lock hero waves off
        </button>
      </div>
      <section data-hero="champagne" data-page="home" className="relative min-h-[40vh] rounded-2xl overflow-hidden mt-8">
        <div className="gold-flecks" aria-hidden="true" />
        <div className="absolute inset-0 grid place-items-center gap-4 text-center">
          <p className="text-white/80 font-serif text-xl">Champagne overlays test</p>
          <p className="text-sm text-white/70">
            Current --hero-waves: {snapshot?.heroWaves ?? "…"}
          </p>
        </div>
      </section>
    </main>
  );
}
