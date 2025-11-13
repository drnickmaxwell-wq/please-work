import type { ReactNode } from 'react';

export type ChampagneSectionProps = {
  title: string;
  children: ReactNode;
};

export const ChampagneSection = ({ title, children }: ChampagneSectionProps) => {
  return (
    <section className="cpv-section">
      <h2 className="cpv-section__title">{title}</h2>
      <div className="cpv-card cpv-card--glass cpv-section__body">{children}</div>
    </section>
  );
};

export default ChampagneSection;
