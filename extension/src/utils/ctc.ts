/**
 * ctc.ts — Greedy CTC Decoder.
 *
 * Implements the standard greedy (best-path) decoder for CTC outputs:
 *   1. Take the argmax at each timestep.
 *   2. Collapse consecutive repeated labels.
 *   3. Drop blank tokens (index 0).
 *
 * Pure function — no browser APIs. Safe for unit testing.
 */

/**
 * Greedy CTC decode over a 2D probability matrix.
 * @param logits Array of length T, each element is an array of length V (vocab size).
 *               logits[t][v] = probability of vocab item v at timestep t.
 * @param dict Array of characters, one per line. dict[0] is the CTC blank.
 * @returns Decoded string.
 */
export function ctcGreedyDecode(logits: number[][], dict: string[]): string {
  if (logits.length === 0 || dict.length === 0) return '';

  const T = logits.length;
  const blankIdx = 0;

  // Step 1: argmax per timestep.
  const path: number[] = new Array(T);
  for (let t = 0; t < T; t++) {
    const row = logits[t];
    let best = 0;
    let bestVal = -Infinity;
    for (let v = 0; v < row.length && v < dict.length; v++) {
      if (row[v] > bestVal) {
        bestVal = row[v];
        best = v;
      }
    }
    path[t] = best;
  }

  // Step 2: collapse repeats, drop blanks.
  let result = '';
  let prev = -1;
  for (let t = 0; t < T; t++) {
    const label = path[t];
    if (label === blankIdx) {
      prev = label;
      continue;
    }
    if (label === prev) {
      // repeated label — collapse
      continue;
    }
    // Emit character.
    if (label < dict.length) {
      result += dict[label];
    }
    prev = label;
  }

  return result;
}

/**
 * Parse raw dictionary text into an array of token strings.
 * Preserves space (' ') tokens and strips carriage returns without trimming.
 * Pure function — safe for unit testing.
 */
export function parseOcrDict(rawText: string): string[] {
  return rawText
    .split('\n')
    .map((line) => line.replace(/\r$/, ''))
    .filter((line, idx, arr) => !(idx === arr.length - 1 && line === ''));
}

/**
 * Load the OCR dictionary from /onnx/ocr_dict.txt.
 * One character per line. Index 0 is the CTC blank (usually '_' or '').
 * Cached after first load.
 */
let cachedDict: string[] | null = null;

export async function loadOcrDict(): Promise<string[]> {
  if (cachedDict) return cachedDict;

  try {
    const { browser: wxtBrowser } = await import('wxt/browser');
    const url = wxtBrowser.runtime.getURL('/onnx/ocr_dict.txt');
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Dict fetch failed: ${res.status}`);
    }
    const text = await res.text();
    cachedDict = parseOcrDict(text);
    return cachedDict;
  } catch {
    return [];
  }
}

/**
 * Synchronous decode using a pre-loaded dictionary.
 * Exported for testing and for use when dict is already in memory.
 */
export function ctcDecodeWithDict(logits: number[][], dict: string[]): string {
  return ctcGreedyDecode(logits, dict);
}
