import './App.css';
import { useContext } from 'react';
import { AppContext } from './Context';
// Components
import Meals from './Components/Meals';
import Modal from './Components/Modal';
import Search from './Components/Search';
import Favorites from './Components/Favorites';

export default function App() {

  const { showModal } = useContext(AppContext);
  
  return (
    <main>
      <Search />
      <Favorites />
      <Meals />
      { showModal && <Modal /> }
    </main>
  )
}
