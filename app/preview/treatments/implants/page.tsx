export const dynamic = 'force-static';
export const revalidate = 0;

import '@/styles/preview/champagne-preview.css';

import ChampagnePreviewHero from '@/components/preview/ChampagnePreviewHero';
import { KeyList, Section } from '@/components/preview/PreviewBlocks';

export default function ImplantsPreviewPage() {
  return (
    <div className="cpv-page">
      <ChampagnePreviewHero
        kicker="Treatments preview"
        title="Dental implants in Shoreham-by-Sea"
        ctas={
          <div className="cpv-cta-row">
            <a className="cpv-btn cpv-btn-solid" href="/contact">
              Reserve a consultation
            </a>
            <a className="cpv-btn cpv-btn-outline" href="/treatments">
              View all treatments
            </a>
          </div>
        }
      >
        <p>Advanced planning keeps every stage precise and calm.</p>
      </ChampagnePreviewHero>

      <main className="cpv-main" role="main">
        <Section title="3D implant visualiser">
          <div className="cpv-card" aria-label="3D viewer slot">
            3D VIEWER SLOT (placeholder)
          </div>
        </Section>

        <Section title="Why guests choose implants">
          <KeyList
            items={[
              'Natural feel for eating and speaking with confidence',
              'Bone preservation helps maintain facial structure',
              'Long-lasting with excellent care',
              'Custom-crafted aesthetics to match neighbouring teeth',
            ]}
          />
        </Section>

        <Section title="The implant journey">
          <KeyList
            items={[
              'Consultation & planning — scans, bone density evaluation, treatment review',
              'Implant placement — gentle, precise techniques with local anaesthetic/sedation',
              'Healing & integration — scheduled reviews and hygiene support',
              'Crown placement — custom ceramic crown and bite refinement',
            ]}
          />
        </Section>

        <Section title="Are implants right for you?">
          <KeyList
            items={[
              'Adequate bone density or grafting pathway',
              'Healthy gums and overall health',
              'Non-smoker or committed to quitting',
              'Commitment to good oral hygiene',
            ]}
          />
        </Section>

        <Section title="Plan your implant consultation">
          <div className="cpv-cta-row">
            <a className="cpv-btn cpv-btn-solid" href="/contact">
              Book a consultation
            </a>
            <a className="cpv-btn cpv-btn-outline" href="/treatments">
              View all treatments
            </a>
          </div>
        </Section>
      </main>
    </div>
  );
}
