import ChampagneCTA from "@/components/champagne/ChampagneCTA";

import styles from "./home-preview.module.css";

const treatments = ["Composite Bonding", "Veneers", "Dental Implants", "Clear Aligners"];

export default function HomeFeaturedTreatments() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Focused on smiles, not just teeth</h2>
        <p className={styles.sectionLead}>
          Boutique cosmetic and restorative dentistry with precise planning and
          a calm, supportive team.
        </p>
      </div>
      <div className={`${styles.grid} ${styles.gridFour}`}>
        {treatments.map((treatment) => (
          <article key={treatment} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{treatment}</h3>
            </div>
            <p className={styles.cardText}>
              Preview of how we position {treatment.toLowerCase()} with digital
              planning, comfort-led appointments, and tailored aftercare.
            </p>
          </article>
        ))}
      </div>
      <div className={styles.pillRow} style={{ marginTop: "1.4rem" }}>
        <ChampagneCTA href="/treatments">Explore all treatments</ChampagneCTA>
        <ChampagneCTA href="/contact" variant="secondary">
          Talk to the team
        </ChampagneCTA>
      </div>
    </section>
  );
}
