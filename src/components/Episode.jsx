import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../api/config';


const EpisodeTable = () => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    document.title = 'Episodies | Rick and Morty Wiki';
  }, []);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/episode`);
        setEpisodes(response.data.results);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      }
    };

    fetchEpisodes();
  }, []);

  return (
    <div>
      <h2>Episode List</h2>
      <div className="table-responsive-sm">
        <table className="table table-bordered table-hover align-middle text-center">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Air Date</th>
              <th scope="col">Episode</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode) => (
              <tr key={episode.id}>
                <td>{episode.id}</td>
                <td>{episode.name}</td>
                <td>{episode.air_date}</td>
                <td>{episode.episode}</td>
                <td>
                  <Link to={`/episodes/${episode.id}`} className="btn btn-primary">
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EpisodeTable;


