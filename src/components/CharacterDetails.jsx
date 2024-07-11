import React, { useEffect, useState } from 'react';
import { useParams , Link} from 'react-router-dom';
import axios from 'axios';

const CharacterDetails = () => {
  const { id } = useParams(); // URL parametresinden ID'yi alıyoruz
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    document.title = 'Character Details | Rick and Morty Wiki';
  }, []);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(response.data);
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) {
    return (
      <div className="alertPersonal warning d-flex justify-content-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="card-title">{character.name}</h2>
            <Link to="/characters" className="btn btn-secondary">&larr; Characters List</Link>
          </div>
          <img src={character.image} alt={character.name} style={{ width: '200px', height: '200px', marginBottom: '20px' }} />
          <p className="card-text"><strong>Status:</strong> {character.status}</p>
          <p className="card-text"><strong>Species:</strong> {character.species}</p>
          <p className="card-text"><strong>Gender:</strong> {character.gender}</p>
          <p className="card-text"><strong>Origin:</strong> {character.origin.name}</p>
          <p className="card-text"><strong>Location:</strong> {character.location.name}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
