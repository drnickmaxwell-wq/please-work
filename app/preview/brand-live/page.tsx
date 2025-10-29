'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';

import Particles from '@/components/brand/Particles';

type PaneConfig = {
  id: string;
  label: string;
  description: string;
  wave: boolean;
  particles: boolean;
};

const PANES: PaneConfig[] = [
  {
    id: 'hero',
    label: 'Hero Surface',
    description: 'Full-bleed hero baseline with motion-friendly layers.',
    wave: true,
    particles: true,
  },
  {
    id: 'journey',
    label: 'Smile Journey',
    description: 'Card grid atop the gradient surface without animated flourishes.',
    wave: false,
    particles: false,
  },
];

type TokenDiagnostics = {
  gradient: string;
  magenta: string;
  teal: string;
  gold: string;
  ink: string;
  grain: string;
  vignette: string;
};

type RuntimeDiagnostics = {
  surfaces: number;
  prefersReducedMotion: boolean;
  gradient: string;
};

const EMPTY_DIAGNOSTICS: TokenDiagnostics = {
  gradient: '…',
  magenta: '…',
  teal: '…',
  gold: '…',
  ink: '…',
  grain: '…',
  vignette: '…',
};

export default function BrandLivePreviewPage() {
  const [tokens, setTokens] = useState<TokenDiagnostics>(EMPTY_DIAGNOSTICS);
  const [runtime, setRuntime] = useState<RuntimeDiagnostics>({ surfaces: 0, prefersReducedMotion: false, gradient: '…' });

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const read = (token: string) => root.getPropertyValue(token).trim();

    setTokens({
      gradient: read('--smh-gradient').replace(/\s+/g, ' '),
      magenta: read('--smh-primary-magenta'),
      teal: read('--smh-primary-teal'),
      gold: read('--smh-accent-gold'),
      ink: read('--smh-primary-ink'),
      grain: read('--champagne-filmgrain-alpha'),
      vignette: read('--champagne-vignette-alpha'),
    });

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const audit = () =>
      setRuntime({
        surfaces: document.querySelectorAll('.champagne-surface').length,
        prefersReducedMotion: motionQuery.matches,
        gradient: read('--smh-gradient').replace(/\s+/g, ' '),
      });

    audit();
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', audit);
    } else {
      motionQuery.addListener(audit);
    }
    return () => {
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', audit);
      } else {
        motionQuery.removeListener(audit);
      }
    };
  }, []);

  const surfaceStyle = useMemo(
    () => ({ '--champagne-wave': "url('/waves/smh-wave-mask.svg') center / cover no-repeat" }) as CSSProperties,
    []
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 sm:px-10 lg:py-24">
        <header className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.45em] text-white/50">SMH Brand Diagnostics</p>
          <h1 className="font-serif text-4xl sm:text-5xl">Champagne Gradient Lock Preview</h1>
          <p className="text-base text-white/70 sm:text-lg">
            Surfaces below demonstrate the canonical magenta→teal gradient, wave slot, particle layer, and champagne glass stack.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          {PANES.map((pane) => (
            <section
              key={pane.id}
              data-surface={pane.id}
              data-wave={pane.wave ? 'on' : 'off'}
              data-particles={pane.particles ? 'on' : 'off'}
              className="champagne-surface relative overflow-hidden"
              style={pane.wave ? surfaceStyle : undefined}
            >
              <div aria-hidden className="wave" />
              {pane.particles ? (
                <Particles
                  aria-hidden
                  className="champagne-particles"
                  data-state="on"
                  style={{ opacity: 'var(--champagne-particles-opacity-d)' }}
                />
              ) : (
                <div
                  aria-hidden
                  className="champagne-particles"
                  data-state="off"
                  style={{ opacity: 'var(--champagne-particles-opacity-m)' }}
                />
              )}
              <div aria-hidden className="champagne-sheen-layer" />

              <div className="relative z-[10] flex min-h-[320px] flex-col justify-between gap-6 p-10">
                <div className="space-y-3">
                  <h2 className="font-serif text-3xl">{pane.label}</h2>
                  <p className="text-white/80">{pane.description}</p>
                </div>
                <div className="flex flex-wrap gap-4 text-[0.65rem] uppercase tracking-[0.45em] text-white/60">
                  <span>Wave: {pane.wave ? 'On' : 'Off'}</span>
                  <span>Particles: {pane.particles ? 'On' : 'Off'}</span>
                  <span>Gradient: Locked</span>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 text-left shadow-lg shadow-black/30 backdrop-blur">
          <h2 className="font-serif text-2xl text-white">Token Diagnostics</h2>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-white/50">Gradient</dt>
              <dd className="font-mono text-sm text-white">{tokens.gradient}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-white/50">Magenta</dt>
              <dd className="font-mono text-sm text-white">{tokens.magenta}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-white/50">Teal</dt>
              <dd className="font-mono text-sm text-white">{tokens.teal}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-white/50">Gold</dt>
              <dd className="font-mono text-sm text-white">{tokens.gold}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-white/50">Ink</dt>
              <dd className="font-mono text-sm text-white">{tokens.ink}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-white/50">Grain α</dt>
              <dd className="font-mono text-sm text-white">{tokens.grain}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-white/50">Vignette α</dt>
              <dd className="font-mono text-sm text-white">{tokens.vignette}</dd>
            </div>
          </dl>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-white/50">Champagne Surfaces</dt>
              <dd className="font-mono text-sm text-white">{runtime.surfaces}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-white/50">Prefers Reduced Motion</dt>
              <dd className="font-mono text-sm text-white">{runtime.prefersReducedMotion ? 'true' : 'false'}</dd>
            </div>
          </div>
          <p className="mt-6 font-mono text-xs text-white/70">
            Computed gradient: {runtime.gradient}
          </p>
        </section>
      </div>
    </main>
  );
}
