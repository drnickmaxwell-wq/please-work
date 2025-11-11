// Preview-only clone. No hard hexes. Do not edit production pages.
import Link from 'next/link';

import InteractiveToothModel from '@/components/3d/interactive-tooth-model';
import TreatmentBanner from '@/components/preview/TreatmentBanner';
import ChampagneFX from '@/components/preview/fx/ChampagneFX';
import ThreeDViewerSlot from '@/components/preview/treatments/ThreeDViewerSlot';
import ChampagneSectionShell, { champagneShellClasses } from '@/components/sections/ChampagneSectionShell';
import { TOKENS as NEUTRAL_TOKENS } from '@/styles/tokens/neutrals';

import '@/styles/treatments/preview-light.css';
import '@/styles/champagne/preview-fx.css';

const benefits = [
  {
    title: 'Natural beauty',
    description: 'Ultra-thin porcelain mimics real enamel for luminous, lifelike results.',
  },
  {
    title: 'Stain resistant',
    description: 'Premium ceramics maintain brightness and resist everyday stains.',
  },
  {
    title: 'Long lasting',
    description: 'Meticulous bonding and care keep veneers radiant for 10-15 years or more.',
  },
  {
    title: 'Minimal prep',
    description: 'Conservative preparation protects your natural tooth structure.',
  },
];

const transformations = [
  { issue: 'Discolored teeth', solution: 'Bright, white smile that resists future staining' },
  { issue: 'Chipped or worn teeth', solution: 'Smooth, perfectly shaped teeth with natural contours' },
  { issue: 'Gaps between teeth', solution: 'Seamless smile with properly spaced, uniform teeth' },
  { issue: 'Misshapen teeth', solution: 'Beautifully proportioned teeth that complement your face' },
  { issue: 'Minor misalignment', solution: 'Straight-appearing smile without orthodontic treatment' },
  { issue: 'Uneven tooth length', solution: 'Balanced smile line with harmonious proportions' },
];

const process = [
  {
    title: 'Consultation & design',
    summary: 'Define your goals and preview your new smile with digital mock-ups.',
    details: ['High-resolution photography', '3D smile simulation', 'Shade and texture mapping', 'Treatment timeline overview'],
  },
  {
    title: 'Preparation',
    summary: 'Refine enamel delicately and capture precise digital impressions.',
    details: ['0.5mm conservative prep', 'Comfort-first local anaesthetic', 'In-house digital scanning', 'Temporary veneers if needed'],
  },
  {
    title: 'Fabrication',
    summary: 'Master ceramists craft bespoke porcelain to match translucency and tone.',
    details: ['Layered porcelain artistry', 'Hand finished edges', 'Exacting shade matching', 'Studio photography for review'],
  },
  {
    title: 'Placement',
    summary: 'Careful bonding and finishing deliver a flawless, natural-looking smile.',
    details: ['Try-in adjustments', 'Precision bonding protocol', 'High-gloss polishing', 'Final reveal and aftercare guidance'],
  },
];

const candidateChecklist = [
  'Healthy teeth and gums',
  'Sufficient enamel for bonding',
  'Realistic expectations',
  'Good oral hygiene habits',
  'No severe teeth grinding',
  'Commitment to maintenance visits',
];

export default function VeneersPreviewPage() {
  const { goldGlow, parallax } = champagneShellClasses;
  const heroId = 'champagne-preview-hero-veneers';

  return (
    <ChampagneSectionShell>
      <main className="mx-auto flex max-w-5xl flex-col gap-12 px-6">
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
              Porcelain veneers
            </li>
          </ol>
        </nav>

        <section className="champagne-hero-shell" id={heroId}>
          <ChampagneFX targetId={heroId} dust="low" parallax />
          <div className={`${parallax} champagne-hero-shell__inner`} data-direction="reverse" data-parallax-depth="1">
            <TreatmentBanner
              label="Treatments"
              subtitle="Redesign your smile with feather-light porcelain crafted for your features. We blend digital design with artisanal finishing so every veneer feels luminous, balanced, and entirely yours."
              title="Porcelain veneers in Shoreham-by-Sea"
            />
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Interactive veneer preview</h2>
            <p className="max-w-3xl leading-relaxed t-muted">
              Rotate the 3D model to see how ultra-thin shells layer over enamel for a seamless transformation from every angle.
            </p>
            <div className="t-card p-6">
              <InteractiveToothModel
                treatmentType="veneer"
                title="Porcelain Veneer Transformation"
                description="See how ultra-thin porcelain shells create a perfect, natural-looking smile"
                beforeColor={NEUTRAL_TOKENS.champagne}
                afterColor={NEUTRAL_TOKENS.white}
              />
            </div>
            <ThreeDViewerSlot />
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Why guests love veneers</h2>
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
            <h2 className="text-2xl font-semibold">Common transformations</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {transformations.map((item) => (
                <article key={item.issue} className="t-card h-full p-6">
                  <h3 className="text-lg font-semibold">{item.issue}</h3>
                  <p className="mt-3 leading-relaxed t-muted">{item.solution}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Four-step veneer journey</h2>
            <div className="space-y-6">
              {process.map((step) => (
                <article key={step.title} className="t-card p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                  </div>
                  <p className="mt-3 leading-relaxed t-muted">{step.summary}</p>
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

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Ideal veneer candidates</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {candidateChecklist.map((item) => (
                <article key={item} className="t-card h-full p-6">
                  <p className="font-medium">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`t-section rounded-3xl p-8 shadow-sm ${parallax}`} data-depth="cta">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Begin your veneer consultation</h2>
            <p className="max-w-3xl leading-relaxed t-muted">
              Discuss goals, preview your digital smile design, and schedule a single calm visit where veneers are bonded and
              polished to perfection.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link className={goldGlow} href="/contact">
                Reserve a consultation
              </Link>
              <Link className={goldGlow} href="/treatments">
                View all treatments
              </Link>
            </div>
          </div>
        </section>
      </main>
    </ChampagneSectionShell>
  );
}
