import { Champagne3DViewer } from "@/components/3d/Champagne3DViewer";
import ChampagnePreviewHero from "@/components/preview/ChampagnePreviewHero";
import { ChampagneHeroFrame, type ChampagneHeroVariant } from "@/components/preview/champagne/ChampagneHeroFrame";
import PreviewChampagneCTA from "@/components/preview/shared/PreviewChampagneCTA";
import { DevHud, shouldShowHud } from "@/components/preview/Hud";
import { ChampagneTestimonialCarousel } from "@/components/testimonial/ChampagneTestimonialCarousel";
import { loadTreatmentPreviewContent } from "@/lib/seo/preview/safe-loader";
import {
  getPreviewTreatmentConfig,
  type PreviewTreatmentConfig,
  type PreviewFaq,
} from "@/lib/treatments/previewTreatmentConfig";

import TreatmentPreviewSchema from "../seo/TreatmentPreviewSchema";
import styles from "./champagne-treatment-template.module.css";
import previewCtaStyles from "@/components/preview/shared/preview-cta.module.css";
import homeHeroStyles from "@/components/preview/home/home-preview.module.css";

import "@/components/preview/preview-layout.css";
import "@/components/preview/preview-typography.css";
import "@/styles/preview/treatments-preview.css";

type TemplateProps = {
  slug: string;
  schemaKey?: string;
  treatmentName?: string;
  category?: string;
  benefitBullets?: string[];
  heroTitle?: string;
  heroCopy?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  closingPrimaryCtaLabel?: string;
  closingPrimaryCtaHref?: string;
  closingSecondaryCtaLabel?: string;
  closingSecondaryCtaHref?: string;
  howItWorksLabel?: string;
  howItWorksSteps?: HowToStep[];
  has3DViewer?: boolean;
  financePlanGroup?: string;
  galleryEnabled?: boolean;
  faqKey?: string;
  faqItems?: FaqEntry[];
  searchParams?: Record<string, string | string[] | undefined>;
  heroVariant?: 'default' | 'luminous';
  heroFrameVariant?: ChampagneHeroVariant;
};

type HowToStep = { title: string; summary: string };
type FaqEntry = { question?: string; answer?: string };

const TESTIMONIALS = [
  {
    quote: "They mapped out every step and showed a calm finance example before I committed.",
    name: "Sophie",
    role: "Preview treatment guest",
    rating: 5,
  },
  {
    quote: "The Champagne canvas made it clear where the 3D view, gallery, and FAQ will live.",
    name: "Alex",
    role: "Design QA",
    rating: 5,
  },
  {
    quote: "Tabs, finance, and CTA bands are all in one place—easy to swap for real assets later.",
    name: "James",
    role: "Product owner",
    rating: 5,
  },
];

const DEFAULT_STEPS: HowToStep[] = [
  { title: "Consultation", summary: "Goals, scans, and photography to plan the journey." },
  { title: "Planning", summary: "Schema-aligned steps ready for CB_TABS_OVERVIEW_V1 tabs." },
  { title: "Treatment", summary: "Guided workflows with Champagne glass surfaces and soft gradients." },
  { title: "Aftercare", summary: "Retention, reviews, and finance check-ins to keep results steady." },
];

function resolveSchemaSlug(slug: string, schemaKey?: string) {
  if (!schemaKey) return slug;
  const normalised = schemaKey.replace(/-process$/, "");
  if (normalised === "implant" || normalised === "implants" || normalised === "implant-process") return "implants";
  if (normalised === "veneers") return "veneers";
  if (normalised === "aligner") return "orthodontics/spark-aligners";
  return normalised || slug;
}

function coerceBenefits(config: PreviewTreatmentConfig, override?: string[]) {
  if (override && override.length) return override;
  if (config.benefits.length) return config.benefits;
  return [
    "Champagne grid placeholder ready for Manus-aligned benefits.",
    "Swap with Service.description derived bullets once schema lands.",
    "Keep spacing consistent with CB_HERO_FINAL follow-on copy.",
  ];
}

