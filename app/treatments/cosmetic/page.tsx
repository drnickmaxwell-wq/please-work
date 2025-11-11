export const metadata = { title: "Cosmetic Dentistry" };

import React from "react";
import { SchemaInjector } from '@/lib/schema-injector';
// Non-visual structural stub; safe for later brand polish.
export default function Page() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-serif mb-4">{`Cosmetic Dentistry`}</h1>
      <SchemaInjector route="/treatments/cosmetic" />
      <p className="opacity-70">This is a scaffold page for <strong>{`/treatments/cosmetic`}</strong>.
      TODO: Hook up Champagne brand components, schema, and content.</p>
    </main>
  );
}
