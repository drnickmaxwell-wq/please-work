import TreatmentConsultationCta from '@/components/preview/cta/TreatmentConsultationCta';
import ChampagneTreatmentSurface from '@/components/preview/theme/ChampagneTreatmentSurface';

export default function CompositeBondingPlanSessionSection(): JSX.Element {
  return (
    <ChampagneTreatmentSurface
      eyebrow="Plan"
      headline="Plan your bonding session"
      description="This CTA cluster showcases how the production page will invite guests to reserve time with our clinicians."
    >
      <p className="cpv-card__lead">
        Once scripting is finalised, connect this block to booking flows and concierge contact details without disturbing the
        live experience.
      </p>
      <TreatmentConsultationCta />
    </ChampagneTreatmentSurface>
  );
}
