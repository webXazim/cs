import { lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { infoRouteForPath, isConsolePath, isMarketingPath } from './app/routes.js';
import RouteLoading from './components/system/RouteLoading.jsx';
import useRouteMetadata from './features/seo/useRouteMetadata.js';

const MarketingSite = lazy(() => import('./components/marketing/MarketingSite.jsx'));
const AboutPage = lazy(() => import('./pages/about/AboutPage.jsx'));
const PrivacyPage = lazy(() => import('./pages/legal/PrivacyPage.jsx'));
const TermsPage = lazy(() => import('./pages/legal/TermsPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/not-found/NotFoundPage.jsx'));
const ConsoleBoundary = lazy(() => import('./features/console/ConsoleBoundary.jsx'));

const INFO_PAGE_COMPONENTS = Object.freeze({
  about: AboutPage,
  privacy: PrivacyPage,
  terms: TermsPage
});

export default function App() {
  const location = useLocation();
  useRouteMetadata(location.pathname);

  let content = null;

  if (isMarketingPath(location.pathname)) {
    content = <MarketingSite />;
  } else if (isConsolePath(location.pathname)) {
    content = <ConsoleBoundary />;
  } else {
    const infoRoute = infoRouteForPath(location.pathname);
    if (infoRoute) {
      const Page = INFO_PAGE_COMPONENTS[infoRoute.pageKey];
      content = Page ? <Page /> : <NotFoundPage />;
    } else {
      content = <NotFoundPage />;
    }
  }

  return <Suspense fallback={<RouteLoading />}>{content}</Suspense>;
}
