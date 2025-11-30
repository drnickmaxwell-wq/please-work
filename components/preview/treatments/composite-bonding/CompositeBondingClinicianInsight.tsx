import styles from "./composite-bonding-preview.module.css";

export function CompositeBondingClinicianInsight() {
  return (
    <section className={styles.section} aria-labelledby="composite-clinician-heading">
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>Clinician insight</span>
        <h2 id="composite-clinician-heading" className={styles.sectionTitle}>
          A calm, serif note from the bonding lead
        </h2>
        <p className={styles.sectionLead}>
          Voice the human approach: feather-light preparation, measured artistry, and the finishing polish that makes the Champagne
          glow stick around.
        </p>
      </div>

      <div className={styles.clinicianCard}>
        <p className={styles.quote}>
          “Composite bonding is like painting with light. We sculpt layers so the enamel keeps its personality while edges and
          symmetry quietly click into place.”
        </p>
        <div className={styles.flourish} aria-hidden />
        <div className={styles.clinicianMeta}>
          <strong>Dr. Elise Morland</strong>
          <span>Clinical lead for aesthetic bonding</span>
        </div>
      </div>
    </section>
  );
}
