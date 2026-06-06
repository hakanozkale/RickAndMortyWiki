import { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import LazyImage from './LazyImage';
import LoadingSpinner from '../utils/LoadingSpinner';

const LocationDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['locationDetails', id],
    queryFn: async () => {
      // 1. Fetch location details
      const locResponse = await apiClient.get(`/location/${id}`);
      const locationData = locResponse.data;

      // 2. Fetch residents in batch
      const residentIds = locationData.residents.map((url) => {
        const parts = url.split('/');
        return parts[parts.length - 1];
      });

      let residentsData = [];
      if (residentIds.length > 0) {
        const charResponse = await apiClient.get(`/character/${residentIds.join(',')}`);
        residentsData = Array.isArray(charResponse.data)
          ? charResponse.data
          : [charResponse.data];
      }

      return {
        location: locationData,
        residents: residentsData,
      };
    },
  });

  useEffect(() => {
    if (data?.location) {
      document.title = `${data.location.name} | Rick and Morty Wiki`;
    } else {
      document.title = 'Location Details | Rick and Morty Wiki';
    }
  }, [data]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="container mt-4">
        <div className="alertPersonal error d-flex justify-content-center">
          <span>Failed to load location details: {error.message}</span>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <Link to="/locations" className="btn-modern btn-secondary-modern">&larr; Back to Locations</Link>
        </div>
      </div>
    );
  }

  const { location, residents } = data;

  return (
    <div className="container mt-4">
      <div className="detail-card">
        <div className="detail-header d-flex flex-wrap align-items-center gap-3 justify-content-start">
          <Link to="/locations" className="btn-modern btn-secondary-modern">&larr; Location List</Link>
          <h2 className="mb-0">{location.name}</h2>
        </div>
        <div className="detail-body">
          <div className="detail-info-row">
            <strong>Type:</strong>
            <span>{location.type}</span>
          </div>
          <div className="detail-info-row">
            <strong>Dimension:</strong>
            <span>{location.dimension}</span>
          </div>

          <h4 className="mt-4 mb-3 text-primary">Residents ({residents.length})</h4>
          <div className="row g-3">
            {residents.length > 0 ? (
              residents.map((res) => (
                <div key={res.id} className="col-lg-6 col-12">
                  <Link to={`/characters/${res.id}`} style={{ textDecoration: 'none' }}>
                    <div className="resident-item">
                      <div className="resident-image">
                        <LazyImage src={res.image} alt={res.name} width="72px" height="72px" />
                      </div>
                      <div className="resident-info">
                        <p style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '6px' }}>
                          <strong>{res.name}</strong>
                        </p>
                        <p><strong>Status:</strong> {res.status} - {res.species}</p>
                        <p><strong>Location:</strong> {res.location?.name}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-12 text-center text-muted py-3">No residents found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
