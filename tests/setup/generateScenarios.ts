/**
 * 150 Real-Time Scenario Generator — Phase 2 (Data Engine)
 * ---------------------------------------------------------------------------
 * Why a generator (not 150 hardcoded files)?
 * Hardcoding 150 massive payloads would crash the context window and rot
 * quickly. This script deterministically synthesizes 150 distinct daily-life
 * scenarios (IRCTC, HDFC, Aadhaar, Amazon, …) with:
 *   - a complex, messy `mock_masked_dom` string,
 *   - a `mock_redaction_legend` array covering dom_input / human_face / pii_image,
 *   - a dynamically mutated dummy base64 image (redacted ≠ raw),
 *   - mutated fake PII (12-digit Aadhaar, PAN, 16-digit card, email, phone).
 *
 * Determinism: seeded PRNG (mulberry32) → same output on every run.
 * Decoupling: this file lives ONLY in /tests and imports ONLY node:*.
 *   The core extension/server NEVER import from here.
 *
 * Run:
 *   cd tests && npm run generate-scenarios
 *   # → writes tests/data/scenarios.json (150 payloads)
 *
 * Pre-flight mapping (verified against production):
 * - background expects { task, maskedDom, redactedImage (NO data: header),
 *   redaction_legend: [{id,type,bbox}] } → POST /api/step
 * - content masking regexes (copied verbatim into applyProductionMasking()):
 *   EMAIL, PHONE (flexible + xxx-xxx-xxxx), CARD 16-digit
 * - OCR PII regexes: AADHAAR \b\d{12}\b, PAN \b[A-Z]{5}\d{4}[A-Z]\b
 * - legend IDs are sequential R1..Rn with bbox [x,y,w,h]
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------------------
// Paths (ESM-safe __dirname)
// ---------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUT_DIR = join(__dirname, '..', 'data');
const OUT_FILE = join(OUT_DIR, 'scenarios.json');

// ---------------------------------------------------------------------------
// Seeded PRNG — mulberry32 (deterministic across runs / CI)
// ---------------------------------------------------------------------------
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rand: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

function digits(rand: () => number, n: number): string {
  let s = '';
  for (let i = 0; i < n; i++) s += Math.floor(rand() * 10).toString();
  return s;
}

function letters(rand: () => number, n: number): string {
  const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let s = '';
  for (let i = 0; i < n; i++) s += A[Math.floor(rand() * A.length)];
  return s;
}

// ---------------------------------------------------------------------------
// 150 distinct daily-life scenario names (Indian + global coverage)
// ---------------------------------------------------------------------------
const SCENARIO_NAMES: readonly string[] = [
  'IRCTC Train Booking Tatkal',
  'HDFC Credit Card Payment',
  'Aadhaar Portal Address Update',
  'Amazon Checkout with COD',
  'Flipkart Big Billion Sale Order',
  'PAN Card Reprint Request',
  'Passport Seva Appointment',
  'UPI Payment via PhonePe',
  'SBI NEFT Fund Transfer',
  'Zomato Food Order with Address',
  'Swiggy Instamart Grocery Checkout',
  'Ola Cab Booking to Airport',
  'Uber Auto Fare Payment',
  'MakeMyTrip Flight Booking DEL-BOM',
  'Goibibo Hotel Booking in Goa',
  'RedBus Sleeper Bus Ticket',
  'IRCTC PNR Status Check',
  'Income Tax e-Filing ITR-1',
  'GST Return Filing GSTR-3B',
  'EPFO Passbook Download',
  'DigiLocker Document Fetch',
  'Voter ID Correction Form 8',
  'Driving Licence Renewal Parivahan',
  'FASTag Recharge via Paytm',
  'Metro Card Recharge Delhi',
  'Electricity Bill BESCOM Payment',
  'Water Bill BWSSB Payment',
  'Gas Cylinder HP Booking',
  'Jio Prepaid Recharge',
  'Airtel Postpaid Bill Payment',
  'BSNL Broadband Bill Pay',
  'DTH Recharge Tata Play',
  'LIC Premium Payment',
  'HDFC Life Insurance Claim',
  'ICICI Lombard Health Claim',
  'Mutual Fund SIP via Zerodha',
  'Groww Stock Purchase',
  'CRED Rent Payment',
  'Razorpay Merchant Checkout',
  'PayU EMI Checkout',
  'BookMyShow Movie Tickets',
  'PVR Seat Selection',
  'IRCTC Food Order in Train',
  'Yatra Holiday Package Booking',
  'OYO Room Booking',
  'Practo Doctor Appointment',
  '1mg Medicine Order Upload Prescription',
  'Apollo Lab Test Booking',
  'Cowin Vaccination Slot Booking',
  'Ayushman Card Download',
  'CBSE Class 10 Result Check',
  'JEE Mains Registration NTA',
  'NEET Admit Card Download',
  'UPSC Application Part-II',
  'SSC CGL Form Fill',
  'IBPS PO Registration',
  'NPTEL Course Enrollment',
  'Coursera Certificate Purchase',
  'Udemy Coupon Checkout',
  'LinkedIn Job Application',
  'Naukri Profile Update',
  'Indeed Resume Upload',
  'Upwork Proposal Submit',
  'Fiverr Gig Order',
  'GitHub Sponsors Payment',
  'AWS Bill Payment Console',
  'Google Cloud Billing Update',
  'Flipkart Seller Registration GST',
  'Amazon Seller Central Onboarding',
  'Meesho Supplier Order',
  'Myntra Return Request',
  'Ajio Coupon Apply',
  'BigBasket Slot Booking',
  'Blinkit Express Checkout',
  'DMart Ready Pickup Order',
  'Reliance JioMart Checkout',
  'PhonePe Wallet Cashback Redeem',
  'Google Pay Electricity Reward',
  'CRED Credit Score Check',
  'Experian Report Download',
  'CIBIL Dispute Raise',
  'SBI Card Block Lost Card',
  'Kotak 811 Account Opening',
  'Axis Netbanking Password Reset',
  'PNB KYC Update',
  'Canara Cheque Book Request',
  'Union Bank Statement Download',
  'NPS Contribution PRAN',
  'PPF Passbook Entry',
  'Sukanya Samriddhi Deposit',
  'Post Office RD Payment',
  'Western Union Money Transfer',
  'Wise International Remittance',
  'Book Flight via IndiGo Add-ons',
  'SpiceJet Web Check-in',
  'Vistara Meal Selection',
  'Air India Refund Request',
  'Hotel Taj Reservation Modify',
  'OYO Cancellation Refund',
  'Zomato Gold Membership',
  'Swiggy One Subscription',
  'Dunzo Package Delivery',
  'Porter Truck Booking',
  'Urban Company Salon Booking',
  'NoBroker Rent Agreement',
  'MagicBricks Owner Contact',
  '99acres Site Visit Schedule',
  'HDFC Home Loan EMI Pay',
  'SBI Home Loan Statement',
  'Car Loan Foreclosure Letter',
  'Bajaj Finserv EMI Card Apply',
  'DMI Personal Loan KYC',
  'Aadhaar-PAN Link Status Check',
  'Income Certificate MeeSeva',
  'Caste Certificate Download',
  'Domicile Certificate Apply',
  'Birth Certificate NDMC',
  'Marriage Registration Slot',
  'Ration Card eKYC',
  'Land Record Bhoomi RTC Fetch',
  'Court Case eCourts Search',
  'CPGRAMS Grievance Filing',
  'RTI Online Application',
  'Passport Police Verification Slot',
  'Visa Appointment VFS Global',
  'IRCTC Retiring Room Booking',
  'Airport Lounge Access via DreamFolks',
  'Railway Concession Form Senior Citizen',
  'Bus Pass BMTC Student Apply',
  'College Fee Payment Razorpay',
  'Hostel Allocation Portal',
  'Library Book Renewal OPAC',
  'Attendance Marking HRMS',
  'Leave Application Workday',
  'Payslip Download ADP',
  'Form 16 Download TRACES',
  'PF Withdrawal Claim Form 19',
  'Gratuity Nomination Update',
  'ESIC Dispensary Appointment',
  'Blood Donation Camp Register',
  'Eye Checkup Lenskart Booking',
  'Dental Appointment Clove',
  'Mental Health Amaha Session',
  'Diet Plan HealthifyMe Subscribe',
  'Gym Membership Cultfit Renew',
  'Insurance Renewal PolicyBazaar',
  'Car Insurance ACKO Buy',
  'Bike Challan Parivahan Pay',
  'Toll Receipt Download',
  'Donate to PM CARES Fund',
];

// ---------------------------------------------------------------------------
// Production masking — VERBATIM copy of extension/src/entrypoints/content/index.ts
// getMaskedDom() lines 47-68. Tests must adapt to prod, never the reverse.
// ---------------------------------------------------------------------------
function applyProductionMasking(input: string): string {
  let maskedText = input;
  maskedText = maskedText.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    '[EMAIL]',
  );
  maskedText = maskedText.replace(
    /(\+?\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g,
    '[PHONE]',
  );
  maskedText = maskedText.replace(/\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g, '[PHONE]');
  maskedText = maskedText.replace(/\b\d{4}[\s]?\d{4}[\s]?\d{4}[\s]?\d{4}\b/g, '[CARD]');
  return maskedText;
}

// Extended leak-scrub for Aadhaar/PAN (production handles these via OCR
// image blackout, not DOM masking — generator pre-masks them so the
// checked-in masked_dom is fully clean for the strict leak audit).
// ORDER MATTERS: longest secrets FIRST, otherwise production's greedy PHONE
// fragments 16-digit cards / 12-digit Aadhaar into "[PHONE]567" shards.
// Also covers the documented production gap: "+91 5-5" grouping
// ("+91 94858 71267") which production PHONE (3-3-4 only) misses.
function applyExtendedMasking(input: string): string {
  let out = input;
  out = out.replace(/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, '[CARD]');
  out = out.replace(/\b\d{4}\s\d{4}\s\d{4}\b/g, '[AADHAAR]');
  out = out.replace(/\b\d{12}\b/g, '[AADHAAR]');
  out = out.replace(/\b[A-Z]{5}\d{4}[A-Z]\b/g, '[PAN]');
  out = out.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL]');
  out = out.replace(/\+91[\s.-]?\d{5}[\s.-]?\d{5}\b/g, '[PHONE]');
  out = out.replace(
    /(\+?\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g,
    '[PHONE]',
  );
  out = out.replace(/\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g, '[PHONE]');
  out = out.replace(/\b[6-9]\d{9}\b/g, '[PHONE]');
  return out;
}

// ---------------------------------------------------------------------------
// Scenario payload shape (what tests consume)
// ---------------------------------------------------------------------------
export interface GeneratedScenario {
  id: number;
  scenario_name: string;
  task: string;
  /** Raw secrets — must NEVER appear in outbound fetch bodies (Phase 5). */
  raw_pii: {
    aadhaar_spaced: string;
    aadhaar_compact: string;
    pan: string;
    card_spaced: string;
    card_compact: string;
    email: string;
    phone10: string;
    phone_formatted: string;
  };
  raw_pii_list: string[];
  mock_raw_dom: string;
  mock_masked_dom: string;
  mock_redaction_legend: Array<{ id: string; type: string; bbox: number[] }>;
  /** Redacted image, RAW base64 with NO data: header (exactly what bg sends). */
  mock_image_base64: string;
  /** Original unredacted frame (for redacted ≠ raw assertion). */
  mock_raw_image_base64: string;
  mock_data_url: string;
  mock_raw_data_url: string;
}

