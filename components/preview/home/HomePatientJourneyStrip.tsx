import styles from "./home-preview.module.css";

const steps = [
  { title: "Listen & understand", detail: "We start with your goals, anxieties, and a calm review of your oral health." },
  { title: "Scan & plan", detail: "Digital scans and photography guide a precise treatment roadmap." },
  { title: "Treat with care", detail: "Gentle appointments with clear explanations at every stage." },
  { title: "Support for the long term", detail: "Maintenance plans and reviews to keep your results stable." },
];

export default function HomePatientJourneyStrip() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Your journey with us</h2>
        <p className={styles.sectionLead}>
          A simple, reassuring pathway from first contact to long-term smile
          maintenance.
        </p>
      </div>
      <div className={styles.timeline}>
        {steps.map((step) => (
          <article key={step.title} className={styles.timelineStep}>
            <h3 className={styles.stepLabel}>{step.title}</h3>
            <p className={styles.cardText}>{step.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
