import type { ReactNode } from 'react';

import '@/styles/champagne/effects/layers.css';
import styles from './ChampagneSectionShell.module.css';

const join = (...tokens: Array<string | false | null | undefined>) => tokens.filter(Boolean).join(' ');

export type ChampagneSectionShellProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export default function ChampagneSectionShell({
  children,
  className,
  contentClassName,
}: ChampagneSectionShellProps) {
  return (
    <section className={join(styles.shell, className)}>
      <div aria-hidden className={join('fx-layer', 'fx-layer--gradient')} />
      <div aria-hidden className={join('fx-layer', 'fx-layer--waves')} />
      <div aria-hidden className={join('fx-layer', 'fx-layer--glass')} />
      <div aria-hidden className={join('fx-layer', 'fx-layer--gold-dust')} />
      <div aria-hidden className={join('fx-layer', 'fx-layer--grain')} />
      <div className={join(styles.content, contentClassName)}>{children}</div>
    </section>
  );
}

export const champagneShellClasses = {
  parallax: styles.parallax,
  goldGlow: styles.goldGlow,
};
