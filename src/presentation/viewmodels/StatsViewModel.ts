import type { GetMetrics } from "../../domain/usecases";
import type { Metric } from "../../domain/entities";

export class StatsViewModel {
  readonly metrics: Metric[];

  constructor(getMetrics: GetMetrics) {
    this.metrics = getMetrics.execute();
  }

  format(value: number): string {
    return value.toLocaleString("en-US");
  }
}
