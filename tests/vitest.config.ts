import { defineConfig } from 'vitest/config';
import { join } from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    // Headless by default (no browser / headed mode). jsdom is applied
    // per-file via environmentMatchGlobs so node tests stay fast.
    environment: 'node',
    environmentMatchGlobs: [
      // Client-side logic needs a DOM (document, MutationObserver).
      ['unit/client.test.ts', 'jsdom'],
      // Legacy smart-wait test also touches `document` (pre-existing file).
      ['unit/smart-wait.test.ts', 'jsdom'],
      ['unit/semanticRedaction.test.ts', 'jsdom'],
      ['unit/richTextTyping.test.ts', 'jsdom'],
      ['unit/elementResolverAndNavigation.test.ts', 'jsdom'],
      ['unit/geospatialISRO.test.ts', 'jsdom'],
      ['unit/isroEnterprisePillars.test.ts', 'jsdom'],
    ],
    setupFiles: [join(__dirname, 'setup', 'setupExtensionMock.ts')],
    include: [
      'unit/**/*.test.ts',
      'integration/**/*.test.ts',
      'security/**/*.test.ts',
      'e2e/**/*.test.ts',
    ],
    exclude: ['node_modules', 'fixtures', 'data'],
    // Fast + parallel: threads pool, isolated workers, no single-thread bottleneck.
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        isolate: true,
      },
    },
    fileParallelism: true,
    isolate: true,
    testTimeout: 15000,
    hookTimeout: 10000,
    teardownTimeout: 5000,
    // Fail loudly on unhandled rejections (chaos tests must not swallow crashes).
    dangerouslyIgnoreUnhandledErrors: false,
    reporters: ['default'],
  },
  resolve: {
    alias: {
      '@': join(__dirname, '..', 'extension', 'src'),
    },
  },
});
