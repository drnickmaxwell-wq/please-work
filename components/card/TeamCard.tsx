import type { ReactNode } from 'react';
import styles from './card-skeleton.module.css';

export interface TeamCardProps {
  name: string;
  role: string;
  bio?: string;
  avatarUrl?: string;
  meta?: ReactNode;
}

export function TeamCard({ name, role, bio, avatarUrl, meta }: TeamCardProps) {
  return (
    <article className={`glass-card ${styles['cp-card']} ${styles['cp-card--team']}`}>
      <div className={styles['cp-card__footer']}>
        {avatarUrl ? <img src={avatarUrl} alt={name} className={styles['cp-card__avatar']} /> : null}
        <div className={styles['cp-card__stacked']}>
          <h3 className={`${styles['cp-card__title']} text-title`}>{name}</h3>
          <span className={`${styles['cp-card__role']} text-body`}>{role}</span>
        </div>
      </div>
      {bio ? <p className={`${styles['cp-card__body']} text-body`}>{bio}</p> : null}
      {meta}
    </article>
  );
}
