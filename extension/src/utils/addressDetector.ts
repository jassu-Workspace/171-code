/**
 * Address Detector: Multi-Component Heuristic Perception
 * ----------------------------------------------------
 * Solves the physical address detection challenge across modern web portals:
 * Combines DOM text, component-level regexes, weighted scoring, container hints,
 * and adjacency grouping to detect both unified and multi-line addresses split
 * across sibling elements without shredding ordinary product titles or descriptions.
 */

export type AddressComponent =
  | 'house_number'
  | 'street'
  | 'locality'
  | 'landmark'
  | 'city'
  | 'state'
  | 'pin'
  | 'country'
  | 'address_keyword';

export type AddressMaskMode = 'full' | 'partial';

export const ADDRESS_REDACTED = '[ADDRESS REDACTED]';
export const LOCATION_REDACTED = '[LOCATION REDACTED]';

export interface SanitizedElement {
  id: string;
  tag?: string;
  type?: string;
  role?: string;
  ariaLabel?: string;
  text?: string;
  value?: string;
  bbox: [number, number, number, number]; // [x, y, w, h]
  hasNativeDOMText?: boolean;
}

export const ADDRESS_PATTERNS: Record<AddressComponent, RegExp> = {
  house_number:
    /\b(?:flat|plot|door|house|h\.?\s?no|d\.?\s?no|apt|apartment|room|shop|suite|unit)\b\.?\s*(?:no\.?)?\s*[\w*]+(?:[-/][\w*]+)*|(?<![\w/-])\d{1,4}[-/]\d{1,4}(?:[-/][\w*]+)?(?![\w-])/i,
  street:
    /\b(?:street|st|road|rd|lane|ln|avenue|ave|marg|colony|nagar|layout|sector|cross|block|phase|extension|society|apartments?|towers?|enclave|vihar|puram|pally|chowk|circle|galli|bazaar|drive|dr|blvd|boulevard|way|court|ct)\b/i,
  locality:
    /\b(?:area|locality|village|mandal|taluk|tehsil|district|dist|post|po|ward|zone)\b/i,
  landmark:
    /\b(?:near|opposite|opp|behind|beside|next\s+to|adjacent\s+to|landmark|above)\b/i,
  city:
    /\b(?:visakhapatnam|vizag|bengaluru|bangalore|mumbai|new\s+delhi|delhi|noida|gurugram|gurgaon|hyderabad|secunderabad|chennai|kolkata|pune|ahmedabad|jaipur|lucknow|kanpur|nagpur|indore|bhopal|patna|vadodara|surat|coimbatore|kochi|cochin|thiruvananthapuram|mysuru|mysore|vijayawada|guntur|tirupati|warangal|nashik|thane|navi\s+mumbai|faridabad|ghaziabad|ludhiana|amritsar|chandigarh|dehradun|ranchi|raipur|guwahati|bhubaneswar|cuttack|madurai|salem|mangaluru|mangalore|hubli|belgaum|rajkot|jodhpur|udaipur|agra|varanasi|prayagraj|meerut|jabalpur|gwalior|aurangabad|solapur|kolhapur|panaji|new\s+york|los\s+angeles|chicago|houston|phoenix|philadelphia|san\s+antonio|san\s+diego|dallas|san\s+jose|austin|seattle|san\s+francisco|boston|washington)\b/i,
  state:
    /\b(?:andhra\s+pradesh|arunachal\s+pradesh|assam|bihar|chhattisgarh|goa|gujarat|haryana|himachal\s+pradesh|jharkhand|karnataka|kerala|madhya\s+pradesh|maharashtra|manipur|meghalaya|mizoram|nagaland|odisha|orissa|punjab|rajasthan|sikkim|tamil\s+nadu|telangana|tripura|uttar\s+pradesh|uttarakhand|west\s+bengal|jammu(?:\s+(?:and|&)\s+kashmir)?|ladakh|puducherry|pondicherry|andaman|lakshadweep|california|texas|florida|washington|new\s+york|illinois|pennsylvania|ohio|georgia|north\s+carolina|michigan|new\s+jersey|virginia|arizona|massachusetts|tennessee|indiana|missouri|maryland|wisconsin|colorado|minnesota|south\s+carolina|alabama|louisiana|kentucky|oregon|oklahoma|connecticut|utah|iowa|nevada|arkansas|mississippi|kansas|new\s+mexico|nebraska|idaho|west\s+virginia|hawaii|new\s+hampshire|maine|montana|rhode\s+island|delaware|south\s+dakota|north\s+dakota|alaska|vermont|wyoming)\b/i,
  pin: /(?:\bpin(?:\s*code)?\s*[:\-]?\s*)?(?<!\d)[1-9]\d{5}(?!\d)|\b\d{5}(?:-\d{4})?\b/i,
  country: /\b(?:india|bharat|united\s+states|usa|u\.s\.a\.|united\s+kingdom|uk|u\.k\.|canada|australia)\b/i,
  address_keyword:
    /\b(?:address|addr|deliver\s+to|delivery\s+address|shipping\s+address|billing\s+address|ship\s+to|bill\s+to|residence|permanent\s+address|home\s+address|default\s+address)\b/i,
};

