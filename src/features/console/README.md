# CrescentSphere Console Boundary

Upgrade 08 establishes `/console/*` as a separate application boundary without shipping a real console yet.

## Current behavior

- `/console` and every `/console/*` URL are recognized by the React application.
- The console bundle is lazy-loaded separately from the public marketing site.
- `VITE_CONSOLE_ENABLED` defaults to `false`; disabled console routes render the normal CrescentSphere not-found experience.
- Console routes are `noindex,nofollow` and are intentionally excluded from the public sitemap.
- Nginx sends `/console/*` direct requests to the SPA shell so the React console boundary can handle them.

## Enable only when console implementation begins

```env
VITE_CONSOLE_ENABLED=true
VITE_CONSOLE_API_BASE_URL=/api
```

The current `ConsoleApp.jsx` is only a development scaffold. Do not enable it on the public production site until authentication and the first real console route are implemented.

## Boundaries

- `ConsoleBoundary.jsx` — feature gate and lazy application mount.
- `consoleConfig.js` — build-time console configuration.
- `api/consoleApiClient.js` — small future API transport boundary; it does not assume an auth provider.
- `auth/` — future sessions, login/recovery and authorization.
- `layout/` — future application shell/navigation.
- `modules/` — future Mail, Mailer, Docs, Connect, Notes, KeyLang and settings modules.

The console must not import or depend on `useJourneyNavigation`. Public marketing state and authenticated application state remain separate.
