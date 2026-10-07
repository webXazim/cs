# CrescentSphere SPA Architecture

## Application boundaries

CrescentSphere now has two intentionally separate frontend concerns:

1. **Public website** — marketing, product discovery, About, Privacy and Terms.
2. **Future console** — an authenticated application mounted only under `/console/*`.

The public site is complete as a React SPA architecture. The console boundary exists, but the real console is intentionally not implemented or enabled yet.

## Public routing model

`src/app/routes.js` is the canonical mapping between public URL, visible marketing panel, and logo identity.

| Path | Panel key | Logo state |
| --- | --- | --- |
| `/` | `overview` | `master` |
| `/mail` | `mail` | `mail` |
| `/mailer` | `dev` | `mailer` |
| `/docs` | `docs` | `docs` |
| `/connect` | `connect` | `connect` |
| `/notes` | `notes` | `notes` |
| `/keylang` | `keylang` | `keylang` |
| `/products` | `cta` | `master` |

Long-form public routes are intentionally outside the horizontal journey:

- `/about`
- `/privacy`
- `/terms`

React Router owns browser URL/history state. `src/features/journey/useJourneyNavigation.js` owns the public product journey state and synchronizes the visible panel with the route.

## React journey controller

The journey hook owns:

- active panel index
- desktop horizontal track position
- wheel and trackpad intent
- touch swipe navigation
- keyboard navigation
- browser route synchronization
- direct product-link navigation
- mobile/tablet vertical-scroll synchronization
- focus movement and screen-reader announcements
- transition state and retargeting

A new deliberate gesture can retarget an in-progress desktop transition after a short input cooldown instead of waiting for the entire slide to finish.

## React brand controller

`src/components/marketing/BrandNavigator.jsx` owns the product-family identity/navigation interface. The active logo state is passed directly from React journey state rather than synchronized through a document-level brand controller.

`src/features/brand/brandStates.js` is the canonical brand metadata layer for the master identity plus the six products.

## Approved logo engine boundary

The approved primary logo renderer remains isolated under `src/features/brand/engine/`:

- `cs-logo-engine.js` — static product marks used inside product previews and menus.
- `cs-morph-logo.js` — transforming CrescentSphere mark used in the persistent identity navigator.

These are low-level renderers rather than navigation controllers. React requests the target state; the morph renderer preserves the approved geometry and animation system including material-aware morphing, direct product-to-product transformations, lightning effects, touch/hover response, interruption handling and reduced-motion behavior.

## Product module boundary

`src/products/catalog.js` is the single source for service-page identity, copy, feature pills, CTA text, route metadata, and panel data attributes. Each product directory owns its panel wrapper and its current interface preview.

Shared public marketing composition (`ServicePanel`, `ServiceIntro`, `FeaturePills`, `UseLine`, `ServiceCTA`) lives under `src/components/marketing/service/`.

## Product media boundary

`src/components/marketing/media/ProductMedia.jsx` is the single media boundary for every service page. Each product panel renders its current interactive preview through this component. If screenshot sources are absent, the current prototype remains the fallback.

Each service entry in `src/products/catalog.js` owns a `media` object with desktop/mobile source slots, alt text, object-fit/position, and loading behavior. Real product assets belong under `public/products/<product>/`.

## Information pages

`InfoPageShell` provides the shared vertical layout for `/about`, `/privacy`, `/terms`, and the client-side 404 experience. These pages reuse the CrescentSphere identity but do not participate in horizontal product movement.

## Production delivery layer

`src/features/seo/` owns client-side route metadata. Every public route has a specific title and description, while canonical, Open Graph, Twitter and robots metadata synchronize whenever React Router changes location.

`public/sitemap.xml`, `public/robots.txt`, `public/site.webmanifest`, `public/og/`, and `public/icons/` form the static discovery/share layer.

The supplied Nginx configuration distinguishes known SPA route families from unknown paths. Public routes and the reserved console family can receive `index.html` for direct navigation; unrelated unknown paths return the static `404.html`.

## Future console boundary — Upgrade 08

`/console` and `/console/*` are recognized separately from every public route. They do not participate in the marketing journey and are not represented in public product navigation.

The boundary is implemented under:

```text
src/features/console/
├── ConsoleBoundary.jsx
├── ConsoleApp.jsx
├── consoleConfig.js
├── api/
│   └── consoleApiClient.js
├── auth/
├── layout/
└── modules/
```

### Feature gate

`VITE_CONSOLE_ENABLED` defaults to `false`. When false, React renders the normal not-found experience for `/console/*`. The `ConsoleApp` lazy chunk is not mounted.

`VITE_CONSOLE_API_BASE_URL` reserves the future API origin/path without coupling the public website to it.

### Search/discovery rules

Console routes:

- use `noindex,nofollow,noarchive` metadata;
- are excluded from the public sitemap;
- are disallowed in `robots.txt`;
- are not linked from public marketing navigation.

These are discovery controls, not security controls. Real console security must come from authentication, authorization and backend enforcement.

### Authentication rule

When console implementation begins, session resolution and access control must happen inside `src/features/console/auth/` before protected application modules mount. The public marketing components must not own authentication state.

### Data rule

`api/consoleApiClient.js` supplies only a narrow transport boundary. It can accept a future access-token provider and defaults to cookie-capable requests. Product API clients/data hooks should be built inside the relevant console modules rather than inside the public product-preview code.

### Layout rule

The console gets its own responsive application shell under `layout/`. Do not reuse the horizontal marketing journey as the authenticated application layout.

### Product-module rule

Future console modules can be created under `modules/mail`, `modules/mailer`, `modules/docs`, `modules/connect`, `modules/notes`, `modules/keylang`, and `modules/settings`. Each should own its internal routes, data hooks and application UI.

## Remaining legacy boundary

`src/legacy/site-interactions.js` contains only interactions for the public product-preview prototypes and small presentation helpers. It does not own routing, horizontal navigation, brand identity, authentication, or future console state.
