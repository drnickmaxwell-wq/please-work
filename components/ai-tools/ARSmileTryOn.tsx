import { AIWidgetCard } from '../card/AIWidgetCard';

export interface ARSmileTryOnProps {
  description?: string;
}

export function ARSmileTryOn({ description = 'Preview outcomes with an augmented reality smile try-on.' }: ARSmileTryOnProps) {
  return (
    <AIWidgetCard
      title="AR Smile Try-On"
      description={description}
      tag="Interactive"
      ctaLabel="Launch preview"
    />
  );
}
