import Link from "next/link";
import clsx from "clsx";

import { luxClasses } from "@/lib/champagne/lux";
import "@/styles/champagne/lux/components.css";

import styles from "./gold-refract-cta-bar.module.css";

export type GoldRefractCtaBarProps = {
  title: string;
  body?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  context?: "home" | "treatment" | "story";
};

const KICKER_COPY: Record<NonNullable<GoldRefractCtaBarProps["context"]>, string> = {
  home: "Preview cta",
  treatment: "Treatment next steps",
  story: "Story bridge",
};

export function GoldRefractCtaBar({
  title,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  context,
}: GoldRefractCtaBarProps) {
  const kicker = context ? KICKER_COPY[context] : "Champagne preview";

  return (
    <section className={clsx(luxClasses.ctaBar, luxClasses.hoverBloom, styles.wrapper)} aria-label={title}>
      <div className="lux-cta-bar-edge" aria-hidden />
      <div className={styles.edgePanel} aria-hidden />
      <div className="lux-cta-bar-shimmer" aria-hidden />
      <div className={clsx(styles.inner)}>
        <div className={styles.copy}>
          <span className={styles.kicker}>{kicker}</span>
          <h2 className={styles.title}>{title}</h2>
          {body ? <p className={styles.body}>{body}</p> : null}
        </div>
        <div className={styles.actions}>
          <Link className={clsx(styles.action, styles.primary)} href={primaryHref}>
            {primaryLabel}
          </Link>
          {secondaryHref && secondaryLabel ? (
            <Link className={clsx(styles.action, styles.secondary)} href={secondaryHref}>
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
      <div className={styles.shimmer} aria-hidden />
    </section>
  );
}

export default GoldRefractCtaBar;
