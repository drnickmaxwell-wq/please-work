import { ChampagneTestimonialCarousel } from "@/components/testimonial/ChampagneTestimonialCarousel";

import styles from "./whitening-preview.module.css";

const TESTIMONIALS = [
  {
    quote: "The shade plan and desensitising serums made whitening calm and predictable.",
    name: "Sophie",
    role: "Whitening guest",
    rating: 5,
  },
  {
    quote: "I could see the journey steps and costs before committing—felt very considered.",
    name: "Alex",
    role: "Design QA",
    rating: 5,
  },
  {
    quote: "We paired whitening with later bonding and the shade match was spot on.",
    name: "James",
    role: "Preview treatment guest",
    rating: 5,
  },
];

export function WhiteningStories() {
  return (
    <section className={styles.section} aria-labelledby="whitening-stories-heading">
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>Patient stories</span>
        <h2 id="whitening-stories-heading" className={styles.sectionTitle}>
          Whitening stories strip
        </h2>
        <p className={styles.sectionLead}>
          Carousel built on the Champagne testimonial skeleton. Swap in real whitening stories once production assets are ready.
        </p>
      </div>

      <div className={styles.storiesShell}>
        <ChampagneTestimonialCarousel items={TESTIMONIALS} heading="Whitening stories" />
      </div>
    </section>
  );
}
