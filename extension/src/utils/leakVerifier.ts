/**
 * Leak Verifier: Dual-Layer Security Boundary Verification
 * --------------------------------------------------------
 * Enforces fail-closed security guarantees prior to any network dispatch:
 * 1. Geometric Enclosure Proof: Every detected sensitive DOM region [dx, dy, dw, dh]
 *    must be strictly and geometrically enclosed by a padded redaction mask badge
 *    ([rx, ry, rw, rh] such that rx <= dx && ry <= dy && rx+rw >= dx+dw && ry+rh >= dy+dh).
 * 2. Plaintext Sweep: Exhaustively scans structured DOM and element text/values for
 *    residual unmasked sensitive data across all 25 classes.
 *
 * If ANY violation occurs, the verifier fails closed and prevents outbound transmission.
 */

import { containsFullAddress } from './addressDetector';

export interface SensitiveRegion {
  id: string;
  type: string;
  text?: string;
  bbox: [number, number, number, number];
  confidence: number;
}

export interface RedactedRegion {
  id?: string;
  type?: string;
  bbox?: number[];
  paddedBbox: [number, number, number, number];
}

export interface SanitizedDomElement {
  id: string;
  tag?: string;
  type?: string;
  text?: string;
  value?: string;
}

export interface VerificationResult {
  passed: boolean;
  confidence: number;
  coverageCheck: {
    totalSensitive: number;
    totalCovered: number;
    passed: boolean;
  };
  jsonSanitizationCheck: {
    rawPIIFound: boolean;
    violations: string[];
  };
  reasons: string[];
}

