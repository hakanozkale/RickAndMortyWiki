import { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import LazyImage from './LazyImage';
import LoadingSpinner from '../utils/LoadingSpinner';

const EpisodeDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['episodeDetails', id],
    queryFn: async () => {
      const epResponse = await apiClient.get(`/episode/${id}`);
      const episodeData = epResponse.data;

      const characterIds = episodeData.characters.map((url) => {
        const parts = url.split('/');
        return parts[parts.length - 1];
      });

      let charactersData = [];
      if (characterIds.length > 0) {
        const charResponse = await apiClient.get(`/character/${characterIds.join(',')}`);
        charactersData = Array.isArray(charResponse.data)
          ? charResponse.data
          : [charResponse.data];
      }

      return {
        episode: episodeData,
        characters: charactersData,
      };
    },
  });

  useEffect(() => {
    if (data?.episode) {
      document.title = `${data.episode.name} | Rick and Morty Wiki`;
    } else {
      document.title = 'Episode Details | Rick and Morty Wiki';
    }
  }, [data]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="container mt-4">
        <div className="alertPersonal error d-flex justify-content-center">
          <span>Failed to load episode details: {error.message}</span>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <Link to="/episode" className="btn-modern btn-secondary-modern">&larr; Back to Episodes</Link>
        </div>
      </div>
    );
  }

  const { episode, characters } = data;

  return (
    <div className="container mt-4">
      <div className="detail-card">
        <div className="detail-header d-flex flex-wrap align-items-center gap-3 justify-content-start">
          <Link to="/episode" className="btn-modern btn-secondary-modern">&larr; Episode List</Link>
          <h2 className="mb-0">{episode.name}</h2>
        </div>
        <div className="detail-body">
          <div className="detail-info-row">
            <strong>Episode Code:</strong>
            <span>{episode.episode}</span>
          </div>
          <div className="detail-info-row">
            <strong>Air Date:</strong>
            <span>{episode.air_date}</span>
          </div>

          <h4 className="mt-4 mb-3 text-primary">Characters Featured ({characters.length})</h4>
          <div className="row g-3">
            {characters.length > 0 ? (
              characters.map((char) => (
                <div key={char.id} className="col-lg-6 col-12">
                  <Link to={`/characters/${char.id}`} style={{ textDecoration: 'none' }}>
                    <div className="resident-item">
                      <div className="resident-image">
                        <LazyImage src={char.image} alt={char.name} width="72px" height="72px" />
                      </div>
                      <div className="resident-info">
                        <p style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '6px' }}>
                          <strong>{char.name}</strong>
                        </p>
                        <p><strong>Status:</strong> {char.status} - {char.species}</p>
                        <p><strong>Location:</strong> {char.location?.name}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-12 text-center text-muted py-3">No characters found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetails;
