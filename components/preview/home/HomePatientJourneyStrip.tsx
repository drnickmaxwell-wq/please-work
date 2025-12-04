import styles from "./home-preview.module.css";

const journeySteps = [
  { title: "Listen & understand", detail: "Consultation with photos and digital scans to map goals." },
  { title: "Scan & plan", detail: "3D mock-ups and simulations built before treatment starts." },
  { title: "Treat with care", detail: "Gentle appointments, sedation if needed, and clear timing." },
  { title: "Support for the long term", detail: "Reviews, retainers, and hygiene coaching to protect results." },
];

export default function HomePatientJourneyStrip() {
  return (
    <section className={styles.sectionShell} aria-labelledby="journey-heading">
      <div className="cpv-card cpv-card--soft">
        <div className="cpv-card__inner cpv-card__inner--stack">
          <div className={styles.sectionHeader}>
            <p className="text-eyebrow">Patient journey</p>
            <h2 className="text-display-sm" id="journey-heading">
              Your journey with us
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
