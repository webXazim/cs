import { isConsolePath, normalizePathname } from '../../app/routes.js';
import { isConsoleEnabled } from '../console/consoleConfig.js';

export const SITE_URL = String(import.meta.env.VITE_SITE_URL || 'https://crescentsphere.com').replace(/\/+$/, '');
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/og/crescentsphere-og.png`;

const HOME_DESCRIPTION = 'A family of focused digital tools for business email, application email delivery, operations, messaging, secure notes, typing, and English–Arabic practice.';

const META = Object.freeze({
  '/': {
    title: 'CrescentSphere — Focused digital tools for everyday work',
    description: HOME_DESCRIPTION
  },
  '/mail': {
    title: 'CS Mail — Business Email | CrescentSphere',
    description: 'A focused business inbox for customer questions, supplier updates, project threads, attachments, folders, labels, and everyday correspondence.'
  },
  '/mailer': {
    title: 'CS Mailer — Email API & SMTP | CrescentSphere',
    description: 'Send transactional application email with API or SMTP and review delivery activity for verification messages, receipts, password resets, and alerts.'
  },
  '/docs': {
    title: 'CS Docs — Invoicing, Payroll & Inventory | CrescentSphere',
    description: 'Manage invoices, payroll, inventory, and recurring business records in a focused workspace built for everyday operations.'
  },
  '/connect': {
    title: 'CS Connect — Focused Team Messaging | CrescentSphere',
    description: 'Direct and group messaging with clear unread states, replies, reactions, and shared files for everyday team conversations.'
  },
  '/notes': {
    title: 'CS Notes — Private, Focused Notes | CrescentSphere',
    description: 'Capture work notes, personal reference, checklists, and important snippets with fast search, collections, and a quiet private workspace.'
  },
  '/keylang': {
    title: 'CS KeyLang — Typing & Language Practice | CrescentSphere',
    description: 'Practice typing speed and accuracy alongside practical English and Arabic phrase practice in a focused learning workspace.'
  },
  '/products': {
    title: 'CrescentSphere Products — Six Focused Tools',
    description: 'Explore CS Mail, CS Mailer, CS Docs, CS Connect, CS Notes, and CS KeyLang and choose the product that fits the job.'
  },
  '/about': {
    title: 'About CrescentSphere — Focused Digital Tools',
    description: 'Learn how CrescentSphere approaches standalone digital products for business communication, operations, productivity, and language practice.'
  },
  '/privacy': {
    title: 'Privacy | CrescentSphere',
    description: 'Read the general CrescentSphere privacy notice and how product-specific privacy information may apply to individual services.'
  },
  '/terms': {
    title: 'Terms | CrescentSphere',
    description: 'Read the general terms for the CrescentSphere public website and services that expressly incorporate these terms.'
  }
});

export function metadataForPath(pathname) {
  const path = normalizePathname(pathname);
  if (isConsolePath(path)) {
    if (!isConsoleEnabled()) {
      return {
        path,
        title: 'Page not found | CrescentSphere',
        description: 'The requested CrescentSphere page could not be found.',
        robots: 'noindex,nofollow,noarchive',
        canonical: null,
        type: 'website'
      };
    }

    return {
      path,
      title: 'CrescentSphere Console',
      description: 'Authenticated CrescentSphere application area.',
      robots: 'noindex,nofollow,noarchive',
      canonical: null,
      type: 'website'
    };
  }

  const metadata = META[path];
  if (!metadata) {
    return {
      path,
      title: 'Page not found | CrescentSphere',
      description: 'The requested CrescentSphere page could not be found.',
      robots: 'noindex,follow',
      canonical: null,
      type: 'website'
    };
  }

  return {
    path,
    ...metadata,
    robots: 'index,follow,max-image-preview:large',
    canonical: `${SITE_URL}${path === '/' ? '/' : path}`,
    type: 'website'
  };
}
