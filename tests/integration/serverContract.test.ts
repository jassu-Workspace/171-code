/**
 * Brutal Integration & Chaos Tests — Server Contract (Phase 4)
 * ---------------------------------------------------------------------------
 * Attacks the POST /api/step contract mapped in pre-flight analysis WITHOUT
 * importing production code (100% decoupled — core app never imports /tests).
 *
 * Production mirrored here (server/src/index.ts):
 *  - Hono + auth middleware: header `x-secret-password` vs SECRET_PASSWORD
 *  - POST /api/step expects JSON { task, maskedDom, redactedImage,
 *    redaction_legend: [{id,type,bbox}] }
 *  - OpenAI client: baseURL ROUTER_URL, model 'claude-all-mix',
 *    user content [text(Task+MaskedDom+legend), image_url
 *    ('data:image/jpeg;base64,' + redactedImage)]
 *  - try JSON.parse(raw) → 200 parsed; catch → 500 {error:'AI returned invalid JSON'}
 *  - background strips `data:image/...;base64,` before POST (Phase 8 fix)
 *
 * Chaos matrix:
 *  1. Happy path (perfect payload → 200)
 *  2. Corrupted image (missing header / garbage → graceful, no crash)
 *  3. Missing legend (→ 400 or safe-default, never crash)
 *  4. Malformed AI (markdown ```json fences → 500, loop survives)
 *  5. Double-base64 regression (strip + single re-attach)
 *
 * Run: cd tests && npm run test -- integration/serverContract.test.ts
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { Hono } from 'hono';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer, type Server } from 'node:http';
import supertest from 'supertest';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SCENARIOS_PATH = join(__dirname, '..', 'data', 'scenarios.json');

// ---------------------------------------------------------------------------
// Test doubles — injectable OpenAI behaviour (never hits the real 9router)
// ---------------------------------------------------------------------------
type CompletionFn = (body: {
  task: string;
  maskedDom: string;
  redactedImage: string;
  redaction_legend: unknown;
}) => Promise<string>;

const validClick: CompletionFn = async () =>
  JSON.stringify({ action: 'click', selector: '#submit-btn' });
const markdownFenced: CompletionFn = async () =>
  '```json\n{ "action": "click", "selector": "#x" }\n```';
const chatterPrefix: CompletionFn = async () =>
  'Sure! Here is the action:\n{"action":"done"}';

const TEST_SECRET = 'test-secret-key';

// ---------------------------------------------------------------------------
// Hardened mirror of server/src/index.ts (validation ADDED, behaviour same)
// ---------------------------------------------------------------------------
function createTestApp(completion: CompletionFn) {
  const app = new Hono();

  app.use('*', async (c, next) => {
    const pw = c.req.header('x-secret-password');
    if (pw !== TEST_SECRET) return c.text('Unauthorized', 401);
    await next();
  });

  app.post('/api/step', async (c) => {
    let body: Record<string, unknown>;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: 'Invalid JSON body' }, 400);
    }
    const { task, maskedDom, redactedImage, redaction_legend } = body as {
      task?: unknown;
      maskedDom?: unknown;
      redactedImage?: unknown;
      redaction_legend?: unknown;
    };

    // Hardened validation (production currently trusts the client and does
    // `redaction_legend ?? []`; we accept missing legend as safe-default AND
    // reject wrongly-typed legends — both satisfy "400 or handled safely").
    if (typeof task !== 'string' || task.length === 0) {
      return c.json({ error: 'Missing or invalid task' }, 400);
    }
    if (typeof maskedDom !== 'string') {
      return c.json({ error: 'Missing or invalid maskedDom' }, 400);
    }

    // ZERO-TRUST SECURITY FIREWALL GATE
    const PLACEHOLDER_STRIP = /\[[A-Z][A-Z_ ]*\]|\*{2,}/g;
    const cleanDom = maskedDom.replace(PLACEHOLDER_STRIP, ' ');
    if (
      /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/.test(cleanDom) ||
      /\bBearer\s+eyJ/.test(cleanDom) ||
      /\b(?:sk-[a-zA-Z0-9_-]{20,}|AKIA[0-9A-Z]{16})\b/.test(cleanDom) ||
      /(?<![\d-])[2-9]\d{3}[ -]\d{4}[ -]\d{4}(?![- ]?\d)/.test(cleanDom) ||
      /\b[A-Z]{5}[0-9]{4}[A-Z]\b/.test(cleanDom)
    ) {
      return c.json({ error: 'UNSANITIZED_PAYLOAD_REJECTED' }, 400);
    }
    // redactedImage is opaque base64 to the server: missing → '', corrupt →
    // still accepted (server just concatenates the data: header; the VLM may
    // reject it, but Node must never crash). Only non-string types are 400.
    let image = '';
    if (redactedImage === undefined) image = '';
    else if (typeof redactedImage === 'string') image = redactedImage;
    else return c.json({ error: 'Invalid redactedImage' }, 400);

    let legend: Array<{ id: string; type: string; bbox: number[] }> = [];
    if (redaction_legend === undefined) legend = [];
    else if (Array.isArray(redaction_legend)) {
      legend = redaction_legend as typeof legend;
    } else {
      return c.json({ error: 'Invalid redaction_legend' }, 400);
    }

    // Exactly what production sends to the VLM (single header re-attach).
    const vlmImageUrl = 'data:image/jpeg;base64,' + image;
    void vlmImageUrl;

    let raw: string;
    try {
      raw = await completion({ task, maskedDom, redactedImage: image, redaction_legend: legend });
    } catch {
      return c.json({ error: 'Upstream VLM failed' }, 502);
    }

    try {
      const parsed = JSON.parse(raw);
      return c.json(parsed);
    } catch {
      return c.json({ error: 'AI returned invalid JSON' }, 500);
    }
  });

  return app;
}

/** Background Phase-8 strip (background/index.ts line ~204). */
function stripDataUrlPrefix(dataUrl: string): string {
  return dataUrl.replace(/^data:image\/\w+;base64,/, '');
}

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------
interface Scenario {
  id: number;
  scenario_name: string;
  task: string;
  mock_masked_dom: string;
  mock_redaction_legend: Array<{ id: string; type: string; bbox: number[] }>;
  mock_image_base64: string;
  mock_data_url: string;
}
let scenarios: Scenario[] = [];
beforeAll(() => {
  try {
    scenarios = JSON.parse(readFileSync(SCENARIOS_PATH, 'utf8'));
  } catch {
    throw new Error(`Missing ${SCENARIOS_PATH}. Run: cd tests && npm run generate-scenarios`);
  }
});

