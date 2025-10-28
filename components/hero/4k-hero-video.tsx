'use client';

import Particles from '@/components/brand/Particles';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

export interface Hero4KVideoProps {
  poster?: string;
  showParticles?: boolean;
  showWave?: boolean;
  [key: string]: unknown;
}

const overlayDataAttributes = {
  'data-sheen-opacity-d': 'var(--champagne-sheen-opacity-d)',
  'data-sheen-opacity-m': 'var(--champagne-sheen-opacity-m)',
  'data-vignette-alpha': 'var(--champagne-vignette-alpha)',
  'data-vignette-radius': 'var(--champagne-vignette-radius)',
  'data-particles-opacity-d': 'var(--champagne-particles-opacity-d)',
  'data-particles-opacity-m': 'var(--champagne-particles-opacity-m)',
} as const;

export default function Hero4KVideo({
  poster,
  showParticles = true,
  showWave = false,
  ..._rest
}: Hero4KVideoProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const particlesActive = showParticles && !prefersReducedMotion;

  return (
    <section
      data-hero="champagne"
      data-page="home"
      data-wave={showWave ? 'on' : 'off'}
      data-particles={particlesActive ? 'on' : 'off'}
      data-reduced-motion={prefersReducedMotion ? 'true' : 'false'}
      className="champagne-surface relative min-h-[56vh] overflow-hidden md:min-h-[62vh]"
      {...overlayDataAttributes}
    >
      {particlesActive ? (
        <Particles className="particles-layer pointer-events-none absolute inset-0" data-state="on" aria-hidden />
      ) : (
        <canvas className="particles-layer pointer-events-none absolute inset-0" data-state="off" aria-hidden />
      )}

      <div className="relative mx-auto flex h-full max-w-5xl items-center px-6 py-12 sm:px-10">
        <div className="champagne-glass w-full rounded-[28px]">
          <div className="space-y-6 p-8 sm:p-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <div aria-hidden className="absolute inset-0" style={{ background: 'var(--smh-gradient)' }} />
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

            <div className="space-y-4 text-[color:var(--smh-text-strong, var(--smh-text))]">
              <h1 className="font-serif text-5xl md:text-6xl">Going the Extra Smile</h1>
              <p className="opacity-90">Private dental care with calm precision</p>
              <div className="flex flex-wrap gap-4">
                <a className="rounded-full bg-[var(--smh-gradient)] px-5 py-3 text-[color:var(--smh-text-strong, var(--smh-text))]" href="/contact">
                  Book a consultation
                </a>
                <a
                  className="rounded-full border border-[color:var(--glass-border)] px-5 py-3 text-[color:var(--smh-text-strong, var(--smh-text))]"
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
