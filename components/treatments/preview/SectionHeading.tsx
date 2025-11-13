import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  label?: string;
  eyebrow?: string;
  description?: string;
};

export function SectionHeading({ label, eyebrow, description }: SectionHeadingProps) {
  if (!label && !eyebrow && !description) {
    return null;
  }

  return (
    <header className={styles.heading}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      {label ? <h2 className={styles.label}>{label}</h2> : null}
      {description ? <p className={styles.description}>{description}</p> : null}
    </header>
  );
}
