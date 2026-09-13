/**
 * copy-assets.mjs — Copies static ML assets from public/ to the WXT build output.
 *
 * WXT does NOT automatically copy public/ subdirectories to .output/chrome-mv3/,
 * so this script runs as a postbuild hook to ensure model files are present.
 *
 * Run automatically via: npm run build (postbuild hook)
 */

import { mkdir, copyFile, access, rm } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC_DIR = join(ROOT, 'public');
const OUTPUT_DIR = join(ROOT, '.output', 'chrome-mv3');

/** Directories to copy from public/ to build output */
const ASSET_DIRS = ['mediapipe', 'onnx'];

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function copyDir(srcDir, destDir) {
  const entries = await readdir(srcDir, { withFileTypes: true });
  let copied = 0;
  for (const entry of entries) {
    const srcPath = join(srcDir, entry.name);
    const destPath = join(destDir, entry.name);
    if (entry.isDirectory()) {
      copied += await copyDir(srcPath, destPath);
    } else {
      await mkdir(dirname(destPath), { recursive: true });
      await copyFile(srcPath, destPath);
      copied++;
      console.log(`  [copied] ${relative(ROOT, srcPath)} -> ${relative(ROOT, destPath)}`);
    }
  }
  return copied;
}

// Import readdir from fs/promises
import { readdir } from 'node:fs/promises';

async function main() {
  console.log('📦 copy-assets — copying ML model files to build output\n');

  if (!(await fileExists(PUBLIC_DIR))) {
    console.warn(`  [warn] public/ directory not found at ${PUBLIC_DIR}`);
    return;
  }

  if (!(await fileExists(OUTPUT_DIR))) {
    console.warn(`  [warn] Build output not found at ${OUTPUT_DIR}. Run wxt build first.`);
    return;
  }

  let totalCopied = 0;
  for (const dir of ASSET_DIRS) {
    const srcDir = join(PUBLIC_DIR, dir);
    const destDir = join(OUTPUT_DIR, dir);
    if (await fileExists(srcDir)) {
      // Clean destination first to prevent stale/nested duplicates
      if (await fileExists(destDir)) {
        await rm(destDir, { recursive: true, force: true });
      }
      console.log(`  [copy] ${dir}/`);
      totalCopied += await copyDir(srcDir, destDir);
    } else {
      console.log(`  [skip] ${dir}/ not found in public/`);
    }
  }

  console.log(`\n✅ copy-assets complete. ${totalCopied} files copied.`);
}

main().catch((error) => {
  console.error('❌ copy-assets failed:', error);
  process.exit(1);
});