const EMAIL_DOMAINS = ['gmail.com', 'yahoo.in', 'hdfcbank.com', 'irctc.co.in', 'example.com', 'outlook.com'] as const;
const FIRST = ['aarav', 'diya', 'kabir', 'ananya', 'vikram', 'priya', 'rohan', 'sneha', 'arjun', 'meera'] as const;
const TASK_VERBS = ['Complete', 'Pay for', 'Book', 'Track', 'Renew', 'Verify', 'Submit', 'Download receipt for'] as const;

function buildPII(rand: () => number, i: number) {
  // Aadhaar: 12 digits, first digit 2-9 (UIDAI never issues 0/1-leading).
  const a1 = String(2 + Math.floor(rand() * 8));
  const aadhaarCompact = a1 + digits(rand, 11);
  const aadhaarSpaced = `${aadhaarCompact.slice(0, 4)} ${aadhaarCompact.slice(4, 8)} ${aadhaarCompact.slice(8, 12)}`;
  // PAN: 5 letters + 4 digits + 1 letter.
  const pan = `${letters(rand, 5)}${digits(rand, 4)}${letters(rand, 1)}`;
  // Card: 16 digits.
  const cardCompact = digits(rand, 16);
  const cardSpaced = `${cardCompact.slice(0, 4)} ${cardCompact.slice(4, 8)} ${cardCompact.slice(8, 12)} ${cardCompact.slice(12, 16)}`;
  // Email: mutated per scenario.
  const email = `${pick(rand, FIRST)}.${pick(rand, FIRST)}${i}+test${Math.floor(rand() * 999)}@${pick(rand, EMAIL_DOMAINS)}`;
  // Phone: 10-digit starting 6-9 + formatted +91 variant.
  const phone10 = `${6 + Math.floor(rand() * 4)}${digits(rand, 9)}`;
  const phoneFormatted = `+91 ${phone10.slice(0, 5)} ${phone10.slice(5)}`;
  return { aadhaarSpaced, aadhaarCompact, pan, cardSpaced, cardCompact, email, phone10, phoneFormatted };
}

