'use client';

import Particles from '@/components/brand/Particles';

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
  ..._rest
}: Hero4KVideoProps) {
  return (
    <section
      data-hero="champagne"
      data-page="home"
      data-wave={showWave ? 'on' : 'off'}
      className="champagne-surface champagne-sheen relative overflow-hidden"
    >
      <div className="wave-layer" aria-hidden data-state={showWave ? 'on' : 'off'} />
      {showParticles ? (
        <Particles className="particles-layer" data-state="on" aria-hidden />
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
