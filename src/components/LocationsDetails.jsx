import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../utils/LoadingSpinner';

const LocationDetails = () => {
  const { id } = useParams();
  const [locationDetails, setLocationDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [residents, setResidents] = useState([]);
  const [residentsLoading, setResidentsLoading] = useState(true);

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
        setLocationDetails(response.data);

        // Lokasyonda ki karakterlerin bilgileride alıyoruz
        const residentRequests = response.data.residents.map(url => axios.get(url));
        const residentResponses = await Promise.all(residentRequests);
        setResidents(residentResponses.map(res => res.data));
      } catch (error) {
        console.error('Error fetching location details:', error);
      } finally {
        setLoading(false);
        setResidentsLoading(false);
      }
    };

    fetchLocationDetails();
  }, [id]);

  return (
    <div className="container mt-4">
      {loading ? (
        <LoadingSpinner/>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="card-title">{locationDetails.name}</h2>
              <Link to="/locations" className="btn btn-secondary">&larr; Location List</Link>
            </div>
            <p className="card-text"><strong>Type:</strong> {locationDetails.type}</p>
            <p className="card-text"><strong>Dimension:</strong> {locationDetails.dimension}</p>
            <h4 className="card-text">Residents:</h4>
            {residentsLoading ? (
              <div className="alertPersonal warning d-flex justify-content-center">
                Loading residents...
              </div>
            ) : (
              <ul className="list-group">
                {residents.length > 0 ? (
                  residents.map((resident, index) => (
                    <li key={index} className="list-group-item">
                      <div className="row">
                        <div className="col-md-2">
                          <img src={resident.image} alt={resident.name} className="img-fluid rounded" />
                        </div>
                        <div className="col-md-10">
                          <p><strong>ID:</strong> {resident.id}</p>
                          <p><strong>Name:</strong> {resident.name}</p>
                          <p><strong>Origin:</strong> {resident.origin.name}</p>
                          <p><strong>Location:</strong> {resident.location.name}</p>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">No residents found.</li>
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDetails;

