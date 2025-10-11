'use client';
import StickyHeader from '@/components/layout/sticky-header';
import Footer from '@/components/layout/footer';

export default function Page() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0b1220]">
      <StickyHeader />
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white" style={{fontFamily:'Montserrat, sans-serif'}}>Terms & Conditions</h1>
        <div className="mt-6 text-slate-700 dark:text-slate-300" style={{fontFamily:'Lora, serif'}}>
          <p>Terms & conditions placeholder.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
