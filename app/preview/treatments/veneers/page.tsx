export const dynamic = 'force-static';
export const revalidate = 0;

import '@/styles/preview/champagne-preview.css';

import ChampagnePreviewHero from '@/components/preview/ChampagnePreviewHero';
import { KeyList, Section } from '@/components/preview/PreviewBlocks';

export default function VeneersPreviewPage() {
  return (
    <div className="cpv-page">
      <ChampagnePreviewHero
        kicker="Treatments preview"
        title="Porcelain veneers in Shoreham-by-Sea"
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
        <p>Digital artistry and handcrafted ceramics transform every smile with luminous balance.</p>
      </ChampagnePreviewHero>

      <main className="cpv-main" role="main">
        <Section title="3D veneer visualiser">
          <div className="cpv-card" aria-label="3D viewer slot">
            3D VIEWER SLOT (placeholder)
          </div>
        </Section>

        <Section title="Why guests love veneers">
          <KeyList
            items={[
              'Featherlight porcelain layers that mirror natural enamel',
              'Digital smile design previews ensure shape and proportion feel right',
              'Colour harmonised to neighbouring teeth for luminous balance',
              'Guided aftercare keeps veneers radiant for the long term',
            ]}
          />
        </Section>

        <Section title="The veneer journey">
          <KeyList
            items={[
              'Discovery consultation — share goals, facial analysis, and preview mock-ups',
              'Design refinement — digital planning and wax-ups perfect every contour',
              'Preparation day — minimal enamel shaping with beautifully crafted temporaries',
              'Final placement — bespoke porcelain bonded and polished to a champagne sheen',
            ]}
          />
        </Section>

        <Section title="Are veneers right for you?">
          <KeyList
            items={[
              'Healthy gums and commitment to consistent hygiene visits',
              'Desire to enhance colour, symmetry, or alignment',
              'Ready to follow personalised veneer care guidance',
              'Looking for a confident, camera-ready smile finish',
            ]}
          />
        </Section>

        <Section title="Plan your veneer consultation">
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
