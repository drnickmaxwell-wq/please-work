'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './champagne-nav.module.css';
import type { ChampagneNavLink } from './ChampagneMobileNav';
import { ChampagneMobileNav } from './ChampagneMobileNav';

const NAV_LINKS: ChampagneNavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Treatments', href: '/treatments' },
  { label: 'Technology', href: '/technology' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Patient Portal', href: '/portal' },
];

export function ChampagneHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={`${styles.logo} text-eyebrow`} aria-label="St Mary&apos;s House Dental home">
          SMH Dental
        </Link>
        <nav aria-label="Primary" className={styles.navList}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} className={`${styles.navItem} text-body`} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className={styles.mobileButton}
          aria-expanded={open}
          aria-controls="champagne-mobile-nav"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span aria-hidden="true">☰</span>
          <span className="sr-only">Toggle navigation</span>
        </button>
      </div>
      {open ? <ChampagneMobileNav links={NAV_LINKS} /> : null}
    </header>
  );
}
