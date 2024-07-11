import React from 'react';
import { NavLink } from 'react-router-dom';
import svg from '../assets/svg/ram.svg';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" aria-label="Thirteenth navbar example">
      <div className="container-fluid flex-row justify-content-center alignce mx-5">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample11" aria-controls="navbarsExample11" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse d-lg-flex" id="navbarsExample11">
          <NavLink className="navbar-brand col-lg-3 me-0" to="/">
            <img src={svg} alt="logo" width={144} />
          </NavLink>
          <ul className="navbar-nav col-lg-6 justify-content-lg-center">
            <li className="nav-item">
              <NavLink exact="true" to="/" className="nav-link" aria-current="page">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/characters" className="nav-link">Characters</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/episode" className="nav-link">Episodes</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/locations" className="nav-link">Locations</NavLink>
            </li>
          </ul>
          <div className="d-lg-flex col-lg-3 justify-content-lg-end">
            <a className="btn btn-primary" href="https://github.com/hakanozkale" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

