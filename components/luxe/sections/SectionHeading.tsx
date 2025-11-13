import styles from "@/styles/champagne/luxe/section-heading.module.css";

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
    <header className={styles.wrapper}>
      {eyebrow ? <span className={styles.label}>{eyebrow}</span> : null}
      {label ? <h2 className={styles.heading}>{label}</h2> : null}
      {description ? <p className={styles.description}>{description}</p> : null}
    </header>
  );
}
