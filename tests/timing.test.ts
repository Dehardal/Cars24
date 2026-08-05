import { markStart, markEnd, getPerfLogs, clearPerfLogs } from '../perf/timing';

describe('Performance Timing Utility', () => {
  beforeEach(() => {
    clearPerfLogs();
  });

  it('correctly logs and tracks elapsed duration for markers', () => {
    markStart('test-marker');
    
    // Simulate a small delay (10ms)
    const start = Date.now();
    while (Date.now() - start < 10) {}
    
    const duration = markEnd('test-marker');
    expect(duration).toBeGreaterThan(0);
    
    const logs = getPerfLogs();
    expect(logs.length).toBe(2); // One start log, one end log
    expect(logs[0]).toContain('test-marker');
    expect(logs[1]).toContain('test-marker');
  });

  it('warns if ending a non-existent marker', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const duration = markEnd('non-existent');
    expect(duration).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalled();
    consoleWarnSpy.mockRestore();
  });
});
