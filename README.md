<div align="center">

# 🛰️ Zero-Trust AI Web Agent

### On-Device Privacy-First Browser Automation for Sovereign Web & Enterprise Portals

*Smart India Hackathon 2026 · Problem Statement 26171 (ISRO) · Project “171”*

[![Manifest V3](https://img.shields.io/badge/Chrome%20Extension-MV3-blue)](#)
[![Firefox](https://img.shields.io/badge/Firefox-MV2-orange)](#)
[![React 18](https://img.shields.io/badge/React-18-61DAFB)](#)
[![WXT](https://img.shields.io/badge/Built%20with-WXT-0ea5e9)](#)
[![Hono](https://img.shields.io/badge/Server-Hono-e36002)](#)
[![ONNX Runtime](https://img.shields.io/badge/Inference-ONNX%20Runtime%20Web-5C2D91)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](#)

> **“The Cloud does the thinking; the Edge does the acting.”**  
> A zero-trust AI web agent that masks PII locally, detects faces via MediaPipe, runs on-device OCR
> and UI vision via WebAssembly/WebGPU (ONNX), and orchestrates browser actions through a hybrid VLM —
> while **raw sensitive data never leaves the browser tab**.

</div>

---

## 📖 Table of Contents

- [🚀 What It Is](#-what-it-is)
- [✨ Key Features](#-key-features)
- [🧠 The Zero-Trust Split-Brain Architecture](#-the-zero-trust-split-brain-architecture)
- [🏛️ The 7 ISRO Sovereign Enterprise Pillars](#️-the-7-isro-sovereign-enterprise-pillars)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Repository Structure](#-repository-structure)
- [🧩 How It Works (Agent Loop)](#-how-it-works-agent-loop)
- [📦 Prerequisites](#-prerequisites)
- [🚦 Quick Start](#-quick-start)
- [🔐 Environment Variables](#-environment-variables)
- [🧪 Testing](#-testing)
- [🤖 Model Drop-In & Training](#-model-drop-in--training)
- [📡 API Reference](#-api-reference)
- [🛡️ Security & Privacy Model](#️-security--privacy-model)
- [⚙️ Configuration](#️-configuration)
- [⚠️ Known Limitations](#️-known-limitations)
- [❓ Troubleshooting](#-troubleshooting)
- [📜 License](#-license)

---

## 🚀 What It Is

The **Zero-Trust AI Web Agent** is a hybrid edge-cloud browser automation platform that lets an AI
agent act on any website (e-commerce, web forms, social platforms, and — critically — **ISRO
sovereign geospatial & enterprise portals**) **without exposing your personal data or credentials to
the cloud**.

It solves the fundamental paradox of autonomous web agents:

> **How do you give an AI the ability to see and act on a page, while guaranteeing zero raw-PII egress?**

By implementing a **Split-Brain Architecture**, all *perception and action* happen inside the user's
browser tab (DOM sanitization, OCR, face redaction, UI vision, click/type execution), while only
*masked* artifacts are sent to a cloud **Vision-Language Model (VLM)** for high-level reasoning.

---

## ✨ Key Features

| Category | Highlights |
|----------|------------|
| 🛡️ **25-class PII protection** | Aadhaar, PAN, credit/debit cards (Luhn-verified), UPI, bank accounts, IFSC/SWIFT, crypto wallets, passports, driving licences, DOB, passwords/PINs, emails, phones, JWT/API keys, private keys, health/tax IDs, medical records, addresses & more |
| 👤 **Local face redaction** | MediaPipe `FaceLandmarker` → semantic `[REDACTED: FACE]` badges on screen captures |
| 🔤 **Sovereign on-device OCR** | Custom DBNet + SVTR/CRNN INT8 models detect & black-out PII / classified stamps / geospatial coords in images |
| 🖱️ **Local UI vision** | Fine-tuned YOLOv8 (8-class) detects buttons, inputs, links, images, dropdowns, options, checks, tabs — via WebGPU with WASM fallback |
| 🧠 **Hybrid VLM reasoning** | Gemini (Priority 1) → 9router fallback (Priority 2), domain-aware prompts, JSON action egress |
| ✅ **Fail-closed verification** | Geometric-enclosure proof + forensic plaintext sweep block transmission on any leak |
| 🚦 **Anti-loop engine** | Stutter-breaker, re-search trap, universal post-submission completion guard |
| 🎛️ **Mission Control dashboard** | Full-tab telemetry (API calls, payload size, latency, loop status, model health, host metrics) |
| 🧩 **Side panel HUD** | Live execution cockpit + **downloadable compliance audit certificate** |
| 🗄️ **Session vault** | Local + server-side storage of *masked-only* artifacts (never raw imagery) |
| ⚡ **Adaptive hardware tiering** | WebGPU / WASM-SIMD / WASM-lite per device capability |

---

## 🧠 The Zero-Trust Split-Brain Architecture

```
+-------------------------------------------------------------------------------------------+
|                              EDGE CLIENT (Browser Tab)                                    |
|                                                                                           |
|   +---------------+   +----------------+   +-----------------+    +------------------+    |
|   |  DOM Masker   |   |  Face Detect   |   |   OCR (WASM)    |    |  UI Vision       |    |
|   |  (25-Class)   |   |  (MediaPipe)   |   |  (DBNet+CRNN)   |    |  (YOLOv8/ONNX)   |    |
|   +-------+-------+   +-------+--------+   +--------+--------+    +--------+---------+    |
|           |                    |                   |                        |             |
|           +--------------------+-------------------+------------------------+             |
|                                v                                                          |
|                +-------------------------------------+                                    |
|                |  Redaction Legend (R1..Rn) +         |   ← only MASKED artifacts          |
|                |  Masked DOM + Badge Canvas          |     ever leave the tab             |
|                +-----------------+-------------------+                                    |
|                                  |                                                        |
|                                  | POST /api/step { task, maskedDom, redactedImage,       |
|                                  |                   redaction_legend, scratchpad }       |
|                                  v                                                        |
+-------------------------------------------------------------------------------------------+
|                           ORCHESTRATION SERVER (Hono / Node)                              |
|   • x-secret-password auth       • sliding-window rate limit (40 req/min)                 |
|   • plaintext firewall (Luhn & regex quarantine)                                           |
|   • domain classifier (ISRO / Workflow / Shopping / Info)                                  |
|   • pre-VLM workflow-completion gate                                                       |
|   • domain-aware dynamic prompts                                                           |
|   • resilient VLM router: Gemini 2.5 Flash → 9router fallback                              |
|                                  |  structured JSON action egress                          |
+-------------------------------------------------------------------------------------------+
```

**Core invariants**

1. **Local Perception** — All CV (face, OCR, UI detection) runs in the browser.
2. **Redaction Protocol** — Sensitive DOM & screen regions are masked *before* any egress.
3. **Zero-Egress Invariant** — Plaintext tokens & raw frames are provably never transmitted
   (verified by the `piiLeak` security suite over 150 scenarios × 8 secrets = 1,200 leak checks).

---

## 🏛️ The 7 ISRO Sovereign Enterprise Pillars

The classifier and domain prompts are purpose-built for automating **ISRO's real operational portals**:

| # | Pillar | Example Workflows |
|---|--------|-------------------|
| 1 | **Mission Control & Telemetry** (MOX) | LVM3/PSLV launch telemetry, cryo-stage pressure, reaction wheels |
| 2 | **Earth Observation & GIS** (Bhuvan / Bhoonidhi) | Thematic services, Flood Hazard / Drought, zoom into state sectors |
| 3 | **Ground Station Network** (ISTRAC / Byalalu DSN) | Authorize antenna passes, Az/El scheduling, tracking |
| 4 | **Secure Administrative & Scientist Clearances** | Level-1…5 RBAC, classified mission authorization |
| 5 | **R&D, Propulsion & Patents** (SAC / LPSC / VSSC) | CE-20 / SCE-200, propellant, patent search |
| 6 | **Aerospace Supply Chain & Procurement** (GeM / e-Procure) | Inconel 718, Ti-6Al-4V tenders, POs |
| 7 | **Space Situational Awareness** (Project NETRA) | Orbital debris, CARA conjunction risk, CAM burns |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Extension framework | **WXT** (MV3 / MV2), Vite |
| UI | **React 18**, TailwindCSS 3 |
| On-device inference | **ONNX Runtime Web** (WebGPU → WASM), **@mediapipe/tasks-vision** |
| CV models | YOLOv8n-INT8 (UI), DBNet-INT8 (OCR det), SVTR/CRNN-INT8 (OCR rec) |
| Server | **Hono**, `@hono/node-server`, `openai` SDK, `dotenv`, `tsx` |
| Cloud VLM | Google **Gemini** (primary) → **9router** (fallback) |
| Testing | **Vitest**, jsdom, supertest |

---

## 📁 Repository Structure

```
.
├─ extension/                # WXT browser extension (edge client)
│  ├─ src/
│  │  ├─ entrypoints/
│  │  │  ├─ background/      # service worker: telemetry + agentic loop
│  │  │  ├─ content/         # content script: redaction + action executor
│  │  │  ├─ popup/           # quick launcher UI
│  │  │  ├─ sidepanel/       # persistent HUD + privacy audit
│  │  │  └─ dashboard/       # full-tab Mission Control
│  │  ├─ utils/              # PII, OCR, UI vision, address, security engines
│  │  └─ components/         # shared React components
│  ├─ public/onnx|mediapipe/ # local ML models (drop-in)
│  ├─ tests/unit/            # 11 pure-function test suites
│  ├─ scripts/               # asset copy + model fetch
│  ├─ docs/                  # model cards & drop-in guide
│  └─ wxt.config.ts
├─ server/                   # Hono orchestration server (VLM brain)
│  └─ src/                   # index.ts, sessionStorage.ts, logger.ts
├─ tests/                    # decoupled integration/security/e2e suite
│  ├─ data/                  # generated 150-scenario fixtures
│  ├─ unit/                  # client & domain tests
│  ├─ integration/           # background-loop + server contract
│  ├─ security/              # PII-leak guarantee audit
│  └─ e2e/                   # Playwright stubs + termination guards
├─ scripts/ · scratch/       # Python PoCs & ONNX benchmarks
├─ train_ocr_model.ipynb     # OCR training notebook
├─ train_ui_detector.ipynb   # UI-detector training notebook
├─ SIH_MASTER_GUIDE.md       # operational manual
└─ ZERO_TRUST_AI_WEB_AGENT_SPECIFICATION.md  # technical whitepaper
```

---

## 🧩 How It Works (Agent Loop)

```
User task  →  START_AGENT  →  Background worker
                                  │
           ┌──────────────────────┼───────────────────────────────┐
           ▼                      ▼                               ▼
  1. GET_DOM (mask PII)   2. GET_SCREENSHOT             5. LOCAL UI VISION
     getMaskedDom()          captureAndRedact()            YOLOv8 → UIElement[]
                             (face + OCR + badges,
                              fail-closed verified)
                                   │
                                   ▼
  3. POST /api/step  { maskedDom, redactedImage, legend }   ← only masked data
                                   │
                                   ▼
  4. VLM action JSON  →  normalize + loop-guard  →  EXECUTE_ACTION
                                   │
                                   ▼
  6. Content script: realistic click / type / select / zoom / navigate
                                   │
                                   ▼
  7. WAIT_FOR_STABLE (MutationObserver, 800ms)  →  next step… until "done"
```

---

## 📦 Prerequisites

- **Node.js ≥ 20** & npm
- **Google Chrome** (recommended) or **Firefox**
- For on-device acceleration: a WebGPU-capable browser (falls back to WASM automatically)
- **One AI provider**: a Google `GEMINI_API_KEY`, *or* a 9router `ROUTER_URL` + `ROUTER_API_KEY`

---

## 🚦 Quick Start

### 1. Start the Server

```bash
cd server
cp .env.example .env        # then edit with your keys (see Environment Variables)
npm install
npm run dev                 # tsx watch → http://localhost:3000
```

> The server exposes `/health` and `/api/system-telemetry`. Startup validates that both
> `SECRET_PASSWORD` and at least one AI provider are configured.

### 2. Build & Load the Extension

```bash
cd extension
npm install
npm run build               # also runs copy-assets (onnx/mediapipe → output)
```

Then in Chrome:

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** and select `extension/.output/chrome-mv3` (prod) or `.output/chrome-mv3-dev` (dev)
4. Pin the extension, open the **popup**, and **dock to the side panel** for the full HUD

> **One-click alternative:** run `.\s.ps1` (production) or `.\extension\171s.ps1` (dev) from the
> repo root to check Node, install deps, clean port 3000, build, and launch both services.

### 3. Run Your First Task

In the popup / side panel, enter a task such as:

```
Find Puma running shoes under ₹2,500 with rating > 4.2 on Amazon
```

```
Go to LinkedIn and post: "Today we completed SIH 2026 development 🚀"
```

```
Open ISRO Bhuvan, navigate to Thematic Services, search for 'Flood Hazard',
and zoom into the Odisha coastal sector.
```

Click **⚡ Run Autonomous Agent** and watch the console, HUD milestones, and Mission Control telemetry.

---

## 🔐 Environment Variables

### Server (`server/.env`)

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `PORT` | No | Server port | `3000` |
| `SECRET_PASSWORD` | **Yes** | Auth header `x-secret-password` — must match the extension | — |
| `GEMINI_API_KEY` | Either* | Google Gemini key (Priority 1 provider) | — |
| `ROUTER_URL` | Either* | 9router base URL (Priority 2 fallback) | — |
| `ROUTER_API_KEY` | Either* | 9router API key | — |
| `GEMINI_MODEL` | No | Gemini model override | `gemini-2.5-flash` |
| `MODEL_NAME` | No | 9router primary model | `ag/gemini-3.7-flash-high` |

\* You must configure **at least one** AI provider (Gemini is preferred).

### Extension (compile-time constants — `src/entrypoints/background/index.ts`)

| Constant | Purpose |
|----------|---------|
| `SERVER_URL` | Server `/api/step` endpoint |
| `SECRET_PASSWORD` | Auth password (must match server) |
| `MAX_STEPS` | Max agent-loop iterations |
| `STEP_DELAY_MS` | Pause between loop steps |
| `telemetryData` / `LoopStatus` | In-memory telemetry polled by the dashboard |

---

## 🧪 Testing

The repo ships **two independent Vitest suites** (a decoupled 150-scenario arsenal, and the
extension's own pure-function unit tests).

```bash
# Decoupled suite (tests/)
cd tests
npm install
npm test                    # pretest auto-generates fixtures + scenarios

# Targeted runs
npm run test:unit           # unit/**
npm run test:integration    # background-loop + server contract
npm run test:security       # 1,200-check PII-leak guarantee
npm run test:e2e            # termination stubs

# Extension unit tests (extension/)
cd ../extension
npm run test
```

**What's guarded:**

- ✅ 150 scenarios have unique, sequential legends (`R1..Rn`) & valid bboxes
- ✅ Outbound wire bytes contain **zero** of the per-scenario raw secrets (1,200 checks)
- ✅ The redacted frame (never the raw frame, never `data:`-headed) is what crosses the wire
- ✅ Server contract survives markdown-fenced JSON, chatter-prefixed JSON, upstream throws, and double-base64 regressions
- ✅ Anti-loop guards, workflow completion, and neural/CV engines are unit-tested

---

## 🤖 Model Drop-In & Training

Models are trained externally and **dropped in** — no code changes needed.

| Trained model | Copy to |
|---------------|---------|
| `ui_detector.onnx` (YOLOv8s 8-class) | `extension/public/onnx/ui_detector.onnx` |
| `ocr_det.onnx` (DB head) | `extension/public/onnx/ocr_det.onnx` |
| `ocr_rec.onnx` (CTC head) | `extension/public/onnx/ocr_rec.onnx` |
| `ocr_dict.txt` (1 char/line) | `extension/public/onnx/ocr_dict.txt` |

Then:

```bash
cd extension
npm run build      # postbuild copies onnx/ + mediapipe/ into the output
```

Missing or absent models degrade gracefully to `'degraded'` status (**zero crashes**).

Training notebooks live at `train_ocr_model.ipynb` and `train_ui_detector.ipynb`. Detailed specs
are in `extension/docs/models/`. See `extension/docs/MODEL_DROP_IN.md` for the full contract.

> Fetch MediaPipe runtime assets if missing: `cd extension && npm run fetch-models`

---

## 📡 API Reference

All endpoints except `/health` and `/api/system-telemetry` require the `x-secret-password` header.
CORS is open (needed for the extension). Payload limit **25 MB**; upstream VLM timeout **35 s**.

### `POST /api/step` — core agent decision

**Request**

```json
{
  "task": "Search for ISRO",
  "maskedDom": "{ \"maskedText\": \"...\", \"elementMap\": [...] }",
  "redactedImage": "<raw base64, NO data: header>",
  "redaction_legend": [ { "id": "R1", "type": "human_face", "bbox": [10,20,100,100] } ],
  "scratchpad": {},
  "sessionId": "…",
  "step": 1
}
```

**Response** (domain-aware JSON action)

```json
{
  "thought": "Reasoning for this step",
  "action": "click | select | zoom | type | navigate | scroll | back | done",
  "id": "agent-14",
  "selector": "CSS selector or keyword",
  "value": "text (\\n for Enter) | URL | option | 'in'/'out'",
  "scratchpad": {
    "milestones": [ { "name": "…", "status": "completed" } ],
    "verificationGate": { "satisfied": true }
  }
}
```

### Other endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/health` | Liveness + configured provider + storage stats |
| `GET` | `/api/system-telemetry` | Host mem/CPU/load/disk + process uptime + AI provider |
| `POST` | `/api/session/init` | Create a session directory |
| `POST` | `/api/session/finalize` | Finalize session metadata |
| `POST` | `/api/session/screenshot` | Archive a standalone screenshot |
| `GET` | `/api/sessions` | List all sessions |
| `GET` | `/api/session/:id` | Session details + per-step artifacts |

---

## 🛡️ Security & Privacy Model

The platform enforces three layers of defense before anything leaves the tab:

1. **Client sanitization** — 25-class DOM masking + OCR/face blackout on the canvas.
2. **Local fail-closed verifier** (`leakVerifier.ts`) —
   - **Geometric enclosure proof:** every detected sensitive `bbox` must be strictly enclosed by a padded redaction badge.
   - **Forensic plaintext sweep:** structured DOM/values are scanned for residual unmasked PII (Luhn-aware for cards); any violation **blocks transmission**.
3. **Server-side firewall** — a second regex/Luhn quarantine rejects any payload that still contains raw PII with `UNSANITIZED_PAYLOAD_REJECTED`.

**Compliance targeting:** DPDP Act 2023, Aadhaar Act 2016 (§29), RBI Card-on-File, PCI-DSS v4.0, ISO/IEC 7810/7812, ISO 27001/27701.

---

## ⚙️ Configuration

| Area | Where | Notes |
|------|-------|-------|
| Extension manifest/perms | `extension/wxt.config.ts` | Auto-loaded into `.output/chrome-mv3` |
| Theme palette | `extension/tailwind.config.js` | Royal-navy & aureate-gold light/dark |
| Server CORS/rate-limit | `server/src/index.ts` | `RATE_LIMIT_MAX_REQUESTS = 40` |
| Session retention | `extension/src/utils/sessionLogger.ts` | Cap 15 client sessions, strips old images |

---

## ⚠️ Known Limitations

- **Desktop only** — MV3 extensions are not supported on mobile Chromium.
- **`performance.memory` / `deviceMemory`** are Chromium-only; Firefox shows `N/A` memory on the dashboard (Storage/Network/FPS cards still work).
- **Cloud VLM round-trip** dominates latency (~53% of an ~1.84 s average step).
- The 150-scenario **E2E tests are stubs** — full Playwright automation requires a headed browser + running server.
- Extending to new sites works best when selectors rely on IDs/roles/keywords already indexed by `getMaskedDom()`.

---

## ❓ Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `Unauthorized` | Mismatched `SECRET_PASSWORD` | Align extension constant + `server/.env` |
| Extension not loading | Wrong output folder | Use `.output/chrome-mv3` (prod) / `-dev` |
| Face detection fails | MediaPipe assets missing | `npm run fetch-models` |
| Model status `degraded` | ONNX files absent | Drop models into `extension/public/onnx/` |
| Server won't start | Port in use / missing `.env` | `.\s.ps1` clears port 3000; set keys |
| `document is not defined` in tests | Wrong Vitest env | DOM tests are pinned via `environmentMatchGlobs` |

---

## 📜 License

Released under the **MIT License**.

> Built with ❤️ for **Smart India Hackathon 2026** · Problem Statement 26171 (ISRO).
> See `ZERO_TRUST_AI_WEB_AGENT_SPECIFICATION.md` for the full technical whitepaper and `SIH_MASTER_GUIDE.md` for the operational manual.