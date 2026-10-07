import FeaturePills from './FeaturePills.jsx';
import UseLine from './UseLine.jsx';
import ServiceCTA from './ServiceCTA.jsx';

export default function ServiceIntro({ service }) {
  const copyClassName = ['ecosystem-copy', service.copyClass].filter(Boolean).join(' ');

  return (
    <div className={copyClassName}>
      <div className="service-kicker">{service.kicker}</div>
      <h2 id={service.titleId}>{service.title}</h2>
      <p>{service.description}</p>
      <FeaturePills items={service.features} />
      {service.useLine ? <UseLine {...service.useLine} /> : null}
      <ServiceCTA {...service.cta} href={service.website} />
    </div>
  );
}
