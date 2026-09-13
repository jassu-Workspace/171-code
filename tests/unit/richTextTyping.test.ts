/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from 'vitest';

describe('Rich-Text DOM Indexing & Typing Engine', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('indexes Quill.js and contenteditable editors with placeholders', () => {
    // Emulate LinkedIn post creator modal
    document.body.innerHTML = `
      <div class="share-box-modal">
        <div class="share-creation-state__text-editor">
          <div class="ql-editor ql-blank" contenteditable="true" role="textbox" aria-multiline="true" data-placeholder="What do you want to talk about?">
            <p><br></p>
          </div>
        </div>
        <button class="share-actions__primary-action" disabled>Post</button>
      </div>
    `;

    const elements = document.querySelectorAll(
      'button, a, input, textarea, select, [contenteditable="true"], [contenteditable], [role="textbox"], [role="combobox"], [role="searchbox"], .ql-editor, .DraftEditor-root, .ProseMirror, [data-placeholder]'
    );

    expect(elements.length).toBeGreaterThanOrEqual(2);

    const editor = document.querySelector('.ql-editor') as HTMLElement;
    expect(editor).not.toBeNull();
    expect(editor.getAttribute('contenteditable')).toBe('true');

    const placeholder =
      editor.getAttribute('data-placeholder') ||
      editor.getAttribute('aria-placeholder') ||
      editor.getAttribute('aria-label') ||
      '';
    expect(placeholder).toBe('What do you want to talk about?');
  });

  it('simulates rich-text typing by updating Quill paragraphs and firing input events', () => {
    document.body.innerHTML = `
      <div class="ql-editor ql-blank" contenteditable="true" role="textbox" aria-multiline="true" data-placeholder="What do you want to talk about?">
        <p><br></p>
      </div>
    `;

    const editor = document.querySelector('.ql-editor') as HTMLElement;
    let inputFired = false;
    let changeFired = false;

    editor.addEventListener('input', () => {
      inputFired = true;
    });
    editor.addEventListener('change', () => {
      changeFired = true;
    });

    // Emulate typing engine action
    const textToInsert = 'ChatGPT-6 Astra is benchmark-leading, but sole reliance on closed AI poses sovereign risk.';
    editor.focus();

    // Emulate fallback paragraph injection
    editor.innerHTML = `<p>${textToInsert}</p>`;
    editor.classList.remove('ql-blank');

    editor.dispatchEvent(new Event('input', { bubbles: true }));
    editor.dispatchEvent(new Event('change', { bubbles: true }));

    expect(editor.textContent).toContain('ChatGPT-6 Astra');
    expect(editor.classList.contains('ql-blank')).toBe(false);
    expect(inputFired).toBe(true);
    expect(changeFired).toBe(true);
  });

  it('asynchronously finds elements after delayed modal mounting', async () => {
    // Start empty
    document.body.innerHTML = '<div>Feed Content</div>';

    // Simulate delayed modal appearance (like LinkedIn 300ms transition)
    setTimeout(() => {
      const modal = document.createElement('div');
      modal.className = 'ql-editor';
      modal.setAttribute('contenteditable', 'true');
      modal.setAttribute('role', 'textbox');
      document.body.appendChild(modal);
    }, 200);

    async function findElementWithRetry(selector: string, timeoutMs: number = 1000): Promise<Element | null> {
      const start = Date.now();
      while (Date.now() - start < timeoutMs) {
        const el = document.querySelector(selector);
        if (el) return el;
        await new Promise((r) => setTimeout(r, 50));
      }
      return null;
    }

    const found = await findElementWithRetry('.ql-editor', 1000);
    expect(found).not.toBeNull();
    expect((found as HTMLElement).classList.contains('ql-editor')).toBe(true);
  });

  it('perceives typed content in rich-text editor over static data-placeholder attribute', () => {
    // LinkedIn post modal with typed text inside .ql-editor that still has data-placeholder
    document.body.innerHTML = `
      <div class="ql-editor" contenteditable="true" role="textbox" data-placeholder="What do you want to talk about?">
        <p>ChatGPT-6 Astra is benchmark-leading, but sole reliance on closed AI poses sovereign risk.</p>
      </div>
    `;

    const editor = document.querySelector('.ql-editor') as HTMLElement;
    const placeholder =
      editor.getAttribute('data-placeholder') ||
      editor.getAttribute('aria-placeholder') ||
      editor.getAttribute('aria-label') ||
      '';
    const rawText = (editor.textContent || editor.innerText || '').trim();

    let elementText = '';
    let meta = '';
    if (rawText.length > 0 && rawText !== placeholder) {
      meta += ` data-has-content="true" data-char-count="${rawText.length}"`;
      elementText = `[Typed Content (${rawText.length} chars)]: ${rawText.slice(0, 120)}`;
    } else if (placeholder) {
      elementText = `(empty editor, placeholder: "${placeholder}")`;
    }

    expect(meta).toContain('data-has-content="true"');
    expect(meta).toContain('data-char-count="90"');
    expect(elementText).toContain('[Typed Content (90 chars)]: ChatGPT-6 Astra');
    expect(elementText).not.toContain('empty editor');
  });

  it('performs atomic clean replacement in rich-text contenteditable without concatenating repeated typing', () => {
    // Emulates rich text editor (e.g. Lexical / WhatsApp Web / Slack / Discord / ProseMirror)
    document.body.innerHTML = `
      <div id="rich-editor" contenteditable="true" role="textbox" class="x1hx0egq">
        <p class="selectable-text copyable-text">Initial Draft</p>
      </div>
    `;

    const editor = document.getElementById('rich-editor') as HTMLElement;
    expect(editor.textContent?.trim()).toBe('Initial Draft');

    // Simulate typing engine's atomic replacement protocol:
    // 1. Purge existing content
    while (editor.firstChild) {
      editor.removeChild(editor.firstChild);
    }
    expect(editor.textContent).toBe('');

    // 2. Insert new message
    const newMessage = 'Universal Automation Message';
    const p = document.createElement('p');
    p.textContent = newMessage;
    editor.appendChild(p);

    editor.dispatchEvent(new Event('input', { bubbles: true }));
    editor.dispatchEvent(new Event('change', { bubbles: true }));

    expect(editor.textContent).toBe('Universal Automation Message');
    // Verify it is NOT concatenated with initial draft
    expect(editor.textContent).not.toContain('Initial Draft');

    // Simulate a 2nd type call to the same editor
    const secondMessage = 'Updated Universal Message';
    while (editor.firstChild) {
      editor.removeChild(editor.firstChild);
    }
    const p2 = document.createElement('p');
    p2.textContent = secondMessage;
    editor.appendChild(p2);

    expect(editor.textContent).toBe('Updated Universal Message');
    expect(editor.textContent).not.toContain('Universal Automation Message');
  });

  it('dispatches full Enter keyboard sequence and activates contextual submit button in rich-text context', () => {
    // Emulates messaging interface with contenteditable and send button with data-icon="send"
    document.body.innerHTML = `
      <div class="chat-container">
        <div id="chat-input" contenteditable="true" role="textbox"></div>
        <button id="send-btn" aria-label="Send" type="button">
          <span data-icon="send"></span>
        </button>
      </div>
    `;

    const chatInput = document.getElementById('chat-input') as HTMLElement;
    const sendBtn = document.getElementById('send-btn') as HTMLElement;
    let sendClicked = false;
    sendBtn.addEventListener('click', () => {
      sendClicked = true;
    });

    let enterDownFired = false;
    let enterPressFired = false;
    let enterUpFired = false;

    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') enterDownFired = true;
    });
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') enterPressFired = true;
    });
    chatInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') enterUpFired = true;
    });

    // Simulate universal trailing Enter execution
    const enterDown = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true });
    const enterPress = new KeyboardEvent('keypress', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true });
    const enterUp = new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true });

    chatInput.dispatchEvent(enterDown);
    chatInput.dispatchEvent(enterPress);
    chatInput.dispatchEvent(enterUp);

    expect(enterDownFired).toBe(true);
    expect(enterPressFired).toBe(true);
    expect(enterUpFired).toBe(true);

    // Universal progression button finder
    const candidates = Array.from(document.querySelectorAll<HTMLElement>('button[aria-label*="Send" i], [data-icon="send"]'));
    const matchedBtn = candidates.find((b) => b.tagName.toLowerCase() === 'button') || candidates[0]?.closest('button');
    if (matchedBtn) matchedBtn.click();

    expect(sendClicked).toBe(true);
  });

  it('validates universal post-submission idempotency check when content appears in DOM transcript', () => {
    // Emulates chat DOM after sending message: input is now cleared, message appears in history
    const sentMessage = 'Hello world from universal test';
    const maskedText = `
      [agent-1] Contact: John Doe
      [agent-2] Message History:
      [agent-3] (Received 10:00 AM): Hi there!
      [agent-4] (Sent 10:01 AM): ${sentMessage}
      [agent-5] <div role="textbox" contenteditable="true"> (empty input)
    `;

    // Agent decision attempts to re-type the exact same message
    const aiDecision = {
      action: 'type',
      value: sentMessage,
    };

    const lastSubmittedContent = sentMessage;
    const attemptedText = aiDecision.value.trim().replace(/[\r\n]+$/, '');
    const normalizedSubmitted = lastSubmittedContent.trim().toLowerCase();
    const normalizedAttempted = attemptedText.toLowerCase();

    const isRepeatedSubmissionAttempt =
      normalizedSubmitted.length > 3 &&
      (normalizedAttempted === normalizedSubmitted ||
        normalizedAttempted.startsWith(normalizedSubmitted) ||
        normalizedSubmitted.startsWith(normalizedAttempted));

    expect(isRepeatedSubmissionAttempt).toBe(true);

    // Verify presence in transcript
    const isPresentInDOM = maskedText.toLowerCase().includes(normalizedSubmitted.slice(0, 30));
    expect(isPresentInDOM).toBe(true);

    // Overriding action to done
    if (isRepeatedSubmissionAttempt && isPresentInDOM) {
      aiDecision.action = 'done';
    }

    expect(aiDecision.action).toBe('done');
  });
});

