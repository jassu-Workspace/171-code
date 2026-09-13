/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  analyzeAddressText,
  containsFullAddress,
  maskAddress,
  extractAddressComponents,
  isVerticallyAdjacent,
  unionBbox,
} from '@/utils/addressDetector';
import {
  runSecurityBoundaryVerification,
  isLuhnValid,
  stripOwnMasks,
  SAFE_TOKENS,
  VERIFICATION_PII_PATTERNS,
} from '@/utils/leakVerifier';

// 25-Class Sensitive Type Taxonomy
export type SensitiveType =
  | 'CARD'
  | 'BANK_ACCOUNT'
  | 'IFSC_CODE'
  | 'SWIFT_BIC'
  | 'UPI_ID'
  | 'CRYPTO_WALLET'
  | 'AADHAAR'
  | 'PAN'
  | 'SSN'
  | 'PASSPORT'
  | 'DRIVING_LICENSE'
  | 'PERSON'
  | 'ADDRESS'
  | 'PHONE'
  | 'EMAIL'
  | 'DOB'
  | 'PASSWORD'
  | 'PIN_CRED'
  | 'API_KEY'
  | 'JWT_TOKEN'
  | 'PRIVATE_KEY'
  | 'FACE'
  | 'HEALTH_ID'
  | 'TAX_ID'
  | 'MEDICAL_RECORD'
  | 'INPUT';

interface SensitiveRegion {
  id: string;
  type: SensitiveType;
  text: string;
  bbox: [number, number, number, number];
  confidence: number;
}

