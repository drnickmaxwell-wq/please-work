import { ChampagneTestimonialCarousel } from "@/components/testimonial/ChampagneTestimonialCarousel";

import styles from "./composite-bonding-preview.module.css";

const TESTIMONIALS = [
  {
    quote: "They refined two chipped edges in one visit—the finish looks like my natural enamel under studio lights.",
    name: "Sophie", 
    role: "Composite bonding guest",
    rating: 5,
  },
  {
    quote: "The consult, scan, and polish felt choreographed. I left with balanced edges and zero sensitivity.",
    name: "Alex",
    role: "Camera-ready refinement",
    rating: 5,
  },
  {
    quote: "Everything was mapped out: shade, layers, even aftercare times. The gloss still holds months later.",
    name: "James",
    role: "Same-day bonding",
    rating: 5,
  },
];

export function CompositeBondingStories() {
  return (
    <section className={styles.section} aria-labelledby="composite-stories-heading">
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>Patient stories</span>
        <h2 id="composite-stories-heading" className={styles.sectionTitle}>
          Composite bonding stories
        </h2>
        <p className={styles.sectionLead}>
          Reusable carousel built on the Champagne testimonial skeleton. Swap in real before/after stories once production assets
          are approved.
        </p>
      </div>

      <div className={styles.storiesShell}>
        <ChampagneTestimonialCarousel items={TESTIMONIALS} heading="Composite bonding stories" />
      </div>
    </section>
  );
}
