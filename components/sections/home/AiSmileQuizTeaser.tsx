import styles from "./homepage-sections.module.css";

const benefits = [
  "Upload photos securely for instant AI insights",
  "See likely treatment matches with finance-friendly options",
  "Share results with our team for tailored advice",
];

export default function AiSmileQuizTeaser() {
  return (
    <section className={`${styles.sectionSurface} px-4 py-16 text-white lg:py-20`} aria-labelledby="ai-quiz-title">
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:gap-10">
        <div className={`${styles.glassCard} relative overflow-hidden rounded-3xl p-6 md:w-7/12`}>
          <div className={styles.waveOverlay} aria-hidden />
          <div className={styles.grainOverlay} aria-hidden />
          <div className="relative z-10 space-y-3">
            <span className={styles.chip}>AI Smile Quiz</span>
            <h2 id="ai-quiz-title" className="text-3xl font-semibold leading-tight md:text-4xl">
              Discover your smile plan in minutes
            </h2>
            <ul className="space-y-2 text-base leading-relaxed text-white/80">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 block h-2 w-2 rounded-full bg-[var(--brand-gold)]" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <a
              href="/ai-smile-quiz"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]"
            >
              Start the AI Smile Quiz
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
        <div className="md:w-5/12">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Zero-click ready</p>
            <p className={`text-lg leading-relaxed ${styles.mutedText}`}>
              Created for on-the-go discovery with reduced motion fallbacks, the quiz guides you through simple steps then shares
              insights with our Shoreham-by-Sea clinicians.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
