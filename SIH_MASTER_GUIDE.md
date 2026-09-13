# SIH Zero-Trust AI Web Agent - Master Guide

> Smart India Hackathon 2025 - Project Documentation
>
> A zero-trust AI web agent that masks PII locally, detects faces via MediaPipe,
> runs OCR via Tesseract.js, performs local UI vision via WebGPU (ONNX), and
> orchestrates browser actions through a hybrid VLM - all while keeping raw
> sensitive data on-device. A full-tab **Mission Control dashboard**
> (`/dashboard.html`) exposes live client-side telemetry, and a decoupled
> **150-scenario test arsenal** (`/tests`) audits masking, server contract,
> and PII-leak guarantees.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Local Deployment](#2-local-deployment)
3. [Testing Guide](#3-testing-guide)
4. [Cloud Deployment (Server)](#4-cloud-deployment-server)
5. [Store Publishing Guide](#5-store-publishing-guide)
6. [Environment Variables Reference](#6-environment-variables-reference)
7. [Troubleshooting](#7-troubleshooting)
8. [Model Training & Drop-In Pipeline](#8-model-training--drop-in-pipeline)

---

## 1. Architecture Overview

### 1.1 Zero-Trust Split-Brain Model

The system follows a **Zero-Trust split-brain** architecture:

```
+-------------------------------------------------------+
|                  CLIENT (Browser)                     |
|                                                       |
|  +--------------+  +--------------+  +--------------+ |
|  |  DOM Masker  |  | Face Detect  |  |     OCR      | |
|  |  (Regex PII) |  | (MediaPipe)  |  | (Tesseract)  | |
|  +------+-------+  +------+-------+  +------+-------+ |
|         |                 |                 |         |
|         +-----------------+-----------------+         |
|                           v                           |
|              +------------------------+               |
|              |   Redaction Legend     |               |
|--------------+------------------------+---------------|
|              |  (R1, R2, ... Rn)      |               |
|              +-----------+------------+               |
|                          |                            |
|  +-----------------------+-------------------------+  |
|  |        Local UI Vision (WebGPU/ONNX)             |  |
|  |        YOLOv8n - button/element detection        |  |
|  +-----------------------+-------------------------+  |
|                          |                            |
|         +----------------+-----------------+          |
|         v                                  v          |
|  +--------------+                  +--------------+   |
|  | Masked DOM   |                  | Masked Image |   |
|  | (text only)  |                  | (redacted)   |   |
|  +--------------+                  +--------------+   |
|                          |                            |
+--------------------------+----------------------------+
                           |
                           |  POST /api/step
                           |  { task, maskedDom, redactedImage, redaction_legend }
                           v
+-------------------------------------------------------+
|                  SERVER (Hono)                         |
|                                                       |
|  +-------------------------------------------------+  |
|  |  Auth Middleware (x-secret-password)            |  |
|  +-----------------------+-------------------------+  |
|                          v                            |
|  +-------------------------------------------------+  |
|  |  VLM Router (9router / Claude / GPT)            |  |
|  |  Receives: task + masked DOM + image + legend   |  |
|  |  Returns: { action, selector, value }           |  |
|  +-----------------------+-------------------------+  |
|                          v                            |
|  +-------------------------------------------------+  |
|  |  JSON Response Parser                           |  |
|  +-------------------------------------------------+  |
|                                                       |
+-------------------------------------------------------+
```### 1.2 Key Principles

| Principle | Implementation |
|-----------|---------------|
| **Zero-Trust** | Raw PII never leaves the client. Only masked data reaches the server. |
| **Client-Side Redaction** | DOM masking, face blurring, OCR-based PII detection all run locally. |
| **Redaction Legend** | Each blacked-out region gets an ID (R1, R2...) so the VLM understands context. |
| **Local UI Vision** | YOLOv8n via WebGPU detects buttons/elements without sending screenshots to a third party. |
| **Session Logging** | Every run gets a UUID; logs stored locally (client) and as JSONL (server). |
| **Mission Control Telemetry** | Background `telemetryData` (`apiCalls`, `totalPayloadSent` KB, `lastLatency` ms, `loopStatus`) polled via `{ type: 'GET_TELEMETRY' }` using only Web Performance APIs — no OS APIs, no extra permissions. |
| **Cross-Browser** | Works on Chrome (MV3), Edge (MV3), and Firefox (MV2) via WXT + webextension-polyfill. |

### 1.3 Technology Stack

| Layer | Technology |
|-------|-----------|
| Extension Framework | WXT (Web Extension Tools) |
| Manifest | MV3 (Chrome/Edge), MV2 (Firefox) |
| UI Framework | React 18 + Tailwind CSS |
| Face Detection | MediaPipe Tasks Vision |
| OCR | Tesseract.js |
| Local UI Vision | ONNX Runtime Web (YOLOv8n) |
| Server | Hono + OpenAI-compatible router |
| Build | Vite 6 |
| Dashboard | WXT unlisted page (`src/entrypoints/dashboard/` → `/dashboard.html`), React + Tailwind dark NASA theme, opened via `browser.tabs.create({ url: browser.runtime.getURL('/dashboard.html') })` from the popup |
| Testing | Vitest 1.6 (threads pool, jsdom per-file, supertest + Hono contract mirror, `tsx` generators, `jest-canvas-mock` dep) + Playwright (E2E stubs) |
| Language | TypeScript 5 |

---

## 2. Local Deployment

### 2.1 Prerequisites

- **Node.js** v20.11.0+ (LTS recommended)
- **npm** v10.2.4+
- **Git** (for version control)
- **Chrome** or **Edge** (for loading the extension)

### 2.2 Step-by-Step Setup

#### Step 1: Clone the Repository

```bash
git clone https://github.com/your-org/sih-zero-trust-agent.git
cd sih-zero-trust-agent
```

#### Step 2: Set Up the Server

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```env
PORT=3000
SECRET_PASSWORD=my-secret-key
ROUTER_URL=https://api.9router.ai/api/v1
ROUTER_API_KEY=your-router-api-key-here
```

Start the server:

```bash
npm run dev
# or: npx tsx src/index.ts
```

The server will start on `http://localhost:3000`.

#### Step 3: Set Up the Extension

```bash
cd ../extension
npm install
```

Start the development build:

```bash
npm run dev
```

This starts the WXT dev server and outputs to `.output/chrome-mv3-dev/`.

#### Step 4: Load the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top-right)
3. Click **Load unpacked**
4. Select the `extension/.output/chrome-mv3-dev/` folder
5. The extension icon will appear in the toolbar

#### Step 5: Use the Extension

1. Click the extension icon to open the popup
2. Enter a task (e.g., "Book a train ticket from Delhi to Mumbai")
3. Click **Run Agent**
4. Watch the logs as the agent scans the DOM, redacts PII, and executes actions### 2.3 Project Structure

```
sih-zero-trust-agent/
+-- extension/                 # Chrome/Edge/Firefox extension
|   +-- src/
|   |   +-- entrypoints/
|   |   |   +-- background/    # Service worker (agentic loop + telemetryData / GET_TELEMETRY)
|   |   |   +-- content/       # Content script (DOM masking, face detect, OCR)
|   |   |   +-- popup/         # Popup UI (React + Open Mission Control button)
|   |   |   +-- dashboard/     # Full-tab Mission Control (index.html, main.tsx, App.tsx, style.css → /dashboard.html)
|   |   +-- utils/
|   |   |   +-- sessionLogger.ts  # Client-side session storage
|   |   +-- components/        # Shared React components
|   +-- .output/               # Build output (gitignored)
|   +-- wxt.config.ts          # WXT configuration
|   +-- package.json
|   +-- tsconfig.json
+-- server/                    # Hono server
|   +-- src/
|   |   +-- index.ts           # Main server entry
|   |   +-- logger.ts          # Server-side JSONL logger
|   +-- package.json
|   +-- tsconfig.json
+-- storage/                   # Session logs (gitignored)
|   +-- .gitkeep
|   +-- server_logs.jsonl
+-- tests/                     # Test suite (decoupled; core never imports from here)
|   +-- setup/
|   |   +-- generateScenarios.ts  # Deterministic 150-scenario data engine (seeded PRNG → data/scenarios.json)
|   |   +-- generateMocks.ts      # Legacy 150 mock generator → setup/fixtures/mock_scenarios_150.json
|   |   +-- fixtures/             # Legacy fixture output (gitignored, rebuilt by pretest)
|   +-- data/
|   |   +-- scenarios.json     # 150 payloads: task, raw_pii×8, raw/masked DOM, legend (dom_input/human_face/pii_image), redacted+raw images
|   +-- unit/                  # client.test.ts (regex/smart-wait/legend over 150) + legacy matchers
|   +-- integration/           # serverContract.test.ts (Hono chaos matrix) + background-loop
|   +-- security/              # piiLeak.test.ts (150×8 wire audit, redacted≠raw)
|   +-- e2e/                   # E2E test stubs
|   +-- package.json           # Own deps (vitest, jsdom, supertest, hono, tsx, jest-canvas-mock) + pretest hook
|   +-- vitest.config.ts       # Headless threads pool, jsdom per-file, includes unit/integration/security/e2e
+-- SIH_MASTER_GUIDE.md        # This file
+-- s.ps1                      # PowerShell automator
+-- README.md
```

---

## 3. Testing Guide

### 3.1 Quick Start

```bash
cd tests
npm install
npm run test
```

`pretest` auto-regenerates both datasets (`generate-scenarios` + `generate-mocks-tsx`), so a fresh clone is green without manual steps. Current gate: **9 files passed, 83 tests passed, 6 skipped (E2E stubs)** in ~2s (threads pool, headless).

### 3.2 Generating Scenarios (Data Engine + Legacy Mocks)

Two generators live in `tests/setup/` (both `node:*`-only, deterministic; core never imports them):

```bash
cd tests
npm run generate-scenarios   # tsx setup/generateScenarios.ts → tests/data/scenarios.json (150)
npm run generate-mocks-tsx   # tsx setup/generateMocks.ts → tests/setup/fixtures/mock_scenarios_150.json (150)
```

`tests/data/scenarios.json` is the brutal audit dataset. Each of the 150 entries holds `task`, 8 mutated raw secrets (`raw_pii_list`: Aadhaar spaced/compact, PAN, card spaced/compact, email, phone10, `+91` formatted), messy `mock_raw_dom`, fully scrubbed `mock_masked_dom`, `mock_redaction_legend` (always `R1 dom_input` / `R2 human_face` / `R3 pii_image` with valid `[x,y,w,h]`), plus `mock_image_base64` (redacted, headerless) vs `mock_raw_image_base64` (never equal).

The legacy `mock_scenarios_150.json` keeps the original daily-life templates across categories:

| Category | Count | Examples |
|----------|-------|----------|
| Government / Tax | 10 | Filing IRS tax, Aadhaar update, PAN application |
| Travel / Transport | 15 | IRCTC booking, flight booking, Uber, Metro card |
| Banking / Finance | 20 | Credit card bill, NEFT, UPI, FD, insurance |
| E-Commerce | 20 | Amazon, Flipkart, Myntra, returns, reviews |
| Healthcare | 15 | Practo, 1mg, lab tests, vaccination |
| Education | 15 | CBSE, JEE, NEET, scholarships, fees |
| Utilities & Bills | 15 | Electricity, water, gas, DTH, broadband |
| Social & Communication | 15 | Password reset, 2FA, profile, referrals |
| Government Services | 15 | RTI, certificates, land records, tenders |
| Miscellaneous | 10 | Donations, COVID, startup, trademarks |

### 3.3 Test Suites

| Suite | Command | What It Tests |
|-------|---------|---------------|
| Unit (brutal) | `npm run test:unit` | `unit/client.test.ts` (18 tests): 150× EMAIL/PHONE/CARD + Aadhaar/PAN-via-OCR masking, `waitForPageStable` silence-window/hard-timeout, legend `R1..Rn` + bbox validity — plus legacy `pii-matchers/redaction-legend/smart-wait/mock-data` |
| Integration (chaos) | `npm run test:integration` | `integration/serverContract.test.ts` (16 tests): hardened Hono mirror of `POST /api/step` — happy 200, corrupted-image grace, missing-legend 400/safe-default, markdown-fenced AI→500, double-base64 strip/re-attach, supertest real-HTTP smoke — plus legacy `background-loop` |
| Security (SIH guarantee) | `npm run test:security` | `security/piiLeak.test.ts` (5 tests): mocked-`fetch` loop over 150 scenarios, 1200 wire checks (zero raw PII in body), `redactedImage==redacted≠raw`, headerless, URL/method/auth/legend contract |
| E2E | `npm run test:e2e` | Extension load, scenario injection (stubs, 6 skipped) |
| All | `npm run test` | Everything (runs `pretest` generators first) |

Known chaos findings (asserted in tests, not hidden): production `PHONE` regex is 3-3-4 grouping only, so `+91 94858 71267` (5-5) needs the extended/OCR layer; production runs `PHONE` before `CARD`, so compact 16-digit runs fragment without longest-first scrubbing.

### 3.4 Running Specific Tests

```bash
# Brutal client + chaos + leak suites
npx vitest run unit/client.test.ts
npx vitest run integration/serverContract.test.ts
npx vitest run security/piiLeak.test.ts

# Legacy suites
npx vitest run unit/pii-matchers.test.ts
npx vitest run integration/background-loop.test.ts

# Run with coverage
npm run coverage

# Watch mode (auto-re-run on file changes)
npm run test:watch
```---

## 4. Cloud Deployment (Server)

### 4.1 Deploying to Render

#### Step 1: Create a New Web Service

1. Go to [render.com](https://render.com) and sign in
2. Click **New +** -> **Web Service**
3. Connect your GitHub repository
4. Set the **Root Directory** to `server`

#### Step 2: Configure Build Settings

| Setting | Value |
|---------|-------|
| Build Command | `npm install && npm run build` |
| Start Command | `node dist/index.js` |
| Environment | Node 20 |

#### Step 3: Set Environment Variables

| Variable | Description | Example |
|----------|-------------|----------|
| `PORT` | Server port | `3000` |
| `SECRET_PASSWORD` | Auth password (must match extension) | `my-secret-key` |
| `ROUTER_URL` | 9router base URL | `https://api.9router.ai/api/v1` |
| `ROUTER_API_KEY` | Your 9router API key | `sk-xxxxxxxxxxxxxxxx` |

#### Step 4: Deploy

Click **Create Web Service**. Render will build and deploy automatically.

### 4.2 Deploying to Railway

#### Step 1: Create a New Project

1. Go to [railway.app](https://railway.app)
2. Click **New Project** -> **Deploy from GitHub repo**
3. Select your repository

#### Step 2: Configure

Set the **Root Directory** to `server` and add the same environment variables as above.

#### Step 3: Deploy

Railway auto-deploys on every push to `main`.

### 4.3 Deploying to Fly.io

```bash
# Install flyctl
flyctl auth login

# Create app
flyctl launch --name sih-zero-trust-server

# Set secrets
flyctl secrets set SECRET_PASSWORD=my-secret-key
flyctl secrets set ROUTER_URL=https://api.9router.ai/api/v1
flyctl secrets set ROUTER_API_KEY=sk-xxxxxxxx

# Deploy
flyctl deploy
```

### 4.4 Post-Deployment

After deploying, update the extension `SERVER_URL` in `extension/src/entrypoints/background/index.ts`:

```typescript
const SERVER_URL = "https://your-deployed-server.com/api/step";
```

Then rebuild the extension:

```bash
cd extension
npm run build
```---

## 5. Store Publishing Guide

### 5.1 Chrome Web Store

#### Step 1: Prepare the Build

```bash
cd extension
npm run build
```

This produces `.output/chrome-mv3/` (includes `popup.html`, `dashboard.html`, `background.js`, `content-scripts/content.js`).

#### Step 2: Zip the Extension

```bash
cd .output/chrome-mv3
zip -r ../../sih-agent-chrome.zip .
```

#### Step 3: Create Developer Account

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)

---

## 8. Model Training & Drop-In Pipeline

The extension's on-device ML models are trained externally (e.g. on Kaggle
notebooks) and dropped into fixed file paths. This chapter describes the
training workflow and the drop-in contract.

### 8.1 Custom Training Notebooks

1. **ISRO Sovereign & Web UI Detector (`train_ui_detector.ipynb`)**
   - Self-contained, executable notebook located in the repository root (`/train_ui_detector.ipynb`).
   - Procedurally generates **6,000 realistic UI samples** (5,000 Train / 1,000 Val) grounded in ISRO sovereign portals (Bhuvan GIS, Bhoonidhi, MOSDAC, VEDAS, GeM procurement, InPASS patents, ISTRAC telemetry).
   - Expanded **8-class taxonomy**: `button`, `input`, `link`, `image`, `dropdown`, `option`, `checkbox_radio`, `tab`.
   - **Hardware Resource Saturation**: Utilizes 100% CPU cores (`multiprocessing.Pool` + PyTorch thread pool), 100% RAM caching (`cache='ram'`), and multi-GPU VRAM saturation (`batch=-1`, FP16 AMP).
   - Exports to ONNX opset 17 and performs dynamic INT8 quantization via `onnxruntime.quantization` yielding an ultra-compact ~10.8MB model.
   - Output: `ui_detector_quantized.onnx` -> copied to `extension/public/onnx/ui_detector.onnx`.

2. **OCR (PaddleOCR Fine-Tune)**
   - Fine-tunes PaddleOCR detection (DB) and recognition (CTC) heads
   - Exports both to ONNX
   - Outputs: `ocr_det.onnx`, `ocr_rec.onnx`, `custom_dict.txt`

### 8.2 Drop-In Table

| Trained Model File | Copy To | Engine |
|-------------------|---------|--------|
| `ui_detector_quantized.onnx` (YOLOv8s 8-Class) | `extension/public/onnx/ui_detector.onnx` | UI Detector (8-Class ISRO/Web YOLOv8) |
| `ocr_det.onnx` (PaddleOCR det) | `extension/public/onnx/ocr_det.onnx` | OCR Detection (DB head) |
| `ocr_rec.onnx` (PaddleOCR rec) | `extension/public/onnx/ocr_rec.onnx` | OCR Recognition (CTC head) |
| `custom_dict.txt` (one char per line) | `extension/public/onnx/ocr_dict.txt` | OCR Dictionary |

### 8.3 Steps After Drop-In

1. Copy the four files listed above into `extension/public/onnx/`.
2. Run `npm run build` in the extension root.
3. Reload the extension in Chrome (`chrome://extensions` → reload).

The engines load these files via `browser.runtime.getURL('/onnx/...')`.
If a file is absent, the corresponding engine degrades gracefully to status
`'degraded'` and returns empty results — **zero crashes**.

### 8.4 Verification

After dropping in the models and rebuilding:

1. Open the Mission Control dashboard (`🛰 Open Mission Control` in the popup).
2. The **Local Model Runtime** panel should show green `● LIVE` badges.
3. Run an agent task — the log should show `Local CV processed. Detected N UI element(s).`

### 8.5 Model Cards

Detailed model architecture cards (with TODO fields to fill after training):

- [UI Detector Model Card](extension/docs/models/MODEL_CARD_UI.md)
- [OCR Model Card](extension/docs/models/MODEL_CARD_OCR.md)
- [Full Drop-In Guide](extension/docs/MODEL_DROP_IN.md)

### 8.6 Graceful Degradation

Every model loader sets a status flag: `'live'` | `'degraded'`.

| Model | File | Degraded Behavior |
|-------|------|-------------------|
| UI Detector | `onnx/ui_detector.onnx` | `detectUIElements()` returns `[]`, status `'degraded'` |
| Face Detector | `mediapipe/face_landmarker.task` | `detectAndBlurFaces()` returns `[]`, status `'degraded'` |
| OCR Engine | `onnx/ocr_det.onnx` + `ocr_rec.onnx` | Falls back to Tesseract, then `[]`, status `'degraded'` |

The extension **MUST** build and run successfully with zero model files present.
2. Pay the one-time $5 registration fee
3. Verify your identity

#### Step 4: Upload

1. Click **New Item**
2. Upload `sih-agent-chrome.zip`
3. Fill in the store listing (see below)

**Store Description:**
```
Zero-Trust AI Web Agent - Your Privacy-First Browser Assistant

Tired of AI agents that steal your data? Our Zero-Trust AI Web Agent keeps YOUR sensitive information on YOUR device.

- PII Redaction: Aadhaar, PAN, SSN, phone numbers masked locally
- Face Blurring: MediaPipe-powered face detection and blurring
- OCR Protection: Scans images for PII and blacks them out
- Local UI Vision: WebGPU-powered element detection
- Redaction Legend: AI understands what is behind the black boxes
- Session Logging: Every run tracked with a unique ID
```

**Privacy Policy:**
```
This extension processes all sensitive data (Aadhaar, PAN, SSN, faces, etc.) LOCALLY on your device.
Only masked/redacted data is sent to the AI server. Raw images and PII are NEVER transmitted.
Session logs are stored locally in your browser storage.
```

#### Step 5: Submit for Review

- Provide a demo account if needed
- Explain the `activeTab` and `scripting` permissions
- Submit and wait 1-3 days for review

### 5.2 Edge Add-ons

Use the same `.output/chrome-mv3/` build (Edge supports MV3). Submit at [Edge Add-ons Developer Portal](https://partner.microsoft.com/en-us/dashboard/microsoftedge/overview).

### 5.3 Firefox Add-ons

#### Step 1: Build for Firefox

```bash
cd extension
npm run build -- -b firefox
```

This produces `.output/firefox-mv2/`.

#### Step 2: Zip and Submit

```bash
cd .output/firefox-mv2
zip -r ../../sih-agent-firefox.zip .
```

Submit at [Firefox Add-ons Developer Hub](https://addons.mozilla.org/developers/).

### 5.4 Store Listing Tips

| Tip | Details |
|-----|--------|
| Screenshots | Show the popup, the redaction in action, and the logs |
| Promo Video | 30-second demo of the agent completing a task |
| Keywords | "AI agent", "privacy", "PII redaction", "browser automation" |
| Category | Productivity, Developer Tools |
| Privacy | Be explicit about local processing |---

## 6. Environment Variables Reference

### Server (`/server/.env`)

| Variable | Required | Description | Default |
|----------|----------|-------------|----------|
| `PORT` | No | Server port | `3000` |
| `SECRET_PASSWORD` | Yes | Auth password (must match extension) | -- |
| `ROUTER_URL` | Yes | 9router base URL | -- |
| `ROUTER_API_KEY` | Yes | 9router API key | -- |

### Extension (compile-time constants)

| Constant | Location | Description |
|----------|----------|-------------|
| `SERVER_URL` | `src/entrypoints/background/index.ts` | Server endpoint |
| `SECRET_PASSWORD` | `src/entrypoints/background/index.ts` | Auth password |
| `MAX_STEPS` | `src/entrypoints/background/index.ts` | Max agent loop iterations |
| `STEP_DELAY_MS` | `src/entrypoints/background/index.ts` | Delay between steps |
| `telemetryData` / `LoopStatus` | `src/entrypoints/background/index.ts` | In-memory `{ apiCalls, totalPayloadSent, lastLatency, loopStatus }`; dashboard polls via `{ type: 'GET_TELEMETRY' }` |
| Dashboard route | `src/entrypoints/dashboard/` | WXT unlisted page → `/dashboard.html`; popup opens via `browser.tabs.create({ url: browser.runtime.getURL('/dashboard.html') })` |

---

## 7. Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| "Unauthorized" response | Password mismatch | Ensure `SECRET_PASSWORD` matches in extension and server |
| "Could not resolve" build error | Wrong import path | Check relative paths in imports |
| Extension not loading | Wrong output folder | Load `.output/chrome-mv3-dev/` for dev, `.output/chrome-mv3/` for prod |
| Face detection fails | CDN blocked | Ensure `cdn.jsdelivr.net` is accessible |
| OCR fails | CDN blocked | Ensure `unpkg.com` is accessible |
| WebGPU not available | Old browser | Falls back to WASM automatically |
| Server won`t start | Port in use | Change `PORT` in `.env` |
| Dashboard shows N/A memory | Firefox / non-Chromium | `performance.memory` is Chromium-only; Storage/Network/FPS cards still work |
| `npm run test` misses fixtures | Fresh clone | `pretest` rebuilds `data/scenarios.json` + `setup/fixtures/mock_scenarios_150.json`; run `npm run generate-scenarios` manually to inspect |
| `document is not defined` in tests | Wrong Vitest env | `unit/client.test.ts` + `unit/smart-wait.test.ts` are pinned to `jsdom` via `environmentMatchGlobs`; node env is intentional for the rest |

### Getting Help

- **GitHub Issues**: github.com/your-org/sih-zero-trust-agent/issues
- **WXT Docs**: wxt.dev
- **Hono Docs**: hono.dev

---

## License

MIT License -- See LICENSE for details.

---

> Built with love for Smart India Hackathon 2025