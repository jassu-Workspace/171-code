/**
 * nms.ts — Pure NMS and IoU math.
 *
 * Zero dependencies — safe to import in any environment (browser, node, tests).
 * Re-exported by onnxEngine.ts for production use.
 */

/**
 * Compute Intersection-over-Union between two boxes [x, y, w, h].
 */
export function computeIoU(a: number[], b: number[]): number {
  const ax2 = a[0] + a[2];
  const ay2 = a[1] + a[3];
  const bx2 = b[0] + b[2];
  const by2 = b[1] + b[3];

  const interX = Math.max(0, Math.min(ax2, bx2) - Math.max(a[0], b[0]));
  const interY = Math.max(0, Math.min(ay2, by2) - Math.max(a[1], b[1]));
  const interArea = interX * interY;

  const areaA = a[2] * a[3];
  const areaB = b[2] * b[3];
  const union = areaA + areaB - interArea;

  return union > 0 ? interArea / union : 0;
}

/**
 * Greedy Non-Maximum Suppression.
 * @param boxes Array of [x, y, w, h, confidence, classId]
 * @returns Indices of boxes to keep.
 */
export function nms(boxes: number[][], iouThreshold: number = 0.45): number[] {
  if (boxes.length === 0) return [];

  const indices = boxes.map((_, i) => i);
  indices.sort((a, b) => boxes[b][4] - boxes[a][4]);

  const keep: number[] = [];
  const suppressed = new Set<number>();

  for (const i of indices) {
    if (suppressed.has(i)) continue;
    keep.push(i);
    for (const j of indices) {
      if (j === i || suppressed.has(j)) continue;
      if (computeIoU(boxes[i], boxes[j]) > iouThreshold) {
        suppressed.add(j);
      }
    }
  }

  return keep;
}
