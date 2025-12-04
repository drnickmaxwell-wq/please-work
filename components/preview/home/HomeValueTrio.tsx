import styles from "./home-preview.module.css";

const values = [
  {
    title: "Champagne Atmosphere",
    copy: "Soft lighting, calm playlists, and private spaces that feel more like a boutique lounge than a clinic.",
  },
  {
    title: "Digital-First Dentistry",
    copy: "CBCT imaging, 3D planning, and AI-enhanced diagnostics to design precise, conservative treatment plans.",
  },
  {
    title: "Gentle, Unhurried Care",
    copy: "Longer appointments, thoughtful explanations, and clinicians who specialise in supporting anxious patients.",
  },
];

export default function HomeValueTrio() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>What makes St Mary’s House different</h2>
        <p className={styles.sectionLead}>
          A calm, coastal take on private dentistry that blends technology,
          hospitality, and gentle clinical excellence.
        </p>
      </div>
      <div className={`${styles.grid} ${styles.gridThree}`}>
        {values.map((value) => (
          <article key={value.title} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{value.title}</h3>
            </div>
            <p className={styles.cardText}>{value.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
