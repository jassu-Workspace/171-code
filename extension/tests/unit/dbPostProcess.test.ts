/**
 * Pure-function tests for DB (Differentiable Binarization) post-processing.
 * No browser APIs — fully decoupled from production imports.
 */
import { describe, it, expect } from 'vitest';
import { dbPostProcess, binarize, connectedComponents } from '../../src/utils/dbPostProcess';

describe('binarize', () => {
  it('thresholds correctly at 0.3', () => {
    const prob = [
      [0.1, 0.5],
      [0.3, 0.29],
    ];
    const binary = binarize(prob, 0.3);
    expect(binary[0][0]).toBe(0); // 0.1 < 0.3
    expect(binary[0][1]).toBe(1); // 0.5 >= 0.3
    expect(binary[1][0]).toBe(1); // 0.3 >= 0.3
    expect(binary[1][1]).toBe(0); // 0.29 < 0.3
  });
});

describe('connectedComponents', () => {
  it('finds a single connected blob', () => {
    const binary = [
      [0, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ];
    const components = connectedComponents(binary);
    expect(components.length).toBe(1);
    expect(components[0].length).toBe(3); // 3 pixels in the blob
  });

  it('finds two separate blobs', () => {
    const binary = [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1],
    ];
    const components = connectedComponents(binary);
    // 4 isolated pixels = 4 components (no diagonal connectivity).
    expect(components.length).toBe(4);
  });
});

describe('dbPostProcess', () => {
  it('returns one quad for a single blob', () => {
    // 10x10 probability map with a blob in the center.
    const prob: number[][] = Array.from({ length: 10 }, () => new Array(10).fill(0));
    prob[4][4] = 0.9;
    prob[4][5] = 0.9;
    prob[5][4] = 0.9;
    prob[5][5] = 0.9;

    const quads = dbPostProcess(prob, 100, 100);
    expect(quads.length).toBe(1);

    const quad = quads[0];
    expect(quad.points.length).toBe(8); // 4 corners * 2 coords
    // All points should be normalized to [0, 1].
    for (const p of quad.points) {
      expect(p).toBeGreaterThanOrEqual(0);
      expect(p).toBeLessThanOrEqual(1);
    }
    expect(quad.confidence).toBeGreaterThan(0);
  });

  it('returns empty for empty input', () => {
    expect(dbPostProcess([], 100, 100)).toEqual([]);
  });

  it('returns empty when no pixels exceed threshold', () => {
    const prob: number[][] = Array.from({ length: 5 }, () => new Array(5).fill(0.1));
    expect(dbPostProcess(prob, 50, 50)).toEqual([]);
  });

  it('filters tiny blobs (min area)', () => {
    // Single pixel blob (area=1, below MIN_AREA=3).
    const prob: number[][] = Array.from({ length: 10 }, () => new Array(10).fill(0));
    prob[5][5] = 0.9;

    const quads = dbPostProcess(prob, 100, 100);
    expect(quads.length).toBe(0);
  });
});
