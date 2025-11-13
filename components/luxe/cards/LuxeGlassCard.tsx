import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import styles from './LuxeGlassCard.module.css';

export type LuxeGlassCardProps<T extends ElementType = 'div'> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

const LuxeGlassCard = <T extends ElementType = 'div'>({
  as,
  className,
  children,
  ...rest
}: LuxeGlassCardProps<T>) => {
  const Component = (as ?? 'div') as ElementType;
  const classes = [styles.card, className].filter(Boolean).join(' ');

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};

export default LuxeGlassCard;
