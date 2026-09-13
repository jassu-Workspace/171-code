/**
 * fetch-models.mjs — One-time downloader for local ML assets.
 *
 * Downloads MediaPipe WASM + model, Tesseract.js worker/core, and tessdata
 * into extension/public/ so the extension can load everything via
 * browser.runtime.getURL(...) — no remote CDNs at runtime.
 *
 * Idempotent: skips any file that already exists.
 * Run via: npm run fetch-models
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

/** @type {Array<{ url: string; dest: string }>} */
const ASSETS = [
  // MediaPipe Tasks Vision WASM runtime (v0.10.14)
  {
    url: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm/vision_wasm_internal.js',
    dest: 'public/mediapipe/wasm/vision_wasm_internal.js',
  },
  {
    url: 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm/vision_wasm_internal.wasm',
    dest: 'public/mediapipe/wasm/vision_wasm_internal.wasm',
  },
  // MediaPipe FaceLandmarker model (float16)
  {
    url: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
    dest: 'public/mediapipe/face_landmarker.task',
  },
];

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function downloadAsset({ url, dest }) {
  const absDest = join(ROOT, dest);
  if (await fileExists(absDest)) {
    console.log(`  [skip] ${dest} already exists`);
    return;
  }
  console.log(`  [fetch] ${url}`);
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  [warn] ${url} -> HTTP ${res.status} (skipped)`);
    return;
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(absDest), { recursive: true });
  await writeFile(absDest, buffer);
  console.log(`  [ok] ${dest} (${buffer.length} bytes)`);
}

async function main() {
  console.log('📦 fetch-models — downloading local ML assets\n');
  for (const asset of ASSETS) {
    try {
      await downloadAsset(asset);
    } catch (error) {
      console.warn(`  [warn] Failed to download ${asset.url}: ${error instanceof Error ? error.message : error}`);
    }
  }
  console.log('\n✅ fetch-models complete.');
}

main();
