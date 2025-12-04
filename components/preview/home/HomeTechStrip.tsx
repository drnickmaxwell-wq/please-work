import styles from "./home-preview.module.css";

const tech = [
  "CBCT and guided surgery", 
  "Digital scanning for comfort", 
  "Aligner planning studio", 
  "Fully digital 3D workflows",
];

export default function HomeTechStrip() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          Advanced technology for precise, comfortable care
        </h2>
        <p className={styles.sectionLead}>
          High-fidelity imaging and digital planning tools reduce chair time and
          keep treatments predictable.
        </p>
      </div>
      <div className={styles.strip}>
        {tech.map((item) => (
          <div key={item} className={styles.stripItem}>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
