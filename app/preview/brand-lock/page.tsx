// app/preview/brand-lock/page.tsx — Runtime brand probe (read-only)
"use client";

import { useEffect, useState } from "react";

type Snapshot = {
  gradient: string;
  magenta: string;
  teal: string;
  gold: string;
  glassStrong: string;
};

const KEYS: Array<[keyof Snapshot, string]> = [
  ["gradient",   "--smh-gradient"],
  ["magenta",    "--smh-primary-magenta"],
  ["teal",       "--smh-primary-teal"],
  ["gold",       "--smh-accent-gold"],
  ["glassStrong","--glass-bg-strong"],
];

export default function BrandLock() {
  const [snap, setSnap] = useState<Snapshot | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const cs = getComputedStyle(root);
    const out = KEYS.reduce((acc, [k, v]) => {
      const val = cs.getPropertyValue(v).trim();
      (acc as any)[k] = val;
      return acc;
    }, {} as Snapshot);
    setSnap(out);
  }, []);

  return (
    <main className="min-h-[60vh] flex items-center justify-center bg-[color:var(--smh-bg)] text-[color:var(--smh-text)] p-6">
      <div className="glass-pane max-w-3xl w-full">
        <h2 className="font-serif text-2xl mb-4">Brand tokens are live</h2>
        {snap ? (
          <pre className="font-mono text-sm whitespace-pre-wrap">
{`gradient: ${snap.gradient}
magenta: ${snap.magenta}
teal:    ${snap.teal}
gold:    ${snap.gold}
glassStrong: ${snap.glassStrong}`}
          </pre>
        ) : (
          <p aria-live="polite">Reading tokens…</p>
        )}
      </div>
    </main>
  );
}
