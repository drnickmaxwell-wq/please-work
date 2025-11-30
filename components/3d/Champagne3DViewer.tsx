import styles from '../card/card-skeleton.module.css';

export interface Champagne3DViewerProps {
  title?: string;
  description?: string;
  placeholderText?: string;
}

export function Champagne3DViewer({
  title = '3D viewer placeholder',
  description = 'Drop in your 3D model or interactive canvas here.',
  placeholderText = '3D viewport — awaiting integration',
}: Champagne3DViewerProps) {
  return (
    <div className={`glass-soft ${styles['cp-card']} space-block`}>
      <div className={styles['cp-card__stacked']}>
        <h3 className={`${styles['cp-card__title']} text-title`}>{title}</h3>
        <p className={`${styles['cp-card__body']} text-body`}>{description}</p>
      </div>
      <div className={styles['cp-card__media']} role="presentation" aria-label="3D viewer placeholder">
        <div
          style={{
            display: 'grid',
            placeItems: 'center',
            height: '100%',
            color: 'color-mix(in srgb, var(--brand-white) 75%, var(--bg-ink) 25%)',
            textAlign: 'center',
            padding: '0.75rem',
            fontWeight: 600,
          }}
        >
          {placeholderText}
        </div>
      </div>
    </div>
  );
}
