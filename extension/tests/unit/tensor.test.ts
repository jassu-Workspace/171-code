/**
 * Pure-function tests for tensor preprocessing (imageDataToNCHW).
 * Verifies exact NCHW values for a known 2x2 RGBA input.
 * No browser APIs — we construct a minimal ImageData-like object.
 */
import { describe, it, expect } from 'vitest';
import { imageDataToNCHW } from '../../src/utils/tensor';

/** Minimal ImageData stand-in (vitest node environment has no real ImageData). */
function makeImageData(width: number, height: number, rgba: Uint8Array) {
  return { width, height, data: rgba } as unknown as ImageData;
}

describe('imageDataToNCHW', () => {
  it('converts a 2x2 RGBA image to exact NCHW normalized values', () => {
    // 2x2 image:
    //   pixel(0,0) = R=255, G=0,   B=0,   A=255  (pure red)
    //   pixel(1,0) = R=0,   G=255, B=0,   A=255  (pure green)
    //   pixel(0,1) = R=0,   G=0,   B=255, A=255  (pure blue)
    //   pixel(1,1) = R=128, G=128, B=128, A=255 (gray)
    const rgba = new Uint8Array([
      255, 0, 0, 255,   // (0,0) red
      0, 255, 0, 255,   // (1,0) green
      0, 0, 255, 255,   // (0,1) blue
      128, 128, 128, 255, // (1,1) gray
    ]);

    const imageData = makeImageData(2, 2, rgba);
    const tensor = imageDataToNCHW(imageData);

    // Expected: 3 * 2 * 2 = 12 elements.
    expect(tensor.length).toBe(12);

    const planeSize = 4; // 2*2

    // R plane (indices 0..3): row-major.
    expect(tensor[0]).toBeCloseTo(255 / 255, 5); // pixel(0,0) R
    expect(tensor[1]).toBeCloseTo(0 / 255, 5);   // pixel(1,0) R
    expect(tensor[2]).toBeCloseTo(0 / 255, 5);   // pixel(0,1) R
    expect(tensor[3]).toBeCloseTo(128 / 255, 5); // pixel(1,1) R

    // G plane (indices 4..7).
    expect(tensor[planeSize + 0]).toBeCloseTo(0 / 255, 5);   // pixel(0,0) G
    expect(tensor[planeSize + 1]).toBeCloseTo(255 / 255, 5); // pixel(1,0) G
    expect(tensor[planeSize + 2]).toBeCloseTo(0 / 255, 5);   // pixel(0,1) G
    expect(tensor[planeSize + 3]).toBeCloseTo(128 / 255, 5); // pixel(1,1) G

    // B plane (indices 8..11).
    expect(tensor[2 * planeSize + 0]).toBeCloseTo(0 / 255, 5);   // pixel(0,0) B
    expect(tensor[2 * planeSize + 1]).toBeCloseTo(0 / 255, 5);   // pixel(1,0) B
    expect(tensor[2 * planeSize + 2]).toBeCloseTo(255 / 255, 5); // pixel(0,1) B
    expect(tensor[2 * planeSize + 3]).toBeCloseTo(128 / 255, 5); // pixel(1,1) B
  });

  it('handles a 1x1 black pixel', () => {
    const rgba = new Uint8Array([0, 0, 0, 255]);
    const imageData = makeImageData(1, 1, rgba);
    const tensor = imageDataToNCHW(imageData);
    expect(tensor.length).toBe(3);
    expect(tensor[0]).toBe(0); // R
    expect(tensor[1]).toBe(0); // G
    expect(tensor[2]).toBe(0); // B
  });
});
