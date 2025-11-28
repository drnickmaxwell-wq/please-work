"use client";

import { useEffect, useState } from "react";

import styles from "./homepage-sections.module.css";

const practiceTourVideoSrc = ""; // TODO: replace with practice tour asset when available

export default function ClinicTourSection() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduceMotion(mediaQuery.matches);
    updateMotion();
    mediaQuery.addEventListener("change", updateMotion);
    return () => mediaQuery.removeEventListener("change", updateMotion);
  }, []);

  return (
    <section className={`${styles.sectionSurface} text-white`} aria-labelledby="clinic-tour-title">
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 lg:flex-row lg:items-center lg:py-20">
        <div className={`${styles.glassCard} relative overflow-hidden rounded-[28px] border-white/10 shadow-2xl lg:w-3/5`}>
          <div className="absolute inset-0 bg-black/35" aria-hidden />
          <div className={styles.waveOverlay} aria-hidden />
          <div className={styles.grainOverlay} aria-hidden />
          {practiceTourVideoSrc && !reduceMotion ? (
            <video
              className="relative z-10 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              poster="/assets/champagne/waves/wave-bg.webp"
            >
              <source src={practiceTourVideoSrc} type="video/mp4" />
            </video>
          ) : (
            <PracticeTourPlaceholder />
          )}
        </div>
        <div className="lg:w-2/5 lg:pl-6">
          <div className="space-y-3">
            <span className={styles.chip}>Calm coastal setting</span>
            <h2 id="clinic-tour-title" className="text-3xl font-semibold leading-tight md:text-4xl">
              Step inside our coastal clinic
            </h2>
            <p className={`text-lg leading-relaxed ${styles.mutedText}`}>
              Wander through light-filled surgeries, ocean-inspired lounges, and serene tech suites designed for quiet focus.
              Discover how our 3D scanners, CBCT imaging, and gentle sedation options keep visits comfortable.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="/technology"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]"
            >
              See our technology
              <span aria-hidden>→</span>
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition hover:-translate-y-0.5 hover:border-white/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]"
            >
              Meet the team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PracticeTourPlaceholder() {
  return (
    <div className="relative z-10 flex min-h-[280px] flex-col items-center justify-center gap-3 px-6 py-10 text-center sm:min-h-[360px]">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white">
        <svg aria-hidden width="28" height="28" viewBox="0 0 24 24" fill="none" className="opacity-90">
          <path
            d="M8.5 7.5L16 12l-7.5 4.5V7.5z"
            fill="currentColor"
            opacity="0.86"
          />
        </svg>
      </div>
      <div className="space-y-2">
        <p className="text-xl font-semibold text-white">Clinic tour video coming soon</p>
        <p className="text-sm text-white/75">
          We&apos;re preparing a guided walkthrough of our Shoreham-by-Sea practice. Placeholder reserved for the final video asset.
        </p>
      </div>
      <button
        type="button"
        className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]"
        aria-label="Play clinic tour placeholder"
      >
        <span className="h-2 w-2 rounded-full bg-[var(--brand-gold)]" aria-hidden />
        Motion preview disabled
      </button>
    </div>
  );
}
