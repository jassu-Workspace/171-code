/**
 * dbPostProcess.ts — DBNet (Differentiable Binarization) Post-Processing.
 *
 * Converts a DB detector output (probability map) into text region quads:
 *   1. Binarize the probability map (threshold 0.3).
 *   2. Find connected components (simple flood-fill).
 *   3. Compute bounding boxes and unclip (expand by factor 1.5).
 *   4. Filter by minimum area.
 *
 * Pure functions — no browser APIs. Safe for unit testing.
 */

export type Quad = {
  /** Normalized quadrilateral points [x0,y0, x1,y1, x2,y2, x3,y3] in [0,1]. */
  points: number[];
  /** Confidence score (mean probability within the box). */
  confidence: number;
};

const DB_THRESHOLD = 0.3;
const UNCLIP_RATIO = 1.5;
const MIN_AREA = 3; // minimum pixel area to keep a region

/**
 * Binarize a probability map.
 * @param prob 2D array [H][W] of probabilities in [0, 1].
 * @returns Binary 2D array (0 or 1).
 */
export function binarize(prob: number[][], threshold: number = DB_THRESHOLD): number[][] {
  const H = prob.length;
  const W = prob[0]?.length ?? 0;
  const binary: number[][] = [];
  for (let y = 0; y < H; y++) {
    const row: number[] = new Array(W);
    for (let x = 0; x < W; x++) {
      row[x] = prob[y][x] >= threshold ? 1 : 0;
    }
    binary.push(row);
  }
  return binary;
}

/**
 * Find connected components using iterative flood-fill (4-connectivity).
 * @returns Array of components, each is an array of [x, y] pixel coords.
 */
export function connectedComponents(binary: number[][]): number[][][] {
  const H = binary.length;
  const W = binary[0]?.length ?? 0;
  const visited: boolean[][] = Array.from({ length: H }, () => new Array(W).fill(false));
  const components: number[][][] = [];

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (binary[y][x] === 1 && !visited[y][x]) {
        // BFS flood-fill.
        const component: number[][] = [];
        const queue: number[][] = [[x, y]];
        visited[y][x] = true;

        while (queue.length > 0) {
          const [cx, cy] = queue.shift()!;
          component.push([cx, cy]);

          const neighbors = [
            [cx + 1, cy],
            [cx - 1, cy],
            [cx, cy + 1],
            [cx, cy - 1],
          ];

          for (const [nx, ny] of neighbors) {
            if (nx >= 0 && nx < W && ny >= 0 && ny < H && !visited[ny][nx] && binary[ny][nx] === 1) {
              visited[ny][nx] = true;
              queue.push([nx, ny]);
            }
          }
        }

        components.push(component);
      }
    }
  }

  return components;
}

/**
 * Compute the bounding box of a connected component.
 * Returns { minX, minY, maxX, maxY, area }.
 */
function boundingBox(component: number[][]): { minX: number; minY: number; maxX: number; maxY: number; area: number } {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const [x, y] of component) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }

  const w = maxX - minX + 1;
  const h = maxY - minY + 1;
  return { minX, minY, maxX, maxY, area: w * h };
}

/**
 * Unclip (expand) a bounding box by a given ratio while keeping the center.
 */
function unclip(
  minX: number,
  minY: number,
  maxX: number,
  maxY: number,
  ratio: number = UNCLIP_RATIO
): { minX: number; minY: number; maxX: number; maxY: number } {
  const w = maxX - minX;
  const h = maxY - minY;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const newW = w * ratio;
  const newH = h * ratio;

  return {
    minX: Math.max(0, Math.round(cx - newW / 2)),
    minY: Math.max(0, Math.round(cy - newH / 2)),
    maxX: Math.round(cx + newW / 2),
    maxY: Math.round(cy + newH / 2),
  };
}

/**
 * Full DB post-processing pipeline.
 * @param probMap 2D probability map [H][W].
 * @param imgWidth Original image width for normalization.
 * @param imgHeight Original image height for normalization.
 * @returns Array of normalized quads.
 */
export function dbPostProcess(
  probMap: number[][],
  imgWidth: number,
  imgHeight: number
): Quad[] {
  if (probMap.length === 0 || !probMap[0] || probMap[0].length === 0) return [];

  const H = probMap.length;
  const W = probMap[0].length;

  // 1. Binarize.
  const binary = binarize(probMap);

  // 2. Connected components.
  const components = connectedComponents(binary);

  // 3. Convert to quads with unclip + area filter.
  const quads: Quad[] = [];

  for (const component of components) {
    const bb = boundingBox(component);
    if (bb.area < MIN_AREA) continue;

    const expanded = unclip(bb.minX, bb.minY, bb.maxX, bb.maxY);

    // Normalize to [0, 1] relative to original image size.
    const points = [
      expanded.minX / imgWidth,
      expanded.minY / imgHeight,
      expanded.maxX / imgWidth,
      expanded.minY / imgHeight,
      expanded.maxX / imgWidth,
      expanded.maxY / imgHeight,
      expanded.minX / imgWidth,
      expanded.maxY / imgHeight,
    ];

    // Confidence = mean probability within the original box.
    let sum = 0;
    let count = 0;
    for (const [x, y] of component) {
      if (y < H && x < W) {
        sum += probMap[y][x];
        count++;
      }
    }
    const confidence = count > 0 ? sum / count : 0;

    quads.push({ points, confidence });
  }

  return quads;
}
