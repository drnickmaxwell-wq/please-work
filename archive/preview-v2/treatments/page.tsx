import Link from "next/link";

const treatments = [
  {
    slug: "whitening",
    title: "Teeth whitening",
    description: "Brighten your smile with tailored whitening guided by our champagne hero engine.",
  },
  {
    slug: "composite-bonding",
    title: "Composite bonding",
    description: "Refine edges and symmetry with natural-looking bonding artistry.",
  },
  {
    slug: "implants",
    title: "Dental implants",
    description: "Restore confidence with precision-placed implants and modern healing journeys.",
  },
  {
    slug: "veneers",
    title: "Veneers",
    description: "Craft luminous veneers for balanced proportions and long-lasting radiance.",
  },
  {
    slug: "orthodontics",
    title: "Orthodontics",
    description: "Guide every smile with discreet alignment paths tailored to you.",
  },
];

export default function PreviewV2TreatmentsHub() {
  return (
    <section className="cpv-v2-treatment-hub">
      <header className="cpv-v2-treatment-hub__header">
        <p className="cpv-v2-kicker">Preview V2 Lab</p>
        <h1>Champagne treatments preview</h1>
        <p className="cpv-v2-lede">
          Explore the new dark champagne canvas and hero presets for our core treatment stories.
        </p>
      </header>
      <div className="cpv-v2-treatment-grid">
        {treatments.map((treatment) => (
          <Link
            key={treatment.slug}
            href={`/preview-v2/treatments/${treatment.slug}`}
            className="cpv-card cpv-card--soft cpv-v2-treatment-card"
          >
            <div className="cpv-card__inner">
              <p className="cpv-card__eyebrow">Hero preset</p>
              <div className="cpv-card__heading">
                <h2>{treatment.title}</h2>
                <p className="cpv-card__lead">{treatment.description}</p>
              </div>
              <span className="cpv-v2-card-link">View preview</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
