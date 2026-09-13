/**
 * The Bouncer: Extracts and masks DOM content
 * Queries interactive elements and masks PII from body text
 */
import { browser } from 'wxt/browser';
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import {
  ocrRecognize,
  isWasmSupported,
  canFetchExtensionAssets,
  isOcrAvailable,
  OcrRecognition,
} from '../../utils/ocrEngine';
import {
  analyzeAddressText,
  containsFullAddress,
  extractAddressComponents,
  maskAddress,
  extractCityAndPin,
} from '../../utils/addressDetector';
import {
  runSecurityBoundaryVerification,
  isLuhnValid,
  SAFE_TOKENS,
  stripOwnMasks,
} from '../../utils/leakVerifier';
import {
  evaluateTextPII,
  isIdCardGeometry,
  shouldFailClosedQuarantine,
} from '../../utils/piiNormalizer';

/**
 * Sanitizes any string payload across all 25 sensitive classes while freezing
 * previously emitted placeholders to prevent double-masking.
 */
export function sanitizeStringPII(text: string): string {
  if (!text) return text;
  const frozen: string[] = [];
  const SENTINEL = '\u0000';
  const PLACEHOLDER_RE = /\[[A-Z][A-Z_ ]*\]/g;
  let work = text.replace(PLACEHOLDER_RE, (match) => {
    frozen.push(match);
    return `${SENTINEL}${frozen.length - 1}${SENTINEL}`;
  });

  // 1. Private keys
  work = work.replace(/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----[\s\S]*?-----END (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/g, '[PRIVATE_KEY]');
  work = work.replace(/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/g, '[PRIVATE_KEY]');

  // 2. JWT & OAuth Bearer tokens
  work = work.replace(/\bBearer\s+eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\b/g, '[JWT_TOKEN]');
  work = work.replace(/\beyJ[a-zA-Z0-9_-]{10,}\.eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\b/g, '[JWT_TOKEN]');

  // 3. API Keys
  work = work.replace(/\b(?:sk-[a-zA-Z0-9_-]{20,}|ghp_[a-zA-Z0-9]{20,}|glpat-[a-zA-Z0-9_-]{20,}|AKIA[0-9A-Z]{16})\b/g, '[API_KEY]');

  // 4. Crypto Wallets
  work = work.replace(/\b(?:0x[a-fA-F0-9]{40}|(?:1|3|bc1)[a-zA-HJ-NP-Z0-9]{25,39})\b/g, '[CRYPTO_WALLET]');

  // 5. UPI ID
  work = work.replace(/\b[a-zA-Z0-9.\-_]{2,256}@(okhdfcbank|okaxis|oksbi|paytm|upi|ybl|apl|axl|ibl|idfcbank)\b/gi, '[UPI_ID]');

  // 6. Emails
  work = work.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL]');

  // 7. Bank Account
  work = work.replace(/\b(?:account\s*(?:no\.?|num(?:ber)?)|acct\s*#|a\/c)[:\s]*\d{9,18}\b/gi, '[BANK_ACCOUNT]');

  // 8. IFSC Code
  work = work.replace(/\b[A-Z]{4}0[A-Z0-9]{6}\b/g, '[IFSC_CODE]');

  // 9. SWIFT / IBAN
  work = work.replace(/\b[A-Z]{6}[A-Z0-9]{2}(?:[A-Z0-9]{3})?\b|\b[A-Z]{2}\d{2}[A-Z0-9]{12,30}\b/g, '[SWIFT_BIC]');

  // 10. Credit Cards (Luhn verified or formatted card sequences)
  work = work.replace(/\b(?:\d{4}[ -]?){3}\d{4}\b/g, (match) => {
    return isLuhnValid(match) ? '[CARD]' : match;
  });
  work = work.replace(/(?:ending in \d{4}|\b(?:\d[ -]*?){13,19}\b)/gi, (match) => {
    if (match.toLowerCase().includes('ending in') || isLuhnValid(match)) return '[CARD]';
    return match;
  });

  // 11. Aadhaar (12-digit UIDAI number)
  work = work.replace(/(?<![\d-])[2-9]\d{3}[ -]\d{4}[ -]\d{4}(?![- ]?\d)/g, '[AADHAAR]');

  // 12. PAN (Indian Permanent Account Number)
  work = work.replace(/\b[A-Z]{5}[0-9]{4}[A-Z]\b/g, '[PAN]');

  // 13. Health ID / ABHA
  work = work.replace(/\b\d{2}-\d{4}-\d{4}-\d{4}\b/g, '[HEALTH_ID]');

  // 14. Tax ID (GSTIN / EIN)
  work = work.replace(/\b\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}\b/g, '[TAX_ID]');
  work = work.replace(/\b\d{2}-\d{7}\b/g, '[TAX_ID]');

  // 15. Driving License
  work = work.replace(/\b[A-Z]{2}[0-9]{2}[ -]?[0-9]{11}\b/g, '[DRIVING_LICENSE]');

  // 16. Passport
  work = work.replace(/\b[A-Z][1-9]\d{6}\b|\b[A-Z]\d{7}\b/g, '[PASSPORT]');

  // 17. SSN
  work = work.replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN]');

  // 18. Medical Record (MRN / Patient ID / Prescription)
  work = work.replace(/\b(?:Patient\s*ID|MRN|Prescription\s*No|Rx\s*#)[:\s]*[A-Z0-9-]{4,16}\b/gi, '[MEDICAL_RECORD]');

  // 19. DOB
  work = work.replace(/\b(?:DOB|Date of Birth|Birth Date|Born)[:\s]*\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/gi, '[DOB]');

  // 20. PIN_CRED / OTP
  work = work.replace(/\b(?:ATM\s*PIN|MPIN|Security\s*PIN|OTP|One-Time\s*Password)[:\s]*\d{4,6}\b/gi, '[PIN_CRED]');

  // 21. Password
  work = work.replace(/(?:password|passwd)[:=\s]+\S+|\*{4,}/gi, '[PASSWORD]');

  // 22. Phone Numbers
  work = work.replace(/\+91[\s.-]?\d{5}[\s.-]?\d{5}\b/g, '[PHONE]');
  work = work.replace(/(\+?\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g, '[PHONE]');
  work = work.replace(/\b[6-9]\d{9}\b/g, '[PHONE]');
  work = work.replace(/\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g, '[PHONE]');

  // 23. Physical Address
  if (containsFullAddress(work)) {
    work = maskAddress(work, 'full');
  }

  // 24. Person greetings & salutations
  work = work.replace(/\b(?:Mr\.|Mrs\.|Ms\.|Dr\.)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\b/g, '[PERSON]');
  work = work.replace(/^(?:Hi|Hello|Hey|Welcome)?\s*([A-Z][a-z]+),\s+(?:we're|welcome|your|you)/gi, 'Hi [PERSON],');

  // Restore frozen placeholders
  const RESTORE_RE = new RegExp(SENTINEL + '(\\d+)' + SENTINEL, 'g');
  return work.replace(RESTORE_RE, (_match, index) => frozen[Number(index)]);
}

function isElementVisible(el: Element): boolean {
  if (!(el instanceof HTMLElement)) return true;
  if (el instanceof HTMLInputElement && el.type === 'hidden') return false;
  if (el.style.display === 'none' || el.style.visibility === 'hidden') return false;
  if (el.getAttribute('aria-hidden') === 'true') return false;
  if (el.hasAttribute('hidden')) return false;

  const style = window.getComputedStyle ? window.getComputedStyle(el) : null;
  if (style) {
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    // Standard e-commerce & modern UI styling overlays custom icons on opacity:0 checkboxes, radios & selects.
    const tag = el.tagName?.toLowerCase();
    const isCheckableInput = (tag === 'input') && ((el as HTMLInputElement).type === 'checkbox' || (el as HTMLInputElement).type === 'radio');
    const isSelect = tag === 'select' || tag === 'option';
    if (style.opacity === '0' && !isCheckableInput && !isSelect) return false;
  }

  // In live browsers with real layout, check zero-dimension elements detached from layout
  if (typeof el.getBoundingClientRect === 'function' && document.body) {
    const bodyRect = document.body.getBoundingClientRect();
    // Only apply layout detachment check if body actually has non-zero layout (real browser)
    if (bodyRect.width > 0 || bodyRect.height > 0) {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0 && !el.offsetParent && style?.position !== 'fixed') {
        return false;
      }
    }
  }

  return true;
}

/**
 * Recursively collects all accessible same-origin Documents (including iframes/frames)
 * so the agent has full visibility into embedded enterprise portals (e.g. ISRO Bhuvan left panel).
 */
export function getAllAccessibleDocuments(rootDoc: Document = document): Document[] {
  const docs: Document[] = [rootDoc];
  try {
    const frames = rootDoc.querySelectorAll('iframe, frame');
    for (const frame of Array.from(frames)) {
      try {
        const cdoc = (frame as HTMLIFrameElement).contentDocument;
        if (cdoc && cdoc.body && !docs.includes(cdoc)) {
          docs.push(...getAllAccessibleDocuments(cdoc));
        }
      } catch {
        // Cross-origin iframe security boundary, ignore
      }
    }
  } catch {
    // ignore
  }
  return docs;
}

export function getMaskedDom(): string {
  const allDocs = getAllAccessibleDocuments();
  // Create element map with unique IDs
  const elementMap: Array<{ id: string; tag: string; text: string; meta?: string }> = [];
  let counter = 1;

  for (const doc of allDocs) {
    const elements = doc.querySelectorAll(
      'button, a, input, textarea, select, [contenteditable="true"], [contenteditable], [role="textbox"], [role="combobox"], [role="searchbox"], [role="button"], [role="link"], [role="tab"], [role="checkbox"], [role="option"], [role="menuitem"], [role="radio"], .ql-editor, .DraftEditor-root, .ProseMirror, [data-placeholder], [aria-haspopup], [aria-expanded], [data-toggle="dropdown"], .dropdown-toggle, [class*="dropdown-item"], [class*="select-option"], [class*="menu-item"], li[data-value], div[role="option"], li[role="option"], summary, [role="treeitem"], [role="switch"], [class*="thematic"], [class*="layer-item"], [class*="tree-node"], [class*="sector-btn"], .ol-zoom-in, .ol-zoom-out, .leaflet-control-zoom-in, .leaflet-control-zoom-out, [title*="Zoom" i], [aria-label*="Zoom" i], .map-container, .ol-viewport, .leaflet-container, canvas, [class*="telemetry"], .telemetry-cell, .telemetry-val, .telemetry-metric, [data-telemetry], .metric-card, .gauge-val, [data-debris-id], .conjunction-row, table.conjunction-table, .cara-card, .debris-item, [data-clearance-level], .clearance-badge, .auth-card, [data-procurement-id], .tender-item, .procure-card, .bid-row, .patent-item, .research-paper, .spec-row, .rd-card, .station-card, .pass-schedule, .antenna-status'
    );

    elements.forEach((element) => {
      if (!isElementVisible(element)) return;

      const agentId = `agent-${counter}`;
      element.setAttribute('data-agent-id', agentId);

      let elementText = '';
      let meta = '';

      const tagName = element.tagName.toLowerCase();

      if (tagName === 'input' || tagName === 'textarea' || element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        const inputType = tagName === 'input' ? ((element as HTMLInputElement).type || 'text') : 'textarea';
        if (inputType === 'hidden') return;
        meta = `type="${inputType}"`;
        const el = element as HTMLInputElement | HTMLTextAreaElement;
        if (el.id) meta += ` id="${el.id}"`;
        if (el.name) meta += ` name="${el.name}"`;
        const placeholder = el.placeholder || el.getAttribute('placeholder') || '';
        if (placeholder) meta += ` placeholder="${placeholder}"`;
        const value = el.value || '';
        if (value) {
          elementText = `value="${value}"`;
        } else if (placeholder) {
          elementText = `(empty input, placeholder: "${placeholder}")`;
        } else if (el.name) {
          elementText = `name="${el.name}"`;
        } else {
          elementText = '(empty input)';
        }
      } else if (
        (element as HTMLElement).isContentEditable ||
        element.getAttribute('role') === 'textbox' ||
        element.classList.contains('ql-editor') ||
        element.classList.contains('DraftEditor-root') ||
        element.classList.contains('ProseMirror') ||
        element.classList.contains('notranslate') ||
        element.hasAttribute('contenteditable')
      ) {
        meta = 'contenteditable="true"';
        const rawText = (element.textContent || (element as HTMLElement).innerText || '').trim();
        const placeholder =
          element.getAttribute('data-placeholder') ||
          element.getAttribute('aria-placeholder') ||
          element.getAttribute('aria-label') ||
          '';

        if (rawText.length > 0 && rawText !== placeholder) {
          meta += ` data-has-content="true" data-char-count="${rawText.length}"`;
          elementText = `[Typed Content (${rawText.length} chars)]: ${rawText.slice(0, 160)}`;
        } else if (placeholder) {
          elementText = `(empty editor, placeholder: "${placeholder}")`;
        } else {
          elementText = '(empty rich text editor)';
        }
      } else if (tagName === 'select' || element instanceof HTMLSelectElement) {
        const selectEl = element as HTMLSelectElement;
        meta = `type="select"`;
        if (selectEl.id) meta += ` id="${selectEl.id}"`;
        if (selectEl.name) meta += ` name="${selectEl.name}"`;
        const selectedOpt = selectEl.options && selectEl.selectedIndex >= 0 ? selectEl.options[selectEl.selectedIndex] : null;
        const selectedVal = selectedOpt ? (selectedOpt.text || selectedOpt.value).trim() : '';
        if (selectedVal) meta += ` selected="${selectedVal}"`;

        const optionItems = selectEl.options
          ? Array.from(selectEl.options).map((opt, idx) => {
              const t = (opt.text || opt.value || '').trim();
              const v = opt.value ? ` (val: "${opt.value}")` : '';
              return `[opt-${idx + 1}: "${t}"${v}]`;
            })
          : [];
        elementText = `[Select Dropdown - Current: "${selectedVal || 'None'}"] Available Options: ${optionItems.join(', ')}`;
      } else if (element.tagName.toLowerCase() === 'canvas' || element.classList.contains('map-container') || element.classList.contains('ol-viewport') || element.classList.contains('leaflet-container')) {
      const label = element.getAttribute('aria-label') || element.getAttribute('title') || element.id || 'Map Viewport';
      meta = `type="map-canvas" role="region" aria-label="${label}"`;
      elementText = `[Interactive Geospatial Map Canvas: ${label}]`;
    } else {
      const aria = element.getAttribute('aria-label') || '';
      const title = element.getAttribute('title') || '';
      const rawContent = element.textContent || element.innerText || '';
      elementText = aria && aria.length > rawContent.length ? aria : (rawContent || aria || title);
      if (element.id) meta += ` id="${element.id}"`;

      // Capture dropdown state & combobox attributes
      const role = element.getAttribute('role');
      if (role) meta += ` role="${role}"`;
      const ariaHasPopup = element.getAttribute('aria-haspopup');
      if (ariaHasPopup) meta += ` aria-haspopup="${ariaHasPopup}"`;
      const ariaExpanded = element.getAttribute('aria-expanded');
      if (ariaExpanded !== null) meta += ` aria-expanded="${ariaExpanded}"`;
      const ariaSelected = element.getAttribute('aria-selected');
      if (ariaSelected !== null) meta += ` aria-selected="${ariaSelected}"`;
      const dataValue = element.getAttribute('data-value');
      if (dataValue) meta += ` data-value="${dataValue}"`;
      const isDropdownToggle =
        element.classList.contains('dropdown-toggle') ||
        Boolean(element.getAttribute('data-toggle')?.includes('dropdown')) ||
        Boolean(element.getAttribute('data-bs-toggle')?.includes('dropdown'));
      if (isDropdownToggle) meta += ` data-dropdown="true"`;

      // Capture GIS, Map controls & Thematic layers
      if (element.classList?.contains('ol-zoom-in') || title.toLowerCase().includes('zoom in') || aria.toLowerCase().includes('zoom in')) {
        meta += ' data-control="zoom-in"';
      } else if (element.classList?.contains('ol-zoom-out') || title.toLowerCase().includes('zoom out') || aria.toLowerCase().includes('zoom out')) {
        meta += ' data-control="zoom-out"';
      }
      if (role === 'treeitem' || element.classList?.contains('layer-item') || element.classList?.contains('thematic-item')) {
        meta += ' data-type="thematic-layer"';
      }

      // Capture 7 ISRO Operational Pillar element metadata
      if (element.classList?.contains('telemetry-cell') || element.hasAttribute('data-telemetry') || element.classList?.contains('telemetry-val')) {
        meta += ' data-type="telemetry"';
      }
      if (element.classList?.contains('conjunction-row') || element.hasAttribute('data-debris-id') || element.classList?.contains('conjunction-table')) {
        meta += ' data-type="cara-conjunction"';
      }
      if (element.classList?.contains('tender-item') || element.hasAttribute('data-procurement-id') || element.classList?.contains('bid-row')) {
        meta += ' data-type="procurement-tender"';
      }
      if (element.classList?.contains('patent-item') || element.classList?.contains('research-paper') || element.classList?.contains('spec-row')) {
        meta += ' data-type="rd-patent"';
      }
      if (element.hasAttribute('data-clearance-level') || element.classList?.contains('clearance-badge')) {
        meta += ` data-clearance="${element.getAttribute('data-clearance-level') || 'true'}"`;
      }
    }

    // Sanitize elementText across all 25 sensitive classes
    elementMap.push({
      id: agentId,
      tag: element.tagName.toLowerCase(),
      meta: meta.trim(),
      text: sanitizeStringPII(elementText.trim()),
    });

    counter++;
    });
  }

  // Extract body text across all accessible documents (including embedded iframes)
  const bodyText = allDocs
    .map((doc) => doc.body?.innerText || doc.body?.textContent || '')
    .filter(Boolean)
    .join('\n');

  // Apply PII masking across all 25 sensitive categories
  const maskedText = sanitizeStringPII(bodyText);

  // Check for platform submission confirmation toasts/banners
  const bodyTextLower = bodyText.toLowerCase();
  const hasToastElement = Boolean(
    document.querySelector('.artdeco-toast-item, [aria-label*="Post successful" i], a[href*="/feed/update/"]')
  );
  const hasConfirmationToast = hasToastElement || [
    'post successful',
    'view post',
    'post published',
    'post has been published',
    'your post is now live',
    'your post was shared',
    'your post was sent',
    'your tweet was sent',
    'message sent',
    'your message has been sent',
    'email sent successfully',
    'response has been recorded',
    'form submitted successfully',
    'thank you for your submission',
    'submission confirmed',
    'submission received',
  ].some((phrase) => bodyTextLower.includes(phrase));

  const systemBanner = hasConfirmationToast
    ? `\n--- SYSTEM NOTIFICATION: SUBMISSION CONFIRMED (Success notification detected on page). Conclude goal with action: "done". ---\n`
    : '';

  // Summarize the most relevant interactive elements (up to 140) with enriched metadata
  // Retain elements that have either text or meta attributes (e.g. empty search inputs)
  const interactiveSummary = elementMap
    .filter((el) => el.text.length > 0 || el.meta.length > 0)
    .slice(0, 140)
    .map((el) => `[${el.id}] <${el.tag}${el.meta ? ' ' + el.meta : ''}> ${(el.text || '(empty input)').slice(0, 140).replace(/\s+/g, ' ')}`)
    .join('\n');

  const fullMaskedText = `${systemBanner}--- INTERACTIVE ELEMENTS (Target these with "id" or "selector": "[data-agent-id='id']") ---\n${interactiveSummary}\n\n--- PAGE TEXT ---\n${maskedText.slice(0, 8000)}`;

  // Return JSON string with masked text, element map, and submission confirmation flag
  return JSON.stringify({
    maskedText: fullMaskedText,
    elementMap,
    submissionConfirmed: hasConfirmationToast,
  });
}

function safeQuery(selector: string): Element | null {
  for (const doc of getAllAccessibleDocuments()) {
    try {
      const el = doc.querySelector(selector);
      if (el) return el;
    } catch {
      // ignore
    }
  }
  return null;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Global map linking visual redaction legend IDs (R1, R2...) to DOM agent-ids (agent-1, agent-2...)
const lastRedactionLegendMap = new Map<string, string>();

function findElementByKeyword(keyword: string): Element | null {
  const lower = keyword.toLowerCase().trim();
  if (lower.length < 2) return null;

  for (const doc of getAllAccessibleDocuments()) {
    // Prioritize active overlay modal/dialog first if present (e.g. LinkedIn "Start a post", Email Compose, Form Modal)
    const activeDialog = doc.querySelector(
      'div[role="dialog"], dialog[open], .artdeco-modal, .compose-modal, div[aria-modal="true"], div[class*="modal"], div[class*="dialog"]'
    );

    // Search inside active dialog first if available; otherwise search main content or body
    const scopedContainer = activeDialog || doc.querySelector('main, [role="main"], #search, .s-search-results, #results, .search-results') || doc.body;
    if (!scopedContainer) continue;

    const candidates = Array.from(
      scopedContainer.querySelectorAll(
        'a, button, select, option, [role="button"], [role="combobox"], [role="option"], [role="menuitem"], [role="treeitem"], [role="switch"], [class*="dropdown-item"], [class*="select-option"], [class*="menu-item"], [class*="thematic"], [class*="layer-item"], [class*="sector-btn"], [class*="tree-node"], [class*="telemetry"], [class*="conjunction"], [class*="tender"], [class*="patent"], [class*="clearance"], [class*="station"], [class*="cam"], [class*="debris"], .ol-zoom-in, .ol-zoom-out, .leaflet-control-zoom-in, .leaflet-control-zoom-out, li[data-value], summary, h1, h2, h3, h4, h5, img, span, div.s-result-item, [data-component-type="s-search-result"], [contenteditable="true"], [role="textbox"], .ql-editor'
      )
    );

    for (const cand of candidates) {
      // If not inside an active modal, avoid accidentally clicking brand header logos, search navbar links, or footers
      if (!activeDialog && cand.closest('header, nav, #nav-belt, #nav-main, footer, #navbar')) continue;

      const text = (cand.textContent || '').toLowerCase();
      const aria = (cand.getAttribute('aria-label') || '').toLowerCase();
      const alt = (cand.getAttribute('alt') || '').toLowerCase();
      const title = (cand.getAttribute('title') || '').toLowerCase();
      const val = (cand as HTMLInputElement | HTMLOptionElement).value ? String((cand as any).value).toLowerCase() : '';

      if (text.includes(lower) || aria.includes(lower) || alt.includes(lower) || title.includes(lower) || val.includes(lower)) {
        const clickableParent = cand.closest('a, button, select, [role="button"], [role="combobox"], [role="option"], [role="menuitem"], [role="treeitem"], [role="switch"], [class*="dropdown-item"], [class*="select-option"], [class*="thematic"], [class*="layer-item"], [class*="sector-btn"], [class*="telemetry"], [class*="tender"], [class*="cam"], li[data-value], summary');
        return clickableParent || cand;
      }
    }

    // Fallback: check whole document excluding navbars
    if (scopedContainer !== doc.body) {
      const allCandidates = Array.from(doc.querySelectorAll('a, button, select, option, [role="button"], [role="combobox"], [role="option"], [role="menuitem"], [role="treeitem"], [role="switch"], [class*="dropdown-item"], [class*="select-option"], [class*="thematic"], [class*="layer-item"], [class*="sector-btn"], [class*="telemetry"], [class*="tender"], [class*="cam"], summary'));
      for (const cand of allCandidates) {
        if (cand.closest('header, nav, #nav-belt, footer')) continue;
        const text = (cand.textContent || '').toLowerCase();
        const val = (cand as HTMLInputElement | HTMLOptionElement).value ? String((cand as any).value).toLowerCase() : '';
        if (text.includes(lower) || val.includes(lower)) return cand;
      }
    }
  }

  return null;
}

function resolveElementCandidate(
  id?: string,
  selector?: string,
  isTypeAction: boolean = false
): Element | null {
  // 1. By Agent ID or Redaction Legend ID (R1, R2...)
  if (id) {
    const upperId = id.toUpperCase();
    if (lastRedactionLegendMap.has(upperId)) {
      const mappedAgentId = lastRedactionLegendMap.get(upperId)!;
      const el = safeQuery(`[data-agent-id="${mappedAgentId}"]`);
      if (el) return el;
    }

    const el = safeQuery(`[data-agent-id="${id}"]`);
    if (el) return el;

    // 2. By HTML ID attribute (e.g. LLM outputs "twotabsearchtextbox")
    try {
      const byId = document.getElementById(id) || safeQuery(`[id="${id}"]`);
      if (byId) return byId;
    } catch {
      // ignore
    }
  }

  // 3. By CSS Selector
  if (selector) {
    const el = safeQuery(selector);
    if (el) return el;

    // Fallback if selector is an ID or name without leading # or [ (e.g. "theme", "states1", "View")
    if (!selector.includes(' ') && !selector.includes('[') && !selector.startsWith('#') && !selector.startsWith('.')) {
      const byIdOrName = safeQuery(`[id="${selector}"], [name="${selector}"], #${selector}`);
      if (byIdOrName) return byIdOrName;
    }

    // Special fallback for cascading states dropdowns (e.g. Bhuvan, GIS, Procurement)
    if (selector.toLowerCase().includes('state') || selector === '#states' || selector === '#states1') {
      const stateDropdown = safeQuery('#states, #states1, select[name="states"]');
      if (stateDropdown) return stateDropdown;
    }

    // Special fallback for map view or submit button
    if (selector.toLowerCase().includes('view') || selector === '#mapbutton' || selector === '#View') {
      const viewButton = safeQuery('#mapbutton, #View, img[src*="view.png"], input[value="View"]');
      if (viewButton) return viewButton;
    }

    // Generic select fallback
    if (selector.toLowerCase() === 'select') {
      const anySelect = safeQuery('select');
      if (anySelect) return anySelect;
    }

    // 4. Text-based / semantic extraction from selector (e.g. img[alt*='Softride'], a:contains('Puma'), button:has-text("Send"))
    let keyword: string | null = null;
    const extractedKeywordMatch = selector.match(/['"]([^'"]{2,})['"]/);
    if (extractedKeywordMatch) {
      keyword = extractedKeywordMatch[1];
    } else {
      const funcMatch = selector.match(/:(?:has-text|contains)\s*\(\s*([^()]+)\s*\)/i);
      if (funcMatch) {
        keyword = funcMatch[1].trim();
      }
    }

    if (keyword) {
      const matched = findElementByKeyword(keyword);
      if (matched) return matched;
    }
  }

  // 5. Type action specific fallbacks (active input or modal editor)
  if (isTypeAction) {
    if (
      document.activeElement instanceof HTMLInputElement ||
      document.activeElement instanceof HTMLTextAreaElement ||
      (document.activeElement as HTMLElement)?.isContentEditable
    ) {
      return document.activeElement;
    }

    // If an active dialog/modal is open, prioritize editors/inputs inside it
    const activeDialog = document.querySelector(
      'div[role="dialog"], dialog[open], .artdeco-modal, .compose-modal, div[aria-modal="true"], div[class*="modal"], div[class*="dialog"]'
    );
    if (activeDialog) {
      const modalEditor = activeDialog.querySelector(
        '.ql-editor, [contenteditable="true"], [role="textbox"], textarea, input:not([type="hidden"]):not([type="checkbox"])'
      );
      if (modalEditor) return modalEditor;
    }

    // Common search inputs across Amazon, Flipkart, Google, e-commerce, general web
    const searchInput = safeQuery(
      '#twotabsearchtextbox, input[name="field-keywords"], input[name="q"], input[type="search"], textarea.gLFyf, textarea[name="q"], input[placeholder*="Search" i], input[aria-label*="Search" i], input[type="text"]:not([readonly]):not([type="hidden"]), .ql-editor, [contenteditable="true"], [role="textbox"]'
    );
    if (searchInput) return searchInput;
  }

  return null;
}

/**
 * Robust async element finder with retry polling for dynamic modals / SPAs
 */
async function findElementWithRetry(
  id?: string,
  selector?: string,
  isTypeAction: boolean = false,
  timeoutMs: number = 1500
): Promise<Element | null> {
  const startTime = Date.now();

  while (Date.now() - startTime <= timeoutMs) {
    const el = resolveElementCandidate(id, selector, isTypeAction);
    if (el) return el;

    // Wait 120ms before checking again (allows modal animations to complete)
    await new Promise((resolve) => setTimeout(resolve, 120));
  }

  // Final check
  return resolveElementCandidate(id, selector, isTypeAction);
}

/**
 * Zero-Trust Agent Visual Beacon: Applies an animated pulsating focus ring / beacon
 * on the targeted element so the human operator can visibly confirm real-time agent engagement.
 */
export function showInteractionBeacon(element: Element, color: string = '#10b981'): void {
  try {
    const el = element as HTMLElement;
    if (!el || !el.style) return;
    const prevTransition = el.style.transition;
    const prevOutline = el.style.outline;
    const prevBoxShadow = el.style.boxShadow;

    el.style.transition = 'all 0.2s ease-in-out';
    el.style.outline = `3px solid ${color}`;
    el.style.boxShadow = `0 0 16px ${color}, inset 0 0 8px ${color}`;

    setTimeout(() => {
      try {
        el.style.outline = prevOutline;
        el.style.boxShadow = prevBoxShadow;
        el.style.transition = prevTransition;
      } catch {
        // ignore
      }
    }, 750);
  } catch {
    // ignore
  }
}

/**
 * Executes a JavaScript snippet in the target document's Main World context,
 * ensuring legacy inline handlers (e.g. onChange="getStates(this.value),themechange()") execute without isolated-world boundaries.
 */
export function executeInMainWorld(doc: Document, scriptBody: string): void {
  try {
    const script = doc.createElement('script');
    script.textContent = `(() => { try { ${scriptBody} } catch (e) { console.warn('[MainWorldBridge]', e); } })();`;
    (doc.head || doc.documentElement || doc.body).appendChild(script);
    script.remove();
  } catch {
    // ignore
  }
}

/**
 * Universal Native Dropdown Handler:
 * Selects options from <select> elements across all realms, triggers inline & DOM events,
 * executes the main-world bridge for cascading AJAX loaders, and awaits settling.
 */
export async function handleNativeSelect(
  selectEl: HTMLSelectElement,
  rawTargetVal: string,
  thought?: string
): Promise<{ success: boolean; isSelectAction: boolean; matched: boolean; selectedText?: string; selectedValue?: string }> {
  showInteractionBeacon(selectEl, '#10b981');
  let targetText = rawTargetVal ? rawTargetVal.trim() : '';

  // 1. Fallback: extract option keyword from thought if targetText is empty or generic ("select")
  if ((!targetText || targetText.toLowerCase() === 'select' || targetText.length === 0) && thought) {
    const thoughtLower = thought.toLowerCase();
    for (let i = 0; i < selectEl.options.length; i++) {
      const opt = selectEl.options[i];
      const optText = (opt.text || '').toLowerCase().trim();
      const optVal = (opt.value || '').toLowerCase().trim();
      if ((optText.length > 2 && thoughtLower.includes(optText)) || (optVal.length > 2 && thoughtLower.includes(optVal))) {
        targetText = opt.text || opt.value;
        break;
      }
    }
  }

  // 2. Find matching option in selectEl.options
  const lower = targetText.toLowerCase().trim();
  let matchedIdx = -1;

  if (lower.length > 0 && lower !== 'select') {
    // Exact match
    for (let i = 0; i < selectEl.options.length; i++) {
      const opt = selectEl.options[i];
      const optVal = opt.value.toLowerCase();
      const optText = opt.text.toLowerCase().trim();
      if (optVal === lower || optText === lower) {
        matchedIdx = i;
        break;
      }
    }

    // Partial / substring match
    if (matchedIdx === -1) {
      for (let i = 0; i < selectEl.options.length; i++) {
        const opt = selectEl.options[i];
        const optVal = opt.value.toLowerCase();
        const optText = opt.text.toLowerCase().trim();
        if (optVal.includes(lower) || optText.includes(lower) || lower.includes(optVal) || lower.includes(optText)) {
          matchedIdx = i;
          break;
        }
      }
    }

    // Word token overlap match
    if (matchedIdx === -1) {
      const words = lower.split(/[\s,_\-/]+/).filter((w) => w.length > 2);
      for (let i = 0; i < selectEl.options.length; i++) {
        const optText = selectEl.options[i].text.toLowerCase();
        if (words.some((w) => optText.includes(w))) {
          matchedIdx = i;
          break;
        }
      }
    }
  }

  if (matchedIdx >= 0) {
    selectEl.selectedIndex = matchedIdx;
    selectEl.value = selectEl.options[matchedIdx].value;
  }

  // 3. Dispatch full event lifecycle across the element's window realm
  const win = selectEl.ownerDocument?.defaultView || window;
  const Ev = win.Event || Event;
  const MouseEv = win.MouseEvent || MouseEvent;

  try {
    selectEl.focus();
    selectEl.dispatchEvent(new MouseEv('mousedown', { bubbles: true, cancelable: true, view: win as Window }));
    selectEl.dispatchEvent(new Ev('input', { bubbles: true }));
    selectEl.dispatchEvent(new Ev('change', { bubbles: true }));
  } catch {
    // ignore
  }

  // 4. Main-World script bridge for legacy inline onChange handlers (e.g. Bhuvan getStates(this.value),themechange())
  const selectId = selectEl.id;
  const selectName = selectEl.name;
  if (selectId || selectName) {
    const doc = selectEl.ownerDocument || document;
    const targetScript = selectId
      ? `const el = document.getElementById("${selectId}");`
      : `const el = document.querySelector('select[name="${selectName}"]');`;
    executeInMainWorld(
      doc,
      `
      ${targetScript}
      if (el) {
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        if (typeof el.onchange === 'function') {
          try { el.onchange(new Event('change')); } catch (err) { console.warn(err); }
        }
      }
    `
    );
  }

  // 5. Intelligent Settling Delay for Cascading AJAX (Theme -> State -> District / Mission -> Sensor)
  await new Promise((resolve) => setTimeout(resolve, 500));

  const chosenOpt = selectEl.options && selectEl.selectedIndex >= 0 ? selectEl.options[selectEl.selectedIndex] : null;
  return {
    success: true,
    isSelectAction: true,
    matched: matchedIdx >= 0,
    selectedText: chosenOpt?.text,
    selectedValue: chosenOpt?.value,
  };
}

/**
 * Universal Custom Combobox / ARIA Dropdown Handler:
 * Handles [role="combobox"], [aria-haspopup="listbox"], and framework dropdown toggles.
 */
export async function handleCustomCombobox(
  comboboxEl: Element,
  rawTargetVal: string,
  thought?: string
): Promise<{ success: boolean; isSelectAction: boolean; matched: boolean }> {
  showInteractionBeacon(comboboxEl, '#06b6d4');
  const win = comboboxEl.ownerDocument?.defaultView || window;

  // Check if combobox is expanded
  const isExpanded =
    comboboxEl.getAttribute('aria-expanded') === 'true' ||
    comboboxEl.classList.contains('open') ||
    comboboxEl.classList.contains('show');

  if (!isExpanded) {
    (comboboxEl as HTMLElement).click();
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  let targetVal = rawTargetVal ? rawTargetVal.trim() : '';
  if (!targetVal && thought) {
    targetVal = thought;
  }

  if (targetVal) {
    const lower = targetVal.toLowerCase().trim();
    for (const doc of getAllAccessibleDocuments()) {
      const optionCandidates = Array.from(
        doc.querySelectorAll(
          '[role="option"], [role="menuitem"], .dropdown-item, .select-option, li[data-value], div[data-value], .select2-results__option'
        )
      );

      for (const opt of optionCandidates) {
        const text = (opt.textContent || '').toLowerCase().trim();
        const val = (opt.getAttribute('data-value') || '').toLowerCase();
        if (text === lower || val === lower || (text.length > 2 && (lower.includes(text) || text.includes(lower)))) {
          showInteractionBeacon(opt, '#10b981');
          (opt as HTMLElement).click();
          opt.dispatchEvent(new (win.Event || Event)('change', { bubbles: true }));
          await new Promise((resolve) => setTimeout(resolve, 300));
          return { success: true, isSelectAction: true, matched: true };
        }
      }
    }
  }

  return { success: true, isSelectAction: true, matched: false };
}

/**
 * The Operative: Executes actions on DOM elements
 * Handles click, type, and done actions with async modal retry & rich-text support
 */
export async function executeAction(actionJson: {
  action: string;
  selector?: string;
  id?: string;
  value?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    switch (actionJson.action) {
      case 'click': {
        const effectiveSelector = actionJson.selector || (actionJson as any).target;
        let effectiveId = actionJson.id;
        if (!effectiveId && typeof effectiveSelector === 'string') {
          const m = effectiveSelector.match(/data-agent-id=['"]([^'"]+)['"]/);
          if (m) effectiveId = m[1];
          else if (effectiveSelector.startsWith('agent-') || effectiveSelector.startsWith('R')) effectiveId = effectiveSelector;
        }
        const element = await findElementWithRetry(effectiveId, effectiveSelector, false, 1500);

        if (!element) {
          return { success: false, error: 'Element not found for click action' };
        }

        if (element instanceof HTMLElement) {
          try {
            element.scrollIntoView({ behavior: 'instant', block: 'center' });
          } catch {
            // ignore
          }
          element.focus();
        }

        // If target is or contains an <a> link, enforce target="_self" so agent navigation stays in the current tab!
        const anchor = element.tagName.toLowerCase() === 'a'
          ? (element as HTMLAnchorElement)
          : element.closest('a');

        if (anchor && anchor.target && anchor.target !== '_self') {
          anchor.target = '_self';
        }

        // 1. Native HTMLSelectElement handling for click actions:
        const selectEl = (element.tagName?.toLowerCase() === 'select' ? element : element.querySelector('select')) as HTMLSelectElement | null;
        if (selectEl) {
          const rawSelectVal = actionJson.value ?? (actionJson as any).text ?? '';
          return await handleNativeSelect(selectEl, typeof rawSelectVal === 'string' ? rawSelectVal : '', (actionJson as any).thought);
        }

        // 2. Custom Combobox / ARIA Dropdown handling:
        const isCombobox =
          element.getAttribute('role') === 'combobox' ||
          element.getAttribute('aria-haspopup') === 'listbox' ||
          element.getAttribute('aria-haspopup') === 'true' ||
          element.classList.contains('dropdown-toggle') ||
          element.classList.contains('select2-selection');
        const rawVal = actionJson.value ?? (actionJson as any).text ?? '';
        if (isCombobox && typeof rawVal === 'string' && rawVal.trim().length > 0) {
          return await handleCustomCombobox(element, rawVal, (actionJson as any).thought);
        }

        // 3. Option element clicked: update parent select
        if (element.tagName?.toLowerCase() === 'option' || element instanceof HTMLOptionElement) {
          const parentSelect = element.closest('select');
          if (parentSelect) {
            const optVal = (element as HTMLOptionElement).value || element.textContent || '';
            return await handleNativeSelect(parentSelect, optVal, (actionJson as any).thought);
          }
        }

        showInteractionBeacon(element, '#3b82f6');

        const isCheckable = element instanceof HTMLInputElement && (element.type === 'checkbox' || element.type === 'radio');
        const initialChecked = isCheckable ? (element as HTMLInputElement).checked : false;

        // Calculate element center coordinates for realistic modern framework pointer events
        let clientX = 0;
        let clientY = 0;
        try {
          const rect = (element as HTMLElement).getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            clientX = Math.round(rect.left + rect.width / 2);
            clientY = Math.round(rect.top + rect.height / 2);
          }
        } catch {
          // ignore
        }

        // Dispatch pointer and mouse event sequence with realistic coordinates & button states
        const MouseEventCtor =
          typeof window !== 'undefined' && typeof (window as any).MouseEvent === 'function'
            ? (window as any).MouseEvent
            : (typeof MouseEvent !== 'undefined' ? MouseEvent : Event);

        const PointerEventCtor =
          typeof window !== 'undefined' && typeof (window as any).PointerEvent === 'function'
            ? (window as any).PointerEvent
            : MouseEventCtor;

        try {
          element.dispatchEvent(
            new PointerEventCtor('pointerdown', {
              bubbles: true,
              cancelable: true,
              clientX,
              clientY,
              button: 0,
              buttons: 1,
              pointerId: 1,
              pointerType: 'mouse',
              isPrimary: true,
            })
          );
        } catch (e) {
          console.error('POINTERDOWN ERROR:', e);
        }

        try {
          element.dispatchEvent(
            new MouseEventCtor('mousedown', {
              bubbles: true,
              cancelable: true,
              clientX,
              clientY,
              button: 0,
              buttons: 1,
              detail: 1,
            })
          );
        } catch {
          // ignore
        }

        try {
          element.dispatchEvent(
            new PointerEventCtor('pointerup', {
              bubbles: true,
              cancelable: true,
              clientX,
              clientY,
              button: 0,
              buttons: 0,
              pointerId: 1,
              pointerType: 'mouse',
              isPrimary: true,
            })
          );
        } catch {
          // ignore
        }

        try {
          element.dispatchEvent(
            new MouseEventCtor('mouseup', {
              bubbles: true,
              cancelable: true,
              clientX,
              clientY,
              button: 0,
              buttons: 0,
              detail: 1,
            })
          );
        } catch {
          // ignore
        }

        // Detect if clicked element is a progression/submission button (Post, Send, Submit, Tweet, etc.)
        const btnText = (element.textContent || (element as HTMLElement).innerText || element.getAttribute('aria-label') || element.getAttribute('title') || '').trim();
        const btnTextLower = btnText.toLowerCase();
        const activeDialogBefore = Boolean(element.closest('div[role="dialog"], dialog, .artdeco-modal, .compose-modal, div[aria-modal="true"]'));

        // Modal openers (Start a post, Compose, etc.) MUST NEVER be treated as submission buttons!
        const isOpenerBtn = [
          'start a post',
          'create a post',
          'write a post',
          'start writing',
          'new post',
          'compose',
          'new tweet',
          'new message',
          'start a discussion',
        ].some((phrase) => btnTextLower.includes(phrase));

        const isExactSubmitVerb = ['post', 'send', 'submit', 'publish', 'tweet', 'reply', 'confirm'].includes(btnTextLower);
        const isShareActionBtn = (element as HTMLElement).classList?.contains('share-actions__primary-action');
        const hasSendIcon = Boolean((element as HTMLElement).querySelector?.('[data-icon="send"], [data-icon="send-filled"], [data-testid*="send" i]'));

        const isProgressionBtn =
          !isOpenerBtn &&
          (isShareActionBtn ||
           hasSendIcon ||
           (activeDialogBefore && isExactSubmitVerb) ||
           (activeDialogBefore && ['post', 'send', 'submit', 'publish'].some((t) => btnTextLower.split(/\s+/).includes(t))));

        // Single clean click execution (avoids double-click / duplicate tab spawn)
        if (typeof (element as HTMLElement).click === 'function') {
          try {
            (element as HTMLElement).click();
          } catch {
            const clickEvent = new MouseEventCtor('click', {
              bubbles: true,
              cancelable: true,
              clientX,
              clientY,
              button: 0,
              buttons: 0,
              detail: 1,
            });
            element.dispatchEvent(clickEvent);
          }
        } else {
          const clickEvent = new MouseEventCtor('click', {
            bubbles: true,
            cancelable: true,
            clientX,
            clientY,
            button: 0,
            buttons: 0,
            detail: 1,
          });
          element.dispatchEvent(clickEvent);
        }

        // If target is a <summary> element, ensure parent <details> is toggled
        if (element.tagName.toLowerCase() === 'summary') {
          const parentDetails = element.closest('details');
          if (parentDetails && !parentDetails.open) {
            parentDetails.open = true;
          }
        }

        // If it was a checkable input and calling click did not toggle checked, ensure toggle and events
        if (isCheckable && (element as HTMLInputElement).checked === initialChecked) {
          (element as HTMLInputElement).checked = !initialChecked;
          element.dispatchEvent(new Event('input', { bubbles: true }));
          element.dispatchEvent(new Event('change', { bubbles: true }));
        }

        return {
          success: true,
          isSubmitAction: isProgressionBtn,
          buttonLabel: btnText.slice(0, 40),
          wasInsideDialog: activeDialogBefore,
        };
      }

      case 'type':
      case 'fill':
      case 'input':
      case 'select':
      case 'choose': {
        const effectiveSelector = actionJson.selector || (actionJson as any).target;
        let effectiveId = actionJson.id;
        if (!effectiveId && typeof effectiveSelector === 'string') {
          const m = effectiveSelector.match(/data-agent-id=['"]([^'"]+)['"]/);
          if (m) effectiveId = m[1];
          else if (effectiveSelector.startsWith('agent-') || effectiveSelector.startsWith('R')) effectiveId = effectiveSelector;
        }
        const element = await findElementWithRetry(effectiveId, effectiveSelector, true, 1500);

        if (!element) {
          return { success: false, error: 'Element not found for type/select action' };
        }

        // Focus the element first
        if (element instanceof HTMLElement) {
          try {
            element.scrollIntoView({ behavior: 'instant', block: 'center' });
          } catch {
            // ignore
          }
          element.focus();
          element.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
          element.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
        }

        const rawValue = actionJson.value ?? (actionJson as any).text ?? (actionJson as any).url ?? '';
        const hasTrailingEnter = rawValue.endsWith('\n') || rawValue.endsWith('\r');
        const textToSet = hasTrailingEnter ? rawValue.replace(/[\r\n]+$/, '') : rawValue;

        // Native HTMLSelectElement dropdown handling
        const selectEl = (element.tagName?.toLowerCase() === 'select' ? element : element.querySelector('select')) as HTMLSelectElement | null;
        if (selectEl) {
          return await handleNativeSelect(selectEl, textToSet, (actionJson as any).thought);
        }

        // Custom Combobox / ARIA Dropdown handling
        const isCombobox =
          element.getAttribute('role') === 'combobox' ||
          element.getAttribute('aria-haspopup') === 'listbox' ||
          element.getAttribute('aria-haspopup') === 'true' ||
          element.classList.contains('dropdown-toggle') ||
          element.classList.contains('select2-selection');
        if (isCombobox) {
          return await handleCustomCombobox(element, textToSet, (actionJson as any).thought);
        }

        const isRichEditor =
          (element as HTMLElement).isContentEditable ||
          element.getAttribute('role') === 'textbox' ||
          element.classList.contains('ql-editor') ||
          element.classList.contains('DraftEditor-root') ||
          element.classList.contains('ProseMirror') ||
          element.hasAttribute('contenteditable');

        // Use appropriate native prototype value setter to prevent "Illegal invocation"
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
          const prototype = element instanceof HTMLTextAreaElement
            ? window.HTMLTextAreaElement.prototype
            : window.HTMLInputElement.prototype;

          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            prototype,
            'value'
          )?.set;

          try {
            if (nativeInputValueSetter) {
              nativeInputValueSetter.call(element, textToSet);
            } else {
              element.value = textToSet;
            }
          } catch {
            element.value = textToSet;
          }

          // Try native execCommand insertText as well if allowed (sets internal framework state)
          try {
            element.select();
            document.execCommand('insertText', false, textToSet);
          } catch {
            // ignore fallback
          }

          // Dispatch beforeinput and input events (crucial for React, Vue, Angular, Google Closure)
          try {
            element.dispatchEvent(
              new InputEvent('beforeinput', { bubbles: true, cancelable: true, inputType: 'insertText', data: textToSet })
            );
          } catch {
            // older browsers fallback
          }

          element.dispatchEvent(
            new Event('input', { bubbles: true, cancelable: true })
          );

          // Dispatch change event
          element.dispatchEvent(
            new Event('change', { bubbles: true, cancelable: true })
          );
        } else if (isRichEditor) {
          // RICH TEXT EDITOR SUPPORT (Quill, Lexical, Draft.js, ProseMirror, Slate, Slack, Twitter, WhatsApp Web)
          const htmlEl = element as HTMLElement;
          htmlEl.focus();
          try {
            htmlEl.click();
          } catch {
            // ignore
          }

          // 1. Universal atomic clear: select existing content and delete via execCommand
          // This notifies the rich editor framework (Lexical, Quill, Draft.js) of content deletion
          try {
            document.execCommand('selectAll', false);
            document.execCommand('delete', false);
          } catch {
            // ignore
          }

          try {
            const selection = window.getSelection();
            if (htmlEl.textContent && htmlEl.textContent.trim().length > 0) {
              const range = document.createRange();
              range.selectNodeContents(htmlEl);
              selection?.removeAllRanges();
              selection?.addRange(range);
              document.execCommand('delete', false);
            }
          } catch {
            // ignore
          }

          // 2. If residual content still lingers, purge child nodes cleanly
          if (htmlEl.textContent && htmlEl.textContent.trim().length > 0) {
            htmlEl.innerHTML = '';
            htmlEl.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
          }

          // 3. Native standard document.execCommand('insertText')
          // In Chromium, this natively handles the full trusted beforeinput & input event sequence!
          let execSuccess = false;
          try {
            execSuccess = document.execCommand('insertText', false, textToSet);
          } catch {
            execSuccess = false;
          }

          // 4. Fallback structured insertion ONLY if execCommand completely failed or editor has no content
          if (!execSuccess || !htmlEl.textContent || htmlEl.textContent.trim().length === 0) {
            try {
              htmlEl.dispatchEvent(
                new InputEvent('beforeinput', { bubbles: true, cancelable: true, inputType: 'insertText', data: textToSet })
              );
            } catch {
              // ignore
            }
            if (!htmlEl.textContent || htmlEl.textContent.trim().length === 0) {
              const paragraphs = textToSet.split(/\r?\n/).filter((p) => p.trim().length > 0);
              if (paragraphs.length > 0) {
                htmlEl.innerHTML = paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('');
              } else {
                htmlEl.innerHTML = `<p>${escapeHtml(textToSet)}</p>`;
              }
            }
          }

          // Remove Quill's and placeholder classes so progression / "Post" / "Send" buttons enable
          htmlEl.classList.remove('ql-blank');

          // 5. Crucial: Dispatch ONLY generic input and change events WITHOUT duplicate insertText data payload!
          // Modern editors (Lexical/React) insert text on each inputType: 'insertText' event, causing 3x concatenation
          // if synthetic beforeinput/input events with data are also fired.
          htmlEl.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
          htmlEl.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
          htmlEl.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: 'a' }));
        } else {
          (element as unknown as { value: string }).value = textToSet;
        }

        // UNIVERSAL TRAILING ENTER & PROGRESSION HANDLER
        // Executes for BOTH standard inputs/textareas and rich-text contenteditable editors
        if (hasTrailingEnter) {
          const enterDown = new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true,
            cancelable: true,
          });
          const enterPress = new KeyboardEvent('keypress', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true,
            cancelable: true,
          });
          const enterUp = new KeyboardEvent('keyup', {
            key: 'Enter',
            code: 'Enter',
            keyCode: 13,
            which: 13,
            bubbles: true,
            cancelable: true,
          });

          element.dispatchEvent(enterDown);
          element.dispatchEvent(enterPress);
          element.dispatchEvent(enterUp);

          // Allow a brief settling delay (150ms) for reactive SPAs (WhatsApp, Slack, Discord, LinkedIn, Google)
          // to update their DOM state (e.g. mic icon switching to Send button or enabling Submit button)
          await new Promise((resolve) => setTimeout(resolve, 150));

          // Universal form submission & action button trigger:
          let submitted = false;

          const findVisibleSubmitBtn = (container: ParentNode): HTMLElement | null => {
            const candidates = Array.from(
              container.querySelectorAll<HTMLElement>(
                'button[type="submit"], input[type="submit"], #nav-search-submit-button, [aria-label*="Search" i][role="button"], input[name="btnK"], button[aria-label*="Send" i], button[aria-label*="Post" i], button[aria-label*="Submit" i], button[aria-label*="Reply" i], button[aria-label*="Publish" i], [data-icon="send"], [data-icon="send-filled"], [data-testid*="send" i], [data-testid*="submit" i], button.share-actions__primary-action'
              )
            );
            return (
              candidates.find(
                (b) =>
                  isElementVisible(b) &&
                  !b.hasAttribute('disabled') &&
                  b.getAttribute('aria-disabled') !== 'true'
              ) || null
            );
          };

          const activeForm = (element as any).form || element.closest('form');
          const activeDialog = element.closest(
            'div[role="dialog"], dialog, .artdeco-modal, .compose-modal, div[aria-modal="true"]'
          );
          const container = activeForm || activeDialog || document;
          const submitBtn = findVisibleSubmitBtn(container) || findVisibleSubmitBtn(document);

          if (submitBtn && typeof submitBtn.click === 'function') {
            try {
              submitBtn.click();
              submitted = true;
            } catch {
              // ignore
            }
          }

          // Fallback to standard form.requestSubmit() or form.submit()
          if (!submitted && activeForm) {
            try {
              if (typeof activeForm.requestSubmit === 'function') {
                activeForm.requestSubmit();
                submitted = true;
              } else if (typeof activeForm.submit === 'function') {
                activeForm.submit();
                submitted = true;
              }
            } catch {
              // ignore
            }
          }
        }

        return { success: true };
      }

      case 'zoom': {
        const direction = ((actionJson.value || 'in') as string).toLowerCase().trim();
        const isZoomIn = direction === 'in' || direction === 'up' || direction === '+' || Number(direction) > 0;

        // 1. Try finding explicit zoom button on the page (OpenLayers, Leaflet, Bhuvan, GIS)
        const zoomButtonSelector = isZoomIn
          ? '.ol-zoom-in, .leaflet-control-zoom-in, button[title*="Zoom in" i], [aria-label*="Zoom in" i], button.zoom-in, #zoomIn, [id*="zoom-in" i], [class*="zoom-in" i], [data-control="zoom-in"]'
          : '.ol-zoom-out, .leaflet-control-zoom-out, button[title*="Zoom out" i], [aria-label*="Zoom out" i], button.zoom-out, #zoomOut, [id*="zoom-out" i], [class*="zoom-out" i], [data-control="zoom-out"]';

        let zoomButton = document.querySelector(zoomButtonSelector) as HTMLElement | null;

        // If not found by selector, check candidate buttons with '+' or '-' text
        if (!zoomButton) {
          const allButtons = Array.from(document.querySelectorAll('button, a, div[role="button"]')) as HTMLElement[];
          zoomButton = allButtons.find((b) => {
            const txt = (b.textContent || '').trim();
            return isZoomIn ? (txt === '+' || txt === '＋') : (txt === '-' || txt === '−' || txt === '—');
          }) || null;
        }

        if (zoomButton) {
          try {
            zoomButton.click();
            return { success: true };
          } catch {
            // fallback to wheel event
          }
        }

        // 2. Wheel event fallback on map canvas or map container
        const mapContainer = document.querySelector(
          '.ol-viewport, .leaflet-container, canvas, #map, .map-container, [role="region"][aria-label*="map" i], div[class*="map"]'
        ) || document.body;

        try {
          const rect = mapContainer.getBoundingClientRect();
          const clientX = Math.round(rect.left + rect.width / 2);
          const clientY = Math.round(rect.top + rect.height / 2);
          const wheelEvent = new WheelEvent('wheel', {
            bubbles: true,
            cancelable: true,
            clientX,
            clientY,
            deltaY: isZoomIn ? -120 : 120,
            deltaMode: 0,
            ctrlKey: true,
          });
          mapContainer.dispatchEvent(wheelEvent);
          return { success: true };
        } catch (e: any) {
          return { success: false, error: e?.message || 'Zoom failed' };
        }
      }

      case 'navigate': {
        const rawTargetUrl = actionJson.value || (actionJson as Record<string, unknown>).url;
        if (typeof rawTargetUrl === 'string' && rawTargetUrl.trim()) {
          let targetUrl = rawTargetUrl.trim();
          if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://') && !targetUrl.startsWith('/')) {
            if (targetUrl.includes('.') && !targetUrl.includes(' ')) {
              targetUrl = 'https://' + targetUrl;
            }
          }
          // Guard against unwanted navigation to google.com away from completed workflow pages
          const current = window.location.href.toLowerCase();
          if (
            targetUrl.toLowerCase().includes('google.com') &&
            !current.includes('google.com') &&
            (current.includes('linkedin.com') || current.includes('twitter.com') || current.includes('x.com'))
          ) {
            console.warn('[content] Guard: blocked navigation to google.com from workflow page:', current);
            return { success: true };
          }
          window.location.href = targetUrl;
          return { success: true };
        }
        return { success: false, error: 'No URL provided for navigate action' };
      }

      case 'scroll': {
        const direction = actionJson.value === 'up' ? -1 : 1;
        const amount = typeof (actionJson as Record<string, unknown>).amount === 'number'
          ? ((actionJson as Record<string, unknown>).amount as number)
          : 600;
        window.scrollBy({ top: direction * amount, behavior: 'instant' });
        return { success: true };
      }

      case 'back': {
        window.history.back();
        return { success: true };
      }

      case 'done':
        return { success: true };

      default:
        return { success: false, error: `Unknown action: ${actionJson.action}` };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
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

