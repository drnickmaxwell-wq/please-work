'use client';

import { useEffect, useState } from 'react';

import Particles from '@/components/brand/Particles';

export interface Hero4KVideoProps {
  poster?: string;
  showParticles?: boolean;
  showWave?: boolean;
  [key: string]: unknown;
}

const OVERLAY_DATA_MAP = {
  gradientToken: '--smh-gradient',
  sheenDesktop: '--champagne-sheen-opacity-d',
  sheenMobile: '--champagne-sheen-opacity-m',
  vignetteAlpha: '--champagne-vignette-alpha',
  particlesDesktop: '--champagne-particles-opacity-d',
  particlesMobile: '--champagne-particles-opacity-m',
} as const;

export default function Hero4KVideo({
  poster,
  showParticles = true,
  showWave = false,
  ...rest
}: Hero4KVideoProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(motionQuery.matches);
    update();

    motionQuery.addEventListener('change', update);
    return () => motionQuery.removeEventListener('change', update);
  }, []);

  const particlesState = showParticles && !prefersReducedMotion ? 'on' : 'off';

  return (
    <section
      data-hero="champagne"
      data-page="home"
      data-wave={showWave ? 'on' : 'off'}
      data-gradient-token={OVERLAY_DATA_MAP.gradientToken}
      data-sheen-opacity-d={OVERLAY_DATA_MAP.sheenDesktop}
      data-sheen-opacity-m={OVERLAY_DATA_MAP.sheenMobile}
      data-vignette-alpha={OVERLAY_DATA_MAP.vignetteAlpha}
      data-particles-opacity-d={OVERLAY_DATA_MAP.particlesDesktop}
      data-particles-opacity-m={OVERLAY_DATA_MAP.particlesMobile}
      data-reduced-motion={prefersReducedMotion ? 'true' : 'false'}
      className="champagne-surface champagne-sheen relative overflow-hidden"
      {...rest}
    >
      <div className="gradient-layer" aria-hidden />
      <div className="wave-layer" aria-hidden data-state={showWave ? 'on' : 'off'} />
      {showParticles ? (
        <Particles
          className="particles-layer"
          data-state={particlesState}
          aria-hidden
        />
      ) : (
        <canvas className="particles-layer" data-state="off" aria-hidden />
      )}
      <div className="vignette-layer" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-6 py-12 sm:px-10">
        <div className="glass-pane">
          <div className="space-y-6 p-8 sm:p-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
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

            <div className="space-y-4">
              <h1 className="font-serif text-5xl text-[color:var(--smh-text)] md:text-6xl">Going the Extra Smile</h1>
              <p className="text-[color:var(--smh-text)] opacity-80">Private dental care with calm precision</p>
              <div className="flex flex-wrap gap-4">
                <a className="rounded-full px-5 py-3 text-[color:var(--smh-text)] bg-[var(--smh-gradient)]" href="/contact">
                  Book a consultation
                </a>
                <a
                  className="rounded-full px-5 py-3 border border-[color:var(--glass-border)] text-[color:var(--smh-text)]"
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
