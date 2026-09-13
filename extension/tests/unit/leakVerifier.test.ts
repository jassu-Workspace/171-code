/**
 * Pure unit tests for LeakVerifier utility.
 * Validates Luhn checksum verification, geometric enclosure proofs,
 * and forensic plaintext residual sweeps across the 25-class taxonomy.
 */
import { describe, it, expect } from 'vitest';
import {
  isLuhnValid,
  runSecurityBoundaryVerification,
  stripOwnMasks,
  SensitiveRegion,
  RedactedRegion,
  SanitizedDomElement,
} from '../../src/utils/leakVerifier';

describe('LeakVerifier — Dual-Layer Fail-Closed Security Boundary', () => {
  it('validates authentic credit card numbers with Luhn checksum', () => {
    expect(isLuhnValid('4111 1111 1111 1111')).toBe(true);
    expect(isLuhnValid('5555 5555 5555 4444')).toBe(true);
  });

  it('rejects invalid numbers, order totals, and product codes from Luhn check', () => {
    expect(isLuhnValid('1234 5678 9012 3451')).toBe(false);
    expect(isLuhnValid('29.56')).toBe(false);
    expect(isLuhnValid('398.00')).toBe(false);
    expect(isLuhnValid('FA506-HN100W')).toBe(false);
  });

  it('strips authorized redacted placeholders before residual sweep', () => {
    const text = 'User address is [ADDRESS REDACTED] and email is [EMAIL]';
    expect(stripOwnMasks(text).trim()).toBe('User address is   and email is');
  });

  it('confirms geometric enclosure when padded badge covers sensitive region', () => {
    const detected: SensitiveRegion[] = [
      { id: 'card_1', type: 'CARD', text: '4111 1111 1111 1111', bbox: [100, 100, 200, 30], confidence: 0.99 },
    ];
    // Padded badge with 5px padding on all sides: [95, 95, 210, 40]
    const redacted: RedactedRegion[] = [
      { id: 'card_1', type: 'card', paddedBbox: [95, 95, 210, 40] },
    ];
    const dom: SanitizedDomElement[] = [
      { id: 'agent-1', tag: 'div', text: 'Card: [CARD]' },
    ];

    const result = runSecurityBoundaryVerification(detected, redacted, dom, 0.85);
    expect(result.passed).toBe(true);
    expect(result.coverageCheck.passed).toBe(true);
    expect(result.jsonSanitizationCheck.rawPIIFound).toBe(false);
    expect(result.reasons).toHaveLength(0);
  });

  it('fails closed when a coverage gap exists in geometric enclosure', () => {
    const detected: SensitiveRegion[] = [
      { id: 'addr_1', type: 'ADDRESS', text: '1600 Pennsylvania Ave', bbox: [100, 100, 300, 50], confidence: 0.98 },
    ];
    // Badge that leaves right side exposed: width 200 < 300
    const underCovered: RedactedRegion[] = [
      { id: 'addr_1', type: 'address', paddedBbox: [95, 95, 200, 60] },
    ];
    const dom: SanitizedDomElement[] = [
      { id: 'agent-1', tag: 'div', text: 'Address: [ADDRESS]' },
    ];

    const result = runSecurityBoundaryVerification(detected, underCovered, dom, 0.85);
    expect(result.passed).toBe(false);
    expect(result.coverageCheck.passed).toBe(false);
    expect(result.reasons.some((v) => v.includes('Coverage gap'))).toBe(true);
  });

  it('fails closed when residual unmasked PII is present in DOM elements', () => {
    const detected: SensitiveRegion[] = [
      { id: 'pwd_1', type: 'PASSWORD', text: 'secret', bbox: [50, 50, 100, 25], confidence: 0.99 },
    ];
    const redacted: RedactedRegion[] = [
      { id: 'pwd_1', type: 'password', paddedBbox: [45, 45, 110, 35] },
    ];
    const leakingDOM: SanitizedDomElement[] = [
      { id: 'agent-1', tag: 'input', type: 'password', text: 'unmaskedSecret123', value: 'unmaskedSecret123' },
    ];

    const result = runSecurityBoundaryVerification(detected, redacted, leakingDOM, 0.85);
    expect(result.passed).toBe(false);
    expect(result.jsonSanitizationCheck.rawPIIFound).toBe(true);
    expect(result.reasons.some((v) => v.includes('unmasked password'))).toBe(true);
  });

  it('detects unmasked developer API keys in DOM and aborts transmission', () => {
    const detected: SensitiveRegion[] = [];
    const redacted: RedactedRegion[] = [];
    const leakingDOM: SanitizedDomElement[] = [
      { id: 'agent-dev', tag: 'code', text: 'const key = "sk-proj-1234567890abcdef1234567890";' },
    ];

    const result = runSecurityBoundaryVerification(detected, redacted, leakingDOM, 0.85);
    expect(result.passed).toBe(false);
    expect(result.jsonSanitizationCheck.rawPIIFound).toBe(true);
    expect(result.reasons.some((v) => v.includes('residual unmasked API_KEY'))).toBe(true);
  });
});