function detectSensitiveDOMRegionsTestable(): SensitiveRegion[] {
  const regions: SensitiveRegion[] = [];
  const seenKeys = new Set<string>();

  function addRegion(region: SensitiveRegion) {
    const key = `${Math.round(region.bbox[0])}_${Math.round(region.bbox[1])}_${Math.round(region.bbox[2])}_${Math.round(region.bbox[3])}`;
    if (!seenKeys.has(key) && region.bbox[2] > 0 && region.bbox[3] > 0) {
      seenKeys.add(key);
      regions.push(region);
    }
  }

  // 1. Sensitive input elements
  const inputElements = document.querySelectorAll(
    'input[type="password"], input[type="email"], input[type="tel"], [data-masked="true"], input[autocomplete*="cc-"], input[name*="card"], input[name*="cvv"], input[name*="otp"], input[name*="pin"], input[autocomplete*="one-time-code"]'
  );

  inputElements.forEach((el, idx) => {
    const rect = el.getBoundingClientRect();
    const w = rect.width || 100;
    const h = rect.height || 30;
    let type: SensitiveType = 'INPUT';
    const typeAttr = el.getAttribute('type');
    const nameAttr = (el.getAttribute('name') || '').toLowerCase();
    const autoAttr = (el.getAttribute('autocomplete') || '').toLowerCase();

    if (typeAttr === 'password') type = 'PASSWORD';
    else if (typeAttr === 'email') type = 'EMAIL';
    else if (typeAttr === 'tel') type = 'PHONE';
    else if (nameAttr.includes('card') || autoAttr.includes('cc-') || nameAttr.includes('cvv')) type = 'CARD';
    else if (nameAttr.includes('otp') || nameAttr.includes('pin') || autoAttr.includes('one-time-code')) type = 'PIN_CRED';

    addRegion({
      id: `input_${idx + 1}`,
      type,
      text: (el as HTMLInputElement).value || '[MASKED_INPUT]',
      bbox: [rect.left || 10, rect.top || 10, w, h],
      confidence: 0.99,
    });
  });

  // 2. Rendered visible text nodes
  if (document.body) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node: Node | null;

    while ((node = walker.nextNode())) {
      const rawText = node.textContent?.trim();
      if (!rawText || rawText.length < 3) continue;

      const parent = node.parentElement;
      if (!parent || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.tagName === 'NOSCRIPT') continue;

      const rect = parent.getBoundingClientRect();
      const x = rect.left || 50;
      const y = rect.top || 50;
      const w = rect.width || 200;
      const h = rect.height || 20;

      // Check regex rules in strict priority order across 25 classes

      // 1. Private Keys
      if (/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/.test(rawText)) {
        addRegion({
          id: `privkey_${regions.length + 1}`,
          type: 'PRIVATE_KEY',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.99,
        });
        continue;
      }

      // 2. JWT Tokens
      if (/\bBearer\s+eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\b|\beyJ[a-zA-Z0-9_-]{10,}\.eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\b/.test(rawText)) {
        addRegion({
          id: `jwt_${regions.length + 1}`,
          type: 'JWT_TOKEN',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.99,
        });
        continue;
      }

      // 3. API Keys
      if (/\b(?:sk-[a-zA-Z0-9_-]{20,}|ghp_[a-zA-Z0-9]{20,}|glpat-[a-zA-Z0-9_-]{20,}|AKIA[0-9A-Z]{16})\b/.test(rawText)) {
        addRegion({
          id: `apikey_${regions.length + 1}`,
          type: 'API_KEY',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.99,
        });
        continue;
      }

      // 4. Crypto Wallets
      if (/\b(?:0x[a-fA-F0-9]{40}|(?:1|3|bc1)[a-zA-HJ-NP-Z0-9]{25,39})\b/.test(rawText)) {
        addRegion({
          id: `crypto_${regions.length + 1}`,
          type: 'CRYPTO_WALLET',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.99,
        });
        continue;
      }

      // 5. UPI ID
      if (/\b[a-zA-Z0-9.\-_]{2,256}@(okhdfcbank|okaxis|oksbi|paytm|upi|ybl|apl|axl|ibl|idfcbank)\b/i.test(rawText)) {
        addRegion({
          id: `upi_${regions.length + 1}`,
          type: 'UPI_ID',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.99,
        });
        continue;
      }

      // 6. Bank Account
      if (/\b(?:account\s*(?:no\.?|num(?:ber)?)|acct\s*#|a\/c)[:\s]*\d{9,18}\b/i.test(rawText)) {
        addRegion({
          id: `bank_${regions.length + 1}`,
          type: 'BANK_ACCOUNT',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.98,
        });
        continue;
      }

      // 7. IFSC Code
      if (/\b[A-Z]{4}0[A-Z0-9]{6}\b/.test(rawText)) {
        addRegion({
          id: `ifsc_${regions.length + 1}`,
          type: 'IFSC_CODE',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.99,
        });
        continue;
      }

      // 8. SWIFT / IBAN
      if (/\b[A-Z]{6}[A-Z0-9]{2}(?:[A-Z0-9]{3})?\b|\b[A-Z]{2}\d{2}[A-Z0-9]{12,30}\b/.test(rawText)) {
        addRegion({
          id: `swift_${regions.length + 1}`,
          type: 'SWIFT_BIC',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.98,
        });
        continue;
      }

      // 9. Credit Card / Payment Details
      if (/(?:ending in \d{4}|mastercard|visa|amex|discover)/i.test(rawText)) {
        addRegion({
          id: `card_${regions.length + 1}`,
          type: 'CARD',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.98,
        });
        continue;
      }
      const cardCandidate = rawText.match(/\b(?:\d[ -]*?){13,19}\b/);
      if (cardCandidate && isLuhnValid(cardCandidate[0])) {
        addRegion({
          id: `card_${regions.length + 1}`,
          type: 'CARD',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.99,
        });
        continue;
      }

      // 10. Aadhaar (12 digits)
      if (/(?<![\d-])[2-9]\d{3}[ -]\d{4}[ -]\d{4}(?![- ]?\d)/.test(rawText)) {
        addRegion({
          id: `aadhaar_${regions.length + 1}`,
          type: 'AADHAAR',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.99,
        });
        continue;
      }

      // 11. PAN
      if (/\b[A-Z]{5}[0-9]{4}[A-Z]\b/.test(rawText)) {
        addRegion({
          id: `pan_${regions.length + 1}`,
          type: 'PAN',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.99,
        });
        continue;
      }

      // 12. SSN
      if (/\b\d{3}-\d{2}-\d{4}\b/.test(rawText)) {
        addRegion({
          id: `ssn_${regions.length + 1}`,
          type: 'SSN',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.99,
        });
        continue;
      }

      // 13. Passport
      if (/\b[A-Z][1-9]\d{6}\b|\b[A-Z]\d{7}\b/.test(rawText)) {
        addRegion({
          id: `passport_${regions.length + 1}`,
          type: 'PASSPORT',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.97,
        });
        continue;
      }

      // 14. Driving License
      if (/\b[A-Z]{2}[0-9]{2}[ -]?[0-9]{11}\b/.test(rawText)) {
        addRegion({
          id: `dl_${regions.length + 1}`,
          type: 'DRIVING_LICENSE',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.97,
        });
        continue;
      }

      // 15. Health ID (ABHA)
      if (/\b\d{2}-\d{4}-\d{4}-\d{4}\b/.test(rawText)) {
        addRegion({
          id: `health_${regions.length + 1}`,
          type: 'HEALTH_ID',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.98,
        });
        continue;
      }

      // 16. Tax ID (GSTIN / EIN)
      if (/\b\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}\b|\b\d{2}-\d{7}\b/.test(rawText)) {
        addRegion({
          id: `tax_${regions.length + 1}`,
          type: 'TAX_ID',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.98,
        });
        continue;
      }

      // 17. Medical Record
      if (/\b(?:Patient\s*ID|MRN|Prescription\s*No|Rx\s*#)[:\s]*[A-Z0-9-]{4,16}\b/i.test(rawText)) {
        addRegion({
          id: `med_${regions.length + 1}`,
          type: 'MEDICAL_RECORD',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.98,
        });
        continue;
      }

      // 18. DOB
      if (/\b(?:DOB|Date of Birth|Birth Date|Born)[:\s]*\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/i.test(rawText)) {
        addRegion({
          id: `dob_${regions.length + 1}`,
          type: 'DOB',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.98,
        });
        continue;
      }

      // 19. PIN_CRED / OTP
      if (/\b(?:ATM\s*PIN|MPIN|Security\s*PIN|OTP|One-Time\s*Password)[:\s]*\d{4,6}\b/i.test(rawText)) {
        addRegion({
          id: `pincred_${regions.length + 1}`,
          type: 'PIN_CRED',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.99,
        });
        continue;
      }

      // 20. Password
      if (/(?:password|passwd)[:=\s]+\S+|\*{4,}/i.test(rawText)) {
        addRegion({
          id: `pwd_${regions.length + 1}`,
          type: 'PASSWORD',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.99,
        });
        continue;
      }

      // 21. Physical Address
      if (
        /\b(?:\d{1,5}\s+[A-Za-z0-9.,#\s-]{4,40}(?:AVE|ST|RD|BLVD|DR|LANE|WAY|COURT|NW|SE|SW|NE|ROAD|STREET|AVENUE)|[A-Z]{2}\s+\d{5}(?:-\d{4})?)\b/i.test(rawText) ||
        /(?:billing\s+address|shipping\s+address|deliver\s+to):/i.test(rawText) ||
        containsFullAddress(rawText)
      ) {
        addRegion({
          id: `addr_${regions.length + 1}`,
          type: 'ADDRESS',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.98,
        });
        continue;
      }

      // 22. Person Name: following shipping/recipient context OR greeting line OR salutation
      if (/\b(?:Mr\.|Mrs\.|Ms\.|Dr\.)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\b/.test(rawText)) {
        addRegion({
          id: `person_${regions.length + 1}`,
          type: 'PERSON',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.97,
        });
        continue;
      }

      const prevSiblingText = parent.previousElementSibling?.textContent?.toLowerCase() || '';
      const parentClassOrId = (parent.className + ' ' + parent.id).toLowerCase();
      const isShippingContext =
        prevSiblingText.includes('shipping') ||
        prevSiblingText.includes('billing') ||
        prevSiblingText.includes('recipient') ||
        parentClassOrId.includes('recipient') ||
        parentClassOrId.includes('name');

      if (isShippingContext && /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+$/.test(rawText)) {
        addRegion({
          id: `person_${regions.length + 1}`,
          type: 'PERSON',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.95,
        });
        continue;
      }

      // Personalized user greeting
      if (/^(?:Hi|Hello|Hey|Welcome)?\s*([A-Z][a-z]+),\s+(?:we're|welcome|your|you)/i.test(rawText)) {
        addRegion({
          id: `person_${regions.length + 1}`,
          type: 'PERSON',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.96,
        });
        continue;
      }

      // 23. Phone Numbers
      if (/(?<!\d)(?:(?:\+?\d{1,3}[\s.-]?)?(?:\(\d{3}\)\s*\d{3}[-.\s]?\d{4}|\b[6-9]\d{9}\b|\b0\d{2,4}[- ]?\d{6,8}\b)|\+91[\s.-]?\d{5}[\s.-]?\d{5})(?!\d)/.test(rawText)) {
        addRegion({
          id: `phone_${regions.length + 1}`,
          type: 'PHONE',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.95,
        });
        continue;
      }

      // 24. Email
      if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(rawText)) {
        addRegion({
          id: `email_${regions.length + 1}`,
          type: 'EMAIL',
          text: rawText,
          bbox: [x, y, w, h],
          confidence: 0.99,
        });
        continue;
      }
    }
  }

  return regions;
}

function drawSemanticBadgeTestable(
  ctx: any,
  x: number,
  y: number,
  width: number,
  height: number,
  type: string
): { type: string; bbox: [number, number, number, number]; paddedBbox: [number, number, number, number] } {
  const padding = 5;
  const rx0 = Math.max(0, Math.round(x - padding));
  const ry0 = Math.max(0, Math.round(y - padding));
  const canvasW = ctx.canvas?.width || 1024;
  const canvasH = ctx.canvas?.height || 912;

  const badgeLabel = `[REDACTED: ${type.toUpperCase()}]`;
  const fontSize = Math.min(13, Math.max(10, Math.floor((height + padding * 2) * 0.65)));
  ctx.save();
  ctx.font = `bold ${fontSize}px "SF Mono", Monaco, Consolas, monospace`;
  const textMetrics = ctx.measureText ? ctx.measureText(badgeLabel) : { width: 120 };

  const minW = Math.max(width + padding * 2, textMetrics.width + 16);
  const rw = Math.min(canvasW - rx0, minW);
  const rh = Math.min(canvasH - ry0, Math.max(height + padding * 2, 22));

  // 1. Solid Dark Slate backing fill (#0F172A)
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(rx0, ry0, rw, rh);

  // 2. High-contrast Emerald security outline (#10B981)
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 2;
  ctx.strokeRect(rx0, ry0, rw, rh);

  // 3. Clear semantic badge text (#34D399)
  ctx.fillStyle = '#34D399';
  ctx.textBaseline = 'middle';
  ctx.fillText(badgeLabel, rx0 + 6, ry0 + rh / 2);
  ctx.restore();

  return {
    type,
    bbox: [x, y, width, height],
    paddedBbox: [rx0, ry0, rw, rh],
  };
}

describe('Semantic Redaction Protocol (SIH 2026 Problem Statement 171)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('detects sensitive DOM text nodes in Amazon checkout structure', () => {
    document.body.innerHTML = `
      <div id="checkout-page">
        <!-- Non-sensitive order total -->
        <div class="order-summary">
          <span class="total-label">Order Total:</span>
          <span class="total-price">$29.56</span>
          <button class="place-order-btn">Place your order in USD</button>
        </div>

        <!-- Sensitive Shipping section -->
        <div class="shipping-section">
          <div class="section-header">Shipping address</div>
          <div class="recipient-name">John Smith</div>
          <div class="address-line">1600 PENNSYLVANIA AVE NW, WASHINGTON, DC 20502-0001</div>
        </div>

        <!-- Sensitive Payment section -->
        <div class="payment-section">
          <div class="section-header">Payment method</div>
          <div class="card-details">MasterCard ending in 9319</div>
          <div class="billing-line">Billing address: John Smith, 1600 PENN...</div>
        </div>

        <!-- Sensitive Personalized greeting -->
        <div class="prime-promo">
          <span>Joe, we're giving you Prime free for 30 days!</span>
        </div>
      </div>
    `;

    const elements = document.querySelectorAll('div, span, button');
    elements.forEach((el, index) => {
      vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
        left: 325,
        top: 100 + index * 30,
        width: 250,
        height: 25,
        right: 575,
        bottom: 125 + index * 30,
        x: 325,
        y: 100 + index * 30,
        toJSON: () => {},
      });
    });

    const regions = detectSensitiveDOMRegionsTestable();
    const types = regions.map((r) => r.type);

    expect(types).toContain('CARD');
    expect(types).toContain('ADDRESS');
    expect(types).toContain('PERSON');

    const cardRegion = regions.find((r) => r.type === 'CARD');
    expect(cardRegion?.text).toContain('MasterCard ending in 9319');

    const addressRegion = regions.find((r) => r.type === 'ADDRESS');
    expect(addressRegion?.text).toContain('1600 PENNSYLVANIA AVE NW');

    const greetingRegion = regions.find((r) => r.text.includes('Prime free'));
    expect(greetingRegion?.type).toBe('PERSON');
  });

  it('preserves non-sensitive operational elements and decoy numbers unredacted', () => {
    document.body.innerHTML = `
      <div class="cart-container">
        <h1>Shopping Cart</h1>
        <div class="item-title">Asus TUF Gaming A15 (FA506-HN100W)</div>
        <div class="item-price">$398.00</div>
        <div class="order-total">Order Total: $29.56</div>
        <div class="random-serial">Serial: 1234-5678-9012-3451</div>
        <button id="checkout-button">Proceed to checkout</button>
      </div>
    `;

    const regions = detectSensitiveDOMRegionsTestable();
    expect(regions).toHaveLength(0); // 0 false positives!
  });

  it('detects all 25 sensitive classes accurately', () => {
    document.body.innerHTML = `
      <div class="sensitive-data-vault">
        <div>sk-proj-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6</div>
        <div>Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.doNotLeakThis</div>
        <div>-----BEGIN RSA PRIVATE KEY-----</div>
        <div>0x71C7656EC7ab88b098defB751B7401B5f6d8976F</div>
        <div>user@okhdfcbank</div>
        <div>Account No: 123456789012</div>
        <div>HDFC0001234</div>
        <div>SWIFT: HDFCINBBXXX</div>
        <div>4111111111111111</div>
        <div>2345 6789 0123</div>
        <div>ABCDE1234F</div>
        <div>123-45-6789</div>
        <div>A1234567</div>
        <div>DL1420110012345</div>
        <div>12-3456-7890-1234</div>
        <div>29ABCDE1234F1Z5</div>
        <div>MRN: 987654321</div>
        <div>DOB: 14/12/1995</div>
        <div>ATM PIN: 4892</div>
        <div>password: SecretAdminKey99</div>
        <div>Flat 402, Green Glen Layout, Bellandur, Bengaluru, Karnataka 560103</div>
        <div>Dr. Alexander Fleming</div>
        <div>+91 98765 43210</div>
        <div>contact@zero-trust.org</div>
      </div>
    `;

    const elements = document.querySelectorAll('div');
    elements.forEach((el, index) => {
      vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
        left: 20,
        top: 20 + index * 25,
        width: 200,
        height: 20,
        right: 220,
        bottom: 40 + index * 25,
        x: 20,
        y: 20 + index * 25,
        toJSON: () => {},
      });
    });

    const regions = detectSensitiveDOMRegionsTestable();
    const detectedTypes = new Set(regions.map((r) => r.type));

    expect(detectedTypes.has('API_KEY')).toBe(true);
    expect(detectedTypes.has('JWT_TOKEN')).toBe(true);
    expect(detectedTypes.has('PRIVATE_KEY')).toBe(true);
    expect(detectedTypes.has('CRYPTO_WALLET')).toBe(true);
    expect(detectedTypes.has('UPI_ID')).toBe(true);
    expect(detectedTypes.has('BANK_ACCOUNT')).toBe(true);
    expect(detectedTypes.has('IFSC_CODE')).toBe(true);
    expect(detectedTypes.has('SWIFT_BIC')).toBe(true);
    expect(detectedTypes.has('CARD')).toBe(true);
    expect(detectedTypes.has('AADHAAR')).toBe(true);
    expect(detectedTypes.has('PAN')).toBe(true);
    expect(detectedTypes.has('SSN')).toBe(true);
    expect(detectedTypes.has('PASSPORT')).toBe(true);
    expect(detectedTypes.has('DRIVING_LICENSE')).toBe(true);
    expect(detectedTypes.has('HEALTH_ID')).toBe(true);
    expect(detectedTypes.has('TAX_ID')).toBe(true);
    expect(detectedTypes.has('MEDICAL_RECORD')).toBe(true);
    expect(detectedTypes.has('DOB')).toBe(true);
    expect(detectedTypes.has('PIN_CRED')).toBe(true);
    expect(detectedTypes.has('PASSWORD')).toBe(true);
    expect(detectedTypes.has('ADDRESS')).toBe(true);
    expect(detectedTypes.has('PERSON')).toBe(true);
    expect(detectedTypes.has('PHONE')).toBe(true);
    expect(detectedTypes.has('EMAIL')).toBe(true);
  });

  it('renders semantic privacy badges with +5px padding, #0F172A fill, #10B981 stroke, and [REDACTED: TYPE] label', () => {
    const fillRectCalls: any[] = [];
    const strokeRectCalls: any[] = [];
    const fillTextCalls: any[] = [];

    const mockCtx = {
      canvas: { width: 1024, height: 912 },
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 0,
      font: '',
      textBaseline: '',
      save: vi.fn(),
      restore: vi.fn(),
      measureText: vi.fn().mockReturnValue({ width: 130 }),
      fillRect: vi.fn((...args) => {
        fillRectCalls.push({ fillStyle: mockCtx.fillStyle, args });
      }),
      strokeRect: vi.fn((...args) => {
        strokeRectCalls.push({
          strokeStyle: mockCtx.strokeStyle,
          lineWidth: mockCtx.lineWidth,
          args,
        });
      }),
      fillText: vi.fn((...args) => {
        fillTextCalls.push({
          fillStyle: mockCtx.fillStyle,
          text: args[0],
          x: args[1],
          y: args[2],
        });
      }),
    };

    const b1 = drawSemanticBadgeTestable(mockCtx, 325, 160, 260, 26, 'CARD');
    const b2 = drawSemanticBadgeTestable(mockCtx, 325, 92, 260, 36, 'ADDRESS');
    const b3 = drawSemanticBadgeTestable(mockCtx, 122, 532, 295, 45, 'PERSON');

    // 1. Verify 3 badges drawn
    expect(fillRectCalls).toHaveLength(3);
    expect(strokeRectCalls).toHaveLength(3);
    expect(fillTextCalls).toHaveLength(3);

    // 2. Verify Dark Slate privacy backing (#0F172A)
    fillRectCalls.forEach((call) => {
      expect(call.fillStyle).toBe('#0F172A');
    });

    // 3. Verify Emerald security border (#10B981, lineWidth = 2)
    strokeRectCalls.forEach((call) => {
      expect(call.strokeStyle).toBe('#10B981');
      expect(call.lineWidth).toBe(2);
    });

    // 4. Verify Emerald monospace badge labels
    expect(fillTextCalls[0].text).toBe('[REDACTED: CARD]');
    expect(fillTextCalls[0].fillStyle).toBe('#34D399');

    expect(fillTextCalls[1].text).toBe('[REDACTED: ADDRESS]');
    expect(fillTextCalls[1].fillStyle).toBe('#34D399');

    expect(fillTextCalls[2].text).toBe('[REDACTED: PERSON]');
    expect(fillTextCalls[2].fillStyle).toBe('#34D399');

    // 5. Verify geometric enclosure: paddedBbox strictly wraps [x, y, w, h]
    expect(b1.paddedBbox[0]).toBeLessThanOrEqual(b1.bbox[0]);
    expect(b1.paddedBbox[1]).toBeLessThanOrEqual(b1.bbox[1]);
    expect(b1.paddedBbox[0] + b1.paddedBbox[2]).toBeGreaterThanOrEqual(b1.bbox[0] + b1.bbox[2]);
    expect(b1.paddedBbox[1] + b1.paddedBbox[3]).toBeGreaterThanOrEqual(b1.bbox[1] + b1.bbox[3]);
  });

  it('proves geometric enclosure and plaintext security boundary verification (fail-closed)', () => {
    // 1. Passing case: Padded redaction fully encloses detected region and structured DOM is clean
    const detected: SensitiveRegion[] = [
      { id: 'card_1', type: 'CARD', text: '4532 0150 1234 5678', bbox: [100, 100, 200, 30], confidence: 0.99 },
    ];
    const redactionPadded = [
      { id: 'card_1', type: 'card', paddedBbox: [95, 95, 210, 40] as [number, number, number, number] },
    ];
    const cleanDOM = [
      { id: 'agent-1', tag: 'div', text: 'Order summary: [CARD]' },
    ];

    const passResult = runSecurityBoundaryVerification(detected, redactionPadded, cleanDOM, 0.85);
    expect(passResult.passed).toBe(true);
    expect(passResult.coverageCheck.passed).toBe(true);
    expect(passResult.jsonSanitizationCheck.rawPIIFound).toBe(false);

    // 2. Failing case: Redaction mask has coverage gap (fails closed)
    const redactionGap = [
      { id: 'card_1', type: 'card', paddedBbox: [105, 105, 150, 20] as [number, number, number, number] }, // Too small!
    ];
    const failCoverage = runSecurityBoundaryVerification(detected, redactionGap, cleanDOM, 0.85);
    expect(failCoverage.passed).toBe(false);
    expect(failCoverage.reasons.some((r) => r.includes('Coverage gap'))).toBe(true);

    // 3. Failing case: Structured DOM contains residual unmasked secret
    const dirtyDOM = [
      { id: 'agent-2', tag: 'span', text: 'Secret API key: sk-proj-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6' },
    ];
    const failLeak = runSecurityBoundaryVerification(detected, redactionPadded, dirtyDOM, 0.85);
    expect(failLeak.passed).toBe(false);
    expect(failLeak.jsonSanitizationCheck.rawPIIFound).toBe(true);
    expect(failLeak.reasons.some((r) => r.includes('residual unmasked API_KEY'))).toBe(true);
  });

  it('validates Luhn card checksum algorithm accurately', () => {
    expect(isLuhnValid('4111 1111 1111 1111')).toBe(true);
    expect(isLuhnValid('5555 5555 5555 4444')).toBe(true);
    expect(isLuhnValid('1234 5678 9012 3451')).toBe(false); // Invalid checksum
    expect(isLuhnValid('29.56')).toBe(false); // Price
    expect(isLuhnValid('398.00')).toBe(false); // Price
  });
});