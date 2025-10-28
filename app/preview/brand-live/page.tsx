"use client";

import { useCallback, useEffect, useState } from "react";

export const dynamic = "force-dynamic";

import Hero4KVideo from "@/components/hero/4k-hero-video";

type Snapshot = {
  gradient: string;
  magenta: string;
  teal: string;
  glassStrong: string;
};

const TOKENS: Array<[keyof Snapshot, string]> = [
  ["gradient", "--smh-gradient"],
  ["magenta", "--smh-primary-magenta"],
  ["teal", "--smh-primary-teal"],
  ["glassStrong", "--glass-bg-strong"],
];

export default function BrandLivePreview() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [waveOn, setWaveOn] = useState(false);

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
      <div className="max-w-3xl">
        <div className="glass-pane">
          <div className="space-y-4 p-6">
            <h2 className="font-serif text-2xl">Live brand surface</h2>
            {snapshot ? (
              <pre className="whitespace-pre-wrap font-mono text-sm">
{`gradient: ${snapshot.gradient}
magenta: ${snapshot.magenta}
teal: ${snapshot.teal}
glassStrong: ${snapshot.glassStrong}`}
              </pre>
            ) : (
              <p aria-live="polite">Reading tokens…</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-full border border-[color:var(--glass-border)] px-4 py-2 text-sm"
          onClick={() => setWaveOn((value) => !value)}
        >
          Toggle wave (currently {waveOn ? "on" : "off"})
        </button>
        <span className="text-sm text-[color:var(--smh-text-muted)]">
          Wave overlay is opt-in. Default state is off.
        </span>
      </div>
      <section
        data-hero="champagne"
        data-wave={waveOn ? "on" : "off"}
        className="relative isolate mt-8 min-h-[40vh] overflow-hidden rounded-2xl"
      >
        <div className="gold-flecks" aria-hidden />
        <div className="absolute inset-0 grid place-items-center text-center">
          <p className="max-w-md font-serif text-xl text-[color:var(--smh-text)]">
            Wave overlay is {waveOn ? "enabled" : "off"}. Toggle above to inspect layering.
          </p>
        </div>
      </section>
    </main>
  );
}
