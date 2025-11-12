import "@/styles/preview/champagne-hero-preview.css";

type CTA = { label: string; href: string };

type TreatmentHeroShellProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  ctas?: CTA[];
  show3DSlot?: boolean;
};

export default function TreatmentHeroShell({
  kicker = "Treatments",
  title,
  subtitle,
  ctas = [],
  show3DSlot = true,
}: TreatmentHeroShellProps) {
  return (
    <section className="champ-hero" aria-label={`${title} hero`}>
      <div className="champ-hero__wave" />
      <div className="champ-hero__grain" />
      <div className="champ-hero__inner">
        <p className="champ-hero__kicker">{kicker}</p>
        <h1 className="champ-hero__title">{title}</h1>
        {subtitle && <p className="champ-hero__sub">{subtitle}</p>}
        {ctas.length > 0 && (
          <div className="champ-hero__ctas">
            {ctas.map((cta, index) => (
              <a
                key={`${cta.label}-${index}`}
                className={index === 0 ? "button-gold" : "button-ghost"}
                href={cta.href}
              >
                {cta.label}
              </a>
            ))}
          </div>
        )}
        {show3DSlot && (
          <div className="champ-hero__slot3d" aria-label="3D viewer placeholder">
            3D VIEWER SLOT (preview) — mounts real viewer later.
          </div>
        )}
      </div>
    </section>
  );
}
