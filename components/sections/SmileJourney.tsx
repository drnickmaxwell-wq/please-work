import Link from 'next/link';

const cards = [
  {
    title: 'AI Cost Clarity',
    description:
      'Instantly understand transparent pricing, phased plans, and membership perks tuned to your smile goals.',
    items: ['Compare finance options in seconds', 'Tailored plans for cosmetic and restorative care', 'Private dashboard updates every visit'],
    cta: { href: '/membership', label: 'View membership tiers' },
  },
  {
    title: 'Time Predictor',
    description:
      'Sync your treatment cadence with life events using our predictive scheduler and digital concierge.',
    items: ['Reserve preferred clinicians', 'Smart reminders and wellbeing check-ins', 'Track healing milestones collaboratively'],
    cta: { href: '/treatments/technology', label: 'Discover the workflow' },
  },
  {
    title: 'AR Try-On Studio',
    description:
      'Preview veneer shades, aligner progress, and smile shapes in augmented reality before we ever begin.',
    items: ['Ultra-realistic 4K rendering', 'Share previews securely with loved ones', 'Blend artistry with clinical precision'],
    cta: { href: '/gallery', label: 'Explore smile previews' },
  },
];

const SmileJourney = () => {
  return (
    <section className="smile-journey" aria-labelledby="smile-journey-heading">
      <div className="smile-journey__inner">
        <div className="smile-journey__intro">
          <p className="smile-journey__eyebrow">Your journey, choreographed</p>
          <h2 id="smile-journey-heading">Every step feels intentional, not clinical</h2>
          <p className="smile-journey__lead">
            Our concierge technology balances human warmth with anticipatory planning so your smile transformation fits effortlessly into daily life.
          </p>
        </div>
        <div className="smile-journey__grid">
          {cards.map((card) => (
            <article key={card.title} className="glass smile-journey__card">
              <div className="smile-journey__card-body">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <ul>
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="gold-keyline" aria-hidden="true" />
              <div className="smile-journey__card-footer">
                <Link className="smh-btn" href={card.cta.href}>
                  {card.cta.label}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style jsx>{`
        .smile-journey {
          background: linear-gradient(160deg, rgba(12, 21, 32, 0.94), rgba(7, 12, 16, 0.98));
          color: rgba(238, 243, 249, 0.92);
          padding: clamp(4.5rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem);
        }

        .smile-journey__inner {
          max-width: min(1180px, 94vw);
          margin: 0 auto;
          display: grid;
          gap: clamp(2.5rem, 4vw, 3.5rem);
        }

        .smile-journey__intro {
          max-width: 60ch;
          display: grid;
          gap: 1rem;
        }

        .smile-journey__eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 0.9rem;
          color: rgba(249, 232, 195, 0.7);
          margin: 0;
        }

        .smile-journey__lead {
          margin: 0;
          font-size: clamp(1.05rem, 2vw, 1.25rem);
          color: rgba(224, 230, 238, 0.85);
        }

        h2 {
          margin: 0;
          font-size: clamp(2rem, 4vw, 2.8rem);
          line-height: 1.2;
          color: rgba(249, 232, 195, 0.92);
        }

        .smile-journey__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: clamp(1.5rem, 3vw, 2.5rem);
        }

        .smile-journey__card {
          display: grid;
          grid-template-rows: 1fr auto auto;
          position: relative;
          color: inherit;
          min-height: 100%;
        }

        .smile-journey__card-body {
          display: grid;
          gap: 0.9rem;
          padding: clamp(1.5rem, 3vw, 2.25rem);
        }

        .smile-journey__card-body h3 {
          margin: 0;
          font-size: 1.35rem;
          color: rgba(249, 232, 195, 0.88);
        }

        .smile-journey__card-body p {
          margin: 0;
          color: rgba(215, 224, 234, 0.82);
        }

        .smile-journey__card-body ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 0.6rem;
        }

        .smile-journey__card-body li {
          position: relative;
          padding-left: 1.5rem;
          color: rgba(215, 224, 234, 0.78);
        }

        .smile-journey__card-body li::before {
          content: '';
          position: absolute;
          left: 0.35rem;
          top: 0.45rem;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 999px;
          background: rgba(249, 232, 195, 0.65);
          box-shadow: 0 0 12px rgba(249, 232, 195, 0.45);
        }

        .gold-keyline {
          border-top: 1px solid var(--gold-alpha-40);
          margin: 0 clamp(1.5rem, 3vw, 2.25rem);
        }

        .smile-journey__card-footer {
          padding: clamp(1.25rem, 2.5vw, 2rem) clamp(1.5rem, 3vw, 2.25rem) clamp(1.75rem, 3vw, 2.5rem);
        }

        .smile-journey__card-footer .smh-btn {
          width: 100%;
          justify-content: center;
        }

        .glass {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(24px);
          border-radius: 18px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.18);
          transition: transform 0.18s ease;
        }

        .glass:where(:hover, :focus-within) {
          transform: translateY(-2px);
        }

        @media (prefers-reduced-motion: reduce) {
          .glass {
            transition: none;
          }

          .glass:where(:hover, :focus-within) {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};

export default SmileJourney;
