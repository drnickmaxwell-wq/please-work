import ChampagneCTA from "@/components/champagne/ChampagneCTA";

import styles from "./home-preview.module.css";

export default function HomeFinalCTA() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Ready to start your Champagne journey?</h2>
        <p className={styles.sectionLead}>
          Preview how we welcome you — calm scheduling, digital pre-assessments,
          and a team who listens first.
        </p>
      </div>
      <div className={styles.finalCtas}>
        <ChampagneCTA href="/contact">Book your consultation</ChampagneCTA>
        <ChampagneCTA href="/about" variant="secondary">
          Learn more about the practice
        </ChampagneCTA>
      </div>
    </section>
  );
}
