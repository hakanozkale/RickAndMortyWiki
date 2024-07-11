import React,{useEffect} from 'react'
import CharacterTable from '../components/CharacterTable';

function Home() {

   useEffect(() => {
       document.title = 'Home | Rick and Morty Wiki';
   }, []);

  return (
    <>
        <CharacterTable/>
    </>
  )
}

export default Home