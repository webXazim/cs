const enabledValue = String(import.meta.env.VITE_CONSOLE_ENABLED || '').trim().toLowerCase();

export const CONSOLE_CONFIG = Object.freeze({
  enabled: enabledValue === 'true',
  apiBaseUrl: String(import.meta.env.VITE_CONSOLE_API_BASE_URL || '/api').replace(/\/+$/, '') || '/api'
});

export function isConsoleEnabled() {
  return CONSOLE_CONFIG.enabled;
}
