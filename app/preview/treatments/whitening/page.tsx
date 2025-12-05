export const dynamic = "force-static";
export const revalidate = 0;

import type { Metadata } from "next";

import { HeroEngine } from "@/components/champagne/hero/HeroEngine";
import { ChampagneCTA } from "@/components/cta/ChampagneCTA";
import { ChampagneTestimonialCarousel } from "@/components/testimonial/ChampagneTestimonialCarousel";
import { whitening_hero } from "@/lib/champagne/hero-presets";
import { previewRobots } from "@/lib/seo/preview/previewRobots";
import { buildPreviewMetadata as buildTreatmentPreviewMetadata } from "@/lib/treatments/previewTreatmentConfig";

import "@/styles/preview/champagne-preview.css";
import "@/components/preview/preview-typography.css";
import styles from "@/components/preview/treatments/composite-bonding/composite-bonding-preview.module.css";

const slug = "whitening";

// DRAFT COPY: Whitening benefits for Director review.
const whiteningBenefits = [
  "Sensitivity-aware whitening protocols tailored to your teeth.",
  "Shade planning that pairs whitening with future bonding or veneers.",
  "Dentist-led care with documented before/after shades.",
  "Refresher review to help maintain brightness over time.",
];

// DRAFT COPY: Whitening journey steps for Director review.
const whiteningSteps = [
  {
    title: "Consult & shade map",
    summary: "We capture photos and shade records, and plan your ideal result.",
  },
  { title: "Gentle activation", summary: "In-surgery whitening with sensitivity management built-in." },
  { title: "Calm recovery", summary: "Aftercare advice and products to keep teeth comfortable." },
  { title: "Plan the finish", summary: "Review your results and plan any future top-ups or refinements." },
];

// DRAFT COPY: Whitening FAQs for Director review.
const whiteningFaq = [
  {
    question: "Will whitening make my teeth sensitive?",
    answer:
      "We use sensitivity-aware gels and can adjust the protocol or add serums if you feel any zing during treatment.",
  },
  {
    question: "How long do whitening results last?",
    answer:
      "Results typically hold for months with good care. We map your shade and advise when quick top-ups are helpful.",
  },
  {
    question: "Is whitening safe for my enamel?",
    answer:
      "Dentist-prescribed whitening keeps gels within safe limits and avoids overheating so enamel stays protected.",
  },
  {
    question: "Can I still have whitening if I have fillings or crowns?",
    answer:
      "Yes. We check any existing work, explain how it will respond, and plan refinements or replacements if needed.",
  },
];

export const whiteningFaqEntities = whiteningFaq.map((item) => ({
  questionName: item.question,
  acceptedAnswerText: item.answer,
}));

export const metadata: Metadata = {
  ...buildTreatmentPreviewMetadata(slug),
  robots: previewRobots,
};

type PreviewPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function WhiteningPreviewPage({ searchParams }: PreviewPageProps) {
  return (
    // Whitening preview shares the composite-bonding canvas and layout; hero comes from the Champagne Hero Engine preset.
    <div className={`cpv-page ${styles.page}`} data-treatment="whitening">
      <HeroEngine allowNonPreview={Boolean(searchParams?.preview)} schema={whitening_hero} />

      <main className={styles.main} role="main">
        <section className={styles.section} aria-labelledby="benefits-heading">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Why guests choose this pathway</span>
            <h2 id="benefits-heading" className={styles.sectionTitle}>
              Luminous Whitening benefits
            </h2>
            <p className={styles.sectionLead}>
              Sensitivity-aware whitening planned for calm, even shade lifts that fit alongside future cosmetic pathways.
            </p>
          </div>
          <div className={styles.overviewGrid}>
            {whiteningBenefits.map((item) => (
              <div key={item} className={styles.glass}>
                <p className={styles.sectionLead}>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="journey-heading">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Your whitening journey</span>
            <h2 id="journey-heading" className={styles.sectionTitle}>
              Steps mapped to calm brightness
            </h2>
            <p className={styles.sectionLead}>
              A guided plan with shade tracking, sensitivity management, and touchpoints for future cosmetic refinements.
            </p>
          </div>
          <div className={styles.overviewGrid}>
            {whiteningSteps.map((step) => (
              <div key={step.title} className={styles.glass}>
                <h3 className={styles.sectionTitle}>{step.title}</h3>
                <p className={styles.sectionLead}>{step.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="finance-heading">
          <div className={`${styles.glass} ${styles.financeCard ?? ""}`}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Investment</span>
              <h2 id="finance-heading" className={styles.sectionTitle}>
                Transparent finance preview
              </h2>
              <p className={styles.sectionLead}>
                Placeholder finance band keyed to whitening. Swap in live finance modules once plan mappings are approved.
              </p>
            </div>
            <div className={styles.financeGrid}>
              {["0% APR examples", "Soft search ready", "Sensitivity-safe plans", "Whitening & bonding refinements"].map(
                (pill) => (
                  <div key={pill} className={styles.financePill}>
                    {pill}
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="stories-heading">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Testimonials</span>
            <h2 id="stories-heading" className={styles.sectionTitle}>
              Patient stories strip
            </h2>
            <p className={styles.sectionLead}>Preview-only testimonial rail using Champagne testimonial components.</p>
          </div>
          <div className={styles.testimonialShell}>
            <ChampagneTestimonialCarousel
              heading="Whitening stories"
              items={[
                {
                  quote: "The shade plan and desensitising serums made whitening calm and predictable.",
                  name: "Sophie",
                  role: "Preview treatment guest",
                  rating: 5,
                },
                {
                  quote: "I could see the journey steps and costs before committing—felt very considered.",
                  name: "Alex",
                  role: "Design QA",
                  rating: 5,
                },
              ]}
            />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="faq-heading">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>FAQ</span>
            <h2 id="faq-heading" className={styles.sectionTitle}>
              Whitening questions preview
            </h2>
            <p className={styles.sectionLead}>Swap with schema-connected FAQ entries once they land.</p>
          </div>
          <div className={styles.overviewGrid}>
            {whiteningFaq.map((item) => (
              <div key={item.question} className={styles.glass}>
                <h3 className={styles.sectionTitle}>{item.question}</h3>
                <p className={styles.sectionLead}>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.section} tonal-dusk-to-ink`} aria-labelledby="closing-cta">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Next steps</span>
            <h2 id="closing-cta" className={styles.sectionTitle}>
              Ready for your whitening plan?
            </h2>
            <p className={styles.sectionLead}>
              Book a whitening consultation or explore the full treatment list. The Champagne CTA pair stays on CTA System v2.
            </p>
          </div>
          <ChampagneCTA
            variant="pair"
            primaryLabel="Book Teeth whitening"
            primaryHref="/contact"
            secondaryLabel="View all treatments"
            secondaryHref="/treatments"
          />
        </section>
      </main>
    </div>
  );
}