function coerceSteps(config: PreviewTreatmentConfig, previewSteps: HowToStep[]) {
  if (previewSteps.length) return previewSteps;
  if (config.howToSteps.length)
    return config.howToSteps.map((step) => ({ title: step.title, summary: step.summary } as HowToStep));
  return DEFAULT_STEPS;
}

function coerceFaq(previewFaq: FaqEntry[], configFaq: PreviewFaq[]) {
  if (previewFaq.length) return previewFaq;
  if (configFaq.length) return configFaq.map((item) => ({ question: item.question, answer: item.answer }));
  return [];
}

function HowItWorksTabs({
  steps,
  label,
  groupId,
  className,
}: {
  steps: HowToStep[];
  label: string;
  groupId: string;
  className?: string;
}) {
  const safeGroup = groupId.replace(/[^a-z0-9-]/gi, "-");

  return (
    <section aria-labelledby="how-it-works" className={className ?? styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>How it works</span>
        <h2 id="how-it-works" className={styles.sectionTitle}>
          {label}
        </h2>
        <p className={styles.sectionLead}>
          Tab-ready overview mirroring CB_TABS_OVERVIEW_V1. Replace placeholders with schema-connected steps once the HowTo pack
          is synced.
        </p>
      </div>
      <div className={styles.tabGrid}>
        <div className={styles.tabList} aria-label={`${label} steps`}>
          {steps.map((step, index) => (
            <div className={styles.tabItem} key={`${step.title}-${index}`}>
              {/** radio inputs provide simple tab-like behaviour without JS */}
              <input
                className={styles.tabInput}
                defaultChecked={index === 0}
                id={`${safeGroup}-tab-${index}`}
                name={`${safeGroup}-tabs`}
                type="radio"
              />
              <label className={styles.tabLabel} htmlFor={`${safeGroup}-tab-${index}`}>
                <span className={styles.tabIndex}>{index + 1}</span>
                <span>{step.title}</span>
              </label>
              <div className={styles.tabPanel} aria-labelledby={`${safeGroup}-tab-${index}`}>
                <h3>{step.title}</h3>
                <p>{step.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinanceBand({ planGroup, className }: { planGroup?: string; className?: string }) {
  return (
    <section className={className ?? styles.section} aria-labelledby="finance-heading">
      <div className={`${styles.glass} ${styles.financeCard}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Investment</span>
          <h2 id="finance-heading" className={styles.sectionTitle}>
            Transparent finance preview
          </h2>
          <p className={styles.sectionLead}>
            Placeholder finance band keyed to <strong>{planGroup ?? "pending-plan-group"}</strong>. Swap in live finance modules
            once plan mappings are approved.
          </p>
        </div>
        <div className={styles.financeGrid}>
          <div className={styles.financePill}>0% APR examples</div>
          <div className={styles.financePill}>Soft search ready</div>
          <div className={styles.financePill}>Align with manifesto</div>
          <div className={styles.financeTodo}>TODO: finance_plan_mapping</div>
        </div>
      </div>
    </section>
  );
}

function GalleryPlaceholder({ className }: { className?: string }) {
  return (
    <section className={className ?? styles.section} aria-labelledby="gallery-heading">
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>Gallery</span>
        <h2 id="gallery-heading" className={styles.sectionTitle}>
          Before / after placeholders
        </h2>
        <p className={styles.sectionLead}>Replace cards with approved assets; mapped to gallery_assets TODOs in the architecture file.</p>
      </div>
      <div className={styles.galleryGrid}>
        {["Primary case", "Secondary case", "Close-up"].map((label) => (
          <div key={label} className={`${styles.glass} ${styles.galleryCard}`}>
            <div className={styles.galleryMedia} aria-hidden>
              <span className={styles.galleryBadge}>Placeholder</span>
            </div>
            <div className={styles.galleryCopy}>
              <p className={styles.galleryTitle}>{label}</p>
              <p className={styles.galleryBody}>Drop in before/after pairings once imagery is cleared.</p>
              <p className={styles.galleryFootnote}>TODO: gallery_assets</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BenefitsGrid({ items, category, className }: { items: string[]; category?: string; className?: string }) {
  return (
    <section className={className ?? styles.section} aria-labelledby="benefits-heading">
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>{category ?? "Treatment"}</span>
        <h2 id="benefits-heading" className={styles.sectionTitle}>
          Why guests choose this pathway
        </h2>
        <p className={styles.sectionLead}>
          Benefits grid derived from schema copy where available. Replace placeholders with Manus-aligned bullets.
        </p>
      </div>
      <div className={styles.benefitsGrid}>
        {items.map((benefit, index) => (
          <div key={`${benefit}-${index}`} className={`${styles.glass} ${styles.benefitCard}`}>
            <span className={styles.badge}>Benefit {index + 1}</span>
            <p>{benefit}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FaqStrip({ items, missing, className }: { items: FaqEntry[]; missing: boolean; className?: string }) {
  return (
    <section className={className ?? styles.section} aria-labelledby="faq-heading">
      <div className={styles.sectionHeader}>
        <span className={styles.eyebrow}>FAQ</span>
        <h2 id="faq-heading" className={styles.sectionTitle}>
          Patient questions
        </h2>
        <p className={styles.sectionLead}>CB_FAQ_PHASE1E cadence using schema-derived FAQPage entries when present.</p>
      </div>
      <div className={styles.faqGrid}>
        {items.length
          ? items.map((item, index) => (
              <div key={`${item.question ?? "faq"}-${index}`} className={`${styles.glass} ${styles.faqCard}`}>
                <h3>{item.question ?? "Question pending copy"}</h3>
                <p>{item.answer ?? "Awaiting acceptedAnswer.text"}</p>
              </div>
            ))
          : [0, 1, 2].map((index) => (
              <div key={`faq-placeholder-${index}`} className={`${styles.glass} ${styles.faqCard} ${styles.placeholder}`}>
                <h3>FAQ placeholder</h3>
                <p>Load FAQPage.mainEntity to replace this placeholder.</p>
              </div>
            ))}
      </div>
      {missing ? <p className={styles.todo}>TODO: faq schema pack missing for this slug.</p> : null}
    </section>
  );
}

function CtaBand({
  title,
  className,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
}: {
  title: string;
  className?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}) {
  return (
    <section className={className ?? styles.section} aria-labelledby="cta-heading">
      <div className={`${styles.glass} ${styles.ctaBand}`}>
        <div>
          <p className={styles.eyebrow}>Next steps</p>
          <h2 id="cta-heading" className={styles.sectionTitle}>
            Ready to book {title}?
          </h2>
          <p className={styles.sectionLead}>
            Champagne CTA skeleton. Swap links/text once routing is approved for production.
          </p>
        </div>
        <div className={previewCtaStyles.heroCTAGroup}>
          {/** Shared preview CTA styles to keep the closing band aligned with the hero */}
          <PreviewChampagneCTA className={previewCtaStyles.inline} href={primaryCtaHref ?? "/contact"}>
            {primaryCtaLabel ?? "Book a consultation"}
          </PreviewChampagneCTA>
          <PreviewChampagneCTA
            className={previewCtaStyles.inline}
            href={secondaryCtaHref ?? "/treatments"}
            variant="secondary"
          >
            {secondaryCtaLabel ?? "View all treatments"}
          </PreviewChampagneCTA>
        </div>
      </div>
    </section>
  );
}

export default async function ChampagneTreatmentTemplate(props: TemplateProps) {
  const {
    slug,
    schemaKey,
    treatmentName,
    category,
    benefitBullets,
    heroTitle,
    heroCopy,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
    closingPrimaryCtaLabel,
    closingPrimaryCtaHref,
    closingSecondaryCtaLabel,
    closingSecondaryCtaHref,
    howItWorksLabel,
    howItWorksSteps,
    has3DViewer,
    financePlanGroup,
    galleryEnabled,
    faqKey,
    faqItems,
    searchParams,
    heroVariant,
    heroFrameVariant,
  } = props;

  const config = getPreviewTreatmentConfig(slug);
  const schemaSlug = resolveSchemaSlug(slug, schemaKey);
  const previewContent = await loadTreatmentPreviewContent(schemaSlug);
  const showHud = shouldShowHud(searchParams?.hud);
  const isImplants = config.slug === "implants";

  const benefits = coerceBenefits(config, benefitBullets);
  const derivedSteps = (previewContent.howTo?.steps ?? []).map((step) => ({
    title: step.name ?? "Step", // fallback
    summary: step.text ?? "Awaiting HowTo.step text",
  }));
  const steps = coerceSteps(config, howItWorksSteps ?? derivedSteps);
  const faqEntries = coerceFaq(faqItems ?? previewContent.faq, config.faqItems);
  const heroDescription =
    heroCopy ??
    config.shortDescription ??
    previewContent.service?.description ??
    "Champagne treatment canvas using preview schema loaders and Manus-aligned sections.";
  const heroHeading = heroTitle ?? `${treatmentName ?? config.displayName} in Shoreham-by-Sea`;
  const heroPrimaryLabel = primaryCtaLabel ?? "Book a consultation";
  const heroPrimaryHref = primaryCtaHref ?? "/contact";
  const heroSecondaryLabel = secondaryCtaLabel ?? "View all treatments";
  const heroSecondaryHref = secondaryCtaHref ?? "/treatments";
  const howItWorksLabelText = howItWorksLabel ?? `${treatmentName ?? config.displayName} steps`;
  const heroTitleId = `${config.slug}-hero-title`;
  const heroKicker = category ? `${category} treatment` : "Champagne preview";

  const heroContent = (
    <>
      <span className={styles.eyebrow}>{heroKicker}</span>
      <h1 id={heroTitleId} className={styles.sectionTitle}>
        {heroHeading}
      </h1>
      <p className={styles.heroCopy}>{heroDescription}</p>
      <div className={homeHeroStyles.heroCtaPlate}>
        <div className={homeHeroStyles.heroCtaRow}>
          <PreviewChampagneCTA className={`${previewCtaStyles.primaryHero} ${homeHeroStyles.heroCtaPrimary}`} href={heroPrimaryHref}>
            {heroPrimaryLabel}
          </PreviewChampagneCTA>
          <PreviewChampagneCTA
            className={`${previewCtaStyles.secondaryHero} ${homeHeroStyles.heroCtaSecondary}`}
            href={heroSecondaryHref}
            variant="secondary"
          >
            {heroSecondaryLabel}
          </PreviewChampagneCTA>
        </div>
      </div>
    </>
  );

  const heroSurface = heroFrameVariant ? (
    <ChampagneHeroFrame
      contentClassName={homeHeroStyles.heroContent}
      titleId={heroTitleId}
      variant={heroFrameVariant}
    >
      {heroContent}
    </ChampagneHeroFrame>
  ) : (
    <ChampagnePreviewHero
      kicker={heroKicker}
      title={heroHeading}
      variant={heroVariant}
      ctas={
        <div className={previewCtaStyles.heroCTAGroup}>
          {/** Regal Glass–Gold CTA pair shared with /preview/home */}
          <PreviewChampagneCTA className={previewCtaStyles.primaryHero} href={heroPrimaryHref}>
            {heroPrimaryLabel}
          </PreviewChampagneCTA>
          <PreviewChampagneCTA
            className={previewCtaStyles.secondaryHero}
            href={heroSecondaryHref}
            variant="secondary"
          >
            {heroSecondaryLabel}
          </PreviewChampagneCTA>
        </div>
      }
    >
      <p className={styles.heroCopy}>{heroDescription}</p>
    </ChampagnePreviewHero>
  );

  return (
    <div
      className={`cpv-page ${styles.canvas} ${styles.treatmentPage} ${isImplants ? styles.implantsCanvas : ""}`}
      data-treatment={config.slug}
    >
      {showHud ? (
        <DevHud
          className="tl-hud"
          stats={[
            { label: "Slug", value: slug },
            { label: "Schema key", value: schemaKey ?? "—" },
            { label: "FAQ key", value: faqKey ?? schemaKey ?? "—" },
            { label: "Route", value: previewContent.route ?? config.route },
            { label: "Schemas", value: previewContent.schemaTypes.join(", ") || "—" },
            { label: "HUD", value: previewContent.hudStatus },
          ]}
          title="Champagne treatment template HUD"
        />
      ) : null}

      {heroSurface}

      <main className={`${styles.main} ${isImplants ? styles.implantsMain : ""}`} role="main">
        <BenefitsGrid category={category} items={benefits} className={isImplants ? styles.implantSection : undefined} />

        <section className={`${styles.section} ${isImplants ? styles.implantSection : ""}`} aria-labelledby="howto-block">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Workflow</span>
            <h2 id="howto-block" className={styles.sectionTitle}>
              Schema-aligned journey
            </h2>
            <p className={styles.sectionLead}>
              Pulls HowTo.step entries when available. Tabs mirror CB_TABS_OVERVIEW_V1 without touching the sacred hero.
            </p>
          </div>
          <div className={styles.howtoGrid}>
            <HowItWorksTabs
              className={isImplants ? styles.implantCard : styles.section}
              groupId={config.slug}
              label={howItWorksLabelText}
              steps={steps}
            />
            {has3DViewer ? (
              <div className={`${styles.viewerShell} ${isImplants ? styles.implantCard : ""}`}>
                <Champagne3DViewer
                  title={`${treatmentName ?? config.displayName} 3D viewer`}
                  description="Reserved Champagne glass surface for the 3D model."
                  placeholderText="TODO: 3D asset / model-viewer mount"
                />
                <p className={styles.todo}>TODO: 3D model asset for {config.slug}</p>
              </div>
            ) : null}
          </div>
        </section>

        <FinanceBand className={isImplants ? styles.implantSection : undefined} planGroup={financePlanGroup} />

        {galleryEnabled ? <GalleryPlaceholder className={isImplants ? styles.implantSection : undefined} /> : null}

        <section className={`${styles.section} ${isImplants ? styles.implantSection : ""}`} aria-labelledby="stories-heading">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Testimonials</span>
            <h2 id="stories-heading" className={styles.sectionTitle}>
              Patient stories strip
            </h2>
            <p className={styles.sectionLead}>Preview-only testimonial rail using Champagne testimonial components.</p>
          </div>
          <div className={styles.testimonialShell}>
            <ChampagneTestimonialCarousel heading={`${treatmentName ?? config.displayName} stories`} items={TESTIMONIALS} />
          </div>
        </section>

        <FaqStrip
          className={isImplants ? styles.implantSection : undefined}
          items={faqEntries}
          missing={previewContent.missing.faq}
        />

        <CtaBand
          className={isImplants ? `${styles.implantSection} ${styles.ctaSurface}` : undefined}
          title={treatmentName ?? config.displayName}
          primaryCtaLabel={closingPrimaryCtaLabel}
          primaryCtaHref={closingPrimaryCtaHref}
          secondaryCtaLabel={closingSecondaryCtaLabel}
          secondaryCtaHref={closingSecondaryCtaHref}
        />
      </main>

      <TreatmentPreviewSchema config={config} />
    </div>
  );
}
