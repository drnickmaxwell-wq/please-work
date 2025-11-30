import { AIWidgetCard } from '../card/AIWidgetCard';

export interface CostEstimatorProps {
  description?: string;
}

export function CostEstimator({ description = 'Estimate treatment investment with transparent ranges.' }: CostEstimatorProps) {
  return (
    <AIWidgetCard
      title="Cost Estimator"
      description={description}
      tag="AI tool"
      ctaLabel="Open estimator"
    />
  );
}
