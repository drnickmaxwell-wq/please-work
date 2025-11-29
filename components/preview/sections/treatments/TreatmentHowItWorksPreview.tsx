export type TreatmentStep = {
  title: string;
  summary: string;
};

export type TreatmentHowItWorksPreviewProps = {
  steps: TreatmentStep[];
};

export default function TreatmentHowItWorksPreview({ steps }: TreatmentHowItWorksPreviewProps) {
  return (
    <section className="cpv-card" aria-labelledby="treatments-how-heading">
      <div className="cpv-card__inner cpv-card__inner--stack">
        <div className="cpv-card__header">
          <p className="cpv-card__eyebrow text-eyebrow">Workflow</p>
          <div className="cpv-card__heading">
            <h2 className="cpv-card__title text-display-sm" id="treatments-how-heading">
              How treatments flow
            </h2>
            <p className="cpv-card__lead text-lead text-body">
              Four calm checkpoints aligned with the schema map and zero-click plan — clear, bookable, and easy to scan.
            </p>
          </div>
        </div>
        <ol className="howto-grid" aria-label="How treatments work">
          {steps.map((step, index) => (
            <li key={step.title} className="howto-grid__item">
              <div className="howto-grid__count" aria-hidden>
                {index + 1}
              </div>
              <div className="howto-grid__copy">
                <h3 className="text-lead font-semibold">{step.title}</h3>
                <p className="text-body">{step.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
