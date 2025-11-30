import type { ReactNode } from 'react';
import { ChampagneHeader } from '../navigation/ChampagneHeader';
import { ChampagneFooter } from '../navigation/ChampagneFooter';

export interface ChampagneLayoutProps {
  children: ReactNode;
}

export function ChampagneLayout({ children }: ChampagneLayoutProps) {
  return (
    <div className="champagne-layout champagne-page">
      <ChampagneHeader />
      <main className="champagne-shell">{children}</main>
      <ChampagneFooter />
    </div>
  );
}
