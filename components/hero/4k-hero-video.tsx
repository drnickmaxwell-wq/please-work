'use client';

import Link from 'next/link';

import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

export interface Hero4KVideoProps {
  poster?: string;
  [key: string]: unknown;
}

export default function Hero4KVideo({ poster }: Hero4KVideoProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      data-hero="champagne"
      data-page="home"
      data-surface="hero"
      data-wave="off"
      data-particles="off"
      data-reduced-motion={prefersReducedMotion ? 'true' : 'false'}
      className="champagne-surface hero relative z-0"
    >
      <div className="relative isolate w-full min-h-[85vh] overflow-hidden md:min-h-[min(95vh,1100px)]">
        <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
          <video
            className="h-full w-full object-cover"
            style={{ objectPosition: '60% 50%' }}
            playsInline
            autoPlay
            muted
            loop
            preload="metadata"
            poster={poster ?? '/videos/posters/hero-4k.jpg'}
          >
            <source src="/videos/dental-hero-4k.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-[var(--z-content)] flex w-full justify-center px-6 py-20 md:px-10 md:py-24">
          <div className="champagne-glass relative z-20 mx-auto max-w-[960px] p-8 md:mt-28 md:p-10">
            <div className="relative z-[var(--z-content)] space-y-6 text-center" style={{ color: 'var(--smh-text)' }}>
              <p className="text-sm uppercase tracking-[0.3em]">St Mary’s House</p>
              <h1 className="text-4xl font-serif font-semibold tracking-tight md:text-6xl">Going the Extra Smile</h1>
              <p className="mx-auto mt-4 max-w-prose text-base md:text-lg">
                Private dental care with calm precision, comfort-first technology, and a signature Manus AI finish.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  data-cta="primary"
                  className="relative inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-[var(--smh-gradient)] px-6 py-3 font-semibold transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)] hover:-translate-y-0.5"
                  style={{ color: 'var(--smh-text)' }}
                >
                  Book a consultation
                </Link>
                <Link
                  href="/treatments"
                  className="relative inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-transparent px-6 py-3 font-semibold transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)] hover:-translate-y-0.5"
                  style={{ color: 'var(--smh-text)' }}
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
