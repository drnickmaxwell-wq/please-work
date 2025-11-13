export const dynamic = 'force-static';
export const revalidate = 0;

import '@/styles/champagne/luxe/treatment-preview.css';

import ChampagneTreatmentHeroLuxe from '@/components/luxe/hero/ChampagneTreatmentHeroLuxe';
import LuxeCtaLink from '@/components/luxe/hero/LuxeCtaLink';
import LuxeKeyList from '@/components/luxe/cards/LuxeKeyList';
import LuxeSection from '@/components/luxe/sections/LuxeSection';

export default function GeneralDentistryPreviewPage() {
  return (
    <div className="luxe-preview">
      <ChampagneTreatmentHeroLuxe
        kicker="Treatments preview"
        title="General dentistry in Shoreham-by-Sea"
        subtitle="A calm Manus dusk gradient for everyday care pathways"
        ctas={[
          { label: 'Reserve a consultation', href: '/contact', variant: 'primary' },
          { label: 'View all treatments', href: '/treatments', variant: 'secondary' },
        ]}
      >
        Preventive, restorative, and cosmetic maintenance delivered within a Champagne luxe preview—perfect for refining copy, schema, and UI before launching to production.
      </ChampagneTreatmentHeroLuxe>

      <main className="luxe-preview__main" role="main">
        <LuxeSection title="Everyday comfort, elevated" description="Swap in your production narratives once finalised—this layout ensures a consistent Manus-inspired rhythm.">
          <LuxeKeyList
            items={[
              'Gentle hygiene programmes with digital charting',
              'Comprehensive examinations and personalised treatment plans',
              'Restorative excellence from fillings to crowns',
              'Preventive care that protects smiles between visits',
            ]}
          />
        </LuxeSection>

        <LuxeSection title="Preview your service mix">
          <LuxeKeyList
            items={[
              'Routine check-ups and hygiene therapy',
              'Periodontal maintenance and guided home care',
              'Minimally invasive restorations',
              'Smile enhancements and whitening pathways',
            ]}
          />
        </LuxeSection>

        <LuxeSection title="Guest experience touchpoints">
          <LuxeKeyList
            items={[
              'Warm welcome lounge with digital check-in',
              'Comfort menu, blankets, and noise-cancelling headphones',
              'Sedation options for anxious guests',
              'After-visit follow-up and personalised care notes',
            ]}
          />
        </LuxeSection>

        <LuxeSection title="Plan your general dentistry consultation" description="Use this section for CTA experiments, conversion copy, and data capture tests without touching the live site.">
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
