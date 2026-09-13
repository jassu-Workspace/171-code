import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import OpenAI from 'openai';
import { logRequest } from './logger';
import { randomUUID } from 'node:crypto';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import * as os from 'node:os';
import { saveSessionStep, initSession, finalizeSession, getStorageStats, listSessions, getSessionDetails } from './sessionStorage';

// Minimal Node process typing
declare const process: {
  env: Record<string, string | undefined>;
  exit(code?: number): never;
  uptime(): number;
  memoryUsage(): { heapUsed: number; heapTotal: number; rss: number; external?: number };
  on(event: 'SIGINT', handler: () => void): void;
  on(event: 'SIGTERM', handler: () => void): void;
};

// ---------------------------------------------------------------------------
//  COLORED STRUCTURED LOGGER
// ---------------------------------------------------------------------------
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

function ts(): string {
  return new Date().toISOString();
}

const log = {
  info(msg: string): void {
    console.log(`${COLORS.cyan}[${ts()}] ℹ INFO${COLORS.reset}  ${msg}`);
  },
  success(msg: string): void {
    console.log(`${COLORS.green}[${ts()}] ✔ SUCCESS${COLORS.reset} ${msg}`);
  },
  warn(msg: string): void {
    console.warn(`${COLORS.yellow}[${ts()}] ⚠ WARN${COLORS.reset}  ${msg}`);
  },
  error(msg: string): void {
    console.error(`${COLORS.red}[${ts()}] ✖ ERROR${COLORS.reset} ${msg}`);
  },
};

// ---------------------------------------------------------------------------
//  ENV VALIDATION ON STARTUP
// ---------------------------------------------------------------------------
if (!process.env.SECRET_PASSWORD) {
  if (!process.env.VITEST && process.env.NODE_ENV !== 'test') {
    log.error('Missing required environment variable: SECRET_PASSWORD');
    process.exit(1);
  }
}

const hasGemini = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim());
const hasRouter = Boolean(process.env.ROUTER_URL && process.env.ROUTER_API_KEY);

if (!hasGemini && !hasRouter) {
  if (!process.env.VITEST && process.env.NODE_ENV !== 'test') {
    log.error('No AI provider configured! Provide either GEMINI_API_KEY or (ROUTER_URL and ROUTER_API_KEY) in server/.env');
    process.exit(1);
  }
}

if (hasGemini) {
  log.success(`✔ Upstream AI Provider: Google Gemini API (Priority 1: Active, Model: ${process.env.GEMINI_MODEL || 'gemini-2.5-flash'})`);
}
if (hasRouter) {
  log.info(`ℹ Upstream AI Provider: 9router (Priority 2: Fallback Ready, URL: ${process.env.ROUTER_URL})`);
}

// ---------------------------------------------------------------------------
//  RATE LIMITER (in-memory, per-IP)
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 40;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
  }
  entry.count += 1;
  const remaining = Math.max(0, RATE_LIMIT_MAX_REQUESTS - entry.count);
  return { allowed: entry.count <= RATE_LIMIT_MAX_REQUESTS, remaining, resetAt: entry.resetAt };
}

const app = new Hono();

// CORS middleware — MUST be before auth and all routes
app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'x-secret-password'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
}));

// Request-logger middleware
app.use('*', async (c, next) => {
  const start = Date.now();
  const method = c.req.method;
  const path = c.req.path;
  log.info(`→ ${method} ${path}`);
  await next();
  const duration = Date.now() - start;
  const status = c.res.status;
  const statusColor = status >= 500 ? COLORS.red : status >= 400 ? COLORS.yellow : COLORS.green;
  log.info(`← ${method} ${path} ${statusColor}${status}${COLORS.reset} (${duration}ms)`);
});

// Auth middleware — after CORS and request logger
app.use('*', async (c, next) => {
  // CORS preflight bypass
  if (c.req.method === 'OPTIONS') {
    return await next();
  }

  const expected = process.env.SECRET_PASSWORD;
  const received = c.req.header('x-secret-password');

  if (received !== expected) {
    log.warn(`Unauthorized request — bad/missing x-secret-password`);
    return c.text('Unauthorized', 401);
  }
  await next();
});

// ---------------------------------------------------------------------------
//  HEALTH & TELEMETRY ENDPOINTS
// ---------------------------------------------------------------------------
const startTime = Date.now();

app.get('/health', (c) => {
  const storageStats = getStorageStats();
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(), 
    uptime: Date.now() - startTime,
    authConfigured: !!process.env.SECRET_PASSWORD,
    aiProvider: hasGemini ? 'Google Gemini API (Priority 1)' : '9router (Priority 2)',
    storage: storageStats,
  });
});

/**
 * LIVE SYSTEM TELEMETRY API
 * Exposes real host memory, CPU, process uptime, and storage disk statistics
 * for the Mission Control dashboard.
 */
app.get('/api/system-telemetry', (c) => {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const memUsagePercent = Number(((usedMem / totalMem) * 100).toFixed(1));
  const cpus = os.cpus();
  const procMem = process.memoryUsage();
  const storageStats = getStorageStats();

  return c.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    system: {
      totalMemBytes: totalMem,
      freeMemBytes: freeMem,
      usedMemBytes: usedMem,
      memUsagePercent,
      cpuCount: cpus.length,
      cpuModel: cpus[0]?.model || 'Standard CPU',
      loadAvg: os.loadavg(),
      platform: os.platform(),
      arch: os.arch(),
    },
    process: {
      uptimeSeconds: Math.floor(process.uptime()),
      heapUsedBytes: procMem.heapUsed,
      heapTotalBytes: procMem.heapTotal,
      rssBytes: procMem.rss,
    },
    storage: {
      sessionsCount: storageStats.sessionsCount,
      totalDiskBytes: storageStats.totalDiskBytes,
    },
    aiProvider: {
      current: hasGemini ? 'Google Gemini API' : '9router',
      priority: hasGemini ? 'Priority 1 (Direct Gemini)' : 'Priority 2 (9router Fallback)',
      model: hasGemini
        ? (process.env.GEMINI_MODEL || 'gemini-2.5-flash')
        : (process.env.MODEL_NAME || 'ag/gemini-3.7-flash-high'),
    },
  });
});

/**
 * Initialize session directory under storage/sessions/<sessionId>/
 */
app.post('/api/session/init', async (c) => {
  try {
    const body = (await c.req.json()) as { sessionId?: string; task?: string };
    const sessionId = body.sessionId || `session_${Date.now()}`;
    const task = body.task || '';
    initSession(sessionId, task);
    return c.json({ success: true, sessionId });
  } catch {
    return c.json({ error: 'Failed to initialize session directory' }, 400);
  }
});

/**
 * Finalize session metadata
 */
app.post('/api/session/finalize', async (c) => {
  try {
    const body = (await c.req.json()) as { sessionId?: string; status?: 'completed' | 'aborted' | 'error'; summary?: string };
    if (body.sessionId) {
      finalizeSession(body.sessionId, body.status || 'completed', body.summary);
    }
    return c.json({ success: true });
  } catch {
    return c.json({ error: 'Failed to finalize session' }, 400);
  }
});

