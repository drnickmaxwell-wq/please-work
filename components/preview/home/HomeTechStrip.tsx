import styles from "./home-preview.module.css";

const techTiles = [
  {
    title: "CBCT imaging",
    detail: "3D diagnostic views that keep implant and surgical plans precise.",
  },
  {
    title: "Digital scanning",
    detail: "Comfortable, impression-free records that feed into smile design.",
  },
  {
    title: "Aligner planning",
    detail: "Simulations and staging that show how teeth will move before you start.",
  },
  {
    title: "3D workflows",
    detail: "Guides, retainers, and splints produced with accuracy and fewer visits.",
  },
];

export default function HomeTechStrip() {
  return (
    <section className={styles.sectionShell} aria-labelledby="tech-strip-heading">
      <div className="cpv-card cpv-shell-dim">
        <div className="cpv-card__inner cpv-card__inner--stack">
          <div className={styles.sectionHeader}>
            <p className="text-eyebrow">Technology</p>
            <h2 className="text-display-sm" id="tech-strip-heading">
              Advanced technology for precise, comfortable care
            </h2>
            <p className={`${styles.lead} text-body`}>
              Digital planning keeps appointments efficient and predictable. Patients see their options clearly and can preview
              outcomes before committing.
            </p>
          </div>
          <div className={styles.tileGrid}>
            {techTiles.map((tile) => (
              <article key={tile.title} className={styles.tile}>
                <p className={styles.galleryTag}>{tile.title}</p>
                <p className="text-body">{tile.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
