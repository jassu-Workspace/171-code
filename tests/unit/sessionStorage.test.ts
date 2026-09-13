import { describe, it, expect, afterEach } from 'vitest';
import { existsSync, rmSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  initSessionDir,
  saveSessionStep,
  finalizeSession,
  getStorageStats,
  listSessions,
  getSessionDetails,
} from '../../server/src/sessionStorage';

describe('Local Session Storage Engine', () => {
  const testSessionId = `test-session-${Date.now()}`;
  const sessionDir = join(process.cwd(), '..', 'storage', 'sessions', testSessionId);

  afterEach(() => {
    try {
      if (existsSync(sessionDir)) {
        rmSync(sessionDir, { recursive: true, force: true });
      }
    } catch {
      // ignore
    }
  });

  it('initializes session directory structure with segregated folders and meta', () => {
    initSessionDir(testSessionId, 'Test user goal');

    expect(existsSync(sessionDir)).toBe(true);
    expect(existsSync(join(sessionDir, 'raw-images'))).toBe(true);
    expect(existsSync(join(sessionDir, 'masked-images'))).toBe(true);
    expect(existsSync(join(sessionDir, 'vlm-images'))).toBe(true);
    expect(existsSync(join(sessionDir, 'raw_images'))).toBe(true);
    expect(existsSync(join(sessionDir, 'masked_images'))).toBe(true);
    expect(existsSync(join(sessionDir, 'vlm_images'))).toBe(true);
    expect(existsSync(join(sessionDir, 'prompts'))).toBe(true);
    expect(existsSync(join(sessionDir, 'responses'))).toBe(true);
    expect(existsSync(join(sessionDir, 'session_meta.json'))).toBe(true);
    expect(existsSync(join(sessionDir, 'prompts', 'user_goal.txt'))).toBe(true);

    const goal = readFileSync(join(sessionDir, 'prompts', 'user_goal.txt'), 'utf-8');
    expect(goal).toBe('Test user goal');
  });

  it('saves raw, masked, and vlm images, prompts, and VLM responses per step', () => {
    // 1x1 base64 transparent gif / test image
    const sampleBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

    saveSessionStep({
      sessionId: testSessionId,
      step: 1,
      task: 'Search for laptops',
      subTasks: ['Go to google', 'Type laptops'],
      rawImage: `data:image/jpeg;base64,${sampleBase64}`,
      maskedImage: sampleBase64,
      vlmImage: sampleBase64,
      vlmModel: 'gemini-2.5-flash',
      promptContext: 'Execute step 1 context',
      vlmResponse: '{"action":"type","selector":"input","text":"laptop"}',
      actionJson: { action: 'type', selector: 'input', text: 'laptop' },
    });

    // Check raw-images & raw_images
    expect(existsSync(join(sessionDir, 'raw-images', 'step_1_raw.jpg'))).toBe(true);
    expect(existsSync(join(sessionDir, 'raw_images', 'step_1_raw.jpg'))).toBe(true);

    // Check masked-images & masked_images
    expect(existsSync(join(sessionDir, 'masked-images', 'step_1_masked.jpg'))).toBe(true);
    expect(existsSync(join(sessionDir, 'masked_images', 'step_1_masked.jpg'))).toBe(true);

    // Check vlm-images & vlm_images
    expect(existsSync(join(sessionDir, 'vlm-images', 'step_1_vlm.jpg'))).toBe(true);
    expect(existsSync(join(sessionDir, 'vlm-images', 'step_1_vlm_meta.json'))).toBe(true);
    expect(existsSync(join(sessionDir, 'vlm_images', 'step_1_vlm.jpg'))).toBe(true);

    // Check prompts
    expect(existsSync(join(sessionDir, 'prompts', 'subtasks.txt'))).toBe(true);
    expect(existsSync(join(sessionDir, 'prompts', 'step_1_context.txt'))).toBe(true);
    // Check responses
    expect(existsSync(join(sessionDir, 'responses', 'step_1_vlm_response.txt'))).toBe(true);
    expect(existsSync(join(sessionDir, 'responses', 'step_1_action.json'))).toBe(true);

    // Verify content
    const actionJson = JSON.parse(readFileSync(join(sessionDir, 'responses', 'step_1_action.json'), 'utf-8'));
    expect(actionJson.action).toBe('type');
    expect(actionJson.text).toBe('laptop');

    const vlmMeta = JSON.parse(readFileSync(join(sessionDir, 'vlm-images', 'step_1_vlm_meta.json'), 'utf-8'));
    expect(vlmMeta.model).toBe('gemini-2.5-flash');
    expect(vlmMeta.isMasked).toBe(true);

    const meta = JSON.parse(readFileSync(join(sessionDir, 'session_meta.json'), 'utf-8'));
    expect(meta.totalSteps).toBe(1);
    expect(meta.status).toBe('active');
    expect(meta.imageStats?.rawImagesCount).toBe(1);
    expect(meta.imageStats?.maskedImagesCount).toBe(1);
    expect(meta.imageStats?.vlmImagesCount).toBe(1);
  });

  it('finalizes session and calculates total duration', () => {
    initSessionDir(testSessionId, 'Finalize test');
    finalizeSession(testSessionId, 'completed');

    const meta = JSON.parse(readFileSync(join(sessionDir, 'session_meta.json'), 'utf-8'));
    expect(meta.status).toBe('completed');
    expect(typeof meta.durationMs).toBe('number');
  });

  it('calculates storage stats including sessions count and total disk bytes', () => {
    initSessionDir(testSessionId, 'Stats test');
    const stats = getStorageStats();
    expect(stats.sessionsCount).toBeGreaterThanOrEqual(1);
    expect(stats.totalDiskBytes).toBeGreaterThanOrEqual(0);
  });

  it('lists sessions and retrieves session step details', () => {
    initSessionDir(testSessionId, 'List test');
    const sampleBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    saveSessionStep({
      sessionId: testSessionId,
      step: 1,
      task: 'List test',
      rawImage: sampleBase64,
      maskedImage: sampleBase64,
      vlmImage: sampleBase64,
      actionJson: { action: 'click', selector: '#buy' },
    });
    const sessions = listSessions();
    expect(sessions.length).toBeGreaterThanOrEqual(1);
    const found = sessions.find((s) => s.sessionId === testSessionId);
    expect(found).toBeDefined();

    const details = getSessionDetails(testSessionId);
    expect(details).not.toBeNull();
    expect(details?.meta.sessionId).toBe(testSessionId);
    expect(details?.steps.length).toBe(1);
    expect(details?.steps[0].action?.action).toBe('click');
    expect(details?.steps[0].hasRawImage).toBe(true);
    expect(details?.steps[0].hasMaskedImage).toBe(true);
    expect(details?.steps[0].hasVlmImage).toBe(true);
  });
});
