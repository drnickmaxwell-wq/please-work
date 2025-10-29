'use client';

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
  const waveStyle = {
    '--champagne-wave': "url('/waves/smh-wave-mask.svg') center / cover no-repeat",
  } as CSSProperties;
  const surfaceStyle = {
    ...waveStyle,
    width: '100vw',
    marginInline: 'calc(50% - 50vw)',
  } as CSSProperties;
  const surfaceClass = [
    'champagne-surface relative w-screen overflow-hidden min-h-[clamp(520px,70vh,880px)]',
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
      <div aria-hidden className="absolute inset-0 z-0" />
      <div aria-hidden className="wave" />
      {particlesActive ? (
        <Particles className="champagne-particles" data-state="on" aria-hidden />
      ) : (
        <div className="champagne-particles" data-state="off" aria-hidden style={{ opacity: 0 }} />
      )}
      <div aria-hidden className="champagne-vignette" />
      <div aria-hidden className="champagne-sheen" />

      <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col px-6 py-12 sm:px-10">
        <div className="champagne-glass rounded-3xl">
          <div className="space-y-8 p-8 sm:p-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <div
                aria-hidden
                className="absolute inset-0 bg-[var(--smh-gradient)]"
                style={{ opacity: 0.65 }}
              />
              <video
                className="absolute inset-0 z-[1] h-full w-full object-cover"
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

            <div className="space-y-6 text-white">
              <h1 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">
                Going the Extra Smile
              </h1>
              <p className="max-w-xl text-lg text-white/90">
                Private dental care with calm precision
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  className="rounded-full bg-[var(--smh-gradient)] px-6 py-3 font-semibold text-black"
                  href="/contact"
                >
                  Book a consultation
                </a>
                <a
                  className="rounded-full border border-[var(--champagne-keyline-gold)] px-6 py-3 font-semibold text-white"
                  href="/treatments"
                >
                  Explore treatments
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
