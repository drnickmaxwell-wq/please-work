export const dynamic = 'force-static';
export const revalidate = 0;

import '@/styles/preview/champagne-preview.css';
import Link from 'next/link';

import LuxeTreatmentHero from '@/components/treatments/LuxeTreatmentHero';
import { KeyList, Section } from '@/components/preview/PreviewBlocks';

const highlights = [
  'Featherlight porcelain mirroring natural enamel texture',
  'Digital smile design previews to perfect harmony',
  'Hue-matched ceramics for a seamless Champagne finish',
  'Aftercare rituals that keep veneers radiant for years',
];

const journey = [
  'Discovery consultation — lifestyle, goals, and luminosity mapping',
  'Design refinement — digital planning and wax-up artistry',
  'Preparation day — minimal enamel sculpting with couture temporaries',
  'Final placement — bespoke porcelain bonded and polished to a soft-gold sheen',
];

const candidacy = [
  'Healthy gums with commitment to routine reviews',
  'Desire to refine proportion, shade, or alignment',
  'Prepared to follow personalised veneer care guidance',
  'Seeking a confident, camera-ready smile finish',
];

export default function VeneersPreviewPage() {
  return (
    <div className="cpv-page">
      <LuxeTreatmentHero
        variant="veneers"
        eyebrow="Treatments preview"
        title="Porcelain veneers in Shoreham-by-Sea"
        description="Soft dusk gradients, Champagne shimmer, and balanced glass cards give you a safe playground to refine veneer copy, schema, and interactive elements before production."
        primaryCta={{ label: 'Reserve a consultation', href: '/contact' }}
        secondaryCta={{ label: 'View all treatments', href: '/treatments' }}
      />

      <main className="cpv-main" role="main">
        <Section
          title="3D veneer visualiser"
          description={<p>Drop in your smile design mock-up or before/after slider to preview veneer transformations.</p>}
        >
          <div className="cpv-slot" aria-label="3D veneer viewer slot">
            3D VIEWER SLOT (placeholder)
          </div>
        </Section>

        <Section title="Why guests love veneers">
          <KeyList items={highlights} />
        </Section>

        <Section title="The veneer journey">
          <KeyList items={journey} />
        </Section>

        <Section title="Are veneers right for you?">
          <KeyList items={candidacy} />
        </Section>

        <Section
          title="Plan your veneer consultation"
          description={<p>Experiment with CTA language, waitlist logic, or concierge flows here.</p>}
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
