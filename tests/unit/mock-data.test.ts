/**
 * Unit Tests — Mock Data Integrity (150 scenarios)
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('Mock Data Integrity (150 scenarios)', () => {
  let mocks: any[];

  beforeAll(() => {
    const fixturePath = join(__dirname, '..', 'setup', 'fixtures', 'mock_scenarios_150.json');
    try {
      mocks = JSON.parse(readFileSync(fixturePath, 'utf8'));
    } catch {
      mocks = [];
    }
  });

  it('should load 150 mock scenarios from fixture', () => {
    expect(mocks.length).toBe(150);
  });

  it('each scenario should have required fields', () => {
    for (const m of mocks) {
      expect(m).toHaveProperty('scenario_name');
      expect(m).toHaveProperty('mock_masked_dom');
      expect(m).toHaveProperty('mock_redaction_legend');
      expect(m).toHaveProperty('mock_image_base64');
    }
  });

  it('each scenario should have a non-empty scenario_name', () => {
    for (const m of mocks) {
      expect(m.scenario_name.length).toBeGreaterThan(0);
    }
  });

  it('each scenario should have a valid redaction_legend array', () => {
    for (const m of mocks) {
      expect(Array.isArray(m.mock_redaction_legend)).toBe(true);
    }
  });

  it('each scenario should have a valid base64 image string', () => {
    for (const m of mocks) {
      expect(typeof m.mock_image_base64).toBe('string');
      expect(m.mock_image_base64.length).toBeGreaterThan(0);
    }
  });

  it('should cover diverse categories (government, travel, banking, etc.)', () => {
    const names = mocks.map((m) => m.scenario_name.toLowerCase());
    const hasGovernment = names.some((n) => n.includes('tax') || n.includes('aadhaar') || n.includes('pan'));
    const hasTravel = names.some((n) => n.includes('train') || n.includes('flight') || n.includes('bus'));
    const hasBanking = names.some((n) => n.includes('card') || n.includes('loan') || n.includes('bank'));
    const hasHealthcare = names.some((n) => n.includes('doctor') || n.includes('medicine') || n.includes('hospital'));
    const hasEducation = names.some((n) => n.includes('exam') || n.includes('fee') || n.includes('course'));
    expect(hasGovernment).toBe(true);
    expect(hasTravel).toBe(true);
    expect(hasBanking).toBe(true);
    expect(hasHealthcare).toBe(true);
    expect(hasEducation).toBe(true);
  });

  it('redaction legend entries should have valid structure', () => {
    for (const m of mocks) {
      for (const entry of m.mock_redaction_legend) {
        expect(entry).toHaveProperty('id');
        expect(entry).toHaveProperty('type');
        expect(entry).toHaveProperty('bbox');
        expect(Array.isArray(entry.bbox)).toBe(true);
        expect(entry.bbox.length).toBe(4);
      }
    }
  });
});
