import type { HTMLAttributes, ReactNode } from "react";

import styles from "@/styles/champagne/luxe/luxe-card.module.css";

type LuxeCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: "default" | "muted" | "highlight";
};

export function LuxeCard({ children, className, variant = "default", ...rest }: LuxeCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ");

  return (
    <div {...rest} className={classes} data-variant={variant}>
      {children}
    </div>
  );
}
