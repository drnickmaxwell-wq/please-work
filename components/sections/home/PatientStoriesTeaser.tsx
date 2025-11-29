import styles from "./homepage-sections.module.css";
import SectionShell from "./SectionShell";

const stories = [
  {
    name: "Emma — Veneers",
    summary: "From chipped edges to a confident, brighter smile with minimal-prep porcelain.",
  },
  {
    name: "James — Implants",
    summary: "Regained comfort chewing with 3D-guided implants and a same-day temporary bridge.",
  },
  {
    name: "Sofia — Orthodontics",
    summary: "Spark aligners aligned her smile discreetly ahead of wedding photos.",
  },
];

export default function PatientStoriesTeaser() {
  return (
    <SectionShell tone="paper" ariaLabelledby="stories-title">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className={styles.sectionHeader}>
            <span className={`${styles.chip} text-eyebrow`}>Patient stories</span>
            <h2 id="stories-title" className={`${styles.displayHeading} text-display-sm`}>
              Real journeys, calmly supported
            </h2>
            <p className={`max-w-2xl text-lead text-body ${styles.mutedText}`}>
              Discover concise before-and-after highlights and honest reflections from guests who chose our Shoreham-by-Sea team.
            </p>
          </div>
          <a href="/patient-stories" className={`${styles.pillCtaGhost} text-eyebrow`}>
            View all stories
          </a>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.name}
              className={`${styles.glassCard} ${styles.interactiveGlow} relative flex h-full flex-col gap-4 rounded-2xl p-5`}
              aria-label={story.name}
            >
              <div className={styles.grainOverlay} aria-hidden />
              <div className="h-24 rounded-xl bg-[var(--smh-bg)]/60" aria-hidden />
              <div className="space-y-2">
                <h3 className={`${styles.displayHeading} relative z-10 text-lead font-semibold text-[var(--ink)]`}>
                  {story.name}
                </h3>
                <p className={`relative z-10 text-body ${styles.mutedText}`}>{story.summary}</p>
              </div>
              <span className="relative z-10 inline-flex items-center gap-2 text-eyebrow text-[var(--brand-magenta)]">
                Read the story <span aria-hidden>→</span>
              </span>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
