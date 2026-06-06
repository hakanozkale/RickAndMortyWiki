import { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import LazyImage from './LazyImage';
import LoadingSpinner from '../utils/LoadingSpinner';

const CharacterDetails = () => {
  const { id } = useParams();

  const { data: character, isLoading, isError, error } = useQuery({
    queryKey: ['character', id],
    queryFn: async () => {
      const response = await apiClient.get(`/character/${id}`);
      return response.data;
    },
  });

  useEffect(() => {
    if (character) {
      document.title = `${character.name} | Rick and Morty Wiki`;
    } else {
      document.title = 'Character Details | Rick and Morty Wiki';
    }
  }, [character]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="container mt-4">
        <div className="alertPersonal error d-flex justify-content-center">
          <span>Failed to load character details: {error.message}</span>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <Link to="/characters" className="btn-modern btn-secondary-modern">&larr; Back to Characters</Link>
        </div>
      </div>
    );
  }

  if (!character) return null;

  return (
    <div className="container mt-4">
      <div className="detail-card">
        <div className="detail-header d-flex flex-wrap align-items-center gap-3 justify-content-start">
          <Link to="/characters" className="btn-modern btn-secondary-modern">&larr; Characters List</Link>
          <h2 className="mb-0">{character.name}</h2>
        </div>
        <div className="detail-body">
          <div className="row align-items-center">
            <div className="col-md-4 d-flex justify-content-center justify-content-md-start">
              <LazyImage
                src={character.image}
                alt={character.name}
                width="240px"
                height="240px"
                className="detail-image"
              />
            </div>
            <div className="col-md-8">
              <div className="detail-info-row">
                <strong>Status:</strong>
                <span className={`status-badge ${character.status.toLowerCase()}`}>
                  <span className={`status-dot ${character.status.toLowerCase()}`} />
                  {character.status}
                </span>
              </div>
              <div className="detail-info-row">
                <strong>Species:</strong>
                <span>{character.species}</span>
              </div>
              <div className="detail-info-row">
                <strong>Gender:</strong>
                <span>{character.gender}</span>
              </div>
              <div className="detail-info-row">
                <strong>Origin:</strong>
                <span>{character.origin?.name}</span>
              </div>
              <div className="detail-info-row">
                <strong>Location:</strong>
                <span>{character.location?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
