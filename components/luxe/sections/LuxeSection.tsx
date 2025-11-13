import type { HTMLAttributes, ReactNode } from 'react';

import LuxeGlassCard from '@/components/luxe/cards/LuxeGlassCard';

import styles from './LuxeSection.module.css';

export type LuxeSectionProps = {
  title: string;
  kicker?: string;
  description?: ReactNode;
  children: ReactNode;
  cardClassName?: string;
} & HTMLAttributes<HTMLElement>;

const LuxeSection = ({
  title,
  kicker,
  description,
  children,
  cardClassName,
  className,
  ...rest
}: LuxeSectionProps) => {
  const sectionClassName = [styles.section, className].filter(Boolean).join(' ');
  const cardClassNameCombined = [styles.card, cardClassName].filter(Boolean).join(' ');

  return (
    <section className={sectionClassName} {...rest}>
      <div className={styles.inner}>
        <LuxeGlassCard className={cardClassNameCombined}>
          <header className={styles.header}>
            {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
            <h2 className={styles.title}>{title}</h2>
            {description ? <div className={styles.description}>{description}</div> : null}
          </header>
          <div className={styles.body}>{children}</div>
        </LuxeGlassCard>
      </div>
    </section>
  );
};

export default LuxeSection;
