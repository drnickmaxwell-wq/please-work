export const dynamic = 'force-static';
export const revalidate = 0;

import type { Metadata } from 'next';
import '@/styles/preview/champagne-preview.css';
import Link from 'next/link';

import LuxeTreatmentHero from '@/components/treatments/LuxeTreatmentHero';
import { KeyList, Section } from '@/components/preview/PreviewBlocks';
import ThreeDViewerSlot from '@/components/preview/treatments/ThreeDViewerSlot';
import { previewRobots } from '@/lib/seo/preview/previewRobots';

export const metadata: Metadata = {
  robots: previewRobots,
};

const highlightItems = [
  'Feather-light trays that hug every curve for nearly invisible comfort',
  'Crystal clarity that resists staining for discreet treatment',
  'Responsive digital tracking keeps each stage perfectly on schedule',
  'Gentle force mapping delivers predictable alignment with ease',
];

const journeySteps = [
  'Digital smile design — scan, simulate, and preview Spark movements',
  'Tray crafting — ultra-clear aligners thermoformed for each micro-stage',
  'Weekly progressions — fresh trays every 7–10 days plus virtual check-ins',
  'Finishing & retention — contour, polish, and transition to custom retainers',
];

const candidacyPoints = [
  'Mild to moderate crowding or spacing',
  'Relapse refinement after previous orthodontics',
  'Guests seeking minimal chair time with gentle forces',
  'Commitment to 20–22 hours of daily wear',
  'Desire for nearly invisible orthodontics',
  'Strong home care and routine hygiene visits',
];

export default function SparkAlignersPreviewPage() {
  return (
    <div className="cpv-page">
      <LuxeTreatmentHero
        variant="technology"
        eyebrow="Treatments preview"
        title="Spark Aligners in Shoreham-by-Sea"
        description="Preview the digital-first Spark experience inside a Manus-balanced dusk hero. Swap in live copy, metrics, and viewer integrations without disturbing the production route."
        primaryCta={{ label: 'Reserve Spark consult', href: '/contact' }}
        secondaryCta={{ label: 'Explore orthodontic previews', href: '/preview/treatments/orthodontics' }}
      />

      <main className="cpv-main" role="main">
        <Section
          title="Interactive aligner preview"
          description={<p>Embed WebGL or Three.js viewers to demonstrate Spark precision within this glass card.</p>}
        >
          <ThreeDViewerSlot />
          <p className="cpv-note">Swap this placeholder once your aligner model or animation is wired.</p>
        </Section>

        <Section title="Why guests choose Spark Aligners">
          <KeyList items={highlightItems} />
        </Section>

        <Section title="The Spark journey">
          <KeyList items={journeySteps} />
        </Section>

        <Section title="Ideal Spark candidates">
          <KeyList items={candidacyPoints} />
        </Section>

        <Section
          title="Plan your Spark Aligner consultation"
          description={<p>Use this CTA row for experimentation with booking flows, nurture copy, or analytics tags.</p>}
        >
          <div className="cpv-cta-row">
            <Link className="cpv-btn cpv-btn-solid" href="/contact">
              Reserve Spark consult
            </Link>
            <Link className="cpv-btn cpv-btn-outline" href="/preview/treatments/orthodontics">
              Explore orthodontic previews
            </Link>
          </div>
        </Section>
      </main>
    </div>
  );
}