function buildMessyRawDom(rand: () => number, name: string, pii: ReturnType<typeof buildPII>, i: number): string {
  // Intentionally messy: nested divs, comments, inline scripts, unicode,
  // irregular whitespace, hidden inputs — mirrors real-world pages.
  const noise = `<!-- session:${digits(rand, 6)} cache:${letters(rand, 4)} -->`;
  const otp = digits(rand, 6);
  return [
    `<div class="page" data-scenario="${i + 1}">`,
    `  ${noise}`,
    `  <h1>${name} — नमस्ते 🙏 step ${i + 1}/150</h1>`,
    `  <form id="pay-${i}" action="/submit?x=${digits(rand, 4)}" method="POST">`,
    `    <label>Email <input type="email" name="email" value="${pii.email}" data-agent-id="agent-1" /></label>`,
    `    <label>Phone <input type="tel" name="phone" value="${pii.phoneFormatted}" /></label>`,
    `    <label>Aadhaar <input name="aadhaar" value="${pii.aadhaarSpaced}" autocomplete="off" /></label>`,
    `    <label>PAN <input name="pan" value="${pii.pan}" /></label>`,
    `    <label>Card <input inputmode="numeric" name="card" value="${pii.cardSpaced}" /></label>`,
    `    <input type="hidden" name="csrf" value="${letters(rand, 8)}${digits(rand, 8)}" />`,
    `    <p>Contact <a href="mailto:${pii.email}">${pii.email}</a> or call ${pii.phone10} (alt ${pii.phoneFormatted}). OTP ${otp}.</p>`,
    `    <p>Card on file ${pii.cardCompact} · Aadhaar ${pii.aadhaarCompact} · PAN ${pii.pan}</p>`,
    `    <button data-agent-id="agent-2">Pay ₹${100 + Math.floor(rand() * 9000)}.00</button>`,
    `    <a role="button" data-agent-id="agent-3">Cancel  </a>`,
    `  </form>`,
    `  <script>window.__cfg=${JSON.stringify({ s: i, t: Date.UTC(2026, 0, 1) })};</script>`,
    `  <div style="display:none">trap ${pii.email} ${pii.phone10}</div>`,
    `</div>`,
  ].join('\n');
}

