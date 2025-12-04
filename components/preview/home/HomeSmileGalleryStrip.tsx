import ChampagneCTA from "@/components/champagne/ChampagneCTA";

import styles from "./home-preview.module.css";

const galleryPlaceholders = Array.from({ length: 6 }, (_, index) => index);

export default function HomeSmileGalleryStrip() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Real smiles, real patients</h2>
        <p className={styles.sectionLead}>
          A glimpse of the before-and-after journeys created with veneers,
          bonding, aligners, and implant artistry.
        </p>
      </div>
      <div className={styles.galleryGrid}>
        {galleryPlaceholders.map((item) => (
          <div key={item} className={styles.galleryItem} />
        ))}
      </div>
      <div className={styles.pillRow} style={{ marginTop: "1.2rem" }}>
        <ChampagneCTA href="/gallery" variant="secondary">
          View the smile gallery
        </ChampagneCTA>
      </div>
    </section>
  );
}
