const highlights = [
  {
    title: "Gentle, single-visit uplift",
    body: "Structural refinements for chips, micro-gaps, and contour balancing in one calm sitting.",
  },
  {
    title: "Hand-layered texture",
    body: "Soft edges and enamel-like sheen tuned for close-up photos and everyday light.",
  },
  {
    title: "Adaptable by design",
    body: "Can be refreshed or evolved later, making it a flexible step before porcelain.",
  },
];

const outcomes = [
  "Balanced, luminous edges that align with the smile line.",
  "Symmetry that photographs naturally in close-up shots.",
  "Texture tuned to resist staining and keep a refined feel.",
];

const questions = [
  "How durable is composite bonding?",
  "Will the results look natural?",
  "What is the appointment like?",
  "Can bonding be updated later?",
];

export default function PreviewLabCompositeBondingPage() {
  return (
    <article className="preview-lab-treatment" aria-labelledby="preview-lab-composite-heading">
      <header className="preview-lab-hero">
        <p className="preview-lab-kicker">Treatments / Composite bonding</p>
        <h1 id="preview-lab-composite-heading">Composite bonding — preview lab layout</h1>
        <p className="preview-lab-body">
          Structural mock only. This view focuses on layout, contrast, and ink-canvas stability.
        </p>
      </header>

      <section className="preview-lab-section" aria-labelledby="preview-lab-composite-highlights">
        <h2 id="preview-lab-composite-highlights">Why guests choose composite bonding</h2>
        <div className="preview-lab-section__grid">
          {highlights.map((item) => (
            <article key={item.title} className="preview-lab-panel">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="preview-lab-section" aria-labelledby="preview-lab-composite-results">
        <h2 id="preview-lab-composite-results">Results our guests love</h2>
        <ul className="preview-lab-section__list">
          {outcomes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="preview-lab-section" aria-labelledby="preview-lab-composite-questions">
        <h2 id="preview-lab-composite-questions">Common questions</h2>
        <div className="preview-lab-section__grid">
          {questions.slice(0, 3).map((question) => (
            <article key={question} className="preview-lab-panel">
              <h3>{question}</h3>
              <p>Placeholder copy that will be replaced with the final FAQ answers.</p>
            </article>
          ))}
        </div>
        <div className="preview-lab-quick-rail" role="list" aria-label="Quick answers">
          {questions.map((item) => (
            <span key={item} className="preview-lab-chip" role="listitem">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="preview-lab-section" aria-labelledby="preview-lab-next-steps">
        <h2 id="preview-lab-next-steps">Next steps</h2>
        <p className="preview-lab-body">Use these paths while the lab layout is refined.</p>
        <div className="preview-lab-actions">
          <a className="preview-lab-action" href="/treatments/composite-bonding">
            View live Composite Bonding page
          </a>
          <a className="preview-lab-action" href="/preview-lab/treatments">
            Back to treatments preview lab
          </a>
        </div>
      </section>

      <p className="preview-lab-footer-note">Preview lab only — does not affect the live site.</p>
    </article>
  );
}
