import React from 'react';

import SectionFrame from './SectionFrame';

type SectionProps = {
  route: string;
};

const GALLERY_ITEMS = [
  { before: 'Before — placeholder smile 01', after: 'After — luminous finish 01' },
  { before: 'Before — placeholder smile 02', after: 'After — luminous finish 02' },
  { before: 'Before — placeholder smile 03', after: 'After — luminous finish 03' },
];

export default function Gallery({ route }: SectionProps) {
  return (
    <SectionFrame
      description="Before/after gallery stub ready for ImageObject metadata once assets are approved."
      id="gallery"
      kicker={'<BeforeAfterGallery group="{slug}" />'}
      route={route}
      title="Before & after gallery"
    >
      <div className="tl-gallery">
        {GALLERY_ITEMS.map((item, index) => (
          <figure className="tl-gallery__item" key={index}>
            <div className="tl-gallery__frame" aria-hidden="true" />
            <figcaption className="tl-gallery__caption">
              <span>{item.before}</span>
              <span>{item.after}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionFrame>
  );
}
