import Link from "next/link";

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
    title: "Teeth Whitening",
    description: "Sensitivity-aware brightening with supervised at-home and in-clinic finishing.",
    href: "/treatments/whitening",
  },
  {
    title: "Clear Aligners",
    description: "Spark-style clear aligner journeys with regular reviews and retention built in.",
    href: "/treatments/orthodontics",
  },
  {
    title: "General Dentistry",
    description: "Preventive check-ups, restorative care, and hygiene support that protect long-term health.",
    href: "/treatments/general",
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
              Featured Treatments
            </h2>
            <p className={`${styles.lead} text-body`}>
              A preview of the key pathways guests request most often. Each card links to the current treatment previews while
              production pages remain protected.
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
        </div>
      </div>
    </section>
  );
}
