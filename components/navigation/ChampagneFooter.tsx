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
          <div className={`${styles.footerHeading} text-eyebrow`}>Contact</div>
          <div className={styles.footerList}>
            <span className={`${styles.footerMeta} text-body`}>St Mary&apos;s House Dental</span>
            <span className={`${styles.footerMeta} text-body`}>+44 (0)1223 000 000</span>
            <span className={`${styles.footerMeta} text-body`}>info@smhdental.com</span>
            <span className={`${styles.footerMeta} text-body`}>123 High Street, Cambridge</span>
          </div>
        </div>
        <div>
          <div className={`${styles.footerHeading} text-eyebrow`}>Navigation</div>
          <ul className={styles.footerList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link className={`${styles.footerLink} text-body`} href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className={`${styles.footerHeading} text-eyebrow`}>Legal</div>
          <ul className={styles.footerList}>
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link className={`${styles.footerLink} text-body`} href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <span>© {new Date().getFullYear()} SMH Dental. All rights reserved.</span>
        <span className={`${styles.footerMeta} text-body`}>Structural skeleton for Champagne ecosystem.</span>
      </div>
    </footer>
  );
}
