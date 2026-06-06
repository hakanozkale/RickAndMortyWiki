import { useEffect } from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  useEffect(() => {
    document.title = '404 Dimension Not Found | Rick and Morty Wiki';
  }, []);

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center text-center py-5 my-5">
      <div 
        className="portal-error-container mb-4 position-relative"
        style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'var(--accent-green)',
          boxShadow: '0 0 40px rgba(16, 185, 129, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'spin 12s linear infinite'
        }}
      >
        <span 
          style={{ 
            fontSize: '3.5rem', 
            fontWeight: '900',
            color: 'var(--bg-primary)',
            textShadow: '0 0 10px rgba(0,0,0,0.5)',
            transform: 'rotate(-45deg)' // offset the spin slightly visually
          }}
        >
          404
        </span>
      </div>
      <h1 className="display-5 font-weight-bold text-primary mb-3">Dimension Not Found</h1>
      <p className="lead mx-auto mb-4" style={{ color: 'var(--text-secondary)', maxWidth: '500px' }}>
        Wubba Lubba Dub Dub! You've drifted into a dimension that doesn't exist in our multiverse tracker.
      </p>
      <Link to="/" className="btn-modern btn-primary-modern px-4 py-2">
        &larr; Teleport Back Home
      </Link>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
