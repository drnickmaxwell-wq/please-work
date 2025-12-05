import styles from "./whitening-preview.module.css";

export function WhiteningClinicianInsight() {
  return (
    <section className={styles.section} aria-labelledby="whitening-clinician-heading">
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>Clinician insight</span>
        <h2 id="whitening-clinician-heading" className={styles.sectionTitle}>
          Whitening that stays calm and predictable
        </h2>
        <p className={styles.sectionLead}>
          Use the serif-led card to bring a human note on sensitivity management, planning, and how whitening fits into future
          aesthetic work.
        </p>
      </div>

      <div className={styles.clinicianCard}>
        <p className={styles.quote}>
          “Whitening isn’t about blasting brightness. We pace the lift, layer desensitisers, and keep a log so any future bonding
          or veneers match perfectly.”
        </p>
        <div className={styles.flourish} aria-hidden />
        <div className={styles.clinicianMeta}>
          <strong>Dr. Elise Morland</strong>
          <span>Clinical lead for whitening pathways</span>
        </div>
      </div>
    </section>
  );
}
