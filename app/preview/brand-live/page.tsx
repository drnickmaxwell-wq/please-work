"use client";

import { useEffect, useState } from "react";
import Hero4KVideo from "@/components/hero/4k-hero-video";

type Snapshot = {
  gradient: string;
  magenta: string;
  teal: string;
  glassStrong: string;
  glassBorder: string;
};

const TOKENS: Array<[keyof Snapshot, string]> = [
  ["gradient", "--smh-gradient"],
  ["magenta", "--smh-primary-magenta"],
  ["teal", "--smh-primary-teal"],
  ["glassStrong", "--glass-bg-strong"],
  ["glassBorder", "--glass-border"],
];

export default function BrandLivePreview() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const next = TOKENS.reduce((acc, [key, token]) => {
      const value = styles.getPropertyValue(token).trim();
      (acc as Snapshot)[key] = value;
      return acc;
    }, {} as Snapshot);
    setSnapshot(next);
  }, []);

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
glassBorder: ${snapshot.glassBorder}`}
          </pre>
        ) : (
          <p aria-live="polite">Reading tokens…</p>
        )}
      </div>
    </main>
  );
}
