import React, { useState } from 'react';

function Filter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    gender: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="container-fluid my-3">
      <form onSubmit={handleSubmit}>
        <div className="row align-items-center row-gap-2 row-gap-lg-0 ">
          <div className="col-lg-3 col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={filters.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <select
              className="form-select"
              name="status"
              value={filters.status}
              onChange={handleInputChange}
            >
              <option value="">Status</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6">
            <select
              className="form-select"
              name="species"
              value={filters.species}
              onChange={handleInputChange}
            >
              <option value="">Species</option>
              <option value="Human">Human</option>
              <option value="Alien">Alien</option>
              <option value="Humanoid">Humanoid</option>
              <option value="Poopybutthole">Poopybutthole</option>
              <option value="Mythological Creature">Mythological Creature</option>
              <option value="Animal">Animal</option>
              <option value="Robot">Robot</option>
              <option value="Cronenberg">Cronenberg</option>
              <option value="Disease">Disease</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6">
            <select
              className="form-select"
              name="gender"
              value={filters.gender}
              onChange={handleInputChange}
            >
              <option value="">Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>

        <div className="row custom-row align-items-center mt-3">
          <button type="submit" className="btn btn-primary btn-lg d-block w-100">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default Filter;