import React from 'react';
import { asset, hasCDN } from '@/lib/assets';

const highlights = [
  {
    title: 'AI Smile Blueprint',
    description: 'Layered before-and-after projections empower collaborative design with every patient.',
  },
  {
    title: 'Material Pairing Engine',
    description: 'Smart prompts align shade, translucency, and texture for dazzling harmony.',
  },
  {
    title: 'On-Call Concierge',
    description: 'Curated reminders keep patients confident from consultation through final polish.',
  },
];

export default function CompositeBonding() {
  const poster = hasCDN ? asset('/images/ai24/treatments/composite-bonding.jpg') : undefined;

  return (
    <section className="grid gap-10 rounded-[2.5rem] border border-white/10 bg-[var(--smh-surface-elevated)] p-10 text-white shadow-[0_20px_80px_rgba(0,0,0,0.35)] lg:grid-cols-[1fr,1fr]">
      <div className="space-y-6">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--smh-gold)]">Treatment Template</span>
        <h2 className="text-balance text-3xl font-semibold sm:text-4xl">Composite Bonding Luxe</h2>
        <p className="text-lg text-white/70">
          Surprise and delight patients with concierge-grade bonding workflows: from diagnostics to dazzling unveilings, every
          touchpoint is orchestrated through AI24.
        </p>
        <ul className="space-y-4 text-sm text-white/70">
          {highlights.map((item) => (
            <li key={item.title} className="smh-anim rounded-3xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-white/60">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="smh-anim flex flex-col justify-end gap-6">
        {hasCDN ? (
          <img
            src={poster}
            alt="Composite bonding smile transformation"
            className="w-full rounded-3xl border border-white/10 object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full min-h-[18rem] items-center justify-center rounded-3xl border border-dashed border-white/20 text-sm text-white/50">
            Imagery available when CDN assets are connected.
          </div>
        )}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--smh-gold)]">Chairside Flow</p>
          <p className="mt-2 leading-relaxed">
            Capture bite, design, and finishing touches with real-time AI cues. Deliver a gallery-ready reveal that patients
            will proudly share.
          </p>
        </div>
      </div>
    </section>
  );
}
