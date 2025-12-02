import styles from "./home-preview.module.css";

const regulators = ["CQC", "GDC", "BDA", "Digital dentistry ready"];
const trustMetrics = [
  "20+ years of calm clinical care",
  "Private Shoreham setting",
  "Digital 3D workflows",
];

export default function HomeTrustStrip() {
  return (
    <section className={styles.sectionShell} aria-label="Trust and assurance">
      <div className="cpv-card cpv-card--soft">
        <div className={`cpv-card__inner ${styles.stripRow}`}>
          <p className="text-eyebrow">Trusted memberships & regulators</p>
          <div className={styles.chips}>
            {regulators.map((item) => (
              <span key={item} className={styles.chip}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="cpv-card cpv-card--soft">
        <div className="cpv-card__inner cpv-card__inner--stack">
          <div className={styles.sectionHeader}>
            <p className="text-eyebrow">Serving Brighton & Sussex</p>
            <p className={styles.lead}>
              Private cosmetic, implant, and aligner dentistry in Shoreham-by-Sea, built for calm visits and discreet
              technology-led care.
            </p>
          </div>
          <div className={styles.chips}>
            {trustMetrics.map((item) => (
              <span key={item} className={styles.chip}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
