'use client';
import BrandGradient from '@/components/effects/brand-gradient';

export default function HeroBand(){
  return (
    <section className="relative w-full h-[min(100svh,100vh)] overflow-hidden">
      <BrandGradient className="absolute inset-0 -z-10" />
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-bold">
            <span className="bg-gradient-to-r from-pink-600 via-teal-500 to-yellow-500 bg-clip-text text-transparent">
              Luxury Coastal Dentistry
            </span>
          </h1>
          <p className="mt-4 opacity-80">
            Advanced, anxiety-free care with 3‑D precision in Shoreham-by-Sea.
          </p>
        </div>
      </div>
    </section>
  );
}
