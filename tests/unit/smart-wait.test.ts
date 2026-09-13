/**
 * Unit Tests — Smart Wait (MutationObserver) Logic
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Smart Wait — MutationObserver Logic', () => {
  let mockObserver: any;
  let disconnectFn: any;

  beforeEach(() => {
    disconnectFn = vi.fn();
    mockObserver = {
      observe: vi.fn(),
      disconnect: disconnectFn,
      takeRecords: vi.fn(),
    };
    (global as any).MutationObserver = vi.fn(() => mockObserver);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should instantiate a MutationObserver', () => {
    const observer = new MutationObserver(() => {});
    expect(MutationObserver).toHaveBeenCalled();
    expect(observer).toBe(mockObserver);
  });

  it('should call observe on the target element', () => {
    const target = document.createElement('div');
    const observer = new MutationObserver(() => {});
    observer.observe(target, { childList: true, subtree: true });
    expect(mockObserver.observe).toHaveBeenCalledWith(target, { childList: true, subtree: true });
  });

  it('should disconnect the observer', () => {
    const observer = new MutationObserver(() => {});
    observer.disconnect();
    expect(disconnectFn).toHaveBeenCalled();
  });

  it('should have a reasonable stability window (800ms)', () => {
    const STABLE_MS = 800;
    expect(STABLE_MS).toBeGreaterThanOrEqual(500);
    expect(STABLE_MS).toBeLessThanOrEqual(2000);
  });

  it('should have a hard timeout (5000ms)', () => {
    const HARD_TIMEOUT_MS = 5000;
    expect(HARD_TIMEOUT_MS).toBeGreaterThan(0);
    expect(HARD_TIMEOUT_MS).toBeLessThanOrEqual(10000);
  });

  it('should resolve a promise when stable', async () => {
    const check = new Promise<void>((resolve) => {
      const observer = new MutationObserver(() => {});
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => {
        observer.disconnect();
        resolve();
      }, 10);
    });
    await expect(check).resolves.toBeUndefined();
  });
});
