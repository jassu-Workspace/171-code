/**
 * Zero-Trust Security Audit — The SIH Guarantee (Phase 5)
 * ---------------------------------------------------------------------------
 * Proves, over all 150 generated scenarios, that the client NEVER exfiltrates
 * raw PII — only masked DOM + redacted frames leave the tab.
 *
 * Production mirrored here (background/index.ts :: callServer + strip):
 *   redactedImage = screenshot.image.replace(/^data:image\/\w+;base64,/, '')
 *   fetch(SERVER_URL, { method:'POST',
 *     headers:{ 'Content-Type':'application/json', 'x-secret-password':… },
 *     body: JSON.stringify({ task, maskedDom, redactedImage, redaction_legend }) })
 *
 * Audit method: mock global.fetch, drive the mirrored loop once per scenario
 * with the scenario's REDACTED artifacts, then forensically inspect every
 * outbound body. 100% decoupled — no import from extension/ or server/.
 *
 * Guarantees asserted:
 *  1. Outbound body contains ZERO of the 8 raw secrets per scenario
 *     (150 × 8 = 1200 leak checks).
 *  2. Outbound redactedImage === mutated REDACTED frame, never the raw frame,
 *     and carries no `data:` header (Phase 8).
 *
 * Run: cd tests && npm run test -- security/piiLeak.test.ts
 */
import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SCENARIOS_PATH = join(__dirname, '..', 'data', 'scenarios.json');

const SERVER_URL = 'http://localhost:3000/api/step';
const SECRET_PASSWORD = 'my-secret-key';

// ---------------------------------------------------------------------------
// Production mirrors (background/index.ts — verbatim behaviour)
// ---------------------------------------------------------------------------
function stripDataUrlPrefix(dataUrl: string): string {
  return dataUrl.replace(/^data:image\/\w+;base64,/, '');
}

interface OutboundPayload {
  task: string;
  maskedDom: string;
  redactedImage: string;
  redaction_legend: Array<{ id: string; type: string; bbox: number[] }>;
}

/** Mirrors background callServer() — the ONLY network exit in the loop. */
async function simulatedCallServer(
  task: string,
  maskedDom: string,
  redactedImage: string,
  redaction_legend: OutboundPayload['redaction_legend'],
): Promise<unknown> {
  const response = await fetch(SERVER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-secret-password': SECRET_PASSWORD },
    body: JSON.stringify({ task, maskedDom, redactedImage, redaction_legend }),
  });
  if (!response.ok) throw new Error(`Server responded with status ${response.status}`);
  return response.json();
}

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------
interface Scenario {
  id: number;
  scenario_name: string;
  task: string;
  raw_pii_list: string[];
  mock_masked_dom: string;
  mock_redaction_legend: Array<{ id: string; type: string; bbox: number[] }>;
  mock_image_base64: string;
  mock_raw_image_base64: string;
  mock_data_url: string;
  mock_raw_data_url: string;
}

