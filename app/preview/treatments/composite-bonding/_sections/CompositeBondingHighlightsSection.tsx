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
      description="These highlight cards act as placeholders for key differentiators that will be refined during production."
    >
      <div className="cpv-grid cpv-grid--three">
        {highlights.map((item) => (
          <article key={item.title} className="cpv-subcard">
            <h3 className="cpv-subcard__title">{item.title}</h3>
            <p className="cpv-subcard__body">{item.description}</p>
          </article>
        ))}
      </div>
    </ChampagneTreatmentSurface>
  );
}
