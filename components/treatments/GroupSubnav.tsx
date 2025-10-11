'use client';
import Link from 'next/link';

export default function GroupSubnav({ items }:{ items: { href: string; label: string }[] }){
  return (
    <nav className="sticky top-16 z-30 bg-white/80 backdrop-blur border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 py-2 flex flex-wrap gap-2">
        {items.map(it => (
          <Link key={it.href} href={it.href}
            className="rounded-full px-3 py-1 text-sm border border-black/10 hover:bg-slate-50">
            {it.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
