import CompositeBondingFaqList from '@/components/preview/faq/CompositeBondingFaqList';
import ChampagneTreatmentSurface from '@/components/preview/theme/ChampagneTreatmentSurface';

export default function CompositeBondingFaqSection(): JSX.Element {
  return (
    <ChampagneTreatmentSurface
      eyebrow="FAQ"
      headline="Composite bonding questions"
      description="These questions outline the educational flow for the preview environment. Answers will be refined with clinical language during production editing."
    >
      <CompositeBondingFaqList />
    </ChampagneTreatmentSurface>
  );
}
