export const dynamic = 'force-static';
export const revalidate = 0;

import '@/styles/champagne/luxe/treatment-preview.css';

import ChampagneTreatmentHeroLuxe from '@/components/luxe/hero/ChampagneTreatmentHeroLuxe';
import LuxeCtaLink from '@/components/luxe/hero/LuxeCtaLink';
import LuxeKeyList from '@/components/luxe/cards/LuxeKeyList';
import LuxeSection from '@/components/luxe/sections/LuxeSection';

export default function VeneersPreviewPage() {
  return (
    <div className="luxe-preview">
      <ChampagneTreatmentHeroLuxe
        kicker="Treatments preview"
        title="Porcelain veneers in Shoreham-by-Sea"
        subtitle="Manus R1 dusk gradients set the tone for couture smile design"
        ctas={[
          { label: 'Reserve a consultation', href: '/contact', variant: 'primary' },
          { label: 'View all treatments', href: '/treatments', variant: 'secondary' },
        ]}
      >
        Digital artistry and handcrafted ceramics converge with soft Champagne shimmer, giving guests a calm space to imagine their luminous smile.
      </ChampagneTreatmentHeroLuxe>

      <main className="luxe-preview__main" role="main">
        <LuxeSection title="3D veneer visualiser" description="Embed a smile design preview to showcase morphing mock-ups and veneer layering.">
          <div className="luxe-card-placeholder" aria-label="3D veneer viewer slot">
            3D VIEWER SLOT (placeholder)
          </div>
        </LuxeSection>

        <LuxeSection title="Why guests love veneers">
          <LuxeKeyList
            items={[
              'Featherlight porcelain that mirrors natural enamel texture',
              'Digital smile design previews to perfect balance and symmetry',
              'Colour harmonised to neighbouring teeth for a luminous blend',
              'Guided aftercare to keep veneers radiant long term',
            ]}
          />
        </LuxeSection>

        <LuxeSection title="The veneer journey">
          <LuxeKeyList
            items={[
              'Discovery consultation — goals, facial analysis, and preview mock-ups',
              'Design refinement — digital planning and wax-ups finesse every contour',
              'Preparation day — minimal enamel sculpting with couture temporaries',
              'Final placement — bespoke porcelain bonded and polished to a champagne sheen',
            ]}
          />
        </LuxeSection>

        <LuxeSection title="Are veneers right for you?">
          <LuxeKeyList
            items={[
              'Healthy gums and commitment to consistent hygiene visits',
              'Desire to enhance colour, alignment, or proportional balance',
              'Prepared to follow personalised veneer care guidance',
              'Looking for a confident, camera-ready smile finish',
            ]}
          />
        </LuxeSection>

        <LuxeSection title="Plan your veneer consultation" description="We will confirm scheduling, digital scans, and bespoke design preferences with you personally.">
          <div className="luxe-cta-row">
            <LuxeCtaLink href="/contact" variant="primary">
              Book a consultation
            </LuxeCtaLink>
            <LuxeCtaLink href="/treatments" variant="secondary">
              View all treatments
            </LuxeCtaLink>
          </div>
        </LuxeSection>
      </main>
    </div>
  );
}
