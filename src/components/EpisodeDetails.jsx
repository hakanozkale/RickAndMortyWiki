import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../utils/LoadingSpinner';

const EpisodeDetails = () => {
  const { id } = useParams(); // URL parametresinden ID'yi alıyoruz
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  
  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);
        setEpisode(response.data);
        
        // Bölümdeki karakterlerin bilgileride alıyoruz
        const characterRequests = response.data.characters.map(url => axios.get(url));
        const characterResponses = await Promise.all(characterRequests);
        const charactersData = characterResponses.map(res => res.data);
        setCharacters(charactersData);
      } catch (error) {
        console.error('Error fetching episode details:', error);
      }
    };

    fetchEpisode();
  }, [id]);

  if (!episode) {
    return (
        <LoadingSpinner/>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="card-title">{episode.name}</h2>
            <Link to="/episode" className="btn btn-secondary">&larr; Episode List</Link>
          </div>
          
          <p className="card-text"><strong>Air Date:</strong> {episode.air_date}</p>
          <p className="card-text"><strong>Episode:</strong> {episode.episode}</p>
          <h4 className="card-text">Characters:</h4>
          <ul className="list-group">
            {characters.map((character, index) => (
              <li key={index} className="list-group-item">
                <div className="row">
                  <div className="col-md-2">
                    <img src={character.image} alt={character.name} className="img-fluid rounded" />
                  </div>
                  <div className="col-md-10">
                    <p><strong>ID:</strong> {character.id}</p>
                    <p><strong>Name:</strong> {character.name}</p>
                    <p><strong>Origin:</strong> {character.origin.name}</p>
                    <p><strong>Location:</strong> {character.location.name}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetails;