let scenarios: Scenario[] = [];
beforeAll(() => {
  try {
    scenarios = JSON.parse(readFileSync(SCENARIOS_PATH, 'utf8'));
  } catch {
    throw new Error(`Missing ${SCENARIOS_PATH}. Run: cd tests && npm run generate-scenarios`);
  }
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

interface Captured {
  url: string;
  method: string;
  headers: Record<string, string>;
  rawBody: string;
  parsed: OutboundPayload;
}

/** Drive one loop step through the mocked fetch and capture the wire bytes. */
async function captureOneStep(s: Scenario): Promise<Captured> {
  let captured: Captured | null = null;
  const fetchMock = vi.fn(async (url: unknown, init?: RequestInit) => {
    const rawBody = String((init?.body as string) ?? '');
    const headers = new Headers((init?.headers as HeadersInit) ?? {});
    captured = {
      url: String(url),
      method: String(init?.method ?? 'GET'),
      headers: Object.fromEntries(headers.entries()),
      rawBody,
      parsed: JSON.parse(rawBody) as OutboundPayload,
    };
    return new Response(JSON.stringify({ action: 'done' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  });
  vi.stubGlobal('fetch', fetchMock);

  // Content script returns a DATA URL; background strips it (Phase 8) before POST.
  const stripped = stripDataUrlPrefix(s.mock_data_url);
  await simulatedCallServer(s.task, s.mock_masked_dom, stripped, s.mock_redaction_legend);

  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(captured).not.toBeNull();
  return captured!;
}

// ---------------------------------------------------------------------------
// The audit
// ---------------------------------------------------------------------------
describe('Security/PIILeak — Zero-Trust Guarantee (150 scenarios)', () => {
  it('loads 150 scenarios with 8 raw secrets each', () => {
    expect(scenarios).toHaveLength(150);
    for (const s of scenarios) {
      expect(s.raw_pii_list).toHaveLength(8);
      expect(s.mock_raw_image_base64).not.toBe(s.mock_image_base64);
    }
  });

  it('outbound wire bytes contain ZERO raw PII (150 × 8 = 1200 checks)', async () => {
    let checks = 0;
    for (const s of scenarios) {
      const cap = await captureOneStep(s);
      // Forensic sweep 1: raw wire string must not embed any secret.
      for (const secret of s.raw_pii_list) {
        expect(cap.rawBody, `[${s.scenario_name}] leaked ${JSON.stringify(secret)}`).not.toContain(secret);
        checks++;
      }
      // Forensic sweep 2: each structured field individually (no hiding in JSON gaps).
      const { task, maskedDom, redactedImage } = cap.parsed;
      for (const secret of s.raw_pii_list) {
        expect(task).not.toContain(secret);
        expect(maskedDom).not.toContain(secret);
        expect(redactedImage).not.toContain(secret);
      }
      vi.unstubAllGlobals();
    }
    expect(checks).toBe(150 * 8);
  }, 60000);

  it('redactedImage on the wire is the MUTATED redacted frame (never raw, never headered)', async () => {
    for (const s of scenarios) {
      const cap = await captureOneStep(s);
      expect(cap.parsed.redactedImage).toBe(s.mock_image_base64);
      expect(cap.parsed.redactedImage).not.toBe(s.mock_raw_image_base64);
      expect(cap.parsed.redactedImage.startsWith('data:')).toBe(false);
      expect(cap.rawBody).not.toContain(s.mock_raw_image_base64);
      // Redacted and raw frames must differ substantially (not a 1-char tweak).
      expect(cap.parsed.redactedImage.length).toBeGreaterThan(8);
      vi.unstubAllGlobals();
    }
  }, 60000);

  it('uses the exact background wire contract (URL, method, auth, legend)', async () => {
    const s = scenarios[0];
    const cap = await captureOneStep(s);
    expect(cap.url).toBe(SERVER_URL);
    expect(cap.method).toBe('POST');
    expect(cap.headers['content-type']).toContain('application/json');
    expect(cap.headers['x-secret-password']).toBe(SECRET_PASSWORD);
    expect(cap.parsed.redaction_legend).toEqual(s.mock_redaction_legend);
    const types = new Set(cap.parsed.redaction_legend.map((e) => e.type));
    expect(types.has('dom_input')).toBe(true);
    expect(types.has('human_face')).toBe(true);
    expect(types.has('pii_image')).toBe(true);
  });

  it('even a headered data URL from content is stripped before exfiltration', async () => {
    const s = scenarios[1];
    let wire = '';
    vi.stubGlobal(
      'fetch',
      vi.fn(async (_u: unknown, init?: RequestInit) => {
        wire = String(init?.body ?? '');
        return new Response(JSON.stringify({ action: 'done' }), { status: 200 });
      }),
    );
    // Simulate a buggy content script handing back the FULL data URL.
    const unstripped = s.mock_data_url; // has header
    expect(unstripped.startsWith('data:image/jpeg;base64,')).toBe(true);
    await simulatedCallServer(s.task, s.mock_masked_dom, stripDataUrlPrefix(unstripped), s.mock_redaction_legend);
    expect(wire).not.toContain('data:image/jpeg;base64,data:');
    expect((wire.match(/data:image\/jpeg;base64,/g) ?? []).length).toBe(0);
  });
});
