import BrandHeroGradient from '@/components/brand/BrandHeroGradient';
import FaqAccordion from '@/components/faq/FaqAccordion';
import CompositeBonding from '@/components/sections/treatments/CompositeBonding';

import styles from './composite-bonding.module.css';

export const metadata = { title: 'Composite Bonding' };

const champagnePhase2 = process.env.NEXT_PUBLIC_CHAMPAGNE_PHASE2 === '1';

const bondingFaq = [
  {
    question: 'How durable is composite bonding?',
    answer:
      'With mindful care and routine hygiene visits, modern composites last 5–7 years on average and can be refreshed without invasive prep.',
  },
  {
    question: 'Will the results look natural?',
    answer:
      'We colour-match each layer under studio lighting and polish to a glass-smooth finish, so the enhancement blends seamlessly with your enamel.',
  },
  {
    question: 'What is the appointment like?',
    answer:
      'Plan for a single calm visit: digital shade capture, minimal preparation, sculpting, and final contouring in around 90 minutes per smile zone.',
  },
];

function HeroContent() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <p className={styles.heroEyebrow}>Composite Bonding</p>
        <h1 className={styles.heroTitle}>Hand-sculpted brilliance, finished in a single visit</h1>
        <p className={styles.heroDescription}>
          We recontour edges, close micro-gaps, and brighten each tooth with feather-light layers that respect your natural
          enamel. Every smile is photographed under studio light to perfect the finish before you leave.
        </p>
        <div className={styles.heroActions}>
          <a className="smh-btn" href="#consult">
            Reserve a consultation
          </a>
          <a className={styles.heroSecondary} href="#faq">
            View bonding FAQs
          </a>
        </div>
      </div>
    </section>
  );
}

export default function CompositeBondingPage() {
  const hero = <HeroContent />;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {champagnePhase2 ? (
        <BrandHeroGradient
          intensity="standard"
          clip="wave-bottom"
          goldDensity="med"
          particles="gold"
          grainOpacity={0.14}
          driftEnabled
        >
          {hero}
        </BrandHeroGradient>
      ) : (
        hero
      )}

      <div className={styles.sectionGrid}>
        <CompositeBonding />
      </div>

      <section id="faq" className={styles.faqSection}>
        <div className={styles.faqIntro}>
          <h2>Composite bonding questions</h2>
          <p>
            From longevity to comfort, here are the answers we cover in every consultation. Tailor your appointment before we
            sculpt the final finish.
          </p>
        </div>
        <FaqAccordion items={bondingFaq} glassEnabled={champagnePhase2} />
      </section>
    </main>
  );
}
