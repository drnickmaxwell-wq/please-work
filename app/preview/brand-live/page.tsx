"use client";

import { useEffect, useState } from "react";
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

  const readSnapshot = () => {
    if (typeof window === "undefined") {
      return null;
    }

    const root = document.documentElement;
    const styles = getComputedStyle(root);

    return TOKENS.reduce((acc, [key, token]) => {
      const value = styles.getPropertyValue(token).trim();
      (acc as Snapshot)[key] = value;
      return acc;
    }, {} as Snapshot);
  };

  useEffect(() => {
    const next = readSnapshot();
    if (next) {
      setSnapshot(next);
    }
  }, []);

  const disableWaves = () => {
    if (typeof window === "undefined") {
      return;
    }

    document.documentElement.style.setProperty("--hero-waves", "0");
    const next = readSnapshot();
    if (next) {
      setSnapshot(next);
    }
  };

  return (
    <main className="min-h-screen space-y-8 bg-[color:var(--smh-bg)] p-6 text-[color:var(--smh-text)]">
      <Hero4KVideo />
      <div className="glass-pane max-w-3xl space-y-4">
        <h2 className="font-serif text-2xl mb-4">Live brand surface</h2>
        {snapshot ? (
          <>
            <pre className="whitespace-pre-wrap font-mono text-sm">
{`gradient: ${snapshot.gradient}
magenta: ${snapshot.magenta}
teal: ${snapshot.teal}
glassStrong: ${snapshot.glassStrong}
heroWaves: ${snapshot.heroWaves}`}
            </pre>
            <button
              type="button"
              className="smh-btn"
              onClick={disableWaves}
            >
              Lock hero waves to 0
            </button>
          </>
        ) : (
          <p aria-live="polite">Reading tokens…</p>
        )}
      </div>
      <section data-hero="champagne" data-page="home" className="relative min-h-[40vh] rounded-2xl overflow-hidden mt-8">
        <div className="gold-flecks" aria-hidden="true" />
        <div className="absolute inset-0 grid place-items-center">
          <p className="text-white/80 font-serif text-xl text-center">
            Champagne overlays test
            {snapshot ? (
              <span className="block text-sm opacity-80">
                Current --hero-waves: {snapshot.heroWaves || "(unset)"}
              </span>
            ) : null}
          </p>
        </div>
      </section>
    </main>
  );
}
