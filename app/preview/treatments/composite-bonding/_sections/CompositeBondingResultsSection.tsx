import ChampagneTreatmentSurface from '@/components/preview/theme/ChampagneTreatmentSurface';

const results = [
  {
    title: 'Micro-gap refinement',
    description: 'Closing small spacing with layered resin that mirrors neighbouring translucency.',
  },
  {
    title: 'Edge rebalancing',
    description: 'Softening chipped corners and uneven lengths for a balanced smile line.',
  },
  {
    title: 'Lustre revival',
    description: 'Rebuilding gloss with calibrated polishing for a luminous, camera-ready finish.',
  },
];

export default function CompositeBondingResultsSection(): JSX.Element {
  return (
    <ChampagneTreatmentSurface
      eyebrow="Results"
      headline="Signature outcomes"
      description="These result cards preview the storytelling structure for before-and-after highlights. Photography will be swapped in during production."
    >
      <div className="cpv-grid cpv-grid--three">
        {results.map((item) => (
          <article key={item.title} className="cpv-subcard">
            <h3 className="cpv-subcard__title">{item.title}</h3>
            <p className="cpv-subcard__body">{item.description}</p>
          </article>
        ))}
      </div>
    </ChampagneTreatmentSurface>
  );
}
