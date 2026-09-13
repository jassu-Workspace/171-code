/**
 * Pure unit tests for AddressDetector utility.
 * Validates component regexes, weighted scoring, container hints, and vertical adjacency grouping.
 */
import { describe, it, expect } from 'vitest';
import {
  extractAddressComponents,
  scoreComponents,
  analyzeAddressText,
  containsFullAddress,
  maskAddress,
  extractCityAndPin,
  isVerticallyAdjacent,
  unionBbox,
  detectAddresses,
  SanitizedElement,
} from '../../src/utils/addressDetector';

describe('AddressDetector — Multi-Component Perception', () => {
  it('extracts all individual components from a full address string', () => {
    const text = 'Flat 402, Green Glen Layout, Near EcoSpace, Bellandur, Bengaluru, Karnataka 560103, India';
    const components = extractAddressComponents(text);

    expect(components).toContain('house_number');
    expect(components).toContain('street');
    expect(components).toContain('landmark');
    expect(components).toContain('city');
    expect(components).toContain('state');
    expect(components).toContain('pin');
    expect(components).toContain('country');
  });

  it('scores weighted components and identifies a real address', () => {
    const text = 'Plot 12, Road No 4, Banjara Hills, Hyderabad, Telangana 500034';
    const analysis = analyzeAddressText(text);

    expect(analysis.isAddress).toBe(true);
    expect(analysis.score).toBeGreaterThanOrEqual(5);
    expect(analysis.components.length).toBeGreaterThanOrEqual(3);
    expect(containsFullAddress(text)).toBe(true);
  });

  it('does NOT flag isolated street names or product listings as addresses (zero false positives)', () => {
    const listing = 'Cross Court Tennis Shoes, Size 10 Road Runner Edition';
    const analysis = analyzeAddressText(listing);

    expect(analysis.isAddress).toBe(false);
    expect(containsFullAddress(listing)).toBe(false);
  });

  it('applies container hint boost when DOM element advertises shipping/delivery', () => {
    const text = 'Madhapur, Hyderabad 500081';
    const withoutHint = analyzeAddressText(text, false);
    const withHint = analyzeAddressText(text, true);

    expect(withHint.score).toBe(withoutHint.score + 3);
    expect(withHint.isAddress).toBe(true);
  });

  it('masks address in full mode', () => {
    const text = 'Flat 402, Green Glen Layout, Bellandur, Bengaluru, Karnataka 560103';
    expect(maskAddress(text, 'full')).toBe('[ADDRESS REDACTED]');
  });

  it('masks address in partial mode while preserving coarse location and masking PIN', () => {
    const text = 'Flat 402, Green Glen Layout, Karnataka 560103';
    const partial = maskAddress(text, 'partial');
    expect(partial).toContain('******');
  });

  it('extracts city and pin for minimum necessary disclosure', () => {
    const text = 'Flat 101, Lakeview Apt, Whitefield, Bengaluru, Karnataka 560066';
    const summary = extractCityAndPin(text);
    expect(summary.toLowerCase()).toContain('bengaluru');
    expect(summary).toContain('560066');
  });

  it('groups vertically adjacent sibling lines into a unified bounding box', () => {
    const el1: SanitizedElement = {
      id: 'div_1',
      text: 'Flat 302, Sunrise Towers',
      bbox: [100, 100, 200, 20],
    };
    const el2: SanitizedElement = {
      id: 'div_2',
      text: 'MG Road, Indiranagar',
      bbox: [100, 125, 200, 20],
    };
    const el3: SanitizedElement = {
      id: 'div_3',
      text: 'Bengaluru, Karnataka - 560038',
      bbox: [100, 150, 220, 20],
    };

    expect(isVerticallyAdjacent(el1, el2)).toBe(true);
    expect(isVerticallyAdjacent(el2, el3)).toBe(true);

    const union = unionBbox([el1, el2, el3]);
    expect(union[0]).toBe(100);
    expect(union[1]).toBe(100);
    expect(union[2]).toBe(220);
    expect(union[3]).toBe(70);

    const result = detectAddresses([el1, el2, el3]);
    expect(result.detections.length).toBeGreaterThanOrEqual(1);
    expect(result.sensitiveRegions[0].type).toBe('ADDRESS');
  });
});
