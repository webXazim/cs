import { ProductMedia } from '../../components/marketing/media/index.js';
import { ServicePanel } from '../../components/marketing/service/index.js';
import { SERVICES } from '../catalog.js';
import NotesPreview from './NotesPreview.jsx';

export default function NotesPanel() {
  return (
    <ServicePanel service={SERVICES.notes}>
      <ProductMedia service={SERVICES.notes}>
        <NotesPreview />
      </ProductMedia>
    </ServicePanel>
  );
}
