import TreatmentConsultationCta from '@/components/preview/cta/TreatmentConsultationCta';
import ChampagneTreatmentSurface from '@/components/preview/theme/ChampagneTreatmentSurface';

export default function CompositeBondingPlanSessionSection(): JSX.Element {
  return (
    <ChampagneTreatmentSurface
      eyebrow="Plan"
      headline="Plan your bonding session"
      description="This CTA cluster showcases how the production page will invite guests to reserve time with our clinicians."
    >
      <div className="flex flex-col gap-4">
        <p className="max-w-2xl text-sm leading-relaxed text-[var(--champagne-ink-muted)]">
          Once the treatments team finalises scripting, this section will connect to booking flows and surface concierge contact details.
        </p>
        <TreatmentConsultationCta />
      </div>
    </ChampagneTreatmentSurface>
  );
}
