'use client';

import Link from 'next/link';

import { useBrand } from '@/app/hooks/useBrand';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

const sanitizeAssetPath = (asset?: string) => {
  if (!asset) {
    return undefined;
  }

  return asset.startsWith('/public/') ? asset.replace('/public', '') : asset;
};

export default function HeroLuxury() {
  const brand = useBrand();
  const prefersReducedMotion = usePrefersReducedMotion();

  const gradientBackground = brand?.gradient?.css ?? 'var(--smh-gradient)';
  const waveBackground = sanitizeAssetPath(brand?.waves?.background);
  const waveMask = sanitizeAssetPath(brand?.waves?.mask);
  const filmGrain = sanitizeAssetPath(brand?.textures?.filmGrain ?? brand?.textures?.grain);
  const particles = sanitizeAssetPath(brand?.particles?.soft ?? brand?.particles?.light);

  return (
    <section className="relative overflow-clip isolate">
      <div aria-hidden className="absolute inset-0" style={{ background: gradientBackground }} />

      {waveBackground ? (
        <img
          aria-hidden
          alt=""
          className="absolute inset-0 h-full w-full select-none object-cover mix-blend-soft-light pointer-events-none"
          loading="lazy"
          src={waveBackground}
        />
      ) : null}

      {waveMask ? (
        <div
          aria-hidden
          className="absolute inset-0 select-none pointer-events-none"
          style={{
            WebkitMaskImage: `url(${waveMask})`,
            maskImage: `url(${waveMask})`,
            WebkitMaskSize: 'cover',
            maskSize: 'cover',
          }}
        />
      ) : null}

      {filmGrain ? (
        <img
          aria-hidden
          alt=""
          className="absolute inset-0 h-full w-full select-none object-cover opacity-[0.08] pointer-events-none"
          loading="lazy"
          src={filmGrain}
        />
      ) : null}

      {!prefersReducedMotion && particles ? (
        <video
          aria-hidden
          className="absolute inset-0 h-full w-full select-none object-cover pointer-events-none"
          autoPlay
          muted
          loop
          playsInline
          style={{ opacity: 0.1 }}
          src={particles}
        />
      ) : null}

      <div className="relative mx-auto max-w-5xl px-6 py-10 md:py-16">
        <div
          className="rounded-3xl border bg-white/8 shadow-xl backdrop-blur-xl dark:bg-black/20"
          style={{
            borderColor: 'var(--smh-hero-card-border)',
          }}
        >
          <div className="p-8 md:p-12">
            <div className="space-y-6 text-center" style={{ color: 'var(--smh-hero-card-text)' }}>
              <p className="text-sm uppercase tracking-[0.3em]">St Mary’s House</p>
              <h1 className="text-4xl font-serif font-semibold tracking-tight md:text-6xl">Going the Extra Smile</h1>
              <p className="mx-auto mt-4 max-w-prose text-base md:text-lg">
                Private dental care with calm precision, comfort-first technology, and a signature Manus AI finish.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  data-cta="primary"
                  className="relative inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-[var(--smh-gradient)] px-6 py-3 font-semibold text-[color:var(--smh-text)] transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)] hover:-translate-y-0.5"
                >
                  Book a consultation
                </Link>
                <Link
                  href="/treatments"
                  className="relative inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-transparent px-6 py-3 font-semibold text-[color:var(--smh-text)] transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)] hover:-translate-y-0.5"
                >
                  Explore treatments
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