const COMPONENT_WEIGHT: Record<AddressComponent, number> = {
  pin: 3,
  address_keyword: 3,
  house_number: 2,
  city: 2,
  state: 2,
  locality: 2,
  street: 1,
  landmark: 1,
  country: 1,
};

export const ADDRESS_SCORE_THRESHOLD = 5;
export const ADDRESS_COMPONENT_THRESHOLD = 3;

const CONTAINER_HINT_RE =
  /address|addr|street|locality|pincode|pin-?code|postal|zip|shipping|billing|delivery|deliver-to|residence/i;
const CONTAINER_HINT_BOOST = 3;

export interface AddressTextAnalysis {
  isAddress: boolean;
  score: number;
  components: AddressComponent[];
}

export interface AddressDetection {
  id: string;
  elementIds: string[];
  bbox: [number, number, number, number];
  confidence: number;
  score: number;
  components: AddressComponent[];
  matchedText: string;
  source: 'dom_text' | 'dom_group' | 'ocr_text';
}

export interface AddressSensitiveRegion {
  id: string;
  type: 'ADDRESS';
  bbox: [number, number, number, number];
  confidence: number;
  source: string;
}

export interface AddressDetectionResult {
  detections: AddressDetection[];
  sensitiveRegions: AddressSensitiveRegion[];
  duration_ms: number;
}

export function extractAddressComponents(text: string): AddressComponent[] {
  if (!text) return [];
  const found: AddressComponent[] = [];
  for (const key of Object.keys(ADDRESS_PATTERNS) as AddressComponent[]) {
    if (ADDRESS_PATTERNS[key].test(text)) found.push(key);
  }
  return found;
}

export function scoreComponents(components: AddressComponent[]): number {
  return components.reduce((total, c) => total + (COMPONENT_WEIGHT[c] || 0), 0);
}

export function analyzeAddressText(text: string, containerHint = false): AddressTextAnalysis {
  const components = extractAddressComponents(text);
  let score = scoreComponents(components);
  if (containerHint && components.length > 0) score += CONTAINER_HINT_BOOST;

  const isAddress =
    score >= ADDRESS_SCORE_THRESHOLD &&
    (components.length >= ADDRESS_COMPONENT_THRESHOLD || (containerHint && components.length >= 2));
  return { isAddress, score, components };
}

export function containsFullAddress(text: string): boolean {
  return analyzeAddressText(text).isAddress;
}

function hasContainerHint(el: SanitizedElement): boolean {
  const blob = [el.id, el.ariaLabel || '', el.role || '', el.type || ''].join(' ');
  return CONTAINER_HINT_RE.test(blob);
}

function elementText(el: SanitizedElement): string {
  return `${el.text || ''} ${el.value || ''}`.trim();
}

export function isVerticallyAdjacent(a: SanitizedElement, b: SanitizedElement): boolean {
  const [ax, ay, aw, ah] = a.bbox;
  const [bx, by, bw, bh] = b.bbox;
  if (!aw || !bw) return false;

  // b must sit on or below a's line.
  if (by + bh < ay) return false;

  const gap = by - (ay + ah);
  const lineHeight = Math.max(ah, bh, 14);
  if (gap > lineHeight * 1.6) return false;

  // Left edges roughly aligned, or the boxes overlap horizontally.
  const leftAligned = Math.abs(ax - bx) <= 32;
  const overlap = Math.min(ax + aw, bx + bw) - Math.max(ax, bx);
  const overlapping = overlap >= Math.min(aw, bw) * 0.4;
  return leftAligned || overlapping;
}

export function unionBbox(elements: SanitizedElement[]): [number, number, number, number] {
  const x = Math.min(...elements.map((e) => e.bbox[0]));
  const y = Math.min(...elements.map((e) => e.bbox[1]));
  const right = Math.max(...elements.map((e) => e.bbox[0] + e.bbox[2]));
  const bottom = Math.max(...elements.map((e) => e.bbox[1] + e.bbox[3]));
  return [x, y, right - x, bottom - y];
}

