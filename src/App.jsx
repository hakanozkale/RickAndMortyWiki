import React, { Suspense } from 'react';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/Home'));
const Layout = React.lazy(() => import('./layout/Layout'));
const CharacterTable = React.lazy(() => import('./components/CharacterTable'));
const CharacterDetails = React.lazy(() => import('./components/CharacterDetails'));
const Episode = React.lazy(() => import('./components/Episode'));
const EpisodeDetails = React.lazy(() => import('./components/EpisodeDetails'));
const Locations = React.lazy(() => import('./components/Locations'));
const LocationsDetails = React.lazy(() => import('./components/LocationsDetails'));

const router = createBrowserRouter([
  {
    path: '/', 
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'characters', element: <CharacterTable /> },
      { path: 'characters/:id', element: <CharacterDetails /> },
      { path: 'episode', element: <Episode /> },
      { path: 'episodes/:id', element: <EpisodeDetails /> },
      { path: 'locations', element: <Locations /> },
      { path: 'locations/:id', element: <LocationsDetails /> },
    ],
  },
]);

function App() {
  return (

    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="App">
              <RouterProvider router={router} />
        </div>
      </Suspense>
    </>
  );
}

export default App;








// import './App.css'
// import Layout from './layout/Layout'
// import Home from './pages/Home'
// import CharacterTable from './components/CharacterTable'
// import CharacterDetails from './components/CharacterDetails';
// import Episode from './components/Episode';
// import EpisodeDetails from './components/EpisodeDetails';
// import Locations from './components/Locations';
// import LocationsDetails from './components/LocationsDetails';
// import { RouterProvider, createBrowserRouter } from 'react-router-dom';


// function App() {

  // const router = createBrowserRouter([
  //   {
  //     path: '/', 
  //     element: <Layout />,
  //     children: [
  //       { path: '/', element: <Home /> },
  //       { path: 'characters', element: <CharacterTable /> },
  //       { path: 'characters/:id', element: <CharacterDetails /> },
  //       { path: 'episode', element: <Episode /> },
  //       { path: 'episodes/:id', element: <EpisodeDetails /> },
  //       { path: 'locations', element: <Locations /> },
  //       { path: 'locations/:id', element: <LocationsDetails /> },
  //     ],
  //   },
  // ]);

//   return (
    // <>
    //   <div className="App">
    //         <RouterProvider router={router} />
    //   </div>
    // </>
//   )
// }

// export default App
