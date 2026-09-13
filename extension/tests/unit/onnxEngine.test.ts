import { describe, it, expect, vi } from 'vitest';

vi.mock('wxt/browser', () => ({
  browser: {
    runtime: {
      getURL: (path: string) => `chrome-extension://mock-id${path}`,
    },
  },
}));

import { postprocess, CLASS_NAMES } from '../../src/utils/onnxEngine';

describe('onnxEngine - 8-Class UI Detector Postprocessing', () => {
  const NUM_ANCHORS = 8400;
  const NUM_CLASSES = 8;
  const DIMS = 4 + NUM_CLASSES; // 12

  it('exposes the full 8-class taxonomy including dropdown and option', () => {
    expect(CLASS_NAMES).toEqual([
      'button',
      'input',
      'link',
      'image',
      'dropdown',
      'option',
      'checkbox_radio',
      'tab',
    ]);
    expect(CLASS_NAMES[4]).toBe('dropdown');
    expect(CLASS_NAMES[5]).toBe('option');
    expect(CLASS_NAMES[6]).toBe('checkbox_radio');
    expect(CLASS_NAMES[7]).toBe('tab');
  });

  it('correctly postprocesses Layout A (native Ultralytics [1, 12, 8400] channel-first)', () => {
    // Total elements: 12 * 8400 = 100,800
    const output = new Float32Array(DIMS * NUM_ANCHORS);

    // Anchor 10: Dropdown (class index 4) at (100, 150), size (120, 35), conf 0.88
    const a10 = 10;
    output[0 * NUM_ANCHORS + a10] = 100; // cx
    output[1 * NUM_ANCHORS + a10] = 150; // cy
    output[2 * NUM_ANCHORS + a10] = 120; // w
    output[3 * NUM_ANCHORS + a10] = 35;  // h
    output[(4 + 4) * NUM_ANCHORS + a10] = 0.88; // dropdown score

    // Anchor 20: Option (class index 5) at (100, 190), size (120, 25), conf 0.92
    const a20 = 20;
    output[0 * NUM_ANCHORS + a20] = 100; // cx
    output[1 * NUM_ANCHORS + a20] = 190; // cy
    output[2 * NUM_ANCHORS + a20] = 120; // w
    output[3 * NUM_ANCHORS + a20] = 25;  // h
    output[(4 + 5) * NUM_ANCHORS + a20] = 0.92; // option score

    // Anchor 30: Button (class index 0) at (500, 40), size (80, 30), conf 0.85
    const a30 = 30;
    output[0 * NUM_ANCHORS + a30] = 500; // cx
    output[1 * NUM_ANCHORS + a30] = 40;  // cy
    output[2 * NUM_ANCHORS + a30] = 80;  // w
    output[3 * NUM_ANCHORS + a30] = 30;  // h
    output[(4 + 0) * NUM_ANCHORS + a30] = 0.85; // button score

    const results = postprocess(output, 1280, 720, [1, 12, 8400]);

    expect(results.length).toBe(3);

    const dropdown = results.find(r => r.className === 'dropdown');
    expect(dropdown).toBeDefined();
    expect(dropdown!.confidence).toBeCloseTo(0.88, 2);
    // Scaled to 1280x720: scaleX = 1280/640 = 2, scaleY = 720/640 = 1.125
    // x = 100 - 60 = 40 -> 40 * 2 = 80
    expect(dropdown!.bbox[0]).toBeCloseTo(80, 1);

    const option = results.find(r => r.className === 'option');
    expect(option).toBeDefined();
    expect(option!.confidence).toBeCloseTo(0.92, 2);

    const button = results.find(r => r.className === 'button');
    expect(button).toBeDefined();
    expect(button!.confidence).toBeCloseTo(0.85, 2);
  });

  it('correctly postprocesses Layout B (transposed [1, 8400, 12] anchor-first)', () => {
    const output = new Float32Array(DIMS * NUM_ANCHORS);

    // Anchor 5: Tab (class index 7) at (200, 20), size (90, 28), conf 0.78
    const a5 = 5;
    output[a5 * DIMS + 0] = 200; // cx
    output[a5 * DIMS + 1] = 20;  // cy
    output[a5 * DIMS + 2] = 90;  // w
    output[a5 * DIMS + 3] = 28;  // h
    output[a5 * DIMS + 4 + 7] = 0.78; // tab score

    // Anchor 15: Checkbox/Radio (class index 6) at (30, 300), size (20, 20), conf 0.82
    const a15 = 15;
    output[a15 * DIMS + 0] = 30; // cx
    output[a15 * DIMS + 1] = 300; // cy
    output[a15 * DIMS + 2] = 20;  // w
    output[a15 * DIMS + 3] = 20;  // h
    output[a15 * DIMS + 4 + 6] = 0.82; // checkbox_radio score

    const results = postprocess(output, 640, 640, [1, 8400, 12]);

    expect(results.length).toBe(2);

    const tab = results.find(r => r.className === 'tab');
    expect(tab).toBeDefined();
    expect(tab!.confidence).toBeCloseTo(0.78, 2);

    const checkbox = results.find(r => r.className === 'checkbox_radio');
    expect(checkbox).toBeDefined();
    expect(checkbox!.confidence).toBeCloseTo(0.82, 2);
  });

  it('suppresses candidates below confidence threshold (0.4)', () => {
    const output = new Float32Array(DIMS * NUM_ANCHORS);

    // Anchor 1: Weak detection (conf 0.25)
    output[0 * NUM_ANCHORS + 1] = 100;
    output[1 * NUM_ANCHORS + 1] = 100;
    output[2 * NUM_ANCHORS + 1] = 50;
    output[3 * NUM_ANCHORS + 1] = 50;
    output[(4 + 4) * NUM_ANCHORS + 1] = 0.25; // below 0.4

    const results = postprocess(output, 640, 640, [1, 12, 8400]);
    expect(results).toHaveLength(0);
  });
});
