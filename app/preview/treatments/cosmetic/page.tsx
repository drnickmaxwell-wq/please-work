import '@/styles/preview/champagne-preview.css';

import ChampagnePreviewHero from '@/components/preview/ChampagnePreviewHero';
import { Section } from '@/components/preview/PreviewBlocks';

export default function CosmeticPreviewPage() {
  return (
    <div className="cpv-page">
      <ChampagnePreviewHero kicker="Treatments preview" title="Cosmetic dentistry preview">
        <p>
          Scaffold copy, photography, and schema ideas for the cosmetic launch inside the Champagne Balanced Dusk hero. Production routes remain untouched while you iterate.
        </p>
      </ChampagnePreviewHero>

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
