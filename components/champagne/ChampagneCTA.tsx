import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import styles from "./ChampagneCTA.module.css";

type ChampagneCTAVariant = "primary" | "secondary";

type ChampagneCTAProps = {
  children: ReactNode;
  href: string;
  variant?: ChampagneCTAVariant;
} & ComponentPropsWithoutRef<typeof Link>;

export default function ChampagneCTA({
  children,
  className,
  href,
  variant = "primary",
  ...linkProps
}: ChampagneCTAProps) {
  const mergedClassName = [styles.cta, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={mergedClassName} {...linkProps}>
      {children}
    </Link>
  );
}
