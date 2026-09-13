import { mkdirSync, writeFileSync, existsSync, readdirSync, statSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..', '..');
const SESSIONS_DIR = join(__dirname, '..', 'storage', 'sessions');

export interface StepStorageData {
  sessionId: string;
  step: number;
  task: string;
  subTasks?: string[];
  rawImage?: string;
  maskedImage?: string;
  vlmImage?: string;
  vlmModel?: string;
  promptContext?: string;
  vlmResponse?: string;
  actionJson?: Record<string, unknown>;
}

export interface SessionMeta {
  sessionId: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'completed' | 'aborted' | 'error';
  task: string;
  totalSteps: number;
  subTasks: string[];
  actions: Array<{ step: number; action: string; timestamp: string }>;
  summary?: string;
  durationMs?: number;
  imageStats?: {
    rawImagesCount: number;
    maskedImagesCount: number;
    vlmImagesCount: number;
  };
}

/**
 * Initializes a session directory structure under storage/sessions/<sessionId>/
 */
export function initSession(sessionId: string, initialTask: string = ''): string {
  const safeSessionId = sessionId.replace(/[^a-zA-Z0-9_-]/g, '_');
  const sessionPath = join(SESSIONS_DIR, safeSessionId);

  try {
    if (!existsSync(sessionPath)) {
      mkdirSync(sessionPath, { recursive: true });
    }

    const subDirs = [
      'raw-images',
      'masked-images',
      'vlm-images',
      'raw_images',
      'masked_images',
      'vlm_images',
      'prompts',
      'responses',
    ];
    for (const sub of subDirs) {
      const p = join(sessionPath, sub);
      if (!existsSync(p)) {
        mkdirSync(p, { recursive: true });
      }
    }

    const metaFile = join(sessionPath, 'session_meta.json');
    if (!existsSync(metaFile)) {
      const meta: SessionMeta = {
        sessionId: safeSessionId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active',
        task: initialTask,
        totalSteps: 0,
        subTasks: [],
        actions: [],
        imageStats: {
          rawImagesCount: 0,
          maskedImagesCount: 0,
          vlmImagesCount: 0,
        },
      };
      writeFileSync(metaFile, JSON.stringify(meta, null, 2), 'utf8');
    }

    if (initialTask) {
      writeFileSync(join(sessionPath, 'prompts', 'user_goal.txt'), initialTask, 'utf8');
    }
  } catch (err) {
    console.warn('[sessionStorage] initSession failed:', err);
  }

  return sessionPath;
}

/**
 * Saves all artifacts for a specific agent execution step:
 * raw images, masked images, vlm images, prompts, and VLM responses.
 */
export function saveSessionStep(data: StepStorageData): void {
  try {
    const safeSessionId = data.sessionId.replace(/[^a-zA-Z0-9_-]/g, '_');
    const sessionPath = initSession(safeSessionId, data.task);

    // Helper function to decode and save base64 image across directory targets
    const saveImageToDirs = (dirs: string[], filename: string, base64Str: string): number => {
      try {
        const cleanBase64 = base64Str.replace(/^data:image\/\w+;base64,/, '').trim();
        if (cleanBase64.length > 50) {
          const buffer = Buffer.from(cleanBase64, 'base64');
          for (const dir of dirs) {
            const dirPath = join(sessionPath, dir);
            if (!existsSync(dirPath)) mkdirSync(dirPath, { recursive: true });
            writeFileSync(join(dirPath, filename), buffer);
          }
          return buffer.length;
        }
      } catch (imgErr) {
        console.warn(`[sessionStorage] Failed to save image ${filename}:`, imgErr);
      }
      return 0;
    };

    // 1. Raw Picture: Must store every unredacted screenshot taken
    if (data.rawImage && data.rawImage.trim().length > 50) {
      saveImageToDirs(['raw-images', 'raw_images'], `step_${data.step}_raw.jpg`, data.rawImage);
    }

    // 2. Masked Picture: If any images are masked, store them in masked-images folder
    if (data.maskedImage && data.maskedImage.trim().length > 50) {
      saveImageToDirs(['masked-images', 'masked_images'], `step_${data.step}_masked.jpg`, data.maskedImage);
    }

    // 3. VLM Image: The exact image payload transmitted to the VLM (local or hosted)
    const vlmPayload = data.vlmImage || data.maskedImage || data.rawImage;
    if (vlmPayload && vlmPayload.trim().length > 50) {
      const vlmBytes = saveImageToDirs(['vlm-images', 'vlm_images'], `step_${data.step}_vlm.jpg`, vlmPayload);
      const vlmMeta = {
        step: data.step,
        timestamp: new Date().toISOString(),
        byteSize: vlmBytes,
        isMasked: Boolean(data.maskedImage && data.maskedImage.trim().length > 50),
        model: data.vlmModel || 'vlm-hybrid',
        hasRawOriginal: Boolean(data.rawImage && data.rawImage.trim().length > 50),
      };
      for (const dir of ['vlm-images', 'vlm_images']) {
        const dirPath = join(sessionPath, dir);
        if (!existsSync(dirPath)) mkdirSync(dirPath, { recursive: true });
        writeFileSync(join(dirPath, `step_${data.step}_vlm_meta.json`), JSON.stringify(vlmMeta, null, 2), 'utf8');
      }
    }

    // 3. User Prompt & Subtasks in TXT
    if (data.task) {
      writeFileSync(join(sessionPath, 'prompts', 'user_goal.txt'), data.task, 'utf8');
    }

    if (data.subTasks && data.subTasks.length > 0) {
      const subtasksText = data.subTasks.map((st, i) => `Milestone ${i + 1}: ${st}`).join('\n');
      writeFileSync(join(sessionPath, 'prompts', 'subtasks.txt'), subtasksText, 'utf8');
    }

    if (data.promptContext) {
      writeFileSync(join(sessionPath, 'prompts', `step_${data.step}_context.txt`), data.promptContext, 'utf8');
    }

    // 4. Response generated by the server VLM in TXT and JSON
    if (data.vlmResponse) {
      writeFileSync(join(sessionPath, 'responses', `step_${data.step}_vlm_response.txt`), data.vlmResponse, 'utf8');
    }

    if (data.actionJson) {
      writeFileSync(join(sessionPath, 'responses', `step_${data.step}_action.json`), JSON.stringify(data.actionJson, null, 2), 'utf8');
    }

    // 5. Update session_meta.json
    const metaFile = join(sessionPath, 'session_meta.json');
    let meta: SessionMeta;
    if (existsSync(metaFile)) {
      try {
        meta = JSON.parse(readFileSync(metaFile, 'utf8'));
      } catch {
        meta = {
          sessionId: safeSessionId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'active',
          task: data.task,
          totalSteps: 0,
          subTasks: [],
          actions: [],
        };
      }
    } else {
      meta = {
        sessionId: safeSessionId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active',
        task: data.task,
        totalSteps: 0,
        subTasks: [],
        actions: [],
      };
    }

    meta.updatedAt = new Date().toISOString();
    meta.totalSteps = Math.max(meta.totalSteps, data.step);
    if (data.subTasks && data.subTasks.length > 0) {
      meta.subTasks = data.subTasks;
    }
    if (data.actionJson && data.actionJson.action) {
      meta.actions.push({
        step: data.step,
        action: String(data.actionJson.action),
        timestamp: new Date().toISOString(),
      });
    }

    const countJpgs = (sub: string) => {
      try {
        const p = join(sessionPath, sub);
        return existsSync(p) ? readdirSync(p).filter((f) => f.endsWith('.jpg')).length : 0;
      } catch {
        return 0;
      }
    };
    meta.imageStats = {
      rawImagesCount: Math.max(countJpgs('raw-images'), countJpgs('raw_images')),
      maskedImagesCount: Math.max(countJpgs('masked-images'), countJpgs('masked_images')),
      vlmImagesCount: Math.max(countJpgs('vlm-images'), countJpgs('vlm_images')),
    };

    writeFileSync(metaFile, JSON.stringify(meta, null, 2), 'utf8');
  } catch (err) {
    console.warn('[sessionStorage] saveSessionStep failed:', err);
  }
}

/**
 * Finalizes the session with completed or aborted status
 */
export function finalizeSession(sessionId: string, status: 'completed' | 'aborted' | 'error', summary?: string): void {
  try {
    const safeSessionId = sessionId.replace(/[^a-zA-Z0-9_-]/g, '_');
    const sessionPath = join(SESSIONS_DIR, safeSessionId);
    const metaFile = join(sessionPath, 'session_meta.json');

    if (existsSync(metaFile)) {
      const meta: SessionMeta = JSON.parse(readFileSync(metaFile, 'utf8'));
      meta.status = status;
      meta.updatedAt = new Date().toISOString();
      if (meta.createdAt) {
        meta.durationMs = Math.max(0, new Date(meta.updatedAt).getTime() - new Date(meta.createdAt).getTime());
      }
      if (summary) meta.summary = summary;
      writeFileSync(metaFile, JSON.stringify(meta, null, 2), 'utf8');
    }
  } catch (err) {
    console.warn('[sessionStorage] finalizeSession failed:', err);
  }
}

export const initSessionDir = initSession;

/**
 * Calculates storage statistics across all saved sessions for the dashboard
 */
export function getStorageStats(): { sessionsCount: number; totalDiskBytes: number } {
  try {
    if (!existsSync(SESSIONS_DIR)) {
      return { sessionsCount: 0, totalDiskBytes: 0 };
    }

    const entries = readdirSync(SESSIONS_DIR);
    let count = 0;
    let totalBytes = 0;

    function calculateDirSize(dirPath: string): number {
      let bytes = 0;
      try {
        const files = readdirSync(dirPath);
        for (const file of files) {
          const fullPath = join(dirPath, file);
          const st = statSync(fullPath);
          if (st.isDirectory()) {
            bytes += calculateDirSize(fullPath);
          } else {
            bytes += st.size;
          }
        }
      } catch {
        // ignore
      }
      return bytes;
    }

    for (const entry of entries) {
      const fullPath = join(SESSIONS_DIR, entry);
      try {
        const st = statSync(fullPath);
        if (st.isDirectory()) {
          count += 1;
          totalBytes += calculateDirSize(fullPath);
        }
      } catch {
        // ignore
      }
    }

    return { sessionsCount: count, totalDiskBytes: totalBytes };
  } catch (err) {
    console.warn('[sessionStorage] getStorageStats failed:', err);
    return { sessionsCount: 0, totalDiskBytes: 0 };
  }
}

/**
 * Returns all saved sessions sorted by most recent
 */
export function listSessions(): SessionMeta[] {
  try {
    if (!existsSync(SESSIONS_DIR)) return [];
    const entries = readdirSync(SESSIONS_DIR);
    const sessions: SessionMeta[] = [];
    for (const entry of entries) {
      const metaFile = join(SESSIONS_DIR, entry, 'session_meta.json');
      if (existsSync(metaFile)) {
        try {
          const meta: SessionMeta = JSON.parse(readFileSync(metaFile, 'utf8'));
          sessions.push(meta);
        } catch {
          // ignore
        }
      }
    }
    return sessions.sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime());
  } catch {
    return [];
  }
}

