import styles from "./home-preview.module.css";

const team = [
  { name: "Dr. Susan Wilkinson", role: "Cosmetic & Implant Dentist", route: "/team/susan-wilkinson" },
  { name: "Dr. Andy Brown", role: "Aligner & Restorative Dentist", route: "/team/andy-brown" },
  { name: "Nikki & Jenna", role: "Hygiene & Patient Care", route: "/team" },
];

export default function HomeTeamTeaser() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Meet the team behind your smile</h2>
        <p className={styles.sectionLead}>
          A multidisciplinary team that plans together — from cosmetic artistry
          to long-term maintenance.
        </p>
      </div>
      <div className={styles.teamGrid}>
        {team.map((member) => (
          <article key={member.name} className={styles.teamCard}>
            <h3 className={styles.cardTitle}>{member.name}</h3>
            <p className={styles.smallMeta}>{member.role}</p>
            <p className={styles.cardText}>Preview profile route: {member.route}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
