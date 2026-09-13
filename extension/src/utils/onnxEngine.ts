/**
 * onnxEngine.ts — Local UI Element Detection via ONNX Runtime Web.
 *
 * Loads a YOLOv8 ONNX model (ui_detector.onnx) from the extension's public
 * directory and runs inference entirely on-device. Designed as the landing
 * zone for a fine-tuned YOLOv8n/YOLOv8m model.
 *
 * Graceful degradation: if the model file is absent or inference fails,
 * status flips to 'degraded' and detectUIElements returns [].
 *
 * All model fetches use browser.runtime.getURL(...) — never remote CDNs.
 */
import { browser } from 'wxt/browser';
import * as ort from 'onnxruntime-web';
import { computeIoU, nms } from './nms';
import { imageDataToNCHW } from './tensor';
import { detectHardwareTier } from './hardwareTier';

const MODEL_URL = browser.runtime.getURL('/onnx/ui_detector.onnx');

/** Class names the YOLO model was trained on (index = class id). */
export const CLASS_NAMES = [
  'button',
  'input',
  'link',
  'image',
  'dropdown',
  'option',
  'checkbox_radio',
  'tab',
];

/** Confidence threshold for keeping a detection. */
const CONF_THRESHOLD = 0.4;
/** IoU threshold for greedy NMS. */
const IOU_THRESHOLD = 0.45;
/** Model input resolution (square). */
const MODEL_SIZE = 640;
/** Number of YOLOv8 anchor points. */
const NUM_ANCHORS = 8400;

export type UIElement = {
  type: 'ui_element';
  className: string;
  confidence: number;
  bbox: [number, number, number, number]; // [x, y, w, h] in original image pixels
};

let session: ort.InferenceSession | null = null;
let sessionPromise: Promise<ort.InferenceSession | null> | null = null;
let modelStatus: 'live' | 'degraded' = 'degraded';

/**
 * Lazily create the ONNX inference session (cached).
 * Returns null if the model file is absent or session creation fails.
 */
async function getSession(): Promise<ort.InferenceSession | null> {
  if (session) return session;
  if (sessionPromise) return sessionPromise;

  sessionPromise = (async () => {
    try {
      const res = await fetch(MODEL_URL);
      if (!res.ok) {
        throw new Error(`Model fetch failed with status ${res.status}`);
      }
      const buffer = await res.arrayBuffer();
      const profile = await detectHardwareTier();
      ort.env.wasm.numThreads = profile.numThreads;
      const newSession = await ort.InferenceSession.create(buffer, {
        executionProviders: profile.executionProviders,
        graphOptimizationLevel: 'all',
      });
      session = newSession;
      modelStatus = 'live';
      console.log(`[onnxEngine] Session created successfully with ${profile.badge} (${profile.executionProviders.join(', ')})`);
      return newSession;
    } catch (error) {
      modelStatus = 'degraded';
      console.warn('[onnxEngine] Session creation failed (degraded):', error instanceof Error ? error.message : error);
      return null;
    }
  })();

  return sessionPromise;
}

/**
 * Decode base64 -> ImageData by drawing to an OffscreenCanvas at original size.
 * Returns { imageData, width, height }.
 */
async function decodeBase64ToImageData(base64: string): Promise<{ imageData: ImageData; width: number; height: number }> {
  if (!base64 || typeof base64 !== 'string' || base64.trim().length === 0) {
    throw new Error('decodeBase64ToImageData: Invalid or empty base64 string');
  }

  const b64 = base64.replace(/^data:image\/\w+;base64,/, '');
  if (!b64 || b64.trim().length === 0) {
    throw new Error('decodeBase64ToImageData: Empty base64 payload');
  }

  let binary: string;
  try {
    binary = atob(b64);
  } catch (err) {
    throw new Error(`decodeBase64ToImageData: Failed to decode base64: ${err instanceof Error ? err.message : String(err)}`);
  }

  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: 'image/png' });
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(blob);
  } catch (err) {
    throw new Error(`decodeBase64ToImageData: Failed to create ImageBitmap from blob: ${err instanceof Error ? err.message : String(err)}`);
  }

  const width = bitmap.width;
  const height = bitmap.height;

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    bitmap.close();
    throw new Error('Failed to get 2D context from OffscreenCanvas');
  }
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  const imageData = ctx.getImageData(0, 0, width, height);
  return { imageData, width, height };
}

/**
 * Preprocess a base64 image to the model's input tensor [1, 3, 640, 640].
 * Resizes the image to 640x640 and converts to NCHW normalized Float32.
 */
export async function preprocess(base64: string): Promise<{ tensor: Float32Array; origWidth: number; origHeight: number }> {
  const { imageData, width, height } = await decodeBase64ToImageData(base64);

  const canvas = new OffscreenCanvas(MODEL_SIZE, MODEL_SIZE);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2D context');

  const tempCanvas = new OffscreenCanvas(width, height);
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) throw new Error('Failed to get temp 2D context');
  tempCtx.putImageData(imageData, 0, 0);

  ctx.drawImage(tempCanvas, 0, 0, MODEL_SIZE, MODEL_SIZE);
  const resizedData = ctx.getImageData(0, 0, MODEL_SIZE, MODEL_SIZE);

  const tensor = imageDataToNCHW(resizedData);
  return { tensor, origWidth: width, origHeight: height };
}

