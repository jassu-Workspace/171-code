/**
 * Pure-function tests for NMS and IoU.
 * No browser APIs — fully decoupled from production imports.
 */
import { describe, it, expect } from 'vitest';
import { nms, computeIoU } from '../../src/utils/nms';

describe('computeIoU', () => {
  it('returns 1.0 for identical boxes', () => {
    const box = [0, 0, 10, 10];
    expect(computeIoU(box, box)).toBeCloseTo(1.0, 5);
  });

  it('returns 0.0 for disjoint boxes', () => {
    const a = [0, 0, 10, 10];
    const b = [100, 100, 10, 10];
    expect(computeIoU(a, b)).toBe(0);
  });

  it('returns correct IoU for partially overlapping boxes', () => {
    const a = [0, 0, 10, 10]; // area 100
    const b = [5, 0, 10, 10]; // area 100, overlap 5x10=50
    // IoU = 50 / (100 + 100 - 50) = 50/150 = 0.333
    expect(computeIoU(a, b)).toBeCloseTo(0.333, 2);
  });
});

describe('nms', () => {
  it('collapses overlapping boxes, keeps highest confidence', () => {
    // Two nearly-identical boxes with different confidences.
    const boxes = [
      [10, 10, 50, 50, 0.9, 0], // high conf
      [11, 11, 50, 50, 0.6, 0], // lower conf, high overlap
      [200, 200, 30, 30, 0.8, 1], // far away
    ];
    const keep = nms(boxes, 0.45);
    // Should keep box 0 (suppresses box 1) and box 2.
    expect(keep).toContain(0);
    expect(keep).toContain(2);
    expect(keep).not.toContain(1);
    expect(keep.length).toBe(2);
  });

  it('keeps disjoint boxes', () => {
    const boxes = [
      [0, 0, 10, 10, 0.9, 0],
      [100, 100, 10, 10, 0.8, 0],
      [200, 200, 10, 10, 0.7, 0],
    ];
    const keep = nms(boxes, 0.45);
    expect(keep.length).toBe(3);
  });

  it('returns empty for empty input', () => {
    expect(nms([], 0.45)).toEqual([]);
  });

  it('sorts by confidence descending', () => {
    const boxes = [
      [0, 0, 10, 10, 0.5, 0],
      [100, 100, 10, 10, 0.9, 0],
      [200, 200, 10, 10, 0.7, 0],
    ];
    const keep = nms(boxes, 0.45);
    // Highest confidence (index 1) should be first.
    expect(keep[0]).toBe(1);
  });
});
