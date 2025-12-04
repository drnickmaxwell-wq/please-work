import styles from "./home-preview.module.css";

const digitalFeatures = [
  "CBCT imaging for precise diagnostics",
  "Intraoral scanning for comfort and accuracy",
  "3D printing for guides, retainers, and splints",
];

const aiFeatures = [
  "AI smile previews aligned to treatment plans",
  "AI-powered treatment finder for quick triage",
  "Video consultations with structured intake",
];

export default function HomeTechStrip() {
  return (
    <section className={styles.sectionShell} aria-labelledby="tech-strip-heading">
      <div className="cpv-card cpv-shell-dim">
        <div className="cpv-card__inner cpv-card__inner--stack">
          <div className={styles.sectionHeader}>
            <p className="text-eyebrow">Technology</p>
            <h2 className="text-display-sm" id="tech-strip-heading">
              Advanced Technology & AI
            </h2>
            <p className={`${styles.lead} text-body`}>
              Digital planning and AI tools keep appointments efficient and predictable. Patients see their options clearly an
              d can preview outcomes before committing.
            </p>
          </div>
          <div className={styles.twoColumn}>
            <div className={styles.tightStack}>
              <p className="text-eyebrow">Digital dentistry</p>
              <ul className={styles.list}>
                {digitalFeatures.map((item) => (
                  <li key={item} className="text-body">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.tightStack}>
              <p className="text-eyebrow">AI tools</p>
              <ul className={styles.list}>
                {aiFeatures.map((item) => (
                  <li key={item} className="text-body">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
