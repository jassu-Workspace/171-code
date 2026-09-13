import React, { useEffect, useRef, useState } from 'react';
import { browser } from 'wxt/browser';
import { useTheme } from '../../utils/theme';
import { ThemeToggle } from '../../components/ThemeToggle';
import { getHardwareProfile, detectHardwareTier, HardwareProfile } from '../../utils/hardwareTier';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type LoopStatus = 'Idle' | 'Scanning' | 'Redacting' | 'Thinking' | 'Executing';

interface TelemetryData {
  apiCalls: number;
  totalPayloadSent: number; // KB
  lastLatency: number; // ms
  loopStatus: LoopStatus;
}

interface MemoryState {
  supported: boolean;
  used: number; // bytes
  total: number; // bytes
  limit: number; // bytes
}

interface ModelStatusData {
  ui: 'live' | 'degraded';
  face: 'live' | 'degraded';
  ocr: 'live' | 'degraded';
  lastInferenceMs: number;
}

interface ServerTelemetry {
  status: string;
  timestamp: string;
  system: {
    totalMemBytes: number;
    freeMemBytes: number;
    usedMemBytes: number;
    memUsagePercent: number;
    cpuCount: number;
    cpuModel: string;
    loadAvg: number[];
    platform: string;
    arch: string;
  };
  process: {
    uptimeSeconds: number;
    heapUsedBytes: number;
    heapTotalBytes: number;
    rssBytes: number;
  };
  storage: {
    sessionsCount: number;
    totalDiskBytes: number;
  };
  aiProvider: {
    current: string;
    priority: string;
    model: string;
  };
}

const DEFAULT_TELEMETRY: TelemetryData = {
  apiCalls: 0,
  totalPayloadSent: 0,
  lastLatency: 0,
  loopStatus: 'Idle',
};

const DEFAULT_MODEL_STATUS: ModelStatusData = {
  ui: 'degraded',
  face: 'degraded',
  ocr: 'degraded',
  lastInferenceMs: 0,
};

/* ------------------------------------------------------------------ */
/* Architecture reference data                                         */
/* ------------------------------------------------------------------ */

const LIBRARIES: Array<{ name: string; detail: string; tag: string }> = [
  { name: 'WXT Framework', detail: 'Extension framework — entrypoints, MV3 build, HMR, auto-generated dashboard.html & Chrome New Tab override.', tag: 'Framework' },
  { name: 'React 18', detail: 'UI layer for Sidepanel, Popup, and Executive Mission Control (components + hooks).', tag: 'UI' },
  { name: 'TailwindCSS 3', detail: 'Utility styling configured with Sovereign Intelligence luxury light and dark palettes.', tag: 'Styling' },
  { name: 'ONNX Runtime Web', detail: 'Local CV inference runtime (WebGPU → WASM fallback, single-threaded in MV3 SW).', tag: 'Local CV' },
  { name: 'MediaPipe Tasks Vision', detail: 'FaceLandmarker running locally for facial biometric detection & redaction.', tag: 'Face Detection' },
  { name: 'Sovereign DBNet + SVTR/CRNN', detail: 'Custom-trained ONNX OCR engine (INT8 quantized) — detects and reads Sovereign PII, telemetry, and classified stamps.', tag: 'Sovereign OCR' },
  { name: 'Webextension-Polyfill', detail: 'Via wxt/browser — promise-based cross-browser MV3 APIs.', tag: 'Compatibility' },
];

const MODELS: Array<{ name: string; detail: string; where: string }> = [
  {
    name: 'YOLOv8n-Quantized (8-Class)',
    detail: 'Local UI Vision — detects buttons, inputs, links, images, dropdowns, options, checkboxes, tabs across ISRO sovereign portals.',
    where: 'WebGPU / WASM',
  },
  {
    name: 'MediaPipe FaceLandmarker',
    detail: 'Local Face Redaction — landmark bbox → solid black fill on the screenshot canvas.',
    where: 'Local / CPU',
  },
  {
    name: 'Sovereign DBNet + SVTR/CRNN',
    detail: 'Image OCR — blacks out image regions matching Sovereign PII, classified stamps, or geospatial coordinates.',
    where: 'Local / WASM',
  },
  {
    name: '9router Hybrid VLM',
    detail: 'Cloud reasoning only on masked DOM and redacted images (no raw PII ever leaves browser tab).',
    where: 'Cloud / 9router',
  },
];

