import ChampagneCta from "@/components/champagne/ChampagneCta";

import styles from "./home-preview.module.css";

const teamMembers = [
  { name: "Dr Alex Raut", title: "Clinical lead & implant dentist" },
  { name: "Dr Shilpa Raut", title: "Cosmetic & restorative dentist" },
  { name: "Louise Smith", title: "Treatment coordinator" },
];

export default function HomeTeamTeaser() {
  return (
    <section aria-labelledby="team-teaser-heading">
      <div className="smh-section">
        <div className={`${styles.sectionShell} ${styles.sectionAtmosphereMid}`}>
          <div className={`cpv-card ${styles.sectionPanel}`}>
            <div className={`cpv-card__inner cpv-card__inner--stack ${styles.sectionStack}`}>
              <div className={styles.sectionHeader}>
                <p className={`${styles.smallLabel} text-eyebrow`}>Clinical team</p>
                <h2 className={styles.sectionTitle} id="team-teaser-heading">
                  Meet the team behind your smile
                </h2>
                <p className={`${styles.lead} ${styles.bodyText}`}>
                  Experienced clinicians leading cosmetic, implant, and restorative pathways with a calm, patient-first
                  approach.
                </p>
              </div>
              <div className={styles.profileChips}>
                {teamMembers.map((member) => (
                  <div key={member.name} className={styles.profileChip}>
                    <span className={`${styles.bodyText} font-semibold`}>{member.name}</span>
                    <span className={styles.mutedText}>{member.title}</span>
                  </div>
                ))}
              </div>
              <div className={styles.ctaRow}>
                <ChampagneCta href="/team" label="Meet the team" variant="secondarySection" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