export function isLuhnValid(cardStr: string): boolean {
  const digits = cardStr.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

export const VERIFICATION_PII_PATTERNS: Record<string, RegExp> = {
  CARD: /(?<!\d)(?:\d{4}[ -]?){3}\d{4}(?!\d)|(?<!\d)(?:\d{4}[ -]?\d{6}[ -]?\d{5})(?!\d)|\b(?:\d[ -]*?){13,19}\b/,
  BANK_ACCOUNT: /\b(?:account\s*(?:no\.?|num(?:ber)?)|acct\s*#|a\/c)[:\s]*\d{9,18}\b/i,
  IFSC_CODE: /\b[A-Z]{4}0[A-Z0-9]{6}\b/,
  SWIFT_BIC: /\b[A-Z]{6}[A-Z0-9]{2}(?:[A-Z0-9]{3})?\b|\b[A-Z]{2}\d{2}[A-Z0-9]{12,30}\b/,
  UPI_ID: /\b[a-zA-Z0-9.\-_]{2,256}@(okhdfcbank|okaxis|oksbi|paytm|upi|ybl|apl|axl|ibl|idfcbank)\b/i,
  CRYPTO_WALLET: /\b(?:0x[a-fA-F0-9]{40}|(?:1|3|bc1)[a-zA-HJ-NP-Z0-9]{25,39})\b/,
  AADHAAR: /(?<![\d-])[2-9]\d{3}[ -]\d{4}[ -]\d{4}(?![- ]?\d)/,
  PAN: /\b[A-Z]{5}[0-9]{4}[A-Z]\b/,
  SSN: /\b\d{3}-\d{2}-\d{4}\b/,
  PASSPORT: /\b[A-Z][1-9]\d{6}\b|\b[A-Z]\d{7}\b/,
  DRIVING_LICENSE: /\b[A-Z]{2}[0-9]{2}[ -]?[0-9]{11}\b/,
  PERSON: /\b(?:Mr\.|Mrs\.|Ms\.|Dr\.)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\b/,
  PHONE: /(?<!\d)(?:\+?\d{1,3}[-.\s]?)?(?:\(\d{3}\)\s*\d{3}[-.\s]?\d{4}|\b[6-9]\d{9}\b|\b0\d{2,4}[- ]?\d{6,8}\b)(?!\d)/,
  EMAIL: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  DOB: /\b(?:DOB|Date of Birth|Birth Date|Born)[:\s]*\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/i,
  PASSWORD: /(?:password|passwd)[:=\s]+\S+|\*{4,}/i,
  PIN_CRED: /\b(?:ATM\s*PIN|MPIN|Security\s*PIN|OTP|One-Time\s*Password)[:\s]*\d{4,6}\b/i,
  API_KEY: /\b(?:sk-[a-zA-Z0-9_-]{20,}|ghp_[a-zA-Z0-9]{20,}|glpat-[a-zA-Z0-9_-]{20,}|AKIA[0-9A-Z]{16})\b/,
  JWT_TOKEN: /\bBearer\s+eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\b|\beyJ[a-zA-Z0-9_-]{10,}\.eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\b/,
  PRIVATE_KEY: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/,
  HEALTH_ID: /\b\d{2}-\d{4}-\d{4}-\d{4}\b/,
  TAX_ID: /\b\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}\b|\b\d{2}-\d{7}\b/,
  MEDICAL_RECORD: /\b(?:Patient\s*ID|MRN|Prescription\s*No|Rx\s*#)[:\s]*[A-Z0-9-]{4,16}\b/i,
};

const PLACEHOLDER_RE = /\[[A-Z][A-Z_ ]*\]/g;
const MASK_RUN_RE = /\*{2,}/g;

export const SAFE_TOKENS = new Set([
  '[CARD]', '[BANK_ACCOUNT]', '[IFSC_CODE]', '[SWIFT_BIC]', '[UPI_ID]',
  '[CRYPTO_WALLET]', '[AADHAAR]', '[PAN]', '[SSN]', '[PASSPORT]',
  '[DRIVING_LICENSE]', '[PERSON]', '[ADDRESS]', '[PHONE]', '[EMAIL]',
  '[DOB]', '[PASSWORD]', '[PIN_CRED]', '[API_KEY]', '[JWT_TOKEN]',
  '[PRIVATE_KEY]', '[FACE]', '[HEALTH_ID]', '[TAX_ID]', '[MEDICAL_RECORD]',
  '[ADDRESS REDACTED]', '[LOCATION REDACTED]', '[REDACTED]', '[MASKED_INPUT]'
]);

export function stripOwnMasks(text: string): string {
  return text.replace(PLACEHOLDER_RE, ' ').replace(MASK_RUN_RE, ' ');
}

export function runSecurityBoundaryVerification(
  detectionMap: SensitiveRegion[],
  redactionMap: RedactedRegion[],
  structuredDOM: SanitizedDomElement[],
  confidenceThreshold: number = 0.85
): VerificationResult {
  const violations: string[] = [];
  const reasons: string[] = [];

  // 1. Geometric Enclosure Verification
  let coveredCount = 0;
  for (const detected of detectionMap) {
    const isCovered = redactionMap.some((redacted) => {
      const [dx, dy, dw, dh] = detected.bbox;
      const [rx, ry, rw, rh] = redacted.paddedBbox;
      return rx <= dx && ry <= dy && rx + rw >= dx + dw && ry + rh >= dy + dh;
    });

    if (isCovered) {
      coveredCount++;
    } else {
      violations.push(
        `Coverage gap: Sensitive region ${detected.id} (${detected.type}) was not fully enclosed by redaction mask.`
      );
    }

    if (detected.confidence < confidenceThreshold) {
      violations.push(
        `Confidence failure: Region ${detected.id} confidence (${detected.confidence}) is below threshold (${confidenceThreshold}).`
      );
    }
  }

  const coverageCheckPassed = coveredCount === detectionMap.length;

  // 2. Forensic Plaintext Residual Sweep
  let rawPIIFound = false;

  for (const el of structuredDOM) {
    if (el.type === 'password' && el.text !== '[PASSWORD]' && el.value !== '[PASSWORD]') {
      rawPIIFound = true;
      violations.push(`Element ${el.id} contains unmasked password.`);
    }

    const rawText = `${el.text || ''} ${el.value || ''}`;
    const textToCheck = stripOwnMasks(rawText);

    for (const [piiType, pattern] of Object.entries(VERIFICATION_PII_PATTERNS)) {
      const match = textToCheck.match(pattern);
      if (match && !SAFE_TOKENS.has(match[0])) {
        // Special check for CARD: verify Luhn checksum before flagging to avoid false positives on serial numbers
        if (piiType === 'CARD') {
          if (!isLuhnValid(match[0])) {
            continue;
          }
        }
        rawPIIFound = true;
        violations.push(`Element ${el.id} contains residual unmasked ${piiType}.`);
      }
    }

    // Multi-component physical address sweep
    if (containsFullAddress(textToCheck)) {
      rawPIIFound = true;
      violations.push(`Element ${el.id} contains an unmasked physical address.`);
    }
  }

  const passed = coverageCheckPassed && !rawPIIFound && violations.length === 0;
  if (!passed) {
    reasons.push(...violations);
  }

  return {
    passed,
    confidence: coverageCheckPassed ? 0.99 : 0.4,
    coverageCheck: {
      totalSensitive: detectionMap.length,
      totalCovered: coveredCount,
      passed: coverageCheckPassed,
    },
    jsonSanitizationCheck: {
      rawPIIFound,
      violations,
    },
    reasons,
  };
}
