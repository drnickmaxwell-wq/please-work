"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type TokenSnapshot = {
  gradient: string;
  magenta: string;
  teal: string;
  gold: string;
  glassWeak: string;
  glassStrong: string;
};

const TOKEN_KEYS: Array<[keyof TokenSnapshot, string]> = [
  ["gradient", "--smh-gradient"],
  ["magenta", "--brand-magenta"],
  ["teal", "--brand-teal"],
  ["gold", "--brand-gold"],
  ["glassWeak", "--glass-bg-weak"],
  ["glassStrong", "--glass-bg-strong"],
];

export default function BrandLockPreviewPage() {
  const [tokens, setTokens] = useState<TokenSnapshot | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const snapshot = TOKEN_KEYS.reduce<TokenSnapshot>((acc, [key, cssVar]) => {
      const raw = styles.getPropertyValue(cssVar).trim();
      return { ...acc, [key]: raw };
    }, {
      gradient: "",
      magenta: "",
      teal: "",
      gold: "",
      glassWeak: "",
      glassStrong: "",
    });
    setTokens(snapshot);
  }, []);

  return (
    <main className="min-h-screen bg-[var(--smh-bg)] px-6 py-16 text-[color:var(--smh-text)]">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-[0.4em] text-[color:var(--smh-text-muted)]">
            Champagne Lock Audit
          </p>
          <h1 className="font-serif text-3xl md:text-4xl">Brand tokens wired to production</h1>
          <p className="max-w-prose font-sans text-base text-[color:var(--smh-text-muted)]">
            These values come directly from <code>:root</code> so you can confirm the brand gradient, primaries, and glass pane
            translucency are shipping with the Champagne spec.
          </p>
        </header>

        <section className="glass-pane veiled relative overflow-hidden p-8" data-strength="strong">
          <h2 className="font-serif text-2xl text-[color:var(--smh-text)]">Computed tokens</h2>
          <div className="mt-6 space-y-3 font-mono text-sm text-[color:var(--smh-text)]">
            {tokens ? (
              <>
                <p>gradient: {tokens.gradient}</p>
                <p>
                  magenta: {tokens.magenta}, teal: {tokens.teal}, gold: {tokens.gold}
                </p>
                <p>glass-weak: {tokens.glassWeak}</p>
                <p>glass-strong: {tokens.glassStrong}</p>
              </>
            ) : (
              <p aria-live="polite">Reading tokens…</p>
            )}
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[var(--cta-gradient)] px-6 py-3 font-sans text-base font-medium text-[color:var(--ink)] shadow-[var(--shadow-cta-rest)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-cta)] focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_color-mix(in_srgb,var(--brand-gold)_65%,transparent),var(--shadow-cta-rest)]"
          >
            Return home
          </Link>
          <p className="font-sans text-sm text-[color:var(--smh-text-muted)]">
            Inspect the console on the home page for the same snapshot during development.
          </p>
        </footer>
      </div>
    </main>
  );
}
