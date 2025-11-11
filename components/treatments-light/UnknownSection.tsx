import React from 'react';

import SectionFrame from './SectionFrame';

type SectionProps = {
  route: string;
  section: string;
};

export default function UnknownSection({ route, section }: SectionProps) {
  return (
    <SectionFrame
      description="Fallback stub for unmapped sections defined in the routes schema."
      id={section}
      kicker={`<${section} />`}
      route={route}
      title={`Missing preview for “${section}”`}
    >
      <p className="tl-description">
        Add a stub component under <code>components/treatments-light/{section}.tsx</code> to visualise this section in the
        preview route.
      </p>
    </SectionFrame>
  );
}
