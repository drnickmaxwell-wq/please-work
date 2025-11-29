import styles from "./preview-technology.module.css";

const stats = [
  "Fewer appointments thanks to in-house milling",
  "Minimal impressions with comfort-first scanning",
  "Less material waste via precise 3D planning",
  "Predictable timelines with digital checkpoints",
];

export default function PreviewTechStats() {
  return (
    <section className={styles.statsSection} aria-labelledby="tech-stats-heading">
      <div className={styles.sectionHeading}>
        <p className="text-eyebrow">Sustainability &amp; efficiency</p>
        <div className="space-y-3">
          <h2 className="text-display-sm" id="tech-stats-heading">
            Technology that reduces friction
          </h2>
          <p className="text-body">Simple stat chips that show how digital dentistry streamlines each visit.</p>
        </div>
      </div>
      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <span key={stat} className={styles.statChip}>
            {stat}
          </span>
        ))}
      </div>
    </section>
  );
}
