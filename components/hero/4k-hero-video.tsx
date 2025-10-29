'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';

import Particles from '@/components/brand/Particles';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

export interface Hero4KVideoProps {
  poster?: string;
  showParticles?: boolean;
  showWave?: boolean;
  [key: string]: unknown;
}

export default function Hero4KVideo({
  poster,
  showParticles = true,
  showWave = false,
}: Hero4KVideoProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const particlesActive = showParticles && !prefersReducedMotion;
  const surfaceStyle = showWave
    ? ({
        '--champagne-wave': "url('/waves/smh-wave-mask.svg') center / cover no-repeat",
      } as CSSProperties)
    : undefined;
  const surfaceClass = [
    'champagne-surface relative w-full min-h-[min(95vh,1100px)] overflow-hidden text-white',
    showWave ? 'has-wave' : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      data-hero="champagne"
      data-page="home"
      data-wave={showWave ? 'on' : 'off'}
      data-particles={particlesActive ? 'on' : 'off'}
      data-reduced-motion={prefersReducedMotion ? 'true' : 'false'}
      className={surfaceClass}
      style={surfaceStyle}
    >
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="h-full w-full object-cover"
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
      <div aria-hidden className="wave" />
      {particlesActive ? (
        <Particles className="champagne-particles" data-state="on" aria-hidden />
      ) : (
        <div className="champagne-particles" data-state="off" aria-hidden style={{ opacity: 0 }} />
      )}
      <div aria-hidden className="champagne-sheen-layer" />

      <div className="relative z-[40] w-full px-6 py-20 md:px-10 md:py-24">
        <div className="champagne-glass relative mx-auto mt-20 max-w-[960px] rounded-champagne border border-[color:var(--champagne-keyline-gold)] bg-[color:var(--champagne-glass-bg)]/92 p-8 text-white shadow-champagne md:mt-28 md:p-10">
          <div className="space-y-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">St Mary’s House</p>
            <h1 className="text-4xl font-serif font-semibold tracking-tight text-white md:text-6xl">Going the Extra Smile</h1>
            <p className="mx-auto mt-4 max-w-prose text-base opacity-90 md:text-lg">
              Private dental care with calm precision, comfort-first technology, and a signature Manus AI finish.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="relative inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-[var(--smh-gradient)] px-6 py-3 font-semibold text-[var(--smh-text)] transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)] hover:-translate-y-0.5"
              >
                Book a consultation
              </Link>
              <Link
                href="/treatments"
                className="relative inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-transparent px-6 py-3 font-semibold text-white/90 transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)] hover:-translate-y-0.5"
              >
                Explore treatments
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
