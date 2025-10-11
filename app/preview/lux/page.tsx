'use client';

import TreatmentsMenu from '@/components/nav/TreatmentsMenu';
import TreatmentsButtonMenu from '@/components/nav/TreatmentsButtonMenu';
import HeroBand from '@/components/layout/sections/HeroBand';
import TreatmentsGridExact from '@/components/layout/sections/TreatmentsGridExact';
import TestimonialsExact from '@/components/layout/sections/TestimonialsExact';
import FinanceCtaExact from '@/components/layout/sections/FinanceCtaExact';
import TechTeaserExact from '@/components/layout/sections/TechTeaserExact';
import EmergencyExact from '@/components/layout/sections/EmergencyExact';
import BlogPreviewExact from '@/components/layout/sections/BlogPreviewExact';

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* TEMP preview-only mount of the Treatments dropdown (remove once integrated into header) */}
      <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <TreatmentsMenu preview />
      </div>className="fixed top-16 left-1/2 -translate-x-1/2 z-50 hidden md:block">
  <TreatmentsButtonMenu preview />

      <HeroBand />
      <TreatmentsGridExact />
      <TestimonialsExact />
      <FinanceCtaExact />
      <TechTeaserExact />
      <EmergencyExact />
      <BlogPreviewExact />
    </main>
  );
}
