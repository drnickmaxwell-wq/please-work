'use client';
import { useEffect, useState } from 'react';

export default function CookieBanner(){
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    const v = localStorage.getItem('cookie-consent');
    if(!v) setOpen(true);
  },[]);
  if(!open) return null;
  return (
    <div className="fixed bottom-4 inset-x-4 z-50 rounded-xl p-4 bg-white/95 dark:bg-[#0b1220]/95 border shadow-lg">
      <p className="text-sm">We use essential cookies and, with your consent, analytics to improve your experience.</p>
      <div className="mt-3 flex gap-2">
        <button onClick={()=>{ localStorage.setItem('cookie-consent','essential'); setOpen(false); }} className="px-3 py-1 rounded-md border">Essential only</button>
        <button onClick={()=>{ localStorage.setItem('cookie-consent','all'); setOpen(false); }} className="px-3 py-1 rounded-md bg-gradient-to-r from-pink-600 via-teal-500 to-yellow-500 text-white">Accept all</button>
      </div>
    </div>
  );
}
