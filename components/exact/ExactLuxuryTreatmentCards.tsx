'use client';

import Link from 'next/link';

type Card = {
  href: string;
  title: string;
  blurb: string;
};

const cards: Card[] = [
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
          <h2 className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: 'Montserrat, ui-sans-serif' }}>
            Our Treatments
          </h2>
          <p className="mt-2 opacity-80" style={{ fontFamily: 'Lora, ui-serif' }}>
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
              {/* subtle gradient border on hover */}
              <span
                className="pointer-events-none absolute inset-0 rounded-2xl
                           opacity-0 group-hover:opacity-100 transition
                           bg-gradient-to-r from-[#C2185B] via-[#40C4B4] to-[#D4AF37]"
                aria-hidden="true"
              />
              {/* inner card background to mask gradient border */}
              <span
                className="relative block rounded-[1rem] p-[1px] bg-white/0"
                aria-hidden="true"
              >
                <span
                  className="block rounded-[calc(1rem-1px)] p-5
                             bg-white/80 dark:bg-white/5"
                >
                  <h3 className="text-lg font-semibold relative z-10"
                      style={{ fontFamily: 'Montserrat, ui-sans-serif' }}>
                    <span
                      className="bg-gradient-to-r from-[#C2185B] via-[#40C4B4] to-[#D4AF37]
                                 bg-clip-text text-transparent"
                    >
                      {c.title}
                    </span>
                  </h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300 relative z-10"
                     style={{ fontFamily: 'Lora, ui-serif' }}>
                    {c.blurb}
                  </p>

                  {/* Explore chip */}
                  <span
                    className="mt-4 inline-flex items-center rounded-full px-4 py-2 text-white font-semibold
                               bg-gradient-to-r from-[#C2185B] via-[#40C4B4] to-[#D4AF37]
                               shadow-sm group-hover:brightness-105 transition"
                  >
                    Explore
                  </span>
                </span>
              </span>

              {/* gold specular line on hover */}
              <span
                className="pointer-events-none absolute -inset-px rounded-2xl overflow-hidden
                           opacity-0 group-hover:opacity-100 transition"
                aria-hidden="true"
              >
                <span
                  className="absolute left-[-20%] top-0 h-full w-12 skew-x-12
                             bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent
                             animate-[shine_1.2s_ease-in-out]"
                />
              </span>

              <style jsx>{`
                @keyframes shine {
                  0%   { transform: translateX(0); }
                  100% { transform: translateX(200%); }
                }
              `}</style>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