export interface SensitiveRegion {
  id: string;
  type: SensitiveType;
  text: string;
  bbox: [number, number, number, number]; // [x, y, width, height] in CSS pixels
  confidence: number;
}

/**
 * The Sentinel: Local Client-Side Semantic Perception
 * Scans both input elements and rendered DOM text nodes across the 25-class taxonomy:
 * financial instruments, national IDs, credentials, addresses, and personal identities.
 */
export function detectSensitiveDOMRegions(): SensitiveRegion[] {
  const regions: SensitiveRegion[] = [];
  const seenKeys = new Set<string>();

  function addRegion(region: SensitiveRegion) {
    const key = `${Math.round(region.bbox[0])}_${Math.round(region.bbox[1])}_${Math.round(region.bbox[2])}_${Math.round(region.bbox[3])}`;
    if (!seenKeys.has(key) && region.bbox[2] > 0 && region.bbox[3] > 0) {
      seenKeys.add(key);
      regions.push(region);
    }
  }

  // 1. Scan sensitive input elements
  const inputElements = document.querySelectorAll(
    'input[type="password"], input[type="email"], input[type="tel"], [data-masked="true"], input[autocomplete*="cc-"], input[name*="card"], input[name*="cvv"], input[name*="otp"], input[name*="pin"], input[autocomplete*="one-time-code"]'
  );

  inputElements.forEach((el, idx) => {
    const rect = el.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
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
        bbox: [rect.left, rect.top, rect.width, rect.height],
        confidence: 0.99,
      });
    }
  });

  // 2. Scan rendered visible text nodes using TreeWalker (Amazon checkout, banking, KYC, dev portals)
  if (document.body) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node: Node | null;

    while ((node = walker.nextNode())) {
      const rawText = node.textContent?.trim();
      if (!rawText || rawText.length < 3) continue;

      const parent = node.parentElement;
      if (!parent || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.tagName === 'NOSCRIPT') continue;

      let rect = parent.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0 || rect.bottom < 0 || rect.top > window.innerHeight) continue;

      try {
        const range = document.createRange();
        range.selectNodeContents(node);
        const textRect = range.getBoundingClientRect();
        if (textRect.width > 0 && textRect.height > 0) {
          rect = textRect;
        }
      } catch {
        // fallback to parent rect
      }

      // Check regex rules in strict priority order across 25 classes

      // 1. Private Keys
      if (/-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/.test(rawText)) {
        addRegion({
          id: `privkey_${regions.length + 1}`,
          type: 'PRIVATE_KEY',
          text: rawText,
          bbox: [rect.left, rect.top, rect.width, rect.height],
          confidence: 0.99,
        });
        continue;
      }

      // 2. JWT & OAuth Bearer Tokens
      if (/\bBearer\s+eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\b|\beyJ[a-zA-Z0-9_-]{10,}\.eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\b/.test(rawText)) {
        addRegion({
          id: `jwt_${regions.length + 1}`,
          type: 'JWT_TOKEN',
          text: rawText,
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
          confidence: 0.99,
        });
        continue;
      }

      // 11. PAN (ABCDE1234F)
      if (/\b[A-Z]{5}\d{4}[A-Z]\b/.test(rawText)) {
        addRegion({
          id: `pan_${regions.length + 1}`,
          type: 'PAN',
          text: rawText,
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
          confidence: 0.99,
        });
        continue;
      }

      // 20. Password text
      if (/(?:password|passwd)[:=\s]+\S+|\*{4,}/i.test(rawText)) {
        addRegion({
          id: `pwd_${regions.length + 1}`,
          type: 'PASSWORD',
          text: rawText,
          bbox: [rect.left, rect.top, rect.width, rect.height],
          confidence: 0.99,
        });
        continue;
      }

      // 21. Physical Address (Multi-component heuristic or shipping/billing header or street)
      if (
        /\b(?:\d{1,5}\s+[A-Za-z0-9.,#\s-]{4,40}(?:AVE|ST|RD|BLVD|DR|LANE|WAY|COURT|NW|SE|SW|NE|ROAD|STREET|AVENUE)|[A-Z]{2}\s+\d{5}(?:-\d{4})?)\b/i.test(rawText) ||
        /(?:billing\s+address|shipping\s+address|deliver\s+to):/i.test(rawText) ||
        containsFullAddress(rawText)
      ) {
        addRegion({
          id: `addr_${regions.length + 1}`,
          type: 'ADDRESS',
          text: rawText,
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
          confidence: 0.95,
        });
        continue;
      }

      // Personalized user greeting (e.g. "Joe, we're giving you Prime...", "Hi Jaswanth,")
      if (/^(?:Hi|Hello|Hey|Welcome)?\s*([A-Z][a-z]+),\s+(?:we're|welcome|your|you)/i.test(rawText)) {
        addRegion({
          id: `person_${regions.length + 1}`,
          type: 'PERSON',
          text: rawText,
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
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
          bbox: [rect.left, rect.top, rect.width, rect.height],
          confidence: 0.99,
        });
        continue;
      }
    }
  }

  return regions;
}

