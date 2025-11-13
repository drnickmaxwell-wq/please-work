// Preview-only clone. No hard hexes. Do not edit production pages.
export const dynamic = 'force-static';
export const revalidate = 0;

import '@/styles/preview/champagne-preview.css';
import Link from 'next/link';

import LuxeTreatmentHero from '@/components/treatments/LuxeTreatmentHero';
import { KeyList, Section } from '@/components/preview/PreviewBlocks';
import ThreeDViewerSlot from '@/components/preview/treatments/ThreeDViewerSlot';

const benefits = [
  {
    title: 'Natural feel',
    description: 'Implants function like natural teeth so you can eat, speak, and smile with confidence.',
  },
  {
    title: 'Bone preservation',
    description: 'Titanium fixtures stimulate the jaw to prevent bone loss and maintain facial structure.',
  },
  {
    title: 'Lifetime solution',
    description: 'With thoughtful care, implants can last for decades and often a lifetime.',
  },
  {
    title: 'Perfect aesthetics',
    description: 'Custom-crafted crowns mirror the shade and translucency of neighbouring teeth.',
  },
];

const treatmentOptions = [
  {
    name: 'Single tooth implant',
    description: 'Replace an individual missing tooth without touching adjacent healthy teeth.',
    highlights: ['Preserves neighbouring teeth', 'Natural appearance', 'Easy maintenance', 'Long-lasting solution'],
  },
  {
    name: 'Multiple implants',
    description: 'Support several teeth with individual implants or bridgework for secure chewing.',
    highlights: ['Stable chewing function', 'Prevents bone loss', 'Natural speech', 'Improved confidence'],
  },
  {
    name: 'All-on-4® treatment',
    description: 'Strategically placed implants support a full arch of teeth in one streamlined procedure.',
    highlights: ['Same-day teeth', 'Minimal surgery', 'Cost-effective', 'Immediate function'],
  },
];

const process = [
  {
    phase: 'Consultation & planning',
    duration: '1-2 visits',
    description: 'Comprehensive assessment with 3D imaging and smile planning.',
    details: ['Digital X-rays and CT scans', 'Bone density evaluation', 'Tailored treatment plan', 'Investment and timeline review'],
  },
  {
    phase: 'Implant placement',
    duration: '1-2 hours',
    description: 'Precise placement of titanium implants using gentle techniques.',
    details: ['Local anaesthesia or sedation', 'Minimally invasive approach', 'Immediate temporary crown where suitable', 'Detailed aftercare guidance'],
  },
  {
    phase: 'Healing & integration',
    duration: '3-6 months',
    description: 'Osseointegration allows the implant to fuse securely with bone.',
    details: ['Regular review appointments', 'Supportive dietary advice', 'Oral hygiene coaching', 'Temporary restoration if needed'],
  },
  {
    phase: 'Crown placement',
    duration: '2-3 visits',
    description: 'Custom crown design and fitting to complete your restored smile.',
    details: ['Digital impressions', 'Bespoke crown fabrication', 'Fine-tuned adjustments', 'Bite optimisation'],
  },
];

const candidateChecklist = [
  'Adequate bone density or grafting pathway',
  'Healthy gums and overall wellbeing',
  'Commitment to excellent oral hygiene',
  'Non-smoker or ready to pause during treatment',
  'Aligned with review visits and maintenance routines',
  'Realistic expectations for healing timelines',
];

export default function DentalImplantsPreviewPage() {
  return (
    <div className="cpv-page">
      <LuxeTreatmentHero
        variant="implants"
        eyebrow="Treatments preview"
        title="Dental implants in Shoreham-by-Sea"
        description="Restore missing teeth with titanium precision, 3D planning, and calm guest experiences—all staged within the Balanced Dusk Champagne hero before production launch."
        primaryCta={{ label: 'Reserve a consultation', href: '/contact' }}
        secondaryCta={{ label: 'View all treatments', href: '/treatments' }}
      />

      <main className="cpv-main" role="main">
        <Section
          title="Interactive implant preview"
          description={<p>Swap this slot with your WebGL or video module once assets are ready.</p>}
        >
          <ThreeDViewerSlot />
        </Section>

        <Section title="Why guests choose implants">
          <div className="cpv-grid cpv-grid--two">
            {benefits.map((benefit) => (
              <article key={benefit.title} className="cpv-subcard">
                <h3 className="cpv-subcard__title">{benefit.title}</h3>
                <p className="cpv-subcard__body">{benefit.description}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          title="Implant options"
          description={<p>Use these cards to audition messaging for each treatment pathway.</p>}
        >
          <div className="cpv-grid cpv-grid--three">
            {treatmentOptions.map((option) => (
              <article key={option.name} className="cpv-subcard">
                <h3 className="cpv-subcard__title">{option.name}</h3>
                <p className="cpv-subcard__body">{option.description}</p>
                <ul className="cpv-subcard__list">
                  {option.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section
          title="The implant journey"
          description={<p>Map each phase with duration notes, placeholder copy, or future automation hooks.</p>}
        >
          <div className="cpv-grid cpv-grid--two">
            {process.map((step) => (
              <article key={step.phase} className="cpv-subcard">
                <h3 className="cpv-subcard__title">{step.phase}</h3>
                <p className="cpv-subcard__body">{step.description}</p>
                <p className="cpv-note">{step.duration}</p>
                <ul className="cpv-subcard__list">
                  {step.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section
          title="Ideal implant candidates"
          description={<p>Refine this list as screening criteria or marketing copy solidifies.</p>}
        >
          <KeyList items={candidateChecklist} />
        </Section>

        <Section
          title="Plan your implant consultation"
          description={<p>Experiment with CTA messaging, scheduling workflows, or concierge details here.</p>}
        >
          <div className="cpv-cta-row">
            <Link className="cpv-btn cpv-btn-solid" href="/contact">
              Book a consultation
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
