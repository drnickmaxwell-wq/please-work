export const dynamic = 'force-static';
export const revalidate = 0;

import '@/styles/champagne/luxe/treatment-preview.css';

import ChampagneTreatmentHeroLuxe from '@/components/luxe/hero/ChampagneTreatmentHeroLuxe';
import LuxeCtaLink from '@/components/luxe/hero/LuxeCtaLink';
import LuxeKeyList from '@/components/luxe/cards/LuxeKeyList';
import LuxeSection from '@/components/luxe/sections/LuxeSection';

export default function ImplantsPreviewPage() {
  return (
    <div className="luxe-preview">
      <ChampagneTreatmentHeroLuxe
        kicker="Treatments preview"
        title="Dental implants in Shoreham-by-Sea"
        subtitle="Precision-guided placement with a calming dusk-to-dawn aura"
        ctas={[
          { label: 'Reserve a consultation', href: '/contact', variant: 'primary' },
          { label: 'View all treatments', href: '/treatments', variant: 'secondary' },
        ]}
      >
        Experience Manus-inspired planning layers that keep every stage smooth, from diagnostics to final crown delivery.
      </ChampagneTreatmentHeroLuxe>

      <main className="luxe-preview__main" role="main">
        <LuxeSection title="3D implant visualiser" description="Drop in your interactive module to showcase implant positioning and bone mapping.">
          <div className="luxe-card-placeholder" aria-label="3D implant viewer slot">
            3D VIEWER SLOT (placeholder)
          </div>
        </LuxeSection>

        <LuxeSection title="Why guests choose implants">
          <LuxeKeyList
            items={[
              'Natural feel for confident eating and speaking',
              'Bone preservation helps maintain facial harmony',
              'Long-lasting with thoughtful maintenance',
              'Custom-crafted ceramics that blend with neighbouring teeth',
            ]}
          />
        </LuxeSection>

        <LuxeSection title="The implant journey">
          <LuxeKeyList
            items={[
              'Consultation & planning — scans, bone analysis, and treatment pathways',
              'Implant placement — gentle, precise techniques with comfort options',
              'Healing & integration — scheduled reviews plus hygiene guidance',
              'Crown placement — bespoke ceramics refined for bite and brilliance',
            ]}
          />
        </LuxeSection>

        <LuxeSection title="Is the implant pathway right for you?">
          <LuxeKeyList
            items={[
              'Adequate bone density or a grafting roadmap',
              'Healthy gums and strong overall wellbeing',
              'Non-smoker or committed to quitting through treatment',
              'Ready to partner with our hygiene and review schedule',
            ]}
          />
        </LuxeSection>

        <LuxeSection title="Plan your implant consultation" description="Choose the pathway that fits you best—our guest experience team will confirm every detail.">
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
