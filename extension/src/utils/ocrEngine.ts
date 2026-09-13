/**
 * ocrEngine.ts — OCR Abstraction Layer.
 *
 * Provides a unified OcrAdapter interface with two implementations:
 *   - PaddleAdapter: uses local ONNX models (ocr_det.onnx + ocr_rec.onnx)
 *   - TesseractAdapter: wraps the Tesseract.js worker
 *
 * The engine picks PaddleAdapter if both ONNX models are available,
 * else falls back to TesseractAdapter, else returns [] with status 'degraded'.
 *
 * All model fetches use browser.runtime.getURL(...) — never remote CDNs.
 */
import { browser } from 'wxt/browser';
import * as ort from 'onnxruntime-web';
import { ctcGreedyDecode, loadOcrDict } from './ctc';
import { dbPostProcess, Quad } from './dbPostProcess';
import { detectHardwareTier } from './hardwareTier';

/**
 * Fast zero-overhead probe to detect whether WebAssembly module compilation
 * is permitted by the current context's Content Security Policy.
 */
export function isWasmSupported(): boolean {
  try {
    if (typeof WebAssembly !== 'object' || typeof WebAssembly.Module !== 'function') {
      return false;
    }
    new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0]));
    return true;
  } catch {
    return false;
  }
}

let canFetchAssetsCached: boolean | null = null;

/**
 * Probes whether the current execution context (e.g. content script under host CSP)
 * can fetch extension assets via browser.runtime.getURL.
 */
export async function canFetchExtensionAssets(): Promise<boolean> {
  if (canFetchAssetsCached !== null) return canFetchAssetsCached;
  try {
    const testUrl = browser.runtime.getURL('/onnx/README.md');
    const res = await fetch(testUrl, { method: 'GET', headers: { Range: 'bytes=0-0' } });
    canFetchAssetsCached = res.ok || res.status === 200 || res.status === 206;
    return canFetchAssetsCached;
  } catch {
    canFetchAssetsCached = false;
    return false;
  }
}

/** OCR result from detection. */
export type OcrQuad = Quad;

/** OCR result from recognition. */
export type OcrRecognition = {
  text: string;
  confidence: number;
};

/**
 * OCR adapter interface.
 */
export interface OcrAdapter {
  /** Whether this adapter's models/assets are available. */
  available(): Promise<boolean>;
  /** Detect text regions in a base64 image. Returns normalized quads. */
  detect(base64: string): Promise<OcrQuad[]>;
  /** Recognize text from a cropped base64 image region. */
  recognize(cropBase64: string): Promise<OcrRecognition>;
}

// ============================================================================
// PaddleAdapter — ONNX-based PaddleOCR
// ============================================================================

const DET_MODEL_URL = browser.runtime.getURL('/onnx/ocr_det.onnx');
const REC_MODEL_URL = browser.runtime.getURL('/onnx/ocr_rec.onnx');

let paddleDetSession: ort.InferenceSession | null = null;
let paddleRecSession: ort.InferenceSession | null = null;
let paddleInitAttempted = false;

async function ensurePaddleSessions(): Promise<boolean> {
  if (paddleDetSession && paddleRecSession) return true;
  if (paddleInitAttempted) return false;
  paddleInitAttempted = true;

  if (!isWasmSupported()) {
    console.warn('[ocrEngine] WebAssembly compilation blocked by CSP (degraded)');
    return false;
  }

  const canFetch = await canFetchExtensionAssets();
  if (!canFetch) {
    console.warn('[ocrEngine] Extension assets blocked by page connect-src CSP (degraded)');
    return false;
  }

  try {
    const [detRes, recRes] = await Promise.all([
      fetch(DET_MODEL_URL),
      fetch(REC_MODEL_URL),
    ]);

    if (!detRes.ok || !recRes.ok) {
      throw new Error(`Paddle model fetch failed: det=${detRes.status}, rec=${recRes.status}`);
    }

    const [detBuffer, recBuffer] = await Promise.all([
      detRes.arrayBuffer(),
      recRes.arrayBuffer(),
    ]);

    const profile = await detectHardwareTier();
    ort.env.wasm.numThreads = profile.numThreads;

    const [detSession, recSession] = await Promise.all([
      ort.InferenceSession.create(detBuffer, { executionProviders: profile.executionProviders }),
      ort.InferenceSession.create(recBuffer, { executionProviders: profile.executionProviders }),
    ]);

    paddleDetSession = detSession;
    paddleRecSession = recSession;
    console.log(`[ocrEngine] Sessions created successfully with ${profile.badge} (${profile.executionProviders.join(', ')})`);
    return true;
  } catch (error) {
    console.warn('[ocrEngine] PaddleAdapter init failed (degraded):', error instanceof Error ? error.message : error);
    return false;
  }
}

/**
 * Decode base64 to ImageData via OffscreenCanvas.
 */
