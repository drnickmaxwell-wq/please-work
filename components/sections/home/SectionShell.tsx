import type { ReactNode } from "react";

import styles from "./homepage-sections.module.css";

type SectionShellProps = {
  id?: string;
  ariaLabelledby?: string;
  tone?: "ink" | "paper";
  className?: string;
  children: ReactNode;
};

export default function SectionShell({
  id,
  ariaLabelledby,
  tone = "ink",
  className,
  children,
}: SectionShellProps) {
  const toneClass = tone === "paper" ? styles.paperTone : styles.inkTone;

  return (
    <section id={id} aria-labelledby={ariaLabelledby} className={`${styles.sectionShell} ${toneClass} ${className ?? ""}`}>
      <div className={`${styles.sectionInner} mx-auto max-w-6xl px-4`}>{children}</div>
    </section>
  );
}
