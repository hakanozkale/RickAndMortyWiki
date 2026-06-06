import { useState, useCallback } from 'react';

/**
 * LazyImage — Akıllı görsel yükleme bileşeni
 * 
 * - Native loading="lazy" ile tarayıcı seviyesinde lazy loading
 * - Yüklenirken placeholder gösterir
 * - Fade-in animasyonu ile yumuşak geçiş
 * - Hata durumunda fallback image
 */

const FALLBACK_IMAGE = 'https://rickandmortyapi.com/api/character/avatar/19.jpeg';

const LazyImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  fallback = FALLBACK_IMAGE,
  style = {},
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const handleError = useCallback((e) => {
    if (!error) {
      setError(true);
      e.target.src = fallback;
    }
  }, [error, fallback]);

  return (
    <div
      className={`lazy-image-wrapper ${className}`}
      style={{
        width: width || 'auto',
        height: height || 'auto',
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`lazy-image ${loaded ? 'loaded' : ''}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
};

export default LazyImage;
