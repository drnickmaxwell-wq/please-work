import type { Metadata } from 'next';

import '@/styles/preview/champagne-preview.css';

import PreviewHero from '@/components/preview/PreviewHero';
import { Section } from '@/components/preview/PreviewBlocks';
import { previewRobots } from '@/lib/seo/preview/previewRobots';

export const metadata: Metadata = {
  robots: previewRobots,
};

export default function OrthodonticsPreviewPage() {
  return (
    <div className="cpv-page" data-treatment="orthodontics">
      <PreviewHero
        treatment="orthodontics"
        eyebrow="Treatments preview"
        title="Orthodontics preview"
        description="Draft copy for aligner journeys, fixed appliance refinements, and retention planning lives here. Iterate inside the Balanced Dusk hero while production routes stay untouched."
        primaryCta={{ label: 'Reserve orthodontic consult', href: '/contact' }}
        secondaryCta={{ label: 'View Spark preview', href: '/preview/treatments/orthodontics/spark-aligners' }}
      />

      <main className="cpv-main" role="main">
        <Section
          title="Planning notes"
          description={<p>Capture upcoming flows, photography needs, or schema placeholders before launch.</p>}
        >
          <p className="cpv-note">
            Replace this message with your orthodontic modules once narrative, assets, and Champagne polish are final.
          </p>
        </Section>
      </main>
    </div>
  );
}
