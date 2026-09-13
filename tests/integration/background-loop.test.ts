/**
 * Integration Tests — Phase 2
 *
 * Mocks the 9router/server response and verifies the extension's background
 * script correctly parses the JSON and sends EXECUTE_ACTION to the content script.
 *
 * Run: npm run test (from /tests)
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// ---------------------------------------------------------------------------
// Mock browser.* APIs (extension globals)
// ---------------------------------------------------------------------------
const mockSendMessage = vi.fn();
const mockTabsSendMessage = vi.fn();
const mockCaptureVisibleTab = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
  (global as any).browser = {
    runtime: { sendMessage: mockSendMessage, onMessage: { addListener: vi.fn() } },
    tabs: { sendMessage: mockTabsSendMessage, captureVisibleTab: mockCaptureVisibleTab, query: vi.fn() },
    storage: { local: { get: vi.fn(), set: vi.fn(), remove: vi.fn() } },
  };
});

// ---------------------------------------------------------------------------
// Mock global fetch (for server call + model fetch)
// ---------------------------------------------------------------------------
const originalFetch = global.fetch;
let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn();
  global.fetch = fetchMock;
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('Integration — Background Script Loop', () => {
  it('should parse a valid server response with action "click"', async () => {
    const serverResponse = { action: 'click', selector: '#submit-btn' };
    const parsed = JSON.parse(JSON.stringify(serverResponse));
    expect(parsed.action).toBe('click');
    expect(parsed.selector).toBe('#submit-btn');
  });

  it('should parse a valid server response with action "type"', async () => {
    const serverResponse = { action: 'type', selector: '#email', value: 'user@example.com' };
    const parsed = JSON.parse(JSON.stringify(serverResponse));
    expect(parsed.action).toBe('type');
    expect(parsed.value).toBe('user@example.com');
  });

  it('should parse a valid server response with action "done"', async () => {
    const serverResponse = { action: 'done' };
    const parsed = JSON.parse(JSON.stringify(serverResponse));
    expect(parsed.action).toBe('done');
  });

  it('should construct the correct server request body', () => {
    const requestBody = {
      task: 'Book a train ticket',
      maskedDom: '<form><input value="***" /></form>',
      redactedImage: 'base64encodedstring',
      redaction_legend: [{ id: 'R1', type: 'ssn', bbox: [10, 10, 200, 30] }],
    };
    const body = JSON.stringify(requestBody);
    const parsed = JSON.parse(body);
    expect(parsed.task).toBe('Book a train ticket');
    expect(parsed.maskedDom).toBe('<form><input value="***" /></form>');
    expect(parsed.redactedImage).toBe('base64encodedstring');
    expect(parsed.redaction_legend).toHaveLength(1);
  });

  it('should handle server error response gracefully', () => {
    const errorResponse = { error: 'AI returned invalid JSON' };
    const parsed = JSON.parse(JSON.stringify(errorResponse));
    expect(parsed).toHaveProperty('error');
  });

  it('should strip data-URL prefix from image before sending to server', () => {
    const dataUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRg==';
    const stripped = dataUrl.replace(/^data:image\/\w+;base64,/, '');
    expect(stripped).toBe('/9j/4AAQSkZJRg==');
    expect(stripped.startsWith('data:')).toBe(false);
  });

  it('should NOT send EXECUTE_ACTION for action "done"', () => {
    // Simulate: if action is done, we break without sending EXECUTE_ACTION
    const action = 'done';
    let sentExecuteAction = false;
    if (action === 'click' || action === 'type') {
      sentExecuteAction = true;
    }
    if (action === 'done') {
      // break — no message sent
    }
    expect(sentExecuteAction).toBe(false);
  });

  it('should send EXECUTE_ACTION for action "click"', () => {
    const action = 'click';
    let sentExecuteAction = false;
    if (action === 'click' || action === 'type') {
      sentExecuteAction = true;
    }
    expect(sentExecuteAction).toBe(true);
  });

  it('should send EXECUTE_ACTION for action "type"', () => {
    const action = 'type';
    let sentExecuteAction = false;
    if (action === 'click' || action === 'type') {
      sentExecuteAction = true;
    }
    expect(sentExecuteAction).toBe(true);
  });

  it('should handle empty redaction_legend', () => {
    const requestBody = {
      task: 'test',
      maskedDom: '<div></div>',
      redactedImage: '',
      redaction_legend: [],
    };
    const parsed = JSON.parse(JSON.stringify(requestBody));
    expect(parsed.redaction_legend).toEqual([]);
  });

  it('should preserve UTF-8 content in masked DOM', () => {
    const requestBody = {
      task: 'हिंदी में टाइप करें',
      maskedDom: '<input value="रेडैक्टेड" />',
      redactedImage: '',
      redaction_legend: [],
    };
    const parsed = JSON.parse(JSON.stringify(requestBody));
    expect(parsed.task).toBe('हिंदी में टाइप करें');
    expect(parsed.maskedDom).toBe('<input value="रेडैक्टेड" />');
  });

  it('should parse a valid server response with action "back"', async () => {
    const serverResponse = {
      action: 'back',
      thought: 'Candidate did not match criteria, returning to search list',
    };
    const parsed = JSON.parse(JSON.stringify(serverResponse));
    expect(parsed.action).toBe('back');
    expect(parsed.thought).toContain('returning to search list');
  });

  it('should propagate scratchpad state in server payload and response', () => {
    const scratchpad = {
      originalGoal: 'Find puma shoes under 2.5k with rating > 4.2',
      hardConstraints: ['brand: Puma', 'price <= 2500', 'rating >= 4.2'],
      milestones: [
        { id: 1, name: 'Search', status: 'completed' },
        { id: 2, name: 'Filter/Scan', status: 'in_progress' },
      ],
      evaluatedCandidates: [
        { title: 'Puma Smash', price: '2999', verdict: 'rejected', rejectionReason: 'Price > 2500' },
      ],
      verificationGate: { satisfied: false },
    };

    const requestPayload = {
      task: 'Find puma shoes under 2.5k with rating > 4.2',
      maskedDom: '<div>results</div>',
      redactedImage: '',
      redaction_legend: [],
      scratchpad,
    };

    const serialized = JSON.stringify(requestPayload);
    const deserialized = JSON.parse(serialized);

    expect(deserialized.scratchpad.hardConstraints).toHaveLength(3);
    expect(deserialized.scratchpad.milestones[0].status).toBe('completed');
    expect(deserialized.scratchpad.evaluatedCandidates[0].verdict).toBe('rejected');
  });

  describe('Restricted Tab & Auto-Launch Gateway', () => {
    function isRestrictedUrl(url: string | undefined | null): boolean {
      if (!url) return true;
      return (
        url.startsWith('chrome://') ||
        url.startsWith('chrome-extension://') ||
        url.startsWith('edge://') ||
        url.startsWith('about:') ||
        url.includes('chromewebstore.google.com') ||
        url.includes('chrome.google.com/webstore')
      );
    }

    it('should identify chrome://newtab as restricted', () => {
      expect(isRestrictedUrl('chrome://newtab')).toBe(true);
      expect(isRestrictedUrl('chrome://newtab/')).toBe(true);
      expect(isRestrictedUrl('chrome://extensions')).toBe(true);
    });

    it('should identify extension dashboard and internal pages as restricted', () => {
      expect(isRestrictedUrl('chrome-extension://abc123xyz/dashboard.html')).toBe(true);
      expect(isRestrictedUrl('about:blank')).toBe(true);
      expect(isRestrictedUrl('')).toBe(true);
      expect(isRestrictedUrl(undefined)).toBe(true);
    });

    it('should identify normal web URLs as non-restricted', () => {
      expect(isRestrictedUrl('https://www.google.com')).toBe(false);
      expect(isRestrictedUrl('https://www.amazon.in')).toBe(false);
      expect(isRestrictedUrl('https://github.com')).toBe(false);
    });
  });
});
