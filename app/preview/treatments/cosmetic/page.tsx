import type { Metadata } from 'next';

import '@/styles/preview/champagne-preview.css';

import LuxeTreatmentHero from '@/components/treatments/LuxeTreatmentHero';
import { Section } from '@/components/preview/PreviewBlocks';
import { previewRobots } from '@/lib/seo/preview/previewRobots';

export const metadata: Metadata = {
  robots: previewRobots,
};

export default function CosmeticPreviewPage() {
  return (
    <div className="cpv-page" data-treatment="cosmetic">
      <LuxeTreatmentHero
        variant="general"
        eyebrow="Treatments preview"
        title="Cosmetic dentistry preview"
        description="Scaffold copy, photography, and schema ideas for the cosmetic launch inside the Champagne Balanced Dusk hero. Production routes remain untouched while you iterate."
      />

      <main className="cpv-main" role="main">
        <Section
          title="Working canvas"
          description={<p>Swap this placeholder for your cosmetic dentistry modules once approvals land.</p>}
        >
          <p className="cpv-note">
            Use this space for moodboarding layouts, tone explorations, and CTA strategies before moving anything into the live site.
          </p>
        </Section>
      </main>
    </div>
  );
}
