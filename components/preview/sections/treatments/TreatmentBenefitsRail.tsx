export type BenefitItem = {
  title: string;
  detail?: string;
};

export type TreatmentBenefitsRailProps = {
  slug: string;
  title?: string;
  intro?: string;
  benefits: BenefitItem[];
};

export default function TreatmentBenefitsRail({ slug, title, intro, benefits }: TreatmentBenefitsRailProps) {
  if (benefits.length === 0) return null;

  return (
    <section className="cpv-card" aria-labelledby={`${slug}-benefits-heading`}>
      <div className="cpv-card__inner cpv-card__inner--stack">
        <div className="cpv-card__header">
          <p className="cpv-card__eyebrow text-eyebrow">Best for</p>
          <div className="cpv-card__heading">
            <h2 className="cpv-card__title text-display-sm" id={`${slug}-benefits-heading`}>
              {title ?? "Who this pathway helps"}
            </h2>
            <p className="cpv-card__lead text-lead text-body">
              {intro ?? "Answer-first bullets shaped for search snippets and calm scannability."}
            </p>
          </div>
        </div>
        <ul className="treatment-benefits" aria-label={`${slug} benefits`}>
          {benefits.map((benefit) => (
            <li key={benefit.title} className="treatment-benefits__item">
              <div className="treatment-benefits__tone" aria-hidden />
              <div className="treatment-benefits__copy">
                <h3 className="text-lead font-semibold">{benefit.title}</h3>
                {benefit.detail ? <p className="text-body">{benefit.detail}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
