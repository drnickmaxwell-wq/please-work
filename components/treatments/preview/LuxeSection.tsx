import type { ReactNode } from "react";

import { type ChampagneTreatmentHeroTone } from "../ChampagneTreatmentHero";
import styles from "./LuxeSection.module.css";
import { SectionHeading } from "./SectionHeading";

type LuxeSectionProps = {
  id?: string;
  tone: ChampagneTreatmentHeroTone;
  label?: string;
  eyebrow?: string;
  description?: string;
  surfaceTone?: "default" | "muted" | "highlight";
  children: ReactNode;
};

export function LuxeSection({
  id,
  tone,
  label,
  eyebrow,
  description,
  surfaceTone = "default",
  children,
}: LuxeSectionProps) {
  return (
    <section id={id} className={styles.section} data-tone={tone} data-surface-tone={surfaceTone}>
      <div className={styles.inner}>
        {label || eyebrow || description ? (
          <SectionHeading label={label} eyebrow={eyebrow} description={description} />
        ) : null}
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
