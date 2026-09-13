/**
 * Minimal Node.js type shims — avoids requiring @types/node to keep deps exact.
 * Only declares the specific globals/modules actually used in the codebase.
 */

declare module 'node:crypto' {
  export function randomUUID(): string;
}

declare module 'node:fs' {
  export function appendFileSync(path: string, data: string, options?: { encoding?: string }): void;
  export function mkdirSync(path: string, options?: { recursive?: boolean }): void;
  export function existsSync(path: string): boolean;
}

declare module 'node:path' {
  export function join(...paths: string[]): string;
}

declare module 'node:url' {
  export function fileURLToPath(url: string): string;
}

declare namespace NodeJS {
  interface Timeout {
    ref(): Timeout;
    unref(): Timeout;
  }
}

// Override setTimeout/clearTimeout to use NodeJS.Timeout for unref() support
declare function setTimeout(callback: () => void, ms: number): NodeJS.Timeout;
declare function clearTimeout(timeoutId: NodeJS.Timeout | number): void;
