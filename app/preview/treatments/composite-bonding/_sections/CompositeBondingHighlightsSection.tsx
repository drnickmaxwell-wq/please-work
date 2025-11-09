import ChampagneTreatmentSurface from '@/components/preview/theme/ChampagneTreatmentSurface';

const highlights = [
  {
    title: 'Feather-light sculpting',
    description: 'Layered refinements preserve enamel while closing micro-gaps for balanced symmetry.',
  },
  {
    title: 'Studio finish',
    description: 'Each smile is photographed under calibrated lighting to perfect gloss and shade.',
  },
  {
    title: 'Same-day reveal',
    description: 'Guests leave with a camera-ready glow after a calm single appointment.',
  },
];

export default function CompositeBondingHighlightsSection(): JSX.Element {
  return (
    <ChampagneTreatmentSurface
      eyebrow="Highlights"
      headline="Why guests choose bonding"
      description="These highlight cards act as placeholders for key differentiators that will be copy-edited during production."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
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