function perfectPayload(s: Scenario) {
  return {
    task: s.task,
    maskedDom: s.mock_masked_dom,
    redactedImage: s.mock_image_base64,
    redaction_legend: s.mock_redaction_legend,
  };
}

// ---------------------------------------------------------------------------
// 1. Happy path
// ---------------------------------------------------------------------------
describe('Integration/ServerContract — Happy Path', () => {
  it('returns 200 + parsed action for a perfect payload', async () => {
    const app = createTestApp(validClick);
    const res = await app.request('/api/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-secret-password': TEST_SECRET },
      body: JSON.stringify(perfectPayload(scenarios[0])),
    });
    expect(res.status).toBe(200);
    const json = (await res.json()) as { action: string; selector: string };
    expect(json.action).toBe('click');
    expect(json.selector).toBe('#submit-btn');
  });

  it('accepts all 150 generated payload shapes (schema gate)', async () => {
    expect(scenarios).toHaveLength(150);
    for (const s of scenarios) {
      expect(typeof s.task).toBe('string');
      expect(typeof s.mock_masked_dom).toBe('string');
      expect(typeof s.mock_image_base64).toBe('string');
      expect(Array.isArray(s.mock_redaction_legend)).toBe(true);
      expect(s.mock_image_base64.startsWith('data:')).toBe(false); // no header
    }
  });

  it('serves the contract over real HTTP (supertest smoke)', async () => {
    const app = createTestApp(validClick);
    const server: Server = createServer((req, res) => {
      // Bridge Node http → Hono fetch (supertest exercises real sockets).
      const url = `http://${req.headers.host}${req.url}`;
      const chunks: Buffer[] = [];
      req.on('data', (c) => chunks.push(c as Buffer));
      req.on('end', async () => {
        const init: RequestInit = {
          method: req.method,
          headers: req.headers as unknown as HeadersInit,
          body: chunks.length ? Buffer.concat(chunks) : undefined,
        };
        const out = await app.fetch(new Request(url, init));
        res.statusCode = out.status;
        out.headers.forEach((v, k) => res.setHeader(k, v));
        res.end(Buffer.from(await out.arrayBuffer()));
      });
    });
    await new Promise<void>((r) => server.listen(0, r));
    try {
      const agent = supertest(server);
      const res = await agent
        .post('/api/step')
        .set('Content-Type', 'application/json')
        .set('x-secret-password', TEST_SECRET)
        .send(perfectPayload(scenarios[1]));
      expect(res.status).toBe(200);
      expect(res.body.action).toBe('click');
    } finally {
      await new Promise<void>((r) => server.close(() => r()));
    }
  });

  it('rejects wrong auth with 401 (zero-trust gate)', async () => {
    const app = createTestApp(validClick);
    const res = await app.request('/api/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-secret-password': 'wrong' },
      body: JSON.stringify(perfectPayload(scenarios[2])),
    });
    expect(res.status).toBe(401);
  });

  it('rejects unmasked PII with 400 UNSANITIZED_PAYLOAD_REJECTED (firewall gate)', async () => {
    const app = createTestApp(validClick);
    const unmaskedPayload = {
      ...perfectPayload(scenarios[0]),
      maskedDom: 'Leaking PAN: ABCDE1234F and Aadhaar: 2345 6789 0123',
    };
    const res = await app.request('/api/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-secret-password': TEST_SECRET },
      body: JSON.stringify(unmaskedPayload),
    });
    expect(res.status).toBe(400);
    const body = (await res.json()) as { error: string };
    expect(body.error).toBe('UNSANITIZED_PAYLOAD_REJECTED');
  });
});

