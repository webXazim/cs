import { Link } from 'react-router-dom';
import { SERVICES } from '../../../products/catalog.js';

const closingProducts = [
  ['mail', 'closing-mail', 'Business email'],
  ['mailer', 'closing-dev', 'Email API & SMTP'],
  ['docs', 'closing-docs', 'Business operations'],
  ['connect', 'closing-connect', 'Team messaging'],
  ['notes', 'closing-notes', 'Secure notes'],
  ['keylang', 'closing-keylang', 'Typing & language practice']
];

export default function ClosingPanel() {
  return (
    <section className="cta-section site-panel" data-logo-state="master" data-site-label="CrescentSphere" data-site-panel="cta" data-site-path="/products" id="cta">
      <div className="closing-page">
        <div className="closing-main">
          <div className="closing-copy">
            <h2>Six focused products. Choose the one that fits the job.</h2>
            <p>Each CrescentSphere product is designed around a clear job — from business email and developer delivery to operations, messaging, secure notes, and English–Arabic practice. Start with what is useful to you today.</p>
            <div aria-label="CrescentSphere product principles" className="closing-foundation"><span>Focused products</span><span>Clear use cases</span><span>Practical interfaces</span><span>Use what you need</span></div>
          </div>
          <aside aria-label="CrescentSphere products" className="closing-products">
            <div className="closing-products-head">
              <span>Product family</span>
              <strong>Open a CrescentSphere product.</strong>
            </div>
            <div className="closing-product-grid">
              {closingProducts.map(([key, className, description]) => {
                const product = SERVICES[key];
                return (
                  <a
                    key={key}
                    className={`closing-product ${className}`}
                    href={product.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${product.siteLabel} website — opens in a new tab`}
                  >
                    <cs-brand-logo aria-hidden="true" label="" state={product.logoState}></cs-brand-logo>
                    <span><strong>{product.siteLabel}</strong><small>{description}</small></span>
                    <i aria-hidden="true">↗</i>
                  </a>
                );
              })}
            </div>
          </aside>
        </div>
        <footer className="site-footer closing-footer">
          <div className="closing-footer-inner">
            <span className="closing-copyright">© 2026 CrescentSphere</span>
            <nav className="closing-footer-links" aria-label="CrescentSphere information">
              <Link to="/about">About</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </nav>
            <span className="closing-footer-meta">Six focused products · One CrescentSphere family</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