async function b64ToImageData(b64: string): Promise<{ data: ImageData; width: number; height: number }> {
  const binaryStr = atob(b64.replace(/^data:image\/\w+;base64,/, ''));
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: 'image/png' });
  const bitmap = await createImageBitmap(blob);
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  return {
    data: ctx.getImageData(0, 0, bitmap.width, bitmap.height),
    width: bitmap.width,
    height: bitmap.height,
  };
}

/** Minimal fallback dict if ocr_dict.txt is absent. */
function defaultDict(): string[] {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return chars.split('');
}

export class PaddleAdapter implements OcrAdapter {
  async available(): Promise<boolean> {
    return ensurePaddleSessions();
  }

  async detect(base64: string): Promise<OcrQuad[]> {
    if (!paddleDetSession) return [];

    try {
      const { data, width, height } = await b64ToImageData(base64);

      // Preprocess: resize to 320x320, NCHW /255.
      const detSize = 320;
      const canvas = new OffscreenCanvas(detSize, detSize);
      const ctx = canvas.getContext('2d')!;
      const tmpCanvas = new OffscreenCanvas(width, height);
      const tmpCtx = tmpCanvas.getContext('2d')!;
      tmpCtx.putImageData(data, 0, 0);
      ctx.drawImage(tmpCanvas, 0, 0, detSize, detSize);
      const resized = ctx.getImageData(0, 0, detSize, detSize);

      const tensor = new Float32Array(3 * detSize * detSize);
      const plane = detSize * detSize;
      for (let i = 0; i < plane; i++) {
        tensor[i] = resized.data[i * 4] / 255;
        tensor[plane + i] = resized.data[i * 4 + 1] / 255;
        tensor[2 * plane + i] = resized.data[i * 4 + 2] / 255;
      }

      const inputName = paddleDetSession.inputNames[0];
      const outputName = paddleDetSession.outputNames[0];
      const feeds: Record<string, ort.Tensor> = {};
      feeds[inputName] = new ort.Tensor('float32', tensor, [1, 3, detSize, detSize]);
      const results = await paddleDetSession.run(feeds);
      const output = results[outputName].data as Float32Array;

      // Build probability map [detSize][detSize].
      const probMap: number[][] = [];
      for (let y = 0; y < detSize; y++) {
        const row: number[] = [];
        for (let x = 0; x < detSize; x++) {
          row.push(output[y * detSize + x]);
        }
        probMap.push(row);
      }

      return dbPostProcess(probMap, width, height);
    } catch (error) {
      console.warn('[ocrEngine] Paddle detect failed:', error instanceof Error ? error.message : error);
      return [];
    }
  }

  async recognize(cropBase64: string): Promise<OcrRecognition> {
    if (!paddleRecSession) return { text: '', confidence: 0 };

    try {
      const { data, width, height } = await b64ToImageData(cropBase64);

      // PaddleOCR rec preprocess: 3 x 32 x W, W = clamp(round(32*aspect), 32, 320).
      const aspect = width / Math.max(height, 1);
      const W = Math.min(320, Math.max(32, Math.round(32 * aspect)));
      const H = 32;

      const canvas = new OffscreenCanvas(W, H);
      const ctx = canvas.getContext('2d')!;
      const tmpCanvas = new OffscreenCanvas(width, height);
      const tmpCtx = tmpCanvas.getContext('2d')!;
      tmpCtx.putImageData(data, 0, 0);
      ctx.drawImage(tmpCanvas, 0, 0, W, H);
      const resized = ctx.getImageData(0, 0, W, H);

      // NCHW, normalize mean 0.5 std 0.5.
      const tensor = new Float32Array(3 * H * W);
      const plane = H * W;
      for (let i = 0; i < plane; i++) {
        tensor[i] = resized.data[i * 4] / 255;
        tensor[plane + i] = resized.data[i * 4 + 1] / 255;
        tensor[2 * plane + i] = resized.data[i * 4 + 2] / 255;
      }
      for (let i = 0; i < 3 * plane; i++) {
        tensor[i] = (tensor[i] - 0.5) / 0.5;
      }

      const inputName = paddleRecSession.inputNames[0];
      const outputName = paddleRecSession.outputNames[0];
      const feeds: Record<string, ort.Tensor> = {};
      feeds[inputName] = new ort.Tensor('float32', tensor, [1, 3, H, W]);
      const results = await paddleRecSession.run(feeds);
      const output = results[outputName].data as Float32Array;

      // output shape: [1, T, V] -> extract [T, V].
      const outShape = results[outputName].dims;
      const T = outShape[1];
      const V = outShape[2];

      const logits: number[][] = [];
      for (let t = 0; t < T; t++) {
        const row: number[] = [];
        for (let v = 0; v < V; v++) {
          row.push(output[t * V + v]);
        }
        logits.push(row);
      }

      const dict = await loadOcrDict();
      const text = ctcGreedyDecode(logits, dict.length > 0 ? dict : ['_', ...defaultDict()]);

      let confSum = 0;
      for (const row of logits) {
        let maxVal = -Infinity;
        let rowSum = 0;
        for (const v of row) {
          if (v > maxVal) maxVal = v;
          rowSum += v;
        }
        // If outputs are already normalized probabilities (summing close to 1.0, 0 <= v <= 1)
        if (Math.abs(rowSum - 1.0) < 0.05 && maxVal <= 1.0 && maxVal >= 0) {
          confSum += maxVal;
        } else {
          // Raw logits: compute numerically stable softmax probability for the winning token
          let sumExp = 0;
          for (const v of row) {
            sumExp += Math.exp(Math.max(-50, Math.min(50, v - maxVal)));
          }
          const maxProb = sumExp > 0 ? 1 / sumExp : 0;
          confSum += maxProb;
        }
      }
      const confidence = logits.length > 0 ? Math.min(1.0, Math.max(0.0, confSum / logits.length)) : 0;

      return { text, confidence };
    } catch (error) {
      console.warn('[ocrEngine] Paddle recognize failed:', error instanceof Error ? error.message : error);
      return { text: '', confidence: 0 };
    }
  }
}

