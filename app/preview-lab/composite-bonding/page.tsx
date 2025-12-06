const highlights = [
  "Hand-layered detail that keeps edges soft and camera-ready.",
  "Single-visit refinement for small chips and contour tweaks.",
  "Gentle approach with minimal enamel change and serene pacing.",
];

const outcomes = [
  "Balanced, luminous edges that align with the smile line.",
  "Symmetry that photographs naturally in close-up shots.",
  "Texture tuned to resist staining and keep a refined feel.",
];

const quickRail = [
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
        <h1 id="preview-lab-composite-heading">
          Composite bonding — preview lab layout
        </h1>
        <p className="preview-lab-body">
          Structural mock only. Content will be filled later once the stable canvas is approved.
        </p>
      </header>

      <section className="preview-lab-section" aria-labelledby="preview-lab-composite-highlights">
        <h2 id="preview-lab-composite-highlights">Why guests choose it</h2>
        <div className="preview-lab-section__grid">
          {highlights.map((item) => (
            <article key={item} className="preview-lab-panel">
              <h3>Highlight</h3>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="preview-lab-section" aria-labelledby="preview-lab-composite-results">
        <h2 id="preview-lab-composite-results">Results our guests love</h2>
        <div className="preview-lab-section__grid">
          {outcomes.map((item) => (
            <article key={item} className="preview-lab-panel">
              <h3>Outcome</h3>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="preview-lab-section" aria-labelledby="preview-lab-composite-questions">
        <h2 id="preview-lab-composite-questions">Common questions</h2>
        <div className="preview-lab-section__grid">
          {quickRail.slice(0, 3).map((question) => (
            <article key={question} className="preview-lab-panel">
              <h3>Question</h3>
              <p>{question}</p>
            </article>
          ))}
        </div>
        <div className="preview-lab-quick-rail" role="list" aria-label="Quick answers">
          {quickRail.map((item) => (
            <span key={item} className="preview-lab-chip" role="listitem">
              {item}
            </span>
          ))}
        </div>
      </section>

      <p className="preview-lab-footer-note">Preview lab only — does not affect the live site.</p>
    </article>
  );
}