export function detectAddresses(elements: SanitizedElement[]): AddressDetectionResult {
  const startTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const detections: AddressDetection[] = [];
  const claimed = new Set<string>();
  let regionId = 1;

  // Pass 1: elements that are an address on their own
  for (const el of elements) {
    const text = elementText(el);
    if (!text) continue;
    const analysis = analyzeAddressText(text, hasContainerHint(el));
    if (!analysis.isAddress) continue;

    detections.push({
      id: `addr_${regionId++}`,
      elementIds: [el.id],
      bbox: el.bbox,
      confidence: Math.min(0.99, 0.85 + analysis.score * 0.01),
      score: analysis.score,
      components: analysis.components,
      matchedText: text,
      source: el.hasNativeDOMText === false ? 'ocr_text' : 'dom_text',
    });
    claimed.add(el.id);
  }

  // Pass 2: adjacent fragments that together form a complete address
  const candidates = elements
    .filter((el) => !claimed.has(el.id))
    .filter((el) => {
      const text = elementText(el);
      return !!text && text.length <= 160 && el.bbox[2] > 0;
    })
    .sort((a, b) => a.bbox[1] - b.bbox[1] || a.bbox[0] - b.bbox[0]);

  const MAX_CHAIN = 12;
  let i = 0;
  while (i < candidates.length) {
    const chain: SanitizedElement[] = [candidates[i]];
    let j = i + 1;
    while (
      j < candidates.length &&
      chain.length < MAX_CHAIN &&
      isVerticallyAdjacent(chain[chain.length - 1], candidates[j])
    ) {
      chain.push(candidates[j]);
      j++;
    }

    let consumedTo = i;
    for (let start = 0; start < chain.length; start++) {
      let matched = -1;
      let analysis: AddressTextAnalysis | null = null;
      for (let end = start + 1; end < chain.length; end++) {
        const window = chain.slice(start, end + 1);
        const joined = window.map(elementText).filter(Boolean).join(', ');
        const result = analyzeAddressText(joined, window.some(hasContainerHint));
        if (result.isAddress) {
          matched = end;
          analysis = result;
          break;
        }
      }
      if (matched < 0 || analysis === null) continue;

      const window = chain.slice(start, matched + 1);
      detections.push({
        id: `addr_${regionId++}`,
        elementIds: window.map((el) => el.id),
        bbox: unionBbox(window),
        confidence: Math.min(0.99, 0.82 + analysis.score * 0.01),
        score: analysis.score,
        components: analysis.components,
        matchedText: window.map(elementText).filter(Boolean).join(', '),
        source: 'dom_group',
      });
      for (const el of window) claimed.add(el.id);
      consumedTo = Math.max(consumedTo, i + matched);
      start = matched;
    }

    i = consumedTo > i ? consumedTo + 1 : i + 1;
  }

  const sensitiveRegions: AddressSensitiveRegion[] = detections.map((d) => ({
    id: d.id,
    type: 'ADDRESS',
    bbox: d.bbox,
    confidence: d.confidence,
    source: d.source === 'ocr_text' ? 'ocr_text' : 'address_heuristic',
  }));

  const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
  return {
    detections,
    sensitiveRegions,
    duration_ms: Math.round((now - startTime) * 100) / 100,
  };
}

function maskLastDigitRun(part: string): string {
  return part.replace(/\d+(?!.*\d)/, '**');
}

function maskPin(part: string): string {
  return part.replace(/(?<!\d)[1-9]\d{5}(?!\d)|\b\d{5}(?:-\d{4})?\b/g, '******');
}

export function maskAddress(text: string, mode: AddressMaskMode = 'full'): string {
  if (!text) return text;
  if (mode === 'full') return ADDRESS_REDACTED;

  const parts = text.split(',').map((p) => p.trim()).filter(Boolean);
  const out: string[] = [];

  for (const part of parts) {
    const isLandmark = ADDRESS_PATTERNS.landmark.test(part);
    const hasState = ADDRESS_PATTERNS.state.test(part);
    const hasPin = ADDRESS_PATTERNS.pin.test(part);
    const hasStreet = ADDRESS_PATTERNS.street.test(part);
    const hasHouse = ADDRESS_PATTERNS.house_number.test(part);

    if (hasState || hasPin) {
      out.push(maskPin(part));
      continue;
    }
    if (isLandmark) {
      if (out[out.length - 1] !== LOCATION_REDACTED) out.push(LOCATION_REDACTED);
      continue;
    }
    if (hasHouse && !hasStreet) {
      out.push(maskLastDigitRun(part));
      continue;
    }
    if (hasStreet) {
      out.push(part);
      continue;
    }
    if (out[out.length - 1] !== LOCATION_REDACTED) out.push(LOCATION_REDACTED);
  }

  const masked = out.join(', ');
  return masked || ADDRESS_REDACTED;
}

export function extractCityAndPin(text: string): string {
  const parts = text.split(',').map((p) => p.trim()).filter(Boolean);
  const pinMatch = text.match(/(?<!\d)[1-9]\d{5}(?!\d)|\b\d{5}(?:-\d{4})?\b/);
  const pin = pinMatch ? pinMatch[0] : '';

  let city = '';
  for (const part of parts) {
    const cityMatch = part.match(ADDRESS_PATTERNS.city);
    if (cityMatch) {
      city = cityMatch[0];
      break;
    }
  }
  if (!city) {
    const stateIndex = parts.findIndex(
      (p) => ADDRESS_PATTERNS.state.test(p) || ADDRESS_PATTERNS.pin.test(p)
    );
    const candidate = stateIndex > 0 ? parts[stateIndex - 1] : '';
    if (
      candidate &&
      !ADDRESS_PATTERNS.landmark.test(candidate) &&
      !ADDRESS_PATTERNS.house_number.test(candidate)
    ) {
      city = candidate;
    }
  }

  const summary = [city, pin].filter(Boolean).join(' - ');
  return summary || LOCATION_REDACTED;
}
