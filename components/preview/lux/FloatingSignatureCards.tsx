import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { luxClasses } from "@/lib/champagne/lux";
import "@/styles/champagne/lux/components.css";

import styles from "./floating-signature-cards.module.css";

export type FloatingSignatureCardItem = {
  name: string;
  role?: string;
  body: string;
  signature?: string;
  href?: string;
  avatarSrc?: string;
};

export type FloatingSignatureCardsProps = {
  items: FloatingSignatureCardItem[];
  variant?: "team" | "story";
};

export function FloatingSignatureCards({ items, variant = "team" }: FloatingSignatureCardsProps) {
  const eyebrow = variant === "story" ? "Story voices" : "Team";
  const title = variant === "story" ? "Featured storytellers" : "Clinician highlights";

  return (
    <section className={styles.shell} aria-label={title}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.grid}>
        {items.map((item) => {
          const className = clsx(luxClasses.glassCardLifted, luxClasses.hoverBloom, styles.card);

          const content = (
            <>
              <div className={styles.meta}>
                {item.avatarSrc ? (
                  <Image alt={item.name} className={styles.avatar} height={72} src={item.avatarSrc} width={72} />
                ) : (
                  <div className={styles.avatar} aria-hidden />
                )}
                <div className={styles.heading}>
                  <span className={styles.name}>{item.name}</span>
                  {item.role ? <span className={styles.role}>{item.role}</span> : null}
                </div>
              </div>
              <p className={styles.body}>{item.body}</p>
              {item.signature ? <p className={styles.signature}>{item.signature}</p> : null}
            </>
          );

          if (item.href) {
            return (
              <Link key={item.name} className={className} href={item.href}>
                {content}
              </Link>
            );
          }

          return (
            <div key={item.name} className={className}>
              {content}
            </div>
          );
        })}
      </div>
      <p className={styles.footerNote}>Preview-only lux cards honour Champagne motion language with PRM fallbacks.</p>
    </section>
  );
}

export default FloatingSignatureCards;
