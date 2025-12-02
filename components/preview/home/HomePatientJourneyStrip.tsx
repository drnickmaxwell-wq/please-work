import styles from "./home-preview.module.css";

const journeySteps = [
  { title: "Listen & Scan", detail: "Consultation with photos and digital scans to map goals." },
  { title: "Plan in 3D", detail: "Mock-ups, guides, and aligner simulations built before treatment." },
  { title: "Comfort-first treatment", detail: "Gentle appointments with sedation options and clear timing." },
  { title: "Long-term care", detail: "Reviews, retainers, and hygiene coaching to protect results." },
];

export default function HomePatientJourneyStrip() {
  return (
    <section className={styles.sectionShell} aria-labelledby="journey-heading">
      <div className="cpv-card cpv-card--soft">
        <div className="cpv-card__inner cpv-card__inner--stack">
          <div className={styles.sectionHeader}>
            <p className="text-eyebrow">Patient journey</p>
            <h2 className="text-display-sm" id="journey-heading">
              Your Journey, Step by Step
            </h2>
            <p className={`${styles.lead} text-body`}>
              A simple, linear path that can later connect to a dedicated journey route once visuals are ready.
            </p>
          </div>
          <div className={styles.stepGrid}>
            {journeySteps.map((step) => (
              <article key={step.title} className={styles.stepCard}>
                <h3 className={`text-lead ${styles.cardTitle}`}>{step.title}</h3>
                <p className="text-body">{step.detail}</p>
              </article>
            ))}
          </div>
          <p className={styles.sectionNote}>Placeholder link to future patient journey hub.</p>
        </div>
      </div>
    </section>
  );
}
