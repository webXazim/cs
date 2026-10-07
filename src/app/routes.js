export const MARKETING_ROUTES = Object.freeze([
  { path: '/', panelKey: 'overview', logoState: 'master', label: 'CrescentSphere', index: 0 },
  { path: '/mail', panelKey: 'mail', logoState: 'mail', label: 'CS Mail', index: 1 },
  { path: '/mailer', panelKey: 'dev', logoState: 'mailer', label: 'CS Mailer', index: 2 },
  { path: '/docs', panelKey: 'docs', logoState: 'docs', label: 'CS Docs', index: 3 },
  { path: '/connect', panelKey: 'connect', logoState: 'connect', label: 'CS Connect', index: 4 },
  { path: '/notes', panelKey: 'notes', logoState: 'notes', label: 'CS Notes', index: 5 },
  { path: '/keylang', panelKey: 'keylang', logoState: 'keylang', label: 'CS KeyLang', index: 6 },
  { path: '/products', panelKey: 'cta', logoState: 'master', label: 'CrescentSphere products', index: 7 }
]);

export const INFO_ROUTES = Object.freeze([
  { path: '/about', pageKey: 'about', label: 'About CrescentSphere' },
  { path: '/privacy', pageKey: 'privacy', label: 'Privacy' },
  { path: '/terms', pageKey: 'terms', label: 'Terms' }
]);

export const CONSOLE_ROUTE_FAMILY = Object.freeze({
  path: '/console',
  prefix: '/console',
  label: 'CrescentSphere Console'
});

const byPath = new Map(MARKETING_ROUTES.map((route) => [route.path, route]));
const infoByPath = new Map(INFO_ROUTES.map((route) => [route.path, route]));
const byPanelKey = new Map(MARKETING_ROUTES.map((route) => [route.panelKey, route]));
const byLogoState = new Map(MARKETING_ROUTES.filter((route) => route.panelKey !== 'cta').map((route) => [route.logoState, route]));

export function normalizePathname(pathname = '/') {
  const raw = String(pathname || '/').split('?')[0].split('#')[0] || '/';
  if (raw === '/') return '/';
  return raw.replace(/\/+$/, '') || '/';
}

export function routeForPath(pathname) {
  return byPath.get(normalizePathname(pathname)) || null;
}

export function infoRouteForPath(pathname) {
  return infoByPath.get(normalizePathname(pathname)) || null;
}

export function routeForPanelKey(panelKey) {
  return byPanelKey.get(String(panelKey || '')) || null;
}

export function routeForLogoState(state) {
  return byLogoState.get(String(state || '')) || byLogoState.get('master');
}

export function pathForPanelKey(panelKey) {
  return routeForPanelKey(panelKey)?.path || '/';
}

export function panelIndexForPath(pathname) {
  return routeForPath(pathname)?.index ?? 0;
}

export function isMarketingPath(pathname) {
  return Boolean(routeForPath(pathname));
}

export function isInfoPath(pathname) {
  return Boolean(infoRouteForPath(pathname));
}

export function isConsolePath(pathname) {
  const path = normalizePathname(pathname);
  return path === CONSOLE_ROUTE_FAMILY.path || path.startsWith(`${CONSOLE_ROUTE_FAMILY.prefix}/`);
}

export function isSitePath(pathname) {
  return isMarketingPath(pathname) || isInfoPath(pathname) || isConsolePath(pathname);
}