function buildLegend(rand: () => number): GeneratedScenario['mock_redaction_legend'] {
  // Every scenario carries ALL THREE required types so both the per-scenario
  // and dataset-wide interpretations of the spec are satisfied.
  const box = (k: number): number[] => {
    const w = 40 + Math.floor(rand() * 220);
    const h = 18 + Math.floor(rand() * 90);
    const x = Math.floor(rand() * Math.max(1280 - w, 1));
    const y = Math.floor(rand() * Math.max(720 - h, 1));
    void k;
    return [x, y, Math.max(w, 1), Math.max(h, 1)];
  };
  return [
    { id: 'R1', type: 'dom_input', bbox: box(1) },
    { id: 'R2', type: 'human_face', bbox: box(2) },
    { id: 'R3', type: 'pii_image', bbox: box(3) },
  ];
}

function buildImages(i: number, pii: ReturnType<typeof buildPII>): { redacted: string; raw: string } {
  // Dynamically mutated per scenario (not one shared 1x1 string).
  // Server treats the payload as opaque base64; validity as an image is
  // irrelevant — uniqueness + redacted≠raw is what the audit asserts.
  const raw = Buffer.from(`RAW-FRAME-${i}-${pii.aadhaarCompact.slice(-4)}-${pii.pan}`).toString('base64');
  const redacted = Buffer.from(
    `REDACTED-FRAME-${i}-BLACKBOX-R1-R2-R3-${pii.pan.slice(-2)}`,
  ).toString('base64');
  return { redacted, raw };
}