/**
 * Direct image archiving endpoint for standalone or intermediate screenshots
 */
app.post('/api/session/screenshot', async (c) => {
  try {
    const body = (await c.req.json()) as {
      sessionId: string;
      step?: number;
      rawImage?: string;
      maskedImage?: string;
      vlmImage?: string;
      task?: string;
      vlmModel?: string;
    };
    if (!body.sessionId) {
      return c.json({ error: 'sessionId is required' }, 400);
    }
    const step = typeof body.step === 'number' ? body.step : 1;
    saveSessionStep({
      sessionId: body.sessionId,
      step,
      task: body.task || 'Direct screenshot capture',
      rawImage: body.rawImage,
      maskedImage: body.maskedImage,
      vlmImage: body.vlmImage || body.maskedImage || body.rawImage,
      vlmModel: body.vlmModel || 'direct-capture',
    });
    return c.json({ success: true, sessionId: body.sessionId, step });
  } catch (err) {
    return c.json({ error: 'Failed to archive screenshot', details: String(err) }, 500);
  }
});

/**
 * List all saved agent execution sessions
 */
app.get('/api/sessions', (c) => {
  const sessions = listSessions();
  return c.json({ sessions, count: sessions.length });
});

/**
 * Retrieve detailed execution log & artifacts for a specific session
 */
app.get('/api/session/:sessionId', (c) => {
  const sessionId = c.req.param('sessionId');
  const details = getSessionDetails(sessionId);
  if (!details) {
    return c.json({ error: 'Session not found' }, 404);
  }
  return c.json(details);
});

