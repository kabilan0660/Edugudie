// src/env.d.ts
/// <reference types="vite/client" />

/**
 * Shape of environment variables exposed to client code via Vite.
 * Add any additional VITE_ variables here.
 */
interface ImportMetaEnv {
  VITE_API_URL: string;
  // add other env vars if needed
}

/**
 * Extend the global ImportMeta type so TypeScript knows about import.meta.env.
 */
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
