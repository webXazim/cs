import { useEffect } from 'react';
import { DEFAULT_SOCIAL_IMAGE, metadataForPath, SITE_URL } from './siteMetadata.js';

function ensureMeta(selector, attributes) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    document.head.appendChild(node);
  }
  return node;
}

function setNamedMeta(name, content) {
  const node = ensureMeta(`meta[name="${name}"]`, { name });
  node.setAttribute('content', content);
}

function setPropertyMeta(property, content) {
  const node = ensureMeta(`meta[property="${property}"]`, { property });
  node.setAttribute('content', content);
}

function setCanonical(href) {
  let node = document.head.querySelector('link[rel="canonical"]');
  if (!href) {
    node?.remove();
    return;
  }
  if (!node) {
    node = document.createElement('link');
    node.setAttribute('rel', 'canonical');
    document.head.appendChild(node);
  }
  node.setAttribute('href', href);
}

export default function useRouteMetadata(pathname) {
  useEffect(() => {
    const meta = metadataForPath(pathname);
    document.title = meta.title;
    document.documentElement.lang = 'en';

    setNamedMeta('description', meta.description);
    setNamedMeta('robots', meta.robots);
    setNamedMeta('twitter:card', 'summary_large_image');
    setNamedMeta('twitter:title', meta.title);
    setNamedMeta('twitter:description', meta.description);
    setNamedMeta('twitter:image', DEFAULT_SOCIAL_IMAGE);

    setPropertyMeta('og:type', meta.type);
    setPropertyMeta('og:site_name', 'CrescentSphere');
    setPropertyMeta('og:title', meta.title);
    setPropertyMeta('og:description', meta.description);
    setPropertyMeta('og:image', DEFAULT_SOCIAL_IMAGE);
    setPropertyMeta('og:image:width', '1200');
    setPropertyMeta('og:image:height', '630');
    setPropertyMeta('og:image:alt', 'CrescentSphere');
    setPropertyMeta('og:url', meta.canonical || `${SITE_URL}${meta.path}`);

    setCanonical(meta.canonical);
  }, [pathname]);
}
