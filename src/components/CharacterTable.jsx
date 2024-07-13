import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../api/config';
import Filter from './Filter';
import LoadingSpinner from '../utils/LoadingSpinner';

const CharacterTable = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [showNoResults, setShowNoResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [expandedCharacterId, setExpandedCharacterId] = useState(null); 
  const maxRowsPerPage = 250;
  const placeholderImage = 'https://rickandmortyapi.com/api/character/avatar/66.jpeg';

  useEffect(() => {
    document.title = 'Characters | Rick and Morty Wiki';
  }, []);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      setLoading(true);
      setShowNoResults(false);
      
      try {
        let allCharacters = [];
        let page = 1;
        let response;
        let query = '';

        if (filters.name) query += `&name=${filters.name}`;
        if (filters.status) query += `&status=${filters.status}`;
        if (filters.species) query += `&species=${filters.species}`;
        if (filters.gender) query += `&gender=${filters.gender}`;

        do {
          try {
            response = await axios.get(`${config.BASE_URL}/character?page=${page}${query}`);

            allCharacters = [...allCharacters, ...response.data.results];
            page++;              
            
          } catch (error) {
              console.error('Error fetching data:', error);
              setErrorMessage(`${error.response.data.error} - ${error.response.status}`);
              setShowNoResults(true);
          }
        } while (response.data.info.next !== null);

        if (filters.sort) {
          if (filters.sort === 'az') {
            allCharacters.sort((a, b) => a.name.localeCompare(b.name));
          } 
          else {
            allCharacters.sort((a, b) => b.name.localeCompare(a.name));
          }
        }

        setCharacters(allCharacters);

      } catch (error) {
        console.error('Error fetching data:', error);
        setShowNoResults(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCharacters();
  }, [filters]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(characters.length / maxRowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleDetails = (characterId) => {
    if (expandedCharacterId === characterId) {
      setExpandedCharacterId(null);
    } else {
      setExpandedCharacterId(characterId); 
    }
  };

  const currentCharacters = characters.slice(
    (currentPage - 1) * maxRowsPerPage,
    currentPage * maxRowsPerPage
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mt-3 pb-3">
      <Filter onFilterChange={setFilters} />
      {loading ? (
        <LoadingSpinner/>
      ) : (
        <>
          {showNoResults ? (
            <div className="alertPersonal error d-flex justify-content-center">
                <span>{errorMessage}</span>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle text-center">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Photo</th>
                    <th scope="col" style={{ minWidth: '160px' }}>Character</th>
                    <th scope="col">Status</th>
                    <th scope="col">Species</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCharacters.map((character) => (
                    <React.Fragment key={character.id}>
                      <tr onClick={() => toggleDetails(character.id)} style={{ cursor: 'pointer' }}>
                        <td>{character.id}</td>
                        <td>
                          <img src={character.image} alt={character.name} style={{ width: '60px', height: '60px'}} onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }} loading="lazy"/>
                        </td>
                        <td>{character.name}</td>
                        <td>{character.status}</td>
                        <td>{character.species}</td>
                        <td>{character.gender}</td>
                        <td>
                          <Link to={`/characters/${character.id}`} className="btn btn-primary btn-sm">Details</Link>
                        </td>
                      </tr>
                      {expandedCharacterId === character.id && (
                        <tr>
                          <td colSpan="7">
                            <div className="row text-center text-md-start">
                              <div className="col-12 col-md-3 text-center">
                                <img src={character.image} alt={character.name} style={{ width: '120px', height: '120px'}} onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
                                loading="lazy"/>
                              </div>
                              <div className="col-12 col-md-9 row gap-1 justify-content-center">
                                <div className="row row-gap-1 row-gap-md-0 mt-1 mt-md-0 ">
                                  <div className="col-md-6"><strong>Name:</strong> {character.name}</div>
                                  <div className="col-md-6"><strong>Status:</strong> {character.status}</div>
                                  <div className="col-md-6"><strong>Species:</strong> {character.species}</div>
                                  <div className="col-md-6"><strong>Gender:</strong> {character.gender}</div>
                                  <div className="col-md-6"><strong>Origin:</strong> {character.origin.name}</div>
                                  <div className="col-md-6"><strong>Location:</strong> {character.location.name}</div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center">
            <button
              className="btn btn-primary"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous page
            </button>

            <button
              className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center"
              onClick={scrollToTop}
              style={{ width: '40px', height: '40px'}}
            >
              ↑
            </button>

            <button
              className="btn btn-primary"
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(characters.length / maxRowsPerPage)}
            >
              Next page
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterTable;