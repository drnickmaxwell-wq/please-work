export const revalidate = 0;
import React from 'react';

// Prefer the same hero component used on the home page.
// Try to import from '@/components/home/HeroLuxury'.
// If that path doesn't exist, locate the hero component used on app/page.tsx and import that instead.
import HeroLuxury from '@/components/home/HeroLuxury';

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[1440px] p-6">
        <HeroLuxury />
      </div>
    </main>
  );
}
