# CrescentSphere product media

This directory is reserved for real product screenshots used by the public marketing site.

Recommended structure:

```text
public/products/
├── mail/
├── mailer/
├── docs/
├── connect/
├── notes/
└── keylang/
```

For each product, prefer optimized AVIF/WebP exports such as:

- `desktop.avif` / `desktop.webp` — wide application screenshot
- `mobile.avif` / `mobile.webp` — optional narrow/mobile screenshot

Then set the corresponding `media.desktopSrc`, `media.desktopSrcSet`, `media.mobileSrc`, or `media.mobileSrcSet` values in `src/products/catalog.js`.

When no source is configured, `ProductMedia` automatically keeps rendering the current interactive React prototype. There is no customer-facing placeholder state.
