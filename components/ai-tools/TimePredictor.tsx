import { AIWidgetCard } from '../card/AIWidgetCard';

export interface TimePredictorProps {
  description?: string;
}

export function TimePredictor({ description = 'Project timelines for treatment plans with clarity.' }: TimePredictorProps) {
  return (
    <AIWidgetCard
      title="Time Predictor"
      description={description}
      tag="AI tool"
      ctaLabel="View timeline"
    />
  );
}
