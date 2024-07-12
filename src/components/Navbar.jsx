import React from 'react';
import { NavLink } from 'react-router-dom';
import svg from '../assets/svg/ram.svg';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary" aria-label="Thirteenth navbar example">
      <div className="container-fluid mx-5">
        <NavLink className="navbar-brand d-lg-none" to="/">
          <img src={svg} alt="logo" width={96} style={{height:"auto"}} />
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample1" aria-controls="navbarsExample1" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample1">
          <NavLink className="navbar-brand d-none d-lg-block me-0" to="/">
            <img src={svg} alt="logo" width={144} style={{height:"auto"}} />
          </NavLink>
          <ul className="navbar-nav mx-auto text-center">
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
          <div className="d-flex justify-content-center justify-content-md-end d-md-block mt-1 mt-md-0">
            <a className="btn btn-primary" href="https://github.com/hakanozkale" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;