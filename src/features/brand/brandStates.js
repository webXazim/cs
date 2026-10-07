export const BRAND_STATES = Object.freeze({
  master: { state: 'master', label: 'CrescentSphere', path: '/', description: 'Product family' },
  mail: { state: 'mail', label: 'CS Mail', path: '/mail', description: 'Business email' },
  mailer: { state: 'mailer', label: 'CS Mailer', path: '/mailer', description: 'Transactional email' },
  docs: { state: 'docs', label: 'CS Docs', path: '/docs', description: 'Operations' },
  connect: { state: 'connect', label: 'CS Connect', path: '/connect', description: 'Communication' },
  notes: { state: 'notes', label: 'CS Notes', path: '/notes', description: 'Secure notes' },
  keylang: { state: 'keylang', label: 'CS KeyLang', path: '/keylang', description: 'Typing & language' }
});

export const BRAND_STATE_ORDER = Object.freeze([
  'master',
  'mail',
  'mailer',
  'docs',
  'connect',
  'notes',
  'keylang'
]);

export function normalizeBrandState(value) {
  const key = String(value || 'master').toLowerCase();
  return BRAND_STATES[key] ? key : 'master';
}

export function brandStateMeta(value) {
  return BRAND_STATES[normalizeBrandState(value)];
}
