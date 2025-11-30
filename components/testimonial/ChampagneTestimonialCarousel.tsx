'use client';

import { useState } from 'react';
import { ChampagneTestimonial, type ChampagneTestimonialProps } from './ChampagneTestimonial';
import styles from './champagne-testimonial-carousel.module.css';

export interface ChampagneTestimonialCarouselProps {
  items: ChampagneTestimonialProps[];
  heading?: string;
}

export function ChampagneTestimonialCarousel({ items, heading }: ChampagneTestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const total = items.length;

  const goPrev = () => setIndex((current) => (current - 1 + total) % total);
  const goNext = () => setIndex((current) => (current + 1) % total);

  const active = items[index];

  return (
    <div className={styles.carousel}>
      {heading ? <h2>{heading}</h2> : null}
      <ChampagneTestimonial {...active} />
      <div className={styles.nav}>
        <span className={styles.meta}>
          {index + 1} / {total}
        </span>
        <div className={styles.controls}>
          <button type="button" className={styles.button} onClick={goPrev} aria-label="Previous testimonial">
            ←
          </button>
          <button type="button" className={styles.button} onClick={goNext} aria-label="Next testimonial">
            →
          </button>
        </div>
      </div>
    </div>
  );
}