/**
 * Retrieves detailed session data including step artifacts
 */
export function getSessionDetails(sessionId: string): {
  meta: SessionMeta;
  steps: Array<{
    step: number;
    hasRawImage: boolean;
    hasMaskedImage: boolean;
    hasVlmImage: boolean;
    action?: Record<string, unknown>;
  }>;
} | null {
  try {
    const safeSessionId = sessionId.replace(/[^a-zA-Z0-9_-]/g, '_');
    const sessionPath = join(SESSIONS_DIR, safeSessionId);
    const metaFile = join(sessionPath, 'session_meta.json');
    if (!existsSync(metaFile)) return null;

    const meta: SessionMeta = JSON.parse(readFileSync(metaFile, 'utf8'));
    const steps: Array<{
      step: number;
      hasRawImage: boolean;
      hasMaskedImage: boolean;
      hasVlmImage: boolean;
      action?: Record<string, unknown>;
    }> = [];

    for (let s = 1; s <= meta.totalSteps; s++) {
      const rawImg =
        existsSync(join(sessionPath, 'raw-images', `step_${s}_raw.jpg`)) ||
        existsSync(join(sessionPath, 'raw_images', `step_${s}_raw.jpg`));
      const maskedImg =
        existsSync(join(sessionPath, 'masked-images', `step_${s}_masked.jpg`)) ||
        existsSync(join(sessionPath, 'masked_images', `step_${s}_masked.jpg`));
      const vlmImg =
        existsSync(join(sessionPath, 'vlm-images', `step_${s}_vlm.jpg`)) ||
        existsSync(join(sessionPath, 'vlm_images', `step_${s}_vlm.jpg`));

      let action: Record<string, unknown> | undefined;
      const actionFile = join(sessionPath, 'responses', `step_${s}_action.json`);
      if (existsSync(actionFile)) {
        try {
          action = JSON.parse(readFileSync(actionFile, 'utf8'));
        } catch {
          // ignore
        }
      }
      steps.push({
        step: s,
        hasRawImage: rawImg,
        hasMaskedImage: maskedImg,
        hasVlmImage: vlmImg,
        action,
      });
    }

    return { meta, steps };
  } catch {
    return null;
  }
}
