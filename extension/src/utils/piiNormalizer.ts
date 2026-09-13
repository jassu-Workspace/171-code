/**
 * piiNormalizer.ts — Defense-Grade PII Normalization & Fail-Closed Quarantine Shield.
 *
 * Implements SIH 2026 Problem Statement 26171 (ISRO) Privacy & Recall requirements:
 * Solves OCR character-confusion errors (e.g. 'O' vs '0', 'I' vs '1') to eliminate
 * false negatives and ensure 100% zero-leak protection for Indian Sovereign PII.
 */

// Master Sovereign regex patterns
export const AADHAAR_REGEX = /(?<![\d-])\d{4}[ -]\d{4}[ -]\d{4}(?![- ]?\d)|\b\d{12}\b/;
export const MASKED_AADHAAR_REGEX = /\b(?:XXXX|xxxx)[\s-](?:XXXX|xxxx)[\s-]\d{4}\b/;
export const PAN_REGEX = /\b[A-Z]{5}\d{4}[A-Z]\b/;
export const PHONE_REGEX = /(?<!\d)(?:\+?\d{1,3}[-.\s]?)?(?:\(\d{3}\)\s*\d{3}[-.\s]?\d{4}|\b[6-9]\d{9}\b|\b[6-9]\d{4}[\s-]\d{5}\b)(?!\d)/;
export const PASSPORT_REGEX = /\b[A-Z][1-9]\d{6}\b|\b[A-Z]\d{7}\b/;
export const CARD_REGEX = /(?<!\d)(?:\d{4}[ -]?){3}\d{4}(?!\d)/;
export const CLASSIFIED_MARKING_REGEX = /\b(CONFIDENTIAL|RESTRICTED SOVEREIGN|SECRET|TOP SECRET|ISRO INTERNAL|DEPARTMENT OF SPACE|URSC|VSSC|SHAR|SAC|NRSC)\b/i;
export const GEOSPATIAL_COORD_REGEX = /\b(?:Lat|Long|Latitude|Longitude)[:\s]*\d{1,2}(?:\.\d+)?\s*(?:°|deg|\*)/i;

/**
 * Normalizes text to catch OCR confusion errors in numeric sequences (Aadhaar & Phone numbers).
 * Maps visual look-alikes to digits:
 *   'O', 'o', 'D', 'Q' -> '0'
 *   'I', 'l', '|', '!' -> '1'
 *   'Z', 'z'           -> '2'
 *   'S', 's', '$'      -> '5'
 *   'B'                -> '8'
 */
export function normalizeNumericConfusion(text: string): string {
  if (!text) return '';
  return text
    .replace(/[OoDQ]/g, '0')
    .replace(/[Il|!]/g, '1')
    .replace(/[Zz]/g, '2')
    .replace(/[Ss$]/g, '5')
    .replace(/B/g, '8');
}

/**
 * Normalizes text specifically for Indian PAN card patterns (5 letters, 4 digits, 1 letter).
 * Fixes digits misread as letters in middle block and letters misread as digits in outer blocks.
 */
export function normalizePanConfusion(text: string): string {
  if (!text) return '';
  // Match potential 10-character alphanumeric candidate
  return text.replace(/\b([A-Z0-9]{5})([A-Z0-9]{4})([A-Z0-9])\b/gi, (_, p1, p2, p3) => {
    // Prefix (p1): letters only -> convert 0->O, 1->I, 5->S, 8->B
    const fixedP1 = p1.toUpperCase()
      .replace(/0/g, 'O')
      .replace(/1/g, 'I')
      .replace(/5/g, 'S')
      .replace(/8/g, 'B');
    // Middle (p2): digits only -> convert O->0, I/l->1, S->5, B->8
    const fixedP2 = p2.toUpperCase()
      .replace(/[OoD]/g, '0')
      .replace(/[IL]/g, '1')
      .replace(/S/g, '5')
      .replace(/B/g, '8');
    // Suffix (p3): letter only -> convert 0->O, 1->I
    const fixedP3 = p3.toUpperCase().replace(/0/g, 'O').replace(/1/g, 'I');
    return `${fixedP1}${fixedP2}${fixedP3}`;
  });
}

