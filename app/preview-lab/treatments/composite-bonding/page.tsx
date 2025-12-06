const highlights = [
  {
    icon: "✦",
    title: "Single-visit transformation",
    text: "Tailored reshaping and bonding finished in one meticulous appointment for most guests.",
  },
  {
    icon: "◎",
    title: "Hand-layered detail",
    text: "Shaded and polished by hand so edges stay soft, natural, and camera-ready.",
  },
  {
    icon: "☼",
    title: "Gentle approach",
    text: "Minimal enamel reduction with comfort-first techniques and serene chairside pacing.",
  },
  {
    icon: "❖",
    title: "Repair + refine",
    text: "Closes micro-gaps, evens lengths, and smooths chips without committing to porcelain yet.",
  },
];

const outcomes = [
  {
    title: "Balanced, luminous edges",
    body: "Even incisal lines with a soft luster that echoes natural enamel under studio light.",
  },
  {
    title: "Symmetry that photographs well",
    body: "Profile-aware contouring so the smile line and lip line stay in harmony on or off camera.",
  },
  {
    title: "Texture you can trust",
    body: "Hand-burnished surface detail that resists staining and keeps a refined feel between visits.",
  },
];

const faqs = [
  {
    question: "How durable is composite bonding?",
    answer:
      "Modern composites are designed to last several years with mindful care and periodic finishing.",
  },
  {
    question: "Will the results look natural?",
    answer:
      "Layered shading and gentle texture mimic enamel so the finish blends with your existing smile.",
  },
  {
    question: "What is the appointment like?",
    answer:
      "Expect a relaxed, music-forward session with detailed shaping, polish, and a serene reveal.",
  },
  {
    question: "Can bonding be updated later?",
    answer:
      "Yes. It can be refreshed, reshaped, or used as a bridge step before porcelain if desired.",
  },
];

const quickAnswers = [
  "Does bonding work for small chips?",
  "How do I care for bonded teeth?",
  "Is there sensitivity afterward?",
  "Can I pair this with whitening?",
];

export default function CompositeBondingPreview() {
  return (
    <main className="plab-main" aria-labelledby="composite-bonding-preview">
      <section className="plab-hero">
        <div className="plab-hero__label">Composite bonding</div>
        <h1 id="composite-bonding-preview" className="plab-hero__title">
          Hand-sculpted brilliance, finished in a single visit
        </h1>
        <p className="plab-body">
          A quiet, precise appointment that smooths chips, refines symmetry, and leaves a soft,
          light-catching finish.
        </p>
        <div className="plab-hero__links" aria-label="Preview actions">
          <a className="plab-chip" href="#">Reserve a consultation</a>
          <a className="plab-chip" href="#">View bonding FAQs</a>
        </div>
      </section>

      <section className="plab-section" aria-labelledby="bonding-highlights">
        <h2 id="bonding-highlights" className="plab-heading-lg">
          Composite bonding highlights
        </h2>
        <div className="plab-section__grid">
          {highlights.map((item) => (
            <article key={item.title} className="plab-highlight">
              <div className="plab-highlight__icon" aria-hidden>
                {item.icon}
              </div>
              <h3 className="plab-heading-md">{item.title}</h3>
              <p className="plab-highlight__text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="plab-section" aria-labelledby="bonding-results">
        <h2 id="bonding-results" className="plab-heading-lg">
          Results our guests love
        </h2>
        <div className="plab-section__grid">
          {outcomes.map((item) => (
            <article key={item.title} className="plab-highlight">
              <h3 className="plab-heading-md">{item.title}</h3>
              <p className="plab-highlight__text">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="plab-section" aria-labelledby="bonding-questions">
        <h2 id="bonding-questions" className="plab-heading-lg">
          Composite bonding questions
        </h2>
        <div className="plab-faq">
          {faqs.map((item) => (
            <article key={item.question} className="plab-faq__item">
              <h3 className="plab-faq__question">{item.question}</h3>
              <p className="plab-faq__answer">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="plab-section" aria-labelledby="bonding-quick-answers">
        <h2 id="bonding-quick-answers" className="plab-heading-lg">
          Quick answer rail
        </h2>
        <p className="plab-body">Lightweight prompts guests often ask before scheduling.</p>
        <div className="plab-quick-answers" role="list">
          {quickAnswers.map((chip) => (
            <span key={chip} className="plab-quick-answers__chip" role="listitem">
              {chip}
            </span>
          ))}
        </div>
      </section>

      <p className="plab-footer">Preview lab only — does not affect the live site.</p>
    </main>
  );
}
