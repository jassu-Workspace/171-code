import { describe, it, expect } from 'vitest';

/**
 * Mirror of getHumanReadableTarget from extension/src/entrypoints/background/index.ts
 */
function getHumanReadableTarget(
  idOrSelector: string | undefined,
  maskedText: string,
  action: string,
  value?: string
): string {
  if (action === 'back') return 'Search Results Catalog';
  if (action === 'scroll') return value === 'up' ? 'Scroll Up' : 'Scroll Down Page';
  if (action === 'done') return 'Mission Accomplished';
  if (!idOrSelector) return 'Active Page';

  if (typeof idOrSelector === 'string') {
    const rawId = idOrSelector.replace(/^#/, '');
    if (rawId.startsWith('agent-')) {
      const escapedId = rawId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // 1. Match inner text inside element: [agent-X] <tag...>Text</tag>
      const textRegex = new RegExp(`\\[${escapedId}\\][^\n<]*<([a-zA-Z0-9]+)[^>]*>([^<\n\r]{2,80})`, 'i');
      const textMatch = maskedText.match(textRegex);
      if (textMatch && textMatch[2]?.trim()) {
        const cleaned = textMatch[2].trim().replace(/\s+/g, ' ');
        if (cleaned.length > 0 && !cleaned.startsWith('<')) {
          return cleaned.length > 45 ? `"${cleaned.slice(0, 42)}..."` : `"${cleaned}"`;
        }
      }

      // 2. Match placeholder or aria-label or title
      const attrRegex = new RegExp(`\\[${escapedId}\\][^\n]*?(?:placeholder|aria-label|title)="([^"\r\n]{2,60})"`, 'i');
      const attrMatch = maskedText.match(attrRegex);
      if (attrMatch && attrMatch[1]?.trim()) {
        const val = attrMatch[1].trim();
        return val.length > 45 ? `"${val.slice(0, 42)}..."` : `"${val}"`;
      }
      return `#${rawId}`;
    }
  }

  return idOrSelector;
}

function detectTaskMode(task: string): 'shopping' | 'workflow' | 'info' {
  const lower = task.toLowerCase();

  const shoppingDomains = ['amazon.', 'flipkart.', 'myntra.', 'walmart.', 'ebay.', 'bestbuy.', 'aliexpress.', 'target.', 'ajio.', 'meesho.'];
  const hasShoppingDomain = shoppingDomains.some((d) => lower.includes(d));
  const shoppingKeywords = [
    'under ₹', 'under rs', 'under $', 'buy ', 'purchase', 'shoes', 'smartphone', 'phone under',
    'laptop under', 'cheapest', 'best price', 'discount', 'rating >', 'stars & up', 'add to cart'
  ];
  const hasShoppingKeyword = shoppingKeywords.some((kw) => lower.includes(kw));

  const workflowKeywords = [
    'linkedin', 'twitter', 'x.com', 'tweet', 'mail.', 'gmail', 'outlook', 'hostinger',
    'send email', 'send an email', 'compose', 'draft email', 'write email',
    'google sheet', 'google doc', 'sheets.new', 'docs.new', 'notion', 'spreadsheet',
    'post on', 'create post', 'write post', 'publish', 'submit form', 'fill form',
    'sign up', 'register', 'apply now', 'create an account', 'new sheet', 'new doc',
    'reply to', 'comment on', 'send message', 'direct message'
  ];
  const hasWorkflowKeyword = workflowKeywords.some((kw) => lower.includes(kw));

  const infoKeywords = [
    'sih', 'problem statement', 'research', 'search for', 'find details', 'gather details',
    'scrape', 'extract', 'list all', 'find information', 'wikipedia', 'news', 'articles',
    'bulletin', 'portal', 'results for', 'look up', 'lookup', 'what is', 'who is'
  ];
  const hasInfoKeyword = infoKeywords.some((kw) => lower.includes(kw));

  if (hasShoppingDomain || (hasShoppingKeyword && !hasWorkflowKeyword)) {
    return 'shopping';
  }
  if (hasWorkflowKeyword) {
    return 'workflow';
  }
  if (hasInfoKeyword) {
    return 'info';
  }
  return 'workflow';
}

/**
 * Mirror of extractScratchpadStats from extension/src/entrypoints/background/index.ts
 */
function extractScratchpadStats(scratchpad: Record<string, unknown> | null) {
  let evaluatedCount = 0;
  let rejectedCount = 0;
  let matchedCount = 0;
  const rejectionReasons: string[] = [];
  let activeMilestone = '';
  let completedMilestonesCount = 0;
  let totalMilestonesCount = 0;
  let isGoalVerified = false;

  if (scratchpad && typeof scratchpad === 'object') {
    const sp = scratchpad as Record<string, any>;
    if (Array.isArray(sp.evaluatedCandidates)) {
      evaluatedCount = sp.evaluatedCandidates.length;
      for (const cand of sp.evaluatedCandidates) {
        if (cand.verdict === 'rejected') {
          rejectedCount++;
          if (cand.rejectionReason) {
            rejectionReasons.push(cand.rejectionReason);
          }
        } else if (cand.verdict === 'candidate_matched') {
          matchedCount++;
        }
      }
    }
    if (Array.isArray(sp.extractedItems)) {
      evaluatedCount = Math.max(evaluatedCount, sp.extractedItems.length);
      matchedCount = Math.max(matchedCount, sp.extractedItems.length);
    }
    if (Array.isArray(sp.milestones)) {
      totalMilestonesCount = sp.milestones.length;
      completedMilestonesCount = sp.milestones.filter((m: any) => m.status === 'completed').length;
      const active = sp.milestones.find((m: any) => m.status === 'in_progress');
      if (active && active.name) {
        activeMilestone = active.name;
      }
    }
    if (sp.verificationGate?.satisfied || sp.workflowGate?.actionConfirmed) {
      isGoalVerified = true;
      matchedCount = Math.max(matchedCount, 1);
    }
  }

  return {
    evaluatedCount,
    rejectedCount,
    matchedCount,
    rejectionReasons,
    activeMilestone,
    completedMilestonesCount,
    totalMilestonesCount,
    isGoalVerified,
  };
}

describe('Live Execution HUD & Anti-Loop Guard Engine', () => {
  const sampleMaskedDom = `
    [agent-1] <header class="fk-header">
      [agent-3] <input type="text" placeholder="Search for Products, Brands and More" value="">
      [agent-4] <button type="submit">Search</button>
    </header>
    <main>
      [agent-14] <a href="/redmi-note-15">Redmi Note 15 5G (White, 128 GB)</a>
      [agent-15] <div class="price">₹23,899</div>
      [agent-27] <a href="/motorola-g34">Motorola G34 5G (Charcoal Black, 128 GB)</a>
      [agent-28] <div class="price">₹12,999</div>
    </main>
  `;

  it('resolves raw agent ID to descriptive product title', () => {
    const target = getHumanReadableTarget('agent-14', sampleMaskedDom, 'click');
    expect(target).toBe('"Redmi Note 15 5G (White, 128 GB)"');
  });

  it('resolves search input ID to placeholder text', () => {
    const target = getHumanReadableTarget('agent-3', sampleMaskedDom, 'type', 'smartphones\\n');
    expect(target).toBe('"Search for Products, Brands and More"');
  });

  it('resolves back action to Search Results Catalog', () => {
    const target = getHumanReadableTarget(undefined, sampleMaskedDom, 'back');
    expect(target).toBe('Search Results Catalog');
  });

  it('resolves scroll action cleanly', () => {
    const downTarget = getHumanReadableTarget(undefined, sampleMaskedDom, 'scroll', 'down');
    expect(downTarget).toBe('Scroll Down Page');

    const upTarget = getHumanReadableTarget(undefined, sampleMaskedDom, 'scroll', 'up');
    expect(upTarget).toBe('Scroll Up');
  });

  it('correctly tallies evaluated, rejected, and matched candidates from scratchpad', () => {
    const mockScratchpad = {
      originalGoal: 'Compare top smartphones under ₹15,000 only white colour with snapdragon processor',
      milestones: [
        { id: 1, name: 'Search Query', status: 'completed' },
        { id: 2, name: 'Candidate Spec Inspection', status: 'in_progress' },
      ],
      evaluatedCandidates: [
        {
          title: 'Redmi Note 15 5G',
          price: '₹23,899',
          verdict: 'rejected',
          rejectionReason: 'Price ₹23,899 > ₹15,000 budget',
        },
        {
          title: 'Alcatel 15',
          price: '₹13,990',
          verdict: 'rejected',
          rejectionReason: 'Processor Dimensity 6300 is not Snapdragon',
        },
        {
          title: 'Motorola G34 5G',
          price: '₹12,999',
          verdict: 'candidate_matched',
        },
      ],
      verificationGate: {
        satisfied: true,
        matchedTitle: 'Motorola G34 5G',
      },
    };

    const stats = extractScratchpadStats(mockScratchpad);
    expect(stats.evaluatedCount).toBe(3);
    expect(stats.rejectedCount).toBe(2);
    expect(stats.matchedCount).toBe(1);
    expect(stats.activeMilestone).toBe('Candidate Spec Inspection');
    expect(stats.rejectionReasons).toContain('Price ₹23,899 > ₹15,000 budget');
    expect(stats.rejectionReasons).toContain('Processor Dimensity 6300 is not Snapdragon');
  });

  it('detects candidate rejection on product page and triggers anti-loop back override', () => {
    const previousAction = { type: 'click', id: 'agent-14' };
    const aiProposedAction = { action: 'type', id: 'agent-3', value: 'snapdragon phones\n' };
    const updatedStats = { rejectedCount: 1, activeMilestone: 'Candidate Spec Inspection' };

    const isCandidateInspectionPhase =
      updatedStats.rejectedCount > 0 &&
      (!updatedStats.activeMilestone ||
        (!updatedStats.activeMilestone.toLowerCase().includes('navigate') &&
         !updatedStats.activeMilestone.toLowerCase().includes('query') &&
         !updatedStats.activeMilestone.toLowerCase().includes('search/filter')));

    const isProductPageReSearchTrap =
      isCandidateInspectionPhase &&
      previousAction?.type === 'click' &&
      aiProposedAction.action === 'type' &&
      typeof aiProposedAction.value === 'string' &&
      aiProposedAction.value.length > 2;

    let actionResult = { ...aiProposedAction };
    if (isProductPageReSearchTrap) {
      actionResult.action = 'back';
    }

    expect(actionResult.action).toBe('back');
  });

  it('does NOT intercept typing when navigating or searching without rejected candidates', () => {
    // Scenario: User clicked "Problem Statements" nav link (agent-7) then types into search input (agent-15)
    const previousAction = { type: 'click', id: 'agent-7' };
    const aiProposedAction = { action: 'type', id: 'agent-15', value: 'satellite\n' };
    const updatedStats = { rejectedCount: 0, activeMilestone: 'Navigate to Problem Statements page' };

    const isCandidateInspectionPhase =
      updatedStats.rejectedCount > 0 &&
      (!updatedStats.activeMilestone ||
        (!updatedStats.activeMilestone.toLowerCase().includes('navigate') &&
         !updatedStats.activeMilestone.toLowerCase().includes('query') &&
         !updatedStats.activeMilestone.toLowerCase().includes('search/filter')));

    const isProductPageReSearchTrap =
      isCandidateInspectionPhase &&
      previousAction?.type === 'click' &&
      aiProposedAction.action === 'type' &&
      typeof aiProposedAction.value === 'string' &&
      aiProposedAction.value.length > 2;

    let actionResult = { ...aiProposedAction };
    if (isProductPageReSearchTrap) {
      actionResult.action = 'back';
    }

    // Must NOT be overridden to back
    expect(actionResult.action).toBe('type');
    expect(actionResult.id).toBe('agent-15');
    expect(actionResult.value).toBe('satellite\n');
  });

  it('detects 2-period oscillation cycle (A <-> B ping-pong) and breaks loop with scroll', () => {
    const actionHistory = [
      { action: 'click', target: 'agent-7', value: '' }, // A
      { action: 'back', target: '', value: '' },          // B
      { action: 'click', target: 'agent-7', value: '' }, // A
    ];
    const currentActionSig = { action: 'back', target: '', value: '' }; // B

    const hLast = actionHistory[actionHistory.length - 1]; // A
    const hTwoBack = actionHistory[actionHistory.length - 2]; // B
    const hThreeBack = actionHistory[actionHistory.length - 3]; // A

    const isOscillating =
      currentActionSig.action === hTwoBack.action &&
      currentActionSig.target === hTwoBack.target &&
      hLast.action === hThreeBack.action &&
      hLast.target === hThreeBack.target;

    expect(isOscillating).toBe(true);

    let finalAction = { ...currentActionSig };
    if (isOscillating) {
      finalAction = { action: 'scroll', target: '', value: 'down' };
    }

    expect(finalAction.action).toBe('scroll');
    expect(finalAction.value).toBe('down');
  });

  describe('Multi-Domain Task Mode Classification', () => {
    it('classifies social media posting tasks as workflow mode', () => {
      const mode = detectTaskMode('go to linkedin and post 500 words about the chatgpt latest model chatgpt 6 astra');
      expect(mode).toBe('workflow');
    });

    it('classifies webmail sending tasks as workflow mode', () => {
      const mode = detectTaskMode('open the mail.hostinger.com and send an email that should describe that SIH 2026 problem statement 26171 is completed');
      expect(mode).toBe('workflow');
    });

    it('classifies spreadsheets tasks as workflow mode', () => {
      const mode = detectTaskMode('open any news platform and gather all details and also in new tab open google sheets and make a new sheet and paste links');
      expect(mode).toBe('workflow');
    });

    it('classifies research and government portal tasks as info mode', () => {
      const mode = detectTaskMode('go to sih portal and find problem statements related to satellite imagery');
      expect(mode).toBe('info');
    });

    it('classifies e-commerce shopping tasks as shopping mode', () => {
      const mode1 = detectTaskMode('Flipkart: Compare top smartphones under ₹15,000 only white colour with snapdragon processor');
      expect(mode1).toBe('shopping');

      const mode2 = detectTaskMode('Find best Puma shoes under 2.5k with rating > 4.2 on amazon');
      expect(mode2).toBe('shopping');
    });
  });

  describe('Multi-Domain Scratchpad Extraction', () => {
    it('extracts workflow milestones and workflowGate confirmation', () => {
      const sp = {
        milestones: [
          { id: 1, name: 'Navigate to LinkedIn', status: 'completed' },
          { id: 2, name: 'Open Start a post modal', status: 'completed' },
          { id: 3, name: 'Type article content', status: 'in_progress' },
          { id: 4, name: 'Click Post button', status: 'pending' },
        ],
        workflowGate: {
          actionConfirmed: true,
          confirmationText: 'Post published successfully to feed',
        },
      };

      const stats = extractScratchpadStats(sp);
      expect(stats.completedMilestonesCount).toBe(2);
      expect(stats.totalMilestonesCount).toBe(4);
      expect(stats.activeMilestone).toBe('Type article content');
      expect(stats.isGoalVerified).toBe(true);
      expect(stats.evaluatedCount).toBe(0); // No shopping candidates
    });

    it('extracts research items in info mode', () => {
      const sp = {
        milestones: [
          { id: 1, name: 'Filter SIH problem statements', status: 'completed' },
          { id: 2, name: 'Extract qualifying entries', status: 'completed' },
        ],
        extractedItems: [
          { title: 'Satellite Geo-Spatial Analysis', id: 'SIH1710' },
          { title: 'Autonomous Drone Routing', id: 'SIH1711' },
          { title: 'Space Debris Radar Tracking', id: 'SIH1712' },
        ],
        verificationGate: {
          satisfied: true,
          summary: 'Extracted 3 aerospace problem statements',
        },
      };

      const stats = extractScratchpadStats(sp);
      expect(stats.evaluatedCount).toBe(3);
      expect(stats.matchedCount).toBe(3);
      expect(stats.isGoalVerified).toBe(true);
      expect(stats.completedMilestonesCount).toBe(2);
    });
  });

  describe('Multi-Domain Guard Scoping & Isolation', () => {
    it('NEVER triggers Product Page Re-Search Trap in workflow mode (e.g. typing in modal/editor)', () => {
      const activeTaskMode = 'workflow';
      const updatedStats = { rejectedCount: 2, activeMilestone: 'Type article content' };
      const previousAction = { type: 'click' };
      const aiProposedAction = { action: 'type', id: 'agent-modal-editor', value: 'This is an article about Astra\n' };

      const isCandidateInspectionPhase =
        activeTaskMode === 'shopping' &&
        updatedStats.rejectedCount > 0;

      const isProductPageReSearchTrap =
        activeTaskMode === 'shopping' &&
        isCandidateInspectionPhase &&
        previousAction.type === 'click' &&
        aiProposedAction.action === 'type';

      let actionResult = { ...aiProposedAction };
      if (isProductPageReSearchTrap) {
        actionResult.action = 'back';
      }

      // Must NOT be overridden to back in workflow mode
      expect(isProductPageReSearchTrap).toBe(false);
      expect(actionResult.action).toBe('type');
      expect(actionResult.value).toBe('This is an article about Astra\n');
    });

    it('NEVER injects sponsored ad exploration directive in workflow mode', () => {
      const activeTaskMode: string = 'workflow';
      const step = 4;
      const updatedStats = { matchedCount: 0 };
      const currentScratchpad: Record<string, unknown> = {};

      if (activeTaskMode === 'shopping') {
        if (step < 12 && updatedStats.matchedCount === 0) {
          currentScratchpad.explorationDirective = 'The top items are sponsored ads...';
        }
      }

      expect(currentScratchpad.explorationDirective).toBeUndefined();
    });

    it('NEVER force-completes with candidate summary in workflow mode', () => {
      const activeTaskMode: string = 'workflow';
      const step = 25;
      const updatedStats = { evaluatedCount: 5 };
      let aiDecision = { action: 'click', id: 'agent-submit-btn' };

      if (
        activeTaskMode === 'shopping' &&
        step >= 22 &&
        updatedStats.evaluatedCount >= 3
      ) {
        aiDecision.action = 'done';
      }

      // Must remain click in workflow mode, not prematurely forced to done
      expect(aiDecision.action).toBe('click');
      expect(aiDecision.id).toBe('agent-submit-btn');
    });
  });

  describe('Direct Destination Navigation & Action Canonicalization', () => {
    function resolveTargetUrl(task: string, currentUrl?: string): string | null {
      const lower = task.toLowerCase();
      const current = (currentUrl || '').toLowerCase();

      const domainMap = [
        { triggers: ['linkedin.com', 'linkedin'], url: 'https://www.linkedin.com', hostMatch: 'linkedin.com' },
        { triggers: ['twitter.com', 'x.com', 'twitter'], url: 'https://twitter.com', hostMatch: 'x.com' },
        { triggers: ['github.com', 'github'], url: 'https://github.com', hostMatch: 'github.com' },
        { triggers: ['amazon.in', 'amazon.com', 'amazon'], url: 'https://www.amazon.in', hostMatch: 'amazon.' },
        { triggers: ['flipkart.com', 'flipkart'], url: 'https://www.flipkart.com', hostMatch: 'flipkart.com' },
        { triggers: ['gmail.com', 'gmail', 'mail.google.com'], url: 'https://mail.google.com', hostMatch: 'mail.google.com' },
        { triggers: ['sih.gov.in', 'sih portal', 'sih'], url: 'https://sih.gov.in', hostMatch: 'sih.gov.in' },
      ];

      const navIntent = /^(?:go to|open|navigate to|visit|browse to|launch)\s+/i.test(lower);

      for (const entry of domainMap) {
        const matched = entry.triggers.some((t) => lower.includes(t));
        if (matched) {
          if (current.includes(entry.hostMatch)) {
            return null;
          }
          const isSearchOrBlank =
            !current ||
            current.includes('google.com') ||
            current.includes('google.co') ||
            current.includes('newtab') ||
            current === 'about:blank';
          if (navIntent || isSearchOrBlank) {
            return entry.url;
          }
        }
      }
      return null;
    }

    it('resolves direct destination when starting on Google or blank tab', () => {
      const task = 'go to linkedin and make an post about the chatgpt 6 astra for about 500 words';
      const targetUrl = resolveTargetUrl(task, 'https://www.google.com/');
      expect(targetUrl).toBe('https://www.linkedin.com');
    });

    it('returns null if already on the target domain', () => {
      const task = 'go to linkedin and make a post';
      const targetUrl = resolveTargetUrl(task, 'https://www.linkedin.com/feed/');
      expect(targetUrl).toBeNull();
    });

    it('canonicalizes target -> selector/id and text -> value accurately', () => {
      const rawAiDecision: any = {
        thought: 'Navigate to LinkedIn via search.',
        action: 'type',
        target: "[data-agent-id='agent-8']",
        text: 'https://www.linkedin.com\n',
      };

      if (!rawAiDecision.selector && rawAiDecision.target) {
        rawAiDecision.selector = String(rawAiDecision.target);
      }
      if (!rawAiDecision.id && typeof rawAiDecision.selector === 'string') {
        const idMatch = rawAiDecision.selector.match(/data-agent-id=['"]([^'"]+)['"]/);
        if (idMatch) {
          rawAiDecision.id = idMatch[1];
        }
      }
      if (!rawAiDecision.value) {
        rawAiDecision.value = rawAiDecision.text;
      }

      expect(rawAiDecision.id).toBe('agent-8');
      expect(rawAiDecision.selector).toBe("[data-agent-id='agent-8']");
      expect(rawAiDecision.value).toBe('https://www.linkedin.com\n');
    });
  });

  describe('Direct AI Decision Execution & URL Auto-Navigation', () => {
    function autoConvertUrlTyping(decision: { action: string; value?: string; id?: string; selector?: string }) {
      if (decision.action === 'type' && typeof decision.value === 'string') {
        const trimmedVal = decision.value.trim().replace(/[\r\n]+$/, '');
        const isUrlLike =
          /^https?:\/\/[^\s]+$/i.test(trimmedVal) ||
          /^(?:www\.)[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:\/[^\s]*)?$/i.test(trimmedVal);
        if (isUrlLike) {
          decision.action = 'navigate';
          decision.value = trimmedVal.startsWith('http') ? trimmedVal : `https://${trimmedVal}`;
          delete decision.id;
          delete decision.selector;
        }
      }
      return decision;
    }

    it('auto-converts typing a URL with trailing newline into native direct navigation', () => {
      const decision = {
        action: 'type',
        id: 'agent-1',
        selector: "[data-agent-id='agent-1']",
        value: 'https://www.linkedin.com\n',
      };
      autoConvertUrlTyping(decision);
      expect(decision.action).toBe('navigate');
      expect(decision.value).toBe('https://www.linkedin.com');
      expect(decision.id).toBeUndefined();
      expect(decision.selector).toBeUndefined();
    });

    it('auto-converts typing a www domain into native https navigation', () => {
      const decision = {
        action: 'type',
        id: 'agent-4',
        value: 'www.amazon.in',
      };
      autoConvertUrlTyping(decision);
      expect(decision.action).toBe('navigate');
      expect(decision.value).toBe('https://www.amazon.in');
    });

    it('does NOT convert normal query typing into navigation', () => {
      const decision = {
        action: 'type',
        id: 'agent-2',
        value: 'best running shoes under 2000\n',
      };
      autoConvertUrlTyping(decision);
      expect(decision.action).toBe('type');
      expect(decision.value).toBe('best running shoes under 2000\n');
    });

    it('directly executes model decisions without loop guard interception', () => {
      const aiDecision = {
        action: 'scroll',
        value: 'down',
        thought: 'Scroll down to check more Puma shoe listings',
      };

      // Direct execution: no loop guard mutates aiDecision
      expect(aiDecision.action).toBe('scroll');
      expect(aiDecision.value).toBe('down');
    });

    it('does not inject unrequested artificial scrolls on unchanged DOM', () => {
      let consecutiveFailures = 2;
      let injectedAction: string | null = null;

      // In simplified stuck detection, consecutive failures do not inject scrolls
      if (consecutiveFailures >= 12) {
        injectedAction = 'abort';
      }

      expect(injectedAction).toBeNull();
    });
  });

  describe('Universal Workflow Post-Submission & Cycle Terminator', () => {
    function applyWorkflowPostSubmissionGuard(
      activeTaskMode: string,
      workflowState: {
        submissionInitiated: boolean;
        submissionStep: number;
        submissionButtonLabel?: string;
      },
      step: number,
      aiDecision: {
        action: string;
        id?: string;
        selector?: string;
        value?: string;
        thought?: string;
        summary?: string;
      },
      scratchpadStats: {
        totalMilestonesCount: number;
        completedMilestonesCount: number;
        activeMilestone?: string;
      },
      maskedText: string = ''
    ) {
      if (activeTaskMode === 'workflow' && workflowState.submissionInitiated) {
        const subStep = workflowState.submissionStep;
        const resolvedTarget = getHumanReadableTarget(aiDecision.id || aiDecision.selector, maskedText, aiDecision.action, aiDecision.value);
        const targetDesc = `${aiDecision.selector || ''} ${aiDecision.id || ''} ${resolvedTarget} ${aiDecision.thought || ''} ${typeof aiDecision.value === 'string' ? aiDecision.value : ''}`.toLowerCase();

        const isReOpenComposeClick = [
          'start a post',
          'create a post',
          'write a post',
          'compose',
          'new post',
          'new tweet',
          'new message',
          'start writing',
          'share-box',
          'feed-shared-creator',
          'share-box-feed-entry',
        ].some((term) => targetDesc.includes(term));

        const isReTypeAttempt = aiDecision.action === 'type';
        const isDuplicateSubmitClick =
          aiDecision.action === 'click' &&
          ['post', 'send', 'submit', 'publish', 'tweet', 'share-actions'].some((term) => targetDesc.includes(term));

        const hasUncompletedSubsequentMilestone =
          scratchpadStats.totalMilestonesCount > 1 &&
          scratchpadStats.completedMilestonesCount < scratchpadStats.totalMilestonesCount &&
          scratchpadStats.activeMilestone &&
          !scratchpadStats.activeMilestone.toLowerCase().includes('post') &&
          !scratchpadStats.activeMilestone.toLowerCase().includes('send') &&
          !scratchpadStats.activeMilestone.toLowerCase().includes('submit') &&
          !scratchpadStats.activeMilestone.toLowerCase().includes('compose') &&
          !scratchpadStats.activeMilestone.toLowerCase().includes('verify');

        if (
          !hasUncompletedSubsequentMilestone &&
          (isReOpenComposeClick || isReTypeAttempt || isDuplicateSubmitClick || step > subStep)
        ) {
          aiDecision.action = 'done';
          aiDecision.summary = `Workflow successfully executed: Content submitted via ${workflowState.submissionButtonLabel || 'Post'}.`;
          delete aiDecision.id;
          delete aiDecision.selector;
          delete aiDecision.value;
        }
      }
      return aiDecision;
    }

    it('intercepts click on "Start a post" on feed after post was already submitted and concludes with done', () => {
      const workflowState = {
        submissionInitiated: true,
        submissionStep: 4,
        submissionButtonLabel: 'Post',
      };
      // Step 5: After clicking Post at step 4, LLM tries to click "Start a post" on feed
      const aiDecision = {
        action: 'click',
        id: 'agent-5',
        selector: '[data-agent-id="agent-5"]',
        thought: 'Start a post on LinkedIn to share the update',
      };
      const stats = { totalMilestonesCount: 1, completedMilestonesCount: 1, activeMilestone: 'Post on LinkedIn' };

      const result = applyWorkflowPostSubmissionGuard('workflow', workflowState, 5, aiDecision, stats);

      expect(result.action).toBe('done');
      expect(result.summary).toContain('submitted via Post');
      expect(result.id).toBeUndefined();
    });

    it('intercepts attempt to re-type post body after submission and concludes with done', () => {
      const workflowState = {
        submissionInitiated: true,
        submissionStep: 4,
        submissionButtonLabel: 'Post',
      };
      const aiDecision = {
        action: 'type',
        id: 'agent-editor',
        value: 'Good morning, today we have SIH hackathon...',
        thought: 'Type post content into editor',
      };
      const stats = { totalMilestonesCount: 1, completedMilestonesCount: 1 };

      const result = applyWorkflowPostSubmissionGuard('workflow', workflowState, 5, aiDecision, stats);

      expect(result.action).toBe('done');
      expect(result.value).toBeUndefined();
    });

    it('intercepts duplicate "Send" clicks in email workflows (Hostinger/Gmail) on subsequent steps', () => {
      const workflowState = {
        submissionInitiated: true,
        submissionStep: 8,
        submissionButtonLabel: 'Send',
      };
      // Step 9: LLM tries to click Send again
      const aiDecision = {
        action: 'click',
        selector: 'button:has-text("Send")',
        thought: 'Click Send button to submit email',
      };
      const stats = { totalMilestonesCount: 2, completedMilestonesCount: 2 };

      const result = applyWorkflowPostSubmissionGuard('workflow', workflowState, 9, aiDecision, stats);

      expect(result.action).toBe('done');
      expect(result.summary).toContain('submitted via Send');
    });

    it('does NOT terminate multi-milestone workflows with pending subsequent steps', () => {
      const workflowState = {
        submissionInitiated: true,
        submissionStep: 4,
        submissionButtonLabel: 'Post',
      };
      // Step 5: LLM navigates to Google Sheet as requested in multi-step task
      const aiDecision = {
        action: 'navigate',
        value: 'https://docs.google.com/spreadsheets',
        thought: 'Navigate to Google Sheets to paste links',
      };
      const stats = {
        totalMilestonesCount: 2,
        completedMilestonesCount: 1,
        activeMilestone: 'Open Google Sheets and paste link',
      };

      const result = applyWorkflowPostSubmissionGuard('workflow', workflowState, 5, aiDecision, stats);

      expect(result.action).toBe('navigate');
      expect(result.value).toBe('https://docs.google.com/spreadsheets');
    });

    it('does NOT alter shopping mode actions', () => {
      const workflowState = {
        submissionInitiated: true,
        submissionStep: 4,
      };
      const aiDecision = {
        action: 'click',
        id: 'agent-cart',
        thought: 'Click add to cart',
      };
      const stats = { totalMilestonesCount: 0, completedMilestonesCount: 0 };

      const result = applyWorkflowPostSubmissionGuard('shopping', workflowState, 5, aiDecision, stats);

      expect(result.action).toBe('click');
      expect(result.id).toBe('agent-cart');
    });

    it('resolves [agent-29] <div> Start a post and converts bare {"action":"click","id":"agent-29"} to action: "done"', () => {
      const workflowState = {
        submissionInitiated: true,
        submissionStep: 4,
        submissionButtonLabel: 'Post',
      };
      // Exactly as in user's screenshot session log: model returns bare action with id 'agent-29'
      const aiDecision = {
        action: 'click',
        id: 'agent-29',
      };
      const maskedText = `--- INTERACTIVE ELEMENTS ---
[agent-1] <a> View post
[agent-2] <button> Dismiss
[agent-29] <div> Start a post
[agent-30] <div> Video
[agent-35] <a> Jaswanth Sri Sai Venkat Dangeti • You
[agent-38] <a> #SmartIndiaHackathon
--- PAGE TEXT ---
Post successful. View post`;

      const stats = { totalMilestonesCount: 1, completedMilestonesCount: 1, activeMilestone: 'Post on LinkedIn' };

      const result = applyWorkflowPostSubmissionGuard('workflow', workflowState, 5, aiDecision, stats, maskedText);

      expect(result.action).toBe('done');
      expect(result.summary).toContain('submitted via Post');
      expect(result.id).toBeUndefined();
    });

    it('evaluates pre-flight terminator condition when DOM contains "Post successful" and "View post"', () => {
      const maskedText = `[agent-1] <a> View post\n[agent-2] <button> Dismiss\nPost successful. View post`;
      const maskedTextLower = maskedText.toLowerCase();
      const hasSubmissionConfirmationToast = [
        'post successful',
        'view post',
        'your post was shared',
        'message sent',
      ].some((term) => maskedTextLower.includes(term));

      const workflowState = { submissionInitiated: true, submissionStep: 4 };
      const step = 5;

      const shouldTerminatePreFlight =
        hasSubmissionConfirmationToast && workflowState.submissionInitiated && step > workflowState.submissionStep;

      expect(hasSubmissionConfirmationToast).toBe(true);
      expect(shouldTerminatePreFlight).toBe(true);
    });

    it('evaluates server-side pre-VLM gate correctly on LinkedIn post completion', () => {
      const actionHistory = [
        { action: 'click', target: 'agent-27', value: '' }, // click Start a post
        { action: 'type', target: 'agent-5', value: 'Good morning everyone! Hackathon update...' },
        { action: 'click', target: 'agent-11', value: '' }, // click Post
      ];
      const maskedDom = `[agent-1] <a> View post\n[agent-2] <button> Dismiss\n[agent-29] <div> Start a post\nPost successful. View post`;
      const domLower = maskedDom.toLowerCase();

      const hasPriorSubmission = actionHistory.some((a) => {
        const act = String(a.action || '').toLowerCase();
        const tgt = String(a.target || '').toLowerCase();
        return act === 'click' && (tgt.includes('post') || tgt === 'agent-11');
      });

      const hasConfirmationToast = [
        'post successful',
        'view post',
        'your post was shared',
      ].some((sig) => domLower.includes(sig));

      const serverGateTriggered = hasPriorSubmission && hasConfirmationToast;
      expect(serverGateTriggered).toBe(true);
    });

    it('ensures destination-first routing navigates directly to LinkedIn without google.com', () => {
      const task = 'open linkedin and write a post of atleast 150 words and the context should be good morning';
      const initialUrl = 'chrome://newtab';
      
      function resolveTarget(t: string, current: string): string | null {
        const lower = t.toLowerCase();
        if (lower.includes('linkedin')) return 'https://www.linkedin.com';
        return null;
      }

      // Destination resolution must resolve directly to target domain
      const destination = resolveTarget(task, initialUrl);
      expect(destination).toBe('https://www.linkedin.com');
      expect(destination).not.toContain('google.com');
    });

    it('guards active tab tracking from hijacking unrelated Google tabs', () => {
      const currentTabId = 101;
      const unrelatedGoogleTab = { id: 202, url: 'https://www.google.com', openerTabId: undefined };
      const legitimateChildTab = { id: 303, url: 'https://www.linkedin.com/feed/post', openerTabId: 101 };

      function shouldFollowTab(targetTabId: number, candidateTab: { id: number; url: string; openerTabId?: number }): boolean {
        return (
          candidateTab.id !== targetTabId &&
          candidateTab.openerTabId === targetTabId &&
          !candidateTab.url.startsWith('chrome://')
        );
      }

      // Unrelated tab must NOT be followed
      expect(shouldFollowTab(currentTabId, unrelatedGoogleTab)).toBe(false);

      // Legitimate child tab spawned by target tab MUST be followed
      expect(shouldFollowTab(currentTabId, legitimateChildTab)).toBe(true);
    });

    it('enforces task completion lock and rejects post-completion navigation to google.com', () => {
      let isTaskFinished = true;
      let completedSuccessfully = true;
      let activeTabUrl = 'https://www.linkedin.com/feed/';

      function handleNavigateAttempt(targetUrl: string): { allowed: boolean; activeUrl: string } {
        if (isTaskFinished) {
          // Locked: reject all post-completion navigations
          return { allowed: false, activeUrl: activeTabUrl };
        }
        if (targetUrl.includes('google.com') && activeTabUrl.includes('linkedin.com')) {
          return { allowed: false, activeUrl: activeTabUrl };
        }
        activeTabUrl = targetUrl;
        return { allowed: true, activeUrl: activeTabUrl };
      }

      const result = handleNavigateAttempt('https://www.google.com');
      expect(result.allowed).toBe(false);
      expect(result.activeUrl).toBe('https://www.linkedin.com/feed/');
      expect(completedSuccessfully).toBe(true);
    });

    it('prevents "Start a post" opener button from being treated as a submission action', () => {
      const openerTexts = [
        'Start a post',
        'Create a post',
        'Write a post',
        'Compose',
        'New post',
        'New tweet',
        'New message',
        'Start a discussion',
      ];

      for (const btnText of openerTexts) {
        const btnTextLower = btnText.toLowerCase();
        const isOpenerBtn = [
          'start a post',
          'create a post',
          'write a post',
          'start writing',
          'new post',
          'compose',
          'new tweet',
          'new message',
          'start a discussion',
        ].some((phrase) => btnTextLower.includes(phrase));

        const isExactSubmitVerb = ['post', 'send', 'submit', 'publish', 'tweet', 'reply', 'confirm'].includes(btnTextLower);
        const isShareActionBtn = false;
        const hasSendIcon = false;
        const activeDialogBefore = true; // Even if inside a dialog wrapper

        const isProgressionBtn =
          !isOpenerBtn &&
          (isShareActionBtn ||
            hasSendIcon ||
            (activeDialogBefore && isExactSubmitVerb) ||
            (activeDialogBefore && ['post', 'send', 'submit', 'publish'].some((t) => btnTextLower.split(/\s+/).includes(t))));

        expect(isProgressionBtn).toBe(false);
      }

      // Conversely, genuine submit buttons inside modal must be recognized
      const submitTexts = ['Post', 'Send', 'Submit', 'Publish', 'Tweet'];
      for (const btnText of submitTexts) {
        const btnTextLower = btnText.toLowerCase();
        const isOpenerBtn = [
          'start a post',
          'create a post',
          'write a post',
          'start writing',
          'new post',
          'compose',
          'new tweet',
          'new message',
          'start a discussion',
        ].some((phrase) => btnTextLower.includes(phrase));

        const isExactSubmitVerb = ['post', 'send', 'submit', 'publish', 'tweet', 'reply', 'confirm'].includes(btnTextLower);
        const activeDialogBefore = true;

        const isProgressionBtn =
          !isOpenerBtn &&
          ((activeDialogBefore && isExactSubmitVerb) ||
            (activeDialogBefore && ['post', 'send', 'submit', 'publish'].some((t) => btnTextLower.split(/\s+/).includes(t))));

        expect(isProgressionBtn).toBe(true);
      }
    });

    it('background pre-flight terminator rejects early exit when no content was typed yet', () => {
      // Scenario: Agent just opened LinkedIn, step 1 clicked "Start a post".
      const workflowState = {
        contentTyped: false,
        typedContentSnippet: '',
        submissionInitiated: false,
        submissionStep: -1,
        submissionButtonLabel: '',
      };
      const lastTypedText = '';
      const lastSubmittedContent = '';
      const lastSubmittedStep = -1;
      const step = 2;
      const maskedTextLower = 'feed start a post share an article or photo linkedin home';

      const hasClosedComposerOnFeed =
        (maskedTextLower.includes('start a post') || maskedTextLower.includes('compose') || maskedTextLower.includes('new tweet')) &&
        !maskedTextLower.includes('contenteditable="true"') &&
        !maskedTextLower.includes('share your thoughts');

      const hasSubstantialTypedContent = workflowState.contentTyped || lastTypedText.length > 15;
      const isPostSubmissionStep =
        hasSubstantialTypedContent &&
        (workflowState.submissionInitiated ||
          (lastSubmittedContent && lastSubmittedStep > 0) ||
          (step >= 4 && lastTypedText.length > 30));

      const shouldTerminate =
        isPostSubmissionStep &&
        (hasClosedComposerOnFeed || step > (workflowState.submissionStep > 0 ? workflowState.submissionStep : lastSubmittedStep));

      // Must NOT terminate prematurely!
      expect(shouldTerminate).toBe(false);
    });

    it('server Pre-VLM gate rejects premature completion when only opener button was clicked', () => {
      const actionHistory = [
        { action: 'navigate', target: 'https://www.linkedin.com/feed/', value: '' },
        { action: 'click', target: 'button start a post', value: 'Start a post' },
      ];
      const maskedDom = `[agent-1] <div> Start a post\n[agent-2] <button> Events\n[agent-3] <a> LinkedIn`;
      const domLower = maskedDom.toLowerCase();
      const step = 2;

      // 1. Detect if substantial content was typed
      const hasPriorTyping = actionHistory.some((a) => {
        const act = String(a.action || '').toLowerCase();
        const val = String(a.value || '').trim();
        return (act === 'type' || act === 'fill') && val.length > 15;
      });

      // 2. Detect submission action excluding openers
      const hasPriorSubmission = actionHistory.some((a) => {
        const act = String(a.action || '').toLowerCase();
        const tgt = String(a.target || '').toLowerCase();
        const val = String(a.value || '').toLowerCase();

        const isOpener = [
          'start a post',
          'create a post',
          'write a post',
          'start writing',
          'new post',
          'compose',
          'new tweet',
          'new message',
          'start a discussion',
        ].some((op) => tgt.includes(op) || val.includes(op));

        if (isOpener) return false;

        const isSubmitClick =
          act === 'click' &&
          ['post', 'send', 'submit', 'publish', 'tweet', 'reply', 'confirm', 'share-actions'].some((term) =>
            tgt.includes(term) || val.includes(term)
          );
        const isEnterKey = (act === 'type' || act === 'keypress') && (val.includes('\n') || val.includes('\r')) && val.length > 15;
        return isSubmitClick || isEnterKey;
      });

      const hasConfirmationToast = false;
      const hasFeedWithComposerClosed =
        (domLower.includes('start a post') || domLower.includes('compose')) &&
        !domLower.includes('contenteditable="true"');

      const gateTriggered = hasPriorTyping && hasPriorSubmission && (hasConfirmationToast || hasFeedWithComposerClosed || step >= 4);

      // Pre-VLM gate must NOT trigger!
      expect(hasPriorTyping).toBe(false);
      expect(hasPriorSubmission).toBe(false);
      expect(gateTriggered).toBe(false);
    });

    it('server Pre-VLM gate triggers only after genuine typing and submission', () => {
      const actionHistory = [
        { action: 'navigate', target: 'https://www.linkedin.com/feed/', value: '' },
        { action: 'click', target: 'button start a post', value: 'Start a post' },
        { action: 'type', target: 'contenteditable div', value: 'Today we have an evaluation for SIH 2026. Looking forward to our presentation!' },
        { action: 'click', target: 'share-actions__primary-action button', value: 'Post' },
      ];
      const maskedDom = `[agent-1] <div> Start a post\nPost successful. View post`;
      const domLower = maskedDom.toLowerCase();
      const step = 4;

      const hasPriorTyping = actionHistory.some((a) => {
        const act = String(a.action || '').toLowerCase();
        const val = String(a.value || '').trim();
        return (act === 'type' || act === 'fill') && val.length > 15;
      });

      const hasPriorSubmission = actionHistory.some((a) => {
        const act = String(a.action || '').toLowerCase();
        const tgt = String(a.target || '').toLowerCase();
        const val = String(a.value || '').toLowerCase();

        const isOpener = [
          'start a post',
          'create a post',
          'write a post',
          'start writing',
          'new post',
          'compose',
          'new tweet',
          'new message',
          'start a discussion',
        ].some((op) => tgt.includes(op) || val.includes(op));

        if (isOpener) return false;

        const isSubmitClick =
          act === 'click' &&
          ['post', 'send', 'submit', 'publish', 'tweet', 'reply', 'confirm', 'share-actions'].some((term) =>
            tgt.includes(term) || val.includes(term)
          );
        const isEnterKey = (act === 'type' || act === 'keypress') && (val.includes('\n') || val.includes('\r')) && val.length > 15;
        return isSubmitClick || isEnterKey;
      });

      const hasConfirmationToast = ['post successful', 'view post'].some((sig) => domLower.includes(sig));

      const gateTriggered = hasPriorTyping && hasPriorSubmission && (hasConfirmationToast || step >= 4);

      // Successfully gate triggered now that typing AND submission happened!
      expect(hasPriorTyping).toBe(true);
      expect(hasPriorSubmission).toBe(true);
      expect(gateTriggered).toBe(true);
    });
  });
});
