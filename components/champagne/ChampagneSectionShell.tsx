import { ReactNode } from "react";

import styles from "./ChampagneSectionShell.module.css";
import { TreatmentVariantKey, TREATMENT_VARIANTS } from "./ChampagneTreatmentHero";

type ChampagneSectionShellProps = {
  id?: string;
  treatmentKey: TreatmentVariantKey;
  label?: string;
  children: ReactNode;
  tone?: "default" | "muted" | "highlight";
};

export function ChampagneSectionShell({
  id,
  treatmentKey,
  label,
  children,
  tone = "default",
}: ChampagneSectionShellProps) {
  const variant = TREATMENT_VARIANTS[treatmentKey];

  return (
    <section
      aria-labelledby={label ? `${id ?? treatmentKey}-section-label` : undefined}
      className={styles.sectionRoot}
      data-tone={tone}
      data-variant={treatmentKey}
      data-wave={variant.waveIntensity}
      id={id}
    >
      <div className={styles.inner}>
        {label ? (
          <header className={styles.header}>
            <span className={styles.label} id={`${id ?? treatmentKey}-section-label`}>
              {label}
            </span>
          </header>
        ) : null}
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
