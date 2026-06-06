import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const Layout = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      {isOffline && (
        <div 
          className="text-center py-2 px-3 warning m-0 rounded-0"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1100,
            width: '100%',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            borderBottom: '1px solid rgba(251, 191, 36, 0.3)'
          }}
        >
          <span>⚠️ Connection lost. Showing cached multiverse data.</span>
        </div>
      )}
      <Navbar />
      <div className="page-container">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
