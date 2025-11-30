'use client';

import { useId, useState } from 'react';
import styles from './champagne-faq.module.css';

export interface ChampagneFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ChampagneFaqProps {
  items: ChampagneFaqItem[];
  heading?: string;
}

export function ChampagneFAQ({ items, heading }: ChampagneFaqProps) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={styles.faq}>
      {heading ? <h2 className={styles.faqHeading}>{heading}</h2> : null}
      {items.map((item, index) => {
        const domId = `${baseId}-${item.id || index}`;
        const isOpen = openIds.has(domId);
        return (
          <div key={domId} className={styles.item}>
            <button
              type="button"
              className={styles.button}
              aria-expanded={isOpen}
              aria-controls={`${domId}-panel`}
              id={`${domId}-button`}
              onClick={() => toggle(domId)}
            >
              <span>{item.question}</span>
              <span className={styles.icon} aria-hidden>
                {isOpen ? '−' : '+'}
              </span>
            </button>
            {isOpen ? (
              <div
                id={`${domId}-panel`}
                role="region"
                aria-labelledby={`${domId}-button`}
                className={styles.answer}
              >
                {item.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
