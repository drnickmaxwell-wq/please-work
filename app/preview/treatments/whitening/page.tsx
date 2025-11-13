export const dynamic = 'force-static';
export const revalidate = 0;

import '@/styles/champagne/luxe/treatment-preview.css';

import ChampagneTreatmentHeroLuxe from '@/components/luxe/hero/ChampagneTreatmentHeroLuxe';
import LuxeCtaLink from '@/components/luxe/hero/LuxeCtaLink';
import LuxeKeyList from '@/components/luxe/cards/LuxeKeyList';
import LuxeSection from '@/components/luxe/sections/LuxeSection';

export default function WhiteningPreviewPage() {
  return (
    <div className="luxe-preview">
      <ChampagneTreatmentHeroLuxe
        kicker="Treatments preview"
        title="Teeth whitening in Shoreham-by-Sea"
        subtitle="Soft-gold shimmer meets teal luminance for a calm glow-up"
        ctas={[
          { label: 'Reserve a consultation', href: '/contact', variant: 'primary' },
          { label: 'View all treatments', href: '/treatments', variant: 'secondary' },
        ]}
      >
        Luminous, even whitening guided by clinicians trained in Enlighten and boutique protocols—now staged inside a Manus R1 dusk gradient hero with Champagne shimmer layers.
      </ChampagneTreatmentHeroLuxe>

      <main className="luxe-preview__main" role="main">
        <LuxeSection title="Shade preview" description="Embed your shade selector or before/after slider to showcase tonal refinement.">
          <div className="luxe-card-placeholder" aria-label="Shade preview slot">
            SHADE PREVIEW SLOT (placeholder)
          </div>
        </LuxeSection>

        <LuxeSection title="Whitening guests love">
          <LuxeKeyList
            items={[
              'Fully tailored plans following shade mapping and sensitivity checks',
              'Enlighten and boutique systems for comfortable, luminous results',
              'Weekly check-ins keep progress predictable and calm',
              'Remineralising serums protect enamel at every step',
            ]}
          />
        </LuxeSection>

        <LuxeSection title="The whitening journey">
          <LuxeKeyList
            items={[
              'Consultation & mapping — lifestyle insights, gel selection, comfort plan',
              'At-home phase — bespoke trays, luxe gel formulation, weekly reviews',
              'In-clinic glow — precision finishing session with minimal light exposure',
              'Aftercare — tailored maintenance and remineralising treatments',
            ]}
          />
        </LuxeSection>

        <LuxeSection title="Is whitening right for you?">
          <LuxeKeyList
            items={[
              'No active decay or untreated gum concerns',
              'Commitment to consistent tray wear where prescribed',
              'Realistic expectations around natural shade shift',
              'Happy to maintain with gentle whitening pastes post-treatment',
            ]}
          />
        </LuxeSection>

        <LuxeSection title="Plan your whitening consultation" description="Select your preferred schedule and we will orchestrate the experience with our whitening concierge.">
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
