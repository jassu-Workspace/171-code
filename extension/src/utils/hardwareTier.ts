/**
 * hardwareTier.ts — Adaptive Client-Side Hardware Tiering Engine.
 *
 * Implements SIH 2026 Problem Statement 26171 (ISRO) Resource Utilization requirements:
 * Probes the client device's GPU, CPU logical cores, and system memory to dynamically
 * assign a tier (High / Mid / Low).
 *
 * Configures the optimal ONNX Runtime execution provider:
 *   - Tier 1 (High): WebGPU hardware acceleration (sub-200ms latency)
 *   - Tier 2 (Mid): WASM SIMD multi-threaded execution (~400ms latency)
 *   - Tier 3 (Low): Single-threaded WASM with aggressive memory bounds for budget institutional PCs.
 */

export type HardwareTier = 'TIER_1_HIGH' | 'TIER_2_MID' | 'TIER_3_LOW';

export interface HardwareProfile {
  tier: HardwareTier;
  hasWebGPU: boolean;
  cores: number;
  memoryGB: number;
  executionProviders: Array<'webgpu' | 'wasm'>;
  numThreads: number;
  label: string;
  badge: string;
}

/**
 * Pure function to classify hardware tier from given specs.
 * Safe for unit testing without relying on browser globals.
 */
export function classifyHardwareTier(
  hasWebGPU: boolean,
  cores: number,
  memoryGB: number
): HardwareProfile {
  if (hasWebGPU && memoryGB >= 8 && cores >= 6) {
    return {
      tier: 'TIER_1_HIGH',
      hasWebGPU: true,
      cores,
      memoryGB,
      executionProviders: ['webgpu', 'wasm'],
      numThreads: Math.min(4, Math.max(1, cores - 1)),
      label: 'Tier 1: High-Capacity Workstation (WebGPU Active)',
      badge: 'TIER 1 (WebGPU)',
    };
  }

  if (memoryGB >= 4 && cores >= 4) {
    return {
      tier: 'TIER_2_MID',
      hasWebGPU,
      cores,
      memoryGB,
      executionProviders: hasWebGPU ? ['webgpu', 'wasm'] : ['wasm'],
      numThreads: Math.min(4, Math.max(1, cores - 1)),
      label: 'Tier 2: Standard Balanced (WASM Multi-Thread)',
      badge: hasWebGPU ? 'TIER 2 (WebGPU Hybrid)' : 'TIER 2 (WASM SIMD)',
    };
  }

  return {
    tier: 'TIER_3_LOW',
    hasWebGPU: false,
    cores,
    memoryGB,
    executionProviders: ['wasm'],
    numThreads: 1, // Single-threaded for low-spec stability
    label: 'Tier 3: Resource-Constrained (WASM Lite Single-Thread)',
    badge: 'TIER 3 (WASM Lite)',
  };
}

let cachedProfile: HardwareProfile | null = null;

/**
 * Asynchronously probes the host system and returns the cached hardware profile.
 * Probes WebGPU availability safely with a 500ms timeout to avoid hanging.
 */
export async function detectHardwareTier(): Promise<HardwareProfile> {
  if (cachedProfile) return cachedProfile;

  let hasWebGPU = false;
  let cores = 4;
  let memoryGB = 8;

  // 1. Probe CPU Cores & RAM
  if (typeof navigator !== 'undefined') {
    cores = navigator.hardwareConcurrency || 4;
    // navigator.deviceMemory is supported in Chromium (returns GB: e.g. 4, 8, 16)
    const devMem = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
    if (typeof devMem === 'number' && devMem > 0) {
      memoryGB = devMem;
    }
  }

  // 2. Probe WebGPU Availability with timeout guard
  if (typeof navigator !== 'undefined' && 'gpu' in navigator && (navigator as any).gpu) {
    try {
      const adapterPromise = (navigator as any).gpu.requestAdapter();
      const timeoutPromise = new Promise<null>((res) => setTimeout(() => res(null), 500));
      const adapter = await Promise.race([adapterPromise, timeoutPromise]);
      hasWebGPU = adapter !== null && adapter !== undefined;
    } catch {
      hasWebGPU = false;
    }
  }

  cachedProfile = classifyHardwareTier(hasWebGPU, cores, memoryGB);
  console.log('[hardwareTier] Profile detected:', cachedProfile.label, `(WebGPU: ${hasWebGPU}, RAM: ${memoryGB}GB, Cores: ${cores})`);
  return cachedProfile;
}

/**
 * Synchronous accessor that returns the cached profile or a sensible default.
 */
export function getHardwareProfile(): HardwareProfile {
  if (cachedProfile) return cachedProfile;
  // Default to mid-tier until async detect completes
  return classifyHardwareTier(false, 4, 8);
}
