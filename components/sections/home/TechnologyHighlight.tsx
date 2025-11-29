import styles from "./homepage-sections.module.css";

const techPoints = [
  "CBCT + intraoral scanning for precise 3D diagnostics",
  "AI-guided implant and veneer planning with smile previews",
  "On-site printing and milling to speed up comfortable visits",
];

export default function TechnologyHighlight() {
  return (
    <section className={`${styles.sectionSurface} px-4 py-16 text-white lg:py-20`} aria-labelledby="technology-title">
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        <div className="lg:w-1/2">
          <span className={styles.chip}>Digital Dentistry &amp; 3D Technology</span>
          <h2 id="technology-title" className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
            Digital precision, softer appointments
          </h2>
          <p className={`mt-4 max-w-2xl text-lg leading-relaxed ${styles.mutedText}`}>
            Advanced imaging, AI planning, and same-day fabrication come together to shorten chair time and keep every smile plan
            predictable.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/technology"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]"
            >
              Explore our tech
              <span aria-hidden>→</span>
            </a>
            <a
              href="/treatments/technology/3d-scanning-and-printing"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition hover:-translate-y-0.5 hover:border-white/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]"
            >
              Same-day options
            </a>
          </div>
        </div>
        <div className="grid flex-1 gap-3 sm:grid-cols-2">
          {techPoints.map((point) => (
            <div key={point} className={`${styles.glassCard} relative overflow-hidden rounded-2xl p-4`}> 
              <div className={styles.waveOverlay} aria-hidden />
              <p className="relative z-10 text-sm font-semibold text-white/90">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
