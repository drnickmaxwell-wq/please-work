'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import CoastalWaves from '@/components/effects/coastal-waves';
import CoastalParticles from '@/components/effects/CoastalParticles';

const WebGLWaves = dynamic(() => import('@/components/effects/WebGLWaves'), { ssr: false });

function supportsWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch { return false; }
}

export default function HeroBand() {
  const [useWebGL, setUseWebGL] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia?.('(pointer:fine)').matches;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    setUseWebGL(!!finePointer && !reduceMotion && supportsWebGL());
  }, []);

  return (
    <section className="relative w-full h-[min(100svh,100vh)] overflow-hidden">
      {/* Deep fallback gradient + subtle wave image at the very back */}
      <div
        className="absolute inset-0 -z-30"
        style={{
          background:
            'radial-gradient(1200px circle at 20% 20%, rgba(194,24,91,0.60), transparent 60%),' +
            'radial-gradient(1000px circle at 80% 30%, rgba(64,196,180,0.50), transparent 60%),' +
            'radial-gradient(900px circle at 50% 80%, rgba(212,175,55,0.35), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-30 opacity-35"
        style={{
          backgroundImage: 'url(/brand/waves/waves-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />

      {/* Video sits below the overlay effects so effects are VISIBLE */}
      <video
        className="absolute inset-0 -z-20 w-full h-full object-cover"
        poster="/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/dental-hero-4k.mp4" type="video/mp4" />
      </video>

      {/* Overlay FX ABOVE the video */}
      {useWebGL ? (
        <WebGLWaves className="absolute inset-0 z-0 opacity-35 pointer-events-none" />
      ) : null}
      <CoastalWaves className="absolute inset-0 z-0 opacity-30 mix-blend-soft-light pointer-events-none" />
      <CoastalParticles count={18} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Copy always on top */}
      <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
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
