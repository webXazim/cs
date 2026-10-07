export default function ServiceCTA({ className, eyebrow, text, label, href }) {
  return (
    <div className={`service-cta-card ${className}`}>
      <div className="service-cta-copy">
        <span>{eyebrow}</span>
        <strong>{text}</strong>
      </div>
      <a
        className="service-cta-button"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} — opens the product website in a new tab`}
      >
        {label} <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
