import type { ReactNode } from "react";

import { TreatmentHeroVariant } from "../ChampagneTreatmentHero";
import styles from "./LuxeSection.module.css";
import { SectionHeading } from "./SectionHeading";

type LuxeSectionProps = {
  id?: string;
  variant: TreatmentHeroVariant;
  label?: string;
  eyebrow?: string;
  description?: string;
  tone?: "default" | "muted" | "highlight";
  children: ReactNode;
};

export function LuxeSection({
  id,
  variant,
  label,
  eyebrow,
  description,
  tone = "default",
  children,
}: LuxeSectionProps) {
  return (
    <section
      id={id}
      className={styles.section}
      data-variant={variant}
      data-tone={tone}
    >
      <div className={styles.inner}>
        {label || eyebrow || description ? (
          <SectionHeading label={label} eyebrow={eyebrow} description={description} />
        ) : null}
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
