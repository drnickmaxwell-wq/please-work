import Link from 'next/link';

interface TreatmentBreadcrumbProps {
  current: string;
}

export default function TreatmentBreadcrumb({ current }: TreatmentBreadcrumbProps): JSX.Element {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-[var(--champagne-ink-muted)]">
        <li>
          <Link className="underline-offset-4 hover:underline" href="/preview">
            Preview
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link className="underline-offset-4 hover:underline" href="/preview/treatments">
            Treatments
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="font-medium text-[var(--champagne-ink)]">
          {current}
        </li>
      </ol>
    </nav>
  );
}
