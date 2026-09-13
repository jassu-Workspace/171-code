/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getMaskedDom, executeAction } from '@/entrypoints/content/index';

describe('Element Resolution & Navigation Isolation Engine', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('filters out hidden CSRF/anti-bot inputs and enriches visible search inputs in getMaskedDom', () => {
    document.body.innerHTML = `
      <div id="nav-belt">
        <!-- Hidden anti-bot inputs (must be filtered) -->
        <input type="hidden" name="anti-bot-token" value="hPSZZ6pYGF5PQy1uijbZFlwvQ37" />
        <input type="hidden" name="session-id" value="258-1234567-8901234" />
        
        <!-- Style hidden input -->
        <input type="text" style="display: none;" name="hidden-field" value="invisible" />

        <!-- Real visible Amazon search bar (must be indexed with rich metadata) -->
        <form id="nav-search-bar-form">
          <input
            type="text"
            id="twotabsearchtextbox"
            name="field-keywords"
            placeholder="Search Amazon.in"
            aria-label="Search Amazon.in"
            value=""
          />
          <input id="nav-search-submit-button" type="submit" value="Go" />
        </form>
      </div>
    `;

    const rawJson = getMaskedDom();
    const parsed = JSON.parse(rawJson);
    const elementMap = parsed.elementMap as Array<{ id: string; tag: string; meta?: string; text: string }>;

    // 1. Verify hidden inputs were excluded
    const hiddenTokens = elementMap.filter((el) => el.text.includes('hPSZZ6pYGF') || el.text.includes('258-1234567'));
    expect(hiddenTokens).toHaveLength(0);

    // 2. Verify visible search bar was included with full metadata
    const searchInput = elementMap.find((el) => el.meta?.includes('twotabsearchtextbox'));
    expect(searchInput).toBeDefined();
    expect(searchInput?.meta).toContain('id="twotabsearchtextbox"');
    expect(searchInput?.meta).toContain('name="field-keywords"');
    expect(searchInput?.meta).toContain('placeholder="Search Amazon.in"');

    // 3. Verify interactiveSummary exposes these attributes clearly
    expect(parsed.maskedText).toContain('id="twotabsearchtextbox"');
    expect(parsed.maskedText).toContain('placeholder="Search Amazon.in"');
  });

  it('enforces in-tab navigation (target="_self") when clicking links with target="_blank"', async () => {
    document.body.innerHTML = `
      <div class="s-search-results">
        <a id="product-link" href="https://www.amazon.in/dp/B00PUMA123" target="_blank">
          <img src="puma.jpg" alt="PUMA Mens Softride Enzo Evo Running Shoe" />
          <span class="a-size-medium">PUMA Mens Softride Enzo Evo Running Shoe</span>
        </a>
      </div>
    `;

    const link = document.getElementById('product-link') as HTMLAnchorElement;
    expect(link.target).toBe('_blank');

    let clickCount = 0;
    link.addEventListener('click', (e) => {
      e.preventDefault(); // prevent jsdom navigation error
      clickCount++;
    });

    const result = await executeAction({
      action: 'click',
      selector: '#product-link',
    });

    expect(result.success).toBe(true);
    // Overridden to _self to prevent opening external/detached tabs!
    expect(link.target).toBe('_self');
    // Verified single click (NOT double-clicked)
    expect(clickCount).toBe(1);
  });

  it('resolves elements via fuzzy keyword extraction when LLM returns alt text selectors', async () => {
    document.body.innerHTML = `
      <div class="s-main-slot">
        <div class="s-result-item" data-component-type="s-search-result">
          <a class="a-link-normal" href="/dp/B08XYZ">
            <img class="s-image" src="shoe.jpg" alt="Sponsored Ad - PUMA Mens Softride Enzo Running Shoes" />
            <span class="a-text-normal">Puma Softride Enzo - ₹2,399</span>
          </a>
        </div>
      </div>
    `;

    let clickedElement: HTMLElement | null = null;
    const link = document.querySelector('a') as HTMLElement;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      clickedElement = link;
    });

    // LLM returned selector with partial quote: img[alt*='Softride']
    const result = await executeAction({
      action: 'click',
      selector: "img[alt*='Softride']",
    });

    expect(result.success).toBe(true);
    expect(clickedElement).not.toBeNull();
  });

  it('resolves direct HTML id when model outputs real DOM ID instead of agent-id', async () => {
    document.body.innerHTML = `
      <input type="text" id="twotabsearchtextbox" name="field-keywords" value="" />
    `;

    const input = document.getElementById('twotabsearchtextbox') as HTMLInputElement;

    const result = await executeAction({
      action: 'type',
      id: 'twotabsearchtextbox', // Real DOM ID rather than agent-1
      value: 'puma shoes',
    });

    expect(result.success).toBe(true);
    expect(input.value).toBe('puma shoes');
  });

  it('triggers search submit button when typing search query with trailing newline', async () => {
    document.body.innerHTML = `
      <form id="search-form">
        <input type="text" id="twotabsearchtextbox" value="" />
        <input id="nav-search-submit-button" type="submit" value="Go" />
      </form>
    `;

    let submitClicked = false;
    const submitBtn = document.getElementById('nav-search-submit-button') as HTMLInputElement;
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      submitClicked = true;
    });

    const result = await executeAction({
      action: 'type',
      id: 'twotabsearchtextbox',
      value: 'puma shoes\n',
    });

    expect(result.success).toBe(true);
    expect(submitClicked).toBe(true);
  });

  it('executes scroll action with instant behavior to prevent screenshot motion blur', async () => {
    let scrollArgs: unknown = null;
    window.scrollBy = vi.fn((options: any) => {
      scrollArgs = options;
    });

    const result = await executeAction({
      action: 'scroll',
      value: 'down',
      amount: 450,
    });

    expect(result.success).toBe(true);
    expect(scrollArgs).toEqual({ top: 450, behavior: 'instant' });
  });

  it('sanitizes unprefixed domain URLs for navigate action', async () => {
    delete (window as any).location;
    (window as any).location = { href: '' };

    const result = await executeAction({
      action: 'navigate',
      value: 'amazon.in/s?k=shoes',
    });

    expect(result.success).toBe(true);
    expect(window.location.href).toBe('https://amazon.in/s?k=shoes');
  });

  it('preserves completely empty inputs in getMaskedDom with (empty input) placeholder label', () => {
    document.body.innerHTML = `
      <form>
        <input type="text" id="blank-search" />
      </form>
    `;

    const rawJson = getMaskedDom();
    const parsed = JSON.parse(rawJson);
    const elementMap = parsed.elementMap as Array<{ id: string; tag: string; meta?: string; text: string }>;

    const blankInput = elementMap.find((el) => el.meta?.includes('blank-search'));
    expect(blankInput).toBeDefined();
    expect(blankInput?.text).toBe('(empty input)');
    expect(parsed.maskedText).toContain('(empty input)');
  });

  it('keeps opacity-0 checkbox visible and toggles checked status on click', async () => {
    document.body.innerHTML = `
      <label>
        <input type="checkbox" id="brand-filter" style="opacity: 0; position: absolute;" />
        <span>Puma</span>
      </label>
    `;

    const rawJson = getMaskedDom();
    const parsed = JSON.parse(rawJson);
    const checkboxEntry = parsed.elementMap.find((el: any) => el.meta?.includes('brand-filter'));
    expect(checkboxEntry).toBeDefined();

    const checkbox = document.getElementById('brand-filter') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    const result = await executeAction({
      action: 'click',
      id: 'brand-filter',
    });

    expect(result.success).toBe(true);
    expect(checkbox.checked).toBe(true);
  });

  it('prioritizes main search results over navbar links when resolving by keyword', async () => {
    document.body.innerHTML = `
      <header id="navbar">
        <a id="nav-brand-logo" href="/">Puma Store</a>
      </header>
      <main id="search">
        <div class="s-search-results">
          <a id="product-card" href="/product/123">
            <span>Puma Softride Shoe</span>
          </a>
        </div>
      </main>
    `;

    let clickedId = '';
    document.getElementById('nav-brand-logo')!.addEventListener('click', () => {
      clickedId = 'nav-brand-logo';
    });
    document.getElementById('product-card')!.addEventListener('click', (e) => {
      e.preventDefault();
      clickedId = 'product-card';
    });

    const result = await executeAction({
      action: 'click',
      selector: "a:contains('Puma')",
    });

    expect(result.success).toBe(true);
    expect(clickedId).toBe('product-card');
  });

  it('supports native HTMLSelectElement dropdowns and select/choose action', async () => {
    document.body.innerHTML = `
      <select id="sort-select">
        <option value="relevance">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="rating-desc">Avg. Customer Review</option>
      </select>
    `;

    const select = document.getElementById('sort-select') as HTMLSelectElement;
    expect(select.value).toBe('relevance');

    let changeFired = false;
    select.addEventListener('change', () => {
      changeFired = true;
    });

    const result = await executeAction({
      action: 'select',
      id: 'sort-select',
      value: 'Customer Review',
    });

    expect(result.success).toBe(true);
    expect(select.value).toBe('rating-desc');
    expect(changeFired).toBe(true);
  });

  it('supports native HTMLSelectElement dropdowns via action: "click" with value', async () => {
    document.body.innerHTML = `
      <select id="mission-select">
        <option value="RISAT-2BR1">RISAT-2BR1 Radar</option>
        <option value="CARTOSAT-3">CARTOSAT-3 Optical</option>
        <option value="EOS-04">EOS-04 Radar</option>
      </select>
    `;

    const select = document.getElementById('mission-select') as HTMLSelectElement;
    expect(select.value).toBe('RISAT-2BR1');

    let changeFired = false;
    select.addEventListener('change', () => {
      changeFired = true;
    });

    const result = await executeAction({
      action: 'click',
      id: 'mission-select',
      value: 'CARTOSAT-3',
    });

    expect(result.success).toBe(true);
    expect(select.value).toBe('CARTOSAT-3');
    expect(changeFired).toBe(true);
  });

  it('supports selecting option via direct action: "click" on HTMLOptionElement', async () => {
    document.body.innerHTML = `
      <select id="mission-select-2">
        <option value="RISAT-2BR1">RISAT-2BR1 Radar</option>
        <option id="opt-eos" value="EOS-04">EOS-04 Radar</option>
      </select>
    `;

    const select = document.getElementById('mission-select-2') as HTMLSelectElement;
    expect(select.value).toBe('RISAT-2BR1');

    let changeFired = false;
    select.addEventListener('change', () => {
      changeFired = true;
    });

    const result = await executeAction({
      action: 'click',
      id: 'opt-eos',
    });

    expect(result.success).toBe(true);
    expect(select.value).toBe('EOS-04');
    expect(changeFired).toBe(true);
  });

  it('supports custom dropdown button opening with realistic pointer coordinates', async () => {
    document.body.innerHTML = `
      <button id="dropdown-btn" class="dropdown-toggle" aria-haspopup="listbox" aria-expanded="false">
        Select Payload
      </button>
      <ul id="dropdown-menu" style="display: none;">
        <li class="dropdown-item" data-value="PAYLOAD_A">Payload Alpha</li>
        <li class="dropdown-item" data-value="PAYLOAD_B">Payload Beta</li>
      </ul>
    `;

    const btn = document.getElementById('dropdown-btn') as HTMLButtonElement;
    const menu = document.getElementById('dropdown-menu') as HTMLUListElement;

    let receivedPointerDown = false;
    let receivedMouseDown = false;

    btn.addEventListener('pointerdown', (e) => {
      receivedPointerDown = true;
      expect(e.button).toBe(0);
    });

    btn.addEventListener('mousedown', (e) => {
      receivedMouseDown = true;
      expect(e.button).toBe(0);
    });

    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      menu.style.display = isExpanded ? 'none' : 'block';
    });

    const result = await executeAction({
      action: 'click',
      id: 'dropdown-btn',
    });

    expect(result.success).toBe(true);
    expect(receivedPointerDown).toBe(true);
    expect(receivedMouseDown).toBe(true);
    expect(btn.getAttribute('aria-expanded')).toBe('true');
    expect(menu.style.display).toBe('block');
  });

  it('exposes select options, current selection and custom dropdown state in getMaskedDom', () => {
    document.body.innerHTML = `
      <select id="spacecraft-select" name="spacecraft">
        <option value="RISAT-2BR1" selected>RISAT-2BR1</option>
        <option value="EOS-04">EOS-04</option>
      </select>
      <button id="category-filter" class="dropdown-toggle" aria-haspopup="menu" aria-expanded="false">
        Filter Missions
      </button>
    `;

    const rawJson = getMaskedDom();
    const parsed = JSON.parse(rawJson);
    const elementMap = parsed.elementMap as Array<{ id: string; tag: string; meta?: string; text: string }>;

    // 1. Verify <select> formatting
    const selectEntry = elementMap.find((el) => el.meta?.includes('spacecraft-select'));
    expect(selectEntry).toBeDefined();
    expect(selectEntry?.meta).toContain('type="select"');
    expect(selectEntry?.meta).toContain('selected="RISAT-2BR1"');
    expect(selectEntry?.text).toContain('Available Options:');
    expect(selectEntry?.text).toContain('EOS-04');

    // 2. Verify custom dropdown button formatting
    const btnEntry = elementMap.find((el) => el.meta?.includes('category-filter'));
    expect(btnEntry).toBeDefined();
    expect(btnEntry?.meta).toContain('aria-haspopup="menu"');
    expect(btnEntry?.meta).toContain('aria-expanded="false"');
    expect(btnEntry?.meta).toContain('data-dropdown="true"');
  });
});

