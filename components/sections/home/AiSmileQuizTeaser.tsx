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
      <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-center md:gap-14">
        <div
          className={`${styles.glassCard} ${styles.interactiveGlow} relative overflow-hidden rounded-3xl p-6 md:w-7/12 lg:p-8`}
        >
          <div className={styles.waveOverlay} aria-hidden />
          <div className={styles.grainOverlay} aria-hidden />
          <div className="relative z-10 space-y-5">
            <span className={`${styles.chip} text-eyebrow`}>AI Smile Quiz</span>
            <h2 id="ai-quiz-title" className={`${styles.displayHeading} text-display-sm`}>
              Discover your smile plan in minutes
            </h2>
            <ul className="space-y-2 text-body text-white/85">
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
          <p className="text-eyebrow text-white/70">Zero-click ready</p>
          <p className={`text-lead text-body ${styles.mutedText}`}>
            Created for on-the-go discovery with reduced motion fallbacks, the quiz guides you through simple steps then shares
            insights with our Shoreham-by-Sea clinicians.
          </p>
          <div className={styles.dividerLine} aria-hidden />
          <p className="text-body text-white/80">Optimised for quick starts, with AA contrast and motion-aware states.</p>
        </div>
      </div>
    </SectionShell>
  );
}