/**
 * Backwards-compatible bounding boxes accessor
 */
export function getSensitiveBoundingBoxes(): Array<{
  x: number;
  y: number;
  width: number;
  height: number;
}> {
  return detectSensitiveDOMRegions().map((r) => ({
    x: r.bbox[0],
    y: r.bbox[1],
    width: r.bbox[2],
    height: r.bbox[3],
  }));
}

/**
 * Loads a base64 data URL into an HTML Image element using the native Image API
 */
function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Failed to decode screenshot'));
    image.src = dataUrl;
  });
}

/** Face detection status flag: 'live' | 'degraded'. */
let faceStatus: 'live' | 'degraded' = 'degraded';

/**
 * Lazily-built, cached singleton for the MediaPipe FaceLandmarker.
 * The WASM binaries and the model `.task` file are loaded at runtime from the
 * extension's public directory via browser.runtime.getURL(...) — never remote CDNs.
 * On success faceStatus='live', on failure faceStatus='degraded' + return null.
 */
let faceLandmarkerPromise: Promise<FaceLandmarker | null> | null = null;

async function getFaceLandmarker(): Promise<FaceLandmarker | null> {
  if (!faceLandmarkerPromise) {
    faceLandmarkerPromise = (async () => {
      try {
        if (!isWasmSupported()) {
          faceStatus = 'degraded';
          return null;
        }

        const canFetch = await canFetchExtensionAssets();
        if (!canFetch) {
          faceStatus = 'degraded';
          return null;
        }

        // Load the WASM fileset from the extension's local public directory with a 2000ms timeout
        const wasmPath = browser.runtime.getURL('/mediapipe/wasm/');
        const visionPromise = FilesetResolver.forVisionTasks(wasmPath);
        const vision = await Promise.race([
          visionPromise,
          new Promise<null>((res) => setTimeout(() => res(null), 2000)),
        ]);

        if (!vision) {
          faceStatus = 'degraded';
          return null;
        }

        // Create the FaceLandmarker using a locally-hosted model asset.
        const modelPath = browser.runtime.getURL('/mediapipe/face_landmarker.task');
        const landmarkerPromise = FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: modelPath,
            // CPU delegate is more reliable in a content script (isolated world)
            // than GPU/WebGL, which can fail without a GPU context.
            delegate: 'CPU',
          },
          runningMode: 'IMAGE',
          numFaces: 10,
        });

        const landmarker = await Promise.race([
          landmarkerPromise,
          new Promise<null>((res) => setTimeout(() => res(null), 2000)),
        ]);

        if (!landmarker) {
          faceStatus = 'degraded';
          return null;
        }

        faceStatus = 'live';
        console.log('[content] MediaPipe FaceLandmarker live');
        return landmarker;
      } catch (error) {
        // Degrade gracefully: model/WASM absent or blocked. Return null so
        // detectAndBlurFaces returns [] without breaking the agent loop.
        faceStatus = 'degraded';
        console.warn('[content] MediaPipe unavailable (degraded):', error instanceof Error ? error.message : error);
        return null;
      }
    })();
  }
  return faceLandmarkerPromise;
}

