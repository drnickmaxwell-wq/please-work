import type { ReactNode } from 'react';

export type ChampagnePreviewHeroProps = {
  title: string;
  kicker?: string;
  ctas?: ReactNode;
  children?: ReactNode;
};

const ChampagnePreviewHero = ({ title, kicker, ctas, children }: ChampagnePreviewHeroProps) => {
  return (
    <section className="cpv-hero">
      <div className="cpv-hero__inner">
        <div className="container">
          <div className="cpv-hero__content">
            <div className="cpv-glass cpv-hero__card">
              <div className="flex flex-col gap-6">
                {kicker ? <span className="cpv-hero__kicker">{kicker}</span> : null}
                <div className="space-y-4">
                  <h1 className="cpv-hero__title">{title}</h1>
                  {children ? <div className="cpv-hero__body text-lg leading-relaxed">{children}</div> : null}
                </div>
                {ctas ? <div className="flex flex-wrap gap-3">{ctas}</div> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChampagnePreviewHero;
