import Link from "next/link";

export type StoryCard = {
  title: string;
  blurb: string;
  tag: string;
};

export default function StoriesTeaser({ stories }: { stories: StoryCard[] }) {
  return (
    <section className="cpv-card" aria-labelledby="treatments-stories-heading">
      <div className="cpv-card__inner cpv-card__inner--stack">
        <div className="cpv-card__header">
          <p className="cpv-card__eyebrow text-eyebrow">Patient stories</p>
          <div className="cpv-card__heading">
            <h2 className="cpv-card__title text-display-sm" id="treatments-stories-heading">
              Quiet proof from Shoreham patients
            </h2>
            <p className="cpv-card__lead text-lead text-body">
              A teaser patterned after the Patient Stories plan — short captions, clear concern tags, and a path to the full gallery.
            </p>
          </div>
        </div>
        <div className="stories-grid">
          {stories.map((story) => (
            <article key={story.title} className="stories-grid__card">
              <p className="stories-grid__tag text-eyebrow">{story.tag}</p>
              <h3 className="text-lead font-semibold">{story.title}</h3>
              <p className="stories-grid__blurb text-body">{story.blurb}</p>
            </article>
          ))}
        </div>
        <div className="stories-grid__cta">
          <Link className="cpv-btn cpv-btn-solid text-eyebrow" href="/patient-stories">
            View all stories
          </Link>
        </div>
      </div>
    </section>
  );
}
