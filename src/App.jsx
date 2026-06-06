import { lazy, Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './layout/Layout';
import './App.css';

// Lazy loaded pages — code splitting ile her route ayrı chunk
const Home = lazy(() => import('./pages/Home'));
const CharacterTable = lazy(() => import('./components/CharacterTable'));
const CharacterDetails = lazy(() => import('./components/CharacterDetails'));
const Episode = lazy(() => import('./components/Episode'));
const EpisodeDetails = lazy(() => import('./components/EpisodeDetails'));
const Locations = lazy(() => import('./components/Locations'));
const LocationsDetails = lazy(() => import('./components/LocationsDetails'));
const NotFound = lazy(() => import('./components/NotFound'));

// Suspense fallback
const PageLoader = () => (
  <div className="loading-container">
    <div className="spinner" />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'characters',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CharacterTable />
          </Suspense>
        ),
      },
      {
        path: 'characters/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CharacterDetails />
          </Suspense>
        ),
      },
      {
        path: 'episode',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Episode />
          </Suspense>
        ),
      },
      {
        path: 'episodes/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <EpisodeDetails />
          </Suspense>
        ),
      },
      {
        path: 'locations',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Locations />
          </Suspense>
        ),
      },
      {
        path: 'locations/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <LocationsDetails />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;