import Link from "next/link";

export type ConcernCard = {
  title: string;
  slug: string;
  href: string;
  summary: string;
  detail: string;
  tone?: "warm" | "cool";
};

export type ConcernRailProps = {
  heading?: string;
  subheading?: string;
  items: ConcernCard[];
};

export default function ConcernRail({
  heading = "Choose your main concern",
  subheading = "Move between cosmetic, restorative and tech-led care without losing the Champagne canvas.",
  items,
}: ConcernRailProps) {
  return (
    <section className="cpv-card" aria-labelledby="treatments-concern-heading">
      <div className="cpv-card__inner cpv-card__inner--stack">
        <div className="cpv-card__header">
          <p className="cpv-card__eyebrow">Treatment finder</p>
          <div className="cpv-card__heading">
            <h2 className="cpv-card__title" id="treatments-concern-heading">
              {heading}
            </h2>
            <p className="cpv-card__lead">{subheading}</p>
          </div>
        </div>

        <div className="treatment-rail" role="list">
          {items.map((item) => (
            <Link
              key={item.slug}
              className="treatment-rail__card"
              href={item.href}
              aria-label={`${item.title} – ${item.summary}`}
              role="listitem"
            >
              <div className="treatment-rail__tone" data-tone={item.tone ?? "warm"} aria-hidden />
              <div className="treatment-rail__body">
                <p className="treatment-rail__kicker">{item.slug}</p>
                <h3>{item.title}</h3>
                <p className="treatment-rail__summary">{item.summary}</p>
                <span className="treatment-rail__cta">Explore pathway</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="treatment-deck" aria-label="Treatment detail previews">
          {items.map((item) => (
            <article key={`${item.slug}-detail`} className="treatment-deck__card">
              <div className="treatment-deck__tone" data-tone={item.tone ?? "warm"} aria-hidden />
              <header className="treatment-deck__header">
                <p className="treatment-deck__eyebrow">{item.slug}</p>
                <h3>{item.title}</h3>
              </header>
              <p className="treatment-deck__copy">{item.detail}</p>
              <Link className="treatment-deck__link" href={item.href}>
                View preview
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
