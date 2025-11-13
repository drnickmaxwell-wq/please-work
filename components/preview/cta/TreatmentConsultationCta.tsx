import Link from 'next/link';

export default function TreatmentConsultationCta(): JSX.Element {
  return (
    <div className="cpv-cta-row">
      <Link className="cpv-btn cpv-btn-solid" href="/contact">
        Reserve a consultation
      </Link>
      <Link className="cpv-btn cpv-btn-outline" href="/treatments">
        Explore all treatments
      </Link>
    </div>
  );
}
