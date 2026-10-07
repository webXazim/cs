import { CONSOLE_CONFIG } from '../consoleConfig.js';

function normalizeResource(resource = '') {
  const value = String(resource || '').trim();
  if (!value) return '';
  return value.startsWith('/') ? value : `/${value}`;
}

export function createConsoleApiClient({
  baseUrl = CONSOLE_CONFIG.apiBaseUrl,
  getAccessToken = () => null,
  fetchImpl = globalThis.fetch?.bind(globalThis)
} = {}) {
  if (typeof fetchImpl !== 'function') {
    throw new Error('A fetch implementation is required for the CrescentSphere console API client.');
  }

  const normalizedBase = String(baseUrl || '').replace(/\/+$/, '');

  async function request(resource, options = {}) {
    const token = await getAccessToken();
    const headers = new Headers(options.headers || {});

    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
    if (options.body && !isFormData && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    return fetchImpl(`${normalizedBase}${normalizeResource(resource)}`, {
      credentials: 'include',
      ...options,
      headers
    });
  }

  return Object.freeze({ request });
}
