export const dynamic = 'force-static';
export const revalidate = 0;

import '@/styles/preview/champagne-preview.css';
import Link from 'next/link';

import ChampagnePreviewHero from '@/components/preview/ChampagnePreviewHero';
import { KeyList, Section } from '@/components/preview/PreviewBlocks';

const benefits = [
  'Natural feel for confident eating and speaking',
  'Bone preservation maintains facial harmony long term',
  'Longevity with a thoughtful hygiene partnership',
  'Custom ceramics designed to blend seamlessly',
];

const journey = [
  'Consultation & planning — scans, bone mapping, treatment roadmap',
  'Implant placement — gentle precision with comfort-first options',
  'Healing & integration — guided reviews plus home-care coaching',
  'Crown placement — bespoke ceramics refined for bite and brilliance',
];

const candidacy = [
  'Healthy gums and commitment to consistent reviews',
  'Adequate bone density or grafting pathway confirmed',
  'Non-smoker or ready to pause during treatment',
  'Aligned with the hygiene routine that keeps implants luminous',
];

export default function ImplantsPreviewPage() {
  return (
    <div className="cpv-page">
      <ChampagnePreviewHero
        kicker="Treatments preview"
        title="Dental implants in Shoreham-by-Sea"
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
          Experience Manus-balanced dusk lighting while you test copy, schema, and viewer integrations. This hero mirrors the
          Champagne home signature without touching production routes.
        </p>
      </ChampagnePreviewHero>

      <main className="cpv-main" role="main">
        <Section
          title="3D implant visualiser"
          description={<p>Embed your viewer module to preview angulation, placement pathways, and restorative sequencing.</p>}
        >
          <div className="cpv-slot" aria-label="3D implant viewer slot">
            3D VIEWER SLOT (placeholder)
          </div>
        </Section>

        <Section title="Why guests choose implants">
          <KeyList items={benefits} />
        </Section>

        <Section title="The implant journey">
          <KeyList items={journey} />
        </Section>

        <Section title="Ideal implant candidates">
          <KeyList items={candidacy} />
        </Section>

        <Section
          title="Plan your implant consultation"
          description={<p>Use this CTA strip to experiment with booking logic, nurture copy, or CRM tracking.</p>}
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
