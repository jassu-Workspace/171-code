/**
 * Unit Tests — Redaction Legend Generator
 */
import { describe, it, expect } from 'vitest';

interface Redaction {
  type: string;
  bbox: number[];
}

function buildLegend(redactions: Redaction[]): Array<{ id: string; type: string; bbox: number[] }> {
  return redactions.map((r, i) => ({
    id: `R${i + 1}`,
    type: r.type,
    bbox: r.bbox,
  }));
}

describe('Redaction Legend Generator', () => {
  it('should assign sequential IDs starting from R1', () => {
    const redactions: Redaction[] = [
      { type: 'ssn', bbox: [10, 10, 200, 30] },
      { type: 'pan', bbox: [10, 50, 150, 25] },
    ];
    const legend = buildLegend(redactions);
    expect(legend[0].id).toBe('R1');
    expect(legend[1].id).toBe('R2');
  });

  it('should preserve type and bbox for each redaction', () => {
    const redactions: Redaction[] = [{ type: 'human_face', bbox: [100, 200, 50, 50] }];
    const legend = buildLegend(redactions);
    expect(legend[0]).toEqual({ id: 'R1', type: 'human_face', bbox: [100, 200, 50, 50] });
  });

  it('should handle empty redactions', () => {
    const legend = buildLegend([]);
    expect(legend).toEqual([]);
  });

  it('should handle 10+ redactions with correct IDs', () => {
    const redactions: Redaction[] = Array.from({ length: 12 }, (_, i) => ({
      type: `field_${i}`,
      bbox: [i * 10, i * 10, 100, 25],
    }));
    const legend = buildLegend(redactions);
    expect(legend).toHaveLength(12);
    expect(legend[11].id).toBe('R12');
  });

  it('should handle dom_input type', () => {
    const redactions: Redaction[] = [{ type: 'dom_input', bbox: [10, 10, 200, 30] }];
    const legend = buildLegend(redactions);
    expect(legend[0].type).toBe('dom_input');
  });

  it('should handle pii_image type', () => {
    const redactions: Redaction[] = [{ type: 'pii_image', bbox: [0, 0, 100, 100] }];
    const legend = buildLegend(redactions);
    expect(legend[0].type).toBe('pii_image');
  });
});
