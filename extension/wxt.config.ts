
import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: 'src',
  modules: [],
  dev: {
    port: 3300,
    open: false,
  },
  // Entrypoints (auto-discovered by WXT):
  //  - src/entrypoints/background  → MV3 service worker (telemetry engine)
  //  - src/entrypoints/content      → content script (redaction)
  //  - src/entrypoints/popup        → popup UI
  //  - src/entrypoints/dashboard    → full-tab Mission Control page, built as
  //    /dashboard.html (WXT unlisted page). Open via
  //    browser.tabs.create({ url: browser.runtime.getURL('/dashboard.html') }).
  vite: () => ({
    css: {
      postcss: './postcss.config.js',
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  }),
  manifest: {
    name: 'Zero-Trust AI Web Agent',
    description: 'A zero-trust AI web agent that masks PII and executes actions locally',
    version: '1.0.0',
    permissions: ['activeTab', 'scripting', 'storage', 'sidePanel', 'tabs'],
    host_permissions: ['<all_urls>'],
    side_panel: {
      default_path: 'sidepanel.html',
    },
    browser_specific_settings: {
      gecko: {
        id: 'sih-agent@isro.in',
        strict_min_version: '109.0',
      },
    },
    action: {
      default_title: 'Zero-Trust AI Agent',
    },
    content_security_policy: {
      extension_pages: "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';",
    },
    web_accessible_resources: [
      {
        resources: ['onnx/*'],
        matches: ['<all_urls>'],
      },
      {
        resources: ['mediapipe/*', 'mediapipe/wasm/*'],
        matches: ['<all_urls>'],
      },
      {
        resources: ['tesseract/*'],
        matches: ['<all_urls>'],
      },
    ],
  },
});
