export const dynamic = 'force-static';
export const revalidate = 0;

import '@/styles/champagne/luxe/treatment-preview.css';

import ChampagneTreatmentHeroLuxe from '@/components/luxe/hero/ChampagneTreatmentHeroLuxe';
import LuxeCtaLink from '@/components/luxe/hero/LuxeCtaLink';
import LuxeKeyList from '@/components/luxe/cards/LuxeKeyList';
import LuxeSection from '@/components/luxe/sections/LuxeSection';
import ThreeDViewerSlot from '@/components/preview/treatments/ThreeDViewerSlot';

const highlightItems = [
  'Feather-light trays that hug every curve for barely-there comfort',
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
    <div className="luxe-preview">
      <ChampagneTreatmentHeroLuxe
        kicker="Treatments preview"
        title="Spark Aligners in Shoreham-by-Sea"
        subtitle="Dusk-to-teal gradients introduce the Spark journey with Champagne shimmer"
        ctas={[
          { label: 'Reserve Spark consult', href: '/contact', variant: 'primary' },
          { label: 'Explore orthodontic previews', href: '/preview/treatments/orthodontics', variant: 'secondary' },
        ]}
      >
        Preview the digital-first Spark Aligner experience with Manus-inspired layering—ideal for testing motion, copy, and schema updates before touching production.
      </ChampagneTreatmentHeroLuxe>

      <main className="luxe-preview__main" role="main">
        <LuxeSection title="Interactive aligner preview" description="Embed your WebGL or Three.js viewer inside this luxe glass card.">
          <ThreeDViewerSlot />
          <p className="luxe-section-note">
            Swap this placeholder slot for your aligner model or animation to demonstrate Spark precision.
          </p>
        </LuxeSection>

        <LuxeSection title="Why guests choose Spark Aligners">
          <LuxeKeyList items={highlightItems} />
        </LuxeSection>

        <LuxeSection title="The Spark journey">
          <LuxeKeyList items={journeySteps} />
        </LuxeSection>

        <LuxeSection title="Ideal Spark candidates">
          <LuxeKeyList items={candidacyPoints} />
        </LuxeSection>

        <LuxeSection title="Plan your Spark Aligner consultation" description="Use this CTA zone to test messaging, scheduling flows, and conversion copy before launch.">
          <div className="luxe-cta-row">
            <LuxeCtaLink href="/contact" variant="primary">
              Reserve Spark consult
            </LuxeCtaLink>
            <LuxeCtaLink href="/preview/treatments/orthodontics" variant="secondary">
              Explore orthodontic previews
            </LuxeCtaLink>
          </div>
        </LuxeSection>
      </main>
    </div>
  );
}
