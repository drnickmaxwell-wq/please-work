import styles from "./homepage-sections.module.css";
import SectionShell from "./SectionShell";

const benefits = [
  "Upload photos securely for instant AI insights",
  "See likely treatment matches with finance-friendly options",
  "Share results with our team for tailored advice",
];

export default function AiSmileQuizTeaser() {
  return (
    <SectionShell className={styles.sectionSurface} ariaLabelledby="ai-quiz-title">
      <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
        <div className={`${styles.glassCard} ${styles.interactiveGlow} relative overflow-hidden rounded-3xl p-6 md:w-7/12`}>
          <div className={styles.waveOverlay} aria-hidden />
          <div className={styles.grainOverlay} aria-hidden />
          <div className="relative z-10 space-y-4">
            <span className={styles.chip}>AI Smile Quiz</span>
            <h2 id="ai-quiz-title" className={`${styles.displayHeading} text-3xl font-semibold leading-tight md:text-4xl`}>
              Discover your smile plan in minutes
            </h2>
            <ul className="space-y-2 text-base leading-relaxed text-white/85">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 block h-2 w-2 rounded-full bg-[var(--brand-gold)]" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <a href="/ai-smile-quiz" className={styles.pillCtaPrimary}>
              Start the AI Smile Quiz
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
        <div className="md:w-5/12 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Zero-click ready</p>
          <p className={`text-lg leading-relaxed ${styles.mutedText}`}>
            Created for on-the-go discovery with reduced motion fallbacks, the quiz guides you through simple steps then shares
            insights with our Shoreham-by-Sea clinicians.
          </p>
          <div className={styles.dividerLine} aria-hidden />
          <p className="text-base text-white/80">Optimised for quick starts, with AA contrast and motion-aware states.</p>
        </div>
      </div>
    </SectionShell>
  );
}
