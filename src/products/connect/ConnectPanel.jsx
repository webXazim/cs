import { ProductMedia } from '../../components/marketing/media/index.js';
import { ServicePanel } from '../../components/marketing/service/index.js';
import { SERVICES } from '../catalog.js';
import ConnectPreview from './ConnectPreview.jsx';

export default function ConnectPanel() {
  return (
    <ServicePanel service={SERVICES.connect}>
      <ProductMedia service={SERVICES.connect}>
        <ConnectPreview />
      </ProductMedia>
    </ServicePanel>
  );
}