const STRATEGIES: Array<{ name: string; detail: string }> = [
  {
    name: 'Zero-Trust Split-Brain Architecture',
    detail: 'Local Redaction (DOM masking, Canvas blur, face + OCR blackout) + Cloud Reasoning (VLM sees only masked artifacts). Raw PII never leaves the tab.',
  },
  {
    name: 'Greedy Step-by-Step Agentic Loop',
    detail: 'Max 10 steps: SCAN → REDACT → THINK (VLM) → EXECUTE → WAIT_FOR_STABLE. Aborts immediately on failed steps; all events logged locally.',
  },
  {
    name: 'Smart MutationObserver Latency Engine',
    detail: 'Replaces blind sleep timers: WAIT_FOR_STABLE resolves after 800 ms of DOM quiet (5 s hard timeout) once document.readyState === complete.',
  },
  {
    name: 'Semantic Redaction Legend Protocol',
    detail: 'Every redacted box is mapped to { id: R1..Rn, type, bbox } so the VLM reasons about redacted regions semantically without hallucination.',
  },
  {
    name: 'Hardware-Accelerated Canvas Blurring',
    detail: 'Native 2D canvas (blur filter + solid fill, devicePixelRatio scaling) prevents CPU spikes and keeps operations completely private.',
  },
];