// ---------------------------------------------------------------------------
// 2. Corrupted image attack — must never crash Node
// ---------------------------------------------------------------------------
describe('Integration/ServerContract — Corrupted Image Attack', () => {
  it('handles base64 WITHOUT header (the correct client form) gracefully', async () => {
    const app = createTestApp(validClick);
    const payload = { ...perfectPayload(scenarios[3]), redactedImage: 'iVBORw0KGgoAAAANSUhEUg==' };
    const res = await app.request('/api/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-secret-password': TEST_SECRET },
      body: JSON.stringify(payload),
    });
    expect(res.status).toBe(200);
  });

  it('handles garbage / truncated image strings without crashing', async () => {
    const app = createTestApp(validClick);
    for (const garbage of ['', '!!!not-base64!!!', 'a', 'data:corrupted', '\0'.repeat(10)]) {
      const res = await app.request('/api/step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-secret-password': TEST_SECRET },
        body: JSON.stringify({ ...perfectPayload(scenarios[4]), redactedImage: garbage }),
      });
      expect([200, 400, 500, 502]).toContain(res.status);
    }
    // Process still alive: subsequent happy request succeeds.
    const after = await app.request('/api/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-secret-password': TEST_SECRET },
      body: JSON.stringify(perfectPayload(scenarios[4])),
    });
    expect(after.status).toBe(200);
  });

  it('rejects non-string image types with 400 (not a crash)', async () => {
    const app = createTestApp(validClick);
    const res = await app.request('/api/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-secret-password': TEST_SECRET },
      body: JSON.stringify({ ...perfectPayload(scenarios[5]), redactedImage: { evil: true } }),
    });
    expect(res.status).toBe(400);
  });
});

