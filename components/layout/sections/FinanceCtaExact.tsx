'use client';

export default function FinanceCtaExact(){
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="rounded-2xl p-8 text-white shadow-xl ring-1 ring-white/10 bg-[var(--gradient-cta)]"
        >
          <h3 className="text-xl md:text-2xl font-bold">
            Flexible Finance, Calm Confidence
          </h3>
          <p className="mt-2 opacity-95">
            Ask us about Tabeo options and monthly plans designed around your goals.
          </p>
          <a
            href="/preview/lux/finance"
            className="mt-4 inline-flex items-center rounded-full px-5 py-3 bg-white/10 hover:bg-white/15 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--smh-accent-gold)]"
          >
            See Options
          </a>
        </div>
      </div>
    </section>
  );
}