function generateAll(): GeneratedScenario[] {
  if (SCENARIO_NAMES.length !== 150) {
    throw new Error(`SCENARIO_NAMES must hold exactly 150 entries (found ${SCENARIO_NAMES.length})`);
  }
  const rand = mulberry32(0x51_48_2026); // fixed seed → deterministic
  return SCENARIO_NAMES.map((scenario_name, idx) => {
    const i = idx; // 0-based
    const pii = buildPII(rand, i);
    const mock_raw_dom = buildMessyRawDom(rand, scenario_name, pii, i);
    const mock_masked_dom = applyExtendedMasking(mock_raw_dom);
    const mock_redaction_legend = buildLegend(rand);
    const { redacted, raw } = buildImages(i, pii);
    const task = `${pick(rand, TASK_VERBS)} "${scenario_name}" (user ${pii.email}, phone ${pii.phone10})`.replace(
      pii.email,
      '[EMAIL]',
    );
    // Task sent to the server must already be clean — scrub it too.
    const cleanTask = applyExtendedMasking(`${TASK_VERBS[i % TASK_VERBS.length]} "${scenario_name}"`);
    const raw_pii = {
      aadhaar_spaced: pii.aadhaarSpaced,
      aadhaar_compact: pii.aadhaarCompact,
      pan: pii.pan,
      card_spaced: pii.cardSpaced,
      card_compact: pii.cardCompact,
      email: pii.email,
      phone10: pii.phone10,
      phone_formatted: pii.phoneFormatted,
    };
    return {
      id: i + 1,
      scenario_name,
      task: cleanTask,
      raw_pii,
      raw_pii_list: [
        pii.aadhaarSpaced,
        pii.aadhaarCompact,
        pii.pan,
        pii.cardSpaced,
        pii.cardCompact,
        pii.email,
        pii.phone10,
        pii.phoneFormatted,
      ],
      mock_raw_dom,
      mock_masked_dom,
      mock_redaction_legend,
      mock_image_base64: redacted,
      mock_raw_image_base64: raw,
      mock_data_url: `data:image/jpeg;base64,${redacted}`,
      mock_raw_data_url: `data:image/jpeg;base64,${raw}`,
    } satisfies GeneratedScenario;
  });
}

function main(): void {
  const scenarios = generateAll();
  // Safety: IDs unique, names unique.
  const ids = new Set(scenarios.map((s) => s.id));
  const names = new Set(scenarios.map((s) => s.scenario_name));
  if (ids.size !== 150 || names.size !== 150) {
    throw new Error('Generator produced duplicate ids or scenario names');
  }
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, JSON.stringify(scenarios, null, 2), 'utf8');
  console.log(`[generateScenarios] Wrote ${scenarios.length} scenarios → ${OUT_FILE}`);
}

// Allow `tsx setup/generateScenarios.ts` direct execution.
main();
