import Link from 'next/link';

import '@/styles/preview/champagne-preview.css';

import ChampagnePreviewHero from '@/components/preview/ChampagnePreviewHero';
import { Section } from '@/components/preview/PreviewBlocks';

export default function OrthodonticsPreviewPage() {
  return (
    <div className="cpv-page">
      <ChampagnePreviewHero
        kicker="Treatments preview"
        title="Orthodontics preview"
        ctas={
          <div className="cpv-cta-row">
            <Link className="cpv-btn cpv-btn-solid" href="/contact">
              Reserve orthodontic consult
            </Link>
            <Link className="cpv-btn cpv-btn-outline" href="/preview/treatments/orthodontics/spark-aligners">
              View Spark preview
            </Link>
          </div>
        }
      >
        <p>
          Draft copy for aligner journeys, fixed appliance refinements, and retention planning lives here. Iterate inside the Balanced Dusk hero while production routes stay untouched.
        </p>
      </ChampagnePreviewHero>

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
