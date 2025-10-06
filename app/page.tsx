'use client';

import JsonLd from '@/components/seo/json-ld';
import CinematicHeroVideo from '@/components/video/cinematic-hero-video';
import InteractiveDentalVisualization from '@/components/features/interactive-dental-visualization';
import LuxuryChatbot from '@/components/ai/luxury-chatbot';
import { FloatingGeometry } from '@/components/effects/micro-interactions';
import { ScrollReveal, StaggeredReveal } from '@/components/effects/enhanced-scroll-animations';
import { MagneticButton, LiquidButton, FloatingCard } from '@/components/effects/advanced-hover-effects';

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "St Mary's House Dental Care",
    "description": "Luxury coastal dental practice in Shoreham-by-Sea, specializing in 3D digital dentistry, porcelain veneers, and dental implants.",
    "url": "https://www.stmaryshousedental.co.uk",
    "logo": "https://www.stmaryshousedental.co.uk/logo.png",
    "image": "https://www.stmaryshousedental.co.uk/hero-poster.jpg",
    "telephone": "+441273123456",
    "email": "info@stmaryshousedental.co.uk",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1 St Mary's House",
      "addressLocality": "Shoreham-by-Sea",
      "addressRegion": "West Sussex",
      "postalCode": "BN43 5ZA",
      "addressCountry": "GB"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday"
        ],
        "opens": "09:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Friday",
        "opens": "09:00",
        "closes": "16:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "13:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/stmaryshousedental",
      "https://www.instagram.com/stmaryshousedental"
    ],
    "medicalSpecialty": "Dentistry",
    "priceRange": "£££",
    "currenciesAccepted": "GBP",
    "paymentAccepted": "Cash, Credit Card, Finance",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "50.8333",
        "longitude": "-0.2667"
      },
      "geoRadius": "30"
    }
  };

  return (
    <main className="min-h-screen overflow-hidden relative">
      <JsonLd data={organizationSchema} />
      
      {/* Floating Geometry Elements */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <FloatingGeometry 
          shape="circle" 
          size="sm" 
          color="magenta" 
          animation="float"
          className="absolute top-20 left-10 opacity-30"
        />
        <FloatingGeometry 
          shape="hexagon" 
          size="md" 
          color="turquoise" 
          animation="rotate"
          className="absolute top-40 right-20 opacity-20"
        />
        <FloatingGeometry 
          shape="square" 
          size="sm" 
          color="gold" 
          animation="pulse"
          className="absolute bottom-40 left-20 opacity-25"
        />
        <FloatingGeometry 
          shape="circle" 
          size="lg" 
          color="turquoise" 
          animation="orbit"
          className="absolute bottom-20 right-10 opacity-15"
        />
      </div>
      
      {/* Cinematic Hero Video - Brand Consistent */}
      <CinematicHeroVideo
        videoSrc="/videos/dental-hero-4k.mp4"
        posterSrc="/hero-poster.jpg"
        title="Your Perfect Smile is Just One Click Away"
        subtitle="Experience the future of dentistry with our AI-powered 3D treatments, luxury coastal setting, and award-winning patient care."
        description="Book your consultation today and discover why we're 'Going the Extra Smile.'"
        ctaText="Book Free Consultation"
        ctaAction={() => window.location.href = '/contact'}
        autoplay={true}
        muted={true}
        loop={true}
      />
      
      {/* Interactive Dental Visualization Section */}
      <ScrollReveal direction="up" delay={0.2}>
        <InteractiveDentalVisualization />
      </ScrollReveal>
      
      {/* Luxury AI Chatbot */}
      <ScrollReveal direction="scale" delay={0.4}>
        <LuxuryChatbot />
      </ScrollReveal>
    </main>
  );
}

