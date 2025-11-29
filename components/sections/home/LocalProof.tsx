import styles from "./homepage-sections.module.css";
import SectionShell from "./SectionShell";

export default function LocalProof() {
  return (
    <SectionShell className={styles.sectionSurface} ariaLabelledby="local-proof-title">
      <div className="relative z-10 grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <span className={styles.chip}>Shoreham-by-Sea</span>
          <h2 id="local-proof-title" className={`${styles.displayHeading} text-3xl font-semibold leading-tight md:text-4xl`}>
            Trusted coastal clinic
          </h2>
          <p className={`text-lg leading-relaxed ${styles.mutedText}`}>
            Moments from the riverfront, we welcome guests from Shoreham-by-Sea, Brighton, Hove, and the wider West Sussex coast.
            Easy parking, calm interiors, and clinicians who specialise in supporting nervous patients.
          </p>
          <div className={`${styles.glassCard} ${styles.interactiveGlow} mt-4 inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-white`}>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-lg font-semibold text-[var(--brand-gold)]">
              4.9★
            </div>
            <div>
              <p className="text-base font-semibold">Google review score</p>
              <p className="text-sm text-white/75">247+ patient reviews highlight comfort, clarity, and calm care.</p>
            </div>
          </div>
        </div>
        <div className={`${styles.glassCard} ${styles.interactiveGlow} relative overflow-hidden rounded-3xl p-5`}>
          <div className={styles.waveOverlay} aria-hidden />
          <div className={styles.grainOverlay} aria-hidden />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">Find us</p>
              <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/75">BN43 5ZA</span>
            </div>
            <div className={`rounded-2xl bg-white/5 p-4 text-sm leading-relaxed ${styles.keyline}`}>
              <p className="font-semibold text-white">St Mary’s House Dental Care</p>
              <p className="text-white/80">1 St Mary’s House, Shoreham-by-Sea, West Sussex</p>
              <p className="mt-2 text-white/70">Call <a className="underline decoration-[var(--brand-gold)]" href="tel:+441273453109">01273 453109</a></p>
            </div>
            <div className={`flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm ${styles.keyline}`}>
              <div>
                <p className="font-semibold text-white">Map placeholder</p>
                <p className="text-white/70">Reserved for interactive map embed.</p>
              </div>
              <span aria-hidden className="text-white/60">🗺️</span>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
