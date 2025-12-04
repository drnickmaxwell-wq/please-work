import styles from "./home-preview.module.css";
import PreviewChampagneCTA from "../shared/PreviewChampagneCTA";

const comfortPoints = [
  "Gentle, unhurried appointments",
  "Options for sedation",
  "Clear communication, no pressure",
];

export default function HomeComfortBlock() {
  return (
    <section className={styles.section} aria-labelledby="comfort-block-heading">
      <div className={`${styles.sectionShell} ${styles.sectionAtmosphereMid}`}>
        <div className={`cpv-card cpv-card--soft ${styles.sectionPanel}`}>
          <div className={`cpv-card__inner cpv-card__inner--stack ${styles.sectionStack}`}>
            <div className={styles.sectionHeader}>
              <p className={`${styles.smallLabel} text-eyebrow`}>Comfort</p>
              <h2 className={styles.sectionTitle} id="comfort-block-heading">
                Designed for nervous patients
              </h2>
              <p className={`${styles.lead} ${styles.bodyText}`}>
                Calm, quiet appointments with time to pause. The team explains every step, offers pauses often, and adapts
                to your pace.
              </p>
            </div>
            <ul className={styles.list}>
              {comfortPoints.map((item) => (
                <li key={item} className={styles.bodyText}>
                  {item}
                </li>
              ))}
            </ul>
            <div className={styles.ctaRow}>
              <PreviewChampagneCTA href="/anxiety-dentistry" variant="secondary">
                Learn about anxiety dentistry
              </PreviewChampagneCTA>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
