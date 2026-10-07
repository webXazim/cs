import { Link } from 'react-router-dom';
import InfoPageShell from '../../components/site/InfoPageShell.jsx';

export default function NotFoundPage() {
  return (
    <InfoPageShell
      eyebrow="404"
      title="That page isn’t part of the CrescentSphere site."
      intro="The address may have changed, or the page may never have existed. Return to the product journey or choose one of the main information pages below."
    >
      <section className="not-found-actions" aria-label="Page not found options">
        <Link className="not-found-primary" to="/">Return to CrescentSphere</Link>
        <Link to="/products">Browse products</Link>
        <Link to="/about">About CrescentSphere</Link>
      </section>
    </InfoPageShell>
  );
}
