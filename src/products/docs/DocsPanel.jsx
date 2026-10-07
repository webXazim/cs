import { ProductMedia } from '../../components/marketing/media/index.js';
import { ServicePanel } from '../../components/marketing/service/index.js';
import { SERVICES } from '../catalog.js';
import DocsPreview from './DocsPreview.jsx';

export default function DocsPanel() {
  return (
    <ServicePanel service={SERVICES.docs}>
      <ProductMedia service={SERVICES.docs}>
        <DocsPreview />
      </ProductMedia>
    </ServicePanel>
  );
}
