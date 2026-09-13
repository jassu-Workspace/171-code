/**
 * Pure-function tests for CTC greedy decode.
 * No browser APIs — fully decoupled from production imports.
 */
import { describe, it, expect } from 'vitest';
import { ctcGreedyDecode, parseOcrDict } from '../../src/utils/ctc';

// Simple dict: index 0 = blank ('_'), 1='a', 2='b', 3='c'
const DICT = ['_', 'a', 'b', 'c'];

describe('ctcGreedyDecode', () => {
  it('decodes a simple sequence', () => {
    // Timesteps: a, a, b, c
    const logits = [
      [0.1, 0.9, 0.0, 0.0], // a
      [0.1, 0.9, 0.0, 0.0], // a (repeat)
      [0.0, 0.1, 0.8, 0.1], // b
      [0.0, 0.1, 0.1, 0.8], // c
    ];
    expect(ctcGreedyDecode(logits, DICT)).toBe('abc');
  });

  it('collapses consecutive repeats', () => {
    const logits = [
      [0.1, 0.9, 0.0, 0.0], // a
      [0.1, 0.9, 0.0, 0.0], // a (repeat)
      [0.1, 0.9, 0.0, 0.0], // a (repeat)
      [0.0, 0.1, 0.8, 0.1], // b
    ];
    expect(ctcGreedyDecode(logits, DICT)).toBe('ab');
  });

  it('drops blank tokens (index 0)', () => {
    const logits = [
      [0.9, 0.1, 0.0, 0.0], // blank
      [0.1, 0.9, 0.0, 0.0], // a
      [0.9, 0.1, 0.0, 0.0], // blank
      [0.0, 0.1, 0.8, 0.1], // b
      [0.9, 0.1, 0.0, 0.0], // blank
    ];
    expect(ctcGreedyDecode(logits, DICT)).toBe('ab');
  });

  it('handles blank between same chars (no double letter)', () => {
    // a, blank, a -> should be 'aa' (blank separates the two a's)
    const logits = [
      [0.1, 0.9, 0.0, 0.0], // a
      [0.9, 0.1, 0.0, 0.0], // blank
      [0.1, 0.9, 0.0, 0.0], // a
    ];
    expect(ctcGreedyDecode(logits, DICT)).toBe('aa');
  });

  it('returns empty string for empty input', () => {
    expect(ctcGreedyDecode([], DICT)).toBe('');
  });

  it('returns empty string for all-blank input', () => {
    const logits = [
      [0.9, 0.1, 0.0, 0.0],
      [0.9, 0.1, 0.0, 0.0],
    ];
    expect(ctcGreedyDecode(logits, DICT)).toBe('');
  });

  it('correctly decodes strings with spaces and sovereign symbols (e.g. Aadhaar and coordinates)', () => {
    // Dict with CTC blank, digits, space, degree symbol, letters
    const sovereignDict = ['_', '0', '1', '2', '3', '4', ' ', 'L', 'a', 't', ':', '°', 'N'];
    // Sequence: "1 2" -> 1 (idx 2), blank (idx 0), ' ' (idx 6), 2 (idx 3)
    const logitsSpace = [
      [0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // '1'
      [1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // blank
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // ' '
      [0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // '2'
    ];
    expect(ctcGreedyDecode(logitsSpace, sovereignDict)).toBe('1 2');

    // Sequence: "13°N"
    const logitsCoord = [
      [0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // '1'
      [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], // '3'
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0], // '°'
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0], // 'N'
    ];
    expect(ctcGreedyDecode(logitsCoord, sovereignDict)).toBe('13°N');
  });
});

describe('parseOcrDict', () => {
  it('preserves space character without trimming it to empty string', () => {
    const rawDict = '_\n0\n1\nA\nB\n \n.\n°\n₹\n';
    const parsed = parseOcrDict(rawDict);
    expect(parsed).toEqual(['_', '0', '1', 'A', 'B', ' ', '.', '°', '₹']);
    expect(parsed[5]).toBe(' ');
  });

  it('handles Windows CRLF without corrupting tokens', () => {
    const rawDictCRLF = '_\r\n0\r\n \r\n°\r\n';
    const parsed = parseOcrDict(rawDictCRLF);
    expect(parsed).toEqual(['_', '0', ' ', '°']);
  });
});
