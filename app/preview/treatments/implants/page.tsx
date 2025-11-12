export const dynamic = 'force-static';
export const revalidate = 0;

import '@/styles/preview/champagne-preview.css';

import ChampagnePreviewHero from '@/components/preview/ChampagnePreviewHero';
import { ChampagneSection } from '@/components/preview/ChampagneSection';

const implantBenefits = [
  {
    title: 'Fully guided placement',
    body: 'Digital planning and surgical guides deliver precise positioning for a confident bite.',
  },
  {
    title: 'Comfort-first experience',
    body: 'Sedation options and calming care keep the process relaxed from start to finish.',
  },
  {
    title: 'Natural aesthetics',
    body: 'Custom abutments and ceramics blend with surrounding teeth for a seamless smile.',
  },
];

const implantSteps = [
  {
    title: '1. Consultation',
    description: 'Meet your implant dentist, review scans, and design a treatment plan tailored to your goals.',
  },
  {
    title: '2. Planning',
    description: 'Cone beam imaging and digital wax-ups map your exact implant position before treatment day.',
  },
  {
    title: '3. Placement',
    description: 'Guided surgery places the titanium post with precision and minimal downtime.',
  },
  {
    title: '4. Restoration',
    description: 'After healing, bespoke crowns or bridges restore function and luminous aesthetics.',
  },
];

const candidacyChecks = [
  'Healthy gums and supporting bone',
  'Commitment to aftercare appointments',
  'Lifestyle that supports implant maintenance',
  'Clear understanding of treatment stages',
];

export default function ImplantsPreviewPage() {
  return (
    <>
      <ChampagnePreviewHero
        kicker="Treatments Preview"
        title="Dental implants in Shoreham-by-Sea"
        ctas={
          <div className="flex gap-2">
            <a className="btn btn-solid" href="/contact">
              Reserve a consultation
            </a>
            <a className="btn btn-outline" href="/treatments">
              View all treatments
            </a>
          </div>
        }
      >
        <p className="opacity-80">Advanced planning keeps every stage precise and calm.</p>
      </ChampagnePreviewHero>

      <main className="container space-y-16 py-12">
        <ChampagneSection title="3D implant visualiser">
          <div className="cpv-glass p-6 text-base leading-relaxed">
            3D VIEWER SLOT (placeholder)
          </div>
        </ChampagneSection>

        <ChampagneSection title="Why guests choose implants">
          <div className="grid gap-6 md:grid-cols-3">
            {implantBenefits.map((benefit) => (
              <article key={benefit.title} className="cpv-card h-full space-y-3">
                <h3 className="text-xl font-semibold text-[var(--smh-ink)]">{benefit.title}</h3>
                <p>{benefit.body}</p>
              </article>
            ))}
          </div>
        </ChampagneSection>

        <ChampagneSection title="The implant journey">
          <ol className="grid gap-4">
            {implantSteps.map((step) => (
              <li key={step.title} className="cpv-card space-y-2">
                <h3 className="text-lg font-semibold text-[var(--smh-ink)]">{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </ChampagneSection>

        <ChampagneSection title="Are implants right for you?">
          <div className="cpv-card">
            <ul className="list-disc space-y-2 pl-5">
              {candidacyChecks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </ChampagneSection>
      </main>
    </>
  );
}
