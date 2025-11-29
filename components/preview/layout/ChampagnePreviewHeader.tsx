"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import { champagnePreviewNav } from "@/config/champagne/header-nav";
import styles from "./champagne-preview-header.module.css";

export default function ChampagnePreviewHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentPath = useMemo(() => pathname ?? "", [pathname]);

  return (
    <header className={styles.cpvHeader}>
      <div className={styles.cpvHeaderInner}>
        <div className={`${styles.cpvHeaderRow} flex-wrap`}>
          <div className={styles.brandBlock}>
            <span className={styles.brandTitle}>St Mary&apos;s House Dental</span>
            <span className={styles.brandSubline}>Shoreham-by-Sea · Private Dentistry</span>
          </div>

          <div className="flex flex-1 items-center justify-end gap-3">
            <div className={`${styles.quickBar} text-sm`}> 
              <div className={styles.quickStrip}>
                <Link href="tel:01273453109" className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]">
                  Emergency: <strong>01273 453109</strong>
                </Link>
                <span aria-live="polite">Open today 9AM–5PM</span>
              </div>
            </div>

            <Link
              href="/contact"
              className={`${styles.bookButton} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]`}
            >
              Book online
            </Link>

            <button
              type="button"
              className={`${styles.hamburger} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)] lg:hidden`}
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="cpv-mobile-nav"
            >
              <span className="sr-only">Toggle navigation</span>
              <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>

        <div className={`${styles.cpvHeaderRow} gap-6`}>
          <nav aria-label="Champagne preview" className={`${styles.navLinks} w-full justify-end`}>
            {champagnePreviewNav.map((item) => {
              const isActive =
                item.href === "/preview/home"
                  ? currentPath === item.href
                  : currentPath.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={isActive}
                  className={`${styles.navLink} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-gold)]`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {isOpen ? (
        <div id="cpv-mobile-nav" className={styles.mobileNav}>
          <nav aria-label="Champagne preview mobile" className="grid gap-2">
            {champagnePreviewNav.map((item) => {
              const isActive =
                item.href === "/preview/home"
                  ? currentPath === item.href
                  : currentPath.startsWith(item.href);

              return (
                <Link
                  key={`mobile-${item.href}`}
                  href={item.href}
                  data-active={isActive}
                  className={`${styles.mobileLink} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold)]`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