/**
 * Renders a high-visibility semantic privacy badge on the canvas over redacted regions.
 * Matches SIH 2026 Problem Statement 171 specifications:
 * - Fill: #0F172A (Dark Slate / Deep Navy privacy block)
 * - Outline: #10B981 (Emerald Green 2px border)
 * - Badge Text: [REDACTED: TYPE] in #34D399 (Emerald 400 monospace)
 */
export interface RedactionBadgeInfo {
  type: string;
  bbox: [number, number, number, number];
  paddedBbox: [number, number, number, number];
}

export function drawSemanticBadge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  type: string
): RedactionBadgeInfo {
  const padding = 5;
  const rx0 = Math.max(0, Math.round(x - padding));
  const ry0 = Math.max(0, Math.round(y - padding));
  const canvasW = ctx.canvas.width;
  const canvasH = ctx.canvas.height;

  // Determine badge text and dynamic font sizing
  const badgeLabel = `[REDACTED: ${type.toUpperCase()}]`;
  const fontSize = Math.min(13, Math.max(10, Math.floor((height + padding * 2) * 0.65)));
  ctx.save();
  ctx.font = `bold ${fontSize}px "SF Mono", Monaco, Consolas, monospace`;
  const textMetrics = ctx.measureText(badgeLabel);

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

  // 3. Clear semantic badge text for Cloud VLM reasoning (#34D399)
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

/**
 * The Sentinel Pro: Local face detection via MediaPipe.
 * Runs face landmark detection on the provided canvas. For every detected face
 * it computes a bounding box from the returned landmarks and draws a solid
 * black rectangle over it using the provided 2D context.
 *
 * Returns an array of redaction coordinates in the form:
 *   [{ type: 'human_face', bbox: [x, y, width, height] }]
 */
export async function detectAndBlurFaces(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
): Promise<Array<{ type: string; bbox: number[] }>> {
  const redactions: Array<{ type: string; bbox: number[] }> = [];

  try {
    if (!isWasmSupported()) {
      return redactions;
    }

    const landmarker = await getFaceLandmarker();
    if (!landmarker) {
      return redactions;
    }

    // Run detection on the canvas (IMAGE mode, synchronous).
    const result = landmarker.detect(canvas);

    if (!result || !result.faceLandmarks || result.faceLandmarks.length === 0) {
      return redactions;
    }

    const width = canvas.width;
    const height = canvas.height;

    // Each detected face is an array of normalized (0..1) landmarks.
    for (const faceLandmarks of result.faceLandmarks) {
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      for (const landmark of faceLandmarks) {
        if (landmark.x < minX) minX = landmark.x;
        if (landmark.x > maxX) maxX = landmark.x;
        if (landmark.y < minY) minY = landmark.y;
        if (landmark.y > maxY) maxY = landmark.y;
      }

      // Convert normalized coordinates to pixel coordinates.
      const x = minX * width;
      const y = minY * height;
      const w = Math.max((maxX - minX) * width, 1);
      const h = Math.max((maxY - minY) * height, 1);

      // Render high-visibility semantic privacy badge over detected face
      drawSemanticBadge(ctx, x, y, w, h, 'FACE');

      redactions.push({
        type: 'human_face',
        bbox: [x, y, w, h],
      });
    }
  } catch {
    // Silently degrade: CDN blocked under MV3 CSP. Return [] so the
    // redaction pipeline continues without console noise.
    return [];
  }

  return redactions;
}

/**
 * Sovereign PII and classified security patterns recognized from OCR text crops.
 * Covers:
 *  - Aadhaar: 12 digits (spaced or unspaced) and masked variants (XXXX XXXX 1234)
 *  - PAN: 5 letters, 4 digits, 1 letter
 *  - Phone: Indian and international formats (+91, standard 10 digits)
 *  - Passport: Indian passport format (1 letter + 7 digits)
 *  - Cards: 16-digit payment card numbers
 *  - Sovereign/Classified Markings: ISRO internal stamps, confidential markings
 *  - Geospatial Telemetry: Latitude/Longitude with degree symbol (°)
 */
const AADHAAR_REGEX = /(?<![\d-])[2-9]\d{3}[ -]\d{4}[ -]\d{4}(?![- ]?\d)|\b\d{12}\b/;
const MASKED_AADHAAR_REGEX = /\b(?:XXXX|xxxx)[\s-](?:XXXX|xxxx)[\s-]\d{4}\b/;
const PAN_REGEX = /\b[A-Z]{5}\d{4}[A-Z]\b/;
const PHONE_REGEX = /(?<!\d)(?:\+?\d{1,3}[-.\s]?)?(?:\(\d{3}\)\s*\d{3}[-.\s]?\d{4}|\b[6-9]\d{9}\b)(?!\d)/;
const PASSPORT_REGEX = /\b[A-Z][1-9]\d{6}\b|\b[A-Z]\d{7}\b/;
const CARD_REGEX = /(?<!\d)(?:\d{4}[ -]?){3}\d{4}(?!\d)/;
const CLASSIFIED_MARKING_REGEX = /\b(CONFIDENTIAL|RESTRICTED SOVEREIGN|SECRET|TOP SECRET|ISRO INTERNAL|DEPARTMENT OF SPACE)\b/i;
const GEOSPATIAL_COORD_REGEX = /\b(?:Lat|Long|Latitude|Longitude)[:\s]*\d{1,2}(?:\.\d+)?\s*°/i;

export function textContainsPII(text: string): boolean {
  if (!text || text.trim().length === 0) return false;
  return evaluateTextPII(text).hasPII;
}

/**
 * The Scrivener: Lightweight OCR for image PII with Fail-Closed Zero-Leak Shield.
 * Runs on-device OCR over candidate images on the page, paired with ISO/IEC 7810
 * ID-1 card geometric analysis and OCR confusion normalization.
 *
 * Implements Defense-in-Depth:
 *   - Normalizes OCR misreadings (0<->O, 1<->I, 5<->S, 8<->B).
 *   - Quarantines candidate ID cards (<0.65 confidence) to prevent any data leak.
 *
 * Returns redaction coordinates in the form:
 *   [{ type: 'pii_image', bbox: [x, y, width, height] }]
 */
export async function scanImagesForPII(
  ctx: CanvasRenderingContext2D
): Promise<Array<{ type: string; bbox: number[] }>> {
  const redactions: Array<{ type: string; bbox: number[] }> = [];

  if (!isWasmSupported()) {
    return redactions;
  }

  // Fast check: if OCR engine is unavailable (e.g. CSP blocked), return immediately
  if (!(await isOcrAvailable())) {
    return redactions;
  }

  const images = Array.from(document.querySelectorAll('img'));
  if (images.length === 0) {
    return redactions;
  }

  // Filter to visible images with meaningful document/card dimensions
  // Skips small avatars, emojis, reactions, icons, and buttons across all chat/social apps
  const candidateImages = images
    .filter((img) => img.naturalWidth >= 120 && img.naturalHeight >= 80 && isElementVisible(img))
    .slice(0, 4);

  if (candidateImages.length === 0) {
    return redactions;
  }

  // Device-pixel scale factor mapping DOM CSS coordinates -> screenshot pixels.
  const canvas = ctx.canvas;
  const scaleX = canvas.width / Math.max(window.innerWidth, 1);
  const scaleY = canvas.height / Math.max(window.innerHeight, 1);

  // Reusable hidden canvas for drawing each <img> before OCR.
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) return redactions;

  const ocrStartTime = Date.now();
  for (const img of candidateImages) {
    // Total stage time budget guard (max 2.0s) to prevent screenshot capture timeouts
    if (Date.now() - ocrStartTime > 2000) {
      break;
    }

    try {
      // Draw the image to a hidden canvas and serialize it for OCR.
      tempCanvas.width = img.naturalWidth;
      tempCanvas.height = img.naturalHeight;
      tempCtx.drawImage(img, 0, 0);
      const dataUrl = tempCanvas.toDataURL('image/jpeg', 0.9);

      // Use the ocrEngine abstraction with fast 800ms per-image timeout
      const result = await Promise.race([
        ocrRecognize(dataUrl),
        new Promise<OcrRecognition>((res) => setTimeout(() => res({ text: '', confidence: 0 }), 800)),
      ]);
      const ocrText = result?.text || '';
      const ocrConfidence = result?.confidence ?? 0;
      const isCard = isIdCardGeometry(img.naturalWidth, img.naturalHeight);
      const piiEval = evaluateTextPII(ocrText);
      const failClosed = shouldFailClosedQuarantine(ocrText, ocrConfidence, isCard);

      // If no PII in the OCR text and not a fail-closed candidate, this image stays untouched.
      if (!piiEval.hasPII && !failClosed) {
        continue;
      }

      // Map the original <img>'s on-screen rect to screenshot canvas pixels.
      const rect = img.getBoundingClientRect();
      const x = rect.left * scaleX;
      const y = rect.top * scaleY;
      const width = Math.max(rect.width * scaleX, 1);
      const height = Math.max(rect.height * scaleY, 1);

      // Render high-visibility semantic privacy badge over detected PII image
      const badgeType = piiEval.detectedType || (isCard ? 'CARD' : 'SENSITIVE_REGION');
      drawSemanticBadge(ctx, x, y, width, height, badgeType);

      redactions.push({
        type: 'pii_image',
        bbox: [x, y, width, height],
      });
    } catch {
      // Silently skip failed images without console noise.
      continue;
    }
  }

  return redactions;
}

