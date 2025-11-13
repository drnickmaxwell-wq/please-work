import type { Metadata } from 'next';
import Link from 'next/link';

import '@/styles/preview/champagne-preview.css';

import LuxeTreatmentHero from '@/components/treatments/LuxeTreatmentHero';
import { Section } from '@/components/preview/PreviewBlocks';
import { previewRobots } from '@/lib/seo/preview/previewRobots';

export const metadata: Metadata = {
  robots: previewRobots,
};

const workflowSteps = [
  {
    title: 'Digital scan',
    description:
      'Micron-level 3D scanning replaces impressions, capturing every contour with gentle, contactless mapping.',
    timeline: ['5 minute scan', 'No moulds', 'Instant preview'],
  },
  {
    title: 'Design in motion',
    description:
      'Designers co-create your smile in real-time, blending anatomy, bite, and facial harmony under studio lighting.',
    timeline: ['Shade matching', 'Texture overlays', 'Your approval'],
  },
  {
    title: 'Same-day make',
    description: 'On-site milling and 3D printing deliver veneers, inlays, and aligners in a single relaxed visit.',
    timeline: ['Guided milling', 'Hand finishing', 'Studio polish'],
  },
];

const equipmentShowcase = [
  {
    title: 'Primescan digital suite',
    description: 'Ultra-fast intraoral scanners reduce chair time while capturing fine edge detail for veneers and crowns.',
    notes: ['Micron accuracy', 'Comfort-led capture', 'Instant modelling'],
  },
  {
    title: 'Guided implant theatre',
    description: 'CBCT imaging and dynamic navigation plan implants with precision, keeping procedures calm and efficient.',
    notes: ['Low-dose imaging', 'Sedation friendly', 'Same-day smile'],
  },
  {
    title: 'Femtosecond laser finishing',
    description: 'Laser contouring refines soft tissue and activates whitening gels with minimal sensation and zero downtime.',
    notes: ['Cooling comfort', 'High precision', 'Promotes healing'],
  },
];

const technologyFaq = [
  {
    question: 'How does AI improve my dental visit?',
    answer:
      'Predictive scanners and real-time analysis reduce guesswork, shorten chair time, and visualise outcomes before treatment begins.',
  },
  {
    question: 'Can I preview my smile changes virtually?',
    answer:
      'Yes. Our AR try-on and 3D modelling suite let you explore adjustments before we ever touch a tooth, so you can make confident decisions.',
  },
  {
    question: 'Is the technology comfortable for anxious patients?',
    answer:
      'We pair gentle laser dentistry with guided sedation pathways and noise-dampened equipment for a calmer experience from start to finish.',
  },
];

export default function TechnologyPreviewPage() {
  return (
    <div className="cpv-page">
      <LuxeTreatmentHero
        variant="technology"
        eyebrow="Treatments preview"
        title="Precision technology, calmer appointments"
        description="Guided implants, 3D printing, and laser refinements live inside the same dusk-to-teal Champagne hero system used on the home page—perfect for previewing interactive modules and copy."
        primaryCta={{ label: 'Book a technology tour', href: '/contact' }}
        secondaryCta={{ label: 'View all treatments', href: '/treatments' }}
      />

      <main className="cpv-main" role="main">
        <Section
          title="Our digital workflow"
          description={<p>Showcase each stage with production-ready language or swap in component experiments.</p>}
        >
          <div className="cpv-grid cpv-grid--three">
            {workflowSteps.map((step) => (
              <article key={step.title} className="cpv-subcard">
                <h3 className="cpv-subcard__title">{step.title}</h3>
                <p className="cpv-subcard__body">{step.description}</p>
                <ul className="cpv-subcard__list">
                  {step.timeline.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section
          title="Equipment gallery"
          description={<p>Embed photography or short clips here; the subcards below provide quick reference copy.</p>}
        >
          <div className="cpv-grid cpv-grid--three">
            {equipmentShowcase.map((item) => (
              <article key={item.title} className="cpv-subcard">
                <h3 className="cpv-subcard__title">{item.title}</h3>
                <p className="cpv-subcard__body">{item.description}</p>
                <ul className="cpv-subcard__list">
                  {item.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section
          title="Technology FAQs"
          description={<p>Pair these placeholders with schema tests, accordion variants, or AI-generated responses.</p>}
        >
          <div className="cpv-faq">
            {technologyFaq.map((faq) => (
              <article key={faq.question} className="cpv-faq__item">
                <h3 className="cpv-faq__question">{faq.question}</h3>
                <p className="cpv-faq__answer">{faq.answer}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          title="See the suite in person"
          description={<p>Adapt this CTA pair for concierge workflows, automation tests, or data capture experiments.</p>}
        >
          <div className="cpv-cta-row">
            <Link className="cpv-btn cpv-btn-solid" href="/contact">
              Book a technology tour
            </Link>
            <Link className="cpv-btn cpv-btn-outline" href="/treatments">
              View all treatments
            </Link>
          </div>
        </Section>
      </main>
    </div>
  );
}
