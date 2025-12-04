import styles from "./home-preview.module.css";
import PreviewChampagneCTA from "../shared/PreviewChampagneCTA";

const galleryTiles = [
  { title: "Veneers & Whitening", label: "Before / After" },
  { title: "Implants & Bonding", label: "Before / After" },
  { title: "Clear Aligners", label: "Progression" },
  { title: "Full Smile Refresh", label: "Before / After" },
];

export default function HomeSmileGalleryStrip() {
  return (
    <section className={styles.section} aria-labelledby="smile-gallery-heading">
      <div className={`${styles.sectionShell} ${styles.sectionAtmosphereMid}`}>
        <div className={`cpv-card ${styles.sectionPanel}`}>
          <div className={`cpv-card__inner cpv-card__inner--stack ${styles.sectionStack}`}>
            <div className={styles.sectionHeader}>
              <p className={`${styles.smallLabel} text-eyebrow`}>Smile gallery</p>
              <h2 className={styles.sectionTitle} id="smile-gallery-heading">
                Real smiles, real patients
              </h2>
              <p className={`${styles.lead} ${styles.bodyText}`}>
                Placeholder tiles for future before-and-after photography. Each tile keeps space for captions and treatment
                tags once real cases are available.
              </p>
            </div>
            <div className={styles.tileGrid}>
              {galleryTiles.map((tile) => (
                <article key={tile.title} className={styles.tile}>
                  <div className={styles.galleryThumb} aria-hidden />
                  <p className={styles.galleryTag}>{tile.label}</p>
                  <h3 className={`${styles.subhead} ${styles.cardTitle}`}>{tile.title}</h3>
                  <p className={styles.bodyText}>Future slot for paired imagery and patient-safe descriptors.</p>
                </article>
              ))}
            </div>
            <div className={styles.ctaRow}>
              <PreviewChampagneCTA href="/smile-gallery" variant="secondary">
                View smile gallery
              </PreviewChampagneCTA>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
