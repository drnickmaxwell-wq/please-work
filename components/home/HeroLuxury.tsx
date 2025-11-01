'use client';

import Link from 'next/link';

import { useBrand } from '@/app/hooks/useBrand';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

export default function HeroLuxury() {
  const brand = useBrand();
  const prefersReducedMotion = usePrefersReducedMotion();

  const gradientBackground = brand.gradient?.css ?? brand.gradientCss ?? 'var(--smh-gradient)';
  const waveBackground = brand.waves?.background ?? brand.static?.waves?.background;
  const waveMask = brand.waves?.mask ?? brand.static?.waves?.mask;
  const filmGrain = brand.textures?.filmGrain ?? brand.static?.textures?.filmGrain;
  const particlesSource = prefersReducedMotion
    ? undefined
    : brand.particles?.soft ??
      brand.dynamic?.particles?.find((particle) => particle.id === 'particles-soft')?.src ??
      undefined;

  return (
    <section className="relative isolate overflow-clip">
      <div aria-hidden className="absolute inset-0" style={{ background: gradientBackground }} />
      {waveBackground ? (
        <img
          aria-hidden
          alt=""
          className="absolute inset-0 h-full w-full select-none object-cover mix-blend-soft-light pointer-events-none"
          src={waveBackground}
          decoding="async"
        />
      ) : null}
      {waveMask ? (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            background: gradientBackground,
            WebkitMaskImage: `url(${waveMask})`,
            maskImage: `url(${waveMask})`,
            WebkitMaskSize: 'cover',
            maskSize: 'cover',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          }}
        />
      ) : null}
      {filmGrain ? (
        <img
          aria-hidden
          alt=""
          className="absolute inset-0 h-full w-full select-none object-cover opacity-[0.08] pointer-events-none"
          src={filmGrain}
          decoding="async"
        />
      ) : null}
      {particlesSource ? (
        <video
          aria-hidden
          className="absolute inset-0 h-full w-full select-none object-cover pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
          style={{ opacity: 0.1 }}
          src={particlesSource}
        />
      ) : null}
      <div className="relative z-10 mx-auto flex min-h-[min(95vh,1100px)] w-full items-center justify-center px-6 py-16 sm:py-20 md:px-10 md:py-24">
        <div className="mx-auto w-full max-w-5xl">
          <div
            className="rounded-3xl border bg-white/10 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,23,42,0.2)] dark:bg-slate-900/30"
            style={{ borderColor: 'var(--smh-card-border)' }}
          >
            <div className="p-8 md:p-12">
              <div className="space-y-6 text-center" style={{ color: 'var(--smh-white)' }}>
                <p className="text-sm uppercase tracking-[0.3em]">St Mary’s House</p>
                <h1 className="text-4xl font-serif font-semibold tracking-tight md:text-6xl">Going the Extra Smile</h1>
                <p className="mx-auto mt-4 max-w-prose text-base md:text-lg">
                  Private dental care with calm precision, comfort-first technology, and a signature Manus AI finish.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    data-cta="primary"
                    className="relative inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] px-6 py-3 text-sm font-semibold transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)] hover:-translate-y-0.5"
                    style={{
                      background: gradientBackground,
                      color: 'var(--smh-ink)',
                    }}
                  >
                    Book a consultation
                  </Link>
                  <Link
                    href="/treatments"
                    className="relative inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] px-6 py-3 text-sm font-semibold transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)] hover:-translate-y-0.5"
                    style={{ color: 'var(--smh-white)' }}
                  >
                    Explore treatments
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
