import './App.css'
import Layout from './layout/Layout'
import Home from './pages/Home'
import CharacterTable from './components/CharacterTable'
import CharacterDetails from './components/CharacterDetails';
import Episode from './components/Episode';
import EpisodeDetails from './components/EpisodeDetails';
import Locations from './components/Locations';
import LocationsDetails from './components/LocationsDetails';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


function App() {

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

  return (
    <>
      <div className="App">
            <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
