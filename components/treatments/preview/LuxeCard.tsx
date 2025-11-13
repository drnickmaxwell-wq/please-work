import type { ReactNode } from "react";

import styles from "./LuxeCard.module.css";

type LuxeCardTone = "default" | "frosted" | "ink";

type LuxeCardProps = {
  tone?: LuxeCardTone;
  className?: string;
  children: ReactNode;
};

const toneClass: Record<LuxeCardTone, string> = {
  default: styles.toneDefault,
  frosted: styles.toneFrosted,
  ink: styles.toneInk,
};

const join = (...tokens: Array<string | false | null | undefined>) =>
  tokens.filter(Boolean).join(" ");

export function LuxeCard({ tone = "default", className, children }: LuxeCardProps) {
  return <div className={join(styles.card, toneClass[tone], className)}>{children}</div>;
}
