import styles from "./homepage-sections.module.css";

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
    <section className="bg-[var(--smh-bg)] px-4 py-16 text-[var(--ink)] lg:py-20" aria-labelledby="stories-title">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <span className={styles.chip}>Patient stories</span>
            <h2 id="stories-title" className="text-3xl font-semibold leading-tight md:text-4xl">
              Real journeys, calmly supported
            </h2>
            <p className={`max-w-2xl text-lg leading-relaxed ${styles.mutedText}`}>
              Discover concise before-and-after highlights and honest reflections from guests who chose our Shoreham-by-Sea team.
            </p>
          </div>
          <a
            href="/patient-stories"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--champagne-keyline-gold)] px-4 py-2 text-sm font-semibold text-[var(--brand-magenta)] transition hover:-translate-y-0.5 hover:border-[var(--brand-gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]"
          >
            View all stories
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.name}
              className={`${styles.glassCard} relative flex h-full flex-col gap-3 rounded-2xl p-5`}
              aria-label={story.name}
            >
              <div className={styles.grainOverlay} aria-hidden />
              <h3 className="relative z-10 text-xl font-semibold text-[var(--ink)]">{story.name}</h3>
              <p className={`relative z-10 text-base leading-relaxed ${styles.mutedText}`}>{story.summary}</p>
              <span className="relative z-10 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-magenta)]">
                Read the story <span aria-hidden>→</span>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
