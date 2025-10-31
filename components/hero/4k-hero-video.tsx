'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

export interface Hero4KVideoProps {
  poster?: string;
  [key: string]: unknown;
}

const PARALLAX_STRENGTH = 22;

export default function Hero4KVideo({ poster }: Hero4KVideoProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const surfaceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    surface.style.setProperty('--parallax-x', '0px');
    surface.style.setProperty('--parallax-y', '0px');

    const hoverMedia = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (prefersReducedMotion || !hoverMedia.matches) {
      return;
    }

    let frame = 0;

    const updateParallax = (event: PointerEvent) => {
      const rect = surface.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
      const targetX = `${relativeX * PARALLAX_STRENGTH}px`;
      const targetY = `${relativeY * PARALLAX_STRENGTH}px`;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        surface.style.setProperty('--parallax-x', targetX);
        surface.style.setProperty('--parallax-y', targetY);
      });
    };

    const resetParallax = () => {
      cancelAnimationFrame(frame);
      surface.style.setProperty('--parallax-x', '0px');
      surface.style.setProperty('--parallax-y', '0px');
    };

    surface.addEventListener('pointermove', updateParallax);
    surface.addEventListener('pointerleave', resetParallax);

    return () => {
      cancelAnimationFrame(frame);
      surface.removeEventListener('pointermove', updateParallax);
      surface.removeEventListener('pointerleave', resetParallax);
    };
  }, [prefersReducedMotion]);

  const parallaxStyle = {
    '--parallax-x': '0px',
    '--parallax-y': '0px',
  } as CSSProperties;

  return (
    <section
      data-hero="champagne"
      data-page="home"
      data-surface="hero"
      data-wave="on"
      data-particles="off"
      data-reduced-motion={prefersReducedMotion ? 'true' : 'false'}
      className="champagne-surface-lux champagne-surface-lux--parallax champagne-warm-lift hero"
    >
      <div
        ref={surfaceRef}
        className="relative isolate w-full min-h-[85vh] overflow-hidden md:min-h-[min(95vh,1100px)]"
        style={parallaxStyle}
      >
        <div
          aria-hidden
          className="champagne-surface-lux__wave champagne-surface-lux__wave--arcs"
        />
        <div
          aria-hidden
          className="champagne-surface-lux__wave champagne-surface-lux__wave--dots"
        />
        <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
          <video
            className="h-full w-full object-cover"
            style={{ objectPosition: '60% 50%' }}
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
        <div className="relative z-[var(--z-content)] flex w-full justify-center px-6 py-20 md:px-10 md:py-24">
          <div className="champagne-glass relative z-20 mx-auto max-w-[960px] p-8 md:mt-28 md:p-10">
            <div className="relative z-[var(--z-content)] space-y-6 text-center" style={{ color: 'var(--smh-text)' }}>
              <p className="text-sm uppercase tracking-[0.3em]">St Mary’s House</p>
              <h1 className="text-4xl font-serif font-semibold tracking-tight md:text-6xl">Going the Extra Smile</h1>
              <p className="mx-auto mt-4 max-w-prose text-base md:text-lg">
                Private dental care with calm precision, comfort-first technology, and a signature Manus AI finish.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  data-cta="primary"
                  className="relative inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-[var(--smh-gradient)] px-6 py-3 font-semibold transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)] hover:-translate-y-0.5"
                  style={{ color: 'var(--smh-text)' }}
                >
                  Book a consultation
                </Link>
                <Link
                  href="/treatments"
                  className="relative inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--champagne-keyline-gold)] bg-transparent px-6 py-3 font-semibold transition-transform duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--champagne-keyline-gold)] hover:-translate-y-0.5"
                  style={{ color: 'var(--smh-text)' }}
                >
                  Explore treatments
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
