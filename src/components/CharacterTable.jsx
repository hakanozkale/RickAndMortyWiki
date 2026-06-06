import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import Filter from './Filter';
import LazyImage from './LazyImage';
import { SkeletonGrid } from './SkeletonCard';

const CharacterTable = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    gender: '',
    sort: '',
  });
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    document.title = 'Characters | Rick and Morty Wiki';

    const handleScroll = () => {
      setShowScrollBtn(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter change handler resets current page to 1
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  // Fetch characters based on current page and filters
  const { data, isLoading, isError, error, isPlaceholderData } = useQuery({
    queryKey: ['characters', currentPage, filters],
    queryFn: async () => {
      const params = {};
      if (currentPage) params.page = currentPage;
      
      // Ensure lower case names if user enters with turkish characters
      if (filters.name) params.name = filters.name.trim().toLowerCase();
      if (filters.status) params.status = filters.status;
      if (filters.species) params.species = filters.species;
      if (filters.gender) params.gender = filters.gender;

      const response = await apiClient.get('/character', { params });
      return response.data;
    },
    placeholderData: (previousData) => previousData,
    retry: (failureCount, error) => {
      // Don't retry on 404 since it means no results found
      if (error.response?.status === 404) return false;
      return failureCount < 2;
    },
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

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Client-side sorting for the current page's results
  const characters = data?.results ? [...data.results] : [];
  if (filters.sort === 'az') {
    characters.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filters.sort === 'za') {
    characters.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Handle card click to navigate to detail
  const handleCardClick = (id) => {
    navigate(`/characters/${id}`);
  };

  return (
    <div className="container mt-3 pb-3">
      <Filter onFilterChange={handleFilterChange} />
      
      {isLoading ? (
        <SkeletonGrid count={20} />
      ) : isError ? (
        <div className="alertPersonal error d-flex justify-content-center">
          <span>
            {error.response?.status === 404
              ? 'No characters found matching the selected filters.'
              : `Error loading characters: ${error.message}`}
          </span>
        </div>
      ) : (
        <>
          <div className="character-grid">
            {characters.map((character) => (
              <div
                key={character.id}
                className="character-card"
                onClick={() => handleCardClick(character.id)}
              >
                <div className="card-image">
                  <LazyImage
                    src={character.image}
                    alt={character.name}
                    width="100%"
                    height="100%"
                  />
                </div>
                <div className="card-content">
                  <h3 className="card-name" title={character.name}>
                    {character.name}
                  </h3>
                  <div className="card-info">
                    <span className={`status-dot ${character.status.toLowerCase()}`} />
                    <span>
                      {character.status} - {character.species}
                    </span>
                  </div>
                  <div className="card-info mt-2">
                    <strong>Gender:</strong> <span>{character.gender}</span>
                  </div>
                  <div className="card-info">
                    <strong>Location:</strong> <span className="text-truncate" style={{ maxWidth: '140px' }} title={character.location.name}>{character.location.name}</span>
                  </div>
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

      {showScrollBtn && (
        <button
          className="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default CharacterTable;