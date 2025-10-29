'use client';

export interface Hero4KVideoProps {
  poster?: string;
}

export default function Hero4KVideo({ poster }: Hero4KVideoProps) {
  return (
    <section className="champagne-surface relative flex w-full min-h-[min(95vh,1100px)] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
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

      <div className="relative z-[30] mx-auto w-full max-w-[960px] px-6 py-16 sm:px-8 md:px-10">
        <div className="champagne-glass mx-auto max-w-none p-8 md:p-10">
          <div className="space-y-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[calc(var(--champagne-radius)/1.5)]">
              <div className="absolute inset-0 bg-[var(--smh-gradient)] opacity-60" aria-hidden />
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

            <div className="space-y-6 text-white">
              <h1 className="font-serif text-4xl leading-tight sm:text-5xl md:text-6xl">Going the Extra Smile</h1>
              <p className="max-w-xl text-lg text-white/90">Private dental care with calm precision</p>
              <div className="flex flex-wrap gap-4">
                <a className="rounded-full bg-[var(--smh-gradient)] px-6 py-3 font-semibold text-black" href="/contact">
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