/**
 * Postprocess YOLOv8 output [1, 4+C, 8400] or [1, 8400, 4+C] -> UIElement[].
 * Supports both native Ultralytics layout [1, C, 8400] (channel-first) and
 * transposed [1, 8400, C] (anchor-first).
 * Filters by confidence, runs NMS, scales boxes back to original pixels.
 */
export function postprocess(
  output: Float32Array | number[],
  origWidth: number,
  origHeight: number,
  tensorDims?: readonly number[] | number[]
): UIElement[] {
  const numClasses = CLASS_NAMES.length;
  const dims = 4 + numClasses;
  const totalAnchors = NUM_ANCHORS;

  // Determine layout:
  // Channel-first (native Ultralytics export): shape [1, dims, totalAnchors]
  // Anchor-first (transposed export): shape [1, totalAnchors, dims]
  let isChannelFirst = true;
  if (tensorDims && tensorDims.length >= 3) {
    if (tensorDims[1] === dims && tensorDims[2] === totalAnchors) {
      isChannelFirst = true;
    } else if (tensorDims[1] === totalAnchors && tensorDims[2] === dims) {
      isChannelFirst = false;
    }
  }

  const candidates: number[][] = [];

  for (let a = 0; a < totalAnchors; a++) {
    const cx = isChannelFirst ? output[0 * totalAnchors + a] : output[a * dims + 0];
    const cy = isChannelFirst ? output[1 * totalAnchors + a] : output[a * dims + 1];
    const w = isChannelFirst ? output[2 * totalAnchors + a] : output[a * dims + 2];
    const h = isChannelFirst ? output[3 * totalAnchors + a] : output[a * dims + 3];

    let maxScore = 0;
    let maxClass = 0;
    for (let c = 0; c < numClasses; c++) {
      const score = isChannelFirst
        ? output[(4 + c) * totalAnchors + a]
        : output[a * dims + 4 + c];
      if (score > maxScore) {
        maxScore = score;
        maxClass = c;
      }
    }

    if (maxScore < CONF_THRESHOLD) continue;

    const x = cx - w / 2;
    const y = cy - h / 2;
    candidates.push([x, y, w, h, maxScore, maxClass]);
  }

  if (candidates.length === 0) return [];

  const keepIndices = nms(candidates, IOU_THRESHOLD);

  const scaleX = origWidth / MODEL_SIZE;
  const scaleY = origHeight / MODEL_SIZE;

  const results: UIElement[] = [];
  for (const idx of keepIndices) {
    const [x, y, w, h, conf, cls] = candidates[idx];
    results.push({
      type: 'ui_element',
      className: CLASS_NAMES[cls],
      confidence: conf,
      bbox: [x * scaleX, y * scaleY, w * scaleX, h * scaleY],
    });
  }

  return results;
}

/**
 * Detect UI elements in a base64 image.
 * Returns [] on any failure (model absent, inference error, etc.).
 */
export async function detectUIElements(base64: string): Promise<UIElement[]> {
  if (!base64 || typeof base64 !== 'string' || base64.trim().length === 0) {
    return [];
  }
  const startTime = Date.now();
  try {
    const sess = await getSession();
    if (!sess) return [];

    const { tensor, origWidth, origHeight } = await preprocess(base64);

    const inputName = sess.inputNames[0];
    const outputName = sess.outputNames[0];

    const inputTensor = new ort.Tensor('float32', tensor, [1, 3, MODEL_SIZE, MODEL_SIZE]);

    const feeds: Record<string, ort.Tensor> = {};
    feeds[inputName] = inputTensor;
    const results = await sess.run(feeds);

    const outputTensor = results[outputName];
    const outputData = outputTensor.data as Float32Array;

    const elements = postprocess(outputData, origWidth, origHeight, outputTensor.dims);

    const elapsed = Date.now() - startTime;
    console.log(`[onnxEngine] Detected ${elements.length} UI elements in ${elapsed}ms`);
    return elements;
  } catch (error) {
    modelStatus = 'degraded';
    console.warn('[onnxEngine] detectUIElements failed (degraded):', error instanceof Error ? error.message : error);
    return [];
  }
}

/**
 * Get the current UI model status.
 */
export function getUIStatus(): 'live' | 'degraded' {
  return modelStatus;
}

/**
 * Lightweight file-availability check — fetches the model URL and returns
 * true if the file exists (HTTP 200 or 206). Does NOT load the session; safe
 * to call at idle so the dashboard can show LIVE when the file is present.
 *
 * Uses GET with Range header instead of HEAD because Chrome MV3 service
 * workers block HEAD requests to browser.runtime.getURL() resources.
 */
export async function checkModelAvailability(): Promise<boolean> {
  console.log('[onnxEngine] Checking:', MODEL_URL);
  try {
    const res = await fetch(MODEL_URL, {
      method: 'GET',
      headers: { Range: 'bytes=0-0' },
    });
    console.log('[onnxEngine] Response status:', res.status);
    // Accept 200 (OK) or 206 (Partial Content) as success
    return res.ok || res.status === 206;
  } catch (error) {
    console.error('[onnxEngine] Availability check failed:', error instanceof Error ? error.message : error);
    return false;
  }
}
