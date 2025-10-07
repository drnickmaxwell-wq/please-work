'use client';
import StickyHeader from '@/components/layout/sticky-header';
import Footer from '@/components/layout/footer';

export default function Page() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0b1220]">
      <StickyHeader />
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white" style={{fontFamily:'Montserrat, sans-serif'}}>Patient Stories</h1>
        <div className="mt-6 text-slate-700 dark:text-slate-300" style={{fontFamily:'Lora, serif'}}>
          
<div className="grid gap-6 md:grid-cols-3 mt-6">
  {['So calm and professional — I finally love my smile.','Same‑day crown was smooth and painless.','The team are incredibly gentle and kind.'].map((q,i)=>(
    <blockquote key={i} className="rounded-xl p-6 bg-white/70 dark:bg-white/5 border">
      <p>&ldquo;{q}&rdquo;</p>
      <footer className="mt-2 text-sm opacity-70">— Verified Patient</footer>
    </blockquote>
  ))}
</div>

        </div>
      </section>
      <Footer />
    </main>
  );
}