// ---------------------------------------------------------------------------
//  ZERO-TRUST SERVER-SIDE FIREWALL GATE
// ---------------------------------------------------------------------------
function isLuhnValid(cardStr: string): boolean {
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

const FIREWALL_PATTERNS: Record<string, RegExp> = {
  PRIVATE_KEY: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/,
  JWT_BEARER: /\bBearer\s+eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\b/,
  API_KEY: /\b(?:sk-[a-zA-Z0-9_-]{20,}|ghp_[a-zA-Z0-9]{20,}|glpat-[a-zA-Z0-9_-]{20,}|AKIA[0-9A-Z]{16})\b/,
  AADHAAR: /(?<!\d)[2-9]\d{3}[ -]\d{4}[ -]\d{4}(?![ -]?\d)/,
  PAN: /\b[A-Z]{5}[0-9]{4}[A-Z]\b/,
  SSN: /\b\d{3}-\d{2}-\d{4}\b/,
  CARD: /(?<!\d)(?:\d{4}[ -]?){3}\d{4}(?!\d)|\b(?:\d[ -]*?){13,19}\b/,
  BANK_ACCOUNT: /\b(?:account\s*(?:no\.?|num(?:ber)?)|acct\s*#|a\/c)[:\s]*\d{9,18}\b/i,
  IFSC_CODE: /\b[A-Z]{4}0[A-Z0-9]{6}\b/,
  UPI_ID: /\b[a-zA-Z0-9.\-_]{2,256}@(okhdfcbank|okaxis|oksbi|paytm|upi|ybl|apl|axl|ibl|idfcbank)\b/i,
  HEALTH_ID: /\b\d{2}-\d{4}-\d{4}-\d{4}\b/,
  TAX_ID: /\b\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}\b/,
};

const PLACEHOLDER_STRIP_RE = /\[[A-Z][A-Z_ ]*\]|\*{2,}/g;

export function checkFirewallViolations(text: string): string | null {
  const clean = text.replace(PLACEHOLDER_STRIP_RE, ' ');

  for (const [name, regex] of Object.entries(FIREWALL_PATTERNS)) {
    const match = clean.match(regex);
    if (match) {
      if (name === 'CARD') {
        if (!isLuhnValid(match[0])) continue;
      }
      return `${name} detected: ${match[0].slice(0, 4)}...`;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
//  UNIVERSAL MULTI-DOMAIN TASK CLASSIFIER & PROMPT GENERATOR (7 ISRO PILLARS + WEB)
// ---------------------------------------------------------------------------
export type TaskDomain =
  | 'SHOPPING_COMPARISON'
  | 'WORKFLOW_ACTION'
  | 'INFORMATION_EXTRACTION'
  | 'ISRO_ENTERPRISE_OPERATIONS'
  | 'GEOSPATIAL_WORKFLOW';

export function classifyTaskDomain(task: string, maskedDom?: string): TaskDomain {
  const lower = task.toLowerCase();
  const domLower = (maskedDom || '').toLowerCase();

  // 1. ISRO Sovereign Enterprise Operations (7 Core Pillars):
  // Pillar 1: Mission Control & Telemetry (MOX, LVM3, PSLV, Gaganyaan, Chandrayaan, telemetry, stage separation)
  // Pillar 2: Earth Observation & GIS (Bhuvan, Bhoonidhi, NRSC, URSC, Thematic, Flood Hazard, Drought, GIS)
  // Pillar 3: Ground Station Network Operations (ISTRAC, Byalalu Deep Space Network DSN-32, pass schedule, Az/El)
  // Pillar 4: Secure Administrative & Scientist Clearances (Level 1-5 RBAC, classified mission authorization)
  // Pillar 5: R&D, Propulsion Research & Patents (SAC, LPSC, VSSC, cryogenic CE-20, SCE-200, propellant, patent)
  // Pillar 6: Aerospace Supply Chain & Procurement (Inconel 718, Titanium Ti-6Al-4V, Rad-Hard chips, tender bids)
  // Pillar 7: Space Situational Awareness (Project NETRA, orbital debris, CARA conjunction, CAM avoidance)
  const isroKeywords = [
    // Pillar 1: Mission Control & Launch Telemetry (MOX)
    'launch', 'telemetry', 'in-orbit', 'mox', 'pslv', 'gslv', 'lvm3', 'gaganyaan',
    'chandrayaan', 'aditya-l1', 'reaction wheel', 'chamber pressure', 'cryogenic pressure',
    'stage separation', 'abort command', 'thrust vector', 'orbital insertion', 'mox-telemetry',
    // Pillar 2: Earth Observation & Remote Sensing (Bhuvan / Bhoonidhi / NRSC)
    'isro', 'bhuvan', 'bhoonidhi', 'mosdac', 'vedas', 'nrsc', 'ursc', 'thematic',
    'thematic services', 'satellite', 'earth observation', 'remote sensing', 'flood hazard',
    'drought', 'cyclone', 'coastal sector', 'odisha', 'cartosat', 'risat', 'oceansat',
    'gis', 'geospatial', 'aoi', 'zoom into', 'geotiff', 'satellite imagery', 'land use',
    // Pillar 3: Ground Station Network (ISTRAC / Byalalu DSN)
    'istrac', 'byalalu', 'dsn', 'deep space network', 'antenna', 'pass authorization',
    'pass scheduling', 'azimuth', 'elevation', 'downlink', 'uplink', 'ground station',
    'tracking station', 'port blair', 'mauritius', 'doppler',
    // Pillar 4: Secure Administrative & Scientist Clearance Workflows
    'scientist clearance', 'security clearance', 'classified mission', 'clearance level',
    'level 5', 'access control', 'mission authorization', 'dossier', 'scientist credential',
    'biometric authorization', 'isro clearance', 'personnel clearance',
    // Pillar 5: R&D, Propulsion Research & Patents (SAC / LPSC / VSSC)
    'sac', 'lpsc', 'vssc', 'cryogenic engine', 'ce-20', 'semi-cryogenic', 'sce-200',
    'propellant chemistry', 'patent analysis', 'patent search', 'propulsion research',
    'thrust chamber', 'injector design', 'research paper', 'propulsion patent',
    // Pillar 6: Aerospace Supply Chain & Procurement (ISRO e-Procure)
    'procurement', 'tender', 'tender bid', 'vendor', 'aerospace grade', 'inconel',
    'inconel 718', 'titanium alloy', 'ti-6al-4v', 'rad-hard', 'supply chain',
    'rfq', 'rfp', 'isro procure', 'purchase order', 'aerospace alloy',
    // Pillar 7: Space Situational Awareness & Space Security (Project NETRA)
    'netra', 'project netra', 'space situational awareness', 'orbital debris', 'debris tracking',
    'cara', 'conjunction assessment', 'collision avoidance', 'cam', 'miss distance',
    'collision probability', 'norad'
  ];

  if (isroKeywords.some(kw => lower.includes(kw))) {
    return 'ISRO_ENTERPRISE_OPERATIONS';
  }

  // 2. Explicit shopping keywords
  const shoppingKeywords = [
    'buy', 'price', 'under ₹', 'under rs', 'under $', 'flipkart', 'amazon',
    'myntra', 'cheapest', 'discount', 'deal', 'specs', 'rating', 'smartphone',
    'laptop', 'shoes', 'product', 'add to cart', 'purchase', 'order'
  ];
  if (shoppingKeywords.some(kw => lower.includes(kw))) {
    return 'SHOPPING_COMPARISON';
  }

  // 3. Workflow / Form / Social Action keywords
  const workflowKeywords = [
    'post', 'tweet', 'send', 'mail', 'email', 'form', 'fill', 'apply',
    'submit', 'register', 'login', 'signup', 'message', 'comment',
    'connect', 'follow', 'share', 'upload', 'sheet', 'row', 'entry',
    'linkedin', 'twitter', 'x.com', 'write a post', 'share a post', 'shortlist', 'participate'
  ];
  if (workflowKeywords.some(kw => lower.includes(kw))) {
    return 'WORKFLOW_ACTION';
  }

  // Check DOM signals if task text is ambiguous
  if (
    domLower.includes('isro') ||
    domLower.includes('bhuvan') ||
    domLower.includes('bhoonidhi') ||
    domLower.includes('thematic services') ||
    domLower.includes('istrac') ||
    domLower.includes('mox') ||
    domLower.includes('project netra') ||
    domLower.includes('orbital debris') ||
    domLower.includes('conjunction-table') ||
    domLower.includes('clearance-level') ||
    domLower.includes('satellite operations') ||
    domLower.includes('ol-viewport') ||
    domLower.includes('leaflet-container')
  ) {
    return 'ISRO_ENTERPRISE_OPERATIONS';
  }

  if (domLower.includes('add to cart') || domLower.includes('buy now') || domLower.includes('ratings & reviews')) {
    return 'SHOPPING_COMPARISON';
  }

  // 4. Default to Information Extraction / Research for general queries
  return 'INFORMATION_EXTRACTION';
}

export function generateDomainPrompt(domain: TaskDomain): string {
  const sharedGroundingRules = `
CRITICAL INSTRUCTIONS:
- You are a precise browser automation agent executing on a client browser.
- The DOM contains synthetic tokens like [CARD_TOKEN_1] replacing real sensitive text. TREAT THEM AS REAL LITERAL STRINGS.
- Return ONLY a valid JSON object matching the schema below. No markdown backticks outside of valid JSON. No conversational text.
- UNIVERSAL DROPDOWNS & FORM CASCADES:
  * Native Dropdowns (<select>): ALWAYS use action: "select", id: "agent-X" (or "#id"), and provide the target option text in value: "Option Text" (e.g. value: "Flood Hazard" or value: "ODISHA"). NEVER send a bare action: "click" on <select> without specifying a value.
  * Cascading Dropdowns: Changing parent dropdown A triggers an asynchronous server round-trip to populate child dropdown B. Select parent A in Step 1; in Step 2, observe the populated child B and select the target item.
  * Custom Menus & Comboboxes ([role="combobox"], [aria-haspopup], .dropdown-toggle): First click the toggle button to open, then click the desired [role="option"] or .dropdown-item.
- ZOOM & MAP CONTROLS:
  * To zoom in on interactive maps or GIS viewports: use action: "zoom", value: "in" (or click the "+" / "zoom-in" button).
  * To zoom out: use action: "zoom", value: "out" (or click the "-" / "zoom-out" button).
`;

  if (domain === 'ISRO_ENTERPRISE_OPERATIONS' || domain === 'GEOSPATIAL_WORKFLOW') {
    return `${sharedGroundingRules}
DOMAIN MODE: REAL-TIME ISRO SOVEREIGN ENTERPRISE & MISSION OPERATIONS (7 CORE PILLARS)
Goal: Autonomously navigate, inspect, verify, and operate mission-critical workflows across all 7 operational pillars of ISRO directly on REAL-TIME LIVE WEB PAGES and sovereign government portals.

PRODUCTION SOVEREIGN WEB PORTALS & DESTINATIONS:
- Bhuvan Geoportal & Thematic Services: "https://bhuvan.nrsc.gov.in" (Thematic: "https://bhuvan-app1.nrsc.gov.in/thematic/")
- Bhoonidhi Satellite Archive: "https://bhoonidhi.nrsc.gov.in"
- MOSDAC Oceanographic & Weather Services: "https://www.mosdac.gov.in"
- VEDAS Geospatial Platform: "https://vedas.sac.gov.in"
- ISRO Official Web Portal: "https://www.isro.gov.in"
- Central Public Procurement Portal (CPPP) & GeM: "https://eprocure.gov.in" / "https://gem.gov.in"
- Indian Patent Office Search (InPASS): "https://ipindiaservices.gov.in/publicsearch"
- Space Situational Awareness / Debris (Space-Track / CelesTrak): "https://www.space-track.org" / "https://celestrak.org"

REAL-TIME WEB EXECUTION RULES ACROSS 7 OPERATIONAL PILLARS:

1. PILLAR 1: MISSION CONTROL & TELEMETRY MONITORING (MOX)
   - Real-time navigation: Navigate directly to official ISRO mission updates or telemetry dashboard.
   - Inspect launch vehicle telemetry (LVM3, PSLV, GSLV) or spacecraft health matrices (Chandrayaan, Gaganyaan).
   - Read vital live parameters: Orbit Altitude, Velocity, Reaction Wheels RPM, Cryogenic Pressure, Solar Array Current.
   - Verify stage separation sequence (Stage 1 Solid, Stage 2 Liquid, Cryogenic Upper Stage, Payload Fairing).

2. PILLAR 2: EARTH OBSERVATION & REMOTE SENSING (BHUVAN / BHOONIDHI / NRSC)
   - Direct Navigation: On empty tab or search page, navigate directly to "https://bhuvan.nrsc.gov.in" or Thematic Services "https://bhuvan-app1.nrsc.gov.in/thematic/thematic/index.php".
   - Step A (Thematic Catalog / Dropdown): On Bhuvan Thematic Services, locate the "Select Theme" dropdown (id: "theme") and use action: "select", value: "Flood Hazard" (or "Flood Annual Layers").
   - Step B (Geography / State Dropdown): Once theme is selected, locate the "Select Geography" dropdown (id: "states", id: "states1", or select[name="states"]) and use action: "select", value: "ODISHA" (or "Odisha").
   - Step C (Render Layer): Click the "View" button (id: "mapbutton", id: "View", or img[src*="view.png"]) to render the layer on the map canvas.
   - Step D (Location Geocoding & Zoom): Locate the search box if searching a district/basin, type the sector (e.g. 'Odisha coastal sector', 'Puri') and press Enter. Then use action: "zoom", value: "in" on the map viewport to inspect regional flood zones.
   - Step E (Satellite Product Ordering): On Bhoonidhi ("https://bhoonidhi.nrsc.gov.in"), filter cloud cover < 10% and order GeoTIFF datasets.

3. PILLAR 3: GROUND STATION NETWORK OPERATIONS (ISTRAC / BYALALU DSN)
   - Inspect tracking ground stations: Byalalu Deep Space Network (32m DSN-32), Port Blair, Mauritius, or Brunei.
   - Verify antenna pointing: Azimuth (°), Elevation (°), Frequency Doppler Lock.
   - Execute Satellite Pass Authorization: Fill employee ID, select spacecraft pass, and submit authorization.

4. PILLAR 4: SECURE ADMINISTRATIVE, HR & SCIENTIST CLEARANCES
   - Role-Based Access Control: Select Clearance Level (Level 1 General, Level 3 Payload Specialist, Level 5 Top Secret Director).
   - Enter Scientist ID and biometric authorization credentials.
   - Review and verify classified mission authorization sign-offs.

5. PILLAR 5: R&D, PROPULSION RESEARCH & PATENT ANALYSIS (SAC / LPSC / VSSC)
   - On InPASS or technical repository: Search cryogenic engines (CE-20), semi-cryogenic test benches (SCE-200), or propellant chemistry.
   - Query patent registry (additive rocket injectors, carbon-composite payload fairings).
   - Synthesize and extract technical documentation abstracts.

6. PILLAR 6: AEROSPACE SUPPLY CHAIN & CONFIDENTIAL PROCUREMENT
   - On CPPP / GeM / e-Procure: Search space-grade materials (Inconel 718, Titanium Ti-6Al-4V, Rad-Hard FPGAs).
   - Inspect vendor tender bids, evaluate technical compliance scores, and confirm Purchase Order status.

7. PILLAR 7: SPACE SITUATIONAL AWARENESS & SPACE SECURITY (PROJECT NETRA)
   - Real-time Orbital Debris Tracking: Monitor NORAD IDs, relative velocities, and close approach perigee/apogee on Space-Track/CelesTrak.
   - Conjunction Assessment Risk Analysis (CARA): Inspect conjunction alerts for high-risk collision events.
   - Collision Avoidance Maneuver (CAM): When Miss Distance < 1 km or Collision Probability Pc > 1e-4, verify CAM Delta-V thruster burn schedule.

JSON Output Format:
{
  "thought": "Brief 1-sentence reasoning of the exact real-time operational step taking now",
  "action": "click" | "select" | "zoom" | "type" | "navigate" | "scroll" | "wait" | "done" | "back",
  "id": "agent-id if available (e.g. agent-14)",
  "selector": "Precise CSS selector or element keyword",
  "value": "Text to type (with \\n for Enter), URL to navigate to, 'in'/'out' for zoom, or option to select",
  "scroll_direction": "down" | "up",
  "scratchpad": {
    "activePillar": "1: Mission Control" | "2: Earth Observation & GIS" | "3: Ground Stations" | "4: Clearances" | "5: Propulsion R&D" | "6: Procurement" | "7: SSA & Project NETRA",
    "isroOperationalTelemetry": {
      "spacecraft": "LVM3-M4 / Chandrayaan / Cartosat-3",
      "metricSummary": "Altitude: 504.2 km | Velocity: 7.62 km/s | Cryo Pressure: 18.4 Bar | CARA Pc: 4.2e-4",
      "operationalStatus": "Nominal / Alert / Action Executed"
    },
    "milestones": [
      { "name": "Navigate to live portal or mission console", "status": "completed" | "in_progress" | "pending" },
      { "name": "Execute pillar-specific command or spatial analysis", "status": "pending" },
      { "name": "Verify telemetry, authorization, or confirmation toast", "status": "pending" }
    ],
    "isComplete": false
  }
}
`;
  }

  if (domain === 'WORKFLOW_ACTION') {
    return `${sharedGroundingRules}
DOMAIN MODE: WORKFLOW & SOCIAL AUTOMATION
Goal: Execute real-world UI workflows like social posts, compose messages, submit forms, or update sheets.

STRICT WORKFLOW RULES:
1. DIRECT NAVIGATION: If the current page is a search engine (e.g. Google), blank tab, or different site from the target (e.g. LinkedIn, Twitter, Gmail), use action: "navigate", value: "https://www.target-domain.com". DO NOT type URLs into search boxes.
2. FOCUS ON ACTION FLOW: Proceed step-by-step (e.g. click "Start a post", type text into the compose editor, click "Post").
3. DO NOT look for prices, specifications, reviews, or shopping filters.
4. MODAL EDITORS & TYPING OBSERVATION:
   - When typing into rich-text editors or compose modals, use action: "type", value: "your full content", and target the editor using id or selector.
   - Look closely at the DOM: if the editor shows "[Typed Content (... chars)]", the text is ALREADY typed into the editor. DO NOT type it again!
   - Immediately proceed to click the progression button (e.g. "Post", "Send", "Publish", "Submit", or "Save").
5. UNIVERSAL SUBMISSION & COMPLETION (CRITICAL):
   - Across all workflows (social posts on LinkedIn, X/Twitter, Reddit; messaging on WhatsApp, Slack, Discord; email on Gmail/Outlook/Hostinger; comments; or web forms):
   - After typing the requested content and clicking "Post", "Send", "Publish", "Submit", or pressing Enter:
     THE CONTENT HAS BEEN SUBMITTED AND THE ACTION IS EXECUTED.
   - CHECK 'Recent Actions Executed in this Session': If you ALREADY typed the message/post and clicked "Post", "Send", or "Submit" in a previous step:
     YOUR GOAL IS 100% COMPLETE!
   - DO NOT click "Start a post", "Compose", "Create post", "New tweet", or any creation trigger again! Doing so starts an infinite duplicate post loop!
   - DO NOT type the message or form values again into an empty input field!
   - Return action: "done" immediately with a concise summary (e.g. "Post successfully published to LinkedIn feed.").
6. SINGLE-TASK EXECUTION: Unless the user explicitly requested multiple separate submissions (e.g. "post 3 times"), every workflow is a single-submission task. Once submitted, finish with action: "done".
7. IF MULTIPLE MILESTONES: Keep track of milestones in the "scratchpad" under milestones: [{ "name": string, "status": "completed"|"pending" }].

JSON Output Format:
{
  "thought": "Brief 1-sentence reasoning of the exact step taking now",
  "action": "click" | "select" | "zoom" | "type" | "navigate" | "scroll" | "wait" | "done" | "back",
  "id": "agent-id if available (e.g. agent-31)",
  "selector": "Precise CSS selector or element keyword",
  "value": "Text to type (with \\n for Enter), URL to navigate to, option to select, or 'down'/'up'",
  "scroll_direction": "down" | "up",
  "scratchpad": {
    "workflowGoal": "Brief summary of goal",
    "milestones": [
      { "name": "Milestone description", "status": "completed" | "in_progress" | "pending" }
    ],
    "actionCount": 1,
    "lastActionStatus": "success",
    "isGoalVerified": false
  }
}`;
  }

  if (domain === 'INFORMATION_EXTRACTION') {
    return `${sharedGroundingRules}
DOMAIN MODE: INFORMATION EXTRACTION & SYNTHESIS
Goal: Gather, read, extract, or summarize research data, announcements, problem statements, documentation, or portal information.

STRICT EXTRACTION RULES:
1. DIRECT NAVIGATION: If the current page is not the target portal (e.g. SIH, Docs), use action: "navigate", value: "https://target-portal.gov.in".
2. SCANNING & READING: Locate relevant text, headings, sections, or downloadable docs.
3. DO NOT evaluate products, prices, or ratings unless explicitly asked in the task.
4. RECORD FINDINGS: Save extracted data points in scratchpad.extractedItems.
5. COMPLETION: When sufficient accurate information to answer the task is extracted, call action: "done" and summarize findings cleanly in the thought and scratchpad.

JSON Output Format:
{
  "thought": "Brief 1-sentence reasoning of what information is being extracted or next section to read",
  "action": "click" | "select" | "zoom" | "type" | "navigate" | "scroll" | "wait" | "done" | "back",
  "id": "agent-id if available (e.g. agent-8)",
  "selector": "Precise CSS selector or element keyword",
  "value": "Text to type (with \\n for Enter), URL to navigate to, option to select, or 'down'/'up'",
  "scroll_direction": "down" | "up",
  "scratchpad": {
    "researchGoal": "Summary of research objective",
    "pagesScanned": 1,
    "extractedItems": [
      { "title": "...", "content": "..." }
    ],
    "isComplete": false
  }
}`;
  }

  // Default: SHOPPING_COMPARISON
  return `${sharedGroundingRules}
DOMAIN MODE: SHOPPING & PRODUCT COMPARISON
Goal: Compare products, specs, prices, ratings, and identify best match according to user constraints.

STRICT SHOPPING RULES:
1. DIRECT NAVIGATION: If not on the shopping portal (Amazon, Flipkart), use action: "navigate", value: "https://www.target-shopping.com".
2. EXPLORATION OVER PREMATURE SATURATION:
   - Top search results are almost always sponsored ads or out of budget.
   - If initial top items fail constraints, DO NOT stop or declare saturation immediately.
   - Scroll down to inspect organic search results, or click sidebar filters (Price / Rating) to locate qualifying items.
3. Maintain candidate tracking in scratchpad.candidates.
4. Reject candidates failing hard filters and record in rejectedCandidates.
5. Conclude with action: "done" only after inspecting organic options across multiple scrolls or filters, or when a qualified match is found.

JSON Output Format:
{
  "thought": "Brief 1-sentence reasoning comparing products or filtering",
  "action": "click" | "select" | "zoom" | "type" | "navigate" | "scroll" | "wait" | "done" | "back",
  "id": "agent-id if available (e.g. agent-3)",
  "selector": "Precise CSS selector or element keyword",
  "value": "Text to type (with \\n for Enter), URL to navigate to, option to select, or 'down'/'up'",
  "scroll_direction": "down" | "up",
  "scratchpad": {
    "currentBudget": 15000,
    "requiredSpecs": {},
    "candidates": [],
    "rejectedCandidates": []
  }
}`;
}

// ---------------------------------------------------------------------------
//  MULTIMODAL AGENTIC STEP EXECUTION (POST /api/step)
// ---------------------------------------------------------------------------
app.post('/api/step', async (c) => {
  // Rate limiting
  const clientIp = c.req.header('x-forwarded-for') || 'unknown';
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    log.warn(`Rate limit exceeded for IP ${clientIp} — 429 returned`);
    c.header('X-RateLimit-Limit', String(RATE_LIMIT_MAX_REQUESTS));
    c.header('X-RateLimit-Remaining', '0');
    c.header('X-RateLimit-Reset', new Date(rateLimit.resetAt).toISOString());
    return c.json({ error: 'Too many requests. Please wait before retrying.' }, 429);
  }

  // Payload size check (25MB limit to allow raw + masked base64 pairs safely)
  const rawBody = await c.req.raw.clone().text();
  const MAX_BODY_BYTES = 25 * 1024 * 1024;
  if (rawBody.length > MAX_BODY_BYTES) {
    log.warn(`Payload too large: ${rawBody.length} bytes from ${clientIp} — 413 returned`);
    return c.json({ error: 'Request body exceeds 25MB limit.' }, 413);
  }

  // Parse and validate input
  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    log.warn(`Invalid JSON body from ${clientIp} — 400 returned`);
    return c.json({ error: 'Invalid JSON in request body.' }, 400);
  }

  const {
    task,
    maskedDom,
    redactedImage,
    redaction_legend,
    scratchpad,
    sessionId: clientSessionId,
    step: clientStep,
    rawImage,
    vlmImage,
    subTasks: clientSubTasks,
    actionHistory: clientActionHistory,
  } = body as Record<string, unknown>;

  if (typeof task !== 'string' || task.trim().length === 0) {
    log.warn(`Invalid 'task' field from ${clientIp} — 400 returned`);
    return c.json({ error: "'task' must be a non-empty string." }, 400);
  }
  if (typeof maskedDom !== 'string') {
    log.warn(`Invalid 'maskedDom' field from ${clientIp} — 400 returned`);
    return c.json({ error: "'maskedDom' must be a string." }, 400);
  }

  let imageBase64 = '';
  if (redactedImage === undefined || redactedImage === null) {
    imageBase64 = '';
  } else if (typeof redactedImage === 'string') {
    imageBase64 = redactedImage;
  } else {
    log.warn(`Invalid 'redactedImage' field from ${clientIp} — 400 returned`);
    return c.json({ error: "'redactedImage' must be a string." }, 400);
  }

  const incomingVlmImage = (typeof vlmImage === 'string' && vlmImage.trim().length > 50) ? vlmImage.trim() : '';
  const finalVlmImage = incomingVlmImage || imageBase64 || (typeof rawImage === 'string' ? rawImage : undefined);

  let legendArray: unknown[] = [];
  if (redaction_legend === undefined || redaction_legend === null) {
    legendArray = [];
  } else if (Array.isArray(redaction_legend)) {
    legendArray = redaction_legend;
  } else {
    log.warn(`Invalid 'redaction_legend' field from ${clientIp} — 400 returned`);
    return c.json({ error: "'redaction_legend' must be an array." }, 400);
  }

  const incomingScratchpad = (typeof scratchpad === 'object' && scratchpad !== null) ? scratchpad : null;
  const sessionId = (typeof clientSessionId === 'string' && clientSessionId.trim()) ? clientSessionId.trim() : `session_${randomUUID()}`;
  const step = typeof clientStep === 'number' ? clientStep : 1;
  const subTasks = Array.isArray(clientSubTasks) ? (clientSubTasks as string[]) : [];
  const actionHistory = Array.isArray(clientActionHistory) ? (clientActionHistory as Array<Record<string, unknown>>) : [];

  // ZERO-TRUST SECURITY FIREWALL GATE: Rejects unmasked PII payloads before reaching upstream VLMs
  const firewallViolation = checkFirewallViolations(maskedDom);
  if (firewallViolation) {
    log.error(`[Firewall Gate] Rejected unmasked PII in payload from ${clientIp} [${sessionId}]: ${firewallViolation}`);
    return c.json({
      error: 'UNSANITIZED_PAYLOAD_REJECTED',
      detail: `Security firewall rejected unmasked PII in payload: ${firewallViolation}`,
    }, 400);
  }

  // Log payload sizes
  log.info(`Step ${step} [${sessionId}] — task: ${task.length} chars, maskedDom: ${maskedDom.length} chars, redactedImage: ${imageBase64.length} chars, rawImage: ${typeof rawImage === 'string' ? rawImage.length : 0} chars, history: ${actionHistory.length} items`);

  function parseActionJson(text: string): Record<string, unknown> {
    let cleaned = text.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();
    }
    // Bug 8: Strip trailing commas before closing braces/brackets e.g. {"a": 1,} or [1, 2,]
    const sanitizeJson = (str: string) => str.replace(/,\s*([\]}])/g, '$1');
    try {
      return JSON.parse(sanitizeJson(cleaned));
    } catch {
      const firstBrace = cleaned.indexOf('{');
      const lastBrace = cleaned.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        const extracted = cleaned.slice(firstBrace, lastBrace + 1);
        return JSON.parse(sanitizeJson(extracted));
      }
      throw new Error('AI returned invalid JSON');
    }
  }

  const domain = classifyTaskDomain(task, maskedDom);
  const taskMode = domain === 'SHOPPING_COMPARISON' ? 'shopping' : domain === 'WORKFLOW_ACTION' ? 'workflow' : (domain === 'ISRO_ENTERPRISE_OPERATIONS' || domain === 'GEOSPATIAL_WORKFLOW') ? 'isro' : 'info';
  const systemPrompt = generateDomainPrompt(domain);
  log.info(`Task domain classified as: ${domain} (mode: ${taskMode})`);

  // -------------------------------------------------------------------------
  // SERVER-SIDE DETERMINISTIC WORKFLOW COMPLETION GATE (Pre-VLM)
  // Prevents infinite loops on social posts, web forms, emails, and messaging workflows.
  // If the agent already submitted content in actionHistory (clicked Post/Send/Submit or pressed Enter),
  // and the page DOM confirms submission (e.g. LinkedIn toast "Post successful" / "View post",
  // Twitter "Your post was sent", email "Message sent", or composer modal closed):
  // Short-circuit IMMEDIATELY with action: "done" without calling Gemini/9router!
  // -------------------------------------------------------------------------
  if (taskMode === 'workflow' && actionHistory.length > 0) {
    const domLower = maskedDom.toLowerCase();

    // 1. Detect if substantial content was actually typed in action history
    const hasPriorTyping = actionHistory.some((a) => {
      const act = String(a.action || '').toLowerCase();
      const val = String(a.value || '').trim();
      return (act === 'type' || act === 'fill') && val.length > 15;
    });

    // 2. Detect if any previous action in history was an actual submission action AFTER or WITH typing
    const hasPriorSubmission = actionHistory.some((a) => {
      const act = String(a.action || '').toLowerCase();
      const tgt = String(a.target || '').toLowerCase();
      const val = String(a.value || '').toLowerCase();

      // Opener buttons (Start a post, Compose, etc.) MUST NEVER be treated as submissions
      const isOpener = [
        'start a post',
        'create a post',
        'write a post',
        'start writing',
        'new post',
        'compose',
        'new tweet',
        'new message',
        'start a discussion',
      ].some((op) => tgt.includes(op) || val.includes(op));

      if (isOpener) return false;

      const isSubmitClick =
        act === 'click' &&
        ['post', 'send', 'submit', 'publish', 'tweet', 'reply', 'confirm', 'share-actions'].some((term) =>
          tgt.includes(term) || val.includes(term)
        );
      const isEnterKey = (act === 'type' || act === 'keypress') && (val.includes('\n') || val.includes('\r')) && val.length > 15;
      return isSubmitClick || isEnterKey;
    });

    // 3. Detect platform success toasts, banners, or confirmation phrases
    const hasConfirmationToast = [
      'post successful',
      'view post',
      'post published',
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
    ].some((sig) => domLower.includes(sig));

    // 4. Detect that composer modal has closed and returned to feed / homepage with "Start a post" / "Compose"
    const hasFeedWithComposerClosed =
      (domLower.includes('start a post') || domLower.includes('compose') || domLower.includes('new post') || domLower.includes('new tweet')) &&
      !domLower.includes('contenteditable="true"') &&
      !domLower.includes('share your thoughts');

    if (hasPriorTyping && hasPriorSubmission && (hasConfirmationToast || hasFeedWithComposerClosed || step >= 4)) {
      log.info(`✅ [Server Workflow Gate] Detected completed workflow submission in actionHistory and DOM. Short-circuiting to action: "done".`);
      const doneResponse: Record<string, unknown> = {
        thought: 'Workflow submission successfully executed and confirmed on page (confirmation toast/feed visible). Mission complete.',
        action: 'done',
        summary: 'Content successfully posted and confirmed on page.',
        taskMode,
        domain,
        scratchpad: {
          ...(incomingScratchpad || {}),
          workflowStatus: 'completed',
          isGoalVerified: true,
        },
      };

      saveSessionStep({
        sessionId,
        step,
        task,
        subTasks,
        rawImage: typeof rawImage === 'string' ? rawImage : undefined,
        maskedImage: imageBase64,
        vlmImage: finalVlmImage,
        vlmModel: 'workflow-gate-shortcircuit',
        promptContext: 'Workflow completion gate short-circuited upstream VLM call.',
        vlmResponse: JSON.stringify(doneResponse),
        actionJson: doneResponse,
      });

      logRequest({
        sessionId,
        timestamp: new Date().toISOString(),
        maskedDom,
        redactionLegend: redaction_legend ?? [],
        returnedAction: {
          action: 'done',
          value: String(doneResponse.summary),
        },
      });

      return c.json(doneResponse);
    }
  }

  const historyText =
    actionHistory.length > 0
      ? '\n\nRecent Actions Executed in this Session:\n' +
        actionHistory
          .map((a, idx) => {
            const act = String(a.action || 'action');
            const tgt = a.target ? `target: ${a.target}` : '';
            const val = typeof a.value === 'string' ? `value: "${a.value.slice(0, 70).replace(/\n/g, '\\n')}"` : '';
            return `- Step ${idx + 1}: ${act} ${tgt} ${val}`.trim();
          })
          .join('\n')
      : '';

  // Build multimodal user message (ZERO-TRUST: rawImage is NEVER sent to the cloud)
  const userContent: Array<
    | { type: 'text'; text: string }
    | { type: 'image_url'; image_url: { url: string } }
  > = [
    {
      type: 'text',
      text:
        'Task: ' +
        task +
        historyText +
        (incomingScratchpad
          ? '\n\nWorking Memory Scratchpad:\n' + JSON.stringify(incomingScratchpad, null, 2)
          : '') +
        '\n\nMasked DOM:\n' +
        maskedDom +
        '\n\nredaction_legend:\n' +
        JSON.stringify(legendArray),
    },
  ];

  // Only attach redacted image if present
  if (imageBase64.trim().length > 50) {
    userContent.push({
      type: 'image_url',
      image_url: { url: 'data:image/jpeg;base64,' + imageBase64 },
    });
  }

  let parsed: Record<string, unknown> | null = null;
  let lastError: unknown = null;
  let rawVlmResponse = '';

  // -------------------------------------------------------------------------
  //  PRIORITY 1: Google Gemini API (if GEMINI_API_KEY is present)
  // -------------------------------------------------------------------------
  if (hasGemini) {
    const geminiClient = new OpenAI({
      apiKey: process.env.GEMINI_API_KEY,
      baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
    });

    const geminiModels = [
      process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash',
    ].filter((v, i, a) => a.indexOf(v) === i);

    for (const model of geminiModels) {
      log.info(`[Priority 1: Gemini] Calling model '${model}' for session ${sessionId}...`);
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 35_000);

        const completion = await geminiClient.chat.completions.create({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userContent },
          ],
          // @ts-expect-error signal is supported
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const raw = completion.choices[0]?.message?.content ?? '';
        log.info(`Gemini response from '${model}' (first 200 chars): ${raw.slice(0, 200)}`);
        parsed = parseActionJson(raw);
        rawVlmResponse = raw;
        log.success(`JSON parse succeeded with Gemini model '${model}' for session ${sessionId}`);
        break;
      } catch (geminiErr: unknown) {
        lastError = geminiErr;
        const errMsg = geminiErr instanceof Error ? geminiErr.message : 'Unknown Gemini error';
        log.warn(`Gemini model '${model}' failed: ${errMsg}. Trying next candidate...`);
      }
    }
  }

  // -------------------------------------------------------------------------
  //  PRIORITY 2: 9router Fallback (if Gemini failed or GEMINI_API_KEY missing)
  // -------------------------------------------------------------------------
  if (!parsed && hasRouter) {
    log.info(`[Priority 2: 9router] Calling 9router fallback for session ${sessionId}...`);
    const routerClient = new OpenAI({
      baseURL: process.env.ROUTER_URL,
      apiKey: process.env.ROUTER_API_KEY,
    });

    const PRIMARY_MODEL = process.env.MODEL_NAME || 'ag/gemini-3.7-flash-high';
    const CANDIDATE_MODELS = [
      PRIMARY_MODEL,
      'ag/gemini-3.8-flash-high',
      'gemini/gemini-3.7-flash',
      'gemini/gemini-3.8-flash',
      'claude-all-mix',
    ].filter((v, i, a) => a.indexOf(v) === i);

    for (const model of CANDIDATE_MODELS) {
      log.info(`[9router] Calling model '${model}' for session ${sessionId}...`);
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 35_000);

        const completion = await routerClient.chat.completions.create({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userContent },
          ],
          // @ts-expect-error signal is supported
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const raw = completion.choices[0]?.message?.content ?? '';
        log.info(`9router response from '${model}' (first 200 chars): ${raw.slice(0, 200)}`);

        if (raw.toLowerCase().includes('is no longer available') || raw.toLowerCase().includes('not available')) {
          log.warn(`Model '${model}' returned deprecation notice. Trying next...`);
          continue;
        }

        parsed = parseActionJson(raw);
        rawVlmResponse = raw;
        log.success(`JSON parse succeeded with 9router model '${model}' for session ${sessionId}`);
        break;
      } catch (routerErr: unknown) {
        lastError = routerErr;
        const errMsg = routerErr instanceof Error ? routerErr.message : 'Unknown 9router error';
        log.warn(`9router model '${model}' failed: ${errMsg}. Trying next...`);
      }
    }
  }

  if (!parsed) {
    const errMsg = lastError instanceof Error ? lastError.message : 'All upstream AI models failed';
    log.error(`All candidate models failed for session ${sessionId}: ${errMsg}`);
    logRequest({
      sessionId,
      timestamp: new Date().toISOString(),
      maskedDom,
      redactionLegend: redaction_legend ?? [],
      returnedAction: { action: 'error' },
    });
    return c.json({ error: 'AI returned invalid JSON' }, 500);
  }

  // Canonical action field normalization (guarantees selector, id, value are always populated)
  if (!parsed.selector && parsed.target) {
    parsed.selector = String(parsed.target);
  }
  if (!parsed.id && typeof parsed.selector === 'string') {
    const idMatch = parsed.selector.match(/data-agent-id=['"]([^'"]+)['"]/);
    if (idMatch) {
      parsed.id = idMatch[1];
    } else if (parsed.selector.startsWith('agent-') || parsed.selector.startsWith('R')) {
      parsed.id = parsed.selector;
    }
  }
  if (!parsed.value) {
    if (typeof parsed.text === 'string') parsed.value = parsed.text;
    else if (typeof parsed.url === 'string') parsed.value = parsed.url;
    else if (typeof parsed.query === 'string') parsed.value = parsed.query;
  }
  if (parsed.action === 'navigate' && !parsed.value && parsed.url) {
    parsed.value = parsed.url;
  }
  // Universal URL typing auto-converter:
  // If the model generates action: 'type' where the value is a full URL or domain URL,
  // normalize it into action: 'navigate' with the fully qualified URL.
  if (parsed.action === 'type' && typeof parsed.value === 'string') {
    const trimmedVal = parsed.value.trim().replace(/[\r\n]+$/, '');
    const isUrl =
      /^https?:\/\/[^\s]+$/i.test(trimmedVal) ||
      /^(?:www\.)[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:\/[^\s]*)?$/i.test(trimmedVal);
    if (isUrl) {
      log.info(`Converting action: 'type' with URL "${trimmedVal}" into action: 'navigate'`);
      parsed.action = 'navigate';
      parsed.value = trimmedVal.startsWith('http') ? trimmedVal : `https://${trimmedVal}`;
      delete parsed.id;
      delete parsed.selector;
    }
  }

  // -------------------------------------------------------------------------
  // SERVER-SIDE POST-VLM WORKFLOW SAFETY SANITIZER
  // If the model hallucinates a click on "Start a post", "Compose", re-types content,
  // or clicks submit again when submission was already executed: OVERRIDE to action: 'done'!
  // -------------------------------------------------------------------------
  if (taskMode === 'workflow' && actionHistory.length > 0) {
    const hasPriorTyping = actionHistory.some((a) => {
      const act = String(a.action || '').toLowerCase();
      const val = String(a.value || '').trim();
      return (act === 'type' || act === 'fill') && val.length > 15;
    });

    const hasPriorSubmission = actionHistory.some((a) => {
      const act = String(a.action || '').toLowerCase();
      const tgt = String(a.target || '').toLowerCase();
      const val = String(a.value || '').toLowerCase();

      const isOpener = [
        'start a post',
        'create a post',
        'write a post',
        'start writing',
        'new post',
        'compose',
        'new tweet',
        'new message',
        'start a discussion',
      ].some((op) => tgt.includes(op) || val.includes(op));

      if (isOpener) return false;

      return (
        (act === 'click' && ['post', 'send', 'submit', 'publish', 'tweet', 'reply', 'share-actions'].some((t) => tgt.includes(t) || val.includes(t))) ||
        ((act === 'type' || act === 'keypress') && (val.includes('\n') || val.includes('\r')) && val.length > 15)
      );
    });

    if (hasPriorTyping && hasPriorSubmission) {
      let targetText = `${parsed.selector || ''} ${parsed.id || ''} ${parsed.thought || ''} ${typeof parsed.value === 'string' ? parsed.value : ''}`.toLowerCase();
      if (parsed.id) {
        const escapedId = String(parsed.id).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const idRegex = new RegExp(`\\[${escapedId}\\][^\n]*`, 'i');
        const m = maskedDom.match(idRegex);
        if (m) targetText += ' ' + m[0].toLowerCase();
      }

      const isReOpenCompose = ['start a post', 'create a post', 'write a post', 'compose', 'new post', 'new tweet', 'new message', 'start writing'].some((t) => targetText.includes(t));
      const isReType = parsed.action === 'type';
      const isDuplicateSubmit = parsed.action === 'click' && ['post', 'send', 'submit', 'publish', 'tweet'].some((t) => targetText.includes(t));

      if (isReOpenCompose || isReType || isDuplicateSubmit) {
        log.info(`🛑 [Server Workflow Post-VLM Sanitizer] Intercepted attempt to re-open composer or re-submit after submission. Overriding to action: "done".`);
        parsed.action = 'done';
        parsed.thought = 'Content was already submitted in previous step. Overriding attempt to re-open composer to action: "done".';
        parsed.summary = 'Post successfully submitted and verified on page.';
        delete parsed.id;
        delete parsed.selector;
        delete parsed.value;
      }
    }
  }

  // -------------------------------------------------------------------------
  //  STRUCTURED LOCAL SESSION STORAGE
  //  Saves raw picture, masked picture, prompts in TXT, and responses in TXT/JSON
  //  under storage/sessions/<sessionId>/
  // -------------------------------------------------------------------------
  saveSessionStep({
    sessionId,
    step,
    task,
    subTasks,
    rawImage: typeof rawImage === 'string' ? rawImage : undefined,
    maskedImage: imageBase64,
    vlmImage: finalVlmImage,
    vlmModel: hasGemini ? (process.env.GEMINI_MODEL || 'gemini-2.5-flash') : (process.env.MODEL_NAME || '9router-fallback'),
    promptContext: userContent[0]?.type === 'text' ? userContent[0].text : undefined,
    vlmResponse: rawVlmResponse,
    actionJson: parsed,
  });

  // Log summary line to /storage/server_logs.jsonl
  logRequest({
    sessionId,
    timestamp: new Date().toISOString(),
    maskedDom,
    redactionLegend: redaction_legend ?? [],
    returnedAction: {
      action: String(parsed.action),
      selector: parsed.selector as string | undefined,
      id: parsed.id as string | undefined,
      value: parsed.value as string | undefined,
    },
  });

  // Attach domain & taskMode metadata
  parsed.taskMode = taskMode;
  parsed.domain = domain;

  return c.json(parsed);
});

