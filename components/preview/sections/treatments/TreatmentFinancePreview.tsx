import Link from "next/link";

export default function TreatmentFinancePreview() {
  const financePoints = [
    "Guideline bands from whitening refreshers to full-arch implant care.",
    "Soft credit search finance options; no impact when exploring plans.",
    "Transparent timelines so payment schedules mirror your treatment phases.",
  ];

  return (
    <section className="cpv-card cpv-card--bright" aria-labelledby="treatments-finance-heading">
      <div className="cpv-card__inner cpv-card__inner--finance">
        <div className="cpv-card__header">
          <p className="cpv-card__eyebrow">Pricing & finance</p>
          <div className="cpv-card__heading">
            <h2 className="cpv-card__title" id="treatments-finance-heading">
              Transparent bands, calm finance
            </h2>
            <p className="cpv-card__lead">
              Aligns to the treatments SEO plan: give quick ranges, invite a soft search, and signpost support before booking.
            </p>
          </div>
        </div>
        <div className="finance-band">
          <div className="finance-band__chip">Preview-only copy</div>
          <div className="finance-band__tiers">
            <div>
              <p className="finance-band__label">Cosmetic refresh</p>
              <p className="finance-band__value">from £300 - £1,200</p>
              <p className="finance-band__note">Whitening & bonding refinements</p>
            </div>
            <div>
              <p className="finance-band__label">Smile makeover</p>
              <p className="finance-band__value">£3,500 - £9,800</p>
              <p className="finance-band__note">Porcelain veneers & alignment</p>
            </div>
            <div>
              <p className="finance-band__label">Implant stability</p>
              <p className="finance-band__value">£2,200 - £14,000</p>
              <p className="finance-band__note">Single-tooth to full-arch care</p>
            </div>
          </div>
          <ul className="finance-band__list">
            {financePoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className="finance-band__ctas">
            <Link className="cpv-btn cpv-btn-solid" href="/finance">
              Explore finance options
            </Link>
            <Link className="cpv-btn cpv-btn-outline" href="/contact">
              Ask about pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
