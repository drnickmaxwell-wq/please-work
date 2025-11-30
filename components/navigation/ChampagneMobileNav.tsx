import Link from 'next/link';
import styles from './champagne-nav.module.css';

export interface ChampagneNavLink {
  label: string;
  href: string;
}

export interface ChampagneMobileNavProps {
  links: ChampagneNavLink[];
  id?: string;
}

export function ChampagneMobileNav({ links, id = 'champagne-mobile-nav' }: ChampagneMobileNavProps) {
  return (
    <nav className={styles.mobileNav} aria-label="Mobile navigation" id={id}>
      <ul className={styles.mobileNavList}>
        {links.map((link) => (
          <li key={link.href}>
            <Link className={styles.navItem} href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
