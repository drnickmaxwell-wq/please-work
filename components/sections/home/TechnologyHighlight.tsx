import styles from "./homepage-sections.module.css";
import SectionShell from "./SectionShell";

const techPoints = [
  "CBCT + intraoral scanning for precise 3D diagnostics",
  "AI-guided implant and veneer planning with smile previews",
  "On-site printing and milling to speed up comfortable visits",
];

export default function TechnologyHighlight() {
  return (
    <SectionShell className={styles.sectionSurface} ariaLabelledby="technology-title">
      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
        <div className="lg:w-1/2 space-y-4">
          <span className={styles.chip}>Digital Dentistry &amp; 3D Technology</span>
          <h2 id="technology-title" className={`${styles.displayHeading} text-3xl font-semibold leading-tight md:text-4xl`}>
            Digital precision, softer appointments
          </h2>
          <p className={`max-w-2xl text-lg leading-relaxed ${styles.mutedText}`}>
            Advanced imaging, AI planning, and same-day fabrication come together to shorten chair time and keep every smile plan
            predictable.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="/technology" className={styles.pillCtaPrimary}>
              Explore our tech
              <span aria-hidden>→</span>
            </a>
            <a href="/treatments/technology/3d-scanning-and-printing" className={styles.pillCtaGhost}>
              Same-day options
            </a>
          </div>
        </div>
        <div className="grid flex-1 gap-4 sm:grid-cols-2">
          {techPoints.map((point) => (
            <div key={point} className={`${styles.glassCard} ${styles.interactiveGlow} relative overflow-hidden rounded-2xl p-5`}>
              <div className={styles.waveOverlay} aria-hidden />
              <div className="absolute inset-y-0 right-0 w-[2px] bg-[var(--brand-teal)]/60" aria-hidden />
              <p className="relative z-10 text-base font-semibold text-white">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
