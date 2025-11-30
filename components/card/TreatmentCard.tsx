import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './card-skeleton.module.css';

export interface TreatmentCardProps {
  eyebrow?: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  icon?: ReactNode;
}

export function TreatmentCard({ eyebrow, title, description, ctaLabel, ctaHref = '#', icon }: TreatmentCardProps) {
  return (
    <article className={`${styles['cp-card']} ${styles['cp-card--treatment']}`}>
      {eyebrow ? <span className={styles['cp-card__eyebrow']}>{eyebrow}</span> : null}
      <div className={styles['cp-card__footer']}>
        {icon}
        <h3 className={styles['cp-card__title']}>{title}</h3>
      </div>
      <p className={styles['cp-card__body']}>{description}</p>
      {ctaLabel ? (
        <Link className={styles['cp-card__cta']} href={ctaHref}>
          {ctaLabel}
        </Link>
      ) : null}
    </article>
  );
}
