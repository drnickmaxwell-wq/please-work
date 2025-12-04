"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { HeroFrame } from "./HeroFrame";
import { validateHeroSchema, type HeroSchema } from "@/lib/champagne/hero-schema";

import "@/styles/champagne/hero-engine.css";

type HeroEngineProps = {
  schema: Partial<HeroSchema>;
  enableOutsidePreview?: boolean;
};

export function HeroEngine({ schema, enableOutsidePreview = false }: HeroEngineProps) {
  const pathname = usePathname();
  const isPreviewRoute = pathname?.startsWith("/preview") ?? false;
  const shouldRender = enableOutsidePreview ? true : isPreviewRoute;
  const safeSchema = useMemo(() => validateHeroSchema(schema), [schema]);

  if (!shouldRender) return null;

  return <HeroFrame schema={safeSchema} />;
}
