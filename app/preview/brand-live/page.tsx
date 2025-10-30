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
    wave: false,
    particles: false,
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
  grainToken: string;
  vignette: string;
  vignetteToken: string;
  wave: string;
  particles: string;
};

type RuntimeDiagnostics = {
  surfaces: number;
  prefersReducedMotion: boolean;
};

type AssertionDiagnostics = {
  computedGradient: string;
  heroBorderRadius: string;
  heroRadiusIsZero: boolean | null;
  ctaColor: string;
  ctaMatchesTextToken: boolean | null;
};

const EMPTY_DIAGNOSTICS: TokenDiagnostics = {
  gradient: '…',
  magenta: '…',
  teal: '…',
  gold: '…',
  ink: '…',
  grain: '…',
  grainToken: '…',
  vignette: '…',
  vignetteToken: '…',
  wave: '…',
  particles: '…',
};

const EMPTY_ASSERTIONS: AssertionDiagnostics = {
  computedGradient: '…',
  heroBorderRadius: '…',
  heroRadiusIsZero: null,
  ctaColor: '…',
  ctaMatchesTextToken: null,
};

const normalizeColor = (value: string): string | null => {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith('#')) {
    const hex = trimmed.slice(1);
    if (hex.length === 3) {
      return `#${hex
        .split('')
        .map((char) => `${char}${char}`)
        .join('')}`;
    }
    if (hex.length === 6) {
      return `#${hex}`;
    }
    return null;
  }

  if (trimmed.startsWith('rgb')) {
    const sanitized = trimmed
      .replace(/rgba?|\(|\)|\//g, ' ')
      .split(/[\s,]+/)
      .filter(Boolean)
      .slice(0, 3)
      .map((component) => Math.round(Number(component)));

    if (sanitized.length !== 3 || sanitized.some((component) => Number.isNaN(component))) {
      return null;
    }

    return `#${sanitized
      .map((component) => component.toString(16).padStart(2, '0'))
      .join('')}`;
  }

  return trimmed;
};

const resolveCssVariable = (
  variable: string,
  root: CSSStyleDeclaration,
  seen: Set<string> = new Set()
): string => {
  if (seen.has(variable)) {
    return '';
  }

  seen.add(variable);
  const raw = root.getPropertyValue(variable).trim();
  if (!raw) {
    return '';
  }

  const match = raw.match(/var\((--[^,\s)]+)(?:,\s*(.+))?\)/);
  if (!match) {
    return raw;
  }

  const [, next, fallback] = match;
  const resolved = resolveCssVariable(next, root, seen);
  if (resolved) {
    return resolved;
  }

  return fallback ? fallback.trim() : raw;
};

