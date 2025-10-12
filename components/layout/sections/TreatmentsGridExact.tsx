'use client';

import Link from 'next/link';

const cards = [
  { href: '/treatments/veneers',       title: 'Porcelain Veneers',     blurb: 'Refined, natural elegance for your smile.' },
  { href: '/treatments/implants',      title: 'Dental Implants',       blurb: 'Confident, long-lasting replacement teeth.' },
  { href: '/treatments/whitening',     title: 'Teeth Whitening',       blurb: 'Brighter smiles with gentle, expert care.' },
  { href: '/treatments/orthodontics',  title: 'Orthodontics',          blurb: 'Fixed braces & Spark aligners for precision.' },
  { href: '/treatments/3d-dentistry',  title: '3-D Digital Dentistry', blurb: 'Same-day 3-D scanning, printing & veneers.' },
  { href: '/treatments/general',       title: 'General Dentistry',     blurb: 'Prevention-first check-ups & restorative care.' },
];

export default function ExactLuxuryTreatmentCards() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Our Treatments
          </h2>
          <p className="mt-2 opacity-80" style={{ fontFamily: 'Lora, serif' }}>
            Calm, precise and beautifully natural outcomes.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link key={c.href} href={c.href}
              className="group relative rounded-2xl p-6 bg-white/70 dark:bg-white/5
                         backdrop-blur-md border border-black/5 dark:border-white/10
                         shadow-sm hover:shadow-xl transition
                         focus:outline-none focus:ring-2 focus:ring-offset-2
                         focus:ring-[#40C4B4]/50"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition
                              bg-gradient-to-r from-[#C2185B] via-[#40C4B4] to-[#D4AF37]" />

              <div className="relative bg-white/80 dark:bg-white/5 rounded-xl p-5">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-[#C2185B] via-[#40C4B4] to-[#D4AF37]
                               bg-clip-text text-transparent" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {c.title}
                </h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300" style={{ fontFamily: 'Lora, serif' }}>
                  {c.blurb}
                </p>
                <span className="mt-4 inline-flex items-center rounded-full px-4 py-2 text-white font-semibold
                                bg-gradient-to-r from-[#C2185B] via-[#40C4B4] to-[#D4AF37] shadow-sm
                                group-hover:brightness-105 transition">
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
