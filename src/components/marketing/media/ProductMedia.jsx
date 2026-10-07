function resolveSource(media, kind) {
  const src = media?.[`${kind}Src`] || '';
  const srcSet = media?.[`${kind}SrcSet`] || '';
  return { src, srcSet };
}

export default function ProductMedia({ service, children }) {
  const media = service?.media || {};
  const desktop = resolveSource(media, 'desktop');
  const mobile = resolveSource(media, 'mobile');
  const fallbackSrc = desktop.src || mobile.src;
  const fallbackSrcSet = desktop.srcSet || mobile.srcSet;
  const hasRealMedia = Boolean(fallbackSrc || fallbackSrcSet);

  if (!hasRealMedia) {
    return (
      <div
        className="service-product-media is-prototype"
        data-product-media={service?.logoState || ''}
        data-product-media-mode="prototype"
      >
        {children}
      </div>
    );
  }

  const style = {
    '--product-media-fit': media.fit || 'contain',
    '--product-media-position': media.position || 'center',
    '--product-media-background': media.background || '#f7f9fc'
  };

  return (
    <figure
      className="service-product-media has-real-media"
      data-product-media={service?.logoState || ''}
      data-product-media-mode="image"
      style={style}
    >
      <picture className="service-product-picture">
        {(mobile.src || mobile.srcSet) && (
          <source
            media="(max-width: 767px)"
            srcSet={mobile.srcSet || mobile.src}
          />
        )}
        <img
          alt={media.alt || `${service?.siteLabel || 'Product'} interface`}
          className="service-product-image"
          decoding="async"
          loading={media.loading || 'lazy'}
          sizes={media.sizes || '(min-width: 1100px) 55vw, 100vw'}
          src={fallbackSrc}
          srcSet={fallbackSrcSet || undefined}
        />
      </picture>
    </figure>
  );
}
