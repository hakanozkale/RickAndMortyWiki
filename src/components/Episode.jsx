import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/apiClient';

const Episode = () => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = 'Episodes | Rick and Morty Wiki';
  }, []);

  const { data, isLoading, isError, error, isPlaceholderData } = useQuery({
    queryKey: ['episodes', currentPage],
    queryFn: async () => {
      const response = await apiClient.get(`/episode?page=${currentPage}`);
      return response.data;
    },
    placeholderData: (previousData) => previousData,
  });

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => {
      const maxPage = data?.info?.pages || 1;
      return prev < maxPage ? prev + 1 : prev;
    });
  }, [data?.info?.pages]);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  if (isError) {
    return (
      <div className="container mt-4">
        <div className="alertPersonal error d-flex justify-content-center">
          <span>Failed to load episodes: {error.message}</span>
        </div>
      </div>
    );
  }

  const episodes = data?.results || [];

  return (
    <div className="container mt-3 pb-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Episodes</h2>
        <span className="badge bg-secondary">Total: {data?.info?.count || 0}</span>
      </div>

      {isLoading ? (
        <div className="info-card-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="info-card skeleton">
              <div className="skeleton-line skeleton-title mb-3" />
              <div className="skeleton-line skeleton-text mb-2" />
              <div className="skeleton-line skeleton-text short" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="info-card-grid">
            {episodes.map((episode) => (
              <div key={episode.id} className="info-card d-flex flex-column justify-content-between">
                <div>
                  <h5>{episode.name}</h5>
                  <p><strong>Code:</strong> {episode.episode}</p>
                  <p><strong>Air Date:</strong> {episode.air_date}</p>
                  <p><strong>Characters featured:</strong> {episode.characters?.length || 0}</p>
                </div>
                <div>
                  <Link to={`/episodes/${episode.id}`} className="btn-detail">
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {data?.info?.pages > 1 && (
            <div className="pagination-controls mt-4">
              <button
                className="btn-modern btn-secondary-modern"
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || isPlaceholderData}
              >
                &larr; Previous Page
              </button>
              <span className="pagination-info">
                Page {currentPage} of {data?.info?.pages}
              </span>
              <button
                className="btn-modern btn-secondary-modern"
                onClick={handleNextPage}
                disabled={currentPage === data?.info?.pages || isPlaceholderData}
              >
                Next Page &rarr;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Episode;
