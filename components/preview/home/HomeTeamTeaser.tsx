import ChampagneCta from "@/components/champagne/ChampagneCta";

import styles from "./home-preview.module.css";

const teamMembers = [
  { name: "Dr Alex Raut", title: "Clinical lead & implant dentist" },
  { name: "Dr Shilpa Raut", title: "Cosmetic & restorative dentist" },
  { name: "Louise Smith", title: "Treatment coordinator" },
];

export default function HomeTeamTeaser() {
  return (
    <section className={styles.sectionShell} aria-labelledby="team-teaser-heading">
      <div className="cpv-card">
        <div className="cpv-card__inner cpv-card__inner--stack">
          <div className={styles.sectionHeader}>
            <p className="text-eyebrow">Clinical team</p>
            <h2 className="text-display-sm" id="team-teaser-heading">
              Meet the team behind your smile
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
            <ChampagneCta href="/team" label="Meet the team" variant="secondarySection" />
          </div>
        </div>
      </div>
    </section>
  );
}
