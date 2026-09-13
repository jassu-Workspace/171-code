/**
 * tensor.ts — Pure tensor preprocessing math.
 *
 * Zero dependencies — safe to import in any environment.
 * Re-exported by onnxEngine.ts for production use.
 */

/**
 * Convert ImageData (RGBA, HWC) to NCHW Float32 tensor normalized to [0, 1].
 * @returns Float32Array of length 3 * height * width (RGB, row-major per channel).
 */
export function imageDataToNCHW(imageData: ImageData): Float32Array {
  const { width, height, data } = imageData;
  const tensor = new Float32Array(3 * width * height);
  const planeSize = width * height;

  for (let i = 0; i < planeSize; i++) {
    const r = data[i * 4] / 255;
    const g = data[i * 4 + 1] / 255;
    const b = data[i * 4 + 2] / 255;
    tensor[i] = r;
    tensor[planeSize + i] = g;
    tensor[2 * planeSize + i] = b;
  }

  return tensor;
}
