import Link from "next/link";

import ChampagneCta from "@/components/champagne/ChampagneCta";

import styles from "./home-preview.module.css";

type TreatmentCard = {
  title: string;
  description: string;
  href: string;
};

const treatmentCards: TreatmentCard[] = [
  {
    title: "Composite Bonding",
    description: "Featherlight edge refinements and chip repairs with a camera-ready polish.",
    href: "/treatments/cosmetic",
  },
  {
    title: "Veneers",
    description: "Porcelain artistry shaped to your smile line with digital mock-ups before day one.",
    href: "/treatments/veneers",
  },
  {
    title: "Dental Implants",
    description: "Guided placement, 3D planning, and natural-looking ceramic restorations.",
    href: "/treatments/dental-implants",
  },
  {
    title: "Clear Aligners",
    description: "Aligner planning supported by 3D simulations and retention built in from day one.",
    href: "/treatments/orthodontics",
  },
];

export default function HomeFeaturedTreatments() {
  return (
    <section className={styles.sectionShell} aria-labelledby="featured-treatments-heading">
      <div className="cpv-card">
        <div className="cpv-card__inner cpv-card__inner--stack">
          <div className={styles.sectionHeader}>
            <p className="text-eyebrow">Clinical highlights</p>
            <h2 className="text-display-sm" id="featured-treatments-heading">
              Focused on smiles, not just teeth
            </h2>
            <p className={`${styles.lead} text-body`}>
              A preview of the key pathways guests request most often. Each card links to the preview routes while production
              pages remain protected.
            </p>
          </div>
          <div className={styles.cardGrid}>
            {treatmentCards.map((card) => (
              <article key={card.title} className={styles.card}>
                <h3 className={`text-lead ${styles.cardTitle}`}>{card.title}</h3>
                <p className="text-body">{card.description}</p>
                <Link className={`${styles.inlineLink} text-body`} href={card.href}>
                  View treatment →
                </Link>
              </article>
            ))}
          </div>
          <div className={styles.ctaRow}>
            <ChampagneCta href="/contact" label="Book a consultation" variant="primarySection" />
            <ChampagneCta href="/treatments" label="View all treatments" variant="secondarySection" />
          </div>
        </div>
      </div>
    </section>
  );
}
