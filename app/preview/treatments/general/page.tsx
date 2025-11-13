export const dynamic = 'force-static';
export const revalidate = 0;

import '@/styles/preview/champagne-preview.css';
import Link from 'next/link';

import ChampagnePreviewHero from '@/components/preview/ChampagnePreviewHero';
import { KeyList, Section } from '@/components/preview/PreviewBlocks';

const everyday = [
  'Gentle hygiene programmes with digital charting',
  'Comprehensive examinations and preventive coaching',
  'Restorative artistry from fillings to crowns',
  'Smile enhancements that keep everyday care elevated',
];

const serviceMix = [
  'Routine check-ups and tailored hygiene therapy',
  'Periodontal maintenance and guided home routines',
  'Minimally invasive restorations with digital design',
  'Whitening and cosmetic refinements for finishing touches',
];

const guestExperience = [
  'Warm welcome lounge with digital check-in',
  'Comfort menu, blankets, and noise-cancelling headphones',
  'Sedation options for anxious guests',
  'After-visit follow-ups with personalised care notes',
];

export default function GeneralDentistryPreviewPage() {
  return (
    <div className="cpv-page">
      <ChampagnePreviewHero
        kicker="Treatments preview"
        title="General dentistry in Shoreham-by-Sea"
        ctas={
          <div className="cpv-cta-row">
            <Link className="cpv-btn cpv-btn-solid" href="/contact">
              Reserve a consultation
            </Link>
            <Link className="cpv-btn cpv-btn-outline" href="/treatments">
              View all treatments
            </Link>
          </div>
        }
      >
        <p>
          A calm Manus dusk gradient gives you space to finesse general dentistry copy, sequencing, and schema while maintaining Champagne hero continuity.
        </p>
      </ChampagnePreviewHero>

      <main className="cpv-main" role="main">
        <Section
          title="Everyday comfort, elevated"
          description={<p>Replace this placeholder once your narratives and block components are finalised.</p>}
        >
          <KeyList items={everyday} />
        </Section>

        <Section title="Preview your service mix">
          <KeyList items={serviceMix} />
        </Section>

        <Section title="Guest experience touchpoints">
          <KeyList items={guestExperience} />
        </Section>

        <Section
          title="Plan your general dentistry consultation"
          description={<p>Test CTA copy, scheduling logic, and nurture workflows without touching the live site.</p>}
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
