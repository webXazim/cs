import { ProductMedia } from '../../components/marketing/media/index.js';
import { ServicePanel } from '../../components/marketing/service/index.js';
import { SERVICES } from '../catalog.js';
import MailerPreview from './MailerPreview.jsx';

export default function MailerPanel() {
  return (
    <ServicePanel service={SERVICES.mailer}>
      <ProductMedia service={SERVICES.mailer}>
        <MailerPreview />
      </ProductMedia>
    </ServicePanel>
  );
}
