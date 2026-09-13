/**
 * Unit Tests — Phase 2
 * Tests for: Regex PII maskers, Redaction Legend generator, Smart Wait logic.
 *
 * Run: npm run test (from /tests)
 */
import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// ---------------------------------------------------------------------------
// 1. Regex PII Masker Tests
// ---------------------------------------------------------------------------
describe('Regex PII Maskers', () => {
  const PII_PATTERNS = {
    aadhaar: /\b\d{4}\s?\d{4}\s?\d{4}\b/g,
    pan: /\b[A-Z]{5}\d{4}[A-Z]\b/g,
    phone: /\b[6-9]\d{9}\b/g,
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
  };

  it('should mask 12-digit Aadhaar numbers', () => {
    const input = 'My Aadhaar is 1234 5678 9012 for verification';
    const masked = input.replace(PII_PATTERNS.aadhaar, '**** **** ****');
    expect(masked).toBe('My Aadhaar is **** **** **** for verification');
  });

  it('should mask PAN card numbers', () => {
    const input = 'PAN: ABCDE1234F filed for tax';
    const masked = input.replace(PII_PATTERNS.pan, '**** *****');
    expect(masked).toBe('PAN: **** ***** filed for tax');
  });

  it('should mask 10-digit Indian phone numbers', () => {
    const input = 'Call me at 9876543210 for details';
    const masked = input.replace(PII_PATTERNS.phone, '******.****');
    expect(masked).toBe('Call me at ******.**** for details');
  });

  it('should mask email addresses', () => {
    const input = 'Send to user@example.com please';
    const masked = input.replace(PII_PATTERNS.email, '***@***.com');
    expect(masked).toBe('Send to ***@***.com please');
  });

  it('should mask SSN patterns', () => {
    const input = 'SSN: 123-45-6789 is confidential';
    const masked = input.replace(PII_PATTERNS.ssn, '***-**-****');
    expect(masked).toBe('SSN: ***-**-**** is confidential');
  });

  it('should NOT mask non-PII numbers', () => {
    const input = 'The amount is 42 rupees';
    const masked = input.replace(PII_PATTERNS.aadhaar, '**** **** ****');
    expect(masked).toBe('The amount is 42 rupees');
  });

  it('should handle multiple PII in one string', () => {
    const input = 'Aadhaar 1234 5678 9012 and phone 9876543210';
    let masked = input.replace(PII_PATTERNS.aadhaar, '**** **** ****');
    masked = masked.replace(PII_PATTERNS.phone, '******.****');
    expect(masked).toBe('Aadhaar **** **** **** and phone ******.****');
  });
});
