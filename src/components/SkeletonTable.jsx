/**
 * SkeletonTable — Tablo yükleme animasyonu bileşeni
 * Gerçek tablo verileri yüklenirken shimmer efektli boş satırlar gösterir.
 */
const SkeletonTable = ({ rows = 5, cols = 4 }) => {
  return (
    <div className="table-responsive skeleton-table-container">
      <table className="table table-bordered align-middle text-center custom-table skeleton">
        <thead>
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i}>
                <div className="skeleton-line skeleton-header-cell" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: cols }).map((_, colIndex) => (
                <td key={colIndex}>
                  <div className="skeleton-line skeleton-body-cell" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
