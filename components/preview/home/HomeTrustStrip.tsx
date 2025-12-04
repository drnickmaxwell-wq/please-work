import styles from "./home-preview.module.css";

const regulators = ["CQC", "GDC", "BDA", "Digital dentistry ready"];
const trustBadges = [
  { label: "4.9★ Google rating", icon: "★" },
  { label: "200+ patient stories", icon: "✺" },
  { label: "Private Shoreham setting", icon: "⌂" },
];

export default function HomeTrustStrip() {
  return (
    <section aria-label="Trust and assurance">
      <div className="smh-section">
        <div className={`${styles.sectionShell} ${styles.sectionAtmosphereTop}`}>
          <div className={`cpv-card cpv-card--soft ${styles.sectionPanel}`}>
            <div className={`cpv-card__inner cpv-card__inner--stack ${styles.sectionStack}`}>
              <div className={styles.sectionHeader}>
                <p className={`${styles.smallLabel} text-eyebrow`}>Trust & assurance</p>
                <h2 className={styles.sectionTitle}>Trusted by patients across Brighton & Sussex</h2>
                <p className={`${styles.lead} ${styles.bodyText}`}>
                  Private cosmetic, implant, and aligner dentistry in Shoreham-by-Sea. Clinical governance stays front and
                  centre while the experience remains calm.
                </p>
              </div>
              <div className={styles.stripRow}>
                <div className={styles.chips}>
                  {regulators.map((item) => (
                    <span key={item} className={styles.chip}>
                      {item}
                    </span>
                  ))}
                </div>
                <div className={styles.badgeRow}>
                  {trustBadges.map((badge) => (
                    <span key={badge.label} className={styles.badge}>
                      <span className={styles.badgeIcon} aria-hidden>
                        {badge.icon}
                      </span>
                      {badge.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
