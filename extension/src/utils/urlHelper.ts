/**
 * Checks if a tab's URL is restricted by Chrome MV3 security (e.g. chrome://, about:, extension://).
 */
export function isRestrictedUrl(url: string | undefined | null): boolean {
  if (!url) return true;
  return (
    url.startsWith('chrome://') ||
    url.startsWith('chrome-extension://') ||
    url.startsWith('edge://') ||
    url.startsWith('about:') ||
    url.includes('chromewebstore.google.com') ||
    url.includes('chrome.google.com/webstore')
  );
}
