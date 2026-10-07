import { Link } from 'react-router-dom';
import InfoPageShell from '../../components/site/InfoPageShell.jsx';
import { SERVICES, SERVICE_ORDER } from '../../products/catalog.js';

const principles = [
  ['Focused', 'Each product is built around a clear job instead of trying to become an all-purpose workspace.'],
  ['Practical', 'Interfaces are designed for everyday work: communication, business operations, notes, and language practice.'],
  ['Calm', 'We prefer clear hierarchy, understandable states, and deliberate interaction over unnecessary complexity.'],
  ['Evolving', 'Products can grow independently while sharing a consistent CrescentSphere design and product philosophy.']
];

export default function AboutPage() {
  const products = SERVICE_ORDER.map((key) => ({ key, ...SERVICES[key] }));

  return (
    <InfoPageShell
      eyebrow="About CrescentSphere"
      title="Focused digital tools, built around clear jobs."
      intro="CrescentSphere is a family of standalone products for business communication, operations, productivity, and language practice. We build each product to be useful on its own today, with room to evolve as the family grows."
    >
      <section className="info-section info-section-lead">
        <div className="info-section-label">Our approach</div>
        <div className="info-section-copy">
          <h2>Useful first. Connected only when it genuinely helps.</h2>
          <p>We do not treat integration as a goal by itself. CS Mail, CS Mailer, CS Docs, CS Connect, CS Notes, and CS KeyLang currently address different jobs and can be understood independently. Future connections should make those jobs easier, not make the products harder to use.</p>
        </div>
      </section>

      <section className="about-principles" aria-label="CrescentSphere product principles">
        {principles.map(([title, text], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="info-section info-products-section">
        <div className="info-section-label">Product family</div>
        <div className="info-section-copy">
          <h2>Six products, each with a specific purpose.</h2>
          <div className="about-product-grid">
            {products.map((product) => (
              <a
                key={product.key}
                className="about-product-card"
                href={product.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${product.siteLabel} website — opens in a new tab`}
              >
                <cs-brand-logo aria-hidden="true" label="" state={product.logoState}></cs-brand-logo>
                <span>
                  <strong>{product.siteLabel}</strong>
                  <small>{product.kicker.replace(/^CS [A-Z]+ · /, '')}</small>
                </span>
                <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="info-callout">
        <span>CrescentSphere</span>
        <h2>Start with the product that solves the job in front of you.</h2>
        <Link to="/products">Explore the product family <i aria-hidden="true">→</i></Link>
      </section>
    </InfoPageShell>
  );
}
