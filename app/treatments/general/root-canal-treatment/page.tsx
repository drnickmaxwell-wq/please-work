export const metadata = { title: "Root Canal Treatment" };

import React from "react";
import { SchemaInjector } from '@/lib/schema-injector';
// Non-visual structural stub; safe for later brand polish.
export default function Page() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-serif mb-4">{`Root Canal Treatment`}</h1>
      <SchemaInjector route="/treatments/general/root-canal-treatment" />
      <p className="opacity-70">This is a scaffold page for <strong>{`/treatments/general/root-canal-treatment`}</strong>.
      TODO: Hook up Champagne brand components, schema, and content.</p>
    </main>
  );
}