/**
 * The Sentinel: Local Visual Redaction
 * Captures a screenshot via the background script, then blurs/solid-fills all
 * sensitive bounding boxes entirely on the client using the native Canvas API.
 */
export async function captureAndRedact(): Promise<{
  rawImage: string;
  image: string;
  legend: Array<{ id: string; type: string; bbox: number[] }>;
}> {
  // 1) Get local sensitive regions (DOM inputs + rendered text nodes)
  const regions = detectSensitiveDOMRegions();

  // 2) Ask the background script (service worker) for a screenshot
  const screenshotDataUrl = await browser.runtime.sendMessage({
    type: 'CAPTURE_TAB',
  });

  if (!screenshotDataUrl) {
    throw new Error('No screenshot received from background script');
  }

  // 3) Load the screenshot and draw onto a native canvas
  const image = await loadImage(screenshotDataUrl);

  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to acquire 2D canvas context');
  }
  ctx.drawImage(image, 0, 0);

  // PHASE 3: Local face detection via MediaPipe
  let faceRedactions: Array<{ type: string; bbox: number[] }> = [];
  try {
    faceRedactions = await Promise.race([
      detectAndBlurFaces(canvas, ctx),
      new Promise<Array<{ type: string; bbox: number[] }>>((res) => setTimeout(() => res([]), 2500)),
    ]);
  } catch {
    faceRedactions = [];
  }
  const redactions: Array<{ type: string; bbox: number[] }> = [...faceRedactions];

  // PHASE 4: Lightweight WASM OCR for image PII
  try {
    const ocrRedactions = await Promise.race([
      scanImagesForPII(ctx),
      new Promise<Array<{ type: string; bbox: number[] }>>((res) => setTimeout(() => res([]), 2500)),
    ]);
    redactions.push(...ocrRedactions);
  } catch {
    // Silently continue without OCR redaction; blocked under MV3 CSP.
  }

  // Screenshot may be device-pixel scaled vs DOM CSS coordinates; compute scale factor
  const scaleX = image.naturalWidth / Math.max(window.innerWidth, 1);
  const scaleY = image.naturalHeight / Math.max(window.innerHeight, 1);

  // 4) Redact each sensitive DOM region with semantic privacy badges
  const redactionMap: Array<{ id: string; type: string; bbox: number[]; paddedBbox: [number, number, number, number] }> = [];
  for (const region of regions) {
    const x = region.bbox[0] * scaleX;
    const y = region.bbox[1] * scaleY;
    const width = Math.max(region.bbox[2] * scaleX, 1);
    const height = Math.max(region.bbox[3] * scaleY, 1);

    // Apply native blur underneath as a defensive layer
    ctx.save();
    ctx.filter = 'blur(15px)';
    ctx.fillRect(x, y, width, height);
    ctx.restore();

    // Render high-visibility semantic badge [REDACTED: TYPE]
    const badgeInfo = drawSemanticBadge(ctx, x, y, width, height, region.type);

    redactionMap.push({
      id: region.id,
      type: region.type.toLowerCase(),
      bbox: [x, y, width, height],
      paddedBbox: badgeInfo.paddedBbox,
    });

    redactions.push({
      type: region.type.toLowerCase(),
      bbox: [x, y, width, height],
    });
  }

  // 4b) Security Boundary Verification: fail-closed gate before transmitting anything
  const structuredDOM = Array.from(document.querySelectorAll('input, button, a, [data-agent-id]')).map((el) => {
    const inputEl = el as HTMLInputElement;
    return {
      id: el.getAttribute('data-agent-id') || el.id || 'unknown',
      tag: el.tagName.toLowerCase(),
      type: inputEl.type,
      text: el.textContent || '',
      value: inputEl.value || '',
    };
  });

  const scaledRegions = regions.map((r) => ({
    ...r,
    bbox: [r.bbox[0] * scaleX, r.bbox[1] * scaleY, r.bbox[2] * scaleX, r.bbox[3] * scaleY] as [number, number, number, number],
  }));

  const verification = runSecurityBoundaryVerification(
    scaledRegions,
    redactionMap,
    structuredDOM,
    0.85
  );

  if (!verification.passed) {
    console.error('[Sentinel] Security boundary verification failed:', verification.reasons);
    throw new Error(`FAIL_CLOSED_VERIFICATION_ERROR: ${verification.reasons.join('; ')}`);
  }

  // 5) Build the redaction legend, assigning each redaction a unique ID
  const redaction_legend = redactions.map((redaction, index) => ({
    id: `R${index + 1}`,
    type: redaction.type,
    bbox: redaction.bbox,
  }));

  // 6) Return both the pre-redaction raw screenshot and the redacted frame as base64 plus redaction legend
  return {
    rawImage: screenshotDataUrl,
    image: canvas.toDataURL('image/jpeg', 0.7),
    legend: redaction_legend,
  };
}

