export type BenefitCapsule = {
  title: string;
  description?: string;
  placeholder?: boolean;
};

export type BenefitsCapsulesProps = {
  benefits: BenefitCapsule[];
};

export default function BenefitsCapsules({ benefits }: BenefitsCapsulesProps) {
  const hasBenefits = benefits.length > 0;
  const items = hasBenefits
    ? benefits
    : [
        { title: 'Awaiting schema-driven benefits', description: 'Populate via HowTo or Service extensions.', placeholder: true },
        { title: 'Content pipeline placeholder', description: 'Ensure copywriting syncs with schema pack.', placeholder: true },
        { title: 'Tokenised surface ready', description: 'Preview grid renders once benefits are supplied.', placeholder: true },
      ];

  return (
    <section aria-labelledby="tp-benefits-title" className="tp-section tp-benefits">
      <div className="tp-section__heading">
        <p className="tp-kicker">Key benefits</p>
        <h2 className="tp-title" id="tp-benefits-title">
          Schema-linked highlights
        </h2>
      </div>
      <div className="tp-benefits__grid">
        {items.map((item) => (
          <article
            key={`${item.title}-${item.description ?? 'fallback'}`}
            className={`tp-benefit ${item.placeholder ? 'tp-benefit--placeholder' : ''}`.trim()}
          >
            <h3>{item.title}</h3>
            <p>{item.description ?? 'Awaiting content feed.'}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
