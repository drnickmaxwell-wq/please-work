import type { ReactNode } from 'react';

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="cpv-card">
      <h2 className="cpv-h2">{title}</h2>
      {children}
    </section>
  );
}

export function KeyList({ items }: { items: string[] }) {
  return (
    <ul className="cpv-list">
      {items.map((li, i) => (
        <li key={i}>{li}</li>
      ))}
    </ul>
  );
}
