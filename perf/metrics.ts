export interface TimingMetric {
  name: string;
  durationMs: number;
}

const measurements: Record<string, number> = {};

export const PerfMetrics = {
  start: (label: string) => {
    measurements[label] = performance.now();
  },
  
  stop: (label: string): TimingMetric | null => {
    const startTime = measurements[label];
    if (startTime === undefined) {
      console.warn(`[Perf Metrics] Timer not started for label: ${label}`);
      return null;
    }
    
    const durationMs = parseFloat((performance.now() - startTime).toFixed(3));
    delete measurements[label];
    
    const metric = { name: label, durationMs };
    console.log(`[Perf Metrics] ${label} took ${durationMs}ms`);
    return metric;
  }
};
