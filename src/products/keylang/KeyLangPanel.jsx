import { ProductMedia } from '../../components/marketing/media/index.js';
import { ServicePanel } from '../../components/marketing/service/index.js';
import { SERVICES } from '../catalog.js';
import KeyLangPreview from './KeyLangPreview.jsx';

export default function KeyLangPanel() {
  return (
    <ServicePanel service={SERVICES.keylang}>
      <ProductMedia service={SERVICES.keylang}>
        <KeyLangPreview />
      </ProductMedia>
    </ServicePanel>
  );
}
