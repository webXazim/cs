export default function HeroPanel() {
  return (
    <section className="hero section-pad site-panel" data-logo-state="master" data-site-label="Platform overview" data-site-panel="overview" data-site-path="/" id="overview">
<div aria-hidden="true" className="hero-mesh"></div>
<div className="hero-glow hero-glow-a"></div>
<div className="hero-glow hero-glow-b"></div>
<div className="container hero-grid">
<div className="hero-copy reveal">
<h1>Focused tools for the work your business does every day.</h1>
<p className="hero-lead">Choose the CrescentSphere product that fits the job: business email, application email delivery, invoices and payroll, inventory, team messaging, secure notes, or English–Arabic typing and language practice.</p>
<div className="hero-actions">
<a className="button button-primary button-lg" href="/mail" data-site-route="/mail">Explore the products <span aria-hidden="true">→</span></a>
</div>
<div className="hero-proof hero-foundation-line"><span className="proof-label">Six focused products</span><span>Use what you need</span><span>Clear purpose</span><span>Built for daily work</span></div>
</div>
<div aria-label="Interactive CrescentSphere product family" className="platform-stage reveal" data-platform-stage="">
<div className="stage-frame">
<div className="stage-topbar">
<div aria-hidden="true" className="stage-window-dots"><span></span><span></span><span></span></div>
<span className="stage-workspace">CrescentSphere products</span>
<span className="stage-online"><i></i> Six focused tools</span>
</div>
<div className="stage-canvas">
<div aria-hidden="true" className="stage-grid"></div>
<div aria-hidden="true" className="stage-product-field"></div>
<a className="stage-product stage-mail is-active" data-event="Professional email for customer, supplier, project, and everyday business conversations." data-label="CS Mail" data-service-jump="mail" data-stage-product="" href="/mail" data-site-route="/mail"><cs-brand-logo aria-hidden="true" label="" state="mail"></cs-brand-logo><span><strong>CS Mail</strong><small>Business email</small></span><i className="stage-status-dot"></i></a><a className="stage-product stage-dev" data-event="Send transactional application email through API or SMTP and review delivery activity." data-label="CS Mailer" data-service-jump="dev" data-stage-product="" href="/mailer" data-site-route="/mailer"><cs-brand-logo aria-hidden="true" label="" state="mailer"></cs-brand-logo><span><strong>CS Mailer</strong><small>API & SMTP</small></span><i className="stage-status-dot"></i></a><a className="stage-product stage-docs" data-event="Create invoices, prepare payroll records, and keep inventory quantities easier to review." data-label="CS Docs" data-service-jump="docs" data-stage-product="" href="/docs" data-site-route="/docs"><cs-brand-logo aria-hidden="true" label="" state="docs"></cs-brand-logo><span><strong>CS Docs</strong><small>Operations</small></span><i className="stage-status-dot"></i></a><a className="stage-product stage-connect" data-event="Keep direct and group conversations in a focused messenger built for everyday communication." data-label="CS Connect" data-service-jump="connect" data-stage-product="" href="/connect" data-site-route="/connect"><cs-brand-logo aria-hidden="true" label="" state="connect"></cs-brand-logo><span><strong>CS Connect</strong><small>Messaging</small></span><i className="stage-status-dot"></i></a><a className="stage-product stage-notes" data-event="Private notes stay organized, searchable, and easy to return to." data-label="CS Notes" data-service-jump="notes" data-stage-product="" href="/notes" data-site-route="/notes"><cs-brand-logo aria-hidden="true" label="" state="notes"></cs-brand-logo><span><strong>CS Notes</strong><small>Secure notes</small></span><i className="stage-status-dot"></i></a><a className="stage-product stage-keylang" data-event="Test typing speed and accuracy, then practice useful English and Arabic phrases." data-label="CS KeyLang" data-service-jump="keylang" data-stage-product="" href="/keylang" data-site-route="/keylang"><cs-brand-logo aria-hidden="true" label="" state="keylang"></cs-brand-logo><span><strong>CS KeyLang</strong><small>Typing & language</small></span><i className="stage-status-dot"></i></a><div className="stage-core">
<div className="stage-core-brand"><cs-brand-logo aria-hidden="true" className="core-logo-engine" label="" state="master"></cs-brand-logo><span><strong>CrescentSphere</strong><small>Product family</small></span></div>
<div className="stage-core-grid">
<span><i></i> Email</span>
<span><i></i> Developers</span>
<span><i></i> Operations</span>
<span><i></i> Messaging</span>
<span><i></i> Notes</span>
<span><i></i> Language</span>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
  );
}