/**
 * The Watchman: Smart page stability detector
 * Returns true when the DOM has stopped mutating for 800ms after
 * `document.readyState === 'complete'`, or hard-timeouts after 5000ms
 * to prevent infinite hangs.
 */
export function waitForPageStable(): Promise<boolean> {
  return new Promise((resolve) => {
    const STABLE_MS = 800;
    const HARD_TIMEOUT_MS = 5000;

    let stableTimer: ReturnType<typeof setTimeout> | null = null;
    let hardTimer: ReturnType<typeof setTimeout> | null = null;
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      if (stableTimer) clearTimeout(stableTimer);
      if (hardTimer) clearTimeout(hardTimer);
      observer.disconnect();
      resolve(true);
    };

    const observer = new MutationObserver(() => {
      // Any mutation resets the stability window
      if (settled) return;
      if (stableTimer) clearTimeout(stableTimer);
      stableTimer = setTimeout(finish, STABLE_MS);
    });

    // If the page hasn't finished loading yet, wait until it does,
    // then start observing. Otherwise, start observing immediately.
    const startObserving = () => {
      if (!document.body) {
        // Body not available yet â€” schedule for the next tick
        setTimeout(startObserving, 0);
        return;
      }
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
      // Kick off the first stability window
      stableTimer = setTimeout(finish, STABLE_MS);
      hardTimer = setTimeout(finish, HARD_TIMEOUT_MS);
    };

    if (document.readyState === 'complete') {
      startObserving();
    } else {
      const onReady = () => {
        document.removeEventListener('readystatechange', onReady);
        startObserving();
      };
      document.addEventListener('readystatechange', onReady);
      // Also start the hard timeout immediately in case readystatechange
      // never fires (defensive against edge cases).
      hardTimer = setTimeout(finish, HARD_TIMEOUT_MS);
    }
  });
}

