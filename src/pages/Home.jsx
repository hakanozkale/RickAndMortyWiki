import { useEffect } from 'react';
import CharacterTable from '../components/CharacterTable';

function Home() {
  useEffect(() => {
    document.title = 'Home | Rick and Morty Wiki';
  }, []);

  return (
    <div>
      <div 
        className="text-center my-4 py-5 px-3"
        style={{
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <h1 
          className="display-4 mb-3" 
          style={{ 
            color: 'var(--accent-green)',
            fontWeight: '800',
            letterSpacing: '-0.5px'
          }}
        >
          Rick and Morty Universe
        </h1>
        <p className="lead mx-auto" style={{ color: 'var(--text-secondary)', maxWidth: '600px', fontSize: '1rem' }}>
          Explore characters, dimensions, locations, and episodes from the Rick and Morty multiverse. Built on a fast, cached, and modern tech stack.
        </p>
      </div>
      <CharacterTable />
    </div>
  );
}

export default Home;