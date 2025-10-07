'use client';
import React from 'react';

function BrandGradient({ className='' }:{ className?: string }){
  return (
    <div className={className} aria-hidden="true">
      <div className="absolute inset-0" style={{background:
        'radial-gradient(1200px circle at 20% 20%, rgba(194,24,91,0.60), transparent 60%),'+
        'radial-gradient(1000px circle at 80% 30%, rgba(64,196,180,0.50), transparent 60%),'+
        'radial-gradient(900px circle at 50% 80%, rgba(212,175,55,0.35), transparent 60%)'}}/>
    </div>
  );
}

export default function Page(){
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO with gradient fallback */}
      <section className="relative w-full h-[min(100svh,100vh)] overflow-hidden">
        <BrandGradient className="absolute inset-0 -z-10" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-bold" style={{fontFamily:'Montserrat, sans-serif'}}>
              <span className="bg-gradient-to-r from-pink-600 via-teal-500 to-yellow-500 bg-clip-text text-transparent">
                St Mary&apos;s House — Preview
              </span>
            </h1>
            <p className="mt-4 opacity-80" style={{fontFamily:'Lora, serif'}}>
              Safe preview page. Your video can be added later; the wave sits below the hero.
            </p>
          </div>
        </div>
      </section>

      {/* Wave below hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10"
             style={{backgroundImage:'url(/brand/waves/waves-bg.webp)', backgroundSize:'cover', backgroundPosition:'center'}}/>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold" style={{fontFamily:'Montserrat, sans-serif'}}>Wave sits below the hero</h2>
          <p className="opacity-80" style={{fontFamily:'Lora, serif'}}>Once packs are merged, this becomes your screenshots-exact homepage.</p>
        </div>
      </section>
    </main>
  );
}
