import fs from "fs";
import path from "path";

import breadcrumbsPack from "@/config/seo/schema/Treatments_Breadcrumbs.json";
import schemaPack from "@/config/seo/Treatments_Schema_Pack.json";
import schemaPackV2 from "@/config/seo/schema/Treatments_Schema_Pack_v2.json";
import schemaPackV3 from "@/config/seo/schema/Treatments_Schema_Pack_v3.json";

export type PreviewHowToStep = { title: string; summary: string };
export type PreviewFaq = { question: string; answer: string };
export type PreviewBreadcrumb = { name: string; item: string; position: number };

export type AnswerFirstCopy = {
  featuredSnippet?: string;
  aiOverview?: string;
};

export type PreviewTreatmentConfig = {
  slug: string;
  route: string;
  displayName: string;
  shortDescription?: string;
  answerFirst?: AnswerFirstCopy;
  benefits: string[];
  howToSteps: PreviewHowToStep[];
  faqItems: PreviewFaq[];
  breadcrumbs?: PreviewBreadcrumb[];
  schemaGraph?: unknown[];
};

type SchemaRoute = {
  "@context"?: string;
  "@graph"?: unknown[];
};

type HowToSchema = {
  "@type": string | string[];
  name?: string;
  step?: { name?: string; text?: string }[];
};

type ServiceSchema = {
  "@type": string | string[];
  name?: string;
  description?: string;
};

type FaqSchema = {
  "@type": string | string[];
  mainEntity?: { name?: string; acceptedAnswer?: { text?: string } }[];
};

type BreadcrumbSchema = {
  itemListElement?: { name?: string; item?: string; position?: number }[];
};

const answerFirstCopyMap = buildAnswerFirstCopy();
const schemaSources = [schemaPackV2.routes, schemaPackV3.routes, schemaPack.routes];

const routeMap: Record<string, string> = {
  veneers: "/treatments/veneers",
  implants: "/treatments/implants",
  "dental-implants": "/treatments/implants",
  orthodontics: "/treatments/orthodontics/spark-aligners",
  whitening: "/treatments/whitening",
  "composite-bonding": "/treatments/composite-bonding",
  cosmetic: "/treatments/cosmetic",
  general: "/treatments/general",
  technology: "/treatments/technology",
  "3d-dentistry": "/treatments/3d-dentistry",
};

function buildAnswerFirstCopy(): Record<string, AnswerFirstCopy> {
  const filePath = path.join(process.cwd(), "config/seo/Treatments_AnswerFirst_Copy.md");
  const raw = fs.readFileSync(filePath, "utf-8");
  const sections = raw.split(/^##\s+/gm).filter(Boolean);
  const map: Record<string, AnswerFirstCopy> = {};

  for (const section of sections) {
    const [headingLine, ...rest] = section.split(/\r?\n/);
    if (!headingLine) continue;
    const route = headingLine.trim();
    if (!route.startsWith("/treatments")) continue;
    const body = rest.join("\n");
    const featuredSnippetMatch = /\*\*Featured Snippet[^*]*\*\*\s*([\s\S]*?)(?=\n\*\*AI Overview|\n##|$)/im.exec(body);
    const aiOverviewMatch = /\*\*AI Overview[^*]*\*\*\s*([\s\S]*?)(?=\n##|$)/im.exec(body);

    map[route] = {
      featuredSnippet: featuredSnippetMatch?.[1]?.trim(),
      aiOverview: aiOverviewMatch?.[1]?.trim(),
    };
  }

  return map;
}

function coerceArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function extractFromGraph<T>(graph: unknown[] | undefined, type: string): T | undefined {
  if (!graph) return undefined;
  return graph.find((node) => {
    if (!node || typeof node !== "object") return false;
    // @ts-expect-error dynamic access
    const nodeType = node["@type"];
    if (!nodeType) return false;
    return coerceArray<string>(nodeType).includes(type);
  }) as T | undefined;
}

function normaliseSlug(slug: string): string {
  return slug.replace(/%5B|%5D/gi, "").replace(/\s+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
}

function formatTitleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function deriveBenefitsFromCopy(answerFirst?: AnswerFirstCopy, fallback?: string): string[] {
  const source = answerFirst?.featuredSnippet ?? fallback ?? "";
  return source
    .split(/[.!?]\s+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4);
}

function deriveHowToSteps(howTo?: HowToSchema): PreviewHowToStep[] {
  if (!howTo?.step) return [];
  return howTo.step
    .map((step, index) => ({
      title: step.name ?? `Step ${index + 1}`,
      summary: step.text ?? "Awaiting step detail.",
    }))
    .filter((step) => step.title || step.summary);
}

function deriveFaqs(faqSchema?: FaqSchema): PreviewFaq[] {
  if (!faqSchema?.mainEntity) return [];
  return faqSchema.mainEntity
    .map((entity) => ({
      question: entity.name ?? "Question awaiting copy",
      answer: entity.acceptedAnswer?.text ?? "Answer-first copy placeholder.",
    }))
    .filter((item) => item.question || item.answer);
}

export function getPreviewTreatmentConfig(slug: string): PreviewTreatmentConfig {
  const normalisedSlug = normaliseSlug(slug);
  const route = routeMap[normalisedSlug] ?? `/treatments/${normalisedSlug}`;
  const schemaRoute = schemaSources.find((routes) => routes?.[route])?.[route] as SchemaRoute | undefined;
  const graph = schemaRoute?.["@graph"];
  const service = extractFromGraph<ServiceSchema>(graph, "Service");
  const howTo = extractFromGraph<HowToSchema>(graph, "HowTo");
  const faq = extractFromGraph<FaqSchema>(graph, "FAQPage");
  const breadcrumbs = (breadcrumbsPack.breadcrumbs?.[route] as BreadcrumbSchema | undefined)?.itemListElement;

  const answerFirst = answerFirstCopyMap[route];
  const displayName = service?.name ?? formatTitleFromSlug(normalisedSlug);
  const benefits = deriveBenefitsFromCopy(answerFirst, service?.description);
  const howToSteps = deriveHowToSteps(howTo);
  const faqItems = deriveFaqs(faq);
  const shortDescription = answerFirst?.featuredSnippet ?? service?.description;

  return {
    slug: normalisedSlug,
    route,
    displayName,
    shortDescription,
    answerFirst,
    benefits,
    howToSteps,
    faqItems,
    breadcrumbs: breadcrumbs?.map((crumb) => ({
      name: crumb.name ?? "",
      item: crumb.item ?? "",
      position: crumb.position ?? 0,
    })),
    schemaGraph: graph,
  };
}

export function buildPreviewMetadata(slug: string) {
  const config = getPreviewTreatmentConfig(slug);
  const title = `${config.displayName} preview | Champagne treatments`;
  return {
    title,
    description:
      config.shortDescription ??
      `${config.displayName} preview canvas with schema-aligned hero, 3D slot, how it works, pricing, tech, and FAQs ready for Champagne testing.`,
  };
}
