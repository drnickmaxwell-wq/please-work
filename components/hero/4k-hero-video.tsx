'use client';

import Particles from '@/components/brand/Particles';

export interface Hero4KVideoProps {
  poster?: string;
  [key: string]: unknown;
}

export default function Hero4KVideo({ poster, ..._ }: Hero4KVideoProps) {
  return (
    <section data-hero="champagne" data-wave="off" className="relative isolate">
      <Particles className="absolute inset-0" style={{ opacity: 0.08 }} />
      <div className="gold-flecks" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl px-6 py-12 sm:px-10">
        <div className="glass-pane">
          <div className="space-y-6 p-8 sm:p-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
              {/* Fallback gradient under video */}
              <div aria-hidden className="absolute inset-0" style={{ background: 'var(--smh-gradient)', zIndex: -1 }} />
              {/* Video (progressive enhance) */}
              <video
                className="absolute inset-0 h-full w-full object-cover"
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
