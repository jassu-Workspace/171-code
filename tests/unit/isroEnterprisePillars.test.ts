/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { classifyTaskDomain, generateDomainPrompt } from '../../server/src/index';
import { getMaskedDom, executeAction } from '@/entrypoints/content/index';

describe('All-Encompassing ISRO Sovereign Enterprise Operations (7 Core Pillars)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  // -------------------------------------------------------------------------
  // 1. Task Domain Classification Across All 7 Pillars
  // -------------------------------------------------------------------------
  describe('Task Domain Classification across 7 Pillars (classifyTaskDomain)', () => {
    it('Pillar 1: classifies Mission Control (MOX) launch & telemetry queries', () => {
      const task = 'Monitor LVM3 launch telemetry and verify cryogenic stage pressure and reaction wheels';
      expect(classifyTaskDomain(task)).toBe('ISRO_ENTERPRISE_OPERATIONS');
    });

    it('Pillar 2: classifies Earth Observation (Bhuvan/Bhoonidhi) thematic GIS queries', () => {
      const task = "Open ISRO Bhuvan, navigate to Thematic Services, search for 'Flood Hazard', and zoom into the Odisha coastal sector.";
      expect(classifyTaskDomain(task)).toBe('ISRO_ENTERPRISE_OPERATIONS');
    });

    it('Pillar 3: classifies Ground Station Network (ISTRAC / Byalalu DSN) tracking queries', () => {
      const task = 'Authorize ground station antenna pass for Byalalu 32m DSN tracking RISAT-2BR1';
      expect(classifyTaskDomain(task)).toBe('ISRO_ENTERPRISE_OPERATIONS');
    });

    it('Pillar 4: classifies Secure Administrative & Scientist Clearance workflows', () => {
      const task = 'Verify Level 5 scientist security clearance for classified Gaganyaan payload access';
      expect(classifyTaskDomain(task)).toBe('ISRO_ENTERPRISE_OPERATIONS');
    });

    it('Pillar 5: classifies R&D, Propulsion Research & Patent queries (SAC/LPSC/VSSC)', () => {
      const task = 'Search LPSC propulsion research patents for cryogenic CE-20 injector designs';
      expect(classifyTaskDomain(task)).toBe('ISRO_ENTERPRISE_OPERATIONS');
    });

    it('Pillar 6: classifies Space Supply Chain & Aerospace Procurement tasks', () => {
      const task = 'Evaluate aerospace vendor procurement bids for Inconel 718 on ISRO portal';
      expect(classifyTaskDomain(task)).toBe('ISRO_ENTERPRISE_OPERATIONS');
    });

    it('Pillar 7: classifies Space Situational Awareness & Debris alerts (Project NETRA)', () => {
      const task = 'Analyze Project NETRA space debris conjunction warning for Cartosat-3 and authorize CAM';
      expect(classifyTaskDomain(task)).toBe('ISRO_ENTERPRISE_OPERATIONS');
    });

    it('classifies DOM markers with ISRO enterprise portals (e.g. MOX / CARA / Netra)', () => {
      const genericTask = 'Inspect critical orbital event status';
      const moxDom = '<div><h3>Mission Operations Complex (MOX)</h3><table class="conjunction-table"></table></div>';
      expect(classifyTaskDomain(genericTask, moxDom)).toBe('ISRO_ENTERPRISE_OPERATIONS');
    });

    it('preserves SHOPPING_COMPARISON for non-ISRO commercial e-commerce', () => {
      const task = 'Buy running shoes under Rs 3000 on Amazon';
      expect(classifyTaskDomain(task)).toBe('SHOPPING_COMPARISON');
    });

    it('preserves WORKFLOW_ACTION for non-ISRO social media workflows', () => {
      const task = 'Go to LinkedIn and post that today we completed hackathon development';
      expect(classifyTaskDomain(task)).toBe('WORKFLOW_ACTION');
    });

    it('preserves INFORMATION_EXTRACTION for general web research', () => {
      const task = 'Extract problem statement guidelines from SIH 2026 portal';
      expect(classifyTaskDomain(task)).toBe('INFORMATION_EXTRACTION');
    });
  });

  // -------------------------------------------------------------------------
  // 2. Multi-Pillar System Prompt Generation Tests
  // -------------------------------------------------------------------------
  describe('Multi-Pillar System Prompt Generation (generateDomainPrompt)', () => {
    it('produces dedicated guidance for all 7 ISRO pillars on real-time live web pages', () => {
      const prompt = generateDomainPrompt('ISRO_ENTERPRISE_OPERATIONS');
      expect(prompt).toContain('REAL-TIME ISRO SOVEREIGN ENTERPRISE & MISSION OPERATIONS (7 CORE PILLARS)');
      
      // Live production portal URLs
      expect(prompt).toContain('bhuvan.nrsc.gov.in');
      expect(prompt).toContain('bhoonidhi.nrsc.gov.in');
      expect(prompt).toContain('mosdac.gov.in');
      expect(prompt).toContain('vedas.sac.gov.in');
      expect(prompt).toContain('isro.gov.in');
      expect(prompt).toContain('eprocure.gov.in');
      expect(prompt).toContain('ipindiaservices.gov.in');
      expect(prompt).toContain('space-track.org');

      // Pillar 1: Mission Control
      expect(prompt).toContain('PILLAR 1: MISSION CONTROL & TELEMETRY MONITORING (MOX)');
      expect(prompt).toContain('Cryogenic Pressure');
      
      // Pillar 2: Earth Observation
      expect(prompt).toContain('PILLAR 2: EARTH OBSERVATION & REMOTE SENSING');
      expect(prompt).toContain('Odisha coastal sector');
      
      // Pillar 3: Ground Stations
      expect(prompt).toContain('PILLAR 3: GROUND STATION NETWORK OPERATIONS');
      expect(prompt).toContain('Byalalu Deep Space Network');
      
      // Pillar 4: Admin Clearances
      expect(prompt).toContain('PILLAR 4: SECURE ADMINISTRATIVE, HR & SCIENTIST CLEARANCES');
      expect(prompt).toContain('Level 5');
      
      // Pillar 5: Propulsion R&D & Patents
      expect(prompt).toContain('PILLAR 5: R&D, PROPULSION RESEARCH & PATENT ANALYSIS');
      expect(prompt).toContain('CE-20');
      
      // Pillar 6: Aerospace Procurement
      expect(prompt).toContain('PILLAR 6: AEROSPACE SUPPLY CHAIN & CONFIDENTIAL PROCUREMENT');
      expect(prompt).toContain('Inconel 718');
      
      // Pillar 7: Project NETRA SSA
      expect(prompt).toContain('PILLAR 7: SPACE SITUATIONAL AWARENESS & SPACE SECURITY (PROJECT NETRA)');
      expect(prompt).toContain('Collision Avoidance Maneuver (CAM)');
      
      // Scratchpad schema check
      expect(prompt).toContain('isroOperationalTelemetry');
      expect(prompt).toContain('activePillar');
    });
  });

  // -------------------------------------------------------------------------
  // 3. Client DOM Masking across All 7 Pillars
  // -------------------------------------------------------------------------
  describe('7-Pillar DOM Indexing & Classification (getMaskedDom)', () => {
    it('captures telemetry metrics, conjunction rows, tender bids, patents, and clearance controls', () => {
      document.body.innerHTML = `
        <div id="isro-master-suite">
          <!-- Pillar 1: MOX Telemetry -->
          <div class="telemetry-cell" data-telemetry="altitude">
            <span class="telemetry-label">Orbital Altitude</span>
            <span class="telemetry-val">504.2 km</span>
          </div>

          <!-- Pillar 2: Bhuvan GIS -->
          <button id="sectorOdisha" class="sector-btn">Odisha Coastal Sector</button>
          <div class="thematic-item layer-item" id="layerFloodHazard" role="treeitem">
            <input type="checkbox" id="chkFloodHazard" />
            <span>Flood Hazard Zonation</span>
          </div>
          <button id="zoomIn" class="ol-zoom-btn ol-zoom-in" title="Zoom in">+</button>

          <!-- Pillar 3: Ground Stations -->
          <button id="btnAuthorizePass" class="btn">Authorize Ground Station Pass</button>

          <!-- Pillar 4: Scientist Clearances -->
          <span class="clearance-badge" data-clearance-level="LEVEL-5">LEVEL-5 VERIFIED</span>
          <button id="btnVerifyClearance" class="btn">Verify Clearance</button>

          <!-- Pillar 5: Propulsion Patents -->
          <div class="card patent-item" id="patentCe20">
            <strong>IN-PAT-410294</strong>
            <span>Coaxial Swirl Injector Geometry for Staged Combustion Cryogenic Rocket Engines</span>
          </div>

          <!-- Pillar 6: Aerospace Procurement -->
          <table class="data-table">
            <tr class="tender-item" data-procurement-id="TND-2026-IN718">
              <td>Inconel 718 Forged Bars</td>
              <td>Mishra Dhatu Nigam Ltd (MIDHANI)</td>
              <td><button id="btnSelectMidhani">Select Bid</button></td>
            </tr>
          </table>

          <!-- Pillar 7: Project NETRA SSA -->
          <table class="data-table conjunction-table">
            <tr class="conjunction-row" data-debris-id="EVT-7721">
              <td>CARTOSAT-3 vs COSMOS-1408 DEB</td>
              <td>Miss Distance: 320 m</td>
            </tr>
          </table>
          <button id="btnAuthorizeCam" class="btn btn-danger">Authorize & Schedule CAM Thruster Burn</button>
        </div>
      `;

      const result = getMaskedDom();
      const parsed = JSON.parse(result);
      const elements = parsed.elementMap;

      // Telemetry element metadata check
      const telemetryEl = elements.find((e: any) => e.text.includes('504.2 km'));
      expect(telemetryEl).toBeDefined();
      expect(telemetryEl.meta).toContain('data-type="telemetry"');

      // Thematic layer metadata check
      const layerEl = elements.find((e: any) => e.text.includes('Flood Hazard Zonation'));
      expect(layerEl).toBeDefined();
      expect(layerEl.meta).toContain('data-type="thematic-layer"');

      // Zoom control metadata check
      const zoomEl = elements.find((e: any) => e.id && e.meta?.includes('data-control="zoom-in"'));
      expect(zoomEl).toBeDefined();

      // Clearance badge metadata check
      const clearanceEl = elements.find((e: any) => e.text.includes('LEVEL-5'));
      expect(clearanceEl).toBeDefined();
      expect(clearanceEl.meta).toContain('data-clearance="LEVEL-5"');

      // Patent metadata check
      const patentEl = elements.find((e: any) => e.text.includes('Coaxial Swirl Injector'));
      expect(patentEl).toBeDefined();
      expect(patentEl.meta).toContain('data-type="rd-patent"');

      // Tender item metadata check
      const tenderEl = elements.find((e: any) => e.text.includes('Inconel 718'));
      expect(tenderEl).toBeDefined();
      expect(tenderEl.meta).toContain('data-type="procurement-tender"');

      // Conjunction row metadata check
      const caraEl = elements.find((e: any) => e.text.includes('Miss Distance: 320 m'));
      expect(caraEl).toBeDefined();
      expect(caraEl.meta).toContain('data-type="cara-conjunction"');
    });
  });

  // -------------------------------------------------------------------------
  // 4. Action Execution across Specialized Pillar Controls
  // -------------------------------------------------------------------------
  describe('Action Execution on ISRO Sovereign Suite Controls (executeAction)', () => {
    it('executes zoom action on map zoom buttons', async () => {
      let zoomInClicked = false;
      document.body.innerHTML = `
        <div class="ol-viewport">
          <button id="zoomIn" class="ol-zoom-btn ol-zoom-in" title="Zoom in">+</button>
        </div>
      `;
      const btn = document.getElementById('zoomIn')!;
      btn.addEventListener('click', () => { zoomInClicked = true; });

      const res = await executeAction({ action: 'zoom', value: 'in' });
      expect(res.success).toBe(true);
      expect(zoomInClicked).toBe(true);
    });

    it('executes select action on vehicle mission dropdown', async () => {
      document.body.innerHTML = `
        <select id="moxVehicleSelect">
          <option value="LVM3-M4">LVM3-M4 / Chandrayaan-3</option>
          <option value="Gaganyaan-G1">Gaganyaan-G1 Uncrewed Test</option>
        </select>
      `;
      const select = document.getElementById('moxVehicleSelect') as HTMLSelectElement;

      const res = await executeAction({
        action: 'select',
        selector: '#moxVehicleSelect',
        value: 'Gaganyaan-G1'
      });
      expect(res.success).toBe(true);
      expect(select.value).toBe('Gaganyaan-G1');
    });

    it('executes click on NETRA CAM authorization button', async () => {
      let camAuthorized = false;
      document.body.innerHTML = `
        <button id="btnAuthorizeCam" class="btn btn-danger">Authorize & Schedule CAM Thruster Burn</button>
      `;
      const btn = document.getElementById('btnAuthorizeCam')!;
      btn.addEventListener('click', () => { camAuthorized = true; });

      const res = await executeAction({
        action: 'click',
        selector: '#btnAuthorizeCam'
      });
      expect(res.success).toBe(true);
      expect(camAuthorized).toBe(true);
    });

    it('executes click on Byalalu DSN pass authorization button', async () => {
      let passAuthorized = false;
      document.body.innerHTML = `
        <button id="btnAuthorizePass" class="btn">Authorize Ground Station Pass</button>
      `;
      const btn = document.getElementById('btnAuthorizePass')!;
      btn.addEventListener('click', () => { passAuthorized = true; });

      const res = await executeAction({
        action: 'click',
        selector: '#btnAuthorizePass'
      });
      expect(res.success).toBe(true);
      expect(passAuthorized).toBe(true);
    });

    it('executes click on Scientist Clearance verification button', async () => {
      let clearanceVerified = false;
      document.body.innerHTML = `
        <button id="btnVerifyClearance" class="btn">Verify Clearance</button>
      `;
      const btn = document.getElementById('btnVerifyClearance')!;
      btn.addEventListener('click', () => { clearanceVerified = true; });

      const res = await executeAction({
        action: 'click',
        selector: '#btnVerifyClearance'
      });
      expect(res.success).toBe(true);
      expect(clearanceVerified).toBe(true);
    });
  });
});
