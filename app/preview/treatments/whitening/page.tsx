export const dynamic = 'force-static';
export const revalidate = 0;

import '@/styles/preview/champagne-preview.css';
import Link from 'next/link';

import LuxeTreatmentHero from '@/components/treatments/LuxeTreatmentHero';
import { KeyList, Section } from '@/components/preview/PreviewBlocks';

const highlights = [
  'Shade mapping and sensitivity checks for calm, predictable results',
  'Enlighten and boutique systems with luxe gel formulations',
  'Weekly touchpoints to keep each stage comfortable',
  'Remineralising serums and aftercare rituals that protect enamel',
];

const journey = [
  'Consultation & mapping — lifestyle insights, shade goals, gel selection',
  'At-home phase — bespoke trays with guided weekly reviews',
  'In-clinic glow — precision finishing session with gentle light activation',
  'Aftercare — remineralising treatments and long-term whitening plans',
];

const candidacy = [
  'No active decay or untreated gum concerns',
  'Happy to follow the prescribed tray routine',
  'Understands natural shade shifts for realistic outcomes',
  'Ready to maintain with gentle whitening pastes post-treatment',
];

export default function WhiteningPreviewPage() {
  return (
    <div className="cpv-page">
      <LuxeTreatmentHero
        variant="whitening"
        eyebrow="Treatments preview"
        title="Teeth whitening in Shoreham-by-Sea"
        description="Luminous dusk-to-teal gradients echo the Champagne home hero so you can stress-test copy, component swaps, and tracking without touching production."
        primaryCta={{ label: 'Reserve a consultation', href: '/contact' }}
        secondaryCta={{ label: 'View all treatments', href: '/treatments' }}
      />

      <main className="cpv-main" role="main">
        <Section
          title="Shade preview"
          description={<p>Embed your shade selector or before/after slider to illustrate tonal refinement.</p>}
        >
          <div className="cpv-slot" aria-label="Shade preview slot">
            SHADE PREVIEW SLOT (placeholder)
          </div>
        </Section>

        <Section title="Whitening guests love">
          <KeyList items={highlights} />
        </Section>

        <Section title="The whitening journey">
          <KeyList items={journey} />
        </Section>

        <Section title="Is whitening right for you?">
          <KeyList items={candidacy} />
        </Section>

        <Section
          title="Plan your whitening consultation"
          description={<p>Swap this CTA block for scheduling experiments, nurture automations, or concierge details.</p>}
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
