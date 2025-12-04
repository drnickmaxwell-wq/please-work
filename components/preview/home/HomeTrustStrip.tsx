import styles from "./home-preview.module.css";

const badges = [
  { label: "4.9 ★ Google", detail: "+380 patient reviews" },
  { label: "Denplan & Bupa", detail: "Trusted partners" },
  { label: "Calm coastal clinic", detail: "Shoreham-by-Sea" },
];

export default function HomeTrustStrip() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Trusted by patients across Brighton & Sussex
        </h2>
        <p className={styles.sectionLead}>
          A coastal destination for calm, technology-led dentistry serving
          families and professionals throughout Brighton, Hove, Shoreham, and
          the wider Sussex coastline.
        </p>
        <div className={styles.badgeRow}>
          {badges.map((badge) => (
            <span key={badge.label} className={styles.badge}>
              <strong>{badge.label}</strong>
              <span>{badge.detail}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
