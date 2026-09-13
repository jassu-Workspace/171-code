import { describe, it, expect } from 'vitest';
import {
  normalizeNumericConfusion,
  normalizePanConfusion,
  normalizeCoordinatesConfusion,
  isIdCardGeometry,
  evaluateTextPII,
  shouldFailClosedQuarantine,
} from '../../src/utils/piiNormalizer';

describe('piiNormalizer — Defense-Grade PII Normalization & Quarantine Shield', () => {
  describe('OCR Confusion Normalizers', () => {
    it('normalizes Aadhaar numeric look-alike characters (O, I, l, S, B)', () => {
      // 1234 5678 9O12 where '0' was read as 'O'
      expect(normalizeNumericConfusion('1234 5678 9O12')).toBe('1234 5678 9012');
      // 22I9 6893 2294 where '1' was read as 'I'
      expect(normalizeNumericConfusion('22I9 6893 2294')).toBe('2219 6893 2294');
      // 1234 S678 901B where 5 was S and 8 was B
      expect(normalizeNumericConfusion('1234 S678 901B')).toBe('1234 5678 9018');
    });

    it('normalizes PAN card pattern confusion in letter and digit zones', () => {
      // PAN: 5 letters + 4 digits + 1 letter
      // 'ABCDE0234F' where O in prefix was read as 0
      expect(normalizePanConfusion('ABCD01234F')).toBe('ABCDO1234F');
      // 'ABCDEI234F' where 1 in digits was read as I
      expect(normalizePanConfusion('ABCDEI234F')).toBe('ABCDE1234F');
    });

    it('normalizes geospatial coordinate symbols (*, deg, ^) to degree symbol (°)', () => {
      expect(normalizeCoordinatesConfusion('Lat: 13.08 deg N')).toBe('Lat: 13.08° N');
      expect(normalizeCoordinatesConfusion('Long: 80.27* E')).toBe('Long: 80.27° E');
    });
  });

  describe('ISO/IEC 7810 ID-1 Standard Aspect Ratio Heuristic', () => {
    it('identifies standard ID card geometries (ratio ~1.58)', () => {
      // Standard 85.6mm x 53.98mm ratio = 1.5857
      expect(isIdCardGeometry(856, 540)).toBe(true);
      expect(isIdCardGeometry(540, 856)).toBe(true); // Vertical orientation
      expect(isIdCardGeometry(320, 200)).toBe(true); // ratio 1.6
      expect(isIdCardGeometry(400, 250)).toBe(true); // ratio 1.6
    });

    it('rejects square, banner, or avatar images', () => {
      expect(isIdCardGeometry(200, 200)).toBe(false); // ratio 1.0 (square avatar)
      expect(isIdCardGeometry(800, 100)).toBe(false); // ratio 8.0 (wide banner)
      expect(isIdCardGeometry(50, 50)).toBe(false);   // too small
    });
  });

  describe('evaluateTextPII Master Evaluator', () => {
    it('detects pristine Sovereign PII', () => {
      expect(evaluateTextPII('My Aadhaar: 1234 5678 9012').hasPII).toBe(true);
      expect(evaluateTextPII('PAN: XKWLH3653B').hasPII).toBe(true);
      expect(evaluateTextPII('Tel: +91 95413 55319').hasPII).toBe(true);
      expect(evaluateTextPII('Stamp: ISRO INTERNAL ONLY').hasPII).toBe(true);
      expect(evaluateTextPII('Coords: Lat: 13.08° N').hasPII).toBe(true);
    });

    it('detects corrupted/noisy OCR PII using normalization', () => {
      // Aadhaar with 'O' instead of '0'
      const corruptedAadhaar = evaluateTextPII('Aadhaar: 1234 5678 9O12');
      expect(corruptedAadhaar.hasPII).toBe(true);
      expect(corruptedAadhaar.detectedType).toBe('AADHAAR');

      // PAN with 'I' instead of '1'
      const corruptedPan = evaluateTextPII('Card: ABCDEI234F');
      expect(corruptedPan.hasPII).toBe(true);
      expect(corruptedPan.detectedType).toBe('PAN');

      // Coordinates with 'deg' instead of '°'
      const corruptedCoord = evaluateTextPII('Telemetry Lat: 13.08 deg N');
      expect(corruptedCoord.hasPII).toBe(true);
      expect(corruptedCoord.detectedType).toBe('GEOSPATIAL_COORD');
    });

    it('returns false for non-sensitive public text', () => {
      expect(evaluateTextPII('Welcome to ISRO public portal navigation').hasPII).toBe(false);
      expect(evaluateTextPII('Click here to submit satellite query form').hasPII).toBe(false);
    });
  });

  describe('Fail-Closed Quarantine Policy', () => {
    it('quarantines ID card geometry with low OCR confidence', () => {
      // On an ID card shape, if confidence < 0.65 -> fail closed!
      expect(shouldFailClosedQuarantine('Unknown blurry text', 0.45, true)).toBe(true);
      // If confidence >= 0.65 and no keywords -> no automatic quarantine
      expect(shouldFailClosedQuarantine('Clean menu text', 0.85, true)).toBe(false);
    });

    it('quarantines ID card geometry containing identity keywords even with partial match', () => {
      expect(shouldFailClosedQuarantine('GOVT OF INDIA ID', 0.70, true)).toBe(true);
      expect(shouldFailClosedQuarantine('INCOME TAX DEPT', 0.75, true)).toBe(true);
    });

    it('does not quarantine non-card elements', () => {
      expect(shouldFailClosedQuarantine('Unknown blurry text', 0.45, false)).toBe(false);
    });
  });
});
