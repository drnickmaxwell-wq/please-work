import HeroLuxury from '@/components/home/HeroLuxury';
import Hero4KVideo from '@/components/hero/4k-hero-video';
import SmileJourney from '@/components/sections/SmileJourney';

export default function HomePage() {
  return (
    <main className="space-y-0">
      <HeroLuxury />
      <Hero4KVideo />
      <SmileJourney />
    </main>
  );
}