const PRIVACY_TAXONOMY: Array<{ category: string; standard: string; rule: string; example: string }> = [
  { category: 'Aadhaar (UIDAI)', standard: 'Aadhaar Act 2016 / DPDP Act', rule: 'Verhoeff Checksum + 12-digit format', example: 'XXXX-XXXX-XXXX' },
  { category: 'PAN (Income Tax)', standard: 'IT Act 1961 Section 139A', rule: '5 Letters + 4 Digits + 1 Letter', example: 'ABCDE1234F' },
  { category: 'Credit/Debit Cards', standard: 'PCI-DSS v4.0 / RBI CoF', rule: 'Luhn Checksum + Major Card Bins', example: '4111-XXXX-XXXX-1111' },
  { category: 'UPI ID / VPA', standard: 'NPCI UPI Guidelines', rule: 'Alphanumeric @ PSP Handle (okhdfcbank/paytm/etc)', example: 'user@okhdfcbank' },
  { category: 'Bank Account Numbers', standard: 'RBI Master Direction (KYC)', rule: '9-18 digit account patterns with prefix context', example: 'A/C 123456789012' },
  { category: 'IFSC Codes', standard: 'RBI Clearing & Settlement', rule: '4 Letters + 0 + 6 Alphanumeric', example: 'HDFC0001234' },
  { category: 'GSTIN', standard: 'GST Act 2017 Section 22', rule: '2 Digits + 10-char PAN + 1 + Z + 1 Checksum', example: '27ABCDE1234F1Z5' },
  { category: 'ABHA Health ID', standard: 'Ayushman Bharat Digital Mission', rule: '14-digit NDHM / ABHA health identifier', example: '12-3456-7890-1234' },
  { category: 'Passwords & PINs', standard: 'ISO 27001 / OWASP ASVS', rule: 'Type=password, Pin inputs, CVV / CVC tokens', example: '••••••••' },
  { category: 'Phone Numbers', standard: 'TRAI / DPDP Act 2023', rule: '10-digit mobile with +91/0 prefix and word boundaries', example: '+91 98765 43210' },
  { category: 'Email Addresses', standard: 'RFC 5322 / DPDP Act', rule: 'Personal email identifier syntax regex', example: 'user@domain.com' },
  { category: 'Physical Addresses', standard: 'DPDP Act 2023 (PII)', rule: 'PIN codes, Street, Plot, Flat, Landmark regex', example: 'Flat 402, Royal Enclave' },
  { category: 'Facial Biometrics', standard: 'ISO 19794-5 / MediaPipe', rule: '468-point 3D facial landmark mesh detection', example: 'Live Viewport Face Mesh' },
  { category: 'Barcodes & QR Codes', standard: 'GS1 Standards / UPI QR', rule: 'Visual 2D Barcode & QR Code canvas localization', example: 'Payment & ID QR Codes' },
  { category: 'API Keys & Secrets', standard: 'Cloud Security Alliance', rule: 'OpenAI, AWS AKIA, GitHub ghp_, JWT Bearer tokens', example: 'sk-proj-XXXX / AKIA-XXXX' },
  { category: 'Private Keys', standard: 'PKCS#8 / FIPS 140-3', rule: 'RSA, EC, DSA, OpenSSH PEM header enclosures', example: '-----BEGIN PRIVATE KEY-----' },
  { category: 'SSN (US Expatriates)', standard: 'US Privacy Act of 1974', rule: '9-digit format (XXX-XX-XXXX)', example: '123-45-6789' },
  { category: 'Driving License (DL)', standard: 'Motor Vehicles Act 1988', rule: '2 State Letters + RTO Code + Year + 7 Digits', example: 'MH12 20110012345' },
  { category: 'Passport Number', standard: 'Passports Act 1967', rule: '1 Letter + 7 Digits Indian passport format', example: 'Z1234567' },
  { category: 'Voter ID (EPIC)', standard: 'Representation of People Act', rule: '3 Letters + 7 Digits ECI identifier', example: 'ABC1234567' },
  { category: 'Ration Card Number', standard: 'NFSA / PDS Portal', rule: 'State prefix + 10-12 digit household identifier', example: 'RC-1234567890' },
  { category: 'Vehicle Registration', standard: 'Vahan Portal Standard', rule: 'State Code + District + Series + 4 Digits', example: 'DL 01 AB 1234' },
  { category: 'Cryptographic Seed Phrase', standard: 'BIP-39 Standard', rule: '12 or 24 mnemonic word dictionary sequences', example: 'abandon ability able...' },
  { category: 'IP & MAC Addresses', standard: 'Network Security Baseline', rule: 'IPv4, IPv6, and IEEE 802 MAC addresses', example: '192.168.1.1 / MAC' },
  { category: 'Authentication Cookies/Tokens', standard: 'HTTP State Management RFC 6265', rule: 'connect.sid, JSESSIONID, session tokens', example: 'Bearer eyJhbGciOi...' },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatMB(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatKB(kb: number): string {
  if (kb < 1024) return `${kb.toFixed(2)} KB`;
  return `${(kb / 1024).toFixed(2)} MB`;
}

/* ------------------------------------------------------------------ */
/* Presentational Subcomponents                                       */
/* ------------------------------------------------------------------ */

function LuxuryCardShell(props: {
  title: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
  children: React.ReactNode;
  footer?: string;
}) {
  return (
    <div className="rounded-xl border border-champagne-border dark:border-royal-navy-800 bg-champagne-surface/90 dark:bg-royal-navy-900/80 backdrop-blur p-4 shadow-royal dark:shadow-royal-dark flex flex-col justify-between transition-all duration-200 hover:border-aureate-gold/50 dark:hover:border-aureate-gold/40 group">
      <div>
        <div className="flex items-center justify-between mb-3 border-b border-champagne-border/60 dark:border-royal-navy-800/60 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-base" aria-hidden>{props.icon}</span>
            <h3 className="text-xs font-serif font-bold tracking-wider uppercase text-royal-navy-800 dark:text-champagne-surface">
              {props.title}
            </h3>
          </div>
          {props.badge && (
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${props.badgeColor || 'bg-aureate-gold/10 text-aureate-dark border-aureate-gold/30'}`}>
              {props.badge}
            </span>
          )}
        </div>
        <div className="space-y-2">{props.children}</div>
      </div>
      {props.footer && (
        <div className="mt-3 pt-2 border-t border-champagne-border/40 dark:border-royal-navy-800/40 text-[10px] text-royal-navy-500 dark:text-royal-navy-400 font-mono truncate">
          {props.footer}
        </div>
      )}
    </div>
  );
}

function AccordionSection(props: {
  id: string;
  title: string;
  count: number;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-champagne-border dark:border-royal-navy-800 rounded-xl overflow-hidden bg-champagne-surface/80 dark:bg-royal-navy-900/60 shadow-sm transition-colors">
      <button
        onClick={props.onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-champagne-hover dark:hover:bg-royal-navy-800/50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <span className={`transition-transform duration-200 text-aureate-dark dark:text-aureate-gold text-xs ${props.open ? 'rotate-90' : ''}`}>
            ▶
          </span>
          <span className="font-serif font-semibold text-sm tracking-wide text-royal-navy dark:text-white">
            {props.title}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-champagne-sub dark:bg-royal-navy-800 border border-champagne-border dark:border-royal-navy-700 text-royal-navy-600 dark:text-royal-navy-300">
            {props.count} items
          </span>
        </div>
        <span className="text-royal-navy-400 dark:text-royal-navy-500 text-xs font-mono">
          {props.open ? 'COLLAPSE [-]' : 'EXPAND [+]'}
        </span>
      </button>
      {props.open && <div className="px-4 pb-4 pt-2 border-t border-champagne-border/70 dark:border-royal-navy-800/70">{props.children}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Mission Control Dashboard Component                            */
/* ------------------------------------------------------------------ */

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [telemetry, setTelemetry] = useState<TelemetryData>(DEFAULT_TELEMETRY);
  const [serverTelemetry, setServerTelemetry] = useState<ServerTelemetry | null>(null);
  const [serverStatus, setServerStatus] = useState<'online' | 'offline' | 'connecting'>('connecting');
  const [modelStatus, setModelStatus] = useState<ModelStatusData>(DEFAULT_MODEL_STATUS);
  const [hardwareProfile, setHardwareProfile] = useState<HardwareProfile>(getHardwareProfile());
  const [memory, setMemory] = useState<MemoryState>({ supported: true, used: 0, total: 0, limit: 0 });
  const [storageBytes, setStorageBytes] = useState<number>(0);
  const [fps, setFps] = useState<number>(60);
  const [sessions, setSessions] = useState<any[]>([]);
  const [logs, setLogs] = useState<string[]>([
    '[SOVEREIGN COMMAND] Telemetry link initialized. Zero-Trust security protocols active. Waiting for agent events...',
  ]);
  const [logFilter, setLogFilter] = useState<string>('');
  const [openSection, setOpenSection] = useState<string | null>('libraries');
  const [lastSync, setLastSync] = useState<string>(() => {
    const d = new Date();
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  });
  const feedRef = useRef<HTMLDivElement | null>(null);

  const isRunning = telemetry.loopStatus !== 'Idle';
  const memPct = memory.total > 0 ? Math.min(100, (memory.used / memory.total) * 100) : 0;

  /* Live session feed: listen for LOG_UPDATE from background */
  useEffect(() => {
    const listener = (message: { type?: string; payload?: unknown }) => {
      if (message?.type === 'LOG_UPDATE' && typeof message.payload === 'string') {
        const stamped = `[${new Date().toLocaleTimeString()}] ${message.payload}`;
        setLogs((prev) => [...prev.slice(-199), stamped]);
      }
    };
    browser.runtime.onMessage.addListener(listener as never);
    return () => {
      try {
        browser.runtime.onMessage.removeListener(listener as never);
      } catch {
        /* ignore */
      }
    };
  }, []);

  /* Probe host hardware tier and WebGPU acceleration on startup */
  useEffect(() => {
    detectHardwareTier().then((prof) => setHardwareProfile(prof)).catch(() => {});
  }, []);

  /* Auto-scroll terminal */
  useEffect(() => {
    const el = feedRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [logs]);

  /* 1-second telemetry polling */
  useEffect(() => {
    let cancelled = false;

    const pollOnce = async () => {
      // 0) Server & Host Telemetry (real host RAM, CPU, session storage, upstream AI)
      try {
        const res = await fetch('http://localhost:3000/api/system-telemetry', {
          headers: {
            'x-secret-password': '141207',
          },
        });
        if (res.ok) {
          const sysData = (await res.json()) as ServerTelemetry;
          if (!cancelled) {
            setServerTelemetry(sysData);
            setServerStatus('online');
          }
        } else {
          if (!cancelled) setServerStatus('offline');
        }
      } catch {
        if (!cancelled) setServerStatus('offline');
      }

      // 0b) Server Saved Sessions Vault
      try {
        const sessRes = await fetch('http://localhost:3000/api/sessions', {
          headers: {
            'x-secret-password': '141207',
          },
        });
        if (sessRes.ok) {
          const sessData = (await sessRes.json()) as { sessions?: any[] };
          if (!cancelled && sessData && Array.isArray(sessData.sessions)) {
            setSessions(sessData.sessions);
          }
        }
      } catch {
        /* server offline */
      }

      // 1) Memory — performance.memory fallback
      try {
        const mem = (performance as unknown as { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
        if (mem && typeof mem.usedJSHeapSize === 'number') {
          if (!cancelled) {
            setMemory({
              supported: true,
              used: mem.usedJSHeapSize,
              total: mem.totalJSHeapSize,
              limit: mem.jsHeapSizeLimit,
            });
          }
        } else if (!cancelled) {
          setMemory((prev) => (prev.supported === false ? prev : { ...prev, supported: false }));
        }
      } catch {
        if (!cancelled) setMemory((prev) => ({ ...prev, supported: false }));
      }

      // 2) Storage footprint
      try {
        const localApi = browser.storage?.local as unknown as {
          getBytesInUse?: (keys?: string | string[] | null) => Promise<number>;
        };
        if (localApi && typeof localApi.getBytesInUse === 'function') {
          const bytes = await localApi.getBytesInUse(null);
          if (!cancelled && typeof bytes === 'number') setStorageBytes(bytes);
        } else {
          const all = await browser.storage.local.get(null);
          const bytes = new TextEncoder().encode(JSON.stringify(all)).length;
          if (!cancelled) setStorageBytes(bytes);
        }
      } catch {
        try {
          const all = await browser.storage.local.get(null);
          const bytes = new TextEncoder().encode(JSON.stringify(all)).length;
          if (!cancelled) setStorageBytes(bytes);
        } catch {
          /* keep last */
        }
      }

      // 3) Network Telemetry
      try {
        const data = (await browser.runtime.sendMessage({ type: 'GET_TELEMETRY' })) as TelemetryData | undefined;
        if (!cancelled && data && typeof data.apiCalls === 'number') {
          setTelemetry({
            apiCalls: data.apiCalls ?? 0,
            totalPayloadSent: data.totalPayloadSent ?? 0,
            lastLatency: data.lastLatency ?? 0,
            loopStatus: (data.loopStatus as LoopStatus) ?? 'Idle',
          });
        }
      } catch {
        /* background SW asleep */
      }

      // 4) Model runtime status
      try {
        const modelData = (await browser.runtime.sendMessage({ type: 'GET_MODEL_STATUS' })) as ModelStatusData | undefined;
        if (!cancelled && modelData && typeof modelData.ui === 'string') {
          setModelStatus({
            ui: modelData.ui ?? 'degraded',
            face: modelData.face ?? 'degraded',
            ocr: modelData.ocr ?? 'degraded',
            lastInferenceMs: modelData.lastInferenceMs ?? 0,
          });
        }
      } catch {
        /* background SW asleep */
      }

      if (!cancelled) {
        setLastSync(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
      }
    };

    void pollOnce();
    const intervalId = setInterval(() => void pollOnce(), 1000);
    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, []);

  /* CPU/Load proxy via requestAnimationFrame */
  useEffect(() => {
    let raf = 0;
    let frames = 0;
    let windowStart = performance.now();

    const loop = (now: number) => {
      frames += 1;
      if (now - windowStart >= 1000) {
        const computed = Math.round((frames * 1000) / Math.max(now - windowStart, 1));
        setFps(computed);
        frames = 0;
        windowStart = now;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const toggle = (id: string) => setOpenSection((prev) => (prev === id ? null : id));

  const filteredLogs = logFilter
    ? logs.filter((l) => l.toLowerCase().includes(logFilter.toLowerCase()))
    : logs;

  const handleCopyLogs = () => {
    navigator.clipboard.writeText(logs.join('\n'));
  };

  return (
    <div className="min-h-screen bg-champagne-base dark:bg-royal-navy-950 text-royal-navy dark:text-gray-100 font-sans transition-colors duration-200">
      {/* Subtle fine geometric blueprint mesh */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(197,160,89,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.3) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ================= EXECUTIVE HEADER ================= */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-champagne-border dark:border-royal-navy-800 pb-5">
          <div className="flex items-start gap-3">
            {/* Heraldic Imperial Seal */}
            <div className="w-10 h-10 rounded-xl bg-royal-navy dark:bg-royal-navy-900 border border-aureate-gold flex items-center justify-center shadow-royal-gold mt-1">
              <svg className="w-5 h-5 text-aureate-gold" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-[0.3em] font-mono text-aureate-dark dark:text-aureate-gold-light uppercase font-bold">
                  Sovereign Intelligence // Zero-Trust Governance
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-aureate-gold/10 text-aureate-dark dark:text-aureate-gold border border-aureate-gold/30">
                  CHROME HOME
                </span>
              </div>
              <h1 className="mt-1 text-2xl sm:text-3xl font-serif font-black tracking-tight text-royal-navy dark:text-white">
                Mission Control <span className="text-aureate-dark dark:text-aureate-gold font-serif font-light">Cockpit</span>
              </h1>
              <p className="mt-0.5 text-xs text-royal-navy-600 dark:text-royal-navy-400 font-sans">
                Haute horlogerie telemetry · Local redaction + cloud reasoning · Last sync {lastSync}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Host Server Link Beacon */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-colors ${
                serverStatus === 'online'
                  ? 'border-emerald-400/50 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200'
                  : 'border-amber-400/50 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  serverStatus === 'online' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                }`}
              />
              <span>HOST: {serverStatus === 'online' ? 'LINKED (3000)' : 'STANDALONE'}</span>
            </div>

            {/* Loop Status Beacon */}
            <div
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border shadow-xs transition-colors ${
                isRunning
                  ? 'border-amber-400/50 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200'
                  : 'border-emerald-400/50 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${
                isRunning ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'
              }`} />
              <div className="text-xs font-mono">
                <span className="font-bold">{telemetry.loopStatus.toUpperCase()}</span>
                <span className="opacity-75 text-[11px] ml-1.5">
                  {isRunning ? '• In-Flight' : '• Secured'}
                </span>
              </div>
            </div>

            {/* Dark/Light Theme Toggle */}
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </header>

        {/* ================= 4 LUXURY TELEMETRY CARDS ================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* Card 1: AI Cryptographic Dispatch */}
          <LuxuryCardShell
            title="Cryptographic Dispatch"
            icon="🛰️"
            badge={serverTelemetry?.aiProvider?.current ? serverTelemetry.aiProvider.current : `${telemetry.apiCalls} calls`}
            badgeColor="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700"
            footer={serverTelemetry?.aiProvider?.priority || 'Zero Raw PII Outbound • Split-Brain Verified'}
          >
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-serif font-bold text-royal-navy dark:text-white">
                {telemetry.lastLatency} <span className="text-xs font-mono text-royal-navy-500 font-normal">ms</span>
              </span>
              <span className="text-xs font-mono text-royal-navy-600 dark:text-gray-400">Round-Trip</span>
            </div>
            <div className="text-xs font-mono text-royal-navy-500 dark:text-royal-navy-400 pt-1 flex justify-between">
              <span>Model:</span>
              <span className="font-semibold text-royal-navy-800 dark:text-gray-200 truncate max-w-[150px]" title={serverTelemetry?.aiProvider?.model || 'gemini-2.5-flash'}>
                {serverTelemetry?.aiProvider?.model || 'gemini-2.5-flash'}
              </span>
            </div>
            <div className="text-xs font-mono text-royal-navy-500 dark:text-royal-navy-400 flex justify-between">
              <span>Cloud Payload:</span>
              <span className="font-semibold text-royal-navy-800 dark:text-gray-200">{formatKB(telemetry.totalPayloadSent)}</span>
            </div>
          </LuxuryCardShell>

          {/* Card 2: Real Host Hardware & RAM */}
          <LuxuryCardShell
            title="Host Hardware & RAM"
            icon="🧠"
            badge={
              serverTelemetry
                ? `${serverTelemetry.system.memUsagePercent}% Host RAM`
                : memory.supported
                ? `${memPct.toFixed(0)}% V8 Heap`
                : 'N/A'
            }
            badgeColor="bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-700"
            footer={
              serverTelemetry
                ? `Node Heap: ${formatMB(serverTelemetry.process.heapUsedBytes)} • ${serverTelemetry.system.platform} (${serverTelemetry.system.arch})`
                : 'Standard Web Performance API (V8 Heap)'
            }
          >
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-serif font-bold text-royal-navy dark:text-white">
                {serverTelemetry
                  ? formatMB(serverTelemetry.system.usedMemBytes)
                  : memory.supported
                  ? formatMB(memory.used)
                  : 'Local'}
              </span>
              <span className="text-xs font-mono text-royal-navy-600 dark:text-gray-400">
                {serverTelemetry
                  ? `of ${formatMB(serverTelemetry.system.totalMemBytes)}`
                  : memory.supported
                  ? `of ${formatMB(memory.total)}`
                  : 'In-Tab Sandbox'}
              </span>
            </div>
            {/* Elegant Progress bar */}
            <div className="w-full bg-champagne-sub dark:bg-royal-navy-950 rounded-full h-1.5 mt-2 overflow-hidden border border-champagne-border dark:border-royal-navy-800">
              <div
                className="bg-aureate-gold h-full rounded-full transition-all duration-500"
                style={{
                  width: `${
                    serverTelemetry
                      ? serverTelemetry.system.memUsagePercent
                      : memory.supported
                      ? memPct
                      : 20
                  }%`,
                }}
              />
            </div>
            <div className="text-[11px] font-mono text-royal-navy-500 dark:text-royal-navy-400 pt-1 flex justify-between">
              <span>CPU Cores:</span>
              <span className="font-semibold text-royal-navy-800 dark:text-gray-200">
                {serverTelemetry ? `${serverTelemetry.system.cpuCount} Cores` : 'Host Machine'}
              </span>
            </div>
          </LuxuryCardShell>

          {/* Card 3: Storage & Session Vault */}
          <LuxuryCardShell
            title="Session Vault Storage"
            icon="🗄️"
            badge={serverTelemetry ? `${serverTelemetry.storage.sessionsCount} Sessions` : 'Local Sandbox'}
            badgeColor="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700"
            footer="storage/sessions/ • Strict Zero-Leak Enclave"
          >
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-serif font-bold text-royal-navy dark:text-white">
                {serverTelemetry
                  ? serverTelemetry.storage.totalDiskBytes > 1024 * 1024
                    ? formatMB(serverTelemetry.storage.totalDiskBytes)
                    : formatKB(serverTelemetry.storage.totalDiskBytes / 1024)
                  : formatKB(storageBytes / 1024)}
              </span>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                ✓ Local Disk
              </span>
            </div>
            <div className="text-xs font-mono text-royal-navy-500 dark:text-royal-navy-400 pt-1 flex justify-between">
              <span>Artifacts:</span>
              <span className="font-semibold text-royal-navy-800 dark:text-gray-200">raw, masked, txt</span>
            </div>
            <div className="text-[11px] font-mono text-royal-navy-500 dark:text-royal-navy-400 flex justify-between">
              <span>Extension Cache:</span>
              <span className="text-royal-navy-700 dark:text-gray-300">{formatKB(storageBytes / 1024)}</span>
            </div>
          </LuxuryCardShell>

          {/* Card 4: Neural Vision Engine & Adaptive Hardware Tier */}
          <LuxuryCardShell
            title="Local Vision Engine"
            icon="⚡"
            badge={hardwareProfile.badge}
            badgeColor="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700"
            footer={
              serverTelemetry
                ? `Server Uptime: ${Math.floor(serverTelemetry.process.uptimeSeconds / 60)}m ${serverTelemetry.process.uptimeSeconds % 60}s`
                : 'Adaptive Hardware Tiering (WebGPU / WASM)'
            }
          >
            <div className="grid grid-cols-3 gap-1 mt-1 text-[10px] font-mono text-center">
              <div className="p-1 rounded bg-champagne-sub dark:bg-royal-navy-950 border border-champagne-border dark:border-royal-navy-800">
                <div className="text-royal-navy-500 dark:text-royal-navy-400">UI YOLO</div>
                <div className={`font-bold ${modelStatus.ui === 'live' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600'}`}>
                  {modelStatus.ui.toUpperCase()}
                </div>
              </div>
              <div className="p-1 rounded bg-champagne-sub dark:bg-royal-navy-950 border border-champagne-border dark:border-royal-navy-800">
                <div className="text-royal-navy-500 dark:text-royal-navy-400">FACE</div>
                <div className={`font-bold ${modelStatus.face === 'live' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600'}`}>
                  {modelStatus.face.toUpperCase()}
                </div>
              </div>
              <div className="p-1 rounded bg-champagne-sub dark:bg-royal-navy-950 border border-champagne-border dark:border-royal-navy-800">
                <div className="text-royal-navy-500 dark:text-royal-navy-400">OCR</div>
                <div className={`font-bold ${modelStatus.ocr === 'live' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600'}`}>
                  {modelStatus.ocr.toUpperCase()}
                </div>
              </div>
            </div>
            <div className="text-[10px] font-mono text-royal-navy-500 dark:text-royal-navy-400 pt-1 flex justify-between">
              <span>Hardware Tier:</span>
              <span className="font-semibold text-royal-navy-800 dark:text-gray-200 truncate max-w-[170px]" title={hardwareProfile.label}>
                {hardwareProfile.badge}
              </span>
            </div>
            <div className="text-[10px] font-mono text-royal-navy-500 dark:text-royal-navy-400 flex justify-between">
              <span>Zero-Leak Shield:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                ACTIVE (Fail-Closed)
              </span>
            </div>
          </LuxuryCardShell>
        </section>

        {/* ================= COCKPIT SPLIT SECTION ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* LEFT 7 COLS: Live Session Terminal */}
          <div className="lg:col-span-7 flex flex-col rounded-xl border border-champagne-border dark:border-royal-navy-800 bg-champagne-surface dark:bg-royal-navy-900/80 shadow-royal dark:shadow-royal-dark overflow-hidden">
            {/* Terminal Header */}
            <div className="px-4 py-3 border-b border-champagne-border dark:border-royal-navy-800 bg-champagne-sub/80 dark:bg-royal-navy-900 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-aureate-gold animate-pulse" />
                <h2 className="font-serif font-bold text-xs uppercase tracking-wider text-royal-navy dark:text-white">
                  Real-Time Audit Stream & Telemetry
                </h2>
                <span className="text-[10px] font-mono text-royal-navy-500 dark:text-royal-navy-400">
                  ({filteredLogs.length} events)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Filter logs..."
                  value={logFilter}
                  onChange={(e) => setLogFilter(e.target.value)}
                  className="px-2 py-1 text-xs bg-champagne-surface dark:bg-royal-navy-950 border border-champagne-border dark:border-royal-navy-700 rounded-md text-royal-navy dark:text-white placeholder-gray-400 focus:outline-none focus:border-aureate-gold"
                />
                <button
                  onClick={handleCopyLogs}
                  title="Copy logs to clipboard"
                  className="text-xs font-mono text-royal-navy-600 dark:text-gray-300 hover:text-royal-navy dark:hover:text-white px-2 py-1 rounded bg-champagne-surface dark:bg-royal-navy-800 border border-champagne-border dark:border-royal-navy-700 transition"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Terminal Viewport */}
            <div
              ref={feedRef}
              className="p-4 overflow-y-auto font-mono text-xs space-y-1.5 h-[460px] bg-champagne-base dark:bg-royal-navy-950"
            >
              {filteredLogs.map((log, index) => {
                const isSuccess = log.includes('✅') || log.includes('Complete');
                const isWarn = log.includes('⚠') || log.includes('warning');
                const isError = log.includes('❌') || log.includes('Failed') || log.includes('error');
                const isStep = log.includes('Step ');

                return (
                  <div
                    key={index}
                    className={`leading-relaxed break-words rounded-lg px-2.5 py-1 border transition-colors ${
                      isSuccess
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700/60'
                        : isError
                        ? 'bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-300 border-red-300 dark:border-red-700/60'
                        : isWarn
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700/60'
                        : isStep
                        ? 'bg-champagne-surface dark:bg-royal-navy-900 text-royal-navy dark:text-cyan-300 border-aureate-gold/40'
                        : 'bg-champagne-surface/70 dark:bg-royal-navy-900/60 text-royal-navy-700 dark:text-gray-300 border-champagne-border dark:border-royal-navy-800'
                    }`}
                  >
                    {log}
                  </div>
                );
              })}
              {filteredLogs.length === 0 && (
                <div className="text-center py-12 text-royal-navy-400 dark:text-gray-500 font-serif italic">
                  No matching telemetry events.
                </div>
              )}
            </div>
          </div>

          {/* RIGHT 5 COLS: Architectural Accordions */}
          <div className="lg:col-span-5 space-y-3">
            {/* Accordion 1: Libraries */}
            <AccordionSection
              id="libraries"
              title="System Framework & Libraries"
              count={LIBRARIES.length}
              open={openSection === 'libraries'}
              onToggle={() => toggle('libraries')}
            >
              <div className="space-y-2 mt-1">
                {LIBRARIES.map((lib, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-champagne-sub dark:bg-royal-navy-950 border border-champagne-border dark:border-royal-navy-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-royal-navy dark:text-white">{lib.name}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-aureate-gold/10 text-aureate-dark dark:text-aureate-gold border border-aureate-gold/30">
                        {lib.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-royal-navy-600 dark:text-gray-400 font-sans">{lib.detail}</p>
                  </div>
                ))}
              </div>
            </AccordionSection>

            {/* Accordion 2: Models */}
            <AccordionSection
              id="models"
              title="Computer Vision & VLM Pipeline"
              count={MODELS.length}
              open={openSection === 'models'}
              onToggle={() => toggle('models')}
            >
              <div className="space-y-2 mt-1">
                {MODELS.map((model, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-champagne-sub dark:bg-royal-navy-950 border border-champagne-border dark:border-royal-navy-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-royal-navy dark:text-white">{model.name}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700">
                        {model.where}
                      </span>
                    </div>
                    <p className="text-[11px] text-royal-navy-600 dark:text-gray-400 font-sans">{model.detail}</p>
                  </div>
                ))}
              </div>
            </AccordionSection>

            {/* Accordion 3: Zero-Trust Strategies */}
            <AccordionSection
              id="strategies"
              title="Zero-Trust Execution Protocols"
              count={STRATEGIES.length}
              open={openSection === 'strategies'}
              onToggle={() => toggle('strategies')}
            >
              <div className="space-y-2 mt-1">
                {STRATEGIES.map((strat, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-champagne-sub dark:bg-royal-navy-950 border border-champagne-border dark:border-royal-navy-800">
                    <div className="font-serif font-bold text-xs text-royal-navy dark:text-white mb-1">
                      {strat.name}
                    </div>
                    <p className="text-[11px] text-royal-navy-600 dark:text-gray-400 font-sans">{strat.detail}</p>
                  </div>
                ))}
              </div>
            </AccordionSection>

            {/* Accordion 4: 25-Class Sovereign Privacy Taxonomy */}
            <AccordionSection
              id="taxonomy"
              title="25-Class Sovereign Privacy Taxonomy"
              count={PRIVACY_TAXONOMY.length}
              open={openSection === 'taxonomy'}
              onToggle={() => toggle('taxonomy')}
            >
              <div className="space-y-2 mt-1 max-h-96 overflow-y-auto pr-1">
                {PRIVACY_TAXONOMY.map((item, i) => (
                  <div key={i} className="p-2 rounded-lg bg-champagne-sub dark:bg-royal-navy-950 border border-champagne-border dark:border-royal-navy-800 text-xs">
                    <div className="flex items-center justify-between font-semibold text-royal-navy dark:text-white">
                      <span>{item.category}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                        Zero-Leak Enclave
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-aureate-dark dark:text-aureate-gold mt-0.5">
                      Standard: {item.standard}
                    </div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                      Enforcement: {item.rule}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionSection>
          </div>
        </section>

        {/* ================= RECORDED SOVEREIGN SESSIONS ARCHIVE ================= */}
        <section className="mt-6 rounded-xl border border-champagne-border dark:border-royal-navy-800 bg-champagne-surface dark:bg-royal-navy-900/80 shadow-royal dark:shadow-royal-dark overflow-hidden">
          <div className="px-4 py-3 border-b border-champagne-border dark:border-royal-navy-800 bg-champagne-sub/80 dark:bg-royal-navy-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">🗄️</span>
              <h2 className="font-serif font-bold text-xs uppercase tracking-wider text-royal-navy dark:text-white">
                Recorded Sovereign Sessions ({sessions.length})
              </h2>
            </div>
            <span className="text-[10px] font-mono text-royal-navy-500 dark:text-royal-navy-400">
              Audit Logs • storage/sessions/
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-champagne-sub dark:bg-royal-navy-950 text-royal-navy-600 dark:text-gray-400 border-b border-champagne-border dark:border-royal-navy-800 text-[10px] uppercase">
                <tr>
                  <th className="px-4 py-2.5">Session ID</th>
                  <th className="px-4 py-2.5">User Goal</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5">Steps</th>
                  <th className="px-4 py-2.5">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-champagne-border/60 dark:divide-royal-navy-800/60 text-[11px]">
                {sessions.map((s, idx) => (
                  <tr key={idx} className="hover:bg-champagne-hover dark:hover:bg-royal-navy-800/40 transition-colors">
                    <td className="px-4 py-2.5 text-aureate-dark dark:text-aureate-gold font-bold">
                      {s.sessionId?.slice(0, 18)}…
                    </td>
                    <td className="px-4 py-2.5 text-royal-navy dark:text-white max-w-xs truncate" title={s.task}>
                      {s.task || 'Autonomous Mission'}
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                        s.status === 'completed'
                          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                          : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                      }`}>
                        {(s.status || 'completed').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-royal-navy-700 dark:text-gray-300">
                      {s.totalSteps || s.actions?.length || 1} steps
                    </td>
                    <td className="px-4 py-2.5 text-gray-500 dark:text-gray-400">
                      {s.createdAt ? new Date(s.createdAt).toLocaleTimeString() : 'Recent'}
                    </td>
                  </tr>
                ))}
                {sessions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-400 dark:text-gray-500 font-serif italic">
                      No agent sessions recorded in vault yet. Run a mission from Sidepanel or Cockpit!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
