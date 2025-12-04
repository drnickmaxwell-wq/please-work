import ChampagneCTA from "@/components/champagne/ChampagneCTA";

import styles from "./home-preview.module.css";

export default function HomeComfortBlock() {
  return (
    <section className={styles.section}>
      <div className={styles.comfortBlock}>
        <h2 className={styles.sectionTitle}>Designed for nervous patients</h2>
        <p className={styles.sectionLead}>
          Quiet rooms, gentle clinicians, and sedation pathways to keep every
          stage of treatment calm — from hygiene visits to full-mouth
          rehabilitation.
        </p>
        <ChampagneCTA href="/anxiety-dentistry" variant="secondary">
          Discover our anxiety-friendly care
        </ChampagneCTA>
      </div>
    </section>
  );
}
