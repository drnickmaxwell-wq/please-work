import type { PreviewTreatmentConfig } from "@/lib/treatments/previewTreatmentConfig";

export default function TreatmentPreviewSchema({ config }: { config: PreviewTreatmentConfig }) {
  const breadcrumbList = config.breadcrumbs?.length
    ? {
        "@type": "BreadcrumbList",
        itemListElement: config.breadcrumbs,
      }
    : undefined;

  const fallbackGraph = [
    breadcrumbList,
    {
      "@type": "Service",
      name: config.displayName,
      description: config.shortDescription,
      areaServed: "Shoreham-by-Sea",
      provider: {
        "@type": "Organization",
        name: "St Mary’s House Dental",
      },
    },
    config.howToSteps.length
      ? {
          "@type": "HowTo",
          name: `${config.displayName} process`,
          step: config.howToSteps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.title,
            text: step.summary,
          })),
        }
      : undefined,
    config.faqItems.length
      ? {
          "@type": "FAQPage",
          mainEntity: config.faqItems.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : undefined,
  ].filter(Boolean);

  const graph = (config.schemaGraph as unknown[] | undefined)?.length ? config.schemaGraph : fallbackGraph;

  if (!graph || graph.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
