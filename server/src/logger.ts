/**
 * Server Request Logger — Phase 1 Utility
 *
 * Appends one JSON-lines record per incoming /api/step request to
 * /storage/server_logs.jsonl. Under Zero-Trust + space rules:
 *  - The base64 IMAGE is NEVER written to disk.
 *  - Only: session ID, timestamp, masked DOM, redaction legend, returned action.
 *
 * Decoupled constraint: this writes to /storage (relative to the server
 * process CWD). If /storage is deleted the logger degrades gracefully —
 * it never throws into the request pipeline.
 */
import { appendFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve /storage relative to the server project root (the parent of /src).
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..', '..');
const STORAGE_DIR_REL = join(__dirname, '..', 'storage');
const LOG_FILE = join(STORAGE_DIR_REL, 'server_logs.jsonl');

export interface ServerLogRecord {
  sessionId: string;
  timestamp: string;
  maskedDom: string;
  redactionLegend: Array<{ id: string; type: string; bbox: number[] }>;
  returnedAction: { action: string; selector?: string; id?: string; value?: string };
}

/** Ensure /storage exists and append a JSON-line log entry. */
export function logRequest(record: ServerLogRecord): void {
  try {
    if (!existsSync(STORAGE_DIR_REL)) {
      mkdirSync(STORAGE_DIR_REL, { recursive: true });
    }
    const line = JSON.stringify(record);
    appendFileSync(LOG_FILE, line + '\n', { encoding: 'utf8' });
  } catch (err) {
    // Never break the request pipeline — swallow storage errors.
    console.warn('[serverLogger] storage write failed:', err);
  }
}
