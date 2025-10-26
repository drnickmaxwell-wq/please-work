'use client';

import { useMemo, useState } from 'react';

import BrandHeroGradient from '@/components/brand/BrandHeroGradient';
import FaqAccordion from '@/components/faq/FaqAccordion';
import '@/styles/tokens/smh-champagne-tokens.css';
import '@/styles/brand/brand-gradient.css';
import '@/styles/brand/brand-motion.css';
import '@/styles/brand/lux-glass.css';

const MIN_GRAIN = 0;
const MAX_GRAIN = 0.2;
const GRAIN_STEP = 0.01;

const heroCopy = {
  eyebrow: 'Champagne Drift',
  title: 'Glass-layered radiance with motion guards',
  body:
    'Fine-tuned gradient drift, particle palettes, and gold rim detailing—all driven by production tokens with reduced-motion safeguards built in.',
};

const faqSample = [
  {
    question: 'How subtle is the drift?',
    answer: 'The animation stays under 20px of parallax with a 90-second hue sweep, pausing entirely when reduced motion is enabled.',
  },
  {
    question: 'Can we switch particle colours?',
    answer: 'Yes. Swap between gold, teal, magenta, or disable entirely—ideal for aligning with campaign palettes.',
  },
  {
    question: 'Does the glass treatment respect dark mode?',
    answer: 'Backgrounds mix from champagne tokens, automatically tuning opacity and shadow depth for light or dark themes.',
  },
];

const particleOptions = [
  { value: 'gold', label: 'Gold' },
  { value: 'teal', label: 'Teal' },
  { value: 'magenta', label: 'Magenta' },
  { value: 'none', label: 'None' },
] as const;

type ParticleOption = (typeof particleOptions)[number]['value'];

function HeroPreview({
  particles,
  grain,
  goldRim,
  driftEnabled,
}: {
  particles: ParticleOption;
  grain: number;
  goldRim: boolean;
  driftEnabled: boolean;
}) {

  return (
    <BrandHeroGradient
      intensity="bold"
      clip="wave-bottom"
      goldDensity="med"
      particles={particles}
      grainOpacity={grain}
      driftEnabled={driftEnabled}
      goldRimEnabled={goldRim}
    >
      <section className="relative px-6 py-16 text-white md:px-10 md:py-20">
        <div className="mx-auto max-w-4xl space-y-5 text-center md:text-left">
          <span className="text-xs uppercase tracking-[0.28em] text-white/70">
            {heroCopy.eyebrow}
          </span>
          <h2 className="text-3xl font-serif drop-shadow md:text-5xl">{heroCopy.title}</h2>
          <p className="text-base text-white/85 md:text-lg">{heroCopy.body}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <a className="smh-btn sparkle-hover" href="#faq-preview">
              Preview CTA Motion
            </a>
            <button className="underline-offset-4 transition hover:underline" type="button">
              Inspect layers
            </button>
          </div>
        </div>
      </section>
    </BrandHeroGradient>
  );
}

export default function ChampagnePhaseTwoPreview() {
  const [particles, setParticles] = useState<ParticleOption>('gold');
  const [grainOpacity, setGrainOpacity] = useState(0.14);
  const [driftEnabled, setDriftEnabled] = useState(true);

  const formattedGrain = useMemo(() => grainOpacity.toFixed(2), [grainOpacity]);

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6 lg:px-8">
      <header className="space-y-3 text-center md:text-left">
        <h1 className="text-4xl font-serif md:text-5xl">Champagne Phase 2 Preview</h1>
        <p className="text-slate-600 md:max-w-3xl">
          Validate hero drift, particle palettes, and lux-glass FAQs before promoting the toggle. Adjust controls below and compare
          gold rim, grain intensity, and FAQ treatments side by side.
        </p>
      </header>

      <section
        className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:flex-row md:items-center md:justify-between"
        aria-label="Champagne controls"
      >
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Layer controls</h2>
          <p className="text-sm text-slate-600">
            Particles, grain, and motion respond immediately for both hero variants.
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center md:justify-end">
          <label className="flex items-center gap-3 text-sm" htmlFor="particles-select">
            <span className="font-medium">Particles</span>
            <select
              id="particles-select"
              className="rounded-full border border-white/30 bg-transparent px-4 py-2 text-sm"
              value={particles}
              onChange={(event) => setParticles(event.target.value as ParticleOption)}
            >
              {particleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col text-sm" htmlFor="grain-slider">
            <span className="font-medium">Grain opacity ({formattedGrain})</span>
            <input
              id="grain-slider"
              type="range"
              min={MIN_GRAIN}
              max={MAX_GRAIN}
              step={GRAIN_STEP}
              value={grainOpacity}
              onChange={(event) => setGrainOpacity(Number(event.target.value))}
            />
          </label>
          <label className="flex items-center gap-3 text-sm" htmlFor="drift-toggle">
            <span className="font-medium">Enable drift</span>
            <input
              id="drift-toggle"
              type="checkbox"
              role="switch"
              checked={driftEnabled}
              onChange={(event) => setDriftEnabled(event.target.checked)}
            />
          </label>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2" aria-label="Hero variants">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Particles + grain</h3>
          <HeroPreview particles={particles} grain={grainOpacity} goldRim={false} driftEnabled={driftEnabled} />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Add gold rim</h3>
          <HeroPreview particles={particles} grain={grainOpacity} goldRim driftEnabled={driftEnabled} />
        </div>
      </section>

      <section id="faq-preview" className="grid gap-12 md:grid-cols-2" aria-label="FAQ before and after">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Baseline accordion</h3>
          <FaqAccordion items={faqSample} glassEnabled={false} />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Lux-glass + gold rail</h3>
          <FaqAccordion items={faqSample} glassEnabled />
        </div>
      </section>
    </div>
  );
}