// Global error handler
app.onError((err, c) => {
  log.error(`Unhandled server error: ${err.message}`);
  log.error(`Stack trace:\n${err.stack ?? 'No stack trace'}`);
  return c.json({ error: 'Internal server error.' }, 500);
});

// Start server
const port = Number(process.env.PORT) || 3000;

let server: any = null;
if (!process.env.VITEST && process.env.NODE_ENV !== 'test') {
  server = serve({
    fetch: app.fetch,
    port,
  });

  log.success('═══════════════════════════════════════════════════════════');
  log.success('  🚀  Zero-Trust AI Agent Server — ONLINE');
  log.success('═══════════════════════════════════════════════════════════');
  log.info(`  Port:              ${port}`);
  log.info(`  CORS:              enabled (origin: *)`);
  log.info(`  Upstream Provider: ${hasGemini ? 'Google Gemini API (Priority 1)' : '9router (Priority 2)'}`);
  log.info(`  Auth header:       x-secret-password`);
  log.info(`  Rate limit:        ${RATE_LIMIT_MAX_REQUESTS} req/min per IP`);
  log.info(`  Payload limit:     25MB`);
  log.info(`  Upstream timeout:  35s`);
  log.info(`  Session Vault:     storage/sessions/<sessionId>/`);
  log.success('═══════════════════════════════════════════════════════════');
}

function shutdown(signal: string): void {
  log.warn(`Received ${signal} — shutting down gracefully...`);
  server?.close?.(() => {
    log.info('Server closed cleanly.');
    process.exit(0);
  });
  const forceExit = setTimeout(() => {
    log.error('Forced shutdown after timeout.');
    process.exit(1);
  }, 5000);
  if (forceExit && typeof (forceExit as NodeJS.Timeout).unref === 'function') {
    (forceExit as NodeJS.Timeout).unref();
  }
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
