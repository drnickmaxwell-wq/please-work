import { TestimonialCard } from '../card/TestimonialCard';

export interface ChampagneTestimonialProps {
  quote: string;
  name: string;
  role?: string;
  avatarUrl?: string;
  rating?: number;
}

export function ChampagneTestimonial(props: ChampagneTestimonialProps) {
  return <TestimonialCard {...props} />;
}
