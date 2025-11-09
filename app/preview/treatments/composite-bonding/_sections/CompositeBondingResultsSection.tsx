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
      <div className="grid gap-6 md:grid-cols-3">
        {results.map((item) => (
          <article key={item.title} className="t-card h-full p-6">
            <h3
              className="text-lg font-semibold text-[var(--champagne-ink)]"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              {item.title}
            </h3>
            <p className="mt-3 leading-relaxed text-[var(--champagne-ink-muted)]">{item.description}</p>
          </article>
        ))}
      </div>
    </ChampagneTreatmentSurface>
  );
}
