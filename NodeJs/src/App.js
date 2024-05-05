import './App.css';
import HomeApp from './Views/HomeApp';
import VentaApp from './Views/VentaApp';
import HeadComponent from './Views/Components/HeadComponent';
import RanchoApp from './Views/RanchoApp';
import CargaApp from './Views/CargaApp';
import FormularioRanchoComponent  from './Views/Components/FormularioRanchoComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
      <HeadComponent />
        <Routes>
          <Route exact path="/" element={<HomeApp />} />
          <Route path="/venta" element={<VentaApp />} />
          <Route path="/rancho" element={<RanchoApp />} />
          <Route path="/carga" element={<CargaApp />} />
          <Route path="/form-rancho" element={<FormularioRanchoComponent />} />
          <Route path="/edit-rancho/:id" element={<FormularioRanchoComponent />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
