import { ProductMedia } from '../../components/marketing/media/index.js';
import { ServicePanel } from '../../components/marketing/service/index.js';
import { SERVICES } from '../catalog.js';
import MailPreview from './MailPreview.jsx';

export default function MailPanel() {
  return (
    <ServicePanel service={SERVICES.mail}>
      <ProductMedia service={SERVICES.mail}>
        <MailPreview />
      </ProductMedia>
    </ServicePanel>
  );
}
