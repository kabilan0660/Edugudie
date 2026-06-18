// src/config.ts
/**
 * Centralized configuration constants.
 * Currently only the backend API base URL, read from Vite env variables.
 */
export const API_BASE = import.meta.env.VITE_API_URL || '';
