'use client';
import Link from 'next/link';
import { useState } from 'react';
import { treatmentGroups } from '@/components/nav/TreatmentsData';

export default function TreatmentsMenu({ preview=false }:{ preview?: boolean }){
  const [open, setOpen] = useState(false);

  return (
    <div className="relative group">
      {/* Trigger */}
      <button
        onClick={()=>setOpen(o=>!o)}
        onMouseEnter={()=>setOpen(true)}
        onMouseLeave={()=>setOpen(false)}
        className="relative hidden md:inline-flex items-center gap-1 py-1 text-slate-700 hover:text-slate-900"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Treatments
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full
                         bg-gradient-to-r from-[#C2185B] via-[#40C4B4] to-[#D4AF37]
                         opacity-0 group-hover:opacity-100 transition" />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/2 mt-3 w-[min(92vw,960px)] rounded-2xl border border-black/5 bg-white/95 backdrop-blur shadow-2xl z-50"
          onMouseEnter={()=>setOpen(true)}
          onMouseLeave={()=>setOpen(false)}
        >
          <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
            {treatmentGroups.map(group => (
              <div key={group.title}>
                <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">{group.title}</div>
                <ul className="space-y-2">
                  {group.items.map(it => (
                    <li key={it.href}>
                      <Link
                        href={preview ? ('/preview/lux' + it.href) : it.href}
                        className="block rounded-md px-2 py-1 hover:bg-slate-50 hover:text-slate-900 text-slate-700"
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile fallback */}
      <details className="md:hidden mt-2">
        <summary className="py-1 text-slate-700">Treatments</summary>
        <div className="mt-2 grid gap-6">
          {treatmentGroups.map(group => (
            <div key={group.title}>
              <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">{group.title}</div>
              <ul className="space-y-1">
                {group.items.map(it => (
                  <li key={it.href}>
                    <Link
                      href={preview ? ('/preview/lux' + it.href) : it.href}
                      className="block rounded-md px-2 py-1 hover:bg-slate-50 text-slate-700"
                    >
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
