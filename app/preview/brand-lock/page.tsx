// app/preview/brand-lock/page.tsx — Runtime brand probe (read-only)
"use client";

import { useEffect, useState } from "react";

type Diagnostics = {
  gradient: string;
  tokenGradient: string;
  glassBg: string;
  backgroundSize: string;
  backgroundPosition: string;
};

export default function BrandLock() {
  const [diagnostics, setDiagnostics] = useState<Diagnostics | null>(null);

  useEffect(() => {
    const surface = document.querySelector<HTMLElement>(".champagne-surface");
    const glass = document.querySelector<HTMLElement>(".champagne-glass");
    if (!surface || !glass) return;

    const surfaceStyles = getComputedStyle(surface);
    const glassStyles = getComputedStyle(glass);
    const rootStyles = getComputedStyle(document.documentElement);

    const normalizeGradient = (value: string) =>
      value
        .replace(/\s*,\s*/g, ",")
        .replace(/\s*\(\s*/g, "(")
        .replace(/\s*\)\s*/g, ")")
        .replace(/\s+/g, " ")
        .trim();

    const gradient = normalizeGradient(surfaceStyles.backgroundImage);
    const tokenGradient = normalizeGradient(rootStyles.getPropertyValue("--smh-gradient"));
    console.log("gradient=", gradient);
    console.log("glassBg=", glassStyles.backgroundColor);
    console.log(
      "bgSize/Pos=",
      surfaceStyles.backgroundSize,
      surfaceStyles.backgroundPosition,
    );

    setDiagnostics({
      gradient,
      tokenGradient,
      glassBg: glassStyles.backgroundColor,
      backgroundSize: surfaceStyles.backgroundSize,
      backgroundPosition: surfaceStyles.backgroundPosition,
    });
  }, []);

  return (
    <main className="min-h-screen bg-[color:var(--smh-bg)] text-[color:var(--smh-text)]">
      <section className="champagne-surface saturation-lift hero flex min-h-screen items-center justify-center p-6">
        <div className="champagne-glass w-full max-w-2xl p-8">
          <h2 className="font-serif text-2xl">Brand lock diagnostics</h2>
          <p className="mt-2 text-sm opacity-80">
            Values below reflect live computed styles for the champagne surface stack.
          </p>
          <div className="mt-6 space-y-2 font-mono text-sm">
            {diagnostics ? (
              <>
                <p>gradient={diagnostics.gradient}</p>
                <p>tokenGradient={diagnostics.tokenGradient}</p>
                <p>glassBg={diagnostics.glassBg}</p>
                <p>bgSize/Pos={diagnostics.backgroundSize} | {diagnostics.backgroundPosition}</p>
              </>
            ) : (
              <p aria-live="polite">Sampling surface…</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
