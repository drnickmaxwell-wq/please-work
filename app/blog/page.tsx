import type { Metadata } from 'next';
import Link from 'next/link';

const posts = [
  {
    slug: 'digital-smile-design',
    title: 'Digital Smile Design at the Shoreline',
    description:
      'How 3D planning and gentle artistry come together for bespoke smile transformations in Shoreham-by-Sea.',
    date: 'June 2024',
    readingTime: '6 min read',
  },
  {
    slug: 'calm-implant-journey',
    title: 'A Calmer Dental Implant Journey',
    description:
      'From consultation to same-day placement, explore how precision technology makes implants feel effortless.',
    date: 'May 2024',
    readingTime: '5 min read',
  },
  {
    slug: 'composite-bonding-tips',
    title: 'Composite Bonding Aftercare Tips',
    description:
      'Simple rituals to keep your new bonding luminous between visits with the St Mary’s House team.',
    date: 'April 2024',
    readingTime: '4 min read',
  },
];

export const metadata: Metadata = {
  title: 'Dental Blog | St Mary’s House Dental',
  description:
    'Patient-friendly insights on technology, treatments, and calm dental care from the St Mary’s House team.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return (
    <div className="relative isolate overflow-hidden bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <header className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-200/80">Insights</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Blog</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300">
            Stories from our clinicians and patients on living well with a beautifully cared-for smile.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              id={post.slug}
              className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/10"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{post.date}</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-white">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{post.description}</p>
              </div>

              <Link
                href={`#${post.slug}`}
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
