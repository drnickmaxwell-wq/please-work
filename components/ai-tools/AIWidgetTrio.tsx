import styles from '../card/card-skeleton.module.css';
import { ARSmileTryOn } from './ARSmileTryOn';
import { CostEstimator } from './CostEstimator';
import { TimePredictor } from './TimePredictor';

export function AIWidgetTrio() {
  return (
    <div className={`${styles['cp-card__grid']} space-block`}>
      <CostEstimator />
      <TimePredictor />
      <ARSmileTryOn />
    </div>
  );
}