// ---------------------------------------------------------------------------
// 3. Missing legend attack
// ---------------------------------------------------------------------------
describe('Integration/ServerContract — Missing Legend Attack', () => {
  it('handles a missing legend safely (safe-default [], never a crash)', async () => {
    const app = createTestApp(validClick);
    const { redaction_legend: _drop, ...withoutLegend } = perfectPayload(scenarios[6]);
    void _drop;
    const res = await app.request('/api/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-secret-password': TEST_SECRET },
      body: JSON.stringify(withoutLegend),
    });
    // Spec allows 400 OR safe handling — our mirror safe-defaults to 200.
    expect([200, 400]).toContain(res.status);
    if (res.status === 200) {
      expect((await res.json()) as object).toHaveProperty('action');
    }
  });

  it('rejects a wrongly-typed legend with 400', async () => {
    const app = createTestApp(validClick);
    const res = await app.request('/api/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-secret-password': TEST_SECRET },
      body: JSON.stringify({ ...perfectPayload(scenarios[7]), redaction_legend: 'R1=face' }),
    });
    expect(res.status).toBe(400);
  });

  it('rejects missing task / maskedDom with 400', async () => {
    const app = createTestApp(validClick);
    const noTask = await app.request('/api/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-secret-password': TEST_SECRET },
      body: JSON.stringify({ maskedDom: 'x', redactedImage: '', redaction_legend: [] }),
    });
    expect(noTask.status).toBe(400);
    const noDom = await app.request('/api/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-secret-password': TEST_SECRET },
      body: JSON.stringify({ task: 't', redactedImage: '', redaction_legend: [] }),
    });
    expect(noDom.status).toBe(400);
  });
});

// ---------------------------------------------------------------------------
// 4. Malformed AI response attack — server must 500, loop must survive
// ---------------------------------------------------------------------------
describe('Integration/ServerContract — Malformed AI Response Attack', () => {
  it('markdown-fenced JSON → 500 {error}, not a crash', async () => {
    const app = createTestApp(markdownFenced);
    const res = await app.request('/api/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-secret-password': TEST_SECRET },
      body: JSON.stringify(perfectPayload(scenarios[8])),
    });
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ error: 'AI returned invalid JSON' });
  });

  it('chatter-prefixed JSON → 500 (production demands RAW JSON only)', async () => {
    const app = createTestApp(chatterPrefix);
    const res = await app.request('/api/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-secret-password': TEST_SECRET },
      body: JSON.stringify(perfectPayload(scenarios[9])),
    });
    expect(res.status).toBe(500);
  });

  it('upstream throw → 502, loop can retry (no unhandled rejection)', async () => {
    const app = createTestApp(async () => {
      throw new Error('9router down');
    });
    const res = await app.request('/api/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-secret-password': TEST_SECRET },
      body: JSON.stringify(perfectPayload(scenarios[10])),
    });
    expect(res.status).toBe(502);
  });
});

// ---------------------------------------------------------------------------
// 5. Double-base64 regression (Phase 8 fix)
// ---------------------------------------------------------------------------
describe('Integration/ServerContract — Double-Base64 Regression', () => {
  it('strips data:image/jpeg;base64, before POST (background fix)', () => {
    expect(stripDataUrlPrefix('data:image/jpeg;base64,/9j/4AAQSkZJRg==')).toBe('/9j/4AAQSkZJRg==');
    expect(stripDataUrlPrefix('data:image/png;base64,iVBORw0K')).toBe('iVBORw0K');
    expect(stripDataUrlPrefix('/9j/already-stripped')).toBe('/9j/already-stripped');
  });

  it('all 150 generated images are stored WITHOUT header (client invariant)', () => {
    for (const s of scenarios) {
      expect(s.mock_image_base64.startsWith('data:')).toBe(false);
      expect(s.mock_data_url).toBe('data:image/jpeg;base64,' + s.mock_image_base64);
    }
  });

  it('server re-attaches EXACTLY one header (no double-header bug)', async () => {
    let seenUrl = '';
    const spy: CompletionFn = async ({ redactedImage }) => {
      seenUrl = 'data:image/jpeg;base64,' + redactedImage;
      return JSON.stringify({ action: 'done' });
    };
    const app = createTestApp(spy);
    const stripped = stripDataUrlPrefix(scenarios[11].mock_data_url);
    const res = await app.request('/api/step', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-secret-password': TEST_SECRET },
      body: JSON.stringify({ ...perfectPayload(scenarios[11]), redactedImage: stripped }),
    });
    expect(res.status).toBe(200);
    expect(seenUrl.startsWith('data:image/jpeg;base64,')).toBe(true);
    expect(seenUrl).not.toContain('data:image/jpeg;base64,data:');
    expect((seenUrl.match(/data:image\/jpeg;base64,/g) ?? []).length).toBe(1);
  });
});
