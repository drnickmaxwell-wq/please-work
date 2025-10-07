'use client';
import StickyHeader from '@/components/layout/sticky-header';
import Footer from '@/components/layout/footer';

export default function Page() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0b1220]">
      <StickyHeader />
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white" style={{fontFamily:'Montserrat, sans-serif'}}>Our Team</h1>
        <div className="mt-6 text-slate-700 dark:text-slate-300" style={{fontFamily:'Lora, serif'}}>
          
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
  {['Dr Sarah','Dr Liam','Hygienist Anna'].map((n,i)=>(
    <div key={i} className="rounded-xl p-4 bg-white/70 dark:bg-white/5 border">
      <div className="aspect-square rounded-lg bg-white/50 dark:bg-white/10 border" />
      <h3 className="mt-3 font-semibold">{n}</h3>
      <p className="text-sm opacity-80">Bio coming soon.</p>
    </div>
  ))}
</div>

        </div>
      </section>
      <Footer />
    </main>
  );
}
