import { useState, useCallback, useEffect, useRef } from 'react';

function Filter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    gender: '',
    sort: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const isFirstMount = useRef(true);
  const debounceTimerRef = useRef(null);

  // Debounced search logic for name input
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      onFilterChange(filters);
    }, 350);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [filters.name, onFilterChange]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const updated = {
        ...prevFilters,
        [name]: value,
      };
      // Auto-submit on change for dropdowns to make UX smoother
      if (name !== 'name') {
        onFilterChange(updated);
      }
      return updated;
    });
  }, [onFilterChange]);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilters((prev) => ({
      ...prev,
      name: value
    }));
  }, []);

  const handleClear = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    const cleared = {
      name: '',
      status: '',
      species: '',
      gender: '',
      sort: '',
    };
    setFilters(cleared);
    setSearchTerm('');
    onFilterChange(cleared);
  }, [onFilterChange]);

  return (
    <div className="filter-form my-3">
      <form onSubmit={handleSubmit}>
        <div className="row align-items-center row-gap-3">
          <div className="col-lg-3 col-md-6">
            <label htmlFor="filter-name" className="visually-hidden">Name</label>
            <input
              type="text"
              className="form-control"
              id="filter-name"
              placeholder="Search by name..."
              name="name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-lg-3 col-md-6">
            <label htmlFor="status" className="visually-hidden">Status</label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={filters.status}
              onChange={handleInputChange}
            >
              <option value="">Any Status</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          <div className="col-lg-3 col-md-6">
            <label htmlFor="species" className="visually-hidden">Species</label>
            <select
              className="form-select"
              id="species"
              name="species"
              value={filters.species}
              onChange={handleInputChange}
            >
              <option value="">Any Species</option>
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
            <label htmlFor="gender" className="visually-hidden">Gender</label>
            <select
              className="form-select"
              id="gender"
              name="gender"
              value={filters.gender}
              onChange={handleInputChange}
            >
              <option value="">Any Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>

        <div className="row align-items-center row-gap-3 mt-3">
          <div className="col-md-6 col-12">
            <button type="submit" className="btn-search">
              Search Name
            </button>
          </div>
          <div className="col-md-3 col-6">
            <label htmlFor="sort" className="visually-hidden">Sort</label>
            <select
              className="form-select"
              id="sort"
              name="sort"
              value={filters.sort}
              onChange={handleInputChange}
            >
              <option value="">Sort: Default</option>
              <option value="az">Sort: A-Z</option>
              <option value="za">Sort: Z-A</option>
            </select>
          </div>
          <div className="col-md-3 col-6">
            <button type="button" className="btn-modern btn-secondary-modern w-100" onClick={handleClear}>
              Clear Filters
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Filter;
