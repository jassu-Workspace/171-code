/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { classifyTaskDomain, generateDomainPrompt } from '../../server/src/index';
import { getMaskedDom, executeAction } from '@/entrypoints/content/index';

describe('ISRO Geospatial Workflow Engine & Universal GIS Automation', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  // -------------------------------------------------------------------------
  // 1. Task Domain Classification Tests
  // -------------------------------------------------------------------------
  describe('Task Domain Classification (classifyTaskDomain)', () => {
    it('classifies the user request for Bhuvan, Flood Hazard/Drought and Odisha coastal sector as ISRO_ENTERPRISE_OPERATIONS', () => {
      const task = "Open ISRO Bhuvan, navigate to Thematic Services, search for 'Flood Hazard' or 'Drought', and zoom into the Odisha coastal sector.";
      expect(classifyTaskDomain(task)).toBe('ISRO_ENTERPRISE_OPERATIONS');
    });

    it('classifies Bhoonidhi satellite data queries as ISRO_ENTERPRISE_OPERATIONS', () => {
      const task = 'Open Bhoonidhi portal and download Cartosat-3 high resolution imagery for coordinates 19.8 N, 85.8 E with cloud cover < 10%';
      expect(classifyTaskDomain(task)).toBe('ISRO_ENTERPRISE_OPERATIONS');
    });

    it('classifies ISTRAC satellite telemetry & pass tracking tasks as ISRO_ENTERPRISE_OPERATIONS', () => {
      const task = 'Check ISTRAC satellite operations console and authorize pass for RISAT-2BR1';
      expect(classifyTaskDomain(task)).toBe('ISRO_ENTERPRISE_OPERATIONS');
    });

    it('classifies MOSDAC oceanographic / cyclone monitoring tasks as ISRO_ENTERPRISE_OPERATIONS', () => {
      const task = 'Monitor Bay of Bengal cyclone track and sea surface temperature on MOSDAC';
      expect(classifyTaskDomain(task)).toBe('ISRO_ENTERPRISE_OPERATIONS');
    });

    it('classifies via DOM markers when Bhuvan/GIS elements are present', () => {
      const genericTask = 'Analyze the coastal disaster situation';
      const bhuvanDom = '<div><h3>ISRO Bhuvan Thematic Services</h3><div class="ol-viewport"></div></div>';
      expect(classifyTaskDomain(genericTask, bhuvanDom)).toBe('ISRO_ENTERPRISE_OPERATIONS');
    });

    it('strictly preserves SHOPPING_COMPARISON for e-commerce queries', () => {
      const task = 'Buy running shoes under Rs 3000 on Amazon';
      expect(classifyTaskDomain(task)).toBe('SHOPPING_COMPARISON');
    });

    it('strictly preserves WORKFLOW_ACTION for social and form submissions', () => {
      const task = 'Go to LinkedIn and post that today we have an evaluation for SIH 2026';
      expect(classifyTaskDomain(task)).toBe('WORKFLOW_ACTION');
    });

    it('strictly preserves INFORMATION_EXTRACTION for general portal research', () => {
      const task = 'Extract problem statement guidelines from SIH 2026 portal';
      expect(classifyTaskDomain(task)).toBe('INFORMATION_EXTRACTION');
    });
  });

  // -------------------------------------------------------------------------
  // 2. Prompt Generation & Schema Validation Tests
  // -------------------------------------------------------------------------
  describe('Geospatial Prompt Generation (generateDomainPrompt)', () => {
    it('produces dedicated GIS instructions with portal URLs and zoom action', () => {
      const prompt = generateDomainPrompt('ISRO_ENTERPRISE_OPERATIONS');
      expect(prompt).toContain('DOMAIN MODE: REAL-TIME ISRO SOVEREIGN ENTERPRISE & MISSION OPERATIONS');
      expect(prompt).toContain('bhuvan.nrsc.gov.in');
      expect(prompt).toContain('bhoonidhi.nrsc.gov.in');
      expect(prompt).toContain('action: "zoom", value: "in"');
      expect(prompt).toContain('"action": "click" | "select" | "zoom"');
      expect(prompt).toContain('Flood Hazard');
      expect(prompt).toContain('Odisha coastal sector');
    });
  });

  // -------------------------------------------------------------------------
  // 3. Client DOM Masking for GIS, Map Canvases & Thematic Layers
  // -------------------------------------------------------------------------
  describe('GIS & Map DOM Indexing (getMaskedDom)', () => {
    it('indexes map viewport canvas, zoom controls, thematic layer checkboxes, and sector buttons', () => {
      document.body.innerHTML = `
        <div id="bhuvan-portal">
          <input type="text" id="thematicSearch" placeholder="Search Thematic Layers (e.g. 'Flood Hazard', 'Drought')" />
          <div class="thematic-item layer-item" id="layerFloodHazard" role="treeitem">
            <input type="checkbox" id="chkFloodHazard" />
            <span>Flood Hazard Zonation (Mahanadi Basin)</span>
          </div>
          <div class="thematic-item layer-item" id="layerDrought" role="treeitem">
            <input type="checkbox" id="chkDrought" />
            <span>Agricultural Drought Vulnerability</span>
          </div>
          <input type="text" id="mapLocationSearch" placeholder="Search Location / Sector / Coordinates" />
          <button id="sectorOdisha" class="sector-btn">Odisha Coastal Sector</button>
          
          <div id="mapViewport" class="map-container ol-viewport" role="region" aria-label="ISRO Bhuvan Interactive Geospatial Map Canvas">
            <button id="zoomIn" class="ol-zoom-btn ol-zoom-in" title="Zoom in" aria-label="Zoom in">+</button>
            <button id="zoomOut" class="ol-zoom-btn ol-zoom-out" title="Zoom out" aria-label="Zoom out">−</button>
          </div>
        </div>
      `;

      const rawJson = getMaskedDom();
      const parsed = JSON.parse(rawJson);
      const elementMap = parsed.elementMap as Array<{ id: string; tag: string; meta?: string; text: string }>;

      // 1. Verify Map Canvas is identified
      const mapCanvas = elementMap.find((el) => el.meta?.includes('type="map-canvas"'));
      expect(mapCanvas).toBeDefined();
      expect(mapCanvas?.text).toContain('Interactive Geospatial Map Canvas');

      // 2. Verify Zoom In button has zoom control tag
      const zoomInBtn = elementMap.find((el) => el.meta?.includes('data-control="zoom-in"'));
      expect(zoomInBtn).toBeDefined();

      // 3. Verify Thematic Layers have thematic tags
      const floodHazardItem = elementMap.find((el) => el.text.includes('Flood Hazard'));
      expect(floodHazardItem).toBeDefined();

      // 4. Verify Sector button is indexed
      const odishaSectorBtn = elementMap.find((el) => el.text.includes('Odisha Coastal Sector'));
      expect(odishaSectorBtn).toBeDefined();
    });
  });

  // -------------------------------------------------------------------------
  // 4. Client Action Execution for GIS (Zoom In/Out, Layer Toggle, Geocoding)
  // -------------------------------------------------------------------------
  describe('Geospatial Action Execution (executeAction)', () => {
    it('executes action "zoom" with value "in" by clicking the explicit zoom-in button', async () => {
      let zoomInClicked = false;
      document.body.innerHTML = `
        <div class="ol-viewport">
          <button id="zoomIn" class="ol-zoom-in" title="Zoom in">+</button>
        </div>
      `;
      document.getElementById('zoomIn')?.addEventListener('click', () => {
        zoomInClicked = true;
      });

      const res = await executeAction({
        action: 'zoom',
        value: 'in',
      });

      expect(res.success).toBe(true);
      expect(zoomInClicked).toBe(true);
    });

    it('executes action "zoom" with value "out" by clicking the zoom-out button', async () => {
      let zoomOutClicked = false;
      document.body.innerHTML = `
        <div class="leaflet-container">
          <button id="zoomOut" class="leaflet-control-zoom-out" title="Zoom out">−</button>
        </div>
      `;
      document.getElementById('zoomOut')?.addEventListener('click', () => {
        zoomOutClicked = true;
      });

      const res = await executeAction({
        action: 'zoom',
        value: 'out',
      });

      expect(res.success).toBe(true);
      expect(zoomOutClicked).toBe(true);
    });

    it('executes action "zoom" via WheelEvent fallback when no explicit zoom button exists', async () => {
      let wheelReceived = false;
      let wheelDeltaY = 0;
      document.body.innerHTML = `
        <canvas id="mapCanvas" class="map-container" width="600" height="400"></canvas>
      `;
      const canvas = document.getElementById('mapCanvas') as HTMLCanvasElement;
      canvas.addEventListener('wheel', (e: WheelEvent) => {
        wheelReceived = true;
        wheelDeltaY = e.deltaY;
      });

      const res = await executeAction({
        action: 'zoom',
        value: 'in',
      });

      expect(res.success).toBe(true);
      expect(wheelReceived).toBe(true);
      expect(wheelDeltaY).toBe(-120);
    });

    it('toggles thematic layer checkbox and triggers state update', async () => {
      let layerToggled = false;
      document.body.innerHTML = `
        <div id="layerFloodHazard" class="thematic-item">
          <input type="checkbox" id="chkFloodHazard" />
          <span id="labelFlood">Flood Hazard Zonation</span>
        </div>
      `;
      const chk = document.getElementById('chkFloodHazard') as HTMLInputElement;
      chk.addEventListener('change', () => {
        layerToggled = true;
      });

      const res = await executeAction({
        action: 'click',
        id: 'chkFloodHazard',
      });

      expect(res.success).toBe(true);
      expect(chk.checked).toBe(true);
      expect(layerToggled).toBe(true);
    });

    it('types sector name and dispatches submit event on search form', async () => {
      let formSubmitted = false;
      let submittedValue = '';
      document.body.innerHTML = `
        <form id="geocoderForm">
          <input type="text" id="mapLocationSearch" name="location" value="" />
        </form>
      `;
      const form = document.getElementById('geocoderForm') as HTMLFormElement;
      const input = document.getElementById('mapLocationSearch') as HTMLInputElement;

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        formSubmitted = true;
        submittedValue = input.value;
      });

      const res = await executeAction({
        action: 'type',
        id: 'mapLocationSearch',
        value: 'Odisha coastal sector\n',
      });

      expect(res.success).toBe(true);
      expect(input.value).toBe('Odisha coastal sector');
      expect(formSubmitted).toBe(true);
      expect(submittedValue).toBe('Odisha coastal sector');
    });
  });
});
