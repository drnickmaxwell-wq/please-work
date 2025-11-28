import styles from "./homepage-sections.module.css";

export default function PortalTeaser() {
  return (
    <section className="bg-[var(--smh-bg)] px-4 py-12 text-[var(--ink)]" aria-labelledby="portal-title">
      <div className={`${styles.glassCard} mx-auto flex max-w-6xl flex-col gap-4 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between`}>
        <div className="space-y-2">
          <span className={styles.chip}>Already a patient?</span>
          <h3 id="portal-title" className="text-2xl font-semibold leading-tight sm:text-3xl">
            Manage your visits in the patient portal
          </h3>
          <p className={`text-base leading-relaxed ${styles.mutedText}`}>
            Access secure messages, treatment plans, and convenient payment options wherever you are.
          </p>
        </div>
        <a
          href="/portal"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--champagne-keyline-gold)] px-4 py-2 text-sm font-semibold text-[var(--brand-magenta)] transition hover:-translate-y-0.5 hover:border-[var(--brand-gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]"
        >
          Go to portal
        </a>
      </div>
    </section>
  );
}
