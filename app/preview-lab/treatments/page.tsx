import Link from "next/link";

export default function PreviewLabTreatmentsHub() {
  return (
    <main className="plab-main plab-main--hub">
      <section className="plab-card plab-card--hub">
        <h1 className="plab-heading-xl">Treatments preview lab</h1>
        <p className="plab-body">
          Safe sandbox for Champagne treatment templates.
        </p>
        <ul className="plab-list">
          <li>
            <Link href="/preview-lab/treatments/composite-bonding">
              Composite bonding — preview
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
