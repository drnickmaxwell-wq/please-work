import styles from './ThreeDViewerSlot.module.css';

export default function ThreeDViewerSlot() {
  return (
    <div aria-label="3D viewer placeholder" className={styles.slot} role="group">
      <span className={styles.label}>
        <span aria-hidden className={styles.badge} />
        3D viewer slot
      </span>
      <div className={styles.frame}>
        <p className={styles.message}>
          Reserved space for interactive alignment once the Champagne 3D model pipeline connects.
        </p>
      </div>
      <p className={styles.caption}>
        Drop in the production {'<model-viewer>'} mount when assets are approved to replace this placeholder.
      </p>
    </div>
  );
}
