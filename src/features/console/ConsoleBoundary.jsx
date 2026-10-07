import { lazy, Suspense } from 'react';
import RouteLoading from '../../components/system/RouteLoading.jsx';
import NotFoundPage from '../../pages/not-found/NotFoundPage.jsx';
import { isConsoleEnabled } from './consoleConfig.js';

const ConsoleApp = lazy(() => import('./ConsoleApp.jsx'));

export default function ConsoleBoundary() {
  if (!isConsoleEnabled()) {
    return <NotFoundPage />;
  }

  return (
    <Suspense fallback={<RouteLoading />}>
      <ConsoleApp />
    </Suspense>
  );
}
