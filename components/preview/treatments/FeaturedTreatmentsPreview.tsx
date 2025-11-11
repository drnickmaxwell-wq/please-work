import SectionFrame from '@/components/treatments-light/SectionFrame';

type SectionProps = {
  route: string;
};

const FEATURED_ITEMS = [
  {
    slug: 'veneers',
    title: 'Veneers',
    summary: 'Preview slots for porcelain and composite veneer story beats.',
    detailSlug: 'veneers',
  },
  {
    slug: 'implants',
    title: 'Implants',
    summary: 'Model planning, CBCT references, and aftercare placeholders.',
    detailSlug: 'implants',
  },
  {
    slug: 'orthodontics/spark-aligners',
    title: 'Spark aligners',
    summary: 'Aligner journey copy sandbox with lifestyle imagery prompts.',
  },
];

export default function FeaturedTreatmentsPreview({ route }: SectionProps) {
  return (
    <SectionFrame
      description="Card grid referencing featured treatments with placeholder metadata and manifest-friendly IDs."
      id="featured-treatments"
      kicker={'<TreatmentCardGrid featuredSlugs={["veneers","implants","orthodontics/spark-aligners"]} />'}
      route={route}
      title="Featured treatments"
    >
      <div className="tl-featured-grid">
        {FEATURED_ITEMS.map((item) => (
          <article className="tl-featured-card tl-tilt" key={item.slug}>
            <div className="tl-featured-card__slug">{item.slug}</div>
            <h3 className="tl-featured-card__title">{item.title}</h3>
            <p className="tl-featured-card__summary">{item.summary}</p>
            <div className="tl-featured-card__links">
              <span aria-hidden="true" className="tl-featured-card__cta">
                View sandbox
              </span>
              {item.detailSlug ? (
                <a className="tl-featured-card__detail" href={`/preview/treatments/${item.detailSlug}`}>
                  View detail
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}
