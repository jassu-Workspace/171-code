import { describe, it, expect } from 'vitest';
import { classifyHardwareTier, getHardwareProfile } from '../../src/utils/hardwareTier';

describe('hardwareTier — Adaptive Client-Side Hardware Tiering', () => {
  it('classifies high-end system with WebGPU, >=8GB RAM, >=6 cores as TIER_1_HIGH', () => {
    const profile = classifyHardwareTier(true, 8, 16);
    expect(profile.tier).toBe('TIER_1_HIGH');
    expect(profile.executionProviders).toEqual(['webgpu', 'wasm']);
    expect(profile.hasWebGPU).toBe(true);
    expect(profile.badge).toBe('TIER 1 (WebGPU)');
    expect(profile.numThreads).toBeGreaterThanOrEqual(2);
  });

  it('classifies standard laptop with 4-8GB RAM as TIER_2_MID', () => {
    const profileNoGPU = classifyHardwareTier(false, 4, 8);
    expect(profileNoGPU.tier).toBe('TIER_2_MID');
    expect(profileNoGPU.executionProviders).toEqual(['wasm']);
    expect(profileNoGPU.badge).toBe('TIER 2 (WASM SIMD)');

    const profileWithGPU = classifyHardwareTier(true, 4, 4);
    expect(profileWithGPU.tier).toBe('TIER_2_MID');
    expect(profileWithGPU.executionProviders).toEqual(['webgpu', 'wasm']);
    expect(profileWithGPU.badge).toBe('TIER 2 (WebGPU Hybrid)');
  });

  it('classifies low-spec machine with <=4GB RAM or <=2 cores as TIER_3_LOW', () => {
    const profileLowRam = classifyHardwareTier(false, 4, 2);
    expect(profileLowRam.tier).toBe('TIER_3_LOW');
    expect(profileLowRam.executionProviders).toEqual(['wasm']);
    expect(profileLowRam.badge).toBe('TIER 3 (WASM Lite)');
    expect(profileLowRam.numThreads).toBe(1); // Enforce single thread for stability

    const profileLowCores = classifyHardwareTier(false, 2, 8);
    expect(profileLowCores.tier).toBe('TIER_3_LOW');
    expect(profileLowCores.numThreads).toBe(1);
  });

  it('returns a safe fallback profile from getHardwareProfile()', () => {
    const profile = getHardwareProfile();
    expect(profile).toBeDefined();
    expect(['TIER_1_HIGH', 'TIER_2_MID', 'TIER_3_LOW']).toContain(profile.tier);
    expect(profile.executionProviders.length).toBeGreaterThan(0);
  });
});
