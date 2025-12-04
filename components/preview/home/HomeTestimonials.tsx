import styles from "./home-preview.module.css";

const testimonials = [
  {
    quote:
      "The calmest dental experience I’ve ever had — everything was explained and I never felt rushed.",
    name: "Sophie, Brighton",
  },
  {
    quote:
      "Digital scans meant no messy impressions and my new smile was planned with incredible detail.",
    name: "James, Shoreham",
  },
  {
    quote:
      "I felt genuinely listened to. The team balanced my anxiety with a beautiful cosmetic result.",
    name: "Hannah, Hove",
  },
  {
    quote:
      "From implants to whitening, it’s all under one calm roof with clinicians who really care.",
    name: "Mark, Worthing",
  },
];

export default function HomeTestimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>What our patients say</h2>
        <p className={styles.sectionLead}>
          Preview feedback from the Sussex community choosing St Mary’s House
          for complex and cosmetic care.
        </p>
      </div>
      <div className={styles.testimonials}>
        {testimonials.map((testimonial) => (
          <article key={testimonial.quote} className={styles.testimonial}>
            <p className={styles.testimonialQuote}>“{testimonial.quote}”</p>
            <p className={styles.testimonialName}>— {testimonial.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
