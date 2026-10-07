import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandNavigator from './BrandNavigator.jsx';
import HeroPanel from './panels/HeroPanel.jsx';
import ClosingPanel from './panels/ClosingPanel.jsx';
import { MailPanel, MailerPanel, DocsPanel, ConnectPanel, NotesPanel, KeyLangPanel } from '../../products/index.js';
import PrototypeToast from './PrototypeToast.jsx';
import useJourneyNavigation from '../../features/journey/useJourneyNavigation.js';
import { MARKETING_ROUTES } from '../../app/routes.js';

export default function MarketingSite() {
  const [ready, setReady] = useState(false);
  const trackRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    document.body.classList.add('brand-anchor-refined');
    document.documentElement.classList.add('js');

    (async () => {
      await import('../../features/brand/engine/cs-logo-engine.js');
      await import('../../features/brand/engine/cs-morph-logo.js');
      await import('../../legacy/site-interactions.js');
      if (!cancelled) setReady(true);
    })();

    return () => {
      cancelled = true;
      document.body.classList.remove('brand-anchor-refined');
    };
  }, []);

  const { activeIndex, isTransitioning, goToPath } = useJourneyNavigation({ ready, trackRef });
  const activeRoute = MARKETING_ROUTES[activeIndex] || MARKETING_ROUTES[0];

  const handleBrandSelect = useCallback((meta) => {
    const moved = goToPath(meta.path, { source: 'brand', historyMode: 'push' });
    if (!moved && activeRoute.path !== meta.path) navigate(meta.path);
  }, [activeRoute.path, goToPath, navigate]);

  return (
    <div className={ready ? 'react-site is-ready' : 'react-site'}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <BrandNavigator
        state={activeRoute.logoState}
        transitioning={isTransitioning}
        dark={activeRoute.panelKey === 'cta'}
        onSelect={handleBrandSelect}
      />
      <div className="site-shell" id="top">
        <main id="main-content" tabIndex={-1}>
          <div
            className="site-horizontal-track"
            data-site-track=""
            ref={trackRef}
            style={!ready ? { transform: `translate3d(${-activeIndex * 100}vw, 0, 0)` } : undefined}
          >
            <HeroPanel />
            <MailPanel />
            <MailerPanel />
            <DocsPanel />
            <ConnectPanel />
            <NotesPanel />
            <KeyLangPanel />
            <ClosingPanel />
          </div>
        </main>
      </div>
      <PrototypeToast />
    </div>
  );
}