export default function BrandLivePreviewPage() {
  const [tokens, setTokens] = useState<TokenDiagnostics>(EMPTY_DIAGNOSTICS);
  const [runtime, setRuntime] = useState<RuntimeDiagnostics>({ surfaces: 0, prefersReducedMotion: false });
  const [assertions, setAssertions] = useState<AssertionDiagnostics>(EMPTY_ASSERTIONS);

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const readRoot = (token: string) => root.getPropertyValue(token).trim();
    const firstSurface = document.querySelector<HTMLElement>('.champagne-surface');
    const surfaceStyle = firstSurface ? getComputedStyle(firstSurface) : null;
    const readSurface = (token: string) => {
      const raw = surfaceStyle?.getPropertyValue(token).trim() ?? '';
      return raw || '0';
    };

    const gradientToken = readRoot('--smh-gradient');
    const gradientNormalized = gradientToken.replace(/\s+/g, '');
    const grainAlpha = readSurface('--champagne-grain-alpha');
    const vignetteAlpha = readSurface('--champagne-vignette-alpha');
    const particlesAlpha = readSurface('--champagne-particles-alpha');
    const glassZ = Number.parseFloat(readRoot('--z-glass') || '0');
    const headerZ = Number.parseFloat(readRoot('--z-header') || '0');

    setTokens({
      gradient: gradientToken.replace(/\s+/g, ' '),
      magenta: readRoot('--smh-primary-magenta'),
      teal: readRoot('--smh-primary-teal'),
      gold: readRoot('--smh-accent-gold'),
      ink: readRoot('--smh-primary-ink'),
      grain: grainAlpha,
      grainToken: readRoot('--champagne-grain-alpha') || '0',
      vignette: vignetteAlpha,
      vignetteToken: readRoot('--champagne-vignette-alpha') || '0',
      wave: readSurface('--champagne-wave-alpha'),
      particles: particlesAlpha,
    });

    console.log(`[brand-live] gradient_string:${gradientNormalized}`);
    console.log(`[brand-live] grain_alpha:${grainAlpha}`);
    console.log(`[brand-live] vignette_alpha:${vignetteAlpha}`);
    console.log(`[brand-live] particles_alpha:${particlesAlpha}`);
    console.log(`[brand-live] z_index_glass:${Number.isFinite(glassZ) ? glassZ : 'n/a'}`);
    console.log(`[brand-live] z_index_header:${Number.isFinite(headerZ) ? headerZ : 'n/a'}`);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const audit = () =>
      setRuntime({
        surfaces: document.querySelectorAll('.champagne-surface').length,
        prefersReducedMotion: motionQuery.matches,
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

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const surfaceTarget = document.querySelector<HTMLElement>('.champagne-surface');
    const surfaceComputed = surfaceTarget ? getComputedStyle(surfaceTarget) : null;
    const gradientCandidate = surfaceComputed?.getPropertyValue('background-image').trim();
    const gradient = gradientCandidate && gradientCandidate !== 'none'
      ? gradientCandidate
      : root.getPropertyValue('--smh-gradient').replace(/\s+/g, ' ').trim();
    const normalizedGradient = gradient.replace(/\s+/g, '');

    const heroSurface = document.querySelector<HTMLElement>('[data-surface="hero"].champagne-surface');
    let heroBorderRadius = '0px';
    let heroRadiusIsZero: boolean | null = null;
    if (heroSurface) {
      const heroStyle = getComputedStyle(heroSurface);
      const radius = heroStyle.getPropertyValue('border-radius').trim();
      heroBorderRadius = radius || '0px';
      const numericRadius = parseFloat(radius || '0');
      heroRadiusIsZero = Number.isFinite(numericRadius) ? numericRadius === 0 : null;
    }

    const cta = document.querySelector<HTMLElement>('[data-cta="primary"]');
    let ctaColor = 'n/a';
    let ctaMatchesTextToken: boolean | null = null;
    if (cta) {
      const computedColor = getComputedStyle(cta).color.trim();
      const normalizedCTAColor = normalizeColor(computedColor);
      const tokenColor = normalizeColor(resolveCssVariable('--smh-text', root));
      ctaColor = normalizedCTAColor ?? computedColor;
      if (normalizedCTAColor && tokenColor) {
        ctaMatchesTextToken = normalizedCTAColor === tokenColor;
      } else if (normalizedCTAColor) {
        ctaMatchesTextToken = false;
      }
    }

    setAssertions({
      computedGradient: gradient,
      heroBorderRadius,
      heroRadiusIsZero,
      ctaColor,
      ctaMatchesTextToken,
    });

    console.log(`[brand-live] cta_text_color:${ctaColor}`);
    console.log(`[brand-live] hero_border_radius:${heroBorderRadius || '0px'}`);
    console.log(`[brand-live] runtime_gradient_string:${normalizedGradient}`);
  }, []);

  const surfaceStyle = useMemo(
    () => ({ '--champagne-wave': "url('/waves/smh-wave-mask.svg') center / cover no-repeat" }) as CSSProperties,
    []
  );

  const ctaStatus = assertions.ctaMatchesTextToken;
  const beforeAfter = useMemo(
    () => [
      {
        label: 'Gradient',
        before: tokens.gradient,
        after: assertions.computedGradient,
      },
      {
        label: 'Vignette α',
        before: tokens.vignetteToken,
        after: tokens.vignette,
      },
      {
        label: 'Grain α',
        before: tokens.grainToken,
        after: tokens.grain,
      },
    ],
    [
      assertions.computedGradient,
      tokens.gradient,
      tokens.grain,
      tokens.grainToken,
      tokens.vignette,
      tokens.vignetteToken,
    ]
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
              className="champagne-surface"
              style={pane.wave ? surfaceStyle : undefined}
            >
              <div className="relative isolate overflow-hidden">
                <div aria-hidden className="wave" />
                {pane.particles ? (
                  <Particles aria-hidden className="champagne-particles" data-state="on" />
                ) : (
                  <div className="champagne-particles" data-state="off" aria-hidden style={{ opacity: 0 }} />
                )}
                <div aria-hidden className="champagne-sheen-layer" style={{ zIndex: 'var(--z-surface-grain)' }} />

                <div className="relative z-[var(--z-content)] flex min-h-[320px] flex-col justify-between gap-6 p-10">
                  <div className="space-y-3">
                    <h2 className="font-serif text-3xl">{pane.label}</h2>
                    <p className="text-white/80">{pane.description}</p>
                  </div>
                  {pane.id === 'hero' ? (
                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        data-cta="primary"
                        className="relative inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-[var(--smh-gradient)] px-5 py-3 font-semibold text-[var(--smh-text)] shadow-[0_12px_24px_rgba(11,13,15,0.25)] transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)] hover:-translate-y-0.5"
                      >
                        Diagnostic CTA
                      </button>
                    </div>
                  ) : null}
                  <div className="flex flex-wrap gap-4 text-[0.65rem] uppercase tracking-[0.45em] text-white/60">
                    <span>Wave: {pane.wave ? 'On' : 'Off'}</span>
                    <span>Particles: {pane.particles ? 'On' : 'Off'}</span>
                    <span>Gradient: Locked</span>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 text-left shadow-lg shadow-black/30 backdrop-blur">
          <h2 className="font-serif text-2xl text-white">Runtime Checks</h2>
          <ul className="mt-6 space-y-3 text-sm text-white">
            <li className="flex flex-wrap items-center justify-between gap-2 font-mono">
              <span className="uppercase tracking-[0.35em] text-white/60">Gradient</span>
              <span className="text-right">{assertions.computedGradient}</span>
            </li>
            <li className="flex flex-wrap items-center justify-between gap-2 font-mono">
              <span className="uppercase tracking-[0.35em] text-white/60">Vignette α</span>
              <span className="text-right">{tokens.vignette}</span>
            </li>
            <li className="flex flex-wrap items-center justify-between gap-2 font-mono">
              <span className="uppercase tracking-[0.35em] text-white/60">Grain α</span>
              <span className="text-right">{tokens.grain}</span>
            </li>
            <li className="flex flex-wrap items-center justify-between gap-2 font-mono">
              <span className="uppercase tracking-[0.35em] text-white/60">Wave α</span>
              <span className="text-right">{tokens.wave}</span>
            </li>
            <li className="flex flex-wrap items-center justify-between gap-2 font-mono">
              <span className="uppercase tracking-[0.35em] text-white/60">Particles α</span>
              <span className="text-right">{tokens.particles}</span>
            </li>
            <li className="flex flex-wrap items-center justify-between gap-2 font-mono">
              <span className="uppercase tracking-[0.35em] text-white/60">Hero Radius</span>
              <span className="text-right">
                {assertions.heroBorderRadius}
                {assertions.heroRadiusIsZero === null ? ' (pending)' : assertions.heroRadiusIsZero ? ' (zero)' : ' (non-zero)'}
              </span>
            </li>
            <li className="flex flex-wrap items-center justify-between gap-2 font-mono">
              <span className="uppercase tracking-[0.35em] text-white/60">CTA text equals var(--smh-text)</span>
              <span className="text-right">
                {ctaStatus === null ? 'PENDING' : ctaStatus ? 'PASS' : 'FAIL'}
              </span>
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 text-left shadow-lg shadow-black/30 backdrop-blur">
          <h2 className="font-serif text-2xl text-white">Before / After</h2>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.35em] text-white/60">Token baseline vs computed surface</p>
          <dl className="mt-6 space-y-3">
            {beforeAfter.map((item) => (
              <div key={item.label} className="flex flex-wrap items-center justify-between gap-2 font-mono text-sm text-white">
                <dt className="uppercase tracking-[0.35em] text-white/60">{item.label}</dt>
                <dd className="text-right">{item.before} → {item.after}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 text-left shadow-lg shadow-black/30 backdrop-blur">
          <h2 className="font-serif text-2xl text-white">Token Diagnostics</h2>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-white/60">
            {`documentComputed("--smh-gradient") → ${tokens.gradient}`}
          </p>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-white/50">Computed gradient</dt>
              <dd className="font-mono text-sm text-white">{assertions.computedGradient}</dd>
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
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-white/50">Wave α</dt>
              <dd className="font-mono text-sm text-white">{tokens.wave}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-white/50">Particles α</dt>
              <dd className="font-mono text-sm text-white">{tokens.particles}</dd>
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
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-white/50">Hero border radius</dt>
              <dd className="font-mono text-sm text-white">
                {assertions.heroBorderRadius}
                {assertions.heroRadiusIsZero === null ? ' (pending)' : assertions.heroRadiusIsZero ? ' (zero)' : ' (non-zero)'}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.35em] text-white/50">CTA text color</dt>
              <dd className="font-mono text-sm text-white">
                {assertions.ctaColor}
                {assertions.ctaMatchesTextToken === null
                  ? ' (pending)'
                  : assertions.ctaMatchesTextToken
                    ? ' (matches --smh-text)'
                    : ' (mismatch)'}
              </dd>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
