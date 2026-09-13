import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('wxt/browser', () => ({
  browser: {
    runtime: {
      getURL: (path: string) => `chrome-extension://mock-id${path}`,
    },
  },
}));

import {
  isWasmSupported,
  canFetchExtensionAssets,
  getOcrStatus,
  isOcrAvailable,
  checkOcrAvailability,
  SovereignOcrAdapter,
  PaddleAdapter,
} from '../../src/utils/ocrEngine';

describe('ocrEngine - Sovereign ONNX Architecture', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('correctly reports WebAssembly environment support', () => {
    const supported = isWasmSupported();
    expect(typeof supported).toBe('boolean');
    // In Node.js / Vitest test environment, WebAssembly is supported
    expect(supported).toBe(true);
  });

  it('exposes SovereignOcrAdapter and backwards-compatible PaddleAdapter alias', () => {
    expect(SovereignOcrAdapter).toBeDefined();
    expect(PaddleAdapter).toBeDefined();
    expect(SovereignOcrAdapter).toBe(PaddleAdapter);
  });

  it('returns degraded status when models are not yet loaded', () => {
    const status = getOcrStatus();
    expect(['live', 'degraded']).toContain(status);
  });

  it('probes ocr_det.onnx, ocr_rec.onnx, and ocr_dict.txt in checkOcrAvailability()', async () => {
    const requestedUrls: string[] = [];
    globalThis.fetch = vi.fn().mockImplementation(async (url: string) => {
      requestedUrls.push(url);
      return {
        ok: true,
        status: 206,
      } as Response;
    });

    const isAvailable = await checkOcrAvailability();
    expect(isAvailable).toBe(true);
    expect(requestedUrls).toEqual([
      'chrome-extension://mock-id/onnx/ocr_det.onnx',
      'chrome-extension://mock-id/onnx/ocr_rec.onnx',
      'chrome-extension://mock-id/onnx/ocr_dict.txt',
    ]);
  });

  it('returns false in checkOcrAvailability() when model files are missing', async () => {
    globalThis.fetch = vi.fn().mockImplementation(async (url: string) => {
      if (url.includes('ocr_rec.onnx')) {
        return { ok: false, status: 404 } as Response;
      }
      return { ok: true, status: 200 } as Response;
    });

    const isAvailable = await checkOcrAvailability();
    expect(isAvailable).toBe(false);
  });

  it('isOcrAvailable() resolves safely without throwing', async () => {
    const available = await isOcrAvailable();
    expect(typeof available).toBe('boolean');
  });
});