// Alias for backwards compatibility with any existing imports
export { PaddleAdapter as SovereignOcrAdapter };

// ============================================================================
// OCR Engine — pure Sovereign ONNX Engine
// ============================================================================

let ocrStatus: 'live' | 'degraded' = 'degraded';
let selectedAdapter: OcrAdapter | null = null;
let adapterInitPromise: Promise<OcrAdapter | null> | null = null;

async function getAdapter(): Promise<OcrAdapter | null> {
  if (selectedAdapter) return selectedAdapter;
  if (adapterInitPromise) return adapterInitPromise;

  adapterInitPromise = (async () => {
    if (!isWasmSupported()) {
      ocrStatus = 'degraded';
      return null;
    }

    const canFetch = await canFetchExtensionAssets();
    if (!canFetch) {
      ocrStatus = 'degraded';
      return null;
    }

    // Initialize Sovereign ONNX OCR adapter
    const adapter = new PaddleAdapter();
    if (await adapter.available()) {
      selectedAdapter = adapter;
      ocrStatus = 'live';
      return adapter;
    }

    // Models not yet dropped in or initializing
    ocrStatus = 'degraded';
    return null;
  })();

  return adapterInitPromise;
}

/**
 * Checks whether an OCR adapter is actively available without throwing or hanging.
 */
export async function isOcrAvailable(): Promise<boolean> {
  try {
    const adapter = await getAdapter();
    return adapter !== null;
  } catch {
    return false;
  }
}

/** Detect text regions in a base64 image using Sovereign DBNet detector. */
export async function ocrDetect(base64: string): Promise<OcrQuad[]> {
  try {
    if (!isWasmSupported()) return [];
    const adapter = await getAdapter();
    if (!adapter) return [];
    return await adapter.detect(base64);
  } catch {
    return [];
  }
}

/** Recognize text from a cropped base64 image using Sovereign SVTR/CRNN recognizer. */
export async function ocrRecognize(cropBase64: string): Promise<OcrRecognition> {
  try {
    if (!isWasmSupported()) return { text: '', confidence: 0 };
    const adapter = await getAdapter();
    if (!adapter) return { text: '', confidence: 0 };
    return await adapter.recognize(cropBase64);
  } catch {
    return { text: '', confidence: 0 };
  }
}

/** Get the current OCR engine status. */
export function getOcrStatus(): 'live' | 'degraded' {
  return ocrStatus;
}

/**
 * Lightweight file-availability check for Sovereign OCR models.
 * Probes ocr_det.onnx, ocr_rec.onnx, and ocr_dict.txt via HTTP Range requests.
 *
 * Uses GET with Range header instead of HEAD because Chrome MV3 service
 * workers block HEAD requests to browser.runtime.getURL() resources.
 */
export async function checkOcrAvailability(): Promise<boolean> {
  try {
    const DICT_URL = browser.runtime.getURL('/onnx/ocr_dict.txt');
    console.log('[ocrEngine] Checking Sovereign OCR models:', DET_MODEL_URL, REC_MODEL_URL, DICT_URL);
    const [detRes, recRes, dictRes] = await Promise.all([
      fetch(DET_MODEL_URL, { method: 'GET', headers: { Range: 'bytes=0-0' } }),
      fetch(REC_MODEL_URL, { method: 'GET', headers: { Range: 'bytes=0-0' } }),
      fetch(DICT_URL, { method: 'GET', headers: { Range: 'bytes=0-0' } }),
    ]);
    const available =
      (detRes.ok || detRes.status === 206) &&
      (recRes.ok || recRes.status === 206) &&
      (dictRes.ok || dictRes.status === 206);
    console.log('[ocrEngine] Sovereign models available:', available, `(det=${detRes.status}, rec=${recRes.status}, dict=${dictRes.status})`);
    return available;
  } catch (error) {
    console.warn('[ocrEngine] Sovereign OCR check failed:', error instanceof Error ? error.message : error);
    return false;
  }
}
