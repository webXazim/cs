# CrescentSphere VPS deployment

## Build

Use Node.js 20.19 or newer.

```bash
npm install
npm run build
```

The repository does not currently include a lockfile because dependency installation was not completed in the build environment used to package this prototype. After the first successful install, commit the generated `package-lock.json`; subsequent VPS deployments should use `npm ci` for reproducible installs.

The deployable output is `dist/`.

## Suggested VPS layout

```text
/var/www/crescentsphere/
└── dist/
```

Copy the built `dist/` directory to that location, then install the supplied `deploy/nginx.conf` as the CrescentSphere Nginx server block and reload Nginx after validating the configuration.

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## HTTPS

The supplied server block listens on HTTP so it can be installed before certificates exist. Use the VPS certificate workflow you prefer to add the HTTPS listener and redirect HTTP to HTTPS. Keep the SPA route and cache rules from the supplied configuration.

## Deploy updates safely

Build into a temporary release directory, then replace the active `dist/` directory atomically or with a release symlink. `index.html` is configured not to be cached, while static assets can be cached for longer periods.

## Environment

Public production build:

```env
VITE_SITE_URL=https://crescentsphere.com
VITE_CONSOLE_ENABLED=false
VITE_CONSOLE_API_BASE_URL=/api
```

`VITE_SITE_URL` may be changed for staging builds.

Keep `VITE_CONSOLE_ENABLED=false` until authentication and at least one real console screen are ready. The `/console/*` route family already reaches the SPA shell, but the React feature gate renders the normal not-found experience while the console is disabled.

## Future console deployment

When console implementation begins:

1. build authentication and backend authorization first;
2. implement console routes beneath `src/features/console/`;
3. set `VITE_CONSOLE_ENABLED=true` only for the intended deployment;
4. configure the real API origin or reverse proxy to match `VITE_CONSOLE_API_BASE_URL`;
5. keep `/console/*` out of the public sitemap and keep `noindex` metadata;
6. never rely on robots rules or the frontend feature flag as access control.

The public website and console can remain in one Vite deployment initially. If the console later grows large enough to justify a separate build or subdomain, the existing `/console/*` boundary provides a clean extraction point.
