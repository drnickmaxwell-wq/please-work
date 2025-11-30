'use client';
import StickyHeader from "@/components/layout/sticky-header";
import { FooterLuxe } from "@/components/footer-luxe";
import Link from "next/link";
import FloatingSignatureCards from "@/components/preview/lux/FloatingSignatureCards";

export default function TeamPage() {
  const team = [
    { slug: "dr-sarah", name: "Dr Sarah", role: "Principal Dentist" },
    { slug: "dr-liam", name: "Dr Liam", role: "Implant Dentist" },
    { slug: "anna", name: "Anna", role: "Hygienist" },
  ];
  const signatureCards = [
    {
      name: "Dr Sarah Mason",
      role: "Principal Dentist",
      body: "Champagne preview lead for smile design pathways with calm consultation cadence and digital planning.",
      signature: "Sarah",
      href: "/preview/lux/team/dr-sarah",
    },
    {
      name: "Dr Liam Patel",
      role: "Implant Dentist",
      body: "Guides the implant preview journey, linking 3D viewer placeholders with finance guardrails.",
      signature: "Liam",
      href: "/preview/lux/team/dr-liam",
    },
    {
      name: "Anna Lewis",
      role: "Hygienist",
      body: "Owns soft skills copy and aftercare previews so treatment guests see how support feels in advance.",
      signature: "Anna",
      href: "/preview/lux/team/anna",
    },
    {
      name: "Mia Carter",
      role: "Treatment Coordinator",
      body: "Connects preview CTAs with booking workflows and keeps Manus-ready notes aligned across routes.",
      signature: "Mia",
      href: "/preview/lux/team/mia",
    },
  ];
  return (
    <main className="min-h-screen bg-white dark:bg-[var(--smh-midnight)]">
      <StickyHeader />
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="text-3xl font-bold">Our Team</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {team.map((member) => (
            <Link
              key={member.slug}
              href={`/preview/lux/team/${member.slug}`}
              className="rounded-xl p-4 bg-white/70 dark:bg-white/5 border"
            >
              <div className="aspect-square rounded-lg bg-white/50 dark:bg-white/10 border" />
              <h3 className="mt-3 font-semibold">{member.name}</h3>
              <p className="text-sm opacity-80">{member.role}</p>
            </Link>
          ))}
        </div>
        <div className="mt-12">
          <FloatingSignatureCards items={signatureCards} variant="team" />
        </div>
      </section>
      <FooterLuxe />
    </main>
  );
}