'use client';
import StickyHeader from '@/components/layout/sticky-header';
import Footer from '@/components/layout/footer';

export default function Technology(){
  return (
    <main className="min-h-screen bg-white dark:bg-[#0b1220]">
      <StickyHeader />
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="text-3xl font-bold">3D & Digital Technology</h1>
        <p className="mt-2 opacity-80">Precision scanners, same‑day crowns, AR smile previews and gentle comfort tech.</p>
        <div className="mt-6 aspect-[16/9] rounded-xl bg-white/60 dark:bg-white/5 border grid place-items-center">3D viewer placeholder</div>
      </section>
      <Footer />
    </main>
  );
}