/**
 * Sovereign Privacy Shield — in-page floating status badge
 */
function showPrivacyShield(active: boolean) {
  let shield = document.getElementById('sovereign-privacy-shield');
  if (!active) {
    shield?.remove();
    return;
  }
  if (!shield && document.body) {
    shield = document.createElement('div');
    shield.id = 'sovereign-privacy-shield';
    shield.setAttribute('style', `
      position: fixed;
      bottom: 16px;
      right: 16px;
      z-index: 2147483647;
      background: rgba(10, 25, 47, 0.94);
      color: #c5a059;
      border: 1px solid rgba(197, 160, 89, 0.6);
      border-radius: 20px;
      padding: 6px 14px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(8px);
      pointer-events: none;
      display: flex;
      align-items: center;
      gap: 6px;
    `);
    shield.innerHTML = `
      <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#10b981;box-shadow:0 0 8px #10b981;"></span>
      <span>ZERO-TRUST SHIELD ACTIVE</span>
      <span style="opacity:0.75;font-size:9px;font-family:monospace;border-left:1px solid rgba(197,160,89,0.3);padding-left:6px;">25 CLASSES GUARDED</span>
    `;
    document.body.appendChild(shield);
  }
}

export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    // Listen for messages from the extension
    browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      if (message.type === 'PING') {
        // Health-check ping from the background script to verify the content script is loaded.
        sendResponse({ success: true });
        return false;
      } else if (message.type === 'GET_DOM') {
        const domData = getMaskedDom();
        sendResponse({ success: true, data: domData });
        return false;
      } else if (message.type === 'EXECUTE_ACTION') {
        void executeAction(message.payload).then((result) => sendResponse(result));
        return true;
      } else if (message.type === 'WAIT_FOR_STABLE') {
        void waitForPageStable().then((ok) => sendResponse({ success: ok }));
        return true;
      } else if (message.type === 'SHOW_SHIELD') {
        showPrivacyShield(message.payload?.active !== false);
        sendResponse({ success: true });
        return false;
      } else if (message.type === 'AUDIT_PAGE') {
        // Instant on-demand page audit: detect all sensitive regions, compute metrics, and capture visual frame
        (async () => {
          try {
            const regions = detectSensitiveDOMRegions();
            const categoryCounts: Record<string, number> = {};
            for (const r of regions) {
              categoryCounts[r.type] = (categoryCounts[r.type] || 0) + 1;
            }

            let captureRes: { image?: string; legend?: any[] } = {};
            try {
              captureRes = await captureAndRedact();
            } catch {
              // fallback if canvas or screenshot failed
            }

            sendResponse({
              success: true,
              url: window.location.href,
              title: document.title,
              timestamp: Date.now(),
              totalSensitiveCount: regions.length,
              categoryCounts,
              regions: regions.map((r) => ({ id: r.id, type: r.type, text: r.maskedText })),
              legend: captureRes.legend || [],
              image: captureRes.image || '',
            });
          } catch (auditErr) {
            sendResponse({
              success: false,
              error: auditErr instanceof Error ? auditErr.message : 'Page audit failed',
            });
          }
        })();
        return true;
      } else if (message.type === 'GET_SCREENSHOT') {
        // Capture + locally redact the screenshot, return { image, legend }
        let responded = false;
        const timer = setTimeout(() => {
          if (!responded) {
            responded = true;
            sendResponse({ success: false, error: 'Screenshot redaction timed out' });
          }
        }, 10000);

        captureAndRedact()
          .then((result) => {
            if (!responded) {
              responded = true;
              clearTimeout(timer);
              sendResponse({
                success: true,
                image: result.image,
                legend: result.legend,
                rawImage: result.rawImage,
              });
            }
          })
          .catch((err) => {
            if (!responded) {
              responded = true;
              clearTimeout(timer);
              sendResponse({
                success: false,
                error: err instanceof Error ? err.message : 'Redaction failed',
              });
            }
          });
        return true;
      } else if (message.type === 'WAIT_FOR_STABLE') {
        // Smart Latency Engine: wait for the page to settle before responding
        waitForPageStable()
          .then((stable) => sendResponse({ success: stable }))
          .catch((err) =>
            sendResponse({
              success: false,
              error: err instanceof Error ? err.message : 'Stability check failed',
            })
          );
        return true;
      } else if (message.type === 'GET_PROGRESSION_BUTTON') {
        const activeDialog = document.querySelector(
          'div[role="dialog"], dialog[open], .artdeco-modal, .compose-modal, div[aria-modal="true"], div[class*="modal"], div[class*="dialog"], form'
        );
        const container = activeDialog || document;
        const candidates = Array.from(
          container.querySelectorAll<HTMLElement>(
            'button[type="submit"], input[type="submit"], button.share-actions__primary-action, button[aria-label*="Post" i], button[aria-label*="Send" i], button[aria-label*="Submit" i], button[aria-label*="Publish" i], [data-icon="send"], [data-testid*="send" i], [data-testid*="submit" i], button, [role="button"]'
          )
        );
        const progressionTerms = ['post', 'send', 'submit', 'publish', 'save', 'confirm', 'continue', 'next', 'done', 'reply', 'tweet'];
        let matchedEl: HTMLElement | null = null;
        for (const btn of candidates) {
          if (!isElementVisible(btn)) continue;
          if (btn.hasAttribute('disabled') || btn.getAttribute('aria-disabled') === 'true') continue;
          const text = (
            btn.textContent ||
            btn.innerText ||
            btn.getAttribute('aria-label') ||
            btn.getAttribute('data-icon') ||
            btn.getAttribute('data-testid') ||
            btn.getAttribute('title') ||
            ''
          ).toLowerCase().trim();
          const hasIconMatch =
            Boolean(btn.querySelector('[data-icon="send"], [data-icon="send-filled"], [data-testid*="send" i]')) ||
            btn.getAttribute('data-icon') === 'send';
          if (hasIconMatch || progressionTerms.some((t) => text.includes(t))) {
            matchedEl = btn;
            break;
          }
        }
        if (matchedEl) {
          let agentId = matchedEl.getAttribute('data-agent-id') || matchedEl.id;
          if (!agentId) {
            agentId = `agent-progression-${Date.now()}`;
            matchedEl.setAttribute('data-agent-id', agentId);
          }
          sendResponse({
            success: true,
            found: true,
            id: agentId,
            selector: `[data-agent-id="${agentId}"]`,
            label: (matchedEl.textContent || matchedEl.innerText || '').trim().slice(0, 30),
          });
        } else {
          sendResponse({ success: true, found: false });
        }
        return false;
      }

      // Do not handle unknown messages; return false so the channel closes cleanly
      return false;
    });
  },
});

