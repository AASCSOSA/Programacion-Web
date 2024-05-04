import './App.css';
import HomeApp from './Views/HomeApp';
import VentaApp from './Views/VentaApp';

import {BrowserRouter,Route,Routes} from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomeApp/>}/>
          <Route  path="/venta" element={<VentaApp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
