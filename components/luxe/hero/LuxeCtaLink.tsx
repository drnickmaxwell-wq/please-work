import type { AnchorHTMLAttributes } from 'react';

import styles from './LuxeCtaLink.module.css';

export type LuxeCtaLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'secondary';
};

const LuxeCtaLink = ({ variant = 'primary', className, ...rest }: LuxeCtaLinkProps) => {
  const variantClassName =
    variant === 'secondary' ? styles.linkSecondary : styles.linkPrimary;
  const classes = [styles.link, variantClassName, className]
    .filter(Boolean)
    .join(' ');

  return <a className={classes} {...rest} />;
};

export default LuxeCtaLink;
