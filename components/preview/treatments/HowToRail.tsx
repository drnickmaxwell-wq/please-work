import type { PreviewHowToStep } from '@/lib/seo/preview/safe-loader';

export type HowToRailProps = {
  title?: string;
  steps: PreviewHowToStep[];
  missing?: boolean;
};

export default function HowToRail({ title, steps, missing = false }: HowToRailProps) {
  const hasSteps = steps.length > 0;

  return (
    <section aria-labelledby="tp-howto-title" className="tp-section tp-howto">
      <div className="tp-section__heading">
        <p className="tp-kicker">How it works</p>
        <h2 className="tp-title" id="tp-howto-title">
          {title ?? 'Treatment workflow'}
        </h2>
      </div>
      <ol className="tp-howto__rail">
        {hasSteps
          ? steps.map((step, index) => (
              <li className="tp-howto__step" key={`${step.name ?? 'step'}-${index}`}>
                <div className="tp-howto__count" aria-hidden>
                  {index + 1}
                </div>
                <div className="tp-howto__copy">
                  <h3>{step.name ?? `Step ${index + 1}`}</h3>
                  <p>{step.text ?? 'Awaiting schema step text.'}</p>
                </div>
              </li>
            ))
          : [0, 1, 2].map((index) => (
              <li className="tp-howto__step tp-howto__step--placeholder" key={`placeholder-${index}`}>
                <div className="tp-howto__count" aria-hidden>
                  {index + 1}
                </div>
                <div className="tp-howto__copy">
                  <h3>Pending HowTo step</h3>
                  <p>Load HowTo.step from schema pack to replace placeholder copy.</p>
                </div>
              </li>
            ))}
      </ol>
      {missing ? <p className="tp-footnote">HowTo schema not detected for this slug.</p> : null}
    </section>
  );
}
