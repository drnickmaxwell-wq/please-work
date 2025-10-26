import type { Metadata } from 'next';
import Link from 'next/link';

const stories = [
  {
    slug: 'shoreline-bonding',
    title: 'Composite Bonding with a Shoreline Glow',
    summary: 'Feather-light refinements closed micro-gaps and brightened Amelia\'s smile in a single visit.',
    focus: 'Composite Bonding',
  },
  {
    slug: 'calm-implants',
    title: 'Implants Planned for Calm and Comfort',
    summary: 'Guided surgery and same-day restorations restored James\'s bite without downtime.',
    focus: 'Dental Implants',
  },
  {
    slug: 'anxiety-eased',
    title: 'Easing Anxiety with Gentle Technology',
    summary: 'Sedation, aromatherapy, and The Wand numbing system helped Priya return to routine visits.',
    focus: 'Anxiety-Free Care',
  },
];

export const metadata: Metadata = {
  title: 'Patient Stories | St Mary’s House Dental',
  description: 'Real experiences from St Mary’s House patients embracing calm, precise dental care.',
  alternates: { canonical: '/stories' },
};

export default function StoriesPage() {
  return (
    <div className="relative isolate overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <header className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-200/80">Stories</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Patient Stories</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300">
            Confidence, comfort, and thoughtful care—told through the voices of our community.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.slug}
              id={story.slug}
              className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/10"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-200/80">{story.focus}</p>
                <h2 className="mt-4 text-xl font-semibold text-white">{story.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{story.summary}</p>
              </div>

              <Link
                href={`#${story.slug}`}
                className="mt-6 inline-flex items-center text-sm font-medium text-teal-200 transition hover:text-white"
              >
                Read story
                <span aria-hidden className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
