import Link from "next/link";

import styles from "./home-preview.module.css";

const galleryTiles = [
  { title: "Veneers & Whitening", label: "Before / After" },
  { title: "Implants & Bonding", label: "Before / After" },
  { title: "Clear Aligners", label: "Progression" },
  { title: "Full Smile Refresh", label: "Before / After" },
];

export default function HomeSmileGalleryStrip() {
  return (
    <section className={styles.sectionShell} aria-labelledby="smile-gallery-heading">
      <div className="cpv-card">
        <div className="cpv-card__inner cpv-card__inner--stack">
          <div className={styles.sectionHeader}>
            <p className="text-eyebrow">Smile gallery</p>
            <h2 className="text-display-sm" id="smile-gallery-heading">
              Smile Transformations
            </h2>
            <p className={`${styles.lead} text-body`}>
              Placeholder tiles for future before-and-after photography. Each tile keeps space for captions and treatment tag
              s once real cases are available.
            </p>
          </div>
          <div className={styles.tileGrid}>
            {galleryTiles.map((tile) => (
              <article key={tile.title} className={styles.tile}>
                <p className={styles.galleryTag}>{tile.label}</p>
                <h3 className={`text-lead ${styles.cardTitle}`}>{tile.title}</h3>
                <p className="text-body">Future slot for paired imagery and patient-safe descriptors.</p>
              </article>
            ))}
          </div>
          <div className={styles.ctaRow}>
            <Link className="cpv-btn cpv-btn-ghost text-eyebrow" href="/smile-gallery">
              View smile gallery
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
