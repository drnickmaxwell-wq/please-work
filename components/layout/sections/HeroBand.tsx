'use client';

import BrandGradient from '@/components/effects/brand-gradient';
import GoldSpec from '@/components/effects/gold-spec';
import LensBokeh from '@/components/effects/lens-bokeh';

export default function HeroBand(){
  return (
    <section className="relative w-full h-[min(100svh,100vh)] overflow-hidden">
      {/* Gradient + sparkles behind video (also used as fallback) */}
      <BrandGradient className="absolute inset-0 -z-20" />
      <GoldSpec className="absolute inset-0 -z-10 opacity-60" />
      <LensBokeh className="absolute inset-0 -z-10 opacity-40" />

      {/* 4K video; if blocked/missing, you still see gradient + poster */}
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
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight"
            style={{ fontFamily: 'Montserrat, ui-sans-serif' }}
          >
            <span className="bg-gradient-to-r from-[#C2185B] via-[#40C4B4] to-[#D4AF37] bg-clip-text text-transparent">
              Luxury Coastal Dentistry
            </span>
          </h1>
          <p
            className="mt-5 text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed"
            style={{ fontFamily: 'Lora, ui-serif' }}
          >
            Advanced, anxiety-free care with 3-D digital precision in Shoreham-by-Sea.
          </p>
        </div>
      </div>
    </section>
  );
}
