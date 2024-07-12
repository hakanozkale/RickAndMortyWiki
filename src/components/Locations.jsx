import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../api/config';
import LoadingSpinner from '../utils/LoadingSpinner';

const Location = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Locations | Rick and Morty Wiki';
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/location`);
        setLocations(response.data.results);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="container mt-3">
      <h2>Locations</h2>
      {loading ? (
        <LoadingSpinner/>
      ) : (
        <div className="row">
          {locations.map((location) => (
            <div className="col-lg-4 col-md-6 mb-4" key={location.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{location.name}</h5>
                  <p className="card-text">Type: {location.type}</p>
                  <p className="card-text">Dimension: {location.dimension}</p>
                  <Link to={`/locations/${location.id}`} className="btn btn-primary">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Location;
