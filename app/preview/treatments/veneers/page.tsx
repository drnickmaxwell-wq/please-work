export const dynamic = 'force-static';
export const revalidate = 0;

import '@/styles/preview/champagne-preview.css';

import ChampagnePreviewHero from '@/components/preview/ChampagnePreviewHero';
import { ChampagneSection } from '@/components/preview/ChampagneSection';

const veneerHighlights = [
  {
    title: 'Featherlight ceramics',
    body: 'Ultra-thin porcelain layers mimic natural enamel for a luminous finish.',
  },
  {
    title: 'Bespoke smile design',
    body: 'Digital smile previews and handcrafted artistry align to your features.',
  },
  {
    title: 'Long-lasting radiance',
    body: 'Durable materials and mindful aftercare keep veneers brilliant for years.',
  },
];

const veneerJourney = [
  {
    title: '1. Discovery session',
    description: 'Share your vision, explore shape libraries, and co-design your new smile.',
  },
  {
    title: '2. Digital planning',
    description: 'High-resolution scans and mock-ups refine every detail before treatment begins.',
  },
  {
    title: '3. Preparation day',
    description: 'Conservative enamel refinement and temporaries deliver comfort at every stage.',
  },
  {
    title: '4. Reveal & refine',
    description: 'Custom porcelain is bonded with care, then polished to a soft champagne sheen.',
  },
];

const veneerSuitability = [
  'You want to refine tooth colour, proportion, or symmetry',
  'You maintain consistent hygiene visits and home care',
  'You are ready for a bespoke smile design consultation',
  'You understand veneer upkeep and long-term care',
];

export default function VeneersPreviewPage() {
  return (
    <>
      <ChampagnePreviewHero
        kicker="Treatments Preview"
        title="Porcelain veneers in Shoreham-by-Sea"
        ctas={
          <div className="flex gap-2">
            <a className="btn btn-solid" href="/contact">
              Reserve a consultation
            </a>
            <a className="btn btn-outline" href="/treatments">
              View all treatments
            </a>
          </div>
        }
      >
        <p className="opacity-80">
          Digital artistry and handcrafted ceramics transform every smile with luminous balance.
        </p>
      </ChampagnePreviewHero>

      <main className="container space-y-16 py-12">
        <ChampagneSection title="3D veneer visualiser">
          <div className="cpv-glass p-6 text-base leading-relaxed">
            3D VIEWER SLOT (placeholder)
          </div>
        </ChampagneSection>

        <ChampagneSection title="Why guests love veneers">
          <div className="grid gap-6 md:grid-cols-3">
            {veneerHighlights.map((highlight) => (
              <article key={highlight.title} className="cpv-card h-full space-y-3">
                <h3 className="text-xl font-semibold text-[var(--smh-ink)]">{highlight.title}</h3>
                <p>{highlight.body}</p>
              </article>
            ))}
          </div>
        </ChampagneSection>

        <ChampagneSection title="The veneer journey">
          <ol className="grid gap-4">
            {veneerJourney.map((step) => (
              <li key={step.title} className="cpv-card space-y-2">
                <h3 className="text-lg font-semibold text-[var(--smh-ink)]">{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </ChampagneSection>

        <ChampagneSection title="Are veneers right for you?">
          <div className="cpv-card">
            <ul className="list-disc space-y-2 pl-5">
              {veneerSuitability.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </ChampagneSection>
      </main>
    </>
  );
}
