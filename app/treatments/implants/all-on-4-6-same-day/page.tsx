export const metadata = { title: "All-on-4/6 Same Day" };

import React from "react";
import { SchemaInjector } from '@/lib/schema-injector';
// Non-visual structural stub; safe for later brand polish.
export default function Page() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-serif mb-4">{`All-on-4/6 Same Day`}</h1>
      <SchemaInjector route="/treatments/implants/all-on-4-6-same-day" />
      <p className="opacity-70">This is a scaffold page for <strong>{`/treatments/implants/all-on-4-6-same-day`}</strong>.
      TODO: Hook up Champagne brand components, schema, and content.</p>
    </main>
  );
}
