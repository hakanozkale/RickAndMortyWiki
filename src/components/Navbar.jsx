import { useState } from 'react';
import { NavLink } from 'react-router';
import svg from '../assets/svg/ram.svg';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  });

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-modern" aria-label="Main navigation">
      <div className="container-fluid mx-md-5 mx-3">
        <NavLink className="navbar-brand d-lg-none" to="/">
          <img src={svg} alt="Rick and Morty Wiki logo" width={96} height={30} />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarsMain"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarsMain">
          <NavLink className="navbar-brand d-none d-lg-block me-0" to="/">
            <img src={svg} alt="Rick and Morty Wiki logo" width={144} height={44} />
          </NavLink>
          <ul className="navbar-nav mx-auto text-center">
            <li className="nav-item">
              <NavLink end to="/" className="nav-link" aria-current="page">Home</NavLink>
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
          <div className="d-flex align-items-center justify-content-center gap-2 mt-2 mt-md-0">
            <button 
              onClick={toggleTheme} 
              className="btn-github d-flex align-items-center justify-content-center px-0"
              style={{ width: '38px', height: '38px', cursor: 'pointer' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <a className="btn-github text-decoration-none" href="https://github.com/hakanozkale" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;