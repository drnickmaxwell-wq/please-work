import type { ReactNode } from 'react';
import styles from './card-skeleton.module.css';

export interface TestimonialCardProps {
  quote: string;
  name: string;
  role?: string;
  avatarUrl?: string;
  rating?: number;
  footerSlot?: ReactNode;
}

export function TestimonialCard({ quote, name, role, avatarUrl, rating = 0, footerSlot }: TestimonialCardProps) {
  return (
    <article className={`glass-card ${styles['cp-card']} ${styles['cp-card--testimonial']}`}>
      <p className={`${styles['cp-card__body']} ${styles['cp-card__quote']} text-lead`}>&ldquo;{quote}&rdquo;</p>
      <div className={styles['cp-card__footer']}>
        {avatarUrl ? <img src={avatarUrl} alt={name} className={styles['cp-card__avatar']} /> : null}
        <div>
          <div className={`${styles['cp-card__title']} text-title`}>{name}</div>
          {role ? <div className={`${styles['cp-card__role']} text-body`}>{role}</div> : null}
          {rating > 0 ? (
            <div className={styles['cp-card__rating']} aria-label={`Rated ${rating} out of 5`}>
              {'★'.repeat(Math.min(5, Math.round(rating)))}
            </div>
          ) : null}
        </div>
      </div>
      {footerSlot}
    </article>
  );
}
