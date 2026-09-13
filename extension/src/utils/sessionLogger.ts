/**
 * Session Logger (Client) — Phase 1 Utility
 *
 * Generates a unique UUID per agent loop run and persists session data
 * LOCALLY via browser.storage.local. Under Zero-Trust rules:
 *  - Raw, unmasked images are NEVER saved.
 *  - Only the masked/redacted image and masked DOM text are persisted.
 *
 * This module is fully decoupled from the server: it only relies on
 * wxt/browser. Deleting the /storage folder or this util will never
 * break the core extension build.
 */
import { browser } from 'wxt/browser';

/**
 * Generate a RFC-4122 v4 UUID.
 */
export function generateSessionId(): string {
  // crypto.randomUUID when available (secure context / MV3 service worker)
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback v4 generator (works in any context)
  const getByte = (): number => Math.floor(Math.random() * 256);
  const bytes = new Array(16).fill(0).map(getByte);
  // Set version (4) and variant (RFC 4122)
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.map((b) => b.toString(16).padStart(2, '0'));
  return `${hex.slice(0, 4).join('')}-${hex
    .slice(4, 6)
    .join('')}-${hex.slice(6, 8).join('')}-${hex
    .slice(8, 10)
    .join('')}-${hex.slice(10, 16).join('')}`;
}

/** Shape of the session record persisted to browser.storage.local */
export interface AgentSession {
  sessionId: string;
  timestamp: number;
  userPrompt: string;
  subTasks: string[];
  maskedDomText: string;
  maskedImageBase64: string;
  returnedActions: Array<{ type: string; selector?: string; id?: string; value?: string }>;
}

export class SessionLogger {
  private static readonly STORAGE_KEY = 'agent_sessions';

  /** Append a completed session to client-side local storage with quota protection. */
  static async logSession(session: AgentSession): Promise<void> {
    try {
      // Fetch existing sessions
      const existing = await browser.storage.local.get(SessionLogger.STORAGE_KEY);
      let sessions: AgentSession[] = existing[SessionLogger.STORAGE_KEY] ?? [];

      // Append session
      sessions.push(session);

      // Quota Protection 1: Cap to latest 15 sessions
      if (sessions.length > 15) {
        sessions = sessions.slice(-15);
      }

      // Quota Protection 2: Strip heavy base64 images from older sessions (>3 old)
      for (let i = 0; i < Math.max(0, sessions.length - 3); i++) {
        if (sessions[i].maskedImageBase64) {
          sessions[i] = { ...sessions[i], maskedImageBase64: '' };
        }
      }

      try {
        await browser.storage.local.set({ [SessionLogger.STORAGE_KEY]: sessions });
      } catch (quotaErr) {
        console.warn('[SessionLogger] Storage quota exceeded, trimming sessions:', quotaErr);
        // Defensive recovery: retain only the latest 3 sessions stripped of heavy images
        sessions = sessions.slice(-3).map((s) => ({ ...s, maskedImageBase64: '' }));
        await browser.storage.local.set({ [SessionLogger.STORAGE_KEY]: sessions });
      }
    } catch (error) {
      console.warn('[SessionLogger] Could not append session to storage:', error);
    }
  }

  /** Retrieve all logged sessions (for debugging / audit). */
  static async getSessions(): Promise<AgentSession[]> {
    try {
      const existing = await browser.storage.local.get(SessionLogger.STORAGE_KEY);
      return existing[SessionLogger.STORAGE_KEY] ?? [];
    } catch {
      return [];
    }
  }

  /** Wipe all stored sessions. */
  static async clear(): Promise<void> {
    try {
      await browser.storage.local.remove(SessionLogger.STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }
}

export default SessionLogger;
