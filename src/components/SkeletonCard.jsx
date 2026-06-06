/**
 * SkeletonCard — Karakter kartı iskelet yükleme bileşeni
 * Gerçek veri gelene kadar animasyonlu placeholder gösterir
 */
const SkeletonCard = () => (
  <div className="character-card skeleton">
    <div className="skeleton-image" />
    <div className="card-content">
      <div className="skeleton-line skeleton-title" />
      <div className="skeleton-line skeleton-text" />
      <div className="skeleton-line skeleton-text short" />
    </div>
  </div>
);

/**
 * SkeletonGrid — Birden fazla iskelet kartı grid'i
 */
export const SkeletonGrid = ({ count = 20 }) => (
  <div className="character-grid">
    {Array.from({ length: count }, (_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

/**
 * SkeletonTable — Tablo satırları için iskelet
 */
export const SkeletonTable = ({ rows = 10, cols = 5 }) => (
  <div className="table-responsive">
    <table className="table modern-table">
      <thead>
        <tr>
          {Array.from({ length: cols }, (_, i) => (
            <th key={i}><div className="skeleton-line skeleton-text" /></th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }, (_, i) => (
          <tr key={i}>
            {Array.from({ length: cols }, (_, j) => (
              <td key={j}><div className="skeleton-line skeleton-text" /></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SkeletonCard;
