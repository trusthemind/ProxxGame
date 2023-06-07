import './App.css';
import HomeScreen from './components/Home';
import Error from "./components/Error"
import Game from './components/Game';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route path='/game' element={<Game />}></Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
