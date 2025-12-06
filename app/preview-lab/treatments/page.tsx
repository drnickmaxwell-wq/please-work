import Link from "next/link";

export default function PreviewLabTreatmentsHub() {
  return (
    <section className="preview-lab-hub" aria-labelledby="preview-lab-hub-heading">
      <div className="preview-lab-hub__intro">
        <h1 id="preview-lab-hub-heading" className="preview-lab-heading-xl">
          Treatments preview lab
        </h1>
        <p className="preview-lab-body">
          Safe, isolated canvas for Champagne treatment templates before they go live.
        </p>
      </div>

      <div className="preview-lab-grid" role="list">
        <article className="preview-lab-card" role="listitem">
          <p className="preview-lab-card__eyebrow">Composite bonding</p>
          <h2 className="preview-lab-card__title">Hand-sculpted mock</h2>
          <p className="preview-lab-body">
            Dark-ink preview showing the hero, highlights, and quick answers layout.
          </p>
          <Link className="preview-lab-card__link" href="/preview-lab/composite-bonding">
            Open composite bonding
          </Link>
        </article>

        <article className="preview-lab-card" role="listitem">
          <p className="preview-lab-card__eyebrow">Veneers</p>
          <h2 className="preview-lab-card__title">Coming next</h2>
          <p className="preview-lab-body">
            Placeholder for a future veneers preview pass on the same ink canvas.
          </p>
          <span className="preview-lab-card__link" aria-disabled>
            In design
          </span>
        </article>

        <article className="preview-lab-card" role="listitem">
          <p className="preview-lab-card__eyebrow">Implants</p>
          <h2 className="preview-lab-card__title">Coming next</h2>
          <p className="preview-lab-body">
            Reserved slot for future implant preview with schema rail and outcomes grid.
          </p>
          <span className="preview-lab-card__link" aria-disabled>
            In design
          </span>
        </article>
      </div>
    </section>
  );
}
