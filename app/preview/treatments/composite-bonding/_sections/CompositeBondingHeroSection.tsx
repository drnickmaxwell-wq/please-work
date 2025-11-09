import ChampagneTreatmentSurface from '@/components/preview/theme/ChampagneTreatmentSurface';
import TreatmentBreadcrumb from '@/components/preview/nav/TreatmentBreadcrumb';
import TreatmentConsultationCta from '@/components/preview/cta/TreatmentConsultationCta';

export default function CompositeBondingHeroSection(): JSX.Element {
  return (
    <ChampagneTreatmentSurface
      eyebrow="Composite bonding"
      headline="Hand-sculpted brilliance in a single visit"
      description="This hero layout previews the storytelling frame for the composite bonding launch. Final imagery and video layers will be added once approved."
    >
      <div className="flex flex-col gap-6">
        <TreatmentBreadcrumb current="Composite bonding" />
        <p className="max-w-2xl text-sm leading-relaxed text-[var(--champagne-ink-muted)]">
          The production hero will introduce the artistry, showcase surface geometry, and invite guests to plan their visit with confidence.
        </p>
        <TreatmentConsultationCta />
      </div>
    </ChampagneTreatmentSurface>
  );
}
