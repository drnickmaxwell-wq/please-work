import Link from 'next/link';

interface TreatmentBreadcrumbProps {
  current: string;
}

export default function TreatmentBreadcrumb({ current }: TreatmentBreadcrumbProps): JSX.Element {
  return (
    <nav aria-label="Breadcrumb" className="cpv-breadcrumb">
      <ol className="flex items-center gap-1">
        <li>
          <Link href="/preview">Preview</Link>
        </li>
        <li aria-hidden="true" className="cpv-breadcrumb__divider">
          /
        </li>
        <li>
          <Link href="/preview/treatments">Treatments</Link>
        </li>
        <li aria-hidden="true" className="cpv-breadcrumb__divider">
          /
        </li>
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}