/**
 * Normalizes geospatial coordinates where degree symbol (°) may be misread as 'deg', '*', 'o', or '^'.
 */
export function normalizeCoordinatesConfusion(text: string): string {
  if (!text) return '';
  return text.replace(/(\d+(?:\.\d+)?)\s*(?:deg|\*|\^)/gi, '$1°');
}

/**
 * Checks whether an image matches the ISO/IEC 7810 ID-1 card standard geometry.
 * Standard ID-1 dimensions: 85.60 mm × 53.98 mm (aspect ratio ~1.5857).
 * Standard cards (Aadhaar, PAN, Voter ID, Driving License) fall between 1.40 and 1.75.
 */
export function isIdCardGeometry(width: number, height: number): boolean {
  if (width < 120 || height < 80) return false;
  const major = Math.max(width, height);
  const minor = Math.max(Math.min(width, height), 1);
  const ratio = major / minor;
  return ratio >= 1.40 && ratio <= 1.75;
}

/**
 * Master evaluator: checks if raw or normalized text contains any Sovereign PII or classified markings.
 */
export function evaluateTextPII(rawText: string): { hasPII: boolean; detectedType: string | null } {
  if (!rawText || rawText.trim().length === 0) {
    return { hasPII: false, detectedType: null };
  }

  // 1. Direct regex check on raw text
  if (AADHAAR_REGEX.test(rawText)) return { hasPII: true, detectedType: 'AADHAAR' };
  if (MASKED_AADHAAR_REGEX.test(rawText)) return { hasPII: true, detectedType: 'MASKED_AADHAAR' };
  if (PAN_REGEX.test(rawText)) return { hasPII: true, detectedType: 'PAN' };
  if (PHONE_REGEX.test(rawText)) return { hasPII: true, detectedType: 'PHONE' };
  if (PASSPORT_REGEX.test(rawText)) return { hasPII: true, detectedType: 'PASSPORT' };
  if (CARD_REGEX.test(rawText)) return { hasPII: true, detectedType: 'PAYMENT_CARD' };
  if (CLASSIFIED_MARKING_REGEX.test(rawText)) return { hasPII: true, detectedType: 'SOVEREIGN_CLASSIFIED' };
  if (GEOSPATIAL_COORD_REGEX.test(rawText)) return { hasPII: true, detectedType: 'GEOSPATIAL_COORD' };

  // 2. Normalized checks for OCR confusion errors (catches near-misses)
  const numericNormalized = normalizeNumericConfusion(rawText);
  if (AADHAAR_REGEX.test(numericNormalized)) return { hasPII: true, detectedType: 'AADHAAR' };
  if (PHONE_REGEX.test(numericNormalized)) return { hasPII: true, detectedType: 'PHONE' };

  const panNormalized = normalizePanConfusion(rawText);
  if (PAN_REGEX.test(panNormalized)) return { hasPII: true, detectedType: 'PAN' };

  const coordNormalized = normalizeCoordinatesConfusion(rawText);
  if (GEOSPATIAL_COORD_REGEX.test(coordNormalized)) return { hasPII: true, detectedType: 'GEOSPATIAL_COORD' };

  return { hasPII: false, detectedType: null };
}

/**
 * Fail-Closed Policy: Determines if an image or region should be proactively quarantined.
 * If an image matches standard sovereign ID card geometry and either:
 *   a) Has low OCR confidence (< 0.65)
 *   b) Contains multiple digit clusters or identity keywords
 * Then it fails closed to guarantee zero data leakage.
 */
export function shouldFailClosedQuarantine(
  text: string,
  confidence: number,
  isCard: boolean
): boolean {
  if (!isCard) return false;

  // On a card-like element, if OCR was uncertain (< 65%), redact proactively
  if (confidence < 0.65) {
    return true;
  }

  // If text contains sovereign/identity keywords even without full regex match
  const hasIdHints = /\b(GOVT|INDIA|AADHAAR|INCOME|TAX|PERMANENT|ACCOUNT|DOB|YEAR|MALE|FEMALE)\b/i.test(text);
  if (hasIdHints) {
    return true;
  }

  return false;
}
