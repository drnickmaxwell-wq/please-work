import React from 'react';

import SectionFrame from './SectionFrame';

type SectionProps = {
  route: string;
};

const FEATURED_ITEMS = [
  {
    slug: 'veneers',
    title: 'Veneers',
    summary: 'Preview slots for porcelain and composite veneer story beats.',
  },
  {
    slug: 'implants',
    title: 'Implants',
    summary: 'Model planning, CBCT references, and aftercare placeholders.',
  },
  {
    slug: 'orthodontics/spark-aligners',
    title: 'Spark aligners',
    summary: 'Aligner journey copy sandbox with lifestyle imagery prompts.',
  },
];

export default function FeaturedTreatments({ route }: SectionProps) {
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
            <span aria-hidden="true" className="tl-featured-card__cta">
              View sandbox
            </span>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}
