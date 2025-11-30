import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './card-skeleton.module.css';

export interface AIWidgetCardProps {
  title: string;
  description: string;
  tag?: string;
  ctaLabel?: string;
  ctaHref?: string;
  icon?: ReactNode;
}

export function AIWidgetCard({ title, description, tag, ctaLabel, ctaHref = '#', icon }: AIWidgetCardProps) {
  return (
    <article className={`glass-card ${styles['cp-card']} ${styles['cp-card--ai']}`}>
      <div className={styles['cp-card__footer']}>
        {icon}
        <h3 className={`${styles['cp-card__title']} text-title`}>{title}</h3>
      </div>
      {tag ? <span className={`${styles['cp-card__tag']} text-eyebrow`}>{tag}</span> : null}
      <p className={`${styles['cp-card__body']} text-body`}>{description}</p>
      {ctaLabel ? (
        <Link className={`${styles['cp-card__cta']} text-body`} href={ctaHref}>
          {ctaLabel}
        </Link>
      ) : null}
    </article>
  );
}
