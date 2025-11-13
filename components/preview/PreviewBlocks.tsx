import type { ReactNode } from 'react';

type SectionProps = {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  children?: ReactNode;
  tone?: 'default' | 'bright';
  id?: string;
};

export function Section({ title, eyebrow, description, children, tone = 'default', id }: SectionProps) {
  return (
    <section className="cpv-card" data-tone={tone} id={id}>
      <div className="cpv-card__inner">
        {eyebrow ? <p className="cpv-card__eyebrow">{eyebrow}</p> : null}
        <h2 className="cpv-card__title">{title}</h2>
        {description ? <div className="cpv-card__lead">{description}</div> : null}
        {children}
      </div>
    </section>
  );
}

type KeyListProps = {
  items: string[];
};

export function KeyList({ items }: KeyListProps) {
  return (
    <ul className="cpv-list">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
