import Link from 'next/link';
import styles from './champagne-nav.module.css';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Treatments', href: '/treatments' },
  { label: 'Technology', href: '/technology' },
  { label: 'About', href: '/about' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Accessibility', href: '/accessibility' },
];

export function ChampagneFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div>
          <div className={styles.footerHeading}>Contact</div>
          <div className={styles.footerList}>
            <span className={styles.footerMeta}>St Mary&apos;s House Dental</span>
            <span className={styles.footerMeta}>+44 (0)1223 000 000</span>
            <span className={styles.footerMeta}>info@smhdental.com</span>
            <span className={styles.footerMeta}>123 High Street, Cambridge</span>
          </div>
        </div>
        <div>
          <div className={styles.footerHeading}>Navigation</div>
          <ul className={styles.footerList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link className={styles.footerLink} href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className={styles.footerHeading}>Legal</div>
          <ul className={styles.footerList}>
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link className={styles.footerLink} href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <span>© {new Date().getFullYear()} SMH Dental. All rights reserved.</span>
        <span className={styles.footerMeta}>Structural skeleton for Champagne ecosystem.</span>
      </div>
    </footer>
  );
}
