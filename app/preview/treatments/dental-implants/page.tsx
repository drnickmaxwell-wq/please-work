// Preview-only clone. No hard hexes. Do not edit production pages.
export const dynamic = 'force-static';
export const revalidate = 0;

import Link from 'next/link';

import InteractiveToothModel from '@/components/3d/interactive-tooth-model';
import { TreatmentPreviewFrame } from '@/components/preview/TreatmentPreviewFrame';
import TreatmentBanner from '@/components/preview/TreatmentBanner';
import ThreeDViewerSlot from '@/components/preview/treatments/ThreeDViewerSlot';
import ChampagneSectionShell, { champagneShellClasses } from '@/components/sections/ChampagneSectionShell';
import { TOKENS as NEUTRAL_TOKENS } from '@/styles/tokens/neutrals';

import '@/styles/treatments/preview-light.css';

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
    description: 'With good care, implants can last for decades and often a lifetime.',
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
    details: [
      'Digital X-rays and CT scans',
      'Bone density evaluation',
      'Tailored treatment plan',
      'Investment and timeline review',
    ],
  },
  {
    phase: 'Implant placement',
    duration: '1-2 hours',
    description: 'Precise placement of titanium implants using gentle techniques.',
    details: [
      'Local anaesthesia or sedation',
      'Minimally invasive approach',
      'Immediate temporary crown where suitable',
      'Detailed aftercare guidance',
    ],
  },
  {
    phase: 'Healing & integration',
    duration: '3-6 months',
    description: 'Osseointegration allows the implant to fuse securely with bone.',
    details: [
      'Regular review appointments',
      'Supportive dietary advice',
      'Oral hygiene coaching',
      'Temporary restoration if needed',
    ],
  },
  {
    phase: 'Crown placement',
    duration: '2-3 visits',
    description: 'Custom crown design and fitting to complete your restored smile.',
    details: [
      'Digital impressions',
      'Bespoke crown fabrication',
      'Fine-tuned adjustments',
      'Bite optimisation',
    ],
  },
];

const candidateChecklist = [
  {
    title: 'Adequate bone density',
    description: 'Sufficient jaw support for implant placement, with grafting available where required.',
  },
  {
    title: 'Healthy gums',
    description: 'Periodontal health or treated gum concerns to encourage successful healing.',
  },
  {
    title: 'Good overall health',
    description: 'Medical conditions are well-managed to support predictable recovery.',
  },
  {
    title: 'Non-smoker',
    description: 'Smoking reduces implant success; quitting improves long-term results.',
  },
  {
    title: 'Commitment to oral hygiene',
    description: 'Daily care and routine reviews keep implants stable and pristine.',
  },
  {
    title: 'Realistic expectations',
    description: 'Understanding the timeline and maintenance for a confident smile transformation.',
  },
];

export default function DentalImplantsPreviewPage() {
  const { goldGlow, parallax } = champagneShellClasses;

  return (
    <TreatmentPreviewFrame section="implants">
      <ChampagneSectionShell>
        <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6">
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex flex-wrap items-center gap-2 text-[var(--champagne-ink-muted)]">
              <li>
                <Link className="underline-offset-4 hover:underline" href="/preview">
                  Preview
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link className="underline-offset-4 hover:underline" href="/preview/treatments">
                  Treatments
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-[var(--champagne-ink)]">
                Dental implants
              </li>
            </ol>
          </nav>

          <div className={parallax} data-direction="reverse">
            <TreatmentBanner
              label="Treatments"
              subtitle="Restore missing teeth with titanium implants that look and feel natural. Our advanced planning, calming environment, and same-day provisional options keep every stage precise and comfortable."
              title="Dental implants in Shoreham-by-Sea"
            />
        </div>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">3D implant visualiser</h2>
            <p className="max-w-3xl leading-relaxed t-muted">
              Explore how the implant, abutment, and crown work together. Rotate the model to see how the restoration integrates
              with surrounding bone and soft tissue.
            </p>
            <div className="t-card p-6">
              <InteractiveToothModel
                treatmentType="implant"
                title="Complete Dental Implant System"
                description="See how titanium implants integrate with bone to create a permanent tooth replacement"
                beforeColor={NEUTRAL_TOKENS.champagne}
                afterColor={NEUTRAL_TOKENS.white}
              />
            </div>
            <ThreeDViewerSlot />
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Why guests choose implants</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <article key={benefit.title} className="t-card h-full p-6">
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="mt-3 leading-relaxed t-muted">{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Implant treatment options</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {treatmentOptions.map((option) => (
                <article key={option.name} className="t-card h-full p-6">
                  <h3 className="text-lg font-semibold">{option.name}</h3>
                  <p className="mt-2 leading-relaxed t-muted">{option.description}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed t-muted">
                    {option.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">The implant journey</h2>
            <div className="space-y-6">
              {process.map((step) => (
                <article key={step.phase} className="t-card p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-semibold">{step.phase}</h3>
                    <p className="text-sm uppercase tracking-wider text-[var(--champagne-ink-muted)]">{step.duration}</p>
                  </div>
                  <p className="mt-3 leading-relaxed t-muted">{step.description}</p>
                  <ul className="mt-4 grid gap-2 text-sm leading-relaxed t-muted sm:grid-cols-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex gap-2">
                        <span aria-hidden="true">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div aria-hidden className="fx-waves" />

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Are implants right for you?</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {candidateChecklist.map((item) => (
                <article key={item.title} className="t-card h-full p-6">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-relaxed t-muted">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`t-section rounded-3xl p-8 shadow-sm ${parallax}`} data-depth="cta">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Plan your implant consultation</h2>
            <p className="max-w-3xl leading-relaxed t-muted">
              Meet with our implant dentist to map your smile transformation, review timelines, and design a restoration that
              feels indistinguishable from natural teeth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link className={goldGlow} href="/contact">
                Book a consultation
              </Link>
              <Link className={goldGlow} href="/treatments">
                View all treatments
              </Link>
            </div>
          </div>
        </section>
        </div>
      </ChampagneSectionShell>
    </TreatmentPreviewFrame>
  );
}
