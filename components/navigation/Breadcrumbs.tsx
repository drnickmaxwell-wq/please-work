'use client';

import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useMemo } from 'react';

import styles from './breadcrumbs.module.css';

const LABEL_MAP: Record<string, string> = {
  '3d-dentistry': '3D Dentistry',
  'composite-bonding': 'Composite Bonding',
  'dental-implants': 'Dental Implants',
  implants: 'Dental Implants',
  technology: 'Technology',
  veneers: 'Porcelain Veneers',
  whitening: 'Teeth Whitening',
  cosmetic: 'Cosmetic Dentistry',
  general: 'General Dentistry',
  orthodontics: 'Orthodontics',
};

const formatSegment = (segment: string) => {
  const mapped = LABEL_MAP[segment];
  if (mapped) {
    return mapped;
  }

  return segment
    .split('-')
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(' ');
};

export type BreadcrumbsProps = {
  className?: string;
};

export default function Breadcrumbs({ className }: BreadcrumbsProps) {
  const segments = useSelectedLayoutSegments();

  const crumbs = useMemo(() => {
    const base = [
      { href: '/', label: 'Home' },
      { href: '/treatments', label: 'Treatments' },
    ];

    if (!segments.length) {
      return base;
    }

    return base.concat(
      segments.map((segment, index) => ({
        href: `/treatments/${segments.slice(0, index + 1).join('/')}`,
        label: formatSegment(segment),
      })),
    );
  }, [segments]);

  const lastIndex = crumbs.length - 1;

  return (
    <nav className={`${styles.wrapper}${className ? ` ${className}` : ''}`} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {crumbs.map((crumb, index) => {
          const isCurrent = index === lastIndex;
          return (
            <li key={crumb.href} className={styles.item}>
              {isCurrent ? (
                <span className={`${styles.link} ${styles.current}`} aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link className={styles.link} href={crumb.href}>
                  {crumb.label}
                </Link>
              )}
              {index < lastIndex ? <span className={styles.separator} aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
