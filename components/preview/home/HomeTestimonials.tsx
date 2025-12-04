import styles from "./home-preview.module.css";

const testimonials = [
  {
    quote: "The team listened first, then showed a calm plan with scans so I knew what to expect.",
    name: "S. H.",
    tag: "Dental implants",
  },
  {
    quote: "Lovely quiet clinic. Veneers were previewed digitally before we started anything.",
    name: "A. R.",
    tag: "Cosmetic dentistry",
  },
  {
    quote: "Gentle, unhurried appointments and clear instructions for my aligners and retainers.",
    name: "J. M.",
    tag: "Clear aligners",
  },
  {
    quote: "Felt genuinely cared for. Everything was explained simply with no pressure to rush decisions.",
    name: "L. B.",
    tag: "General dentistry",
  },
];

export default function HomeTestimonials() {
  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <div className={`${styles.sectionShell} ${styles.sectionAtmosphereMid}`}>
        <div className={`cpv-card ${styles.sectionPanel}`}>
          <div className={`cpv-card__inner cpv-card__inner--stack ${styles.sectionStack}`}>
            <div className={styles.sectionHeader}>
              <p className={`${styles.smallLabel} text-eyebrow`}>Patient stories</p>
              <h2 className={styles.sectionTitle} id="testimonials-heading">
                What our patients say
              </h2>
              <p className={`${styles.lead} ${styles.bodyText}`}>
                Snapshot quotes mirroring the HOME_TESTIMONIALS pattern. Full stories and video proof can replace these once
                the production gallery is ready.
              </p>
            </div>
            <div className={styles.cardGrid}>
              {testimonials.map((item) => (
                <article key={item.quote} className={styles.card}>
                  <p className={styles.bodyText}>“{item.quote}”</p>
                  <div className={styles.tightStack}>
                    <p className={`${styles.smallLabel} text-eyebrow`}>{item.tag}</p>
                    <p className={styles.bodyText}>{item.name}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
