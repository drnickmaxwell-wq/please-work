'use client';

export interface Hero4KVideoProps {
  poster?: string;
  [key: string]: unknown;
}

export default function Hero4KVideo({ poster, ..._ }: Hero4KVideoProps) {
  return (
    <section data-hero="champagne" data-page="home">
      <div className="glass-pane mx-auto max-w-5xl rounded-2xl p-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
          {/* Fallback gradient under video */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: 'var(--smh-gradient)', zIndex: -1 }}
          />
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

        {/* Copy block (no inline colors) */}
        <h1 className="font-serif text-5xl md:text-6xl text-[color:var(--smh-text)]">
          Going the Extra Smile
        </h1>
        <p className="mt-4 text-[color:var(--smh-text)] opacity-80">
          Private dental care with calm precision
        </p>

        <div className="mt-6 flex gap-4">
          <a
            className="rounded-full px-5 py-3 text-[color:var(--smh-text)] bg-[var(--smh-gradient)]"
            href="/contact"
          >
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
    </section>
  );
}
