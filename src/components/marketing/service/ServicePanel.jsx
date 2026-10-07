import ServiceIntro from './ServiceIntro.jsx';

export default function ServicePanel({ service, children }) {
  return (
    <article
      aria-labelledby={service.titleId}
      className={service.articleClass}
      data-logo-state={service.logoState}
      data-product-panel={service.productPanel}
      data-site-label={service.siteLabel}
      data-site-panel={service.sitePanel}
      data-site-path={service.path}
      id={service.panelId}
    >
      <ServiceIntro service={service} />
      {children}
    </article>
  );
}
