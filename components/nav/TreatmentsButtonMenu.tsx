'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { treatmentGroups, MenuGroup } from '@/components/nav/TreatmentsData';

type Props = { preview?: boolean };

export default function TreatmentsButtonMenu({ preview = false }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<MenuGroup | null>(treatmentGroups[0] ?? null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click / Esc
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick, true);
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('mousedown', onClick, true);
      document.removeEventListener('keydown', onKey, true);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Gradient hamburger button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-white font-semibold
                   bg-gradient-to-r from-[#C2185B] via-[#40C4B4] to-[#D4AF37]
                   shadow-lg hover:shadow-xl transition"
      >
        {/* 3 lines icon */}
        <span className="flex flex-col gap-[3px]">
          <span className="block w-4 h-[2px] bg-white rounded" />
          <span className="block w-4 h-[2px] bg-white rounded" />
          <span className="block w-4 h-[2px] bg-white rounded" />
        </span>
        <span>Treatments</span>
      </button>

      {/* Dropdown aligned under button (never full-page) */}
      {open && (
        <div
          className="absolute right-0 mt-3 w-[min(92vw,860px)] rounded-2xl border border-black/5
                     bg-white/95 backdrop-blur shadow-2xl z-50"
          role="dialog"
        >
          <div className="grid md:grid-cols-[240px_1fr]">
            {/* Left: group names only */}
            <div className="p-4 border-b md:border-b-0 md:border-r border-black/5 max-h-[52vh] overflow-auto">
              <ul className="space-y-1">
                {treatmentGroups.map(group => (
                  <li key={group.title}>
                    <button
                      onClick={() => setActive(group)}
                      className="w-full text-left px-3 py-2 rounded-md flex items-center justify-between
                                 hover:bg-slate-50 transition group"
                    >
                      <span className="relative inline-block font-semibold
                                       bg-gradient-to-r from-[#C2185B] via-[#40C4B4] to-[#D4AF37]
                                       bg-clip-text text-transparent">
                        {group.title}
                        <span className="absolute inset-0 pointer-events-none overflow-hidden">
                          <span className="block h-full w-10 -translate-x-10 skew-x-12
                                           bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent
                                           opacity-0 group-hover:opacity-100
                                           transition-transform duration-500 group-hover:translate-x-[120%]" />
                        </span>
                      </span>
                      <span className="text-slate-400">›</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: submenu for active group */}
            <div className="p-4 max-h-[52vh] overflow-auto">
              {!active ? (
                <div className="text-slate-500 text-sm px-3 py-2">Select a group to view pages.</div>
              ) : (
                <>
                  <div className="text-xs uppercase tracking-wide text-slate-500 mb-2 px-2">
                    {active.title}
                  </div>
                  <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
                    {active.items.map(it => {
                      const href = preview ? ('/preview/lux' + it.href) : it.href;
                      return (
                        <li key={href}>
                          <Link
                            href={href}
                            className="block rounded-md px-3 py-2 text-slate-700
                                       hover:bg-slate-50 hover:text-slate-900 transition"
                            onClick={() => setOpen(false)}
                          >
                            <span className="relative inline-block bg-gradient-to-r
                                             from-[#C2185B] via-[#40C4B4] to-[#D4AF37]
                                             bg-clip-text text-transparent font-medium">
                              {it.label}
                              <span className="absolute inset-0 pointer-events-none overflow-hidden">
                                <span className="block h-full w-8 -translate-x-10 skew-x-12
                                                 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent
                                                 opacity-0 hover:opacity-100 transition-transform duration-500
                                                 group-hover:translate-x-[120%]" />
                              </span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
