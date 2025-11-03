// Preview-only clone. No hard hexes. Do not edit production pages.
import Link from 'next/link';

import '@/styles/treatments/preview-light.css';

const benefits = [
  {
    title: 'Immediate results',
    description: 'See dramatic whitening results in a single professional treatment session.',
  },
  {
    title: 'Safe & effective',
    description: 'Professional-grade whitening that protects enamel while removing stains.',
  },
  {
    title: 'Long lasting',
    description: 'Results can last 12-18 months with thoughtful at-home care and touch-ups.',
  },
  {
    title: 'Confidence boost',
    description: 'A brighter smile enhances appearance, photographs, and day-to-day confidence.',
  },
];

const options = [
  {
    name: 'In-practice whitening',
    summary: 'The fastest and most effective way to brighten your smile.',
    duration: '60-90 minutes',
    results: 'Up to 8 shades lighter',
    highlights: [
      'Dentist-applied whitening gel',
      'LED activation for enhanced lift',
      'Immediate transformation before you leave',
      'Gum protection for comfort',
    ],
  },
  {
    name: 'Take-home whitening trays',
    summary: 'Custom-fitted aligners let you whiten gradually at home.',
    duration: '1-2 weeks',
    results: 'Up to 6 shades lighter',
    highlights: [
      'Precision-fit trays made in-house',
      'Professional gels for even coverage',
      'Flexible evening or weekend schedule',
      'Easy top-ups before events',
    ],
  },
  {
    name: 'Combination care',
    summary: 'Begin in-practice, then maintain at home for long-lasting brightness.',
    duration: 'Ongoing',
    results: 'Maximum whitening potential',
    highlights: [
      'Best-of-both approach',
      'Tailored plan for ongoing lift',
      'Top-up gels included',
      'Keeps results luminous for longer',
    ],
  },
];

const stainTypes = [
  {
    label: 'Surface stains',
    causes: ['Coffee', 'Tea', 'Wine', 'Tobacco'],
    approach: 'Easily removed with a single professional session.',
    success: '95% response rate',
  },
  {
    label: 'Age-related stains',
    causes: ['Enamel thinning', 'Natural dentine changes'],
    approach: 'Responds well to calibrated whitening under supervision.',
    success: '85% response rate',
  },
  {
    label: 'Intrinsic stains',
    causes: ['Medications', 'Fluorosis', 'Tooth trauma'],
    approach: 'Often needs layered treatments or veneers for full correction.',
    success: '70% response rate',
  },
];

const aftercare = [
  {
    title: 'First 48 hours',
    notes: [
      'Avoid richly coloured foods and drinks',
      'Use a straw for any coloured beverages',
      'Skip tobacco products while enamel settles',
      'Choose clear or white dishes to maintain lift',
    ],
  },
  {
    title: 'Long-term maintenance',
    notes: [
      'Attend hygiene visits every 6 months',
      'Use a gentle whitening toothpaste weekly',
      'Rinse after stain-prone meals',
      'Refresh with top-up syringes when needed',
    ],
  },
];

export default function WhiteningPreviewPage() {
  return (
    <main className="min-h-screen bg-[var(--champagne-surface)] text-[var(--champagne-ink)]">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-16">
        <nav aria-label="Breadcrumb" className="text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-[var(--champagne-ink-muted)]">
            <li>
              <Link className="underline-offset-4 hover:underline" href="/preview">
                Preview
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link className="underline-offset-4 hover:underline" href="/preview/treatments">
                Treatments
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[var(--champagne-ink)]">
              Teeth whitening
            </li>
          </ol>
        </nav>

        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--champagne-ink-muted)]">Treatments</p>
          <h1
            className="text-4xl font-semibold leading-tight sm:text-5xl"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Professional teeth whitening in Shoreham-by-Sea
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed t-muted">
            Achieve a brilliantly white smile with customised whitening journeys. Each plan balances comfort, speed, and
            longevity so your results stay luminous well beyond the initial appointment.
          </p>
        </header>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Why guests choose our whitening
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <article key={benefit.title} className="t-card h-full p-6">
                  <h3 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                    {benefit.title}
                  </h3>
                  <p className="mt-3 leading-relaxed t-muted">{benefit.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Tailored whitening pathways
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {options.map((option) => (
                <article key={option.name} className="t-card h-full p-6">
                  <h3 className="text-xl font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                    {option.name}
                  </h3>
                  <p className="mt-2 text-sm uppercase tracking-wider text-[var(--champagne-ink-muted)]">
                    {option.duration} · {option.results}
                  </p>
                  <p className="mt-3 leading-relaxed t-muted">{option.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed t-muted">
                    {option.highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Understanding different stains
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {stainTypes.map((type) => (
                <article key={type.label} className="t-card h-full p-6">
                  <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                    {type.label}
                  </h3>
                  <p className="mt-3 text-sm uppercase tracking-wide text-[var(--champagne-ink-muted)]">Common causes</p>
                  <ul className="mt-2 space-y-1 text-sm t-muted">
                    {type.causes.map((cause) => (
                      <li key={cause}>{cause}</li>
                    ))}
                  </ul>
                  <p className="mt-4 leading-relaxed t-muted">{type.approach}</p>
                  <p className="mt-2 text-sm font-medium text-[var(--champagne-ink)]">{type.success}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="t-section rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Aftercare to lock in brightness
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {aftercare.map((phase) => (
                <article key={phase.title} className="t-card h-full p-6">
                  <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
                    {phase.title}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed t-muted">
                    {phase.notes.map((note) => (
                      <li key={note} className="flex gap-2">
                        <span aria-hidden="true">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
