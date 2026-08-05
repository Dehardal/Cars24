const startTimes: Record<string, number> = {};
const logRecords: string[] = [];

export function markStart(label: string) {
  const time = performance.now();
  startTimes[label] = time;
  const msg = `[Perf Start] "${label}" at ${time.toFixed(2)}ms`;
  console.log(msg);
  logRecords.push(msg);
}

export function markEnd(label: string): number | null {
  const endTime = performance.now();
  const startTime = startTimes[label];
  if (startTime === undefined) {
    console.warn(`[Perf Warning] Timer not started for label: "${label}"`);
    return null;
  }
  const durationMs = endTime - startTime;
  const msg = `[Perf End] "${label}" took ${durationMs.toFixed(2)}ms`;
  console.log(msg);
  logRecords.push(msg);
  return durationMs;
}

export function getPerfLogs(): string[] {
  return logRecords;
}

export function clearPerfLogs() {
  logRecords.length = 0;
  Object.keys(startTimes).forEach(key => delete startTimes[key]);
}
