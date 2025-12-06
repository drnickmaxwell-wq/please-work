import ChampagneCta from "@/components/champagne/ChampagneCta";
import { ChampagneCTA } from "@/components/cta/ChampagneCTA";
import { ChampagneFAQ } from "@/components/faq/ChampagneFAQ";
import ChampagneSectionShell from "@/components/sections/ChampagneSectionShell";
import FaqAccordion from "@/components/faq/FaqAccordion";
import HowToJsonLd from "@/components/seo/HowToJsonLd";
import styles from "./page.module.css";

export const metadata = { title: "Composite Bonding" };

const heroContent = {
  eyebrow: "Cosmetic dentistry",
  title: "Composite bonding for precise, same-day refinements",
  subtitle:
    "Feather-light layers rebalance edges, close micro-spaces, and brighten your smile without invasive prep. Every surface is photographed and polished under studio lighting for a glassy, natural finish.",
};

const benefits = [
  {
    title: "Feather-light sculpting",
    description: "Micro-layered composite builds harmony and symmetry without compromising healthy enamel.",
  },
  {
    title: "Studio-finished blending",
    description: "Digital shade capture and glass-smooth polishing keep the enhancement seamless in any light.",
  },
  {
    title: "Same-day results",
    description: "Most smiles complete in one calm visit with comfort gels and gentle contouring throughout.",
  },
];

const howItWorks = [
  "Consultation maps goals, photographs your smile, and selects a tone within our cosmetic palette.",
  "Teeth are lightly refined where needed; composite is layered and sculpted to close spaces and rebalance edges.",
  "Contours are polished and cross-checked under studio lighting before protective serums seal the finish.",
];

const suitability = [
  "Minor chips, uneven edges, or small gaps",
  "Guests wanting a reversible, low-prep refresh",
  "Pairs well with whitening or aligner plans",
];

const results = [
  "Balanced tooth shapes that match your natural enamel texture",
  "Edges that feel smooth against your lip line and tongue",
  "Shade refinement that photographs beautifully indoors and outside",
];

const faqPlaceholder = [
  {
    question: "FAQ pack binding",
    answer:
      "This page reserves the composite-bonding FAQ pack. Final schema-bound entries will replace this placeholder once the content bundle is synced.",
  },
  {
    question: "What to expect in the interim?",
    answer:
      "Our coordinators will guide you through longevity, sensitivity, and upkeep during your consultation while the FAQ schema is connected.",
  },
];

export default function Page() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} data-tone="cosmetic" aria-labelledby="composite-hero-title">
        <div className={styles.heroGlow} aria-hidden />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>{heroContent.eyebrow}</p>
          <div className={styles.heroHeader}>
            <h1 id="composite-hero-title" className={styles.heroTitle}>
              {heroContent.title}
            </h1>
            <p className={styles.heroSubtitle}>{heroContent.subtitle}</p>
          </div>
          <div className={styles.heroMeta}>
            <span className={styles.metaTone}>Tone: cosmetic</span>
            <span className={styles.metaBadge}>Same-day finish</span>
            <span className={styles.metaBadge}>Gentle prep</span>
          </div>
          <div className={styles.heroCtas}>
            <ChampagneCta
              href="#consult"
              label="Book a composite bonding consult"
              variant="primaryHero"
              ariaLabel="Book a composite bonding consultation"
            />
            <ChampagneCta
              href="#faq"
              label="See bonding FAQs"
              variant="secondaryHero"
              ariaLabel="View composite bonding FAQs"
            />
          </div>
        </div>
      </section>

      <ChampagneSectionShell className={styles.sectionShell} contentClassName={styles.sectionContent}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Benefits</p>
          <h2 className={styles.sectionTitle}>Why guests love composite bonding</h2>
          <p className={styles.sectionLead}>
            Manus Catalogue | Benefits grid. Each card is a glass surface anchored to the Ink palette for calm contrast.
          </p>
        </div>
        <div className={styles.cardGrid}>
          {benefits.map((item) => (
            <article key={item.title} className={styles.card}>
              <div className={styles.cardTone} aria-hidden />
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardCopy}>{item.description}</p>
            </article>
          ))}
        </div>
      </ChampagneSectionShell>

      <section className={styles.section} aria-labelledby="how-it-works">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>How composite bonding works</p>
          <h2 id="how-it-works" className={styles.sectionTitle}>
            Step-by-step, ready for schema
          </h2>
          <p className={styles.sectionLead}>
            Structured in HowTo format so schema injection can bind directly to each step.
          </p>
        </div>
        <ol className={styles.stepList}>
          {howItWorks.map((step, index) => (
            <li key={step} className={styles.stepItem}>
              <span className={styles.stepIndex}>{index + 1}</span>
              <p className={styles.stepCopy}>{step}</p>
            </li>
          ))}
        </ol>
        <HowToJsonLd name="Composite bonding" steps={howItWorks} />
      </section>

      <section className={styles.section} aria-labelledby="suitability">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Suitability</p>
          <h2 id="suitability" className={styles.sectionTitle}>
            Is composite bonding right for you?
          </h2>
        </div>
        <ul className={styles.bulletList}>
          {suitability.map((item) => (
            <li key={item} className={styles.bulletItem}>
              <span className={styles.bulletIcon} aria-hidden>
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="results">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Results</p>
          <h2 id="results" className={styles.sectionTitle}>
            Results our guests love
          </h2>
          <p className={styles.sectionLead}>
            Clear, expectation-setting outcomes that mirror the Manus results rail while staying schema-friendly.
          </p>
        </div>
        <div className={styles.cardGrid}>
          {results.map((result) => (
            <article key={result} className={styles.card}>
              <div className={styles.cardTone} aria-hidden />
              <p className={styles.cardCopy}>{result}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className={styles.section} aria-labelledby="faq-heading">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>FAQ placeholder</p>
          <h2 id="faq-heading" className={styles.sectionTitle}>
            FAQ rail (key: composite-bonding)
          </h2>
          <p className={styles.sectionLead}>
            Bound to the composite-bonding FAQ key; swap placeholders with schema-synced entries once available.
          </p>
        </div>
        <div className={styles.faqGrid}>
          <div className={styles.glassBlock}>
            <ChampagneFAQ heading="Schema-bound FAQ placeholder" items={faqPlaceholder.map((item, index) => ({
              id: `placeholder-${index}`,
              question: item.question,
              answer: item.answer,
            }))}
            />
          </div>
          <div className={styles.glassBlock}>
            <h3 className={styles.cardTitle}>Interim accordion</h3>
            <FaqAccordion items={faqPlaceholder} glassEnabled />
          </div>
        </div>
      </section>

      <section id="consult" className={styles.ctaSection} aria-labelledby="cta-rail">
        <div className={styles.ctaSurface} aria-hidden />
        <div className={styles.ctaContent}>
          <p className={styles.eyebrow}>Ready for a calm appointment?</p>
          <h2 id="cta-rail" className={styles.sectionTitle}>
            Reserve your composite bonding visit
          </h2>
          <p className={styles.sectionLead}>
            CTA rail | Champagne pair. Book a consultation or explore every cosmetic option at your pace.
          </p>
          <div className={styles.heroCtas}>
            <ChampagneCTA
              variant="pair"
              primaryLabel="Book a consultation"
              primaryHref="/book"
              secondaryLabel="See all cosmetic treatments"
              secondaryHref="/treatments/cosmetic"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
