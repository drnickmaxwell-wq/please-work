'use client';

export default function HeroBand() {
  return (
    <section className="relative w-full h-[min(100svh,100vh)] overflow-hidden">
      {/* Gradient + optional wave image behind video (also acts as fallback) */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            'radial-gradient(1200px circle at 20% 20%, color-mix(in srgb, var(--brand-magenta) 60%, transparent) 0%, transparent 60%),' +
            'radial-gradient(1000px circle at 80% 30%, color-mix(in srgb, var(--brand-teal) 50%, transparent) 0%, transparent 60%),' +
            'radial-gradient(900px circle at 50% 80%, color-mix(in srgb, var(--brand-gold) 35%, transparent) 0%, transparent 60%)'
        }}
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: 'url(/brand/waves/waves-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35
        }}
      />

      {/* 4K video (fallback = gradient/wave) */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        poster="/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/dental-hero-4k.mp4" type="video/mp4" />
      </video>

      {/* Copy */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-[var(--font-playfair),Georgia,serif] leading-tight text-balance">
          <span className="bg-[var(--gradient-cta)] bg-clip-text text-transparent">
            Luxury Coastal Dentistry
          </span>
        </h1>
        <p className="mt-5 text-lg sm:text-xl lg:text-2xl text-white/90 max-w-xl">
          Advanced, anxiety-free care with 3-D digital precision in Shoreham-by-Sea.
        </p>
      </div>
    </section>
  );
}
