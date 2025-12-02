import Link from "next/link";

import styles from "./home-preview.module.css";

const teamMembers = [
  { name: "Dr Alex Raut", title: "Clinical Lead & Implants" },
  { name: "Dr Shilpa Raut", title: "Cosmetic & Restorative" },
];

export default function HomeTeamTeaser() {
  return (
    <section className={styles.sectionShell} aria-labelledby="team-teaser-heading">
      <div className="cpv-card">
        <div className="cpv-card__inner cpv-card__inner--stack">
          <div className={styles.sectionHeader}>
            <p className="text-eyebrow">Clinical team</p>
            <h2 className="text-display-sm" id="team-teaser-heading">
              Your Clinical Team
            </h2>
            <p className={`${styles.lead} text-body`}>
              Experienced clinicians leading cosmetic, implant, and restorative pathways with a calm, patient-first approach.
            </p>
          </div>
          <div className={styles.profileChips}>
            {teamMembers.map((member) => (
              <div key={member.name} className={styles.profileChip}>
                <span className="text-body font-semibold">{member.name}</span>
                <span className={styles.mutedText}>{member.title}</span>
              </div>
            ))}
          </div>
          <div className={styles.ctaRow}>
            <Link className="cpv-btn cpv-btn-ghost text-eyebrow" href="/team">
              Meet the team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
