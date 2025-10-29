'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';

type Report = {
  gradient: string;
  magenta: string;
  teal: string;
  gold: string;
  ink: string;
  glass_bg: string;
  vignette_alpha: string;
  filmgrain_alpha: string;
};

const INITIAL_REPORT: Report = {
  gradient: '…',
  magenta: '…',
  teal: '…',
  gold: '…',
  ink: '…',
  glass_bg: '…',
  vignette_alpha: '…',
  filmgrain_alpha: '…',
};

const SURFACES = [
  { id: 'hero', title: 'Hero Surface', description: 'Full-bleed hero baseline with canonical gradient.' },
  { id: 'journey', title: 'Smile Journey', description: 'Section grid baseline with champagne glass cards.' },
] as const;

export default function BrandLivePreviewPage() {
  const [report, setReport] = useState<Report>(INITIAL_REPORT);
  const [grainEnabled, setGrainEnabled] = useState(true);

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const read = (token: string) => root.getPropertyValue(token).trim();

    setReport({
      gradient: read('--smh-gradient').replace(/\s+/g, ' '),
      magenta: read('--smh-magenta'),
      teal: read('--smh-teal'),
      gold: read('--smh-gold'),
      ink: read('--smh-ink'),
      glass_bg: read('--champagne-glass-bg'),
      vignette_alpha: read('--champagne-vignette-alpha'),
      filmgrain_alpha: read('--champagne-filmgrain-alpha'),
    });
  }, []);

  const filmgrainValue = grainEnabled ? report.filmgrain_alpha || '0.05' : '0';

  const surfaceStyle = useMemo(
    () =>
      ({
        '--champagne-filmgrain-alpha': filmgrainValue,
      }) as CSSProperties,
    [filmgrainValue]
  );

  return (
    <main className="min-h-screen bg-ink text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 sm:px-10 lg:py-24">
        <header className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.45em] text-white/50">SMH Brand Diagnostics</p>
          <h1 className="font-serif text-4xl sm:text-5xl">Champagne Gradient Lock Preview</h1>
          <p className="text-base text-white/70 sm:text-lg">
            Surfaces below demonstrate the canonical gradient stack. Toggle particles to adjust the filmgrain alpha inline.
          </p>
        </header>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => setGrainEnabled((prev) => !prev)}
            className="rounded-full bg-white/10 px-5 py-2 text-sm font-medium uppercase tracking-[0.3em] text-white transition hover:bg-white/20"
          >
            Particles: {grainEnabled ? 'On' : 'Off'}
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {SURFACES.map((surface) => (
            <section
              key={surface.id}
              className="champagne-surface relative overflow-hidden rounded-[var(--champagne-radius)]"
              style={surfaceStyle}
            >
              <div className="relative z-[30] flex min-h-[320px] flex-col justify-between gap-6 p-10">
                <div className="space-y-3">
                  <h2 className="font-serif text-3xl">{surface.title}</h2>
                  <p className="text-white/80">{surface.description}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                  Overlay order: gradient → vignette → grain → glass → content
                </p>
              </div>
            </section>
          ))}
        </div>

        <section className="rounded-[var(--champagne-radius)] border border-white/10 bg-white/5 p-8 text-left shadow-lg shadow-black/30 backdrop-blur">
          <h2 className="font-serif text-2xl text-white">Token Diagnostics</h2>
          <pre className="mt-6 overflow-x-auto rounded-lg bg-black/40 p-5 font-mono text-sm text-white/90">
{`gradient: ${report.gradient}
magenta: ${report.magenta}
teal: ${report.teal}
gold: ${report.gold}
ink: ${report.ink}
glass_bg: ${report.glass_bg}
vignette_alpha: ${report.vignette_alpha}
filmgrain_alpha: ${filmgrainValue}`}
          </pre>
          <p className="mt-4 text-xs uppercase tracking-[0.35em] text-white/60">
            Overlay order (expected): gradient &lt; vignette &lt; grain &lt; glass &lt; content
          </p>
        </section>
      </div>
    </main>
  );
}
