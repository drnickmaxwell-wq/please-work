export const dynamic = 'force-static';
export const revalidate = 0;

import type { Metadata } from 'next';

import BreadcrumbBar from '@/components/preview/treatments/BreadcrumbBar';
import BenefitsCapsules, { type BenefitCapsule } from '@/components/preview/treatments/BenefitsCapsules';
import FaqAccordion from '@/components/preview/treatments/FaqAccordion';
import HowToRail from '@/components/preview/treatments/HowToRail';
import PreviewHero, { type PreviewHeroBadge } from '@/components/preview/treatments/PreviewHero';
import Viewer3DSlot from '@/components/preview/treatments/Viewer3DSlot';
import { DevHud, shouldShowHud } from '@/components/preview/Hud';
import {
  type TreatmentPreviewContent,
  loadTreatmentPreviewContent,
} from '@/lib/seo/preview/safe-loader';
import '@/styles/preview/treatments.css';

export const metadata: Metadata = {
  title: 'Treatment detail preview',
  robots: { index: false, follow: false },
};

type TreatmentPreviewPageProps = {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

function deriveBenefits(data: TreatmentPreviewContent): BenefitCapsule[] {
  const fromSteps = (data.howTo?.steps ?? []).slice(0, 3).map((step, index) => ({
    title: step.name ?? `Workflow ${index + 1}`,
    description: step.text ?? 'Awaiting schema step text.',
    placeholder: !step.name && !step.text,
  }));

  const benefits = fromSteps.filter((item) => Boolean(item.title || item.description));

  if (benefits.length < 3 && data.service?.description) {
    const segments = data.service.description
      .split(/[.;•]/)
      .map((segment) => segment.trim())
      .filter(Boolean);
    for (const segment of segments) {
      if (benefits.length >= 3) break;
      benefits.push({ title: segment, description: 'Pulled from Service.description', placeholder: true });
    }
  }

  while (benefits.length < 3 && benefits.length > 0) {
    benefits.push({ title: 'Awaiting additional benefits', description: 'Add schema copy to replace placeholder.', placeholder: true });
  }

  return benefits;
}

function buildHeroBadges(data: TreatmentPreviewContent): PreviewHeroBadge[] {
  const badges: PreviewHeroBadge[] = [];

  if (!data.hasSchemaPack) {
    badges.push({ label: 'Missing schema pack', tone: 'alert' });
  }

  if (data.missing.service) {
    badges.push({ label: 'Missing Service schema', tone: 'alert' });
  }

  if (data.missing.howTo) {
    badges.push({ label: 'Missing HowTo schema', tone: 'muted' });
  }

  if (data.missing.faq) {
    badges.push({ label: 'Missing FAQPage schema', tone: 'muted' });
  }

  if (data.missing.breadcrumbs) {
    badges.push({ label: 'Missing breadcrumbs', tone: 'muted' });
  }

  return badges;
}

export default async function TreatmentPreviewPage({ params, searchParams }: TreatmentPreviewPageProps) {
  const slug = params.slug;
  const previewData = await loadTreatmentPreviewContent(slug);
  const showHud = shouldShowHud(searchParams?.hud);

  const benefits = deriveBenefits(previewData);
  const heroBadges = buildHeroBadges(previewData);
  const hudStats = [
    { label: 'Slug', value: slug },
    { label: 'Route', value: previewData.route ?? '—' },
    {
      label: 'Schema types',
      value: previewData.schemaTypes.length > 0 ? previewData.schemaTypes.join(', ') : '—',
    },
    { label: 'HUD status', value: previewData.hudStatus },
    {
      label: 'Missing',
      value:
        [
          previewData.missing.service ? 'Service' : null,
          previewData.missing.howTo ? 'HowTo' : null,
          previewData.missing.faq ? 'FAQPage' : null,
          previewData.missing.breadcrumbs ? 'Breadcrumbs' : null,
        ]
          .filter(Boolean)
          .join(', ') || 'None',
    },
  ];

  return (
    <main className="tp-main cpv-treatments-canvas">
      {showHud ? <DevHud className="tl-hud" stats={hudStats} title="Treatment detail HUD" /> : null}
      <div className="tp-shell">
        <BreadcrumbBar items={previewData.breadcrumbs} route={previewData.route} />
        <PreviewHero
          badges={heroBadges}
          description={previewData.service?.description}
          eyebrow={`Preview route · ${previewData.route ?? `/treatments/${slug}`}`}
          missingCopy={!previewData.service?.description}
          title={previewData.service?.name}
        />
        <div className="tp-grid-duo">
          <BenefitsCapsules benefits={benefits} />
          <Viewer3DSlot posterSrc="/brand/posters/placeholder.webp" />
        </div>
        <HowToRail missing={previewData.missing.howTo} steps={previewData.howTo?.steps ?? []} title={previewData.howTo?.name} />
        <FaqAccordion items={previewData.faq} missing={previewData.missing.faq} />
      </div>
    </main>
  );
}
