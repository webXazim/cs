import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BrandNavigator from '../marketing/BrandNavigator.jsx';

export default function InfoPageShell({ eyebrow, title, intro, children, updatedLabel }) {
  const [brandReady, setBrandReady] = useState(false);
  const mainRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    requestAnimationFrame(() => mainRef.current?.focus({ preventScroll: true }));
    document.body.classList.add('info-page-active', 'brand-anchor-refined');
    document.documentElement.classList.add('js');

    (async () => {
      await import('../../features/brand/engine/cs-logo-engine.js');
      await import('../../features/brand/engine/cs-morph-logo.js');
      if (!cancelled) setBrandReady(true);
    })();

    return () => {
      cancelled = true;
      document.body.classList.remove('info-page-active', 'brand-anchor-refined');
    };
  }, [eyebrow]);

  return (
    <div className={`info-site${brandReady ? ' is-ready' : ''}`}>
      <a className="skip-link" href="#info-main">Skip to main content</a>
      <BrandNavigator
        state="master"
        transitioning={!brandReady}
        onSelect={(meta) => navigate(meta.path)}
      />

      <main ref={mainRef} className="info-main" id="info-main" tabIndex={-1}>
        <header className="info-hero">
          <div className="info-hero-inner">
            <div className="info-kicker">{eyebrow}</div>
            <h1>{title}</h1>
            <p>{intro}</p>
            {updatedLabel ? <div className="info-updated">{updatedLabel}</div> : null}
          </div>
        </header>

        <div className="info-content">{children}</div>
      </main>

      <footer className="info-footer">
        <div className="info-footer-inner">
          <Link className="info-footer-brand" to="/">CrescentSphere</Link>
          <nav aria-label="CrescentSphere information">
            <Link to="/about">About</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </nav>
          <span>© 2026 CrescentSphere</span>
        </div>
      </footer>
    </div>
  );
}